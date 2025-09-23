/*! For license information please see 7952.811ee3dd.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["7952"],{66490:function(e,t,a){a.d(t,{x:()=>m});var n=a(85893),i=a(40483),l=a(94374),o=a(55859),r=a(38119),d=a(55721),s=a(62588),c=a(24861),b=a(51469),u=a(53478);a(81004);var p=a(71695),h=a(54626),v=a(54658),g=a(71125),f=a(23526);let m=()=>{let{t:e}=(0,p.useTranslation)(),t=(0,r.U8)(),[a]=(0,h.Fg)(),m=(0,i.useAppDispatch)(),{openDataObject:x}=(0,v.n)(),{isTreeActionAllowed:y}=(0,c._)(),{getClassDefinitionsForCurrentUser:j}=(0,g.C)(),w=t=>{let a=[],i=[...j()].sort((e,t)=>e.name.localeCompare(t.name)).reduce((e,t)=>{let a=(0,u.isNil)(t.group)||(0,u.isEmpty)(t.group)?"undefined":t.group;return void 0===e[a]&&(e[a]=[]),e[a].push(t),e},{});for(let[l,r]of(void 0!==i.undefined&&(a=i.undefined.map(e=>k(e,t))),Object.entries(i)))"undefined"!==l&&a.push({label:e(l),key:"add-object-group-"+l,icon:(0,n.jsx)(o.J,{value:"folder"}),children:r.map(e=>k(e,t))});return a},k=(t,a)=>({label:e(t.name),key:t.id,icon:"class"===t.icon.value?(0,n.jsx)(o.J,{subIconName:"new",subIconVariant:"green",value:"data-object"}):(0,n.jsx)(o.J,{subIconName:"new",subIconVariant:"green",...t.icon}),onClick:()=>{T(t,parseInt(a.id))}}),T=(a,n,i)=>{t.input({title:e("data-object.create-data-object",{className:a.name}),label:e("form.label.new-item"),rule:{required:!0,message:e("form.validation.required")},onOk:async e=>{await S(a.id,e,n),null==i||i(e)}})},S=async(e,t,n)=>{let i=a({parentId:n,dataObjectAddParameters:{key:t,classId:e,type:"object"}});try{let e=await i;if(void 0!==e.error)return void(0,d.ZP)(new d.MS(e.error));let{id:t}=e.data;x({config:{id:t}}),m((0,l.D9)({nodeId:String(n),elementType:"data-object"}))}catch(e){(0,d.ZP)(new d.aE("Error creating data object"))}},I=e=>!y(b.W.Add)||!(0,s.x)(e.permissions,"create")||(0,u.isEmpty)(j());return{addObjectTreeContextMenuItem:t=>({label:e("data-object.tree.context-menu.add-object"),key:f.N.addObject,icon:(0,n.jsx)(o.J,{value:"folder"}),hidden:I(t),children:w(t)})}}},44158:function(e,t,a){a.d(t,{M:()=>r,g:()=>o});var n=a(85893),i=a(81004),l=a(77476);let o=(0,i.createContext)({currentLayout:null,setCurrentLayout:()=>{}}),r=e=>{let{children:t,defaultLayout:a,isLoading:r}=e,[d,s]=(0,i.useState)(a);(0,i.useEffect)(()=>{null===d&&null!==a&&s(a)},[a]);let c=(0,i.useMemo)(()=>({currentLayout:d,setCurrentLayout:s}),[d]);return(0,n.jsx)(o.Provider,{value:c,children:r?(0,n.jsx)(l.V,{loading:!0}):t})}},44171:function(e,t,a){a.d(t,{k:()=>r});var n=a(85893),i=a(43439),l=a(50444);a(81004);var o=a(64235);let r=()=>{let e=(0,l.r)(),{currentLanguage:t,setCurrentLanguage:a,hasLocalizedFields:r}=(0,o.X)();return r?(0,n.jsx)(i.k,{languages:[...e.requiredLanguages],onSelectLanguage:a,selectedLanguage:t}):(0,n.jsx)(n.Fragment,{})}},98139:function(e,t,a){a.d(t,{F:()=>o});var n=a(28395),i=a(5554),l=a(60476);class o extends i.A{constructor(){super(),this.type="object"}}o=(0,n.gn)([(0,l.injectable)(),(0,n.w6)("design:type",Function),(0,n.w6)("design:paramtypes",[])],o)},17155:function(e,t,a){a.d(t,{_:()=>P});var n=a(85893),i=a(81004),l=a(61949),o=a(68922),r=a(77476),d=a(90165),s=a(29981),c=a(94730),b=a(47755),u=a(68686),p=a(3129),h=a(12174),v=a(70793),g=a(27614);let f=()=>(0,n.jsx)(b.o,{children:(0,n.jsxs)(h.v,{children:[(0,n.jsx)(u.k,{children:(0,n.jsx)(g.O,{slot:v.O.dataObject.editor.toolbar.slots.left.name})}),(0,n.jsx)(u.k,{align:"center",gap:"extra-small",style:{height:"32px"},vertical:!1,children:(0,n.jsx)(g.O,{slot:v.O.dataObject.editor.toolbar.slots.right.name})}),(0,n.jsx)(p.L,{})]})});var m=a(9901),x=a(51791),y=a(18639),j=a(70774),w=a(11773),k=a(36414);let T=e=>{let{id:t}=e,{isLoading:a,isError:b,dataObject:u,editorType:p}=(0,d.H)(t),h=(0,l.Q)(),{setContext:v,removeContext:g}=(0,s.J)();return((0,i.useEffect)(()=>()=>{g()},[]),(0,i.useEffect)(()=>(h&&v({id:t}),()=>{h||g()}),[h]),a)?(0,n.jsx)(r.V,{loading:!0}):b?(0,n.jsx)(r.V,{padded:!0,children:(0,n.jsx)(k.b,{message:"Error: Loading of data object failed",type:"error"})}):void 0===u||void 0===p?(0,n.jsx)(n.Fragment,{}):(0,n.jsx)(o.g,{id:t,children:(0,n.jsx)(w.U,{children:(0,n.jsx)(y.L,{children:(0,n.jsx)(j.k,{children:(0,n.jsx)(x.O,{children:(0,n.jsx)(m.S,{renderTabbar:(0,n.jsx)(c.T,{elementEditorType:p}),renderToolbar:(0,n.jsx)(f,{})})})})})})})};var S=a(88087),I=a(44158),L=a(92430),C=a(71695),$=a(46309),A=a(84475);let P={name:"data-object-editor",component:e=>{let{id:t}=e,{getDefaultLayoutId:a,isLoading:i}=(0,S.z)(t);return(0,n.jsx)(I.M,{defaultLayout:a(),isLoading:i,children:(0,n.jsx)(T,{id:t})})},titleComponent:e=>{let{node:t}=e,{dataObject:a}=(0,d.H)(t.getConfig().id),{t:i}=(0,C.useTranslation)(),l=t.getName();return t.getName=()=>((null==a?void 0:a.parentId)===0&&(t.getName=()=>i("home")),(null==a?void 0:a.key)??l),(0,n.jsx)(L.X,{modified:(null==a?void 0:a.modified)??!1,node:t})},isModified:e=>{let t=e.getConfig(),a=(0,A.V8)($.h.getState(),t.id);return(null==a?void 0:a.modified)??!1},getContextProvider:(e,t)=>{let a=e.config;return(0,n.jsx)(o.g,{id:a.id,children:t})}}},88087:function(e,t,a){a.d(t,{z:()=>d});var n=a(90165),i=a(18962),l=a(55721),o=a(53478),r=a(47666);let d=e=>{let{dataObject:t,isLoading:a}=(0,n.H)(e),{data:d,error:s,isLoading:c}=(0,i.ih)({objectId:e},{skip:void 0===t||"folder"===t.type});void 0!==s&&(0,l.ZP)(new l.MS(s));let b=void 0!==d?d.items:void 0,u=(null==t?void 0:t.hasWorkflowAvailable)===!0,{data:p,isFetching:h}=(0,r.d)({elementType:"data-object",elementId:e},{skip:!u});return{layouts:b,getDefaultLayoutId:e=>{if((0,o.isUndefined)(b))return null;let t=b.find(e=>e.default)??b.find(t=>t.id===e)??b.find(e=>e.id===(null==p?void 0:p.layoutId))??b.find(e=>"0"===e.id)??b[0]??null;return(null==t?void 0:t.id)??null},isLoading:a||h||c&&(null==t?void 0:t.type)!=="folder"}}},9901:function(e,t,a){a.d(t,{S:()=>l});var n=a(85893);a(81004);let i=(0,a(29202).createStyles)(e=>{let{token:t,css:a}=e;return{tabbarToolbar:a`
      &.tabs-toolbar-layout {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }

      .tabs-toolbar-layout__tabbar {
        display: flex;
        overflow: hidden;
        height: calc(100% - ${t.sizeXXL}px);
        width: 100%;
      }

      .tabs-toolbar-layout__toolbar {
        display: flex;
        overflow: hidden;
        height: ${t.sizeXXL}px;
        width: 100%;
      }
    `}},{hashPriority:"low"}),l=e=>{let{styles:t}=i();return(0,n.jsxs)("div",{className:["tabs-toolbar-layout",t.tabbarToolbar].join(" "),children:[(0,n.jsx)("div",{className:"tabs-toolbar-layout__tabbar",children:e.renderTabbar}),(0,n.jsx)("div",{className:"tabs-toolbar-layout__toolbar",children:e.renderToolbar})]})}},94730:function(e,t,a){a.d(t,{T:()=>L});var n=a(85893),i=a(81004);let l=(0,a(29202).createStyles)(e=>{let{token:t,css:a}=e;return{editorTabsContainer:a`
      width: 100%;
    `,editorTabs:a`
      height: 100%;
      width: 100%;
      overflow: hidden;

      .ant-tabs-content {
        display: flex;
        height: 100%;
      }
      
      &.ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab {
        margin: 0 ${t.paddingXS}px !important;
        transition: color .2s;

        display: flex;
        height: 32px;
      }

      .ant-tabs-tabpane {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
      }

      .ant-tabs-content-holder {
        overflow: auto;
      }
      &.ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: ${t.colorPrimaryActive}
      }
      &.ant-tabs-top >.ant-tabs-nav {
        margin-bottom: 0;
        padding-right: ${t.paddingXXS}px;
          
        .ant-tabs-nav-wrap {
          display: flex;
          justify-content: flex-end;
            
          .ant-tabs-nav-list {
            display: flex;
            align-items: center;
          }
        }
      }

      &.ant-tabs .ant-tabs-tab-btn .ant-tabs-tab-icon:not(:last-child) {
        margin-inline-end: 0;
      }
      
      &.ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab {
        padding: 0;
        
        &:first-of-type {
            margin-left: ${t.paddingSM}px;
            margin-right: ${t.paddingSM}px;
        }
        
        .ant-tabs-tab-btn {
          display: flex;
          padding-top: ${t.paddingXS}px;
          padding-bottom: ${t.paddingXS}px;
          justify-content: center;
          align-items: center;
          gap: ${t.paddingTabs}px;
          
          .ant-tabs-tab-icon {
            height: 16px;
            display: flex;
            justify-content: center;
            align-content: center;
            margin-inline-end: 0;
            color: ${t.Tabs.itemUnselectedIconColor};
            
            svg {
              height: 16px;
              width: 16px
            }
          }
        }
          
        .detachable-button {
          display: none;
          color: ${t.Tabs.itemUnselectedIconColor};
          height: ${t.controlHeightSM}px;
          width: ${t.controlHeightSM}px;
        }

        &:not(.ant-tabs-tab-active) {
          .ant-tabs-tab-icon {
            &:hover {
                color: ${t.colorIconHover};
            }
          }
        }
        
        &.ant-tabs-tab-active  {
          .ant-tabs-tab-icon {
              color: ${t.colorPrimaryActive}
          }

          .detachable-button {
            display: flex;
            color: ${t.colorPrimary};
          }
        }
      }
    `,onlyActiveLabel:a`
      .ant-tabs-tab:not(.ant-tabs-tab-active) {
          span:nth-child(2) {
              display: none;
          }

          .ant-tabs-tab-icon {
              margin-inline-end: 0;
          }
      }

      @keyframes fadeIn {
          from {
              opacity: 0;
          }

          to {
              opacity: 1;
          }
      }

      .ant-tabs-tab.ant-tabs-tab-active {
          //border-bottom: 3px solid ${t.colorPrimaryActive};
      }
    `}},{hashPriority:"low"});var o=a(26788),r=a(58793),d=a.n(r),s=a(81354),c=a(45628),b=a.n(c),u=a(80054);let p=()=>{let{openBottomWidget:e}=(0,s.A)(),t=(0,u.O)();return{detachWidget:a=>{let{tabKey:n,config:i={}}=a,l=t.getTab(n);void 0!==l&&e({name:b().t(String(l.label)),id:`${n}-detached`,component:"detachable-tab",config:{...i,icon:l.icon.props,tabKey:n}})}}};var h=a(57732);let v=e=>{let{tabKey:t,activeTabKey:a,tabKeyInFocus:l,tabKeyOutOfFocus:r,title:d,children:s}=e,[c,b]=(0,i.useState)(null);return(0,i.useEffect)(()=>{void 0!==l&&b(l)},[l]),(0,i.useEffect)(()=>{void 0!==r&&r===c&&b(null)},[r]),(0,n.jsx)(o.Tooltip,{open:c===t&&a!==t,placement:"top",title:d,children:(0,n.jsx)("div",{onMouseEnter:()=>{b(t)},onMouseLeave:()=>{b(null)},children:s})})};var g=a(35015),f=a(51776),m=a(97473),x=a(62588),y=a(35950),j=a(84666),w=a(84901);let k=e=>{let{defaultActiveKey:t,showLabelIfActive:a,items:r}=e,{styles:s}=l(),{detachWidget:c}=p(),{id:b,elementType:u}=(0,g.i)(),{activeTab:k,setActiveTab:T}=(0,m.q)(b,u),[S,I]=(0,i.useState)(void 0),[L,C]=(0,i.useState)(void 0),$=(0,m.q)(b,u).element,A=(0,i.useRef)(null),P=(0,f.Z)(A);(0,i.useEffect)(()=>{null===k&&(null==r?void 0:r.length)>0&&T(r[0].key)},[r]);let M=null==r?void 0:r.map(e=>e.key),_=e=>{let t=e.target.id;return M.find(e=>t.includes(e))},O=e=>{c(e),(null==r?void 0:r.length)>0&&T(r[0].key)};return r=null==(r=r.filter(e=>!(void 0!==e.hidden&&e.hidden($))&&(void 0===e.workspacePermission||(null==$?void 0:$.permissions)===void 0||!!(0,x.x)($.permissions,e.workspacePermission))&&(void 0===e.userPermission||!!(0,y.y)(e.userPermission))))?void 0:r.map(e=>{let t={...e,originalLabel:e.label,icon:(0,n.jsx)(v,{activeTabKey:k,tabKey:e.key,tabKeyInFocus:S,tabKeyOutOfFocus:L,title:e.label,children:e.icon})};return!0===t.isDetachable&&(t.label=(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{children:t.label}),(0,n.jsx)(j.h,{className:"detachable-button",icon:{value:"share"},onClick:t=>{t.stopPropagation(),O({tabKey:e.key})},type:"link"})]})),t}),(0,n.jsx)("div",{className:s.editorTabsContainer,ref:A,children:(0,n.jsx)(o.Tabs,{activeKey:k??void 0,className:d()(s.editorTabs,{[s.onlyActiveLabel]:a}),defaultActiveKey:t,items:r,onBlur:e=>{C(_(e))},onFocus:e=>{I(_(e))},onTabClick:e=>{T(e)},tabBarExtraContent:{left:(0,n.jsx)(w.x,{padding:{left:"extra-small",top:"extra-small",bottom:"extra-small"},children:(0,n.jsx)(h.U,{editorTabsWidth:P,elementType:u,id:b})})}})})};var T=a(71695),S=a(80380),I=a(59255);let L=e=>{let{elementEditorType:t}=e,{t:a}=(0,T.useTranslation)(),i=(0,S.$1)(t.tabManagerServiceId),{id:l,elementType:o}=(0,g.i)(),{element:r}=(0,m.q)(l,o),d=i.getTabs(),s=d.map((e,t)=>{let n={...d[t],label:"string"==typeof e.label?a(e.label):e.label};return"workflow"===e.key?{...n,hidden:()=>(null==r?void 0:r.hasWorkflowAvailable)===!1||(null==r?void 0:r.hasWorkflowAvailable)===void 0}:n});return(0,n.jsx)(I.d,{tabManager:i,children:(0,n.jsx)(k,{defaultActiveKey:"1",items:s,showLabelIfActive:!0})})}},61949:function(e,t,a){a.d(t,{Q:()=>r});var n=a(40483),i=a(98482),l=a(81004),o=a(19505);let r=()=>{let e=(0,n.useAppSelector)(i.u6),t=(0,l.useContext)(o.M);return null!==e&&e.nodeId===t.nodeId}}}]);