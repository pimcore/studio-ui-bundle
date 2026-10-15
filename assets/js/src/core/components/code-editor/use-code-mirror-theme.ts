/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import { theme as antdThemeApi } from 'antd'
import { EditorView, oneDarkHighlightStyle, type Extension } from '@uiw/react-codemirror'
import { syntaxHighlighting } from '@codemirror/language'
import { isDarkSurface } from '@Pimcore/utils/color'

/**
 * CodeMirror ships its own colours and defaults to the light set, which paints an opaque
 * white surface while the text colour is inherited from the Studio theme -- on a dark
 * theme that leaves an editor white on white.
 *
 * This is expressed as a CodeMirror theme rather than as a stylesheet on the wrapper.
 * `EditorView.baseTheme` registers at `Prec.lowest` and is mounted before every other
 * theme, so a normal-precedence theme wins any specificity tie against the built-in
 * rules it replaces. A stylesheet has no such guarantee: it has to out-specify selectors
 * it does not own, which has to be re-checked on every CodeMirror upgrade.
 *
 * `&` resolves to the editor root, so a bare `.cm-x` selector becomes two classes -- the
 * same depth as the `&dark .cm-x` rule it replaces. The focused selection is the one
 * built-in rule written deeper than that, so it is matched shape for shape.
 */
export const useCodeMirrorThemeExtensions = (): Extension[] => {
  const { token } = antdThemeApi.useToken()

  return useMemo(() => {
    const isDark = isDarkSurface(token.colorBgContainer)

    // A selection band has to move away from the surface, and which direction that is
    // depends on the surface: on a dark one it has to lift, on a light one it has to
    // deepen. No single token does both -- `colorPrimary` is itself dark, so it gives
    // 1.1:1 on `pimcore-dark` and drops text to 2.39:1 on the light theme. Measured
    // against the surface, these two beat the `#233` / `#d7d4f0` they replace on both:
    // 1.6:1 vs 1.26:1 dark, 1.89:1 vs 1.44:1 light, with text at 8.0:1 and 8.7:1.
    const selectionBackground = isDark ? token.colorFill : token.colorPrimaryBorder

    const editorTheme = EditorView.theme({
      '&': {
        backgroundColor: token.colorBgContainer,
        color: token.colorText
      },

      // The base theme hard-codes a black caret and a mid-grey placeholder.
      '.cm-cursor, .cm-dropCursor': {
        borderLeftColor: token.colorText
      },
      '.cm-placeholder': {
        color: token.colorTextPlaceholder
      },

      '.cm-gutters': {
        backgroundColor: token.colorFillQuaternary,
        color: token.colorTextSecondary,
        borderRight: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`
      },
      '.cm-activeLine': {
        backgroundColor: token.colorFillQuaternary
      },
      '.cm-activeLineGutter': {
        backgroundColor: token.colorFillTertiary,
        color: token.colorText
      },

      // `&dark.cm-focused > .cm-scroller > …` is five classes deep, so the focused
      // variant is restated at the same depth rather than relying on the shorter one.
      '.cm-selectionBackground': {
        backgroundColor: selectionBackground
      },
      '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground': {
        backgroundColor: selectionBackground
      },
      '.cm-selectionMatch': {
        backgroundColor: token.colorFillSecondary
      },

      // A hit and the current hit have to be told apart. These use border-strength fills
      // from two different hues rather than two steps of one ramp: the `*Bg` steps are
      // container tints that read as barely present, and two tints of the same hue leave
      // you unable to see which hit the search is on.
      '.cm-searchMatch': {
        backgroundColor: token.colorWarningBorder
      },
      '.cm-searchMatch.cm-searchMatch-selected': {
        backgroundColor: token.colorPrimaryBorder
      },

      '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
        backgroundColor: token.colorFillSecondary
      },
      '.cm-foldPlaceholder': {
        backgroundColor: token.colorFillTertiary,
        border: 'none',
        color: token.colorTextSecondary
      },

      '.cm-tooltip': {
        backgroundColor: token.colorBgElevated,
        color: token.colorText,
        border: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`
      },
      '.cm-tooltip-autocomplete ul li[aria-selected]': {
        backgroundColor: token.controlItemBgActive,
        color: token.colorText
      },

      // The search panel and its controls, which otherwise keep CodeMirror's own greys.
      '.cm-panels': {
        backgroundColor: token.colorBgElevated,
        color: token.colorText
      },
      '.cm-button': {
        backgroundColor: token.colorFillQuaternary,
        backgroundImage: 'none',
        color: token.colorText,
        border: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
        borderRadius: `${token.borderRadiusSM}px`
      },
      '.cm-textfield': {
        backgroundColor: token.colorBgContainer,
        color: token.colorText,
        border: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
        borderRadius: `${token.borderRadiusSM}px`
      }
    }, { dark: isDark })

    // Syntax colours are the one part a theme cannot carry: CodeMirror generates opaque
    // class names for highlight tags. Only One Dark's highlight style is taken, never the
    // whole `oneDark` bundle -- that also carries `oneDarkTheme`, whose chrome would win
    // over everything above.
    return isDark
      ? [editorTheme, syntaxHighlighting(oneDarkHighlightStyle)]
      : [editorTheme]
  }, [token])
}
