import { IconButton } from "@Pimcore/components/icon-button/icon-button"
import { useWidgetConfiguratorContext } from "../../../../context/hooks/use-widget-configurator-context"
import { WidgetConfig } from "@Pimcore/modules/perspectives/perspectives-slice.enhanced"
import React from "react"
import { ButtonGroup } from "@Pimcore/components/button-group/button-group"

interface RightToolbarProps {
  widget: WidgetConfig
  allowExpandControl?: boolean
}

export const RightToolbar = ({ widget, allowExpandControl }: RightToolbarProps): React.JSX.Element => {
  const { expandedWidget, setExpanded, onRemove } = useWidgetConfiguratorContext()
  const isExpanded = expandedWidget === widget.id

  let items = [
    <IconButton
      icon={{ value: 'trash' }}
      key={'remove'}
      onClick={() => { onRemove(widget.id) }}
      theme="secondary"
    />
  ]

  if (allowExpandControl) {
    items = [
      <IconButton
        icon={{ value: isExpanded ? 'eye' : 'eye-off' }}
        key={'expand'}
        onClick={() => { setExpanded(widget.id) }}
        theme="secondary"
      />,
      ...items
    ]
  }

  return (
    <ButtonGroup
      items={items}
      noSpacing
    />
  )
}