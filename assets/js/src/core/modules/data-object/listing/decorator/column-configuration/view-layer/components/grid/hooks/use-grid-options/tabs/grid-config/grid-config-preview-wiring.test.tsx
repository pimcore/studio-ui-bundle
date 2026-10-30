/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import fs from 'fs'
import path from 'path'

// Guards the preview-mode wiring against an upstream sync (DR-U3) silently dropping it.
const read = (file: string): string => fs.readFileSync(path.join(__dirname, file), 'utf8')

const translationsDir = path.resolve(__dirname, '../../../../../../../../../../../../../../../../translations')
const previewKeys = ['preview-mode.switch', 'preview-mode.preview-item', 'preview-mode.no-item', 'preview-mode.preview']

describe('AC1: preview mode stays wired into the Grid Configuration modal', () => {
  it('AC1: the modal wraps its content in the preview-mode provider', () => {
    const modal = read('grid-config-modal.tsx')
    expect(modal).toContain('<PreviewModeProvider')
  })

  it('AC1: the modal renders the preview switch and bar in its toolbar', () => {
    const modal = read('grid-config-modal.tsx')
    expect(modal).toContain('<PreviewModeSwitch />')
    expect(modal).toContain('<PreviewModeBar')
    expect(modal).toContain('<PreviewModeToolbarContent />')
  })

  it('AC1: the column list renders preview rows for simple columns and keeps the upstream expand props', () => {
    const list = read('grid-config-list.tsx')
    expect(list).toContain('<SimpleColumnPreview column={ column } />')
    expect(list).toContain('<SimpleColumnPreviewsProvider')
    expect(list).toMatch(/\[columns, advancedColumnTemplate, sourceFieldTypes, previewEnabled, onExpandPipelineItem, focusedPipelineItem\]/)
  })

  it('AC1: the advanced column form shows the preview tab while preview mode is on', () => {
    const form = read('forms/advanced-column-form/advanced-column-form.tsx')
    expect(form).toContain('<ColumnPreview>')
    expect(form).toContain('showPreview && previewModeEnabled')
  })

  it('AC1: every translation file keeps the preview-mode keys', () => {
    const files = fs.readdirSync(translationsDir).filter((f) => /^studio\..+\.yaml$/.test(f))
    expect(files.length).toBeGreaterThan(0)
    for (const file of files) {
      const content = fs.readFileSync(path.join(translationsDir, file), 'utf8')
      for (const key of previewKeys) {
        expect(`${file}: ${content.includes(`\n${key}:`)}`).toBe(`${file}: true`)
      }
      expect(content).not.toMatch(/^(<<<<<<<|=======|>>>>>>>)/m)
    }
  })
})
