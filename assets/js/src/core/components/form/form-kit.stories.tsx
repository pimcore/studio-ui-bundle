/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta, type StoryObj } from '@storybook/react/*'
import { FormKit } from './form-kit'
import { ConfigLayout } from '../predefined-layouts/config/config-layout'
import React, { useState } from 'react'
import { Form } from './form'
import { Input } from '../input/input'
import { ContentLayout } from '../content-layout/content-layout'
import { Content } from '../content/content'
import { Toolbar } from '../toolbar/toolbar'
import { Button } from '../button/button'
import { Icon } from '../icon/icon'
import { TreeElement, type TreeDataItem } from '../tree-element/tree-element'
import { Select } from '../select/select'
import { TextArea } from '../textarea/textarea'
import { Switch } from '../switch/switch'
import { IconButton } from '../icon-button/icon-button'

const config: Meta<typeof FormKit> = {
  title: 'Components/Data Entry/Form/Examples',
  component: FormKit,
  tags: ['autodocs']
}

// Form data interface
interface FormData {
  title: string
  description: string
  status: string
  featured: boolean
  metaTitle: string
  metaDescription: string
  keywords: string
  canonicalUrl: string
  template: string
  cacheLifetime: string
  customClasses: string
  hideInNavigation: boolean
}

// Sample tree data for the left panel
const treeData: TreeDataItem[] = [
  {
    title: 'Documents',
    key: '0',
    icon: <Icon value="document" />,
    children: [
      {
        title: 'Homepage',
        key: '0-0',
        icon: <Icon value="page" />
      },
      {
        title: 'Products',
        key: '0-1',
        icon: <Icon value="folder" />,
        children: [
          {
            title: 'Product A',
            key: '0-1-0',
            icon: <Icon value="page" />
          },
          {
            title: 'Product B',
            key: '0-1-1',
            icon: <Icon value="page" />
          }
        ]
      },
      {
        title: 'News',
        key: '0-2',
        icon: <Icon value="folder" />,
        children: [
          {
            title: 'Latest Updates',
            key: '0-2-0',
            icon: <Icon value="page" />
          }
        ]
      }
    ]
  }
]

const LeftItem = (): React.JSX.Element => {
  return (
    <ContentLayout
      renderToolbar={ (
        <Toolbar justify="flex-end">
          <IconButton
            icon={ { value: 'refresh' } }
            title="Refresh"
          />
        </Toolbar>
      ) }
    >
      <Content padded>
        <TreeElement
          defaultExpandedKeys={ ['0', '0-1'] }
          onSelected={ (key) => { console.log('Selected:', key) } }
          treeData={ treeData }
          withCustomSwitcherIcon
        />
      </Content>
    </ContentLayout>
  )
}

const GeneralTab = ({ formData, setFormData }: { formData: FormData, setFormData: (data: FormData) => void }): React.JSX.Element => (
  <FormKit.Panel>
    <Form.Item
      label="Title"
      required
    >
      <Input
        onChange={ (e) => { setFormData({ ...formData, title: e.target.value }) } }
        placeholder="Enter page title..."
        value={ formData.title }
      />
    </Form.Item>

    <Form.Item label="Description">
      <TextArea
        onChange={ (e) => { setFormData({ ...formData, description: e.target.value }) } }
        placeholder="Enter page description..."
        rows={ 3 }
        value={ formData.description }
      />
    </Form.Item>

    <Form.Item label="Status">
      <Select
        onChange={ (value) => { setFormData({ ...formData, status: value }) } }
        options={ [
          { value: 'published', label: 'Published' },
          { value: 'draft', label: 'Draft' },
          { value: 'archived', label: 'Archived' }
        ] }
        placeholder="Select status"
        style={ { width: 200 } }
        value={ formData.status }
      />
    </Form.Item>

    <Form.Item label="Featured">
      <Switch
        checked={ formData.featured }
        labelRight="Mark as featured content"
        onChange={ (checked) => { setFormData({ ...formData, featured: checked }) } }
      />
    </Form.Item>
  </FormKit.Panel>
)

