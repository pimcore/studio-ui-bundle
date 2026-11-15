/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { sanitiseMediaQuery } from './media-query-helpers'

/**
 * Regression test for pimcore/platform-version#612.
 * The media-query name is written verbatim into the `media` attribute of the
 * rendered <source> tag, so stripping parentheses, colons and spaces turned
 * `(max-width: 375px)` into `max-width375px` — not a valid media query, so
 * browsers ignored the source and responsive thumbnails could not be
 * configured from Studio at all.
 */
describe('sanitiseMediaQuery', () => {
  it('keeps a plain width media query intact', () => {
    expect(sanitiseMediaQuery('(max-width: 375px)')).toBe('(max-width: 375px)')
  })

  it('keeps a compound media query intact', () => {
    expect(sanitiseMediaQuery('screen and (min-width: 768px)'))
      .toBe('screen and (min-width: 768px)')
  })

  it('keeps a comma-separated media query list intact', () => {
    expect(sanitiseMediaQuery('(max-width: 375px), (min-width: 1200px)'))
      .toBe('(max-width: 375px), (min-width: 1200px)')
  })

  it('keeps a ratio media query intact', () => {
    expect(sanitiseMediaQuery('(min-aspect-ratio: 16/9)'))
      .toBe('(min-aspect-ratio: 16/9)')
  })

  it('trims surrounding whitespace', () => {
    expect(sanitiseMediaQuery('  (max-width: 375px)  ')).toBe('(max-width: 375px)')
  })

  it('keeps Media Queries Level 4 range syntax intact', () => {
    expect(sanitiseMediaQuery('(width >= 600px)')).toBe('(width >= 600px)')
  })

  it('keeps a two-sided range interval intact', () => {
    expect(sanitiseMediaQuery('(400px <= width <= 700px)'))
      .toBe('(400px <= width <= 700px)')
  })

  it('keeps range syntax combined with a media type', () => {
    expect(sanitiseMediaQuery('screen and (width > 1024px)'))
      .toBe('screen and (width > 1024px)')
  })

  it('removes quotes, which would break the generated yaml key', () => {
    expect(sanitiseMediaQuery('(max-width: "375px")')).toBe('(max-width: 375px)')
  })

  it('removes semicolons and braces, which cannot occur in a media query', () => {
    expect(sanitiseMediaQuery('(max-width: 375px); body { color: red }'))
      .toBe('(max-width: 375px) body  color: red')
  })

  it('removes backslashes and backticks', () => {
    expect(sanitiseMediaQuery('(max-width: 375px)\\`')).toBe('(max-width: 375px)')
  })

  it('keeps a calc() value intact, including its multiplication operator', () => {
    expect(sanitiseMediaQuery('(min-width: calc(200px * 2))'))
      .toBe('(min-width: calc(200px * 2))')
  })

  it('collapses a newline to a space rather than keeping it in a yaml key', () => {
    expect(sanitiseMediaQuery('(max-width:\n375px)')).toBe('(max-width: 375px)')
  })

  it('collapses a tab to a space instead of welding two tokens together', () => {
    expect(sanitiseMediaQuery('screen\tand (min-width: 768px)'))
      .toBe('screen and (min-width: 768px)')
  })

  /**
   * `<` and `>` are legal in range syntax, so a character filter can no longer
   * reject `<script>` — and it should not pretend to. The function filters
   * characters; it does not validate media-query grammar. Escaping is the
   * downstream contract: Pimcore renders the key through htmlspecialchars(),
   * so an angle bracket cannot break out of the media attribute.
   */
  it('passes through angle brackets, because range syntax needs them', () => {
    expect(sanitiseMediaQuery('(max-width: 375px)<script>'))
      .toBe('(max-width: 375px)<script>')
  })

  it('still strips the quotes and semicolons from such a value', () => {
    // Parentheses stay — media queries are built from them. Quotes and the
    // semicolon go, which is what would otherwise break the yaml key.
    expect(sanitiseMediaQuery('<script>alert("x");</script>'))
      .toBe('<script>alert(x)</script>')
  })

  it('returns an empty string for input with no usable characters', () => {
    expect(sanitiseMediaQuery('{};"\'`')).toBe('')
  })
})
