/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DocTypeType, DocumentController, DocumentTemplate, useDocumentAvailableControllersListQuery, useDocumentAvailableTemplatesListQuery} from '@Pimcore/modules/document/document-api-slice.gen'
import { DocumentsListAvailableSitesApiArg, Site, useDocumentsListAvailableSitesQuery } from '@sdk/api/documents'
import { isUndefined } from 'lodash'


export type DocumentTypeRow = DocTypeType & { rowId: string }

interface UseDocumentTypeReturn {
controllers: DocumentController[] | undefined
controllersLoading: boolean
templates: DocumentTemplate[] | undefined
templatesLoading: boolean
sites: Site[] | undefined
sitesLoading: boolean
}

export const useDocumentType = (): UseDocumentTypeReturn => {
  const {data: controllers, isLoading: controllersLoading } = useDocumentAvailableControllersListQuery()
  const {data: templates, isLoading: templatesLoading } = useDocumentAvailableTemplatesListQuery()

  const listAvailableSitesQueryArgs: DocumentsListAvailableSitesApiArg = {excludeMainSite: false}
  const {data: sites, isLoading: sitesLoading } = useDocumentsListAvailableSitesQuery(listAvailableSitesQueryArgs)


  return {
    controllers: !isUndefined(controllers) ? controllers?.items : undefined,
    controllersLoading,
    templates: !isUndefined(templates) ? templates?.items : undefined,
    templatesLoading,
    sites: !isUndefined(sites) ? sites?.items : undefined,
    sitesLoading
  }
}