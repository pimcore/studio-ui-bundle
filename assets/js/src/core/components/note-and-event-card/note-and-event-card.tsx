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

import { Button, Card, Tag } from 'antd'
import React, { useState } from 'react'
import { useStyle } from './note-and-event-card.styles'
import { Icon } from '../icon/icon'
import { useTranslation } from 'react-i18next'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'

interface NoteAndEventCardProps {
  title: string
  type: string
  user?: string | null
  date: string
  description: string
  data: any
  showDetails?: boolean
  onClickTrash?: () => void
  className?: string
}

export const NoteAndEventCard = ({
  title,
  type,
  user,
  date,
  description,
  data,
  showDetails = true,
  onClickTrash,
  className
}: NoteAndEventCardProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { i18n } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  const columnHelper = createColumnHelper<any>()

  const columns = [
    columnHelper.accessor(i18n.t('notes-and-events.name'), {}),
    columnHelper.accessor(i18n.t('notes-and-events.type'), {}),
    columnHelper.accessor(i18n.t('notes-and-events.value'), {})
  ]

  const titleElement = (
    <div>
      <span className={ 'card-title' }>{title}</span>
      <Button
        aria-label={ i18n.t('aria.notes-and-events.expand') }
        className={ 'card-title__chevron-btn' }
        icon={ <Icon
          className={ ['chevron', isExpanded ? 'chevron-up' : ''].join(' ') }
          name={ 'chevron-up' }
               /> }
        onClick={ onClickChevron }
        role={ 'button' }
        size="small"
        type={ 'text' }
      />
      <span className={ 'card-title__user' }>{user}</span>
    </div>
  )

  const extra = (
    <div>
      <Tag>{type}</Tag>
      <span>{date}</span>
      <Button
        aria-label={ i18n.t('aria.notes-and-events.delete') }
        icon={ <Icon
          className={ 'card-extra__trash-icon' }
          name={ 'trash' }
               /> }
        onClick={ onClickTrash }
        type={ 'text' }
      />
    </div>
  )

  return (
    <div className={ [styles.card, className].join(' ') }>
      <Card
        className={ isExpanded ? 'card-body__expand' : 'card-body__hide' }
        extra={ extra }
        title={ titleElement }
      >
        <span className={ 'card-body__description ' + (showDetails ? 'card-body__description-padding' : '') }>
          {description}
        </span>
        {showDetails && (
          <div>
            <span className={ 'card-body__details' }>{i18n.t('notes-and-events.details')}</span>
            <Grid
              columns={ columns }
              data={ data }
            />
          </div>
        )}
      </Card>
    </div>
  )

  function onClickChevron (): void {
    setIsExpanded(!isExpanded)
  }
}
