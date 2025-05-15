/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    mapContainer: css`
      max-width: 100%;
      width: 100% !important;
      
      .leaflet-tooltip{
        width: 100px;
        white-space: normal;
      }
      .leaflet-draw-actions-bottom li:nth-child(2) {
        display: none;
      }
      .leaflet-edit-marker-selected {
        border: 0;
        outline: 2px dashed rgba(51, 136, 255, .5);
        margin-left: -12px !important;
        margin-top: -41px !important;
      }
    `
  }
}, { hashPriority: 'low' })
