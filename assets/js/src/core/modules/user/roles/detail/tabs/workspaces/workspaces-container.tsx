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

const WorkspacesContainer = ({ ...props }): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useRoleContext()
  const { item, isLoading, changeItemInState } = useRoleDraft(id)

  if (item === undefined) {
    return <></>
  }

  const [assetWorkspaces, setAssetWorkspaces] = React.useState<UserWorkspace[]>(item?.assetWorkspaces ?? [])
  const [documentWorkspaces, setDocumentWorkspaces] = React.useState<UserWorkspace[]>(item?.documentWorkspaces ?? [])
  const [objectWorkspaces, setObjectWorkspaces] = React.useState<UserWorkspace[]>(item?.dataObjectWorkspaces ?? [])

  const {
    showModal: showDuplicatePropertyModal,
    closeModal: closeDuplicatePropertyModal,
    renderModal: DuplicatePropertyModal
  } = useModal({
    type: 'error'
  })

  const documentsAccordion = [
    {
      key: '1',
      title: <>{ t('user-management.workspaces.documents') }</>,
      info: <> <IconTextButton
        icon={ { value: 'add-find' } }
        onClick={ () => {
          setDocumentWorkspaces([...item.documentWorkspaces, {
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
        onUpdateData={ (data) => { changeItemInState({ documentWorkspaces: data }) } }
        showDuplicatePropertyModal={ () => {
          showDuplicatePropertyModal()
        } }
                />
    }
  ]

  const assetsAccordion = [
    {
      key: '1',
      title: <>{ t('user-management.workspaces.assets') }</>,
      info: <> <IconTextButton
        icon={ { value: 'add-find' } }
        onClick={ () => {
          setAssetWorkspaces([...item.assetWorkspaces, {
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
        onUpdateData={ (data) => { changeItemInState({ assetWorkspaces: data }) } }
        showDuplicatePropertyModal={ () => {
          showDuplicatePropertyModal()
        } }
                />
    }
  ]

  const objectsAccordion = [
    {
      key: '1',
      title: <>{ t('user-management.workspaces.objects') }</>,
      info: <> <IconTextButton
        icon={ { value: 'add-find' } }
        onClick={ () => {
          setObjectWorkspaces([...item.dataObjectWorkspaces, {
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
        onUpdateData={ (data) => { changeItemInState({ dataObjectWorkspaces: data }) } }
        showDuplicatePropertyModal={ () => {
          showDuplicatePropertyModal()
        } }
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
    </Flex>
  )
}

export { WorkspacesContainer }
