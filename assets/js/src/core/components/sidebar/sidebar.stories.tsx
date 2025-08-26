/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta } from '@storybook/react'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { SidebarProvider, ProvidedSidebar, useSidebar } from '@Pimcore/components/sidebar'
import { Icon } from '@Pimcore/components/icon/icon'
import { Button } from 'antd'
import React from 'react'
import { WithInlineHelp } from '@Pimcore/components/sidebar/inline-help/with-inline-help'
import { InlineHelpTrigger } from '@Pimcore/components/sidebar/inline-help/inline-help-trigger'
import { InlineHelpContent } from '@Pimcore/components/sidebar/inline-help/inline-help-content'
import { useInlineHelpHelper } from '@Pimcore/components/sidebar/inline-help/use-inline-help-helper'

const config: Meta = {
  title: 'Components/Layout/Sidebar',
  component: (args) => {
    return (
      <div style={ { display: 'flex', height: '50vh' } }>
        <Sidebar
          buttons={ args.buttons }
          entries={ args.entries }
          highlights={ args.highlights }
          sizing={ args.sizing }
        />
      </div>
    )
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Sidebar component provides a collapsible side navigation with tabs and buttons. 
It can be used in two ways:

1. **Direct Props Usage** - Pass entries, buttons, sizing, and highlights as props
2. **Provider Pattern** - Use \`SidebarProvider\` with \`ProvidedSidebar\` and \`useSidebar\` hook for dynamic control

## Features
- Collapsible tabs with custom content
- Highlight states for tabs
- Custom buttons at the bottom
- Two sizes: default (250px) and large (432px)
- Provider pattern for dynamic state management
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    entries: {
      table: {
        disable: true
      }
    },
    buttons: {
      table: {
        disable: true
      }
    },
    sizing: {
      control: { type: 'select' },
      options: ['default', 'large'],
      description: 'Sidebar width: default (250px) or large (432px)'
    },
    highlights: {
      description: 'Array of entry keys to highlight'
    }
  }
}

export default config

// Demo components for stories
const FocalPointDemoButton = ({ initialActive = false }: { initialActive?: boolean }): React.JSX.Element => {
  const [isActive, setIsActive] = React.useState(initialActive)

  return (
    <div
      aria-label={ 'focal-point' }
      className={ [
        'button',
        isActive ? 'button--highlighted' : ''
      ].join(' ') }
      key={ 'focal-point-demo' }
      onClick={ () => { setIsActive(!isActive) } }
      onKeyDown={ () => { setIsActive(!isActive) } }
      role={ 'button' }
      tabIndex={ 0 }
    >
      <Icon
        options={ { width: '16px', height: '16px' } }
        value={ 'focal-point' }
      />
    </div>
  )
}

const SidebarControlsDemo = (): React.JSX.Element => {
  const { 
    addEntry, 
    removeEntry, 
    toggleHighlight, 
    openTab, 
    closeTab, 
    setSizing,
    entries,
    activeTab,
    highlights,
    sizing
  } = useSidebar()

  const handleAddEntry = (): void => {
    const newEntry = {
      key: `entry-${entries.length + 1}`,
      icon: <Icon value="pimcore" options={{ width: '16px', height: '16px' }} />,
      component: <div style={{ padding: '16px' }}>New Entry {entries.length + 1}</div>,
      tooltip: `Entry ${entries.length + 1}`
    }
    addEntry(newEntry)
  }

  const handleRemoveLastEntry = (): void => {
    if (entries.length > 0) {
      removeEntry(entries[entries.length - 1].key)
    }
  }

  const handleToggleHighlight = (): void => {
    if (entries.length > 0) {
      toggleHighlight(entries[0].key)
    }
  }

  const handleOpenFirstTab = (): void => {
    if (entries.length > 0) {
      openTab(entries[0].key)
    }
  }

  return (
    <div style={{ padding: '16px', borderRight: '1px solid #d9d9d9', width: '220px' }}>
      <h4 style={{ margin: '0 0 16px 0' }}>Sidebar Controls</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Button
          onClick={handleAddEntry}
          size="small"
          type="primary"
        >
          Add Entry
        </Button>
        
        <Button
          onClick={handleRemoveLastEntry}
          size="small"
          disabled={entries.length === 0}
          danger
        >
          Remove Last Entry
        </Button>
        
        <Button
          onClick={handleToggleHighlight}
          size="small"
          disabled={entries.length === 0}
        >
          Toggle Highlight
        </Button>
        
        <Button
          onClick={handleOpenFirstTab}
          size="small"
          disabled={entries.length === 0}
        >
          Open First Tab
        </Button>
        
        <Button
          onClick={closeTab}
          size="small"
          disabled={!activeTab}
        >
          Close Tab
        </Button>
        
        <Button
          onClick={() => setSizing(sizing === 'default' ? 'large' : 'default')}
          size="small"
        >
          Toggle Size ({sizing})
        </Button>
      </div>
      
      <div style={{ marginTop: '16px', fontSize: '11px', color: '#666' }}>
        <div>Active Tab: {activeTab || 'None'}</div>
        <div>Highlights: {highlights.length > 0 ? highlights.join(', ') : 'None'}</div>
        <div>Entries: {entries.length}</div>
      </div>
    </div>
  )
}

// Simple content components
const DetailsContent = (): React.JSX.Element => (
  <div style={{ padding: '16px' }}>
    <h4>Details</h4>
    <p>Asset information and metadata</p>
  </div>
)

const PropertiesContent = (): React.JSX.Element => (
  <div style={{ padding: '16px' }}>
    <h4>Properties</h4>
    <p>Configure asset properties</p>
  </div>
)

const VersionsContent = (): React.JSX.Element => (
  <div style={{ padding: '16px' }}>
    <h4>Versions</h4>
    <p>View version history</p>
  </div>
)

const demoData = {
  entries: [
    {
      key: 'details',
      icon: <Icon options={{ width: '16px', height: '16px' }} value="details" />,
      component: <DetailsContent />,
      tooltip: 'Details'
    }
  ],
  buttons: [
    {
      key: 'focal-point',
      icon: <Icon options={{ width: '16px', height: '16px' }} value="focal-point" />,
      component: <FocalPointDemoButton />
    }
  ]
}

export const _default = {
  args: {
    ...demoData
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic sidebar with one tab. Click the details icon to expand the sidebar.'
      }
    }
  }
}

export const HighlightedEntries = {
  args: {
    ...demoData,
    highlights: ['details']
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with highlighted entry. The details tab shows a highlight outline.'
      }
    }
  }
}

export const LargeSizing = {
  args: {
    ...demoData,
    sizing: 'large'
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with large sizing (432px width vs default 250px).'
      }
    }
  }
}

export const MultipleEntries = {
  args: {
    entries: [
      ...demoData.entries,
      {
        key: 'properties',
        icon: <Icon value="properties" options={{ width: '16px', height: '16px' }} />,
        component: <PropertiesContent />,
        tooltip: 'Properties'
      },
      {
        key: 'versions',
        icon: <Icon value="versions" options={{ width: '16px', height: '16px' }} />,
        component: <VersionsContent />,
        tooltip: 'Versions'
      }
    ],
    buttons: demoData.buttons
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with multiple tabs showing different content types.'
      }
    }
  }
}

export const ProviderPattern = {
  render: () => (
    <SidebarProvider
      initialEntries={[
        {
          key: 'details',
          icon: <Icon value="details" options={{ width: '16px', height: '16px' }} />,
          component: <DetailsContent />,
          tooltip: 'Details'
        }
      ]}
      initialButtons={demoData.buttons}
    >
      <div style={{ display: 'flex', height: '400px' }}>
        <SidebarControlsDemo />
        <ProvidedSidebar />
      </div>
    </SidebarProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: `
**Provider Pattern Demo**

Use the control buttons to:
- Add/remove entries dynamically
- Open/close tabs
- Toggle sidebar size

The \`useSidebar\` hook provides full control over sidebar state.
        `
      }
    }
  }
}

