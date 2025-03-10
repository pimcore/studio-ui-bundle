/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useEffect, useState } from 'react'
import { Input, List, Tooltip, Typography } from 'antd'
import cn from 'classnames'
import { Flex } from '@Pimcore/components/flex/flex'
import { toCssDimension } from '@Pimcore/utils/css'
import { useSites } from '@Pimcore/modules/document/hooks/use-sites'
import { useTranslation } from 'react-i18next'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { isPlainObject } from 'lodash'
import { useFieldWidth } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/field-width/use-field-width'
import { useStyles } from './url-slug.styles'

export interface UrlSlugEntry {
  slug: string
  siteId: number
}

export interface UrlSlugProps {
  availableSites?: number[] | null
  disabled?: boolean
  domainLabelWidth?: number | null
  width?: number | string | null
  value?: UrlSlugEntry[] | null
  onChange?: (value?: UrlSlugEntry[] | null) => void
  className?: string
}

export const UrlSlug = (props: UrlSlugProps): React.JSX.Element => {
  const initialValue = props.value ?? [{ slug: '', siteId: 0 }]

  if (isPlainObject(initialValue) && !initialValue.some(entry => entry.siteId === 0)) {
    initialValue.unshift({ slug: '', siteId: 0 })
  }

  const [value, setValue] = useState<UrlSlugEntry[]>(initialValue)
  const [errors, setErrors] = useState<boolean[]>([])

  const { t } = useTranslation()
  const { styles } = useStyles()
  const { getSiteById, getRemainingSites } = useSites()
  const fieldWidth = useFieldWidth()
  const { Text } = Typography

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(value)
    }
  }, [value])

  const validateSlug = (slug: string): boolean => {
    if (slug !== '') {
      if (!slug.startsWith('/') || slug.length < 2) {
        return false
      }
      slug = slug.substring(1).replace(/\/$/, '')
      const parts = slug.split('/')
      for (const part of parts) {
        if (part.length === 0) {
          return false
        }
      }
    }
    return true
  }

  const handleInputChange = (index: number, newSlug: string): void => {
    const newValue = [...value]

    newValue[index].slug = newSlug

    const newErrors = [...errors]
    newErrors[index] = !validateSlug(newSlug)
    setValue(newValue)
    setErrors(newErrors)
  }

  const remainingSites = getRemainingSites(value.map(item => item.siteId), props.availableSites ?? undefined)

  const remainingSitesMenuItems = remainingSites.map(site => ({
    key: site.id,
    label: site.domain,
    onClick: () => { setValue([...value, { slug: '', siteId: site.id }]) }
  }))

  const sortedValue = [...value].sort((a, b) => a.siteId === 0 ? -1 : 0)

  return (
    <List
      bordered
      className={ cn(styles.container, props.className) }
      dataSource={ sortedValue }
      loadMore={ remainingSites.length > 0 && props.disabled !== true && (
      <List.Item>
        <Dropdown
          menu={ { items: remainingSitesMenuItems } }
          trigger={ ['click'] }
        >
          <DropdownButton type="default">
            {t('url-slug.add-site')}
          </DropdownButton>
        </Dropdown>
      </List.Item>
      ) }
      renderItem={ (item: UrlSlugEntry, index: number) => (
        <List.Item>
          <Flex
            align="center"
            className="w-full"
            gap="small"
            justify="center"
          >
            <div
              className="urlSlugLabel"
              style={ { width: toCssDimension(props.domainLabelWidth, 250) } }
            >
              { item.siteId === 0 ? t('fallback') : getSiteById(item.siteId)?.domain }
            </div>
            <div className="w-full">
              <Input
                disabled={ props.disabled }
                onChange={ e => { handleInputChange(index, e.target.value) } }
                status={ errors[index] ? 'error' : undefined }
                value={ item.slug }
              />
              { errors[index] && (
              <Text type="danger">
                {t('url-slug.invalid')}
              </Text>
              )}
            </div>
            { props.disabled !== true && (
            <Tooltip title={ t('remove') }>
              <IconButton
                disabled={ item.siteId === 0 }
                icon={ { value: 'trash' } }
                onClick={ () => {
                  const newValue = [...value]
                  newValue.splice(index, 1)
                  setValue(newValue)
                } }
                style={ { visibility: item.siteId === 0 ? 'hidden' : undefined } }
              />
            </Tooltip>
            )}
          </Flex>
        </List.Item>
      ) }
      size="small"
      style={ { maxWidth: toCssDimension(props.width, fieldWidth.large) } }
    />
  )
}
