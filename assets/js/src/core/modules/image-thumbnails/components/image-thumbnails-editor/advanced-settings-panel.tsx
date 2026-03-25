/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from '@Pimcore/components/form/form'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { Switch } from '@Pimcore/components/switch/switch'
import { Panel } from '@Pimcore/components/panel/panel'

export const AdvancedSettingsPanel = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Panel
      border
      collapsed
      collapsible
      contentPadding="extra-small"
      theme="card-with-highlight"
      title={ t('image-thumbnails.editor.advanced') }
    >
      <Form.Item
        label={ t('image-thumbnails.editor.quality') }
        name="quality"
        tooltip={ t('image-thumbnails.editor.quality.tooltip') }
      >
        <InputNumber
          max={ 100 }
          min={ 1 }
          placeholder="85"
        />
      </Form.Item>

      <Form.Item
        label={ t('image-thumbnails.editor.high-resolution') }
        name="highResolution"
        tooltip={ t('image-thumbnails.editor.high-resolution.tooltip') }
      >
        <InputNumber
          max={ 10 }
          min={ 1 }
          step={ 0.1 }
        />
      </Form.Item>

      <Form.Item
        name="preserveColor"
        valuePropName="checked"
      >
        <Switch
          labelRight={ t('image-thumbnails.editor.preserve-color') }
          tooltip={ t('image-thumbnails.editor.preserve-color.tooltip') }
        />
      </Form.Item>

      <Form.Item
        name="forceProcessICCProfiles"
        valuePropName="checked"
      >
        <Switch
          labelRight={ t('image-thumbnails.editor.force-process-icc') }
          tooltip={ t('image-thumbnails.editor.force-process-icc.tooltip') }
        />
      </Form.Item>

      <Form.Item
        name="preserveMetaData"
        valuePropName="checked"
      >
        <Switch
          labelRight={ t('image-thumbnails.editor.preserve-metadata') }
          tooltip={ t('image-thumbnails.editor.preserve-metadata.tooltip') }
        />
      </Form.Item>

      <Form.Item
        name="rasterizeSVG"
        valuePropName="checked"
      >
        <Switch
          labelRight={ t('image-thumbnails.editor.rasterize-svg') }
          tooltip={ t('image-thumbnails.editor.rasterize-svg.tooltip') }
        />
      </Form.Item>

      <Form.Item
        name="useCropBox"
        valuePropName="checked"
      >
        <Switch
          labelRight={ t('image-thumbnails.editor.use-cropbox') }
          tooltip={ t('image-thumbnails.editor.use-cropbox.tooltip') }
        />
      </Form.Item>

      <Form.Item
        name="preserveAnimation"
        valuePropName="checked"
      >
        <Switch
          labelRight={ t('image-thumbnails.editor.preserve-animation') }
          tooltip={ t('image-thumbnails.editor.preserve-animation.tooltip') }
        />
      </Form.Item>

      <Form.Item
        name="downloadable"
        valuePropName="checked"
      >
        <Switch
          labelRight={ t('image-thumbnails.editor.downloadable') }
          tooltip={ t('image-thumbnails.editor.downloadable.tooltip') }
        />
      </Form.Item>
    </Panel>
  )
}
