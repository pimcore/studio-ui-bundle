import React, { CSSProperties, MutableRefObject, forwardRef, useContext } from 'react';
import { DroppableContentProps } from '../droppable';
import { useStyle } from './dnd-demo-droppable-content.styles';
import { droppableContext } from '../droppable-context-provider';

interface DNDDemoDroppableContentProps {
  value: string;
  title: string
}

export const DNDDemoDroppableContent = forwardRef((props: DNDDemoDroppableContentProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element => {
  const { styles } = useStyle();
  const { isOver, isValid, isDragActive } = useContext(droppableContext);
  const classes: string[] = [styles.content];

  if (isDragActive) {
    classes.push('dnd--drag-active');
  }

  if (isOver && isValid) {
    classes.push('dnd--drag-valid');
  }

  if (isOver && !isValid) {
    classes.push('dnd--drag-error');
  }

  return (
    <div ref={ref} className={classes.join(' ')}>
      <h4>{props.title}</h4>
      <p>Value: {props.value}</p>
    </div>
  )
});
