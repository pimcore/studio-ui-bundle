/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Content } from '@Pimcore/components/content/content'
import { useModal } from '@Pimcore/components/modal/useModal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'
import { Table } from '@Pimcore/modules/user/management/detail/tabs/workspaces/components/table/table'
import { SpecialSettingsModal } from '@Pimcore/modules/user/management/detail/tabs/workspaces/components/special-settings-modal'
import { WorkspaceType } from '@Pimcore/modules/user/management/detail/tabs/workspaces/workspace-type'
import { type UserWorkspace } from '@Pimcore/modules/user/roles/roles-api-slice.gen'
import { type ServiceUserDraft } from '../service-user-draft'
import { type UserDocumentWorkspace2 } from '../../service-users-api-slice-enhanced'

type WorkspaceDraft = Pick<ServiceUserDraft, 'assetWorkspaces' | 'dataObjectWorkspaces' | 'documentWorkspaces'>

interface WorkspacesTabProps {
  draft: WorkspaceDraft
  onChange: (change: Partial<ServiceUserDraft>) => void
}

const FIELD_BY_TYPE: Record<WorkspaceType, keyof WorkspaceDraft> = {
  [WorkspaceType.DOCUMENT]: 'documentWorkspaces',
  [WorkspaceType.ASSET]: 'assetWorkspaces',
  [WorkspaceType.OBJECT]: 'dataObjectWorkspaces'
}

const TITLE_BY_TYPE: Record<WorkspaceType, string> = {
  [WorkspaceType.DOCUMENT]: 'user-management.workspaces.documents',
  [WorkspaceType.ASSET]: 'user-management.workspaces.assets',
  [WorkspaceType.OBJECT]: 'user-management.workspaces.objects'
}

const newWorkspace = (): UserDocumentWorkspace2 => ({
  cid: new Date().getTime(), // replaced by the element id once a path is chosen
  cpath: '',
  list: false,
  view: false,
  save: false,
  publish: false,
  unpublish: false,
  delete: false,
  rename: false,
  create: false,
  settings: false,
  versions: false,
  properties: false
})

export const WorkspacesTab = ({ draft, onChange }: WorkspacesTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [specialSettingsId, setSpecialSettingsId] = useState<number | null>(null)
  const {
    showModal: showDuplicateModal,
    closeModal: closeDuplicateModal,
    renderModal: DuplicateModal
  } = useModal({ type: 'error' })

  const workspacesOf = (type: WorkspaceType): UserWorkspace[] => draft[FIELD_BY_TYPE[type]] as UserWorkspace[]

  const update = (type: WorkspaceType, workspaces: UserWorkspace[]): void => {
    onChange({ [FIELD_BY_TYPE[type]]: workspaces })
  }

  const specialSettingsWorkspace = draft.dataObjectWorkspaces.find((workspace) => workspace.cid === specialSettingsId)
  const specialSettingsValue = (key: 'layouts' | 'localizedEdit' | 'localizedView'): string[] =>
    (specialSettingsWorkspace as Record<string, unknown> | undefined)?.[key] as string[] | undefined ?? []

  const renderAccordion = (type: WorkspaceType): React.JSX.Element => (
    <Accordion
      activeKey="1"
      bordered
      collapsible="icon"
      items={ [{
        key: '1',
        title: <>{t(TITLE_BY_TYPE[type])}</>,
        info: (
          <IconTextButton
            icon={ { value: 'add-find' } }
            onClick={ () => { update(type, [...workspacesOf(type), newWorkspace()]) } }
          >
            {t('user-management.workspaces.add')}
          </IconTextButton>
        ),
        children: (
          <Table
            data={ workspacesOf(type) }
            isLoading={ false }
            onShowSpecialSettings={ type === WorkspaceType.OBJECT ? setSpecialSettingsId : undefined }
            onUpdateData={ (workspaces) => { update(type, workspaces) } }
            showDuplicatePropertyModal={ showDuplicateModal }
            type={ type }
          />
        )
      }] }
      size="small"
      table
    />
  )

  return (
    <Content padded>
      <Flex
        gap="normal"
        vertical
      >
        {renderAccordion(WorkspaceType.DOCUMENT)}
        {renderAccordion(WorkspaceType.ASSET)}
        {renderAccordion(WorkspaceType.OBJECT)}

        <DuplicateModal
          footer={
            <ModalFooter>
              <Button
                onClick={ closeDuplicateModal }
                type="primary"
              >
                {t('button.ok')}
              </Button>
            </ModalFooter>
          }
          title={ t('properties.property-already-exist.title') }
        >
          {t('properties.property-already-exist.error')}
        </DuplicateModal>

        <SpecialSettingsModal
          cpath={ specialSettingsWorkspace?.cpath ?? '' }
          initialValues={ {
            layouts: specialSettingsValue('layouts'),
            localizedEdit: specialSettingsValue('localizedEdit'),
            localizedView: specialSettingsValue('localizedView')
          } }
          key={ specialSettingsId ?? 'none' }
          onApply={ (changes) => {
            onChange({
              dataObjectWorkspaces: draft.dataObjectWorkspaces.map((workspace) =>
                workspace.cid === specialSettingsId ? { ...workspace, ...changes } : workspace
              ) as ServiceUserDraft['dataObjectWorkspaces']
            })
            setSpecialSettingsId(null)
          } }
          onCancel={ () => { setSpecialSettingsId(null) } }
          open={ specialSettingsId !== null }
        />
      </Flex>
    </Content>
  )
}
