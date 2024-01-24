import React, { useEffect } from 'react'
import { selectValue, setValue } from '../store/example-slice'
import { useAppDispatch, useAppSelector } from '@Pimcore/app/store/index'
import { Example as ExampleView } from '@Pimcore/components/example/example'

const Example = (): React.JSX.Element => {
  const value = useAppSelector(selectValue)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setValue('test32'))
  }, [])

  return (
    <ExampleView prefix='custom prefix: ' value={value} />
  )
}

export default Example
