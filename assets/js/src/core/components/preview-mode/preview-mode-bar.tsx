/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { useElementSelector } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import { usePreviewMode, type PreviewModeItem } from './preview-mode-provider'
import { useStyles } from './preview-mode-bar.styles'

export interface PreviewModeBarProps {
  /** Class names the element selector is limited to */
  allowedClasses?: string[]
}

export const truncatePath = (fullpath: string): string => {
  const parts = fullpath.split('/').filter(Boolean)
  if (parts.length <= 2) {
    return parts.join('/ ')
  }
  return `.../ ${parts[parts.length - 2]}/ ${parts[parts.length - 1]}`
}

export const PreviewModeBar = ({ allowedClasses }: PreviewModeBarProps): React.JSX.Element => {
  const { item, setItem, fallbackItem } = usePreviewMode()
  const { t } = useTranslation()
  const { styles } = useStyles()

  const { open } = useElementSelector({
    selectionType: SelectionType.Single,
    areas: { object: true, asset: false, document: false },
    config: { objects: { allowedClasses } },
    onFinish: (event) => {
      setItem((event?.items?.[0] as PreviewModeItem | undefined) ?? null)
    }
  })

  const id = item?.data?.id ?? fallbackItem?.id
  const rawPath = item !== null ? item.data?.fullpath : fallbackItem?.fullpath
  const fullpath = typeof rawPath === 'string' ? rawPath : null

  return (
    <Flex
      align="center"
      gap="extra-small"
    >
      <Button onClick={ open }>
        {t('preview-mode.preview-item')}
      </Button>

      {id === undefined
        ? <Text className={ styles.description }>{t('preview-mode.no-item')}</Text>
        : (
          <Tooltip title={ fullpath }>
            <Text className={ styles.description }>
              ID: {id}{fullpath !== null && <> {'│'} {truncatePath(fullpath)}</>}
            </Text>
          </Tooltip>
          )}
    </Flex>
  )
}