// Inline Help Demo Components
const InlineHelpDemoContent = (): React.JSX.Element => {
  const inlineHelpHelper = useInlineHelpHelper()

  const helpContent = (
    <InlineHelpContent
      title={<span>Asset Details Help</span>}
      description={
        <div>
          <p>This panel shows detailed information about your asset including:</p>
          <ul>
            <li><strong>Filename:</strong> The original filename of the asset</li>
            <li><strong>File size:</strong> Size of the file in bytes/KB/MB</li>
            <li><strong>Dimensions:</strong> Width and height for images</li>
            <li><strong>MIME type:</strong> The file format identifier</li>
            <li><strong>Created:</strong> When the asset was first uploaded</li>
            <li><strong>Modified:</strong> Last modification date</li>
          </ul>
          <p>You can edit some of these properties directly in the form fields.</p>
        </div>
      }
    />
  )

  const customHelpContent = (
    <InlineHelpContent
      title={<span>Custom Help Content</span>}
      description={
        <div>
          <p>This is an example of custom help content that can be triggered programmatically.</p>
          <p>You can include any React content here including:</p>
          <ul>
            <li>Rich text formatting</li>
            <li>Lists and structured content</li>
            <li>Links and interactive elements</li>
            <li>Custom components</li>
          </ul>
        </div>
      }
    />
  )

  return (
    <div style={{ padding: '16px' }}>
      <h4 style={{ marginBottom: '16px' }}>Asset Details with Help</h4>
      
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <label>Asset Name:</label>
        <input type="text" defaultValue="sample-image.jpg" style={{ padding: '4px 8px' }} />
        <InlineHelpTrigger component={helpContent} />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>File Size: 1.2 MB</label>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>Dimensions: 1920 × 1080</label>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
        <Button 
          size="small" 
          onClick={() => inlineHelpHelper.open(customHelpContent)}
        >
          Show Custom Help
        </Button>
        
        <Button 
          size="small"
          onClick={() => inlineHelpHelper.open(helpContent)}
        >
          Show Asset Help
        </Button>
      </div>
    </div>
  )
}

