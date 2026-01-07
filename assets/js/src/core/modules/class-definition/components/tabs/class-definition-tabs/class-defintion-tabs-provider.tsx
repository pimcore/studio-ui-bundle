import React, { createContext, useContext, useMemo, useState } from "react"

export interface ClassDefinitionPartial {
  id: string
  name: string
  group?: string
  icon?: {
    value: string
    color?: string
  }
}

export interface IClassDefinitionTabsContext {
  classDefinitions: Array<ClassDefinitionPartial>
  activeClassDefinition: ClassDefinitionPartial | undefined
  closeClassDefinition: (classDef: ClassDefinitionPartial) => void
  openClassDefinition: (classDef: ClassDefinitionPartial) => void
  setActiveClassDefinition: (classDef: ClassDefinitionPartial) => void
  closeActiveClassDefinition: () => void
}

export const ClassDefinitionTabsContext = createContext<IClassDefinitionTabsContext | undefined>(undefined);

export interface ClassDefinitionsProviderProps {
  children: React.ReactNode
}

export const ClassDefinitionsTabsProvider = (props: ClassDefinitionsProviderProps): React.JSX.Element => {
  const [classDefinitions, setClassDefinitions] = useState<Array<ClassDefinitionPartial>>([]);
  const [activeClassDefinition, setActiveClassDefinitionInternal] = useState<ClassDefinitionPartial | undefined>(undefined);

  const closeActiveClassDefinition = () => {
    if (activeClassDefinition === undefined) {
      return;
    }

    setClassDefinitions((prevClassDefs) => {
      return prevClassDefs.filter((cd) => cd.id !== activeClassDefinition.id);
    });

    if (classDefinitions.length > 1) {
      const currentIndex = classDefinitions.findIndex((cd) => cd.id === activeClassDefinition.id);
      const nextIndex = currentIndex === classDefinitions.length - 1 ? currentIndex - 1 : currentIndex + 1;
      setActiveClassDefinitionInternal(classDefinitions[nextIndex]);
      return;
    }

    setActiveClassDefinitionInternal(undefined);
  }

  const setActiveClassDefinition = (classDef: ClassDefinitionPartial) => {
    if (!classDefinitions.find((cd) => cd.id === classDef.id)) {
      openClassDefinition(classDef);
      return;
    }

    setActiveClassDefinitionInternal(classDef);
  }

  const openClassDefinition = (classDef: ClassDefinitionPartial) => {
    setClassDefinitions((prevClassDefs) => {
      if (prevClassDefs.find((cd) => cd.id === classDef.id)) {
        return prevClassDefs;
      }

      return [...prevClassDefs, classDef];
    });

    setActiveClassDefinitionInternal(classDef);
  };

  const closeClassDefinition = (classDef: ClassDefinitionPartial) => {
    if (activeClassDefinition?.id === classDef.id) {
      closeActiveClassDefinition();
    }

    setClassDefinitions((prevClassDefs) => {
      return prevClassDefs.filter((cd) => cd.id !== classDef.id);
    });
  };
  
  return useMemo(() => {
    return (
      <ClassDefinitionTabsContext.Provider value={{
        classDefinitions: classDefinitions,
        closeClassDefinition: closeClassDefinition,
        openClassDefinition: openClassDefinition,
        activeClassDefinition: activeClassDefinition,
        setActiveClassDefinition: setActiveClassDefinition,
        closeActiveClassDefinition: closeActiveClassDefinition
      }}>
        {props.children}
      </ClassDefinitionTabsContext.Provider>
    )
  }, [props.children, classDefinitions, activeClassDefinition]);
}

export const useClassDefinitionTabs = (): IClassDefinitionTabsContext => {
  const context = useContext(ClassDefinitionTabsContext);

  if (!context) {
    throw new Error('useClassDefinitionTabsContext must be used within a ClassDefinitionsProvider');
  }

  return context;
}
