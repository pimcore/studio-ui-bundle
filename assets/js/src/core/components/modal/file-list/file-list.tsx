/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
