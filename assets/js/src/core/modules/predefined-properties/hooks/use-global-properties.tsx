import { useAppDispatch, useAppSelector } from '@sdk/app'
import { addProperty, setProperties, updateProperty, removeProperty } from '../global-properties-slice'

export const useGlobalProperties = () => {
  const dispatch = useAppDispatch()
  const properties = useAppSelector(state => state.globalProperties.properties)

  return {
    properties,
    addProperty: (property) => dispatch(addProperty(property)),
    setProperties: (properties) => dispatch(setProperties(properties)),
    updateProperty: (key, updatedProperty) => dispatch(updateProperty({ key, updatedProperty })),
    removeProperty: (key) => dispatch(removeProperty(key))
  }
}
