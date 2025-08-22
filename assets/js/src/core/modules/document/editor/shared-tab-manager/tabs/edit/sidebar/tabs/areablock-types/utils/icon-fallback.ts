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
 * Fallback icons for areablock types
 */
const FALLBACK_ICON_STORE = [
  "circuit", "display", "biomass", "deployment", "electrical_sensor", "dam",
  "light_at_the_end_of_tunnel", "like", "icons8_cup", "sports_mode", "landscape", "selfie", "cable_release",
  "bookmark", "briefcase", "graduation_cap", "in_transit", "diploma_2", "circuit", "display", "biomass", "deployment",
  "electrical_sensor", "dam",
  "light_at_the_end_of_tunnel", "like", "icons8_cup", "sports_mode", "landscape", "selfie", "cable_release",
  "bookmark", "briefcase", "graduation_cap", "in_transit", "diploma_2"
]

/**
 * Gets the icon for an areablock type, applying fallback logic if no icon is provided
 */
export const getAreablockTypeIcon = (icon: string | undefined, index: number): string => {
  if (icon) {
    // If icon is provided, treat it as a full SVG path
    return icon
  }

  // Apply fallback logic using the predefined icon store
  const fallbackIcon = FALLBACK_ICON_STORE[index % FALLBACK_ICON_STORE.length]
  return `/bundles/pimcoreadmin/img/flat-color-icons/${fallbackIcon}.svg`
}
