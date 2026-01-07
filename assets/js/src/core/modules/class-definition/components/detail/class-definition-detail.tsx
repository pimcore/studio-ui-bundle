import { ClassDefinitionLayoutProvider } from "@Pimcore/modules/class-definition/components/detail/class-definition-layout-provider"
import { ClassDefinitionDetailContent } from "@Pimcore/modules/class-definition/components/detail/content/class-definition-detail-content"
import { ClassDefinitionDetailTree } from "@Pimcore/modules/class-definition/components/detail/tree/class-definition-detail-tree"
import { ClassDefinitionPartial } from "@Pimcore/modules/class-definition/components/tabs/class-definition-tabs/class-defintion-tabs-provider"
import { useClassDefinitionGetByIdQuery, useClassDefinitionGetLayoutByIdQuery } from "@sdk/api/class-definition"
import { ConfigLayout, Content, ContentLayout, IconButton, Toolbar } from "@sdk/components"
import { ApiError, trackError } from "@sdk/modules/app"
import React, { useEffect } from "react"

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

  useEffect(() => {
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
    <ClassDefinitionLayoutProvider layout={layoutData}>
      <ContentLayout
        className="absolute-stretch"
        renderToolbar={
          <Toolbar>
            <IconButton icon={{value: 'refresh'}} onClick={() => {
              refetchLayout();
              refetchDetail();
            }} />
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
  )
}
