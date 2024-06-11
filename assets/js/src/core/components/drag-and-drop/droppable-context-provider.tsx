import { createContext } from "react";

interface IDroppableContext {
  isOver: boolean;
  isValid: boolean;
  isDragActive: boolean;
}

export const droppableContext = createContext<IDroppableContext>({
  isOver: false,
  isValid: false,
  isDragActive: false
});

export const DroppableContextProvider = droppableContext.Provider;
