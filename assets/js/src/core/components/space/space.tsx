import { theme, Space as AntSpace, SpaceProps as AntSpaceProps } from 'antd';
import React from 'react';
import { useStyles } from './space.styles';

export interface SpaceProps extends Omit<AntSpaceProps, 'size' | 'classNames'> {
  size?: 'none' | 'mini' | 'extra-small' | 'small' | 'normal' | 'medium' | 'large' | 'extra-large' | 'maxi';
}

export const Space = ({ size = 'small', className, ...props }: SpaceProps): React.JSX.Element => {
  const { styles } = useStyles();
  const classes = [styles.space, className ];
  classes.push(`space--sizing-${size}`);

  return <AntSpace className={classes.join(' ')} {...props} />;
}
