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

export const parseVideoIdFromUrl = (url: string, type: 'youtube' | 'vimeo' | 'dailymotion'): string | null => {
  if (type === 'youtube') {
    const ytRegex = /^(?:https?:\/\/|\/\/)?(?:www\.|m\.|.+\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|feeds\/api\/videos\/|watch\?v=|watch\?.+&v=))(?<videoId>[\w-]{11})(?![\w-])/g
    const match = url.matchAll(ytRegex)
    const matches = [...match]
    const videoIds = Array.from(matches, m => m[1])
    if (videoIds?.length > 0) {
      return videoIds[0]
    }
  } else if (type === 'vimeo') {
    const regExp = /vimeo.com\/(\d+)($|\/)/
    const match = regExp.exec(url)
    if (match?.[1] !== null && match?.[1] !== undefined) {
      return match[1]
    }
  } else if (type === 'dailymotion') {
    const regExp = /dailymotion.*\/video\/([^_]+)/
    const match = regExp.exec(url)
    if (match?.[1] !== null && match?.[1] !== undefined) {
      return match[1]
    }
  }

  return null
}
