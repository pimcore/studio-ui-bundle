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

import React, { Fragment, type RefObject } from 'react'
import { Card as AntdCard, type CardProps as AntdCardProps } from 'antd'
import { useStyles } from '@Pimcore/components/card/card.styles'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { PimcoreImage as Image } from '@Pimcore/components/pimcore-image/pimcore-image'
import { useTranslation } from 'react-i18next'

export interface CardProps extends AntdCardProps {
  loading?: boolean
  onClose?: () => void
  icon?: string
  image?: { src: string, alt?: string } | null
  extra?: any[]
}

const Component = ({ loading, children, className, ...props }: CardProps, ref: RefObject<HTMLElement | null>): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const classNames = [styles.card, className]

  const renderExtraContent = (): React.ReactElement | null => {
    return (
      <Fragment>
        {Array.isArray(props.extra)
          ? (
            <div>
              {props.extra.map((extra, index) => (
                typeof extra === 'object' && extra.icon !== undefined
                  ? (
                    <IconButton
                      icon={ extra.icon as string }
                      key={ index }
                      onClick={ extra.onClick }
                      role={ 'button' }
                      title={ extra.title }
                      type={ extra.type !== undefined ? extra.type : 'text' }
                    />
                    )
                  : (<Fragment key={ index }>{extra}</Fragment>)
              ))}
            </div>
            )
          : null}

        {props.onClose !== undefined
          ? (
            <IconButton
              aria-label={ t('aria.card.close') }
              icon={ 'close' }
              onClick={ () => props.onClose?.() }
              role={ 'button' }
              size="small"
              type={ 'text' }
            />
            )
          : null}
      </Fragment>
    )
  }

  const renderTitle = (): React.ReactElement => {
    return (
      <>
        {props.icon !== undefined && props.icon !== null ? <Icon name={ props.icon } /> : null}
        {props.title}
      </>
    )
  }

  return (
    <AntdCard
      actions={ props.actions }
      className={ classNames.join(' ') }
      cover={ props.image !== null && props.image?.src !== undefined
        ? (
          <Image
            alt={ props.image.alt }
            src={ props.image.src }
          />
          )
        : <></> }
      extra={ props.extra !== undefined && props.extra !== null ? renderExtraContent() : null }
      title={ props.title !== undefined && props.title !== null ? renderTitle() : null }
    >
      {children}
    </AntdCard>
  )
}

export const Card = React.forwardRef(Component)
