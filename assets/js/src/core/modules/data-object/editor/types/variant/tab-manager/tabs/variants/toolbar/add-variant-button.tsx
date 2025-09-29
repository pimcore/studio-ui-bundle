import { useAppDispatch } from "@Pimcore/app/store";
import { IconTextButton } from "@Pimcore/components/icon-text-button/icon-text-button"
import { useAddVariant } from "@Pimcore/modules/data-object/actions/add-variant/use-add-variant"
import { useClassDefinitionSelection } from "@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection";
import { useElementContext } from "@Pimcore/modules/element/hooks/use-element-context";
import { api} from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import React from "react"
import { invalidatingTags } from "@Pimcore/app/api/pimcore/tags";
import { useTranslation } from "react-i18next";

export const AddVariantButton = (): React.JSX.Element => {
  const { createDataObjectVariant } = useAddVariant();
  const { selectedClassDefinition } = useClassDefinitionSelection();
  const { id } = useElementContext();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onAddVariantClick = () => {
    createDataObjectVariant(
      { id: selectedClassDefinition?.id ?? '', name: selectedClassDefinition?.name ?? '' },
      id as number,
      (newName: string) => {
        dispatch(api.util.invalidateTags(invalidatingTags.DATA_OBJECT_GRID_ID(id)))
        return newName;
      }
    )
  }

  return (
    <IconTextButton 
      icon={ { value: 'new' }}
      onClick={onAddVariantClick}
    >
      {t('data-object.variant-listing.create-data-variant')}
    </IconTextButton>
  )
}