const SEOTab = ({ formData, setFormData }: { formData: FormData, setFormData: (data: FormData) => void }): React.JSX.Element => (
  <FormKit.Panel>
    <Form.Item label="Meta Title">
      <Input
        onChange={ (e) => { setFormData({ ...formData, metaTitle: e.target.value }) } }
        placeholder="SEO title for search engines..."
        value={ formData.metaTitle }
      />
    </Form.Item>

    <Form.Item label="Meta Description">
      <TextArea
        onChange={ (e) => { setFormData({ ...formData, metaDescription: e.target.value }) } }
        placeholder="SEO description for search engines..."
        rows={ 2 }
        value={ formData.metaDescription }
      />
    </Form.Item>

    <Form.Item label="Keywords">
      <Input
        onChange={ (e) => { setFormData({ ...formData, keywords: e.target.value }) } }
        placeholder="Comma-separated keywords..."
        value={ formData.keywords }
      />
    </Form.Item>

    <Form.Item label="Canonical URL">
      <Input
        onChange={ (e) => { setFormData({ ...formData, canonicalUrl: e.target.value }) } }
        placeholder="https://example.com/canonical-url"
        value={ formData.canonicalUrl }
      />
    </Form.Item>
  </FormKit.Panel>
)

const AdvancedTab = ({ formData, setFormData }: { formData: FormData, setFormData: (data: FormData) => void }): React.JSX.Element => (
  <FormKit.Panel>
    <Form.Item label="Template">
      <Select
        onChange={ (value) => { setFormData({ ...formData, template: value }) } }
        options={ [
          { value: 'default', label: 'Default Template' },
          { value: 'landing', label: 'Landing Page' },
          { value: 'article', label: 'Article Template' }
        ] }
        placeholder="Select template"
        style={ { width: 250 } }
        value={ formData.template }
      />
    </Form.Item>

    <Form.Item label="Cache Lifetime (seconds)">
      <Input
        onChange={ (e) => { setFormData({ ...formData, cacheLifetime: e.target.value }) } }
        placeholder="3600"
        type="number"
        value={ formData.cacheLifetime }
      />
    </Form.Item>

    <Form.Item label="Custom CSS Classes">
      <Input
        onChange={ (e) => { setFormData({ ...formData, customClasses: e.target.value }) } }
        placeholder="custom-class another-class"
        value={ formData.customClasses }
      />
    </Form.Item>

    <Form.Item label="Hide in Navigation">
      <Switch
        checked={ formData.hideInNavigation }
        onChange={ (checked) => { setFormData({ ...formData, hideInNavigation: checked }) } }
      />
    </Form.Item>
  </FormKit.Panel>
)

const RightItem = (): React.JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    status: '',
    featured: false,
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    canonicalUrl: '',
    template: '',
    cacheLifetime: '',
    customClasses: '',
    hideInNavigation: false
  })

  const handleSave = (): void => {
    console.log('📝 Form Values:', formData)
    console.table(formData)
  }

  const handlePreview = (): void => {
    console.log('👁️ Preview with current data:', formData)
  }

  return (
    <ContentLayout
      renderToolbar={ (
        <Toolbar justify="space-between">
          <IconButton
            icon={ { value: 'refresh' } }
            title="Refresh"
          />
          <div>
            <Button
              onClick={ handlePreview }
              style={ { marginRight: 8 } }
              type="default"
            >Preview</Button>
            <Button
              onClick={ handleSave }
              type="primary"
            >Save</Button>
          </div>
        </Toolbar>
      ) }
    >
      <Content
        padded
        padding={ { x: 'small', y: 'none' } }
      >
        <FormKit>
          <FormKit.TabPanel
            hasStickyHeader
            items={ [
              {
                key: 'general',
                label: 'General',
                icon: <Icon value="edit" />,
                children: <GeneralTab
                  formData={ formData }
                  setFormData={ setFormData }
                          />
              },
              {
                key: 'seo',
                label: 'SEO',
                icon: <Icon value="search" />,
                children: <SEOTab
                  formData={ formData }
                  setFormData={ setFormData }
                          />
              },
              {
                key: 'advanced',
                label: 'Advanced',
                icon: <Icon value="settings" />,
                children: <AdvancedTab
                  formData={ formData }
                  setFormData={ setFormData }
                          />
              }
            ] }
            size="middle"
          />
        </FormKit>
      </Content>
    </ContentLayout>
  )
}

const Example = (): React.JSX.Element => (
  <ContentLayout>
    <ConfigLayout
      leftItem={ {
        children: <LeftItem />
      } }

      rightItem={ {
        children: <RightItem />
      } }
    />
  </ContentLayout>
)

export default config
type Story = StoryObj<typeof config>

export const _default: Story = {
  render: () => <Example />,
  parameters: {
    layout: 'fullscreen'
  }
}
