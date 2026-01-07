import { useClassDefinitionCollectionQuery, useClassDefinitionDeleteMutation } from "@Pimcore/modules/class-definition/class-definition-slice.gen"
import { ClassDefinitionModalNew } from "@Pimcore/modules/class-definition/components/sidebar/class-definition-modal-new";
import { useClassDefinitionTabs } from "@Pimcore/modules/class-definition/components/tabs/class-definition-tabs/class-defintion-tabs-provider";
import { Content, ContentLayout, Icon, IconButton, IconTextButton, ITreeElementProps, SearchInput, Toolbar, TreeDataItem, TreeElement } from "@sdk/components"
import { useDebounce } from "@sdk/utils";
import { isNil } from "lodash";
import React, { useMemo, useState } from "react"

export const ClassDefinitionSidebar = (): React.JSX.Element => {
  const { isLoading, isFetching, data, refetch } = useClassDefinitionCollectionQuery();
  const [ deleteClassDefinitionMutation ] = useClassDefinitionDeleteMutation();
  const [ searchTerm, setSearchTerm ] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300); 
  const [ showNewModal, setShowNewModal ] = useState<boolean>(false);
  const { setActiveClassDefinition, activeClassDefinition, closeClassDefinition } = useClassDefinitionTabs();

  const treeData: ITreeElementProps["treeData"] = useMemo(() => {
    if (data === undefined) {
      return [];
    }

    const formattedTreeData: ITreeElementProps["treeData"] = [];

    const groupMap: Record<string, ITreeElementProps["treeData"][0]> = {};

    const filteredData = data.items.filter((classDef) => {
      if (debouncedSearchTerm === "") {
        return true;
      }

      return classDef.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    });

    filteredData.forEach((classDef) => {
      const groupName = classDef.group;

      if (isNil(groupName) || groupName === "") {
        formattedTreeData.push({
          title: classDef.name,
          key: `${classDef.id}`,
          icon: classDef.icon ? <Icon {...classDef.icon} /> : undefined,
          meta: { classDefinition: classDef },
          actions: [
            { key: 'delete', icon: 'delete' }
          ]
        });
        return;
      }

      if (!groupMap[groupName]) {
        groupMap[groupName] = {
          title: groupName,
          key: `group-${groupName}`,
          icon: <Icon value="folder" />,
          children: [],
        };
        formattedTreeData.push(groupMap[groupName]);
      }

      groupMap[groupName].children!.push({
        title: classDef.name,
        key: `${classDef.id}`,
        icon: classDef.icon ? <Icon {...classDef.icon} /> : undefined,
        meta: { classDefinition: classDef },
        actions: [
          { key: 'delete', icon: 'delete' }
        ]
      } as TreeDataItem);
    });

    // @todo check sorting logic
    formattedTreeData.sort((a, b) => {
      if (a.children?.length && !b.children?.length) {
        return 1;
      }
      if (!a.children?.length && b.children?.length) {
        return -1;
      }

      return a.title!.toString().localeCompare(b.title!.toString());
    });
    
    return formattedTreeData;
  }, [data, debouncedSearchTerm]);

  const expandedKeys = useMemo(() => {
    return debouncedSearchTerm !== "" ? treeData.map(item => item.key) : [];
  }, [treeData, debouncedSearchTerm]);

  const deleteClassDefinition = (node: TreeDataItem) => {
    closeClassDefinition(node.meta!.classDefinition);
    deleteClassDefinitionMutation({ id: node.meta!.classDefinition.id })
  };

  // @todo Translations!!
  return (
    <>
      <ClassDefinitionModalNew 
        open={ showNewModal }
        onOpenChange={ setShowNewModal }
      />

      <ContentLayout 
        renderToolbar={
          <Toolbar>
            <IconButton 
              icon={{value: 'refresh'}}
              onClick={refetch}
            />

            <IconTextButton 
              type="link" 
              icon={{value: 'new'}}
              onClick={ () => { 
                setShowNewModal(true);
              }}
            >
              New
            </IconTextButton>
          </Toolbar>
        }
      >
        <Content padded loading={ isLoading }>
          <SearchInput 
            withoutAddon 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Content loading={ isFetching }>
            <TreeElement 
              treeData={ treeData }
              defaultExpandedKeys={ expandedKeys }
              selectedKeys={activeClassDefinition ? [activeClassDefinition.id] : undefined}
              onSelected={(key, node) => {
                setActiveClassDefinition(node.meta!.classDefinition);
              }} 
              onActionsClick={(key, action, node) => {
                if (action === 'delete') {
                  deleteClassDefinition(node);
                }
              }}
            />
          </Content>
        </Content>
      </ContentLayout>
    </>
  )
}
