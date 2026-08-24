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
import { isEmpty, isNil } from 'lodash'
import { AccordionView, type AccordionViewProps } from './accordion-view'
import { CardView, type CardViewProps } from './card-view'
import { Icon, type ElementIcon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { translateLabel } from '@Pimcore/utils/translate-label'

export type BaseViewProps = (CardViewProps | AccordionViewProps) & {
  border?: boolean
  icon?: ElementIcon | null
  extra?: CardViewProps['extra'] | AccordionViewProps['extra']
}

export const BaseView = ({ theme = 'card-with-highlight', ...props }: BaseViewProps): React.JSX.Element => {
  const isPaddedLayout = props.border === true || props.collapsible === true || !isEmpty(props.title)

  const wrapWithIcon = (titleNode: ReactNode): ReactNode => {
    if (isNil(props.icon) || isEmpty(titleNode)) {
      return titleNode
    }

    return (
      <Flex
        align='center'
        gap='extra-small'
      >
        <Icon
          type={ props.icon.type }
          value={ props.icon.value }
        />
        {titleNode}
      </Flex>
    )
  }

  const translatedTitle = translateLabel(props.title)

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
          bordered={ props.border }
          collapsed={ props.collapsed }
          collapsible
          contentPadding={ props.contentPadding }
          extra={ props.extra }
          style={ props.style }
          theme={ theme }
          title={ wrapWithIcon(translatedTitle) }
        >{props.children}</AccordionView>
      )
    }

    return (
      <CardView
        bordered={ props.border }
        contentPadding={ props.contentPadding }
        extra={ props.extra }
        extraPosition={ props.extraPosition }
        style={ props.style }
        theme={ theme }
        title={ wrapWithIcon(translatedTitle) }
      >{props.children}</CardView>
    )
  }, [props, isPaddedLayout, translatedTitle])
}
