/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Region } from '@Pimcore/components/region/region'
import { Panel } from '@Pimcore/components/panel/panel'
import { FormKit } from '../../form-kit'
import { Input } from '@Pimcore/components/input/input'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Select } from '@Pimcore/components/select/select'
import { Switch } from '@Pimcore/components/switch/switch'
import { Button } from '@Pimcore/components/button/button'
import { Space } from '@Pimcore/components/space/space'
import { useCssContainer } from '@Pimcore/utils/hooks/use-css-container/use-css-container'
import { cssContainerWidget } from '@Pimcore/modules/widget-manager/widget/widget-view'

// Container wrapper to provide CSS container context for Region responsive behavior
const FormLayoutContainer = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const { styleDefinition } = useCssContainer(cssContainerWidget)
  
  return (
    <div className={styleDefinition.styles.container} style={{ width: '100%' }}>
      {children}
    </div>
  )
}

const meta: Meta<typeof Region> = {
  title: 'Components/Data Entry/Form/Layouts/Region',
  component: Region,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Use Region as the layout container to organize multiple Panel components in complex form layouts. Region handles positioning while Panel provides content structure.'
      }
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

// Two-Column Form Layout
const TwoColumnFormComponent = (): React.JSX.Element => {
  const [form] = FormKit.useForm()

  return (
    <FormLayoutContainer>
      <div style={{ maxWidth: '1000px' }}>
        <FormKit formProps={{ form, layout: "vertical" }}>
          <Region
            layoutDefinition={[
              'left right'
            ]}
            items={[
              {
                region: 'left',
                component: (
                  <Panel title="Personal Information" theme="card-with-highlight">
                    <FormKit.Item label="First Name" name="firstName">
                      <Input placeholder="Enter first name" />
                    </FormKit.Item>
                    
                    <FormKit.Item label="Last Name" name="lastName">
                      <Input placeholder="Enter last name" />
                    </FormKit.Item>
                    
                    <FormKit.Item label="Email" name="email">
                      <Input placeholder="Enter email address" />
                    </FormKit.Item>
                    
                    <FormKit.Item label="Phone" name="phone">
                      <Input placeholder="Enter phone number" />
                    </FormKit.Item>
                  </Panel>
                )
              },
              {
                region: 'right',
                component: (
                  <Panel title="Address Information" theme="card-with-highlight">
                    <FormKit.Item label="Street Address" name="address">
                      <TextArea rows={2} placeholder="Enter street address" />
                    </FormKit.Item>
                    
                    <FormKit.Item label="City" name="city">
                      <Input placeholder="Enter city" />
                    </FormKit.Item>
                    
                    <FormKit.Item label="Postal Code" name="postalCode">
                      <Input placeholder="Enter postal code" />
                    </FormKit.Item>
                    
                    <FormKit.Item label="Country" name="country">
                      <Select
                        placeholder="Select country"
                        options={[
                          { value: 'us', label: 'United States' },
                          { value: 'de', label: 'Germany' },
                          { value: 'uk', label: 'United Kingdom' },
                          { value: 'fr', label: 'France' }
                        ]}
                      />
                    </FormKit.Item>
                  </Panel>
                )
              }
            ]}
          />
          
          <FormKit.Item style={{ marginTop: '24px' }}>
            <Button type="primary" htmlType="submit">
              Save Information
            </Button>
          </FormKit.Item>
        </FormKit>
      </div>
    </FormLayoutContainer>
  )
}

export const TwoColumnForm: Story = {
  render: () => <TwoColumnFormComponent />
}

