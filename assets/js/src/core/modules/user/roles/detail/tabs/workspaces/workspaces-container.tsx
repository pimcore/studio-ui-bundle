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
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useTranslation } from 'react-i18next'
import { Table } from '@Pimcore/modules/user/management/detail/tabs/workspaces/components/table/table'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import type { UserWorkspace } from '@Pimcore/modules/user/roles/roles-api-slice.gen'
import { useRoleContext } from '@Pimcore/modules/user/roles/hooks/use-role-context'
import { useRoleDraft } from '@Pimcore/modules/user/roles/hooks/use-roles-draft'
import { Flex } from 'antd'
import { useModal } from '@Pimcore/components/modal/useModal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'
import { SpecialSettingsModal } from '@Pimcore/modules/user/management/detail/tabs/workspaces/components/special-settings-modal'
import { WorkspaceType } from '@Pimcore/modules/user/management/detail/tabs/workspaces/workspace-type'

const WorkspacesContainer = ({ ...props }): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useRoleContext()
  const { role, isLoading, changeRoleInState } = useRoleDraft(id)

  const [assetWorkspaces, setAssetWorkspaces] = React.useState<UserWorkspace[]>(role?.assetWorkspaces ?? [])
  const [documentWorkspaces, setDocumentWorkspaces] = React.useState<UserWorkspace[]>(role?.documentWorkspaces ?? [])
  const [objectWorkspaces, setObjectWorkspaces] = React.useState<UserWorkspace[]>(role?.dataObjectWorkspaces ?? [])

  const [specialModalContext, setSpecialModalContext] = useState<number | null>(null)
  const [isSpecialSettingsModalOpen, setIsSpecialSettingsModalOpen] = useState(false)

  const {
    showModal: showDuplicatePropertyModal,
    closeModal: closeDuplicatePropertyModal,
    renderModal: DuplicatePropertyModal
  } = useModal({
    type: 'error'
  })

  if (role === undefined) {
    return <></>
  }

  const handleAddNewWorkspaces = (workspaces: UserWorkspace[], type): void => {
    const workspace = {
      cid: new Date().getTime(), // after path update is set to document id
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
    }

    switch (type) {
      case WorkspaceType.DOCUMENT:
        setDocumentWorkspaces([...workspaces, workspace])
        break
      case WorkspaceType.ASSET:
        setAssetWorkspaces([...workspaces, workspace])
        break
      case WorkspaceType.OBJECT:
        setObjectWorkspaces([...workspaces, workspace])
        break
    }
  }

  const getSpecialModalValues = (type: string): string[] => {
    const ws = role?.dataObjectWorkspaces.find(ws => ws.cid === specialModalContext) as Record<string, any> | undefined
    return ws?.[type] ?? []
  }

  const documentsAccordion = [
    {
      key: '1',
      title: <>{ t('user-management.workspaces.documents') }</>,
      info: <IconTextButton
        icon={ { value: 'add-find' } }
        onClick={ () => { handleAddNewWorkspaces(role.documentWorkspaces, 'document') } }
            >{ t('user-management.workspaces.add') }</IconTextButton>,
      children: <Table
        data={ documentWorkspaces }
        isLoading={ isLoading }
        onUpdateData={ (data) => { changeRoleInState({ documentWorkspaces: data }) } }
        showDuplicatePropertyModal={ () => {
          showDuplicatePropertyModal()
        } }
        type={ WorkspaceType.DOCUMENT }
                />
    }
  ]

  const assetsAccordion = [
    {
      key: '1',
      title: <>{ t('user-management.workspaces.assets') }</>,
      info: <IconTextButton
        icon={ { value: 'add-find' } }
        onClick={ () => { handleAddNewWorkspaces(role.assetWorkspaces, 'asset') } }
            >{ t('user-management.workspaces.add') }</IconTextButton>,
      children: <Table
        data={ assetWorkspaces }
        isLoading={ isLoading }
        onUpdateData={ (data) => { changeRoleInState({ assetWorkspaces: data }) } }
        showDuplicatePropertyModal={ () => {
          showDuplicatePropertyModal()
        } }
        type={ WorkspaceType.ASSET }
                />
    }
  ]

  const objectsAccordion = [
    {
      key: '1',
      title: <>{ t('user-management.workspaces.objects') }</>,
      info: <IconTextButton
        icon={ { value: 'add-find' } }
        onClick={ () => { handleAddNewWorkspaces(role.dataObjectWorkspaces, 'object') } }
            >{ t('user-management.workspaces.add') }</IconTextButton>,
      children: <Table
        data={ objectWorkspaces }
        isLoading={ isLoading }
        onShowSpecialSettings={ (cid) => {
          setSpecialModalContext(cid)
          setIsSpecialSettingsModalOpen(true)
        } }
        onUpdateData={ (data) => { changeRoleInState({ dataObjectWorkspaces: data }) } }
        showDuplicatePropertyModal={ () => {
          showDuplicatePropertyModal()
        } }
        type={ WorkspaceType.OBJECT }
                />
    }
  ]

  return (
    <Flex
      gap={ 'middle' }
      vertical
    >
      <Accordion
        activeKey={ '1' }
        bordered
        collapsible="icon"
        items={ documentsAccordion }
        size={ 'small' }
        table
      />

      <Accordion
        activeKey={ '1' }
        bordered
        collapsible="icon"
        items={ assetsAccordion }
        size={ 'small' }
        table
      />

      <Accordion
        activeKey={ '1' }
        bordered
        collapsible="icon"
        items={ objectsAccordion }
        size={ 'small' }
        table
      />

      <DuplicatePropertyModal
        footer={ <ModalFooter>
          <Button
            onClick={ closeDuplicatePropertyModal }
            type='primary'
          >{t('button.ok')}</Button>
        </ModalFooter> }
        title={ t('properties.property-already-exist.title') }
      >
        {t('properties.property-already-exist.error')}
      </DuplicatePropertyModal>

      <SpecialSettingsModal
        cpath={ role.dataObjectWorkspaces.find(ws => ws.cid === specialModalContext)?.cpath ?? '' }
        initialValues={ {
          layouts: getSpecialModalValues('layouts'),
          localizedEdit: getSpecialModalValues('localizedEdit'),
          localizedView: getSpecialModalValues('localizedView')
        } }
        key={ specialModalContext ?? 'none' }
        onApply={ (changes) => {
          changeRoleInState({
            dataObjectWorkspaces: role.dataObjectWorkspaces.map(ws => ws.cid === specialModalContext ? { ...ws, ...changes } : ws)
          })
          setIsSpecialSettingsModalOpen(false)
        } }
        onCancel={ () => { setIsSpecialSettingsModalOpen(false) } }
        open={ isSpecialSettingsModalOpen }
      />
    </Flex>
  )
}

export { WorkspacesContainer }
