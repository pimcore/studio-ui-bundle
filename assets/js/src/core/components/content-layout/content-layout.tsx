/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { memo } from 'react'
import { PageLayout, type PageLayoutContentProps } from '../page-layout/page-layout'

interface ContentToolbarViewProps extends Omit<PageLayoutContentProps, 'variant'> {}

const Component = (props: ContentToolbarViewProps): React.JSX.Element => (
  <PageLayout
    { ...props }
    variant="content"
  />
)

/**
 * @deprecated Use `PageLayout` with `variant="content"` instead; the props are the same.
 * This alias is kept for backward compatibility and will be removed in the next major version.
 */
export const ContentLayout = memo(Component)
