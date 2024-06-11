import React, { Children, forwardRef, isValidElement } from 'react';
import {useDraggable} from '@dnd-kit/core';
import { DragAndDropInfo } from './context-provider';

interface DraggableProps {
  id: string;
  children: React.ReactNode;
  info: DragAndDropInfo
}

export function Draggable(props: DraggableProps) {
  const {attributes, listeners, setNodeRef} = useDraggable({
    id: props.id,
    data: props.info,
  });

  const Child = Children.only(props.children);

  if (!isValidElement(Child)) {
    throw new Error('Children must be a valid react component');
  }
  
  return (
    <Child.type {...Child.props} ref={setNodeRef} {...listeners} {...attributes} />
  );
}
