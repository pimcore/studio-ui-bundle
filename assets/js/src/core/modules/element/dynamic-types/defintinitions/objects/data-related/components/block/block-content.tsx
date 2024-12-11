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

import { type FormListFieldData, type FormListOperation } from 'antd'
import { type BlockProps } from './block'
import React, { useState } from 'react'
import { FormListProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/form-list-provider/form-list-provider'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { CollapseItem, type CollapseItemProps } from '@Pimcore/components/collapse/item/collapse-item'
import { Space } from '@Pimcore/components/space/space'
import { ToolStripBox } from '@Pimcore/components/toolstrip/box/tool-strip-box'
import { BlockToolStrip } from './block-tool-strip'
import { Box } from '@Pimcore/components/box/box'
import { Text } from '@Pimcore/components/text/text'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { type IconButtonProps } from '@Pimcore/components/icon-button/icon-button'

interface BlockContentProps extends BlockProps {
  fields: FormListFieldData[]
  operation: FormListOperation
}

export const BlockContent = ({ title, fields, operation, children, collapsed }: BlockContentProps): React.JSX.Element => {
  const [collapseActive, setCollapseActive] = useState(collapsed ?? false)

  const onChange: CollapseItemProps['onChange'] = (keys) => {
    setCollapseActive(keys.length > 0)
  }

  const onAddClick: IconButtonProps['onClick'] = (e): void => {
    e.stopPropagation()
    operation.add()
    setCollapseActive(true)
  }

  return (
    <CollapseItem
      active={ collapseActive }
      contentPadding={ { x: 'none', y: 'small' } }
      extra={ (
        <>
          {fields.length === 0 && (
            <IconTextButton
              icon={ { value: 'plus' } }
              onClick={ onAddClick }
            >Add</IconTextButton>
          )}
        </>
      ) }
      extraPosition='start'
      label={ title }
      onChange={ onChange }
    >
      <Space
        className='w-full'
        direction="vertical"
        size={ 'small' }
      >
        {fields.length !== 0 && fields.map((field, index) => (
          <ToolStripBox
            docked
            key={ field.key }
            renderToolStripStart={ <BlockToolStrip
              field={ field }
              operations={ operation }
                                   /> }
          >
            <FormListProvider
              field={ field }
              operation={ operation }
            >
              {
                Array.isArray(children)
                  ? children.map((child, index) => {
                    return (
                      <ObjectComponent
                        key={ field.name + index }
                        { ...child }
                      />
                    )
                  })
                  : undefined
              }
            </FormListProvider>
          </ToolStripBox>
        ))}

        {fields.length === 0 && (
          <Box padding={ { x: 'small' } }>
            <Text type='secondary'>There are no fields added, yet</Text>
          </Box>
        )}
      </Space>
    </CollapseItem>
  )
}
