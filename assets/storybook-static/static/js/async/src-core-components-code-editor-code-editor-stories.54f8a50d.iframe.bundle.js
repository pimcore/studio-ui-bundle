/*! For license information please see src-core-components-code-editor-code-editor-stories.54f8a50d.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle_core=self.webpackChunkpimcore_studio_ui_bundle_core||[]).push([["5703"],{"./js/src/core/components/code-editor/code-editor.stories.tsx"(e,t,n){n.r(t),n.d(t,{JsonPreset:()=>u,ReadOnly:()=>p,TextPreset:()=>l,WithOnChange:()=>c,YamlPreset:()=>d,__namedExportsOrder:()=>g,_default:()=>i,default:()=>s});var r=n("./node_modules/react/jsx-runtime.js"),a=n("./node_modules/react/index.js"),o=n("./js/src/core/components/code-editor/code-editor.tsx");let s={title:"Components/Data Entry/CodeEditor",component:o.B,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{preset:{control:{type:"select"},options:["text","yaml","html","json"]}}},i={args:{value:"Hello, World!\nThis is a plain text editor.",preset:"text",height:"200px"}},l={args:{value:`Welcome to the Code Editor!

This is a plain text preset with no syntax highlighting.
Perfect for:
- Notes
- Plain configuration
- General text editing`,preset:"text",height:"200px"}},d={args:{value:`# YAML Configuration Example
name: my-application
version: 1.0.0

database:
  host: localhost
  port: 5432
  username: admin
  password: secret

features:
  - authentication
  - logging
  - monitoring

settings:
  debug: true
  timeout: 30`,preset:"yaml",height:"300px"}},u={args:{value:`{
  "name": "my-application",
  "version": "1.0.0",
  "database": {
    "host": "localhost",
    "port": 5432,
    "username": "admin"
  },
  "features": [
    "authentication",
    "logging",
    "monitoring"
  ],
  "settings": {
    "debug": true,
    "timeout": 30
  }
}`,preset:"json",height:"300px"}},c={render:()=>{let[e,t]=(0,a.useState)("Edit this text and see the console output...");return(0,r.jsxs)("div",{children:[(0,r.jsx)(o.B,{height:"200px",onChange:e=>{t(e),console.log("CodeEditor value changed:",e)},placeholder:"Start typing...",preset:"text",value:e}),(0,r.jsxs)("p",{style:{marginTop:16,color:"#666"},children:[(0,r.jsx)("strong",{children:"Current value:"})," ",e]})]})}},p={args:{value:`This editor is read-only.
You cannot edit this content.`,preset:"text",height:"150px",readOnly:!0}},g=["_default","TextPreset","YamlPreset","JsonPreset","WithOnChange","ReadOnly"];i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"{\n  args: {\n    value: 'Hello, World!\\nThis is a plain text editor.',\n    preset: 'text',\n    height: '200px'\n  }\n}",...i.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{\n  args: {\n    value: `Welcome to the Code Editor!\n\nThis is a plain text preset with no syntax highlighting.\nPerfect for:\n- Notes\n- Plain configuration\n- General text editing`,\n    preset: 'text',\n    height: '200px'\n  }\n}",...l.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:"{\n  args: {\n    value: `# YAML Configuration Example\nname: my-application\nversion: 1.0.0\n\ndatabase:\n  host: localhost\n  port: 5432\n  username: admin\n  password: secret\n\nfeatures:\n  - authentication\n  - logging\n  - monitoring\n\nsettings:\n  debug: true\n  timeout: 30`,\n    preset: 'yaml',\n    height: '300px'\n  }\n}",...d.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:'{\n  args: {\n    value: `{\n  "name": "my-application",\n  "version": "1.0.0",\n  "database": {\n    "host": "localhost",\n    "port": 5432,\n    "username": "admin"\n  },\n  "features": [\n    "authentication",\n    "logging",\n    "monitoring"\n  ],\n  "settings": {\n    "debug": true,\n    "timeout": 30\n  }\n}`,\n    preset: \'json\',\n    height: \'300px\'\n  }\n}',...u.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"{\n  render: () => {\n    const [value, setValue] = useState('Edit this text and see the console output...');\n    const handleChange = (newValue: string): void => {\n      setValue(newValue);\n      console.log('CodeEditor value changed:', newValue);\n    };\n    return <div>\n        <CodeEditor height=\"200px\" onChange={handleChange} placeholder=\"Start typing...\" preset=\"text\" value={value} />\n        <p style={{\n        marginTop: 16,\n        color: '#666'\n      }}>\n          <strong>Current value:</strong> {value}\n        </p>\n      </div>;\n  }\n}",...c.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"{\n  args: {\n    value: `This editor is read-only.\nYou cannot edit this content.`,\n    preset: 'text',\n    height: '150px',\n    readOnly: true\n  }\n}",...p.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=src-core-components-code-editor-code-editor-stories.54f8a50d.iframe.bundle.js.map