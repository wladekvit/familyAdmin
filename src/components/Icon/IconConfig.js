import React from "react";

export default {
  menuHamburger: () => (
    <svg width="82" height="80" viewBox="0 0 82 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <rect x="20" y="20" width="42" height="40" rx="5" fill="#595860"/>
      </g>
      <rect x="25.25" y="39" width="21" height="3" rx="1.5" fill="white"/>
      <rect x="25.25" y="29" width="31.5" height="3" rx="1.5" fill="white"/>
      <rect x="25.25" y="49" width="31.5" height="3" rx="1.5" fill="white"/>
      <defs>
        <filter id="filter0_d" x="0" y="0" width="82" height="80" filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="10"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
      </defs>
    </svg>
  )
}