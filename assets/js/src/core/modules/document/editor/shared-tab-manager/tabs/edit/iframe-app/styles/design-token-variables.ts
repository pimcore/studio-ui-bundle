/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type theme } from 'antd'
import { defaultFieldWidthValues } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider'

// The alias token (no component tokens): what antd-style passes as the theme and what getDesignToken returns.
type DesignToken = ReturnType<typeof theme.getDesignToken>

const px = (value: number): string => `${value}px`

/**
 * Studio's design tokens as CSS custom properties, for the stylesheets a document template loads
 * into the editor iframe (editmode.css of a bundle). Studio's own components read the theme in
 * JavaScript; a template's CSS cannot, so without these it would have to copy the values and drift
 * from the theme (or a dark theme). Named after the antd token, kebab-cased, prefixed --studio-.
 * A deliberate set (type, text, primary, borders, controls, the spacing scale, motion and Studio's
 * field widths), extended when a template needs another.
 */
export const designTokenVariables = (token: DesignToken): Record<string, string> => ({
  '--studio-font-family': token.fontFamily,
  '--studio-font-size': px(token.fontSize),
  '--studio-font-size-sm': px(token.fontSizeSM),
  '--studio-font-size-lg': px(token.fontSizeLG),
  '--studio-line-height': String(token.lineHeight),
  '--studio-font-weight-strong': String(token.fontWeightStrong),

  '--studio-color-text': token.colorText,
  '--studio-color-text-secondary': token.colorTextSecondary,
  '--studio-color-text-description': token.colorTextDescription,
  '--studio-color-text-placeholder': token.colorTextPlaceholder,
  '--studio-color-primary': token.colorPrimary,
  '--studio-color-primary-hover': token.colorPrimaryHover,
  '--studio-color-primary-active': token.colorPrimaryActive,
  '--studio-color-primary-text-active': token.colorPrimaryTextActive,
  '--studio-color-border': token.colorBorder,
  '--studio-color-border-secondary': token.colorBorderSecondary,
  '--studio-color-split': token.colorSplit,
  '--studio-color-bg-container': token.colorBgContainer,

  '--studio-line-width': px(token.lineWidth),
  '--studio-border-radius': px(token.borderRadius),
  '--studio-control-height': px(token.controlHeight),
  '--studio-control-padding-horizontal': px(token.controlPaddingHorizontal),
  '--studio-control-outline': token.controlOutline,
  '--studio-control-outline-width': px(token.controlOutlineWidth),

  '--studio-margin-xxs': px(token.marginXXS),
  '--studio-margin-xs': px(token.marginXS),
  '--studio-margin-sm': px(token.marginSM),
  '--studio-margin': px(token.margin),
  '--studio-margin-lg': px(token.marginLG),
  '--studio-padding-xxs': px(token.paddingXXS),
  '--studio-padding-xs': px(token.paddingXS),
  '--studio-padding-sm': px(token.paddingSM),

  '--studio-motion-duration-mid': token.motionDurationMid,

  '--studio-field-width-small': px(defaultFieldWidthValues.small),
  '--studio-field-width-medium': px(defaultFieldWidthValues.medium),
  '--studio-field-width-large': px(defaultFieldWidthValues.large)
})

/** The variables as declarations, for a :root rule. */
export const designTokenDeclarations = (token: DesignToken): string =>
  Object.entries(designTokenVariables(token)).map(([name, value]) => `${name}: ${value};`).join('\n')
