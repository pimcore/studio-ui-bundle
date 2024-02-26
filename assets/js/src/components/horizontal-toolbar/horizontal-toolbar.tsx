import { Button } from 'antd'
import React from 'react'
import { useStyle } from './horizontal-toolbar.styles'
import { Icon } from '../icon/icon'
import i18n from '@Pimcore/app/i18n'

interface HorizontalToolbarProps {

}

export const HorizontalToolbar = ({

}: HorizontalToolbarProps): React.JSX.Element => {
  const { styles } = useStyle()
  
  const optionsSvg = { width: '18px', height: '18px' }

  return (
    <div className={styles.container}>
        <div className={styles['left-container']}>
          <Button type='text' icon={<Icon name='refresh' className={styles['btn-default-color']} options={optionsSvg} />} />
          <Button type='text' icon={<Icon name='target' className={styles['btn-default-color']} options={optionsSvg} />} />
          <Button type='text' className={styles['btn-info']}>
            <Icon name='info-circle-outlined' className={styles['btn-default-color']} options={optionsSvg} />
            <Icon name='icon-tools' options={{ width: '10px', height: '5px' }}
              className={styles['info-arrow-down'] + ' ' + styles['btn-default-color']}/>
          </Button>
          <Button type='text' className={styles['btn-info'] + ' ' + styles['btn-default-color']}>
            {i18n.t('horizontal-toolbar.more')}
            <Icon name='icon-tools' options={{ width: '10px', height: '5px' }}
              className={styles['more-arrow-down'] + ' ' + styles['btn-default-color']}/>
          </Button>
        </div>
    </div>
  )
}
