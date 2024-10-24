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

import * as React from 'react'
import { type ModalFuncProps } from 'antd'
import { ConfigContext } from 'antd/es/config-provider/context'
import { useLocale } from 'antd/es/locale'
import ConfirmDialogWrapper from 'antd/es/modal/ConfirmDialog'
import localeValues from 'antd/locale'
import { type ExtModalFuncProps } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { Button } from '@Pimcore/components/button/button'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export interface HookModalProps {
  afterClose: () => void
  config: ExtModalFuncProps
  onConfirm?: (confirmed: boolean) => void
  /**
   * Do not throw if is await mode
   */
  isSilent?: () => boolean
}

export interface HookModalRef {
  destroy: () => void
  update: (config: ModalFuncProps) => void
}

const HookModal: React.ForwardRefRenderFunction<HookModalRef, HookModalProps> = (
  {
    afterClose: hookAfterClose,
    config: initConfig,
    ...restProps
  },
  ref
) => {
  const { t } = useTranslation()
  const { beforeOk, afterOpen, ...config } = initConfig
  const [open, setOpen] = React.useState(true)
  const [innerConfig, setInnerConfig] = React.useState(config)
  const { direction, getPrefixCls } = React.useContext(ConfigContext)

  const prefixCls = getPrefixCls('modal')
  const rootPrefixCls = getPrefixCls()

  useEffect(() => {
    if (open && afterOpen !== undefined) {
      afterOpen()
    }
  }, [open])

  const afterClose = (): void => {
    hookAfterClose()
    innerConfig.afterClose?.()
  }

  const close = (...args: any[]): void => {
    setOpen(false)
    const triggerCancel = args.some((param) => param?.triggerCancel)
    if (triggerCancel) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      innerConfig.onCancel?.(() => {}, ...args.slice(1))
    }
  }

  React.useImperativeHandle(ref, () => ({
    destroy: close,
    update: (newConfig: ModalFuncProps) => {
      setInnerConfig((originConfig) => ({
        ...originConfig,
        ...newConfig
      }))
    }
  }))

  const mergedOkCancel = innerConfig.okCancel ?? innerConfig.type === 'confirm'

  const [contextLocale] = useLocale('Modal', localeValues.Modal)

  if (beforeOk !== undefined) {
    const handleBeforeOk = async (): Promise<any> => {
      try {
        beforeOk()
          .then((value) => {
            if (config.onOk !== undefined) {
              config.onOk(value)
            }

            close()
          })
          .catch(() => {})
      } catch (e) {}
    }

    config.footer = (_, { CancelBtn }) => {
      return (
        <>
          <CancelBtn />
          <Button
            onClick={ handleBeforeOk }
            type={ 'primary' }
          >
            {config.okText ?? t('button.ok')}
          </Button>
        </>
      )
    }
  }

  return (
    <ConfirmDialogWrapper
      prefixCls={ prefixCls }
      rootPrefixCls={ rootPrefixCls }
      { ...innerConfig }
      afterClose={ afterClose }
      cancelText={ innerConfig.cancelText ?? contextLocale?.cancelText }
      close={ close }
      direction={ innerConfig.direction ?? direction }
      okText={
        innerConfig.okText ?? (mergedOkCancel ? contextLocale?.okText : contextLocale?.justOkText)
      }
      open={ open }
      { ...restProps }
    />
  )
}

export default React.forwardRef(HookModal)
