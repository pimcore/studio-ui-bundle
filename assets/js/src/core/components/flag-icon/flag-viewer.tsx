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
import { Card, Row, Col, Typography, Space, Divider, Input } from 'antd'
import { FlagIcon } from './flag-icon'

const { Title, Text } = Typography
const { Search } = Input

// All country flags available in the flags folder
const countryFlags = [
  'ad', 'ae', 'af', 'ag', 'ai', 'al', 'am', 'ao', 'aq', 'ar', 'as', 'at', 'au', 'aw', 'ax', 'az',
  'ba', 'bb', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bl', 'bm', 'bn', 'bo', 'bq', 'br', 'bs', 'bt', 'bv', 'bw', 'by', 'bz',
  'ca', 'cc', 'cd', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn', 'co', 'cr', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz',
  'de', 'dj', 'dk', 'dm', 'do', 'dz',
  'ec', 'ee', 'eg', 'eh', 'en', 'er', 'es', 'et', 'eu',
  'fi', 'fj', 'fk', 'fm', 'fo', 'fr',
  'ga', 'gb', 'gb-eng', 'gb-sct', 'gb-wls', 'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gl', 'gm', 'gn', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu', 'gw', 'gy',
  'hk', 'hm', 'hn', 'hr', 'ht', 'hu',
  'id', 'ie', 'il', 'im', 'in', 'io', 'iq', 'ir', 'is', 'it',
  'je', 'jm', 'jo', 'jp',
  'ke', 'kg', 'kh', 'ki', 'km', 'kn', 'kp', 'kr', 'kw', 'ky', 'kz',
  'la', 'lb', 'lc', 'li', 'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly',
  'ma', 'mc', 'md', 'me', 'mf', 'mg', 'mh', 'mk', 'ml', 'mm', 'mn', 'mo', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'mv', 'mw', 'mx', 'my', 'mz',
  'na', 'nc', 'ne', 'nf', 'ng', 'ni', 'nl', 'no', 'np', 'nr', 'nu', 'nz',
  'om',
  'pa', 'pe', 'pf', 'pg', 'ph', 'pk', 'pl', 'pm', 'pn', 'pr', 'ps', 'pt', 'pw', 'py',
  'qa',
  're', 'ro', 'rs', 'ru', 'rw',
  'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'ss', 'st', 'sv', 'sx', 'sy', 'sz',
  'tc', 'td', 'tf', 'tg', 'th', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'tr', 'tt', 'tv', 'tw', 'tz',
  'ua', 'ug', 'um', 'us', 'uy', 'uz',
  'va', 'vc', 've', 'vg', 'vi', 'vn', 'vu',
  'wf', 'ws',
  'ye', 'yt',
  'za', 'zm', 'zw', 'zz'
]

// Language flags available in the languages subfolder
const languageFlags = ['ar', 'ca']

// Sample language codes that map to country flags via the mapping
const sampleLanguageCodes = [
  'aa', 'af', 'am', 'as', 'ast', 'asa', 'az', 'bas', 'eu', 'be', 'bem', 'bez', 'bg', 'bm', 'bn', 'br', 'brx',
  'bs', 'cs', 'da', 'de', 'dz', 'el', 'en', 'es', 'et', 'fi', 'fo', 'fr', 'ga', 'gv', 'he', 'hi', 'hr', 'hu',
  'hy', 'id', 'ig', 'is', 'it', 'ja', 'ka', 'os', 'kea', 'kk', 'kl', 'km', 'ko', 'lg', 'lo', 'lt', 'mg', 'mk',
  'mn', 'ms', 'mt', 'my', 'nb', 'ne', 'nl', 'nn', 'pl', 'pt', 'ro', 'ru', 'sg', 'sk', 'sl', 'sq', 'sr', 'sv',
  'swc', 'th', 'to', 'tr', 'tzm', 'uk', 'uz', 'vi', 'zh', 'gd', 'gd-gb', 'cy', 'cy-gb', 'fy', 'xh', 'yo', 'zu',
  'ta', 'te', 'ss', 'sw', 'so', 'si', 'ii', 'zh-hans', 'zh-hant', 'sn', 'rm', 'pa', 'fa', 'lv', 'gl', 'fil'
]

interface FlagDisplayProps {
  code: string
  title: string
}

