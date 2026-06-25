/*! For license information please see src-core-components-sanitize-html-sanitize-html-stories.d95cb571.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle_core=self.webpackChunkpimcore_studio_ui_bundle_core||[]).push([["1439"],{"./js/src/core/components/sanitize-html/sanitize-html.stories.tsx"(e,r,t){t.r(r),t.d(r,{WithOptions:()=>s,__namedExportsOrder:()=>n,_default:()=>i,default:()=>a});let a={title:"Components/Security/Sanitize HTML",component:t("./js/src/core/components/sanitize-html/sanitize-html.tsx").h,parameters:{layout:"centered"},tags:["autodocs"]},i={args:{html:`
      <h1>Sanitize HTML</h1>

      <script>alert('XSS')</script>
      <img src="https://example.com/image.jpg" onerror="alert('XSS')">
      <a href="javascript:alert('XSS')">Click me</a>
    `}},s={args:{html:`
      <div>
        <h1>Sanitize HTML</h1>
      </div>
      
      <div>
        <a href="https://www.npmjs.com/package/dompurify">Check configuration options</a>
      </div>
      
      <div>
        <script>alert('XSS')</script>
        <img src="https://example.com/image.jpg" onerror="alert('XSS')">
        <a href="javascript:alert('XSS')">Click me</a>
      </div>
      

    `,options:{ALLOWED_TAGS:["a","div"],ALLOWED_ATTR:["href"]}}},n=["_default","WithOptions"];i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"{\n  args: {\n    html: `\n      <h1>Sanitize HTML</h1>\n\n      <script>alert('XSS')<\/script>\n      <img src=\"https://example.com/image.jpg\" onerror=\"alert('XSS')\">\n      <a href=\"javascript:alert('XSS')\">Click me</a>\n    `\n  }\n}",...i.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{\n  args: {\n    html: `\n      <div>\n        <h1>Sanitize HTML</h1>\n      </div>\n      \n      <div>\n        <a href=\"https://www.npmjs.com/package/dompurify\">Check configuration options</a>\n      </div>\n      \n      <div>\n        <script>alert('XSS')<\/script>\n        <img src=\"https://example.com/image.jpg\" onerror=\"alert('XSS')\">\n        <a href=\"javascript:alert('XSS')\">Click me</a>\n      </div>\n      \n\n    `,\n    options: {\n      ALLOWED_TAGS: ['a', 'div'],\n      ALLOWED_ATTR: ['href']\n    }\n  }\n}",...s.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=src-core-components-sanitize-html-sanitize-html-stories.d95cb571.iframe.bundle.js.map