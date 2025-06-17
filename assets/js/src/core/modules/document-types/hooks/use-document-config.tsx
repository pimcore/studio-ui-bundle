/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DocTypeType, DocumentController, DocumentTemplate, useDocumentAvailableControllersListQuery,useDocumentDocTypeTypeListQuery, useDocumentAvailableTemplatesListQuery} from '@Pimcore/modules/document/document-api-slice.gen'
import { DocumentsListAvailableSitesApiArg, Site, useDocumentsListAvailableSitesQuery } from '@sdk/api/documents'
import { isUndefined } from 'lodash'


export type DocumentTypeRow = DocTypeType & { rowId: string }

interface UseDocumentConfigReturn {
controllers: DocumentController[]
controllersLoading: boolean
templates: DocumentTemplate[]
templatesLoading: boolean
sites: Site[] 
sitesLoading: boolean
docTypes: DocTypeType[]
doyTypesLoading: boolean
}

export const useDocumentConfig = (): UseDocumentConfigReturn => {
  const {data: controllers, isLoading: controllersLoading } = useDocumentAvailableControllersListQuery()
  const {data: templates, isLoading: templatesLoading } = useDocumentAvailableTemplatesListQuery()

  const listAvailableSitesQueryArgs: DocumentsListAvailableSitesApiArg = {excludeMainSite: false}
  const {data: sites, isLoading: sitesLoading } = useDocumentsListAvailableSitesQuery(listAvailableSitesQueryArgs)
  const {data: docTypes, isLoading: docTypesLoading } = useDocumentDocTypeTypeListQuery()


  return {
    controllers: !isUndefined(controllers) ? controllers?.items : [],
    controllersLoading,
    templates: !isUndefined(templates) ? templates?.items : [],
    templatesLoading,
    sites: !isUndefined(sites) ? sites?.items : [],
    sitesLoading,
    docTypes:!isUndefined(docTypes) ? docTypes?.items : [],
    docTypesLoading
  }
}