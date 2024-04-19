import {Progress, ProgressProps} from "antd";
import React from "react";
import {useStyle} from "@Pimcore/components/progressbar/progressbar.style";

interface IProgressProps extends ProgressProps {
  description: string;
  descriptionAction?: React.ReactNode;
  progressStatus: string;
}

export const Progressbar = (props: IProgressProps) => {
  const {styles} = useStyle();

  return (
    <div className={styles.progressbar}>
      <div className={'progressbar-description'}>
        <p id={'progressbarLabel'}>{props.description}</p>
        <div className={'progressbar-description__action'}>
          {props.descriptionAction}
        </div>
      </div>
      <Progress
        {...props}
        showInfo={false}
        aria-labelledby={'progressbarLabel'}
      />
      <div className={'progressbar-status'}>
        <p>{props.progressStatus}</p>
      </div>
    </div>
  )
}
