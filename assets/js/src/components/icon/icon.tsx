import React, { Suspense } from 'react'

const icons = {
  camera: React.lazy(async () => await import('@Pimcore/assets/icons/camera.inline.svg')),
  folder: React.lazy(async () => await import('@Pimcore/assets/icons/folder.inline.svg')),
  'widget-default': React.lazy(async () => await import('@Pimcore/assets/icons/widget-default.inline.svg')),
  'chevron-up': React.lazy(async () => await import('@Pimcore/assets/icons/chevron-up.inline.svg')),
  'chevron-down': React.lazy(async () => await import('@Pimcore/assets/icons/chevron-down.inline.svg')),
  home: React.lazy(async () => await import('@Pimcore/assets/icons/home.inline.svg')),
  refresh: React.lazy(async () => await import('@Pimcore/assets/icons/refresh.inline.svg')),
  'icon-tools': React.lazy(async () => await import('@Pimcore/assets/icons/icon-tools.inline.svg')),
  'image-05': React.lazy(async () => await import('@Pimcore/assets/icons/image-05.inline.svg')),
  edit: React.lazy(async () => await import('@Pimcore/assets/icons/edit.inline.svg')),
  'data-sheet': React.lazy(async () => await import('@Pimcore/assets/icons/data-sheet.inline.svg')),
  'data-management-2': React.lazy(async () => await import('@Pimcore/assets/icons/data-management-2.inline.svg')),
  'history-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/history-outlined.inline.svg')),
  'schedule-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/schedule-outlined.inline.svg')),
  hierarchy: React.lazy(async () => await import('@Pimcore/assets/icons/hierarchy.inline.svg')),
  'view-details': React.lazy(async () => await import('@Pimcore/assets/icons/view-details.inline.svg')),
  'tag-two-tone': React.lazy(async () => await import('@Pimcore/assets/icons/tag-two-tone.inline.svg')),
  workflow: React.lazy(async () => await import('@Pimcore/assets/icons/workflow.inline.svg')),
  'unordered-list-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/unordered-list-outlined.inline.svg')),
  'close-circle-filled': React.lazy(async () => await import('@Pimcore/assets/icons/close-circle-filled.inline.svg')),
  'check-circle-filled': React.lazy(async () => await import('@Pimcore/assets/icons/check-circle-filled.inline.svg')),
  'info-circle-filled': React.lazy(async () => await import('@Pimcore/assets/icons/info-circle-filled.inline.svg')),
  'exclamation-circle-filled': React.lazy(async () => await import('@Pimcore/assets/icons/exclamation-circle-filled.inline.svg')),
  'dots-horizontal': React.lazy(async () => await import('@Pimcore/assets/icons/dots-horizontal.inline.svg')),
  target: React.lazy(async () => await import('@Pimcore/assets/icons/target.inline.svg')),
  'info-circle-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/info-circle-outlined.inline.svg')),
  'left-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/left-outlined.inline.svg')),
  'right-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/right-outlined.inline.svg')),
  'rich-edit': React.lazy(async () => await import('@Pimcore/assets/icons/rich-edit.inline.svg')),
  'download-02': React.lazy(async () => await import('@Pimcore/assets/icons/download-02.inline.svg')),
  'delete-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/delete-outlined.inline.svg')),
  'pin-02': React.lazy(async () => await import('@Pimcore/assets/icons/pin-02.inline.svg')),
  'edit-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/edit-outlined.inline.svg')),
  'expand-alt-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/expand-alt-outlined.inline.svg')),
  'eye-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/eye-outlined.inline.svg')),
  'share-alt-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/share-alt-outlined.inline.svg')),
  translation: React.lazy(async () => await import('@Pimcore/assets/icons/translation.inline.svg')),
  'volume-max': React.lazy(async () => await import('@Pimcore/assets/icons/volume-max.inline.svg')),
  'file-code-01': React.lazy(async () => await import('@Pimcore/assets/icons/file-code-01.inline.svg')),
  'file-question-02': React.lazy(async () => await import('@Pimcore/assets/icons/file-question-02.inline.svg')),
  'file-02': React.lazy(async () => await import('@Pimcore/assets/icons/file-02.inline.svg')),
  'file-check-02': React.lazy(async () => await import('@Pimcore/assets/icons/file-check-02.inline.svg')),
  'file-x-03': React.lazy(async () => await import('@Pimcore/assets/icons/file-x-03.inline.svg')),
  'presentation-chart-01': React.lazy(async () => await import('@Pimcore/assets/icons/presentation-chart-01.inline.svg')),
  'video-recorder': React.lazy(async () => await import('@Pimcore/assets/icons/video-recorder.inline.svg')),
  'image-01': React.lazy(async () => await import('@Pimcore/assets/icons/image-01.inline.svg')),
  'focal-point': React.lazy(async () => await import('@Pimcore/assets/icons/focal-point.inline.svg')),
  'ellipsis-outlined': React.lazy(async () => await import('@Pimcore/assets/icons/ellipsis-outlined.inline.svg')),
  'double-right': React.lazy(async () => await import('@Pimcore/assets/icons/double-right.inline.svg')),
  'double-left': React.lazy(async () => await import('@Pimcore/assets/icons/double-left.inline.svg'))
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

  if (SvgIcon === undefined) {
    return <div style={ { width, height } } />
  }

  return (
    <div
      className={ `pimcore-icon pimcore-icon-${name} anticon ${className}` }
      style={ { width, height } }
    >
      <Suspense fallback={ <div /> }>
        <SvgIcon
          height={ height }
          width={ width }
          { ...options }
        />
      </Suspense>
    </div>
  )
}
