import React, { useEffect } from 'react'
import { selectValue, setValue } from '../store/example-slice'
import { useAppDispatch, useAppSelector } from '@Pimcore/app/store/index'
import { Example as ExampleView } from '@Pimcore/components/example/example'
import { useTranslation } from 'react-i18next'

const Example = (): React.JSX.Element => {
  const value = useAppSelector(selectValue)
  const dispatch = useAppDispatch()
  const { t, i18n } = useTranslation()
  const currentDate = i18n.format(new Date(), 'DateTime', i18n.language)

  useEffect(() => {
    dispatch(setValue('test'))
  }, [])

  return (
    <ExampleView prefix={currentDate + ' - ' + t('example-prefix')} value={t(`example-value.${value}`)} />
  )
}

export default Example
