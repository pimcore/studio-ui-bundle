/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ContentLayout, IconButton, Toolbar } from '@sdk/components'
import { Content } from '@Pimcore/components/content/content'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { isNil } from 'lodash'
import { useStyles } from './robots-txt-container.styles'
import { useBundleSeoRobotsTxtGetQuery, useBundleSeoRobotsTxtUpdateMutation } from '../redirects/seo-api-slice-enhanced'
import trackError, { ApiError } from '../app/error-handler'
import { useSites } from '@Pimcore/modules/document/hooks/use-sites'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { RobotsTxtSiteEditor } from './components/robots-txt-site-editor'
import type { BundleSeoRobotsTxtSiteConfig } from '../redirects/seo-api-slice-enhanced'

export const RobotsTxtContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const messageApi = useMessage()
  const { styles } = useStyles()
  const { getAllSites } = useSites({ excludeMainSite: true })

  const { data, isLoading, isFetching, error: loadError, refetch } = useBundleSeoRobotsTxtGetQuery(undefined, {
    refetchOnMountOrArgChange: true
  })
  const [updateRobotsTxt, { isSuccess: isSaveSuccess, error: updateError, isLoading: isSaving }] = useBundleSeoRobotsTxtUpdateMutation()

  const isLoadingOrFetching = isLoading || isFetching

  const [siteConfigs, setSiteConfigs] = useState<BundleSeoRobotsTxtSiteConfig[]>([])

  useEffect(() => {
    if (!isNil(loadError)) {
      trackError(new ApiError(loadError))
    }
  }, [loadError])

  useEffect(() => {
    if (!isNil(updateError)) {
      trackError(new ApiError(updateError))
    }
  }, [updateError])

  useEffect(() => {
    if (isSaveSuccess) {
      void messageApi.success(t('robots-txt.save-success'))
    }
  }, [isSaveSuccess])

  useEffect(() => {
    if (!isNil(data)) {
      setSiteConfigs(data.data)
    }
  }, [data])

  const handleContentChange = (siteId: number, content: string): void => {
    setSiteConfigs(prev => {
      const existing = prev.find(c => c.siteId === siteId)
      if (!isNil(existing)) {
        return prev.map(c => c.siteId === siteId ? { ...c, content } : c)
      }
      return [...prev, { siteId, content }]
    })
  }

  const getContentForSite = (siteId: number): string => {
    const config = siteConfigs.find(c => c.siteId === siteId)
    return config?.content ?? ''
  }

  const handleSave = (): void => {
    void updateRobotsTxt({
      bundleSeoRobotsTxtUpdate: {
        data: siteConfigs
      }
    })
  }

  const additionalSites = getAllSites()

  const tabItems = [
    {
      key: '0',
      label: t('site-domain.main_site'),
      children: (
        <RobotsTxtSiteEditor
          content={ getContentForSite(0) }
          onChange={ (content) => { handleContentChange(0, content) } }
        />
      )
    },
    ...additionalSites.map(site => ({
      key: String(site.id),
      label: site.domain,
      children: (
        <RobotsTxtSiteEditor
          content={ getContentForSite(site.id) }
          onChange={ (content) => { handleContentChange(site.id, content) } }
        />
      )
    }))
  ]

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar justify='space-between'>
          <IconButton
            disabled={ isLoadingOrFetching }
            icon={ { value: 'refresh' } }
            onClick={ () => { void refetch() } }
            tooltip={ { title: t('toolbar.reload') } }
          />

          <Tooltip title={ data?.onFileSystem === true ? t('robots-txt.on-file-system-warning') : undefined }>
            <span>
              <Button
                disabled={ isLoadingOrFetching || data?.onFileSystem === true }
                loading={ isSaving }
                onClick={ handleSave }
                type='primary'
              >
                { t('save') }
              </Button>
            </span>
          </Tooltip>
        </Toolbar>
      }
    >
      <Content loading={ isLoadingOrFetching }>
        <div className={ styles.tabsContainer }>
          <Tabs
            destroyInactiveTabPane
            items={ tabItems }
            type='card'
          />
        </div>
      </Content>
    </ContentLayout>
  )
}
