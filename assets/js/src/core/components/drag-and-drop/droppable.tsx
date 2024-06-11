import React, { Children, ReactElement, ReactNode, isValidElement, useContext, useEffect, useState } from "react";
import { DragAndDropInfo, DragAndDropInfoContext } from "./context-provider";
import { useDroppable } from "@dnd-kit/core";
import { usePrevious } from "@Pimcore/utils/hooks/use-previous";
import { GlobalStyle, useStyle } from "./droppable.styles";
import { useForm } from "antd/es/form/Form";
import { DroppableContextProvider } from "./droppable-context-provider";

export interface DroppableContentProps {
  isDragActive: boolean;
  isOver: boolean;
  isValid: boolean;
}

export interface DroppableProps {
  id: string;
  children: ReactNode;
  isValidContext: boolean | ((info: DragAndDropInfo) => boolean)
  isValidData?: ((info: DragAndDropInfo) => boolean);
  onDrop: (info: DragAndDropInfo) => void;
}

export const Droppable = (props: DroppableProps): React.JSX.Element => {
  const {styles} = useStyle();
  const context = useContext(DragAndDropInfoContext);
  const [ isValidContext, setIsValidContext ] = useState(false);
  const isValidData = (props.isValidData && props.isValidData(context.getInfo())) ?? true;
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  if (isValidContext && isOver && !isValidData) {
    document.body.classList.add('dnd--invalid');
  } else {
    document.body.classList.remove('dnd--invalid');
  }

  useEffect(() => {
    if (typeof props.isValidContext !== "boolean")  {
      setIsValidContext(props.isValidContext(context.getInfo()));
    } else {
      setIsValidContext(props.isValidContext as boolean);
    }

    context.callbackRegistry!.current.register(props.id, () => {
      if (!isValidData || !isValidContext || !isOver) return;

      props.onDrop(context.getInfo());
    });

    return () => {
      context.callbackRegistry!.current.unregister(props.id);
    };
  }, [context, isOver]);

  const Child = Children.only(props.children);

  if (!isValidElement(Child)) {
    throw new Error('Children must be a valid react component');
  }

  return <div className={styles.droppable}>
    <GlobalStyle />
    <DroppableContextProvider value={ { isDragActive: isValidContext, isOver: isOver && isValidContext, isValid: isValidData && isValidContext } }>
      <Child.type {...Child.props} ref={setNodeRef} />
    </DroppableContextProvider>
  </div>
}
