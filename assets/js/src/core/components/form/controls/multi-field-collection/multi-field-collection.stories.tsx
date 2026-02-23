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
import React, { useState } from 'react'
import { MultiFieldCollection } from './multi-field-collection'
import { transformationDynamicTypeRegistry, initializeTransformationTypes } from '@Pimcore/modules/image-thumbnails/dynamic-types/transformation-dynamic-type-registry'
import { Form } from '../../form'
import { Content } from '../../../content/content'

const config: Meta<typeof MultiFieldCollection> = {
  title: 'Components/Data Entry/Form/Controls/MultiFieldCollection',
  component: MultiFieldCollection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `The MultiFieldCollection component provides a reusable way to create dynamic collections using any registry that implements the DynamicTypeRegistryAbstract pattern. This component combines the best aspects of field collection functionality with enhanced transformation toolstrip features.

**Key Features:**
- **Registry-based**: Works with any DynamicTypeRegistryAbstract implementation
- **Enhanced toolstrip**: Uses the transformation toolstrip pattern with professional icons and enhanced form handling
- **Field rendering**: Automatically renders field configurations using the existing field rendering system
- **Form integration**: Built on top of Form.NumberedList for seamless form integration
- **Configurable controls**: Support for disabling reordering, add/remove actions, and setting maximum items
- **Enhanced form height handling**: Includes ConfigProvider solution for proper Ant Design form heights

**Registry Compatibility:**
The component can work with any registry that extends DynamicTypeRegistryAbstract and provides getFieldConfig() methods for field rendering.

**Current Implementation:**
This example uses the transformation registry from the image thumbnails system to demonstrate the component's capabilities with real field configurations.`
      }
    }
  },
  tags: ['autodocs']
}

export default config
type Story = StoryObj<typeof config>

interface MultiFieldCollectionExampleProps {
  disallowReorder?: boolean
  disallowAddRemove?: boolean
  maxItems?: number
  initialValue?: any[]
}

const MultiFieldCollectionExample = ({
  disallowReorder = false,
  disallowAddRemove = false,
  maxItems,
  initialValue = []
}: MultiFieldCollectionExampleProps): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState({ multiFieldCollection: initialValue })
  
  // Initialize the transformation types
  React.useEffect(() => {
    initializeTransformationTypes()
  }, [])

  const handleFormSubmit = (values: any): void => {
    console.log('Form submitted with values:', values)
  }

  const handleValuesChange = (changedValues: any, allValues: any): void => {
    console.log('Multi field collection changed:', allValues.multiFieldCollection)
    setFormValues(allValues as { multiFieldCollection: any[] })
  }

  return (
    <Content padded>
      <Form
        form={form}
        initialValues={formValues}
        layout="vertical"
        onFinish={handleFormSubmit}
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          name="multiFieldCollection"
        >
          <MultiFieldCollection
            disallowAddRemove={disallowAddRemove}
            disallowReorder={disallowReorder}
            maxItems={maxItems}
            registry={transformationDynamicTypeRegistry}
            title="Image Transformations"
          />
        </Form.Item>

        <div style={{ marginTop: '24px' }}>
          <h4>Current Collection Value:</h4>
          <pre style={{
            backgroundColor: '#f5f5f5',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '12px',
            overflow: 'auto',
            maxHeight: '300px'
          }}>
            {JSON.stringify(formValues.multiFieldCollection ?? [], null, 2)}
          </pre>
        </div>
      </Form>
    </Content>
  )
}

export const Default: Story = {
  render: () => <MultiFieldCollectionExample />,
  parameters: {
    docs: {
      description: {
        story: 'Basic multi field collection using the transformation registry. Users can add different types of image transformations, configure their settings, reorder them, and remove them as needed.'
      }
    }
  }
}

export const WithInitialData: Story = {
  render: () => (
    <MultiFieldCollectionExample
      initialValue={[
        {
          type: 'resize',
          width: 800,
          height: 600,
          forceResize: false
        },
        {
          type: 'crop',
          width: 400,
          height: 300,
          x: 0,
          y: 0
        },
        {
          type: 'quality',
          quality: 85
        }
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multi field collection with pre-populated transformation data showing different transformation types with their configured values.'
      }
    }
  }
}

export const DisallowReorder: Story = {
  render: () => (
    <MultiFieldCollectionExample
      disallowReorder
      initialValue={[
        {
          type: 'resize',
          width: 1200,
          height: 800,
          forceResize: true
        },
        {
          type: 'quality',
          quality: 90
        }
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multi field collection with reordering disabled. Items can still be added and removed, but their order is fixed. The up/down arrows will not be shown in the toolstrip.'
      }
    }
  }
}

export const DisallowAddRemove: Story = {
  render: () => (
    <MultiFieldCollectionExample
      disallowAddRemove
      initialValue={[
        {
          type: 'resize',
          width: 800,
          height: 600,
          forceResize: false
        },
        {
          type: 'crop',
          width: 300,
          height: 300,
          x: 50,
          y: 50
        },
        {
          type: 'rotate',
          angle: 90
        }
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multi field collection with adding and removing disabled. Items can only be edited and reordered (if reordering is allowed). The trash icon and add dropdown will not be shown.'
      }
    }
  }
}

export const WithMaxItems: Story = {
  render: () => (
    <MultiFieldCollectionExample
      initialValue={[
        {
          type: 'resize',
          width: 800,
          height: 600,
          forceResize: false
        },
        {
          type: 'quality',
          quality: 85
        }
      ]}
      maxItems={3}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multi field collection with a maximum limit of 3 items. Once the limit is reached, the add dropdown button will be disabled and hidden.'
      }
    }
  }
}

export const FullyRestricted: Story = {
  render: () => (
    <MultiFieldCollectionExample
      disallowAddRemove
      disallowReorder
      initialValue={[
        {
          type: 'resize',
          width: 1024,
          height: 768,
          forceResize: true
        },
        {
          type: 'crop',
          width: 500,
          height: 500,
          x: 100,
          y: 100
        },
        {
          type: 'quality',
          quality: 95
        }
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multi field collection with all restrictions enabled. Items can only be edited in-place, making this effectively a read-only structure with editable field content.'
      }
    }
  }
}

export const ComplexTransformations: Story = {
  render: () => (
    <MultiFieldCollectionExample
      initialValue={[
        {
          type: 'resize',
          width: 1200,
          height: 800,
          forceResize: false
        },
        {
          type: 'crop',
          width: 800,
          height: 600,
          x: 200,
          y: 100
        },
        {
          type: 'rotate',
          angle: 45
        },
        {
          type: 'quality',
          quality: 90
        },
        {
          type: 'grayscale'
        },
        {
          type: 'blur',
          sigma: 2
        }
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of complex image transformations showing various transformation types with different field configurations. This demonstrates how the component handles different field types (numbers, booleans, selects) automatically based on the registry configuration.'
      }
    }
  }
}

export const EmptyState: Story = {
  render: () => <MultiFieldCollectionExample />,
  parameters: {
    docs: {
      description: {
        story: 'Multi field collection in its empty state, showing the title with add control and helpful empty state message.'
      }
    }
  }
}