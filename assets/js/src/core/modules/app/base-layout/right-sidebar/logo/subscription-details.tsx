import { Icon } from "@Pimcore/components/icon/icon";
import { Tooltip } from "@Pimcore/components/tooltip/tooltip";
import React from "react";
import cn from "classnames";
import { useStyles } from "./subscription-details.styles";

export interface SubscriptionDetailsProps {
  icon: string,
  tooltip: string,
  link: string,
  children: React.ReactNode
}

export const SubscriptionDetails = ({ icon, tooltip, children, link }: SubscriptionDetailsProps): React.JSX.Element => {
  const { styles } = useStyles();

  return (
    <Tooltip title={tooltip} placement="left">
      <div className={cn('subscription-details', styles.subscriptionDetails)}>
        <a className="subscription-details__link" href={link} target="_blank" rel="noopener noreferrer">
          <div className="subscription-details__icon">
            <Icon value={ icon } options={{ width: 13, height: 13 }} />
          </div>

          {children}
        </a>
      </div>
    </Tooltip>
  )
}
