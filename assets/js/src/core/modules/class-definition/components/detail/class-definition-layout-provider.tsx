import { Layout } from "@sdk/api/class-definition";
import { uuid } from "@sdk/utils";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface StructureNode {
  id: string;
  children: StructureNode[];
}

export interface fieldDefinition extends Record<string, any> {}

export interface IClassDefinitionLayoutContext {
  structure: StructureNode | undefined
  fieldDefinitions: Record<string, fieldDefinition>
  currentFieldDefinitionId: StructureNode["id"] | null
  setCurrentFieldDefinitionId: (id: StructureNode["id"] | null) => void
  updateFieldDefinition: (structureNodeId: StructureNode["id"], updatedFieldDefinition: fieldDefinition) => void
  addFieldDefinition: (structureNodeId: StructureNode["id"], newFieldDefinition: fieldDefinition) => StructureNode["id"]
  removeFieldDefinition: (structureNodeId: StructureNode["id"]) => void
  cloneFieldDefinition: (structureNodeId: StructureNode["id"]) => StructureNode["id"]
  moveFieldDefinition: (structureNodeId: StructureNode["id"], newParentId: StructureNode["id"], newIndex: number) => void
}

export const ClassDefinitionLayoutContext = createContext<IClassDefinitionLayoutContext | undefined>(undefined);

export interface ClassDefinitionLayoutProviderProps {
  layout: Layout | undefined
  children: React.ReactNode
}