const PropertiesHelpContent = (): React.JSX.Element => (
  <div style={{ padding: '16px' }}>
    <h4>Properties with Inline Help</h4>
    
    <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <label>Alt Text:</label>
      <input type="text" placeholder="Describe the image..." style={{ padding: '4px 8px', width: '200px' }} />
      <InlineHelpTrigger 
        component={
          <InlineHelpContent
            title={<span>Alt Text Help</span>}
            description={
              <div>
                <p>Alt text (alternative text) provides a text description of images for:</p>
                <ul>
                  <li><strong>Accessibility:</strong> Screen readers use alt text to describe images to users with visual impairments</li>
                  <li><strong>SEO:</strong> Search engines use alt text to understand image content</li>
                  <li><strong>Fallback:</strong> Displayed when images fail to load</li>
                </ul>
                <p><strong>Best practices:</strong></p>
                <ul>
                  <li>Be descriptive but concise (under 125 characters)</li>
                  <li>Focus on the purpose of the image in context</li>
                  <li>Don't start with "Image of..." or "Picture of..."</li>
                  <li>Leave empty for decorative images</li>
                </ul>
              </div>
            }
          />
        }
      />
    </div>

    <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <label>Copyright:</label>
      <input type="text" placeholder="© 2024 Company Name" style={{ padding: '4px 8px', width: '200px' }} />
      <InlineHelpTrigger 
        component={
          <InlineHelpContent
            title={<span>Copyright Information</span>}
            description={
              <div>
                <p>Enter copyright information to:</p>
                <ul>
                  <li>Protect your intellectual property</li>
                  <li>Provide proper attribution</li>
                  <li>Meet legal requirements</li>
                </ul>
                <p>Format: © [Year] [Copyright Holder Name]</p>
              </div>
            }
          />
        }
      />
    </div>
  </div>
)

const SidebarProviderWithHelp = WithInlineHelp({ Component: SidebarProvider })

export const WithInlineHelpExample = {
  render: () => {
    return (
      <SidebarProviderWithHelp
        initialEntries={[
          {
            key: 'details',
            icon: <Icon value="details" options={{ width: '16px', height: '16px' }} />,
            component: <InlineHelpDemoContent />,
            tooltip: 'Details'
          },
          {
            key: 'properties', 
            icon: <Icon value="properties" options={{ width: '16px', height: '16px' }} />,
            component: <PropertiesHelpContent />,
            tooltip: 'Properties'
          }
        ]}
        initialButtons={demoData.buttons}
      >
        <div style={{ display: 'flex', height: '500px' }}>
          <ProvidedSidebar />
        </div>
      </SidebarProviderWithHelp>
    )
  },
  parameters: {
    docs: {
      description: {
        story: `
**Inline Help System Demo**

This example demonstrates the complete inline help system:

- **Help Icon Triggers**: Click the help icons (?) next to form fields to show contextual help
- **Help Tab**: Notice the help-circle icon in the sidebar - this opens when help is triggered
- **Programmatic Help**: Use buttons to show help content programmatically
- **Rich Content**: Help content supports rich HTML, lists, and formatting

**Components Used:**
- \`WithInlineHelp\` - HOC that adds inline help functionality to SidebarProvider
- \`InlineHelpTrigger\` - Button component that triggers help content
- \`InlineHelpContent\` - Structured help content with title and description
- \`useInlineHelpHelper\` - Hook for programmatic help control

**Usage Pattern:**
1. Wrap your SidebarProvider with \`WithInlineHelp\`
2. Use \`InlineHelpTrigger\` components near form fields
3. Create help content using \`InlineHelpContent\`
4. Use \`useInlineHelpHelper\` hook for dynamic help content
        `
      }
    }
  }
}
