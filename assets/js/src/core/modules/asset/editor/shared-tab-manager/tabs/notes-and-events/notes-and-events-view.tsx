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

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import {NoteAndEventCard} from "@Pimcore/components/note-and-event-card/note-and-event-card";

export const NotesAndEventsTabView = (): React.JSX.Element => {
  const { t } = useTranslation()
  return (
    <div>
      <div>
        <span>{t('notes-and-events.notes-and-events')}</span>
        <Button title={ t('add') } />
      </div>
      {/*<NoteAndEventCard title={} type={} date={} description={} data={} />*/}
      <div>

      </div>
    </div>
  )
}
