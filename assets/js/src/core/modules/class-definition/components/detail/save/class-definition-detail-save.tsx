import { useClassDefinitionDetail } from "@Pimcore/modules/class-definition/components/detail/class-definition-detail-provider";
import { useClassDefinitionLayout } from "@Pimcore/modules/class-definition/components/detail/class-definition-layout-provider";
import { useClassDefinitionUpdateMutation } from "@sdk/api/class-definition";
import { Button, ButtonProps, useMessage } from "@sdk/components";
import { ApiError, trackError } from "@sdk/modules/app";
import React, { useEffect } from "react";

export const ClassDefinitionDetailSave = (): React.JSX.Element => {
  const { getLayout } = useClassDefinitionLayout();
  const { classDefinition } = useClassDefinitionDetail();
  const [updateClassDefinitionMutation, { isLoading, error }] = useClassDefinitionUpdateMutation();
  const messageApi = useMessage();

  useEffect(() => {
    if (error) {
      trackError(new ApiError(error));
    }
  }, [error]);

  const onClick: ButtonProps['onClick'] = () => {
    if (classDefinition === undefined) {
      return;
    }

    updateClassDefinitionMutation({
      id: classDefinition.id,
      classDefinitionUpdate: {
        values: {
          ...classDefinition,
          // @todo check how to handle new icon types
          icon: ''
        },
        configuration: {
          children: getLayout().children
        }
      }
    }).then(() => {
      messageApi.success('Class definition saved successfully.');
    }).catch((e) => {
      trackError(new ApiError(e));
    });
  }

  return (
    <Button type="primary" onClick={onClick} disabled={isLoading || classDefinition === undefined} loading={isLoading}>
      Save
    </Button>
  );
}
