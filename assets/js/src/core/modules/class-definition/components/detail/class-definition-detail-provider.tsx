import { ClassDefinition } from "@sdk/api/class-definition";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface IClassDefinitionDetailContext {
  classDefinition: ClassDefinition | undefined
}

export const ClassDefinitionDetailContext = createContext<IClassDefinitionDetailContext | undefined>(undefined);

export interface IClassDefinitionDetailProviderProps {
  classDefinition: ClassDefinition | undefined
  children: React.ReactNode
}

export const ClassDefinitionDetailProvider = (props: IClassDefinitionDetailProviderProps): React.JSX.Element => {
  const [classDefinition, setClassDefinition] = useState<ClassDefinition | undefined>(props.classDefinition);

  useEffect(() => {
    setClassDefinition(props.classDefinition);
  }, [props.classDefinition]);

  return useMemo(() => (
    <ClassDefinitionDetailContext.Provider value={{ classDefinition }}>
      {props.children}
    </ClassDefinitionDetailContext.Provider>
  ), [classDefinition, props.children]);
}

export const useClassDefinitionDetail = (): IClassDefinitionDetailContext => {
  const context = useContext(ClassDefinitionDetailContext)

  if (!context) {
    throw new Error('useClassDefinitionDetail must be used within a ClassDefinitionDetailProvider');
  }

  return context;
}
