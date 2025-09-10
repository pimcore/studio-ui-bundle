import { Icon } from "@Pimcore/components/icon/icon"
import React from "react"
import { useStyles } from "./icon-viewer.styles"
import { Flex } from "@Pimcore/components/flex/flex"
import { isUndefined } from "lodash"

interface IconViewerProps {
  value: string | undefined
}

export const IconViewer = ({ value }: IconViewerProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Flex
      className={styles.iconViewer}
      align="center"
      justify="center"
    >
      {isUndefined(value) ? <div></div> : <Icon value={value} />}
    </Flex>
  )
}