/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * Drop-in replacement for antd-style's `createStyles`.
 *
 * Why this exists: antd-style's own `useStyles` calls its `useTheme()`, which builds a
 * fresh ~600-key merged theme object *per consumer* (see antd-style
 * `factories/createUseTheme.js` — `{...antdTheme, ...}`). With many styled components
 * mounted (e.g. inactive editor tabs that never unmount) this materialises thousands of
 * distinct `theme` objects in the heap.
 *
 * This wrapper keeps the exact authoring surface (`({ css, token }, props) => styles`,
 * `{ hashPriority }`, `{ styles, cx, theme }` return) and reuses antd-style's *shared*
 * emotion cache + `hashPriority`-aware className generation, but sources the token from
 * antd's `theme.useToken()` — which returns a single shared reference for all consumers.
 * Net effect: one shared token object instead of one merged copy per component.
 *
 * Migration is a pure import swap; `.styles.*` bodies are unchanged.
 */

import { useMemo } from 'react'
import { theme as antdThemeApi } from 'antd'
// `css` here is antd-style's `serializeCSS` (authoring helper). `cx`/`keyframes` are re-exported
// for files that import them alongside `createStyles`.
import { css as serializeCSS, type FullToken } from 'antd-style'
// Deep imports: these are not re-exported from the package root, but the package ships no
// `exports` map, so subpath imports resolve. Pinned to the ESM build used by the bundler.
import { createCSS } from 'antd-style/es/core'
import { isReactCssResult } from 'antd-style/es/utils'
import { styleManager } from 'antd-style'

interface StyleUtils {
  token: FullToken
  css: typeof serializeCSS
  cx: ReturnType<typeof createCSS>['cx']
}

type StyleRecord = Record<string, unknown>
type GetStyles<Props, S extends StyleRecord> = (utils: StyleUtils, props: Props) => S

interface CreateStylesOptions {
  hashPriority?: 'low' | 'high'
  label?: string
  // Injected by antd-style's babel plugin for readable class-name labels. Only present when
  // the import resolves to 'antd-style'; absent here, so labels fall back to emotion defaults.
  __BABEL_FILE_NAME__?: string
}

// Reuse antd-style's shared emotion cache so generated styles live in the same <style> sheet
// (consistent key/hashing, dedup) as the remaining antd-style usages (ThemeProvider, etc.).
const sharedCache = (styleManager as unknown as { cache: Parameters<typeof createCSS>[0] }).cache

export function createStyles<Props = void, S extends StyleRecord = StyleRecord> (
  styleOrGetStyle: GetStyles<Props, S> | S,
  options?: CreateStylesOptions
): (props: Props) => { styles: { [K in keyof S]: string }, cx: StyleUtils['cx'], theme: FullToken } {
  const fileName = options?.__BABEL_FILE_NAME__

  return function useStyles (props: Props) {
    // Shared reference across every consumer — this is the whole point.
    const { token } = antdThemeApi.useToken() as unknown as { token: FullToken }

    // hashPriority-aware className generator + cx, bound to the shared cache. Stable across renders.
    const { css: toClassName, cx } = useMemo(
      () => createCSS(sharedCache, { hashPriority: options?.hashPriority ?? 'high', label: options?.label }),
      // options object is defined once at module scope per createStyles() call
      []
    )

    const styles = useMemo(() => {
      const raw: unknown = typeof styleOrGetStyle === 'function'
        ? (styleOrGetStyle)({ token, css: serializeCSS, cx }, props)
        : styleOrGetStyle

      if (raw === null || typeof raw !== 'object') {
        return raw as { [K in keyof S]: string }
      }

      // Callback returned a single css`` result rather than a keyed object — pass through as-is.
      if (isReactCssResult(raw)) {
        return raw as unknown as { [K in keyof S]: string }
      }

      // Keyed object of serialized styles -> convert each to a className (mirrors antd-style factory).
      return Object.fromEntries(
        Object.entries(raw as StyleRecord).map(([key, value]) => {
          if (value !== null && typeof value === 'object') {
            const label = fileName !== undefined ? `${fileName}-${key}` : undefined
            return [key, label !== undefined ? toClassName(value, `label:${label}`) : toClassName(value)]
          }
          // Already a className string (e.g. produced via cx) — keep as-is.
          return [key, value]
        })
      ) as { [K in keyof S]: string }
    }, [token, props, cx, toClassName])

    // `theme: token` is the SHARED reference (not a per-consumer copy), so consumers that read
    // `const { theme } = useStyles()` keep working without producing extra heap objects.
    return { styles, cx, theme: token }
  }
}

// Convenience re-exports so files importing these alongside createStyles can swap the whole import.
export { css, cx, keyframes } from 'antd-style'
export type { SerializedStyles, FullToken } from 'antd-style'
