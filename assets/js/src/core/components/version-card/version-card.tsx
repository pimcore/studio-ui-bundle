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

import { Button, Card, Checkbox, Input, Tag } from 'antd'
import React, { useState } from 'react'
import { useStyle } from './version-card.styles'
import { Icon } from '../icon/icon'
import { isSet } from '@Pimcore/utils/helpers'
import { useTranslation } from 'react-i18next'

interface VersionCardProps {
  version: number
  date: string
  savedBy: string
  published: boolean
  id: number
  selectable?: boolean
  selected?: boolean
  autosaved: boolean
  activeDefault?: boolean
  ownDraft?: boolean
  scheduledDate?: string
  note?: string
  onClick?: () => void
  onClickPublish: () => void
  onClickDelete: () => void
  onBlurNote: (e) => void
  onChangeCheckbox?: (e) => void
  className?: string
}

export const VersionCard = ({
  version,
  date,
  savedBy,
  published,
  id,
  selectable = false,
  selected = false,
  autosaved,
  activeDefault = false,
  ownDraft,
  scheduledDate,
  note = '',
  onClick,
  onClickPublish,
  onClickDelete,
  onBlurNote,
  onChangeCheckbox,
  className
}: VersionCardProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { t } = useTranslation()

  const [isExpanded, setIsExpanded] = useState(false)

  const chevronOnClick = (e: any): void => {
    setIsExpanded(!isExpanded)
  }

  const title = (
    <div>
      <div>
        { selectable && (
        <Checkbox
          checked={ selected }
          onChange={ onChangeCheckbox }
        />
        ) }
        <span className={ 'title' }>{`${t('version.version')} ${version} | ${date} `}</span>
        <Button
          aria-label={ t('aria.version.expand') }
          icon={ <Icon
            className={ ['chevron', isExpanded ? 'chevron-up' : ''].join(' ') }
            name="chevron-up"
                 /> }
          onClick={ chevronOnClick }
          role={ 'button' }
          size="small"
          type="text"
        />
      </div>
      <div>
        <span className={ 'sub-title' } >{`${t('by')} ${savedBy}`}</span>
        {isSet(autosaved) && autosaved && <Icon name="lightning-01" /> }
      </div>
    </div>
  )

  let extra
  let classNameByState = activeDefault ? 'card__is-active' : ''

  if (published) {
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
  } else if (isSet(ownDraft) && ownDraft!) {
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

  return (
    <div className={ [styles.card, className].join(' ') }>
      <Card
        className={ [classNameByState, isExpanded ? 'card-body__expand' : 'card-body__hide'].join(' ') }
        extra={ extra }
        onClick={ onClick }
        size="small"
        style={ { width: 300 } }
        title={ title }
      >
        <div className={ 'flexbox-start-end' }>
          <Tag className={ 'id-tag' }>ID: {id}</Tag>
          <div>
            {!published && (
              <Button
                className={ 'btn-publish' }
                icon={ <Icon name="world" /> }
                onClick={ onClickPublish }
              >
                {t('version.publish')}
              </Button>
            )}
            <Button
              aria-label={ t('aria.version.delete') }
              icon={ <Icon name="trash" /> }
              onClick={ onClickDelete }
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
            onBlur={ onBlurNote }
            placeholder={ 'Add a note' }
          />
        </div>
      </Card>
    </div>
  )
}
