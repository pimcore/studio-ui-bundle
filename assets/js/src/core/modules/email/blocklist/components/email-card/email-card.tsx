import { Card } from "@Pimcore/components/card/card"
import { Flex } from "@Pimcore/components/flex/flex"
import { Blocklist } from "@Pimcore/modules/email/emails-api-slice.gen"
import { Icon } from "@sdk/components"
import { formatDate } from "@sdk/utils"
import { Space } from "antd"
import React from "react"
import { useStyles } from "./email-card.styles"

interface EmailCardProps {
  entry: Blocklist
}

export const EmailCard = ({ entry }: EmailCardProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Card className={styles.emailCard}>
      <Flex justify="space-between">
        <span>{entry.email}</span>

        <Space>
          <span>{formatDate(entry.modificationDate!)}</span>
          <Flex>
            <Icon value="trash" />
          </Flex>
        </Space>
      </Flex>
    </Card>
  )
}