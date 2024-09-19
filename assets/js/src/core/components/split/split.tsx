import React from "react";
import { Space, SpaceProps } from "../space/space";
import { Divider } from "antd";
import { useStyles } from "@Pimcore/components/split/split.styles";

export interface SplitProps extends Omit<SpaceProps, 'split'> {}

export const Split = (props: SplitProps): React.JSX.Element => {
  const { styles} = useStyles();

  return (
    <Space className={styles.split} split={<Divider type="vertical" />} {...props} />
  )
}
