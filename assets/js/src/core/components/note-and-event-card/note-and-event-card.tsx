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

import {Button, Card, Space, Tag} from 'antd'
import React, {useState} from 'react'
import { useStyle } from './note-and-event-card.styles'
import { Icon } from '../icon/icon'
import {useTranslation} from "react-i18next";
import {Grid} from "@Pimcore/components/grid/grid";
import {createColumnHelper} from "@tanstack/react-table";


interface NoteAndEventCardProps {
  title: string
  type: string
  date: string
  description: string
  data: any
}

export const NoteAndEventCard = ({
  title, type, date, description, data
}: NoteAndEventCardProps): React.JSX.Element => {
  const {styles} = useStyle()
  const {i18n} = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  const columnHelper = createColumnHelper<any>()

  const columns = [
    columnHelper.accessor(i18n.t('notes-and-events.name'), {}),
    columnHelper.accessor(i18n.t('notes-and-events.type'), {}),
    columnHelper.accessor(i18n.t('notes-and-events.value'), {})
  ]

  const onClickChevron = () => {
    setIsExpanded(!isExpanded)
  }

  const titleElement =
    <div>
      <span className={'card-title'}>{title}</span>
      <Button
        type={'text'}
        aria-label={i18n.t('aria.notes-and-events.expand')}
        onClick={onClickChevron}
        icon={<Icon
            className={ ['chevron', isExpanded ? 'chevron-up' : ''].join(' ') }
            name={'chevron-up-small'}
          />}
        role={ 'button' }
        size="small"
        className={'card-title__chevron-btn'}
      />
    </div>

  const extra =
    <div>
      <Tag>{type}</Tag>
      <span>{date}</span>
      <Button
        type={'text'}
        aria-label={i18n.t('aria.notes-and-events.delete')}
        icon={<Icon name={'trash'} className={'card-extra__trash-icon'}/>}
      />
    </div>

  return (
    <div className={styles.card}>
      <Card title={titleElement} extra={extra} className={isExpanded ? 'card-body__expand' : 'card-body__hide'}>
        <div className={'card-body__description'}>{description}</div>
        <div className={'card-body__details'}>{i18n.t('notes-and-events.details')}</div>
        <Grid data={data} columns={columns}/>
      </Card>
    </div>
  )
}
