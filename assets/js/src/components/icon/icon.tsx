import React, { Suspense } from 'react'

const icons = {
  camera: React.lazy(async () => await import('@Pimcore/assets/icons/core/camera.inline.svg')),
  folder: React.lazy(async () => await import('@Pimcore/assets/icons/core/folder.inline.svg')),
  'widget-default': React.lazy(async () => await import('@Pimcore/assets/icons/core/widget-default.inline.svg')),
  'chevron-up': React.lazy(async () => await import('@Pimcore/assets/icons/core/chevron-up.inline.svg')),
  'chevron-down': React.lazy(async () => await import('@Pimcore/assets/icons/core/chevron-down.inline.svg')),
  home: React.lazy(async () => await import('@Pimcore/assets/icons/core/home.inline.svg')),
  'view-details': React.lazy(async () => await import('@Pimcore/assets/icons/core/view-details.inline.svg')),
  'image-05': React.lazy(async () => await import('@Pimcore/assets/icons/core/image-05.inline.svg')),
  edit: React.lazy(async () => await import('@Pimcore/assets/icons/core/edit.inline.svg')),
  data_sheet: React.lazy(async () => await import('@Pimcore/assets/icons/core/data_sheet.inline.svg')),
  'data-management-2': React.lazy(async () => await import('@Pimcore/assets/icons/core/data-management-2.inline.svg')),
  historyOutlined: React.lazy(async () => await import('@Pimcore/assets/icons/core/historyOutlined.inline.svg')),
  scheduleOutlined: React.lazy(async () => await import('@Pimcore/assets/icons/core/scheduleOutlined.inline.svg')),
  hierarchy: React.lazy(async () => await import('@Pimcore/assets/icons/core/hierarchy.inline.svg')),
  view_details: React.lazy(async () => await import('@Pimcore/assets/icons/core/view_details.inline.svg')),
  tagTwoTone: React.lazy(async () => await import('@Pimcore/assets/icons/core/tagTwoTone.inline.svg')),
  workflow: React.lazy(async () => await import('@Pimcore/assets/icons/core/workflow.inline.svg'))
}

export interface IconProps {
  name: string
  options?: React.SVGProps<SVGSVGElement>
}

export const Icon = ({ name, options }: IconProps): React.JSX.Element => {
  const SvgIcon = icons[name]

  return (
    <div style={{ width: options?.width, height: options?.height }} className={`pimcore-icon pimcore-icon-${name} anticon`}>
      <Suspense fallback={<div />}>
        <SvgIcon {...options} />
      </Suspense>
    </div>
  )
}
