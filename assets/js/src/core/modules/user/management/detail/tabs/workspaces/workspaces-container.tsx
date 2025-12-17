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
import type { UserWorkspace, UserDocumentWorkspace } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { useUserManagementDraft } from '@Pimcore/modules/user/hooks/use-user-management-draft'
import { useUserManagementContext } from '@Pimcore/modules/user/hooks/use-user-management-context'
import { Flex } from '@Pimcore/components/flex/flex'
import { useModal } from '@Pimcore/components/modal/useModal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'
import { createTabContentTestId } from '@Pimcore/utils/test-id-generator'
import { SpecialSettings } from '@Pimcore/modules/user/management/detail/tabs/workspaces/components/special-settings'

export enum WorkspaceType {
  DOCUMENT = 'document',
  ASSET = 'asset',
  OBJECT = 'object'
}

const WorkspacesContainer = ({ ...props }): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useUserManagementContext()
  const { user, isLoading, changeUserInState } = useUserManagementDraft(id)

  const [assetWorkspaces, setAssetWorkspaces] = useState<UserWorkspace[]>(user?.assetWorkspaces ?? [])
  const [documentWorkspaces, setDocumentWorkspaces] = useState<UserWorkspace[]>(user?.documentWorkspaces ?? [])
  const [objectWorkspaces, setObjectWorkspaces] = useState<UserDocumentWorkspace[]>(user?.dataObjectWorkspaces ?? [])

  const [specialModalContext, setSpecialModalContext] = useState<number | null>(null)

  const {
    showModal: showDuplicatePropertyModal,
    closeModal: closeDuplicatePropertyModal,
    renderModal: DuplicatePropertyModal
  } = useModal({
    type: 'error'
  })

  const { renderModal: SpecialSettingsModal, showModal: showSpecialSettingsModal, handleCancel, handleOk } = useModal({ type: 'default' })

  if (user === undefined) {
    return <></>
  }

  const documentsAccordion = [
    {
      key: 'documents',
      id: 'documents',
      title: <>{ t('user-management.workspaces.documents') }</>,
      info: (
        <IconTextButton
          icon={ { value: 'add-find' } }
          onClick={ () => {
            setDocumentWorkspaces([...user.documentWorkspaces, {
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
            }])
          } }
        >
          { t('user-management.workspaces.add') }
        </IconTextButton>
      ),
      children: (
        <Table
          data={ documentWorkspaces }
          isLoading={ isLoading }
          onUpdateData={ (data) => { changeUserInState({ documentWorkspaces: data }) } }
          showDuplicatePropertyModal={ () => {
            showDuplicatePropertyModal()
          } }
          type={ WorkspaceType.DOCUMENT }
        />
      )
    }
  ]

  const assetsAccordion = [
    {
      key: 'assets',
      id: 'assets',
      title: <>{ t('user-management.workspaces.assets') }</>,
      info: (
        <IconTextButton
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
        >
          { t('user-management.workspaces.add') }
        </IconTextButton>
      ),
      children: (
        <Table
          data={ assetWorkspaces }
          isLoading={ isLoading }
          onUpdateData={ (data) => { changeUserInState({ assetWorkspaces: data }) } }
          showDuplicatePropertyModal={ () => {
            showDuplicatePropertyModal()
          } }
          type={ WorkspaceType.ASSET }
        />
      )
    }
  ]

  let currentSpecialModalData: object = {}

  const getSpecialModalValues = (type: string): string[] => {
    return user?.dataObjectWorkspaces.find(ws => ws.cid === specialModalContext)?.[type] ?? []
  }

  const objectsAccordion = [
    {
      key: 'objects',
      id: 'objects',
      title: <>{ t('user-management.workspaces.objects') }</>,
      info: (
        <IconTextButton
          icon={ { value: 'add-find' } }
          onClick={ () => {
            setObjectWorkspaces([...user.dataObjectWorkspaces, {
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
            }])
          } }
        >
          { t('user-management.workspaces.add') }
        </IconTextButton>
      ),
      children: (
        <Table
          data={ objectWorkspaces }
          isLoading={ isLoading }
          onShowSpecialSettings={ (id) => {
            setSpecialModalContext(id)
            showSpecialSettingsModal()
          } }
          onUpdateData={ (data) => { changeUserInState({ dataObjectWorkspaces: data }) } }
          showDuplicatePropertyModal={ () => {
            showDuplicatePropertyModal()
          } }
          type={ WorkspaceType.OBJECT }
        />
      )
    }
  ]

  return (
    <Flex
      data-testid={ createTabContentTestId(id.toString(), { prefix: 'user-detail-tab', tabKey: 'workspaces' }) }
      gap={ 'small' }
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
        footer={ (
          <ModalFooter>
            <Button
              onClick={ closeDuplicatePropertyModal }
              type='primary'
            >
              {t('button.ok')}
            </Button>
          </ModalFooter>
        ) }
        title={ t('properties.property-already-exist.title') }
      >
        {t('properties.property-already-exist.error')}
      </DuplicatePropertyModal>

      <SpecialSettingsModal
        footer={
          <ModalFooter>
            <Button
              onClick={ handleCancel }
              type={ 'default' }
            >
              {t('button.cancel')}
            </Button>
            <Button
              onClick={ () => {
                changeUserInState({
                  dataObjectWorkspaces: user.dataObjectWorkspaces.map(ws => ws.cid === specialModalContext ? { ...ws, ...currentSpecialModalData } : ws)
                })

                handleOk()
              } }
              type={ 'primary' }
            >
              {t('button.apply')}
            </Button>
          </ModalFooter>
            }
        size={ 'L' }
        title={ t('user-management.workspaces.additional-settings') }
      >
        <SpecialSettings
          layouts={ getSpecialModalValues('layouts') }
          localizedEdit={ getSpecialModalValues('localizedEdit') }
          localizedView={ getSpecialModalValues('localizedView') }
          onValuesChange={ (changedValues) => {
            const mergedData = { ...currentSpecialModalData, ...changedValues }
            currentSpecialModalData = mergedData
          } }
        />
      </SpecialSettingsModal>
    </Flex>
  )
}

export { WorkspacesContainer }
