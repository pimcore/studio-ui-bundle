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

import React, {Fragment, type RefObject} from 'react'
import {Card as AntdCard, type CardProps as AntdCardProps } from 'antd'
import { PimcoreImage as Image } from "@Pimcore/components/pimcore-image/pimcore-image";
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import i18n from "i18next";
import {useStyles} from "@Pimcore/components/card/card.styles";
import { Icon, type IconProps } from '@Pimcore/components/icon/icon'

export interface CardProps extends AntdCardProps {
  loading?: boolean,
  onClose?: () => void,
  titleIcon?: string,
  image?: object & { src: string, alt?: string }
  cardActions?: object & { icon: IconProps, onClick: () => void, title: string }[]
}

const Component = ({ loading, children, className, ...props }: CardProps, ref: RefObject<HTMLElement | null>): React.JSX.Element => {
  const { styles } = useStyles()
  const classNames = [styles.card, className]

  const renderExtraContent = (): React.ReactElement => {
    if (props.onClose === undefined && !props.date && !props.extra) {
      return
    }

    return (
        <Fragment>
          {props.extra ? (
              <span>
                {...props.extra}
              </span>
          ) : null}

          {props.onClose !== undefined ? (
              <IconButton
                  aria-label={ i18n.t('aria.card.close') }
                  className={ 'ant-card-extra__close-btn' }
                  icon={ 'close' }
                  onClick={ () => console.log('click close') }
                  role={ 'button' }
                  size="small"
                  type={ 'text' }
              />
          ) : null}
        </Fragment>
      )
    }

    const renderTitle = (): React.ReactElement => {
      return (
          <Fragment>
            {props.titleIcon ? (<Icon name={props.titleIcon} className={'ant-card-head-title__icon'}/>):null}
            {props.title}
          </Fragment>
      )
    }

    return (
        <AntdCard
            title={props.title ? renderTitle() : null}
            extra={renderExtraContent()}
            className={classNames.join(' ')}
            cover={props.image ? <Image src={props.image.src} alt={props.image.alt} /> : null}
            actions={[props.cardActions.map((action, index) => (
                <IconButton
                    key={index}
                    icon={action.icon}
                    onClick={action.onClick}
                    title={action.title}
                />
            ))]}
        >
          {children}

          {/*{props.cardActions ? (*/}
          {/*    <div>*/}
          {/*      {props.cardActions.map((action, index) => (*/}
          {/*          <IconButton*/}
          {/*              key={index}*/}
          {/*              icon={action.icon}*/}
          {/*              onClick={action.onClick}*/}
          {/*              title={action.title}*/}
          {/*          />*/}
          {/*      ))}*/}
          {/*    </div>*/}
          {/*) : null}*/}
        </AntdCard>
    )
}

export const Card = React.forwardRef(Component)