const FlagDisplay = ({ code, title }: FlagDisplayProps): React.JSX.Element => {
  return (
    <Card
      size="small"
      style={ { textAlign: 'center', height: '120px' } }
    >
      <Space
        direction="vertical"
        size="small"
      >
        <FlagIcon
          height={ 24 }
          value={ code }
          width={ 32 }
        />
        <Text code>{code}</Text>
        <Text
          style={ { fontSize: '12px' } }
          type="secondary"
        >{title}</Text>
      </Space>
    </Card>
  )
}

export const FlagViewer = (): React.JSX.Element => {
  const [searchTerm, setSearchTerm] = React.useState('')

  const filterFlags = (flags: string[], searchTerm: string): string[] => {
    if (searchTerm === '') return flags
    return flags.filter(flag =>
      flag.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const filteredCountryFlags = filterFlags(countryFlags, searchTerm)
  const filteredLanguageFlags = filterFlags(languageFlags, searchTerm)
  const filteredSampleLanguages = filterFlags(sampleLanguageCodes, searchTerm)

  return (
    <div style={ { padding: '24px' } }>
      <Title level={ 1 }>Flag Viewer</Title>
      <Text type="secondary">
        View all available flags rendered using the FlagIcon component to verify SVG display quality.
      </Text>

      <div style={ { margin: '24px 0' } }>
        <Search
          onChange={ (e) => { setSearchTerm(e.target.value) } }
          placeholder="Search flags by code..."
          style={ { maxWidth: '400px' } }
          value={ searchTerm }
        />
      </div>

      <Divider />

      <Title level={ 2 }>Country Flags ({filteredCountryFlags.length})</Title>
      <Text
        style={ { display: 'block', marginBottom: '16px' } }
        type="secondary"
      >
        Direct country flag SVGs from the flags folder
      </Text>
      <Row gutter={ [16, 16] }>
        {filteredCountryFlags.map((code) => (
          <Col
            key={ code }
            lg={ 4 }
            md={ 6 }
            sm={ 8 }
            xl={ 3 }
            xs={ 12 }
          >
            <FlagDisplay
              code={ code }
              title="Country Flag"
            />
          </Col>
        ))}
      </Row>

      <Divider />

      <Title level={ 2 }>Language Flags ({filteredLanguageFlags.length})</Title>
      <Text
        style={ { display: 'block', marginBottom: '16px' } }
        type="secondary"
      >
        Language-specific flag SVGs from the flags/languages folder
      </Text>
      <Row gutter={ [16, 16] }>
        {filteredLanguageFlags.map((code) => (
          <Col
            key={ code }
            lg={ 4 }
            md={ 6 }
            sm={ 8 }
            xl={ 3 }
            xs={ 12 }
          >
            <FlagDisplay
              code={ code }
              title="Language Flag"
            />
          </Col>
        ))}
      </Row>

      <Divider />

      <Title level={ 2 }>Language Code Mappings ({filteredSampleLanguages.length})</Title>
      <Text
        style={ { display: 'block', marginBottom: '16px' } }
        type="secondary"
      >
        Language codes that are mapped to country flags via the languageCountryMapping
      </Text>
      <Row gutter={ [16, 16] }>
        {filteredSampleLanguages.map((code) => (
          <Col
            key={ code }
            lg={ 4 }
            md={ 6 }
            sm={ 8 }
            xl={ 3 }
            xs={ 12 }
          >
            <FlagDisplay
              code={ code }
              title="Mapped Language"
            />
          </Col>
        ))}
      </Row>

      <Divider />

      <Title level={ 2 }>Unknown Flag Test</Title>
      <Text
        style={ { display: 'block', marginBottom: '16px' } }
        type="secondary"
      >
        Testing the fallback for non-existent flags
      </Text>
      <Row gutter={ [16, 16] }>
        <Col
          lg={ 4 }
          md={ 6 }
          sm={ 8 }
          xl={ 3 }
          xs={ 12 }
        >
          <FlagDisplay
            code="invalid-code"
            title="Invalid Flag"
          />
        </Col>
        <Col
          lg={ 4 }
          md={ 6 }
          sm={ 8 }
          xl={ 3 }
          xs={ 12 }
        >
          <FlagDisplay
            code=""
            title="Empty String"
          />
        </Col>
      </Row>
    </div>
  )
}
