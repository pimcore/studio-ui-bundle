/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/
import { type ProgressProps } from 'antd';
import React from 'react';
interface IProgressProps extends ProgressProps {
    description: string;
    descriptionAction?: React.ReactNode;
    progressStatus: string;
}
export declare const Progressbar: (props: IProgressProps) => React.JSX.Element;
export {};
//# sourceMappingURL=progressbar.d.ts.map