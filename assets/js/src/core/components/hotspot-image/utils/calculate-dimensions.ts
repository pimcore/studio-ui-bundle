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

export const percentToPixel = (percent: number, dimension: number): number => {
  return (dimension * percent) / 100
}

export const pixelToPercent = (pixel: number, dimension: number): number => {
  return (pixel * 100) / dimension
}
