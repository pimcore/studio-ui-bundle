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
import { createInstance } from 'antd-style'
import type { CSSInterpolation } from '@emotion/serialize'

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
  __BABEL_FILE_NAME__?: string
}

// The instance gets a dedicated container appended to <head> while this module loads:
// federated bundles inject their styles through antd-style's DEFAULT cache, whose
// <style> tags are appended to the end of <head> once the bundle renders — i.e. after
// this container. Without the container, the default cache's tag can end up after the
// instance's tags, and consumer styles of equal specificity (e.g. a bundle's
// `width: 100%` on a SDK Select) would lose against the SDK styles they could
// override by insertion order before the dedicated instance existed.
const createSdkStyleContainer = (): Node | undefined => {
  if (typeof document === 'undefined') {
    return undefined
  }

  const styleContainer = document.createElement('pimcore-sdk-styles')
  document.head.appendChild(styleContainer)
  return styleContainer
}

const pimcoreStyleInstance = createInstance({ key: 'pimcore', speedy: true, container: createSdkStyleContainer() })
const sharedCache = (pimcoreStyleInstance.styleManager as unknown as { cache: Parameters<typeof createCSS>[0] }).cache

export function createStyles<Props, S extends StyleRecord = StyleRecord> (
  styleOrGetStyle: GetStyles<Props, S> | S,
  options?: CreateStylesOptions
): (props?: Props) => { styles: { [K in keyof S]: string }, cx: StyleUtils['cx'], theme: FullToken } {
  const fileName = options?.__BABEL_FILE_NAME__

  return function useStyles (props?: Props) {
    const { token } = antdThemeApi.useToken() as unknown as { token: FullToken }

    const { css: toClassName, cx } = useMemo(
      () => createCSS(sharedCache, { hashPriority: options?.hashPriority ?? 'high', label: options?.label }),
      []
    )

    const styles = useMemo(() => {
      const raw: unknown = typeof styleOrGetStyle === 'function'
        ? (styleOrGetStyle)({ token, css: serializeCSS, cx }, props as Props)
        : styleOrGetStyle

      if (raw === null || typeof raw !== 'object') {
        return raw as { [K in keyof S]: string }
      }

      if (isReactCssResult(raw)) {
        return raw as unknown as { [K in keyof S]: string }
      }

      return Object.fromEntries(
        Object.entries(raw as StyleRecord).map(([key, value]) => {
          if (value !== null && typeof value === 'object') {
            const label = fileName !== undefined ? `${fileName}-${key}` : undefined
            return [key, label !== undefined ? toClassName(value as CSSInterpolation, `label:${label}`) : toClassName(value as CSSInterpolation)]
          }

          return [key, value]
        })
      ) as { [K in keyof S]: string }
    }, [token, props, cx, toClassName])

    return { styles, cx, theme: token }
  }
}

export const { css, cx, keyframes } = pimcoreStyleInstance
export type { SerializedStyles, FullToken } from 'antd-style'
