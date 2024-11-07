import {App, type ModalFuncProps} from "antd";
import {Icon} from "@Pimcore/components/icon/icon";
import React, {useMemo} from "react";
import {useTranslation} from "react-i18next";

type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps)

interface ContentAware {
  content: string
}

export interface UseSimpleModalResponse {
  info: (props: ContentAware) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  error: (props: ContentAware) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
  warn: (props: ContentAware) => { destroy: () => void, update: (configUpdate: ConfigUpdate) => void }
}

export const useSimpleModal = () => {
  const {modal} = App.useApp()
  const { t } = useTranslation()

  return useMemo<UseSimpleModalResponse>(
    () => ({
      info: ({content}) => (
        modal.info({
          title: t('info'),
          content
        })
      ),
      error: ({content}) => (
        modal.error({
          title: t('error'),
          content
        })
      ),
      warn: ({content}) => (
        modal.warning({
          icon: <Icon name={'exclamation-circle-filled'} />,
          title: t('warning'),
          content
        })
      )
    }),
    []
  )
}
