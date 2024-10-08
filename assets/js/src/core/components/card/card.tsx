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
import i18n from "i18next";
import {useStyles} from "@Pimcore/components/card/card.styles";
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { PimcoreImage as Image } from "@Pimcore/components/pimcore-image/pimcore-image";
import {useTranslation} from "react-i18next";

export interface CardProps extends AntdCardProps {
  loading?: boolean,
  onClose?: () => void,
  icon?: string,
  image?: object & { src: string, alt?: string },
  extra?: Array<any>,
}

const Component = ({ loading, children, className, ...props }: CardProps, ref: RefObject<HTMLElement | null>): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const classNames = [styles.card, className]

  const renderExtraContent = (): React.ReactElement | null => {
    return (
        <Fragment>
          {Array.isArray(props.extra) ? (
              <div>
                  {props.extra.map((extra, index) => (
                      typeof extra === 'object' && extra !== null && 'icon' in extra ? (
                          <IconButton
                              key={index}
                              icon={extra.icon}
                              onClick={extra.onClick}
                              title={extra.title}
                              type={extra.type ? extra.type : 'text'}
                              role={ 'button' } />
                      ) : (<Fragment key={index}>{extra}</Fragment>)
                  ))}
              </div>
          ) : null}

          {props.onClose !== undefined ? (
              <IconButton
                  aria-label={ t('aria.card.close') }
                  icon={ 'close' }
                  role={ 'button' }
                  size="small"
                  type={ 'text' }
                  onClick={ () => props.onClose?.() }
              />
          ) : null}
        </Fragment>
      )
    }

    const renderTitle = (): React.ReactElement => {
        return <Fragment>
            {props.icon ? <Icon name={props.icon} /> : null}
            {props.title}
        </Fragment>
    };

    return (
        <AntdCard
            className={classNames.join(' ')}
            title={props.title ? renderTitle() : null}
            extra={props.extra ? renderExtraContent() : null}
            cover={props.image ? <Image src={props.image.src} alt={props.image.alt} /> : null}
            actions={props.actions}
        >
          {children}
        </AntdCard>
    )
}

export const Card = React.forwardRef(Component)
