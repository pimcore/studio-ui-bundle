import React, { Suspense } from 'react'

const icons = {
  camera: React.lazy(async () => await import('@Pimcore/assets/icons/core/camera.inline.svg')),
  folder: React.lazy(async () => await import('@Pimcore/assets/icons/core/folder.inline.svg')),
  'widget-default': React.lazy(async () => await import('@Pimcore/assets/icons/core/widget-default.inline.svg')),
  'view-details': React.lazy(async () => await import('@Pimcore/assets/icons/core/view-details.inline.svg')),
  view: React.lazy(async () => await import('@Pimcore/assets/icons/core/view.inline.svg')),
  edit: React.lazy(async () => await import('@Pimcore/assets/icons/core/edit.inline.svg')),
  'embedded-metadata': React.lazy(async () => await import('@Pimcore/assets/icons/core/embedded-metadata.inline.svg')),
  'custom-metadata': React.lazy(async () => await import('@Pimcore/assets/icons/core/custom-metadata.inline.svg')),
  versions: React.lazy(async () => await import('@Pimcore/assets/icons/core/versions.inline.svg')),
  schedule: React.lazy(async () => await import('@Pimcore/assets/icons/core/schedule.inline.svg')),
  dependencies: React.lazy(async () => await import('@Pimcore/assets/icons/core/dependencies.inline.svg')),
  'notes-events': React.lazy(async () => await import('@Pimcore/assets/icons/core/notes-events.inline.svg')),
  tag: React.lazy(async () => await import('@Pimcore/assets/icons/core/tag.inline.svg')),
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
