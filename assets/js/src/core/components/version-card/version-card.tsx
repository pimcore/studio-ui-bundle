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

import { Button, Card, Input, Tag } from 'antd'
import React, { useEffect } from 'react'
import { useStyle } from './version-card.styles'
import { Icon } from '../icon/icon'
import { isSet } from '@Pimcore/utils/helpers'
import { useTranslation } from 'react-i18next'

interface VersionCardProps {
  version: number
  date: string
  savedBy: string
  isPublished: boolean
  id: number
  isAutosaved?: boolean
  isActiveDefault?: boolean
  isOwnDraft?: boolean
  scheduledDate?: string
  note?: string
  onActiveStateChanged?: (isActive: boolean) => void
  className?: string
}

export const VersionCard = ({
  version,
  date,
  savedBy,
  isPublished,
  id,
  isAutosaved,
  isActiveDefault = false,
  isOwnDraft,
  scheduledDate,
  note = '',
  onActiveStateChanged,
  className
}: VersionCardProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { t } = useTranslation()

  const [isExpanded, setIsExpanded] = React.useState(false)
  const [isActive, setIsActive] = React.useState(isActiveDefault)

  const chevronOnClick = (e: any): void => {
    setIsExpanded(!isExpanded)
  }

  const title = (
    <div>
      <div>
        <span className={ 'title' }>{`${t('version.version')} ${version} | ${date} `}</span>
        <Button
          icon={ <Icon
            className={ ['chevron', isExpanded ? 'chevron-up' : ''].join(' ') }
            name="chevron-up"
                 /> }
          onClick={ chevronOnClick }
          size="small"
          type="text"
        />
      </div>
      <div>
        <span className={ 'sub-title' } >{`By ${savedBy}`}</span>
        {isSet(isAutosaved) && <Icon name="lightning-01" /> }
      </div>
    </div>
  )

  let extra
  let classNameByState = isActive ? 'card__is-active' : ''

  if (isPublished) {
    classNameByState = 'card__is-published'
    extra = (
      <Tag className={ ['title-tag', 'title-tag__published'].join(' ') }>
        <Icon
          className="tag-icon"
          name="world"
          options={ { width: '12px', height: '12px' } }
        />
        {t('version.published')}
      </Tag>
    )
  } else if (isSet(isOwnDraft) && isOwnDraft!) {
    extra = (
      <Tag className={ ['title-tag', 'title-tag__own-draft'].join(' ') }>
        <Icon
          className="tag-icon"
          name="user-01"
          options={ { width: '12px', height: '12px' } }
        />
        {t('version.own-draft')}
      </Tag>
    )
  }

  const onClickCard = (): void => {
    setIsActive(true)
  }

  useEffect(() => {
    isSet(onActiveStateChanged) && onActiveStateChanged!(isActive ?? false)
  }, [isActive])

  return (
    <div className={ [styles.card, className].join(' ') }>
      <Card
        className={ [classNameByState, isExpanded ? 'card-body__expand' : 'card-body__hide'].join(' ') }
        extra={ extra }
        onClick={ onClickCard }
        size="small"
        style={ { width: 300 } }
        title={ title }
      >
        <div className={ 'flexbox-start-end' }>
          <Tag className={ 'id-tag' }>ID: {id}</Tag>
          <div>
            {!isPublished && (
              <Button
                className={ 'btn-publish' }
                icon={ <Icon name="world" /> }
              >
                {t('version.publish')}
              </Button>
            )}
            <Button
              aria-label={ t('aria.version.delete') }
              icon={ <Icon name="delete-outlined" /> }
            />
          </div>
        </div>
        {isSet(scheduledDate) && (
          <div className={ 'row-margin' }>
            <div>{t('version.schedule-for')}</div>
            <div className={ 'date-container' }>
              <Icon name="calender" />
              <span className={ 'scheduled-date' }>{scheduledDate}</span>
            </div>
          </div>
        )}
        <div className={ 'row-margin' }>
          <span>{t('version.note')}</span>
          <Input
            defaultValue={ note }
            placeholder={ 'Add a note' }
          />
        </div>
      </Card>
    </div>
  )
}
