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
import { useTagConfig } from '@Pimcore/modules/tags/hooks/use-tag-config'
import { TagConfigurationContainer } from '@Pimcore/modules/tags/tag-configuration-container'

const TagConfiguration = ({ ...props }): React.JSX.Element => {
  const { tags, tagsLoading } = useTagConfig()
  console.log('----> tagsLoading', tagsLoading)
  console.log('----> tags', tags)

  return (
    <TagConfigurationContainer
      isLoading={ tagsLoading }
      tags={ tags?.items ?? [] }
    />
  )
}

export { TagConfiguration }
