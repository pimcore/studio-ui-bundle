import {Skeleton} from "antd";
import React from "react";
import {useStyle} from "./editor-tabs.skeleton.styles";
import {ElementToolbarSkeleton} from "@Pimcore/components/element-toolbar/element-toolbar.skeleton";

export const EditorTabsSkeleton = (): React.JSX.Element => {
  const {styles} = useStyle()

  return (
    <div className={styles.skeleton}>
      <ElementToolbarSkeleton />

      <div className={"editor-tabs__skeleton"}>
        <Skeleton.Button
          active
          size={'small'}
        />
        <Skeleton.Button
          active
          size={'small'}
        />
        <Skeleton.Button
          active
          size={'small'}
        />
        <Skeleton.Button
          active
          size={'small'}
        />
      </div>
    </div>
  )
}
