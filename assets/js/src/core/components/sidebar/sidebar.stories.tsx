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
