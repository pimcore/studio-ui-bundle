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
import type { UserWorkspace } from '@Pimcore/modules/user/user-api-slice.gen'
import { useUserDraft } from '@Pimcore/modules/user/hooks/use-user-draft'
import { useUserContext } from '@Pimcore/modules/user/hooks/use-user-context'
import { Flex } from 'antd'
import { useModal } from '@Pimcore/components/modal/useModal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'

const WorkspacesContainer = ({ ...props }): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useUserContext()
  const { user, isLoading, changeUserInState } = useUserDraft(id)

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
      key: '1',
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
