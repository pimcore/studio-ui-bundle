import { ClassDefinitionDetailProvider } from "@Pimcore/modules/class-definition/components/detail/class-definition-detail-provider"
import { ClassDefinitionLayoutProvider } from "@Pimcore/modules/class-definition/components/detail/class-definition-layout-provider"
import { ClassDefinitionDetailContent } from "@Pimcore/modules/class-definition/components/detail/content/class-definition-detail-content"
import { ClassDefinitionDetailSave } from "@Pimcore/modules/class-definition/components/detail/save/class-definition-detail-save"
import { ClassDefinitionDetailTree } from "@Pimcore/modules/class-definition/components/detail/tree/class-definition-detail-tree"
import { ClassDefinitionPartial } from "@Pimcore/modules/class-definition/components/tabs/class-definition-tabs/class-defintion-tabs-provider"
import { Layout, useClassDefinitionGetByIdQuery, useClassDefinitionGetLayoutByIdQuery } from "@sdk/api/class-definition"
import { ConfigLayout, Content, ContentLayout, IconButton, Toolbar } from "@sdk/components"
import { ApiError, trackError } from "@sdk/modules/app"
import React, { useEffect, useState } from "react"

export interface ClassDefinitionDetailProps {
  classDefinition: ClassDefinitionPartial
}

export const ClassDefinitionDetail = (props: ClassDefinitionDetailProps): React.JSX.Element => {
  const {error: layoutError, isLoading: isLayoutLoading, isFetching: isLayoutFetching, refetch: refetchLayout, data: layoutData} = useClassDefinitionGetLayoutByIdQuery({
    id: props.classDefinition.id
  });

  const {error: detailError, isLoading: isDetailLoading, isFetching: isDetailFetching, refetch: refetchDetail, data: detailData} = useClassDefinitionGetByIdQuery({
    id: props.classDefinition.id
  })

  const [layout, setLayout] = useState<Layout | undefined>(layoutData);

  useEffect(() => {
    setLayout(layoutData);
  }, [layoutData]);

  useEffect(() => {
    // @todo check this with backend team why 404 is returned for missing layouts
    if (layoutError !== undefined &&'status' in layoutError && layoutError.status === 404) {
      setLayout({ 
        name: 'pimcore_root',
        children: [],
        fieldType: 'panel',
        bodyStyle: '',
        border: false,
        collapsible: false,
        title: '',
        dataType: 'layout',
        collapsed: false,
        height: 0,
        width: 0,
        icon: {type: 'name', value: 'none'},
        labelAlign: 'left',
        labelWidth: 100,
        layout: null,
        locked: false,
        region: '',
        type: 'layout',
        additionalAttributes: {}
      });
      return;
    }

    if (layoutError) {
      trackError(new ApiError(layoutError));
    }
  }, [layoutError]);

  useEffect(() => {
    if (detailError) {
      trackError(new ApiError(detailError));
    }
  }, [detailError]);

  return (
    <ClassDefinitionDetailProvider classDefinition={detailData}>
      <ClassDefinitionLayoutProvider layout={layout}>
        <ContentLayout
          className="absolute-stretch"
          renderToolbar={
            <Toolbar>
              <IconButton icon={{value: 'refresh'}} onClick={() => {
                refetchLayout();
                refetchDetail();
              }} />

              <ClassDefinitionDetailSave />
            </Toolbar>
          }
        >
          <Content loading={isLayoutLoading || isDetailLoading || isLayoutFetching || isDetailFetching}>
            <ConfigLayout 
              leftItem={{
                children: <ClassDefinitionDetailTree />
              }}

              rightItem={{
                children: <ClassDefinitionDetailContent />
              }}
            />
          </Content>
        </ContentLayout>
      </ClassDefinitionLayoutProvider>
    </ClassDefinitionDetailProvider>
  )
}
