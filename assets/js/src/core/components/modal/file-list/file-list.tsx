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
import { useStyle } from '@Pimcore/components/modal/file-list/file-list.styles'

interface IFileListProps {
  files: string[]
}

export const FileList = (props: IFileListProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <ul className={ styles.filesList }>
      {props.files.map((file, index) => (
        <li key={ `${file}-${index}` }>{file}</li>
      ))}
    </ul>
  )
}
