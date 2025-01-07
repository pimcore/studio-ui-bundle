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

import { type Site, useDocumentsListAvailableSitesQuery } from '@Pimcore/modules/document/sites-slice.gen'

export interface UseSitesReturn {
  getSiteById: (siteId: number) => Site | undefined
  getAllSites: () => Site[]
  getSitesByIds: (ids: number[]) => Site[]
  getRemainingSites: (ids: number[], filteredSiteIds?: number[]) => Site[]
}

export const useSites = (): UseSitesReturn => {
  const { data: sites } = useDocumentsListAvailableSitesQuery({ excludeMainSite: false })

  const getSiteById = (siteId: number): Site | undefined => {
    return sites?.items?.find(site => site.id === siteId)
  }

  const getAllSites = (): Site[] => {
    return sites?.items ?? []
  }

  const getSitesByIds = (ids: number[]): Site[] => {
    return sites?.items?.filter(site => ids.includes(site.id)) ?? []
  }

  const getRemainingSites = (ids: number[], filteredSiteIds?: number[]): Site[] => {
    const filteredSites = filteredSiteIds !== undefined && filteredSiteIds.length > 0
      ? getSitesByIds(filteredSiteIds)
      : sites?.items
    return filteredSites?.filter(site => !ids.includes(site.id)) ?? []
  }

  return {
    getSiteById,
    getAllSites,
    getSitesByIds,
    getRemainingSites
  }
}
