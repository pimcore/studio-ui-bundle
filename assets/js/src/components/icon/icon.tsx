import React, { Suspense } from 'react'

const icons = {
  camera: React.lazy(async () => await import('@Pimcore/assets/icons/core/camera.inline.svg')),
  folder: React.lazy(async () => await import('@Pimcore/assets/icons/core/folder.inline.svg')),
  'widget-default': React.lazy(async () => await import('@Pimcore/assets/icons/core/widget-default.inline.svg')),
  'chevron-up': React.lazy(async () => await import('@Pimcore/assets/icons/core/chevron-up.inline.svg')),
  'chevron-down': React.lazy(async () => await import('@Pimcore/assets/icons/core/chevron-down.inline.svg')),
  home: React.lazy(async () => await import('@Pimcore/assets/icons/core/home.inline.svg')),
  'image-05': React.lazy(async () => await import('@Pimcore/assets/icons/core/image-05.inline.svg')),
  edit: React.lazy(async () => await import('@Pimcore/assets/icons/core/edit.inline.svg')),
  'data-sheet': React.lazy(async () => await import('@Pimcore/assets/icons/core/data-sheet.inline.svg')),
  'data-management-2': React.lazy(async () => await import('@Pimcore/assets/icons/core/data-management-2.inline.svg')),
  'history-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/core/history-outlined.inline.svg')),
  'schedule-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/core/schedule-outlined.inline.svg')),
  hierarchy: React.lazy(async () => await import('@Pimcore/assets/icons/core/hierarchy.inline.svg')),
  'view-details': React.lazy(async () => await import('@Pimcore/assets/icons/core/view-details.inline.svg')),
  'tag-two-tone': React.lazy(async () => await import('@Pimcore/assets/icons/core/tag-two-tone.inline.svg')),
  workflow: React.lazy(async () => await import('@Pimcore/assets/icons/core/workflow.inline.svg')),
  'unordered-list-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/core/unordered-list-outlined.inline.svg')),
  'dots-horizontal': React.lazy(async () => await import('@Pimcore/assets/icons/core/dots-horizontal.inline.svg')),
  target: React.lazy(async () => await import('@Pimcore/assets/icons/core/target.inline.svg')),
  'info-circle-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/core/info-circle-outlined.inline.svg')),
  'right-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/core/right-outlined.inline.svg')),
  'rich-edit': React.lazy(async () => await import('@Pimcore/assets/icons/core/rich-edit.inline.svg')),
  'download-02': React.lazy(async () => await import('@Pimcore/assets/icons/core/download-02.inline.svg')),
  'delete-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/core/delete-outlined.inline.svg'))
}

export interface IconProps {
  name: string
  options?: React.SVGProps<SVGSVGElement>
  className?: string
}

export const Icon = ({ name, options, className }: IconProps): React.JSX.Element => {
  const SvgIcon = icons[name]
  const width = options?.width ?? 16
  const height = options?.height ?? 16

  return (
    <div style={{ width, height }} className={`pimcore-icon pimcore-icon-${name} anticon ${className}`}>
      <Suspense fallback={<div />}>
        <SvgIcon width={width} height={height} {...options} />
      </Suspense>
    </div>
  )
}
