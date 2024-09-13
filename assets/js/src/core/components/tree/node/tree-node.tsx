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

import { Flex, theme, Upload, type UploadProps } from 'antd'
import React, { type KeyboardEvent, type MouseEvent, useContext, useEffect } from 'react'
import { useStyles } from './tree-node.styles'
import { type nodeRef, TreeContext } from '../tree'
import { TreeList } from '../list/tree-list'
import { TreeExpander } from '../expander/tree-expander'
import { type UploadFile } from 'antd/es/upload/interface'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'

export interface TreeNodeProps {
  id: string
  icon: string
  label: string
  internalKey: string
  children: TreeNodeProps[]
  level: number
  hasChildren?: boolean
  metaData?: any
}

const defaultProps: TreeNodeProps = {
  id: Math.random().toString(16).slice(2),
  internalKey: '',
  icon: 'folder',
  label: 'Node',
  children: [],
  level: 0
}

const { useToken } = theme

const TreeNode = ({
  id = defaultProps.id,
  internalKey = defaultProps.internalKey,
  icon = defaultProps.icon,
  label = defaultProps.label,
  level = defaultProps.level,
  ...props
}: TreeNodeProps): React.JSX.Element => {
  const { token } = useToken()
  const { children, metaData } = props
  const { styles } = useStyles()
  const {
    renderNodeContent: RenderNodeContent,
    onSelect,
    onRightClick,
    selectedIdsState,
    nodesRefs,
    nodeOrder
  } = useContext(TreeContext)
  const dispatch = useAppDispatch()
  const [isExpanded, setIsExpanded] = React.useState(children.length !== 0)
  const [selectedIds, setSelectedIds] = selectedIdsState!
  const [uploadFileList, setUploadFileList] = React.useState<UploadFile[]>([])
  const treeNodeProps = { id, icon, label, internalKey, level, ...props }

  useEffect(() => {
    return () => {
      if (nodesRefs !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete nodesRefs.current[internalKey]
      }
    }
  }, [])

  function getClasses (): string {
    const classes = ['tree-node', styles.treeNode]

    if (selectedIds.includes(id)) {
      classes.push('tree-node--selected')
    }

    return classes.join(' ')
  }

  function selectNode (): void {
    setSelectedIds([id])

    if (onSelect !== undefined) {
      onSelect(treeNodeProps)
    }
  }

  function onClick (event: MouseEvent): void {
    selectNode()
  }

  function onContextMenu (event: MouseEvent): void {
    if (onRightClick !== undefined) {
      onRightClick(event, treeNodeProps)
    }
  }

  function onKeyDown (event: React.KeyboardEvent): void {
    if (event.key === 'Enter') {
      selectNode()
    }

    if (event.key === 'ArrowRight') {
      expandItem()
    }

    if (event.key === 'ArrowLeft') {
      collapseItem()
    }

    if (event.key === 'ArrowDown') {
      gotoNextNode(event)
    }

    if (event.key === 'ArrowUp') {
      gotoPreviousNode(event)
    }
  }

  function expandItem (): void {
    setIsExpanded(true)
  }

  function collapseItem (): void {
    setIsExpanded(false)
  }

  function gotoNextNode (event: KeyboardEvent): void {
    event.preventDefault()

    const index = nodeOrder!().indexOf(internalKey)

    if (index < nodeOrder!().length - 1) {
      nodesRefs!.current[nodeOrder!()[index + 1]].el.focus()
    }
  }

  function gotoPreviousNode (event: KeyboardEvent): void {
    event.preventDefault()

    const index = nodeOrder!().indexOf(internalKey)

    if (index > 0) {
      nodesRefs!.current[nodeOrder!()[index - 1]].el.focus()
    }
  }

  function setRef (el: HTMLElement): void {
    registerNode(el)
  }

  function registerNode (el: HTMLElement): void {
    const nodeRef: nodeRef = { el, node: treeNodeProps }
    nodesRefs!.current[internalKey] = nodeRef
  }

  function onDragOver (event: MouseEvent): void {
    const assetMetaData = metaData?.asset

    if (assetMetaData !== undefined && assetMetaData.type === 'folder') {
      setSelectedIds([id])
    }
  }

  const uploadProps: UploadProps = {
    action: `/studio/api/assets/add/${id}`,
    name: 'file',
    multiple: true,
    openFileDialogOnClick: false,
    showUploadList: false,
    onChange: ({ fileList }) => {
      const fileStates = fileList.map((file) => file.status)
      const allFullFilled = fileStates.every(item => item === 'done')

      if (allFullFilled) {
        dispatch(assetApi.util.invalidateTags(invalidatingTags.ASSET_TREE_ID(parseInt(id))))
      }

      setUploadFileList(fileList.filter((file) => file.status === 'uploading'))
    }
  }

  return (
    <div
      className={ getClasses() }
      onDragOver={ onDragOver }
    >
      <Flex
        className='tree-node__content'
        gap="small"
        onClick={ onClick }
        onContextMenu={ onContextMenu }
        onKeyDown={ onKeyDown }
        ref={ setRef }
        role='button'
        style={
          {
            paddingLeft: token.paddingSM + 20 * level,
            minWidth: `${20 * level + 200}px`
          }
        }
        tabIndex={ -1 }
      >
        <TreeExpander
          node={ treeNodeProps }
          state={ [isExpanded, setIsExpanded] }
        />

        <Upload { ...uploadProps }>
          <div className="tree-node__content-wrapper">
            <RenderNodeContent node={ treeNodeProps } />
          </div>
        </Upload>
      </Flex>

      {isExpanded && (
        <TreeList
          node={ treeNodeProps }
          uploadFileList={ uploadFileList }
        />
      )}
    </div>
  )
}

export { TreeNode }
