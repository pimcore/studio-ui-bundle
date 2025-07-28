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
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useTranslation } from 'react-i18next'
import { Table } from '@Pimcore/modules/user/management/detail/tabs/workspaces/components/table/table'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import type { UserWorkspace } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { useUserManagementDraft } from '@Pimcore/modules/user/hooks/use-user-management-draft'
import { useUserManagementContext } from '@Pimcore/modules/user/hooks/use-user-management-context'
import { Flex } from 'antd'
import { useModal } from '@Pimcore/components/modal/useModal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'

const WorkspacesContainer = ({ ...props }): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useUserManagementContext()
  const { user, isLoading, changeUserInState } = useUserManagementDraft(id)

  const [assetWorkspaces, setAssetWorkspaces] = React.useState<UserWorkspace[]>(user?.assetWorkspaces ?? [])
  const [documentWorkspaces, setDocumentWorkspaces] = React.useState<UserWorkspace[]>(user?.documentWorkspaces ?? [])
  const [objectWorkspaces, setObjectWorkspaces] = React.useState<UserWorkspace[]>(user?.dataObjectWorkspaces ?? [])

  const {
    showModal: showDuplicatePropertyModal,
    closeModal: closeDuplicatePropertyModal,
    renderModal: DuplicatePropertyModal
  } = useModal({
    type: 'error'
  })

  if (user === undefined) {
    return <></>
  }

  const documentsAccordion = [
    {
      key: 'documents',
      id: 'documents',
      title: <>{ t('user-management.workspaces.documents') }</>,
      info: <> <IconTextButton
        icon={ { value: 'add-find' } }
        onClick={ () => {
          setDocumentWorkspaces([...user.documentWorkspaces, {
            cid: new Date().getTime(), // after path update is set to document id
            cpath: '',
            list: false,
            view: false,
            publish: false,
            delete: false,
            rename: false,
            create: false,
            settings: false,
            versions: false,
            properties: false
          }])
        } }
               >{ t('user-management.workspaces.add') }</IconTextButton></>,
      children: <Table
        data={ documentWorkspaces }
        isLoading={ isLoading }
        onUpdateData={ (data) => { changeUserInState({ documentWorkspaces: data }) } }
        showDuplicatePropertyModal={ () => {
          showDuplicatePropertyModal()
        } }
        type={ 'document' }
                />
    }
  ]

  const assetsAccordion = [
    {
      key: 'assets',
      id: 'assets',
      title: <>{ t('user-management.workspaces.assets') }</>,
      info: <> <IconTextButton
        icon={ { value: 'add-find' } }
        onClick={ () => {
          setAssetWorkspaces([...user.assetWorkspaces, {
            cid: new Date().getTime(), // after path update is set to document id
            cpath: '',
            list: false,
            view: false,
            publish: false,
            delete: false,
            rename: false,
            create: false,
            settings: false,
            versions: false,
            properties: false
          }])
        } }
               >{ t('user-management.workspaces.add') }</IconTextButton></>,
      children: <Table
        data={ assetWorkspaces }
        isLoading={ isLoading }
        onUpdateData={ (data) => { changeUserInState({ assetWorkspaces: data }) } }
        showDuplicatePropertyModal={ () => {
          showDuplicatePropertyModal()
        } }
        type={ 'asset' }
                />
    }
  ]

  const objectsAccordion = [
    {
      key: 'objects',
      id: 'objects',
      title: <>{ t('user-management.workspaces.objects') }</>,
      info: <> <IconTextButton
        icon={ { value: 'add-find' } }
        onClick={ () => {
          setObjectWorkspaces([...user.dataObjectWorkspaces, {
            cid: new Date().getTime(), // after path update is set to document id
            cpath: '',
            list: false,
            view: false,
            publish: false,
            delete: false,
            rename: false,
            create: false,
            settings: false,
            versions: false,
            properties: false
          }])
        } }
               >{ t('user-management.workspaces.add') }</IconTextButton></>,
      children: <Table
        data={ objectWorkspaces }
        isLoading={ isLoading }
        onUpdateData={ (data) => { changeUserInState({ dataObjectWorkspaces: data }) } }
        showDuplicatePropertyModal={ () => {
          showDuplicatePropertyModal()
        } }
        type={ 'object' }
                />
    }
  ]

  return (
    <Flex
      gap={ 'middle' }
      vertical
    >
      <Accordion
        activeKey={ 'documents' }
        bordered
        collapsible="icon"
        items={ documentsAccordion }
        size={ 'small' }
        table
      />

      <Accordion
        activeKey={ 'assets' }
        bordered
        collapsible="icon"
        items={ assetsAccordion }
        size={ 'small' }
        table
      />

      <Accordion
        activeKey={ 'objects' }
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
    </Flex>
  )
}

export { WorkspacesContainer }
