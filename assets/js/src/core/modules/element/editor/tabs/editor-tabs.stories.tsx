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

import { EditorTabs, type IEditorTabsProps } from '@Pimcore/modules/element/editor/tabs/editor-tabs'
import { type Meta } from '@storybook/react'
import { PictureOutlined, TagOutlined } from '@ant-design/icons'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { EditorTabsSkeleton } from '@Pimcore/modules/element/editor/tabs/editor-tabs.skeleton'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'

interface IEditorTabsStory extends IEditorTabsProps {
  elementId: number
  elementType: string
  loading: boolean
}

const EditorTabComponent = ({ elementId, elementType, loading, defaultActiveKey, showLabelIfActive, items }: IEditorTabsStory): React.JSX.Element => {
  const { setContext } = useGlobalAssetContext()

  if (loading) {
    return (
      <div style={ { minWidth: 1024 } }>
        <EditorTabsSkeleton />
      </div>
    )
  }

  if (elementId === undefined || elementType === undefined) {
    return (<p>Please fill elementId and elementType argument</p>)
  }

  setContext({ id: elementId })

  return (
    <div style={ { minWidth: 1024 } }>
      <EditorTabs
        defaultActiveKey={ defaultActiveKey }
        items={ items }
        showLabelIfActive={ showLabelIfActive }
      />
    </div>
  )
}

// TODO: Component needs refactoring because it contains business logic
const config: Meta = {
  title: 'Components/__Refactor__/EditorTabs',
  component: EditorTabs,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    elementId: { control: 'number' },
    elementType: {
      options: ['asset', 'dataobject', 'document'],
      control: { type: 'select' }
    },
    showLabelIfActive: {
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    items: { table: { disable: true } }
  },
  tags: ['autodocs'],
  render: EditorTabComponent
}

export default config

export const _default = {
  args: {
    loading: true,
    elementType: 'asset',
    defaultActiveKey: '2',
    showLabelIfActive: false,
    items: [
      {
        key: '1',
        label: 'Tab 1',
        children: 'Tab 1',
        icon: <PictureOutlined />
      },
      {
        key: '2',
        label: 'Tab 2',
        children: 'Tab 2',
        icon: <Icon value={ 'edit' } />,
        isDetachable: true
      },
      {
        key: '3',
        label: 'Tab 3',
        children: 'Tab 3',
        icon: <Icon value={ 'details' } />
      },
      {
        key: '4',
        label: 'Tab 4',
        children: 'Tab 4',
        icon: <TagOutlined />
      }
    ]
  }
}
