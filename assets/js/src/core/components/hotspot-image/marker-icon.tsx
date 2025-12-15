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

export const MarkerIcon = (): JSX.Element => {
  return (
    <svg
      fill="none"
      height="50"
      viewBox="0 0 30 50"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="15"
        cy="36"
        fill="#FAAD14"
        opacity="0.1"
        r="13"
      />
      <circle
        cx="15"
        cy="36"
        fill="#FAAD14"
        opacity="0.25"
        r="10"
      />
      <g filter="url(#filter0_d_15707_18695)">
        <path
          d="M21 36C21 39.3137 18.3137 42 15 42C11.6863 42 9 39.3137 9 36C9 32.6863 11.6863 30 15 30C18.3137 30 21 32.6863 21 36Z"
          fill="#FAAD14"
        />
        <path
          d="M15 30.5C18.0376 30.5 20.5 32.9624 20.5 36C20.5 39.0376 18.0376 41.5 15 41.5C11.9624 41.5 9.5 39.0376 9.5 36C9.5 32.9624 11.9624 30.5 15 30.5Z"
          stroke="#404655"
        />
      </g>
      <path
        d="M15 14.65C17.4853 14.65 19.5 12.9039 19.5 10.75C19.5 8.59609 17.4853 6.85 15 6.85C12.5147 6.85 10.5 8.59609 10.5 10.75C10.5 12.9039 12.5147 14.65 15 14.65Z"
        fill="#FFFBE6"
      />
      <path
        d="M15 27C18 21.8 27 18.4438 27 11.4C27 5.65624 21.6274 1 15 1C8.37258 1 3 5.65624 3 11.4C3 18.4438 12 21.8 15 27Z"
        fill="#FFFBE6"
      />
      <path
        d="M15 14.65C17.4853 14.65 19.5 12.9039 19.5 10.75C19.5 8.59609 17.4853 6.85 15 6.85C12.5147 6.85 10.5 8.59609 10.5 10.75C10.5 12.9039 12.5147 14.65 15 14.65Z"
        stroke="#404655"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 27C18 21.8 27 18.4438 27 11.4C27 5.65624 21.6274 1 15 1C8.37258 1 3 5.65624 3 11.4C3 18.4438 12 21.8 15 27Z"
        stroke="#404655"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="16"
          id="filter0_d_15707_18695"
          width="16"
          x="7"
          y="28"
        >
          <feFlood
            floodOpacity="0"
            result="BackgroundImageFix"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feMorphology
            in="SourceAlpha"
            operator="dilate"
            radius="2"
            result="effect1_dropShadow_15707_18695"
          />
          <feOffset />
          <feComposite
            in2="hardAlpha"
            operator="out"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.843137 0 0 0 0 0.0196078 0 0 0 0.1 0"
          />
          <feBlend
            in2="BackgroundImageFix"
            mode="normal"
            result="effect1_dropShadow_15707_18695"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_15707_18695"
            mode="normal"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}
