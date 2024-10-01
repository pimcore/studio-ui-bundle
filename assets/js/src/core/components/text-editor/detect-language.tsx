/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { xml } from '@codemirror/lang-xml'
import { sql } from '@codemirror/lang-sql'
import { markdown } from '@codemirror/lang-markdown'
import { type LanguageSupport } from '@codemirror/language'

interface LanguageConfig {
  codeMirrorExtension: LanguageSupport
  fileExtensions: string[]
}

const FILE_EXTENSIONS: Record<string, LanguageConfig> = {
  html: {
    codeMirrorExtension: html(),
    fileExtensions: ['html', 'htm', 'shtm', 'shtml', 'xhtml', 'cfm', 'cfml', 'cfc', 'dhtml', 'xht', 'tpl', 'twig', 'kit', 'jsp', 'aspx', 'ascx', 'asp', 'master', 'cshtml', 'vbhtml']
  },
  css: {
    codeMirrorExtension: css(),
    fileExtensions: ['css', 'less', 'scss', 'sass']
  },
  javascript: {
    codeMirrorExtension: javascript({ jsx: true }),
    fileExtensions: ['js', 'js.erb', 'jsm', '_js', 'jsx']
  },
  json: {
    codeMirrorExtension: json(),
    fileExtensions: ['json', 'map']
  },
  xml: {
    codeMirrorExtension: xml(),
    fileExtensions: ['xml', 'wxs', 'wxl', 'wsdl', 'rss', 'atom', 'rdf', 'xslt', 'xsl', 'xul', 'xsd', 'xbl', 'mathml', 'config', 'plist', 'xaml']
  },
  sql: {
    codeMirrorExtension: sql(),
    fileExtensions: ['sql']
  },
  markdown: {
    codeMirrorExtension: markdown(),
    fileExtensions: ['md', 'markdown', 'mdown', 'mkdn']
  }
}

export type SupportedLanguage = 'html' | 'css' | 'javascript' | 'json' | 'xml' | 'sql' | 'markdown' | null

export const getLanguageExtensions = (language?: SupportedLanguage): LanguageSupport[] => {
  if (language === undefined || language === null) {
    return []
  }
  return [FILE_EXTENSIONS[language].codeMirrorExtension]
}

export const detectLanguageFromFilename = (filename: string): SupportedLanguage => {
  const extension = filename.split('.').pop()
  if (extension === undefined) {
    return null
  }
  for (const language in FILE_EXTENSIONS) {
    if (FILE_EXTENSIONS[language].fileExtensions.includes(extension)) {
      return language as SupportedLanguage
    }
  }
  return null
}
