import { useClassDefinitionLayout } from "@Pimcore/modules/class-definition/components/detail/class-definition-layout-provider"
import { DynamicTypeFieldDefinitionAbstract } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract";
import { DynamicTypeFieldDefinitionRegistry } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry";
import { serviceIds, useInjection } from "@sdk/app";
import { TreeElement, ITreeElementProps, Icon } from "@sdk/components";
import React from "react"

export const ClassDefinitionDetailTree = (): React.JSX.Element => {
  const { structure, fieldDefinitions, currentFieldDefinitionId, addFieldDefinition, setCurrentFieldDefinitionId, moveFieldDefinition, removeFieldDefinition, cloneFieldDefinition } = useClassDefinitionLayout();
  const fieldDefinitionRegistry = useInjection<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry']);

  const items: ITreeElementProps["treeData"] = React.useMemo(() => {
    if (!structure) {
      return [];
    }

    const buildTreeItems = (node: typeof structure): ITreeElementProps["treeData"][0] => {
      const fieldDef = fieldDefinitions[node.id];
      const actions: ITreeElementProps["treeData"][0]["actions"] = [];
      let dynType: undefined | DynamicTypeFieldDefinitionAbstract = undefined;

      if (fieldDefinitionRegistry.hasDynamicType(fieldDef.fieldtype)) {
        dynType = fieldDefinitionRegistry.getDynamicType(fieldDef.fieldtype);
      }

      if (fieldDef.name !== 'pimcore_root') {
        if (dynType !== undefined) {
          const allowedChildTags = dynType.getAllowedChildTags();
          fieldDefinitionRegistry.getTypesByTags(allowedChildTags).forEach((type) => {
            actions.push({ key: `add-${type.id}`, icon: type.getIcon().value });
          });
        }

        actions.push({ key: 'clone', icon: 'clone' });
        actions.push({ key: 'delete', icon: 'delete' });
      } else {
        fieldDefinitionRegistry.getTypesByTags(['root']).forEach((type) => {
          actions.push({ key: `add-${type.id}`, icon: type.getIcon().value });
        });
      }

      return {
        title: fieldDef?.name || "Unnamed Field",
        icon: dynType !== undefined ? <Icon {...dynType.getIcon()} /> : undefined,
        key: node.id,
        children: node.children.map((child) => buildTreeItems(child)),
        allowDrop: () => true,
        actions: actions
      };
    };

    return [buildTreeItems(structure)];
  }, [structure, fieldDefinitions]);

  const onActionsClick: ITreeElementProps["onActionsClick"] = (nodeKey, actionKey) => {
    if (actionKey === 'clone') {
      cloneFieldDefinition(nodeKey);
    }

    if (actionKey === 'delete') {
      removeFieldDefinition(nodeKey);
    }

    if (actionKey.startsWith('add-')) {
      const typeId = actionKey.replace('add-', '');
      const type = fieldDefinitionRegistry.getDynamicType(typeId)!;

      const newFieldDefData = type.getDefaultData();
      addFieldDefinition(nodeKey, newFieldDefData);
    }
  };

  const onSelected: ITreeElementProps["onSelected"] = (key, node) => {
    const fieldDef = fieldDefinitions[key];

    if (fieldDef.name === 'pimcore_root') {
      setCurrentFieldDefinitionId(null);
      return;
    }

    setCurrentFieldDefinitionId(key);
  }

  return (
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
  )
}
