import React, { useContext } from 'react';
import {DndContext, useDndContext, useDroppable} from '@dnd-kit/core';
import { DragAndDropInfoContext } from './context-provider';

export function Droppable(props) {
  const context = useContext(DragAndDropInfoContext)
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
    width: '200px',
    height: '200px',
    border: '1px solid',
  };

  context.callbackRegistry!.current.register(props.id, () => { if (isOver) console.log(props.id) });
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
