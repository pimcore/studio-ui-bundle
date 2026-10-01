/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * The settings the date and number filter editors offer. They live next to the
 * transforms instead of in the editor components, so anything that has to
 * interpret a filter value - a transform, a query builder, a client side
 * matcher - can read them without pulling in a React component.
 *
 * Both enums stay re-exported from their editor component for compatibility.
 */

export enum DatePickerSettingValue {
  ON = 'on',
  BETWEEN = 'between',
  BEFORE = 'before',
  AFTER = 'after'
}

export enum NumberFilterSettingValue {
  IS = 'is',
  BETWEEN = 'between',
  LESS = 'less',
  MORE = 'more'
}
