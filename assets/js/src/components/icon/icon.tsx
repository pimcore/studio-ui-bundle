import React, { Suspense } from 'react'

interface IconProps {
  name: string
  pack?: 'core'
  options?: React.SVGProps<SVGSVGElement>
}

export const Icon = ({ name, pack = 'core', options }: IconProps): React.JSX.Element => {
  const SvgIcon = React.lazy(async () => await import(`@Pimcore/assets/icons/${pack}/${name}.inline.svg`))

  return (
    <div style={{ width: options?.width, height: options?.height }}>
      <Suspense fallback={<div />}>
        <SvgIcon {...options} />
      </Suspense>
    </div>

  )
}
