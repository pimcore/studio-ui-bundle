import { Modal } from "@Pimcore/components/modal/modal"
import React from "react"
import { EditViewProps } from "./views/edit-view"
import { ContentLayout } from "@Pimcore/components/content-layout/content-layout"
import { Toolbar } from "@Pimcore/components/toolbar/toolbar"
import { useTranslation } from "react-i18next"
import { Button } from "@Pimcore/components/button/button"
import { Space } from "@Pimcore/components/space/space"
import { Content } from "@Pimcore/components/content/content"
import { Dropdown } from "@Pimcore/components/dropdown/dropdown"
import { IconTextButton } from "@Pimcore/components/icon-text-button/icon-text-button"
import { LanguageSelection } from "@Pimcore/components/language-selection/language-selection"
import { useSettings } from "@Pimcore/modules/app/settings/hooks/use-settings"
import { GridConfigList } from "./grid-config-list"
import { isEmpty } from "lodash"
import { PipelineLayoutProvider } from "./forms/advanced-column-form/pipeline-layout-provider"
import { ModalTitle } from "@Pimcore/components/modal/modal-title/modal-title"

export interface GridConfigModalProps extends EditViewProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const GridConfigModal = (props: GridConfigModalProps): React.JSX.Element => {
  const {
    onCancelClick,
    onApplyClick: baseOnApplyClick,
    addColumnMenu,
    currentLanguage,
    setCurrentLanguage,
    open = false,
    onOpenChange,
  } = props

  const { t } = useTranslation()
  const settings = useSettings()

  const onApplyClick = (): void => {
    baseOnApplyClick()
    onOpenChange?.(false)
  }

  return (
    <>
      {open === true && (
        <PipelineLayoutProvider pipelineLayout="verbose">
          <Modal open={open} onClose={() => onOpenChange?.(false)} onCancel={() => onOpenChange?.(false)} size="XL" title={(
            <ModalTitle iconName="settings">
              Grid Config
            </ModalTitle>
          )} footer={null} >
              <ContentLayout>
                <Toolbar position="content" theme="secondary" padding={{ x: 'none' }}>
                  <Button>
                    Preview Item
                  </Button>

                  <LanguageSelection
                    languages={ settings.requiredLanguages.map((value: string) => {
                      return value
                    }) }
                    onSelectLanguage={ setCurrentLanguage }
                    selectedLanguage={ currentLanguage }
                  />
                </Toolbar>

                  <Content style={{ height: 'calc(80vh - 200px)' }}>
                    <Space
                      direction='vertical'
                      style={ { width: '100%' } }
                    >
                      <GridConfigList />
                    </Space>
                  </Content>

                  <Toolbar padding={{ x: 'none', y: 'small' }} theme="secondary">
                    {!isEmpty(addColumnMenu) && (
                      <Dropdown menu={ { items: addColumnMenu } }>
                        <IconTextButton
                          icon={ { value: 'new' } }
                        >
                          { t('listing.add-column') }
                        </IconTextButton>
                      </Dropdown>
                    )}

                    <Space size="extra-small">
                      <Button
                        onClick={ onCancelClick }
                        type='default'
                      >
                        { t('button.cancel') }
                      </Button>

                      <Button
                        onClick={ onApplyClick }
                        type='primary'
                      >
                        { t('button.apply') }
                      </Button>
                    </Space>
                  </Toolbar>
                </ContentLayout>
            </Modal>
        </PipelineLayoutProvider>
      )}
    </>
  )
}
