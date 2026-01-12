import { useClassDefinitionLayout } from "@Pimcore/modules/class-definition/components/detail/class-definition-layout-provider"
import { DynamicTypeFieldDefinitionAbstract } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract";
import { DynamicTypeFieldDefinitionRegistry } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry";
import { serviceIds, useInjection } from "@sdk/app";
import { TreeElement, ITreeElementProps, Icon, Content } from "@sdk/components";
import React from "react"

export const ClassDefinitionDetailTree = (): React.JSX.Element => {
  const { structure, fieldDefinitions, currentFieldDefinitionId, addFieldDefinition, setCurrentFieldDefinitionIdPath, setCurrentFieldDefinitionId, moveFieldDefinition, removeFieldDefinition, cloneFieldDefinition } = useClassDefinitionLayout();
  const fieldDefinitionRegistry = useInjection<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry']);

  const items: ITreeElementProps["treeData"] = React.useMemo(() => {
    if (!structure) {
      return [];
    }

    const buildTreeItems = (node: typeof structure, parentPath: string[] = []): ITreeElementProps["treeData"][0] => {
      const fieldDef = fieldDefinitions[node.id];
      const actions: ITreeElementProps["treeData"][0]["actions"] = [];
      let dynType: undefined | DynamicTypeFieldDefinitionAbstract = undefined;

      if (fieldDefinitionRegistry.hasDynamicType(fieldDef.fieldtype)) {
        dynType = fieldDefinitionRegistry.getDynamicType(fieldDef.fieldtype);
      }

      const currentPath = [...parentPath, node.id];

      if (fieldDef.name !== 'pimcore_root') {
        if (dynType !== undefined) {
          const allowedChildTags = dynType.getValidChildTags({ area: ['class'], path: currentPath, fieldDefinitions });
          fieldDefinitionRegistry.getTypesByTags(allowedChildTags, { area: ['class'], path: currentPath, fieldDefinitions }).forEach((type) => {
            actions.push({ key: `add-${type.id}`, icon: type.getIcon().value });
          });
        }

        actions.push({ key: 'clone', icon: 'clone' });
        actions.push({ key: 'delete', icon: 'delete' });
      } else {
        fieldDefinitionRegistry.getTypesByTags(['group:root'], { area: ['class'], path: currentPath, fieldDefinitions }).forEach((type) => {
          actions.push({ key: `add-${type.id}`, icon: type.getIcon().value });
        });
      }

      return {
        title: fieldDef?.name || "Unnamed Field",
        icon: dynType !== undefined ? <Icon {...dynType.getIcon()} /> : undefined,
        key: node.id,
        meta: { currentPath },
        children: node.children.map((child) => buildTreeItems(child, currentPath)),
        allowDrag(params) {
          const dragFieldDef = fieldDefinitions[params.node.key as string];
          // Prevent dragging of root node
          if (fieldDef.name === 'pimcore_root') {
            return false;
          }

          return true;
        },
        allowDrop: ({dropNode, dragNode}) => {
          const dragFieldDef = fieldDefinitions[dragNode.key as string];
          let isValid = false;

          if (fieldDef.name === 'pimcore_root') {
            fieldDefinitionRegistry.getTypesByTags(['group:root'], { area: ['class'], path: currentPath, fieldDefinitions }).forEach((type) => {
              if (type.id === dragFieldDef.fieldtype) {
                isValid = true;
              }
            });
          }

          if (dynType !== undefined) {
            const allowedChildTags = dynType.getValidChildTags({ area: ['class'], path: currentPath, fieldDefinitions });
            fieldDefinitionRegistry.getTypesByTags(allowedChildTags, { area: ['class'], path: currentPath, fieldDefinitions }).forEach((type) => {
              if (type.id === dragFieldDef.fieldtype) {
                isValid = true;
              }
            });
          }
          
          return isValid;
        },
        actions: actions
      };
    };

    return [buildTreeItems(structure)];
  }, [structure, fieldDefinitions]);

  const onActionsClick: ITreeElementProps["onActionsClick"] = (nodeKey, actionKey, node) => {
    if (actionKey === 'clone') {
      cloneFieldDefinition(nodeKey);
    }

    if (actionKey === 'delete') {
      removeFieldDefinition(nodeKey);
    }

    if (actionKey.startsWith('add-')) {
      const typeId = actionKey.replace('add-', '');
      const type = fieldDefinitionRegistry.getDynamicType(typeId)!;

      const newFieldDefData = type.getDefaultData({ area: ['class'], path: node.meta?.currentPath ?? [], fieldDefinitions });
      addFieldDefinition(nodeKey, newFieldDefData);
    }
  };

  const onSelected: ITreeElementProps["onSelected"] = (key, node) => {
    const fieldDef = fieldDefinitions[key];

    if (fieldDef.name === 'pimcore_root') {
      setCurrentFieldDefinitionId(null);
      setCurrentFieldDefinitionIdPath(null);
      return;
    }

    setCurrentFieldDefinitionId(key);
    setCurrentFieldDefinitionIdPath(node.meta?.currentPath ?? null);
  }

  return (
    <Content padded padding={{ 'y': 'small', 'x': 'mini' }}>
      <TreeElement 
        defaultExpandAll
        treeData={items} 
        onActionsClick={onActionsClick}
        selectedKeys={currentFieldDefinitionId ? [currentFieldDefinitionId] : []}
        onSelected={onSelected}
        draggable
        onDragAndDrop={({node, dragNode, dropPosition}) => {
          moveFieldDefinition(dragNode.key as string, node.key as string, dropPosition);
        }}
      />
    </Content>
  )
}
