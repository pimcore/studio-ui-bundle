/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode, useMemo } from 'react'
import { isEmpty } from 'lodash'
import { Space } from '@Pimcore/components/space/space'
import { Box } from '@Pimcore/components/box/box'
import { Card } from '@Pimcore/components/card/card'
import { CollapseItem } from '@Pimcore/components/collapse/item/collapse-item'
import { type BoxProps } from '@Pimcore/components/box/box'

export interface PanelProps {
  title?: string
  border?: boolean
  collapsible?: boolean
  collapsed?: boolean
  children: React.ReactNode
  theme?: 'fieldset' | 'card-with-highlight'
  name?: string
  noteditable?: boolean
}

interface CardViewProps {
  title?: ReactNode
  children?: React.ReactNode
  collapsible?: false
  bordered?: boolean
  theme?: 'fieldset' | 'card-with-highlight' | 'default' | 'border-highlight'
  contentPadding?: BoxProps['padding']
  extra?: ReactNode
  extraPosition?: 'start' | 'end'
}

interface AccordionViewProps {
  title?: ReactNode
  children?: React.ReactNode
  bordered?: boolean
  collapsed?: boolean
  collapsible: true
  theme?: 'fieldset' | 'card-with-highlight' | 'default' | 'border-highlight'
  contentPadding?: BoxProps['padding']
  extra?: ReactNode
  extraPosition?: 'start' | 'end'
}

type BaseViewProps = (CardViewProps | AccordionViewProps) & {
  border?: boolean
  extra?: CardViewProps['extra'] | AccordionViewProps['extra']
}

const CardView = (props: CardViewProps): React.JSX.Element => {
  'use memo'

  return (
    <Card
      bordered={props.bordered === true}
      contentPadding={props.contentPadding}
      extra={props.extra}
      extraPosition={props.extraPosition}
      theme={props.theme}
      title={isEmpty(props.title) ? undefined : props.title}
    >
      {props.children}
    </Card>
  )
}

const AccordionView = ({ collapsed, bordered, ...props }: AccordionViewProps): React.JSX.Element => {
  'use memo'

  return (
    <CollapseItem
      bordered={bordered}
      contentPadding={props.contentPadding}
      defaultActive={!(collapsed ?? true)}
      extra={props.extra}
      extraPosition={props.extraPosition}
      forceRender
      hasContentSeparator={props.theme !== 'fieldset'}
      label={(<>{props.title}</>)}
      size='small'
      theme={props.theme}
    >
      {props.children}
    </CollapseItem>
  )
}

const BaseView = ({ theme = 'card-with-highlight', ...props }: BaseViewProps): React.JSX.Element => {
  'use memo'

  const isPaddedLayout = props.border === true || props.collapsible === true || !isEmpty(props.title)

  return useMemo(() => {
    if (!isPaddedLayout) {
      return (
        <>
          {props.children}
        </>
      )
    }

    if (props.collapsible === true) {
      return (
        <AccordionView
          bordered={props.border}
          collapsed={props.collapsed}
          collapsible
          contentPadding={props.contentPadding}
          extra={props.extra}
          theme={theme}
          title={props.title}
        >{props.children}</AccordionView>
      )
    }

    return (
      <CardView
        bordered={props.border}
        contentPadding={props.contentPadding}
        extra={props.extra}
        extraPosition={props.extraPosition}
        theme={theme}
        title={props.title}
      >{props.children}</CardView>
    )
  }, [props, isPaddedLayout])
}

export const Panel = ({ 
  children, 
  name, 
  border, 
  collapsed, 
  collapsible, 
  title, 
  theme = 'card-with-highlight', 
  noteditable 
}: PanelProps): React.JSX.Element => {
  const isMainPanel = name === 'pimcore_root'

  if (isMainPanel) {
    return (
      <Box padding='small'>
        {getContent()}
      </Box>
    )
  }

  return (
    <>
      {getContent()}
    </>
  )

  function getContent(): ReactNode {
    return (
      <BaseView
        border={border}
        collapsed={collapsed}
        collapsible={collapsible}
        theme={theme}
        title={title}
      >
        <Space
          className='w-full'
          direction='vertical'
          size='small'
        >
          {children}
        </Space>
      </BaseView>
    )
  }
}