export const ClassDefinitionLayoutProvider = (props: ClassDefinitionLayoutProviderProps): React.JSX.Element => {
  const [structure, setStructure] = useState<IClassDefinitionLayoutContext['structure']>(undefined);
  const [fieldDefinitions, setFieldDefinitions] = useState<IClassDefinitionLayoutContext['fieldDefinitions']>({});
  const [currentFieldDefinitionId, setCurrentFieldDefinitionId] = useState<IClassDefinitionLayoutContext['currentFieldDefinitionId']>(null);

  useEffect(() => {
    if (props.layout === undefined) {
      setStructure(undefined);
      setFieldDefinitions({});
      return;
    }

    const initialFieldDefinitions: IClassDefinitionLayoutContext['fieldDefinitions'] = {};

    const buildStructure = (layoutItem: Layout): StructureNode => {
      const id = uuid();

      const node: StructureNode = {
        id: id,
        children: layoutItem.children ? layoutItem.children.map((child) => buildStructure(child as Layout)) : [],
      };

      const { children, ...fieldDef } = layoutItem;

      initialFieldDefinitions[id] = fieldDef;

      return node;
    };

    const rootStructure = buildStructure(props.layout);

    setCurrentFieldDefinitionId(null);
    setStructure(rootStructure);
    setFieldDefinitions(initialFieldDefinitions);
  }, [props.layout]);

  const updateFieldDefinition = (structureNodeId: StructureNode["id"], updatedFieldDefinition: fieldDefinition) => {
    setFieldDefinitions((prevDefs) => ({
      ...prevDefs,
      [structureNodeId]: {
        ...prevDefs[structureNodeId],
        ...updatedFieldDefinition,
      },
    }));
  };

  const addFieldDefinition = (structureNodeId: StructureNode["id"], newFieldDefinition: fieldDefinition): StructureNode["id"] => {
    const newId = uuid();

    const addNodeRecursively = (node: StructureNode): StructureNode => {
      if (node.id === structureNodeId) {
        return {
          ...node,
          children: [...node.children, { id: newId, children: [] }],
        };
      }

      return {
        ...node,
        children: node.children.map(addNodeRecursively),
      };
    };

    setStructure((prevStructure) => prevStructure ? addNodeRecursively(prevStructure) : prevStructure);
    setFieldDefinitions((prevDefs) => ({
      ...prevDefs,
      [newId]: newFieldDefinition,
    }));

    return newId;
  };

  const removeFieldDefinition = (structureNodeId: StructureNode["id"]) => {
    const removeNodeRecursively = (node: StructureNode): StructureNode | undefined => {
      if (node.id === structureNodeId) {
        return undefined;
      }

      const updatedChildren = node.children
        .map(removeNodeRecursively)
        .filter((child): child is StructureNode => child !== undefined);

      return {
        ...node,
        children: updatedChildren,
      };
    };

    setStructure((prevStructure) => prevStructure ? removeNodeRecursively(prevStructure) : prevStructure);
    setFieldDefinitions((prevDefs) => {
      const { [structureNodeId]: _, ...rest } = prevDefs;
      return rest;
    });
  };

  const cloneFieldDefinition = (structureNodeId: StructureNode["id"]): StructureNode["id"] => {
    const oldToNewIdMap: Record<string, string> = {};
    
    const cloneNodeRecursively = (node: StructureNode): StructureNode => {
      const newId = uuid();
      oldToNewIdMap[node.id] = newId;
      
      return {
        id: newId,
        children: node.children.map(cloneNodeRecursively),
      };
    };
    
    const findNode = (node: StructureNode, targetId: string): StructureNode | undefined => {
      if (node.id === targetId) {
        return node;
      }
      
      for (const child of node.children) {
        const found = findNode(child, targetId);
        if (found !== undefined) return found;
      }
      
      return undefined;
    };
    
    const insertClonedNodeAsSibling = (node: StructureNode, targetId: string, clonedNode: StructureNode): StructureNode => {
      const childIndex = node.children.findIndex(child => child.id === targetId);
      
      if (childIndex !== -1) {
        const newChildren = [...node.children];
        newChildren.splice(childIndex + 1, 0, clonedNode);
        
        return {
          ...node,
          children: newChildren,
        };
      }
      
      return {
        ...node,
        children: node.children.map(child => insertClonedNodeAsSibling(child, targetId, clonedNode)),
      };
    };
    
    if (structure === undefined) {
      return structureNodeId;
    }
    
    const nodeToClone = findNode(structure, structureNodeId);
    
    if (nodeToClone === undefined) {
      return structureNodeId;
    }
    
    const clonedNode = cloneNodeRecursively(nodeToClone);
    
    setStructure((prevStructure) => 
      prevStructure !== undefined ? insertClonedNodeAsSibling(prevStructure, structureNodeId, clonedNode) : prevStructure
    );
    
    setFieldDefinitions((prevDefs) => {
      const newDefs = { ...prevDefs };
      
      Object.entries(oldToNewIdMap).forEach(([oldId, newId]) => {
        newDefs[newId] = { ...prevDefs[oldId] };
      });
      
      return newDefs;
    });
    
    return clonedNode.id;
  }

  const moveFieldDefinition = (structureNodeId: StructureNode["id"], newParentId: StructureNode["id"], newIndex: number) => {
    const findAndRemoveNode = (node: StructureNode, targetId: string): { updatedNode: StructureNode | null; removedNode: StructureNode | null } => {
      if (node.id === targetId) {
        return { updatedNode: null, removedNode: node };
      }

      let removedNode: StructureNode | null = null;
      const updatedChildren = node.children
        .map((child) => {
          const result = findAndRemoveNode(child, targetId);
          if (result.removedNode) {
            removedNode = result.removedNode;
          }
          return result.updatedNode;
        })
        .filter((child): child is StructureNode => child !== null);

      return { updatedNode: { ...node, children: updatedChildren }, removedNode };
    };

    const insertNodeAtNewPosition = (node: StructureNode, targetParentId: string, nodeToInsert: StructureNode, index: number): StructureNode => {
      if (node.id === targetParentId) {
        const newChildren = [...node.children];
        newChildren.splice(index, 0, nodeToInsert);
        return { ...node, children: newChildren };
      }

      return {
        ...node,
        children: node.children.map((child) => insertNodeAtNewPosition(child, targetParentId, nodeToInsert, index)),
      };
    };

    setStructure((prevStructure) => {
      if (!prevStructure) return prevStructure;

      const { updatedNode, removedNode } = findAndRemoveNode(prevStructure, structureNodeId);
      if (!removedNode || !updatedNode) return prevStructure;

      return insertNodeAtNewPosition(updatedNode, newParentId, removedNode, newIndex);
    });
  };

  return useMemo(() => (
    <ClassDefinitionLayoutContext.Provider 
      value={
        {
          structure,
          fieldDefinitions,
          currentFieldDefinitionId,
          setCurrentFieldDefinitionId,
          updateFieldDefinition,
          addFieldDefinition,
          removeFieldDefinition,
          cloneFieldDefinition,
          moveFieldDefinition
        }
      }
    >
      {props.children}
    </ClassDefinitionLayoutContext.Provider>
  ), [structure, fieldDefinitions, currentFieldDefinitionId, props.children]);
}

export const useClassDefinitionLayout = (): IClassDefinitionLayoutContext => {
  const context = useContext(ClassDefinitionLayoutContext);

  if (!context) {
    throw new Error("useClassDefinitionLayout must be used within a ClassDefinitionLayoutProvider");
  }

  return context;
}
