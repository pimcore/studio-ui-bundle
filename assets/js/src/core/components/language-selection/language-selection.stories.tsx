/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta, type StoryObj } from '@storybook/react'
import { LanguageSelection } from './language-selection'
import React from 'react'

const config: Meta<typeof LanguageSelection> = {
  title: 'Components/Data Entry/LanguageSelection',
  component: LanguageSelection,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `LanguageSelection is a navigation component that allows users to cycle through available languages using arrow buttons. It displays the current language with a flag icon and language code.

**Key Features:**
- **Cycling Navigation**: Use left/right arrow buttons to navigate between languages
- **Flag Display**: Shows country flag icons for visual language identification  
- **Keyboard Navigation**: Supports keyboard interactions through button focus
- **Customizable Languages**: Accepts any array of language codes
- **Callback Integration**: Triggers callbacks when language changes

The component automatically cycles to the beginning/end when reaching language boundaries. It's commonly used in toolbars, headers, or anywhere language switching is needed.`
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    languages: {
      description: 'Array of language codes to cycle through',
      control: { type: 'object' }
    },
    selectedLanguage: {
      description: 'Currently selected language code',
      control: { type: 'text' }
    },
    onSelectLanguage: {
      description: 'Callback function called when language changes',
      action: 'language changed'
    }
  }
}

export default config

type Story = StoryObj<typeof LanguageSelection>

export const Default: Story = {
  args: {
    languages: ['EN', 'DE', 'FR'],
    selectedLanguage: 'EN',
    onSelectLanguage: (language: string) => {
      console.log('Selected language:', language)
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic language selection with English, German, and French. Click the arrow buttons to cycle through languages.'
      }
    }
  }
}

export const ManyLanguages: Story = {
  args: {
    languages: ['EN', 'DE', 'FR', 'IT', 'ES', 'PT', 'NL', 'PL', 'CZ', 'HU'],
    selectedLanguage: 'DE',
    onSelectLanguage: (language: string) => {
      console.log('Selected language:', language)
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Language selection with many available languages. Demonstrates cycling behavior with a larger language set.'
      }
    }
  }
}

export const TwoLanguages: Story = {
  args: {
    languages: ['EN', 'DE'],
    selectedLanguage: 'DE',
    onSelectLanguage: (language: string) => {
      console.log('Selected language:', language)
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple bilingual setup with just English and German. Shows the minimal use case.'
      }
    }
  }
}

export const WithSpecialLanguages: Story = {
  args: {
    languages: ['en_US', 'en_GB', 'fr_CA', 'pt_BR'],
    selectedLanguage: 'en_US',
    onSelectLanguage: (language: string) => {
      console.log('Selected language:', language)
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Language selection with region-specific language codes. Demonstrates support for locale variations.'
      }
    }
  }
}

export const Interactive: Story = {
  args: {
    languages: ['EN', 'DE', 'FR', 'IT', 'ES'],
    selectedLanguage: 'EN'
  },
  render: (args) => {
    const [selectedLanguage, setSelectedLanguage] = React.useState(args.selectedLanguage)
    
    return (
      <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <div style={{ marginBottom: '16px', textAlign: 'center' }}>
          <strong>Current Selection: {selectedLanguage}</strong>
        </div>
        <LanguageSelection
          {...args}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
        />
        <div style={{ marginTop: '16px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
          Click the arrows to change language
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing real-time language selection updates. The selected language is displayed above the component.'
      }
    }
  }
}
