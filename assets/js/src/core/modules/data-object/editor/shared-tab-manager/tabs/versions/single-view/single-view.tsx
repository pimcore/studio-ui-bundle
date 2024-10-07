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
import {
  type SingleVersionViewProps
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-details-props'

export const SingleView = ({
  versions,
  versionId,
  setDetailedVersions
}: SingleVersionViewProps): React.JSX.Element => {
  return (
    <div>
      <p><strong>TODO: implement data object single version view for:</strong></p>
      ID: {versionId.id}
      <hr />
      Jump to other versions:
      {versions.map((version) => (
        <div key={ version.id }>
          <p>
            <button onClick={ () => {
              setDetailedVersions([{
                id: version.id,
                count: version.versionCount
              }])
            } }
            > Version: {version.versionCount}</button>
          </p>
        </div>
      ))}
    </div>
  )
}
