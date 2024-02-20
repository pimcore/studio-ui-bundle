import React, { Suspense } from 'react'

const icons = {
  camera: React.lazy(async () => await import('@Pimcore/assets/icons/core/camera.inline.svg')),
  folder: React.lazy(async () => await import('@Pimcore/assets/icons/core/folder.inline.svg')),
  'widget-default': React.lazy(async () => await import('@Pimcore/assets/icons/core/widget-default.inline.svg')),
  'chevron-up': React.lazy(async () => await import('@Pimcore/assets/icons/core/chevron-up.inline.svg')),
  'chevron-down': React.lazy(async () => await import('@Pimcore/assets/icons/core/chevron-down.inline.svg')),
  home: React.lazy(async () => await import('@Pimcore/assets/icons/core/home.inline.svg')),
  CloseCircleFilled: React.lazy(async () => await import('@Pimcore/assets/icons/core/CloseCircleFilled.inline.svg'))
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
