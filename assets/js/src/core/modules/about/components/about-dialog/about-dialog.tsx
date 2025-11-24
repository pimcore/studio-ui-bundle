import { IWindowModalProps, WindowModal } from "@sdk/components"
import React from "react"

interface AboutDialogProps extends Omit<IWindowModalProps, "children"> { }

export const AboutDialog = (props: AboutDialogProps): React.JSX.Element => {
  return (
    <WindowModal
      {...props}
    >
      IM A ABOUT DIALOG
    </WindowModal>
  )
}