// Three-Section Layout
const ThreeSectionFormComponent = (): React.JSX.Element => {
  const [form] = FormKit.useForm()

  return (
    <FormLayoutContainer>
      <div style={{ maxWidth: '1200px' }}>
        <FormKit formProps={{ form, layout: "vertical" }}>
          <Region
            layoutDefinition={[
              'header header header',
              'main sidebar sidebar'
            ]}
            items={[
              {
                region: 'header',
                component: (
                  <Panel title="Basic Information" theme="fieldset" border>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                      <FormKit.Item label="Title" name="title">
                        <Select
                          placeholder="Select title"
                          options={[
                            { value: 'mr', label: 'Mr.' },
                            { value: 'mrs', label: 'Mrs.' },
                            { value: 'ms', label: 'Ms.' },
                            { value: 'dr', label: 'Dr.' }
                          ]}
                        />
                      </FormKit.Item>
                      
                      <FormKit.Item label="First Name" name="firstName">
                        <Input placeholder="Enter first name" />
                      </FormKit.Item>
                      
                      <FormKit.Item label="Last Name" name="lastName">
                        <Input placeholder="Enter last name" />
                      </FormKit.Item>
                    </div>
                  </Panel>
                )
              },
              {
                region: 'main',
                component: (
                  <Panel title="Contact Details" theme="card-with-highlight">
                    <FormKit.Item label="Email Address" name="email">
                      <Input placeholder="Enter email address" />
                    </FormKit.Item>
                    
                    <FormKit.Item label="Phone Number" name="phone">
                      <Input placeholder="Enter phone number" />
                    </FormKit.Item>
                    
                    <FormKit.Item label="Company" name="company">
                      <Input placeholder="Enter company name" />
                    </FormKit.Item>
                    
                    <FormKit.Item label="Job Title" name="jobTitle">
                      <Input placeholder="Enter job title" />
                    </FormKit.Item>
                    
                    <FormKit.Item label="Bio" name="bio">
                      <TextArea rows={4} placeholder="Tell us about yourself..." />
                    </FormKit.Item>
                  </Panel>
                )
              },
              {
                region: 'sidebar',
                component: (
                  <Panel title="Preferences" theme="card-with-highlight" collapsible>
                    <FormKit.Item label="Preferred Language" name="language">
                      <Select
                        placeholder="Select language"
                        options={[
                          { value: 'en', label: 'English' },
                          { value: 'de', label: 'German' },
                          { value: 'fr', label: 'French' },
                          { value: 'es', label: 'Spanish' }
                        ]}
                      />
                    </FormKit.Item>
                    
                    <FormKit.Item label="Newsletter" name="newsletter" valuePropName="checked">
                      <Switch />
                    </FormKit.Item>
                    
                    <FormKit.Item label="Marketing Emails" name="marketing" valuePropName="checked">
                      <Switch />
                    </FormKit.Item>
                    
                    <FormKit.Item label="SMS Notifications" name="sms" valuePropName="checked">
                      <Switch />
                    </FormKit.Item>
                  </Panel>
                )
              }
            ]}
          />
          
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
            <Button htmlType="reset">Reset Form</Button>
            <Space>
              <Button>Save as Draft</Button>
              <Button type="primary" htmlType="submit">
                Submit Application
              </Button>
            </Space>
          </div>
        </FormKit>
      </div>
    </FormLayoutContainer>
  )
}

export const ThreeSectionForm: Story = {
  render: () => <ThreeSectionFormComponent />
}

// Sidebar Layout
const SidebarFormComponent = (): React.JSX.Element => {
  const [form] = FormKit.useForm()

  return (
    <FormLayoutContainer>
      <div style={{ maxWidth: '1000px' }}>
        <FormKit formProps={{ form, layout: "vertical" }}>
          <Region
            layoutDefinition={[
              'content sidebar'
            ]}
            items={[
              {
                region: 'content',
                maxWidth: '600px',
                component: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Panel title="Project Details" theme="card-with-highlight">
                    <FormKit.Item label="Project Name" name="projectName">
                      <Input placeholder="Enter project name" />
                    </FormKit.Item>
                    
                    <FormKit.Item label="Description" name="description">
                      <TextArea rows={4} placeholder="Describe your project..." />
                    </FormKit.Item>
                    
                    <FormKit.Item label="Budget" name="budget">
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="Enter budget"
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '') ?? ''}
                      />
                    </FormKit.Item>
                  </Panel>
                  
                  <Panel title="Timeline" theme="card-with-highlight">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <FormKit.Item label="Start Date" name="startDate">
                        <Input placeholder="Select start date" />
                      </FormKit.Item>
                      
                      <FormKit.Item label="End Date" name="endDate">
                        <Input placeholder="Select end date" />
                      </FormKit.Item>
                    </div>
                    
                    <FormKit.Item label="Priority" name="priority">
                      <Select
                        placeholder="Select priority"
                        options={[
                          { value: 'low', label: 'Low' },
                          { value: 'medium', label: 'Medium' },
                          { value: 'high', label: 'High' },
                          { value: 'urgent', label: 'Urgent' }
                        ]}
                      />
                    </FormKit.Item>
                  </Panel>
                </div>
              )
            },
            {
              region: 'sidebar',
              maxWidth: '300px',
              component: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Panel title="Settings" theme="fieldset" border>
                    <FormKit.Item label="Public Project" name="isPublic" valuePropName="checked">
                      <Switch />
                    </FormKit.Item>
                    
                    <FormKit.Item label="Allow Comments" name="allowComments" valuePropName="checked">
                      <Switch />
                    </FormKit.Item>
                    
                    <FormKit.Item label="Send Updates" name="sendUpdates" valuePropName="checked">
                      <Switch />
                    </FormKit.Item>
                  </Panel>
                  
                  <Panel title="Team" theme="fieldset" border collapsible collapsed>
                    <FormKit.Item label="Team Lead" name="teamLead">
                      <Select
                        placeholder="Select team lead"
                        options={[
                          { value: 'john', label: 'John Doe' },
                          { value: 'jane', label: 'Jane Smith' },
                          { value: 'bob', label: 'Bob Johnson' }
                        ]}
                      />
                    </FormKit.Item>
                    
                    <FormKit.Item label="Team Size" name="teamSize">
                      <InputNumber min={1} max={50} style={{ width: '100%' }} placeholder="5" />
                    </FormKit.Item>
                  </Panel>
                </div>
              )
            }
          ]}
        />
        
        <div style={{ marginTop: '24px' }}>
          <Button type="primary" htmlType="submit">
            Create Project
          </Button>
        </div>
      </FormKit>
    </div>
  </FormLayoutContainer>
  )
}

export const SidebarForm: Story = {
  render: () => <SidebarFormComponent />
}
