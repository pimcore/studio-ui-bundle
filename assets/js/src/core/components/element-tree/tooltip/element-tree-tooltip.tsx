import React from "react"
import { Tooltip } from "../../tooltip/tooltip"
import { TreeNodeProps } from "../node/tree-node"
import { Box } from "@Pimcore/components/box/box"
import { Image } from "@Pimcore/components/image/image"
import { Flex } from "@Pimcore/components/flex/flex"
import { useTranslation } from "react-i18next"

export interface ElementTreeTooltipProps {
  node: TreeNodeProps
  children: React.ReactNode
}

export const ElementTreeTooltip = ({ node, children }: ElementTreeTooltipProps): React.JSX.Element => {
  const { t } = useTranslation();
  const element = node.metaData?.asset || node.metaData?.dataObject || node.metaData?.document
  const isAsset = node.metaData?.asset !== undefined;
  const hasTooltip = element?.customAttributes?.tooltip !== undefined;
  let tooltipTitle = (
    <>
      <div>{t("ID")}: {node.id}</div>
      <div>{t("Type")}: {t(node.type!)}</div>
    </>
  )

  return (
    <Tooltip overlayStyle={{width: 280}} mouseEnterDelay={ 0.5 } title={
        <Box padding={'extra-small'}>
          {isAsset === true && element?.imageThumbnailPath !== undefined && (
            <Box className="w-full" padding={{ bottom: 'extra-small'}}>
              <Flex style={{ maxHeight: 200, overflow: 'hidden' }} className="w-full" justify="center">
                <Image style={{ maxHeight: 200 }} src={element.imageThumbnailPath} alt={element.filename} />
              </Flex>
            </Box>
          )}

          {hasTooltip ? (
            <div dangerouslySetInnerHTML={{ __html: element.customAttributes.tooltip }} />
          ) : (
            tooltipTitle
          )}
        </Box>
      } 
      placement="right"
    >
      {children}
    </Tooltip>
  )
}
