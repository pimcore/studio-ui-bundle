/*! For license information please see __federation_expose_modules__data_object.f749777e.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["1085"],{66490:function(e,t,a){a.d(t,{x:()=>m});var n=a(85893),i=a(40483),o=a(94374),l=a(55859),r=a(38119),d=a(81343),s=a(62588),c=a(24861),b=a(51469),u=a(53478);a(81004);var p=a(71695),g=a(54626),h=a(54658),v=a(71125),f=a(23526);let m=()=>{let{t:e}=(0,p.useTranslation)(),t=(0,r.U8)(),[a]=(0,g.Fg)(),m=(0,i.useAppDispatch)(),{openDataObject:j}=(0,h.n)(),{isTreeActionAllowed:x}=(0,c._)(),{getClassDefinitionsForCurrentUser:y}=(0,v.C)(),O=(t,a)=>({label:e(t.name),key:t.id,icon:"class"===t.icon.value?(0,n.jsx)(l.J,{subIconName:"new",subIconVariant:"green",value:"data-object"}):(0,n.jsx)(l.J,{subIconName:"new",subIconVariant:"green",...t.icon}),onClick:()=>{T(t,parseInt(a.id))}}),T=(a,n,i)=>{t.input({title:e("data-object.create-data-object",{className:a.name}),label:e("form.label.new-item"),rule:{required:!0,message:e("form.validation.required")},onOk:async e=>{await w(a.id,e,n),null==i||i(e)}})},w=async(e,t,n)=>{let i=a({parentId:n,dataObjectAddParameters:{key:t,classId:e,type:"object"}});try{let e=await i;if(void 0!==e.error)return void(0,d.ZP)(new d.MS(e.error));let{id:t}=e.data;j({config:{id:t}}),m((0,o.D9)({nodeId:String(n),elementType:"data-object"}))}catch(e){(0,d.ZP)(new d.aE("Error creating data object"))}};return{addObjectTreeContextMenuItem:t=>({label:e("data-object.tree.context-menu.add-object"),key:f.N.addObject,icon:(0,n.jsx)(l.J,{value:"folder"}),hidden:!x(b.W.Add)||!(0,s.x)(t.permissions,"create")||(0,u.isEmpty)(y()),children:(t=>{let a=[],i=[...y()].sort((e,t)=>e.name.localeCompare(t.name)).reduce((e,t)=>{let a=(0,u.isNil)(t.group)||(0,u.isEmpty)(t.group)?"undefined":t.group;return void 0===e[a]&&(e[a]=[]),e[a].push(t),e},{});for(let[o,r]of(void 0!==i.undefined&&(a=i.undefined.map(e=>O(e,t))),Object.entries(i)))"undefined"!==o&&a.push({label:e(o),key:"add-object-group-"+o,icon:(0,n.jsx)(l.J,{value:"folder"}),children:r.map(e=>O(e,t))});return a})(t)})}}},44158:function(e,t,a){a.d(t,{M:()=>r,g:()=>l});var n=a(85893),i=a(81004),o=a(77476);let l=(0,i.createContext)({currentLayout:null,setCurrentLayout:()=>{}}),r=e=>{let{children:t,defaultLayout:a,isLoading:r}=e,[d,s]=(0,i.useState)(a);(0,i.useEffect)(()=>{null===d&&null!==a&&s(a)},[a]);let c=(0,i.useMemo)(()=>({currentLayout:d,setCurrentLayout:s}),[d]);return(0,n.jsx)(l.Provider,{value:c,children:r?(0,n.jsx)(o.V,{loading:!0}):t})}},44171:function(e,t,a){a.d(t,{k:()=>r});var n=a(85893),i=a(43418),o=a(50444);a(81004);var l=a(64235);let r=()=>{let e=(0,o.r)(),{currentLanguage:t,setCurrentLanguage:a,hasLocalizedFields:r}=(0,l.X)();return r?(0,n.jsx)(i.k,{languages:[...e.requiredLanguages],onSelectLanguage:a,selectedLanguage:t}):(0,n.jsx)(n.Fragment,{})}},98139:function(e,t,a){a.d(t,{F:()=>l});var n=a(28395),i=a(5554),o=a(60476);class l extends i.A{constructor(){super(),this.type="object"}}l=(0,n.gn)([(0,o.injectable)(),(0,n.w6)("design:type",Function),(0,n.w6)("design:paramtypes",[])],l)},17155:function(e,t,a){a.d(t,{_:()=>P});var n=a(85893),i=a(81004),o=a(61949),l=a(68922),r=a(77476),d=a(90165),s=a(29981),c=a(94730),b=a(47755),u=a(68686),p=a(3129),g=a(12174),h=a(70793),v=a(27614);let f=()=>(0,n.jsx)(b.o,{children:(0,n.jsxs)(g.v,{children:[(0,n.jsx)(u.k,{children:(0,n.jsx)(v.O,{slot:h.O.dataObject.editor.toolbar.slots.left.name})}),(0,n.jsx)(u.k,{align:"center",gap:"extra-small",style:{height:"32px"},vertical:!1,children:(0,n.jsx)(v.O,{slot:h.O.dataObject.editor.toolbar.slots.right.name})}),(0,n.jsx)(p.L,{})]})});var m=a(9901),j=a(51791),x=a(18639),y=a(70774),O=a(11773),T=a(36414),w=a(46376);let S=e=>{let{id:t}=e,{isLoading:a,isError:b,dataObject:u,editorType:p}=(0,d.H)(t),g=(0,o.Q)(),{setContext:h,removeContext:v}=(0,s.J)();return((0,i.useEffect)(()=>()=>{v()},[]),(0,i.useEffect)(()=>(g&&h({id:t}),()=>{g||v()}),[g]),a)?(0,n.jsx)(r.V,{loading:!0}):b?(0,n.jsx)(r.V,{padded:!0,children:(0,n.jsx)(T.b,{message:"Error: Loading of data object failed",type:"error"})}):void 0===u||void 0===p?(0,n.jsx)(n.Fragment,{}):(0,n.jsx)(l.g,{id:t,children:(0,n.jsx)(O.U,{children:(0,n.jsx)(x.L,{children:(0,n.jsx)(y.k,{children:(0,n.jsx)(j.O,{children:(0,n.jsx)(m.S,{dataTestId:`data-object-editor-${(0,w.rR)(t.toString())}`,renderTabbar:(0,n.jsx)(c.T,{elementEditorType:p}),renderToolbar:(0,n.jsx)(f,{})})})})})})})};var k=a(88087),D=a(44158),C=a(92430),L=a(71695),I=a(46309),A=a(84475);let P={name:"data-object-editor",component:e=>{let{id:t}=e,{getDefaultLayoutId:a,isLoading:i}=(0,k.z)(t);return(0,n.jsx)(D.M,{defaultLayout:a(),isLoading:i,children:(0,n.jsx)(S,{id:t})})},titleComponent:e=>{let{node:t}=e,{dataObject:a}=(0,d.H)(t.getConfig().id),{t:i}=(0,L.useTranslation)(),o=t.getName();return t.getName=()=>((null==a?void 0:a.parentId)===0&&(t.getName=()=>i("home")),(null==a?void 0:a.key)??o),(0,n.jsx)(C.X,{modified:(null==a?void 0:a.modified)??!1,node:t})},isModified:e=>{let t=e.getConfig(),a=(0,A.V8)(I.h.getState(),t.id);return(null==a?void 0:a.modified)??!1},getContextProvider:(e,t)=>{let a=e.config;return(0,n.jsx)(l.g,{id:a.id,children:t})}}},88087:function(e,t,a){a.d(t,{z:()=>d});var n=a(90165),i=a(18962),o=a(81343),l=a(53478),r=a(47666);let d=e=>{let{dataObject:t,isLoading:a}=(0,n.H)(e),{data:d,error:s,isLoading:c}=(0,i.ih)({objectId:e},{skip:void 0===t||"folder"===t.type});void 0!==s&&(0,o.ZP)(new o.MS(s));let b=void 0!==d?d.items:void 0,u=(null==t?void 0:t.hasWorkflowAvailable)===!0,{data:p,isFetching:g}=(0,r.d)({elementType:"data-object",elementId:e},{skip:!u});return{layouts:b,getDefaultLayoutId:e=>{if((0,l.isUndefined)(b))return null;let t=b.find(e=>e.default)??b.find(t=>t.id===e)??b.find(e=>e.id===(null==p?void 0:p.layoutId))??b.find(e=>"0"===e.id)??b[0]??null;return(null==t?void 0:t.id)??null},isLoading:a||g||c&&(null==t?void 0:t.type)!=="folder"}}},9901:function(e,t,a){a.d(t,{S:()=>o});var n=a(85893);a(81004);let i=(0,a(29202).createStyles)(e=>{let{token:t,css:a}=e;return{tabbarToolbar:a`
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
    `}},{hashPriority:"low"}),o=e=>{let{styles:t}=i();return(0,n.jsxs)("div",{className:["tabs-toolbar-layout",t.tabbarToolbar].join(" "),"data-testid":e.dataTestId,children:[(0,n.jsx)("div",{className:"tabs-toolbar-layout__tabbar",children:e.renderTabbar}),(0,n.jsx)("div",{className:"tabs-toolbar-layout__toolbar",children:e.renderToolbar})]})}},94730:function(e,t,a){a.d(t,{T:()=>k});var n=a(85893),i=a(81004);let o=(0,a(29202).createStyles)(e=>{let{token:t,css:a}=e;return{editorTabsContainer:a`
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
    `}},{hashPriority:"low"});var l=a(26788),r=a(58793),d=a.n(r),s=a(81354),c=a(45628),b=a.n(c),u=a(80054),p=a(57732);let g=e=>{let{tabKey:t,activeTabKey:a,tabKeyInFocus:o,tabKeyOutOfFocus:r,title:d,children:s}=e,[c,b]=(0,i.useState)(null);return(0,i.useEffect)(()=>{void 0!==o&&b(o)},[o]),(0,i.useEffect)(()=>{void 0!==r&&r===c&&b(null)},[r]),(0,n.jsx)(l.Tooltip,{open:c===t&&a!==t,placement:"top",title:d,children:(0,n.jsx)("div",{onMouseEnter:()=>{b(t)},onMouseLeave:()=>{b(null)},children:s})})};var h=a(35015),v=a(51776),f=a(97473),m=a(62588),j=a(35950),x=a(84666),y=a(84901);let O=e=>{let{defaultActiveKey:t,showLabelIfActive:a,items:r}=e,{styles:c}=o(),{detachWidget:O}=(()=>{let{openBottomWidget:e}=(0,s.A)(),t=(0,u.O)();return{detachWidget:a=>{let{tabKey:n,config:i={}}=a,o=t.getTab(n);void 0!==o&&e({name:b().t(String(o.label)),id:`${n}-detached`,component:"detachable-tab",config:{...i,icon:o.icon.props,tabKey:n}})}}})(),{id:T,elementType:w}=(0,h.i)(),{activeTab:S,setActiveTab:k}=(0,f.q)(T,w),[D,C]=(0,i.useState)(void 0),[L,I]=(0,i.useState)(void 0),A=(0,f.q)(T,w).element,P=(0,i.useRef)(null),M=(0,v.Z)(P);(0,i.useEffect)(()=>{null===S&&(null==r?void 0:r.length)>0&&k(r[0].key)},[r]);let $=null==r?void 0:r.map(e=>e.key),F=e=>{let t=e.target.id;return $.find(e=>t.includes(e))};return r=null==(r=r.filter(e=>!(void 0!==e.hidden&&e.hidden(A))&&(void 0===e.workspacePermission||(null==A?void 0:A.permissions)===void 0||!!(0,m.x)(A.permissions,e.workspacePermission))&&(void 0===e.userPermission||!!(0,j.y)(e.userPermission))))?void 0:r.map(e=>{let t={...e,originalLabel:e.label,icon:(0,n.jsx)(g,{activeTabKey:S,tabKey:e.key,tabKeyInFocus:D,tabKeyOutOfFocus:L,title:e.label,children:e.icon})};return!0===t.isDetachable&&(t.label=(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{children:t.label}),(0,n.jsx)(x.h,{className:"detachable-button",icon:{value:"share"},onClick:t=>{t.stopPropagation(),O({tabKey:e.key}),(null==r?void 0:r.length)>0&&k(r[0].key)},type:"link"})]})),t}),(0,n.jsx)("div",{className:c.editorTabsContainer,ref:P,children:(0,n.jsx)(l.Tabs,{activeKey:S??void 0,className:d()(c.editorTabs,{[c.onlyActiveLabel]:a}),defaultActiveKey:t,items:r,onBlur:e=>{I(F(e))},onFocus:e=>{C(F(e))},onTabClick:e=>{k(e)},tabBarExtraContent:{left:(0,n.jsx)(y.x,{padding:{left:"extra-small",top:"extra-small",bottom:"extra-small"},children:(0,n.jsx)(p.U,{editorTabsWidth:M,elementType:w,id:T})})}})})};var T=a(71695),w=a(80380),S=a(59255);let k=e=>{let{elementEditorType:t}=e,{t:a}=(0,T.useTranslation)(),i=(0,w.$1)(t.tabManagerServiceId),{id:o,elementType:l}=(0,h.i)(),{element:r}=(0,f.q)(o,l),d=i.getTabs(),s=d.map((e,t)=>{let n={...d[t],label:"string"==typeof e.label?a(e.label):e.label};return"workflow"===e.key?{...n,hidden:()=>(null==r?void 0:r.hasWorkflowAvailable)===!1||(null==r?void 0:r.hasWorkflowAvailable)===void 0}:n});return(0,n.jsx)(S.d,{tabManager:i,children:(0,n.jsx)(O,{defaultActiveKey:"1",items:s,showLabelIfActive:!0})})}},61949:function(e,t,a){a.d(t,{Q:()=>r});var n=a(40483),i=a(98482),o=a(81004),l=a(19505);let r=()=>{let e=(0,n.useAppSelector)(i.u6),t=(0,o.useContext)(l.M);return null!==e&&e.nodeId===t.nodeId}},41237:function(e,t,a){a.r(t),a.d(t,{elementTypes:()=>h.a,addScheduleToDataObject:()=>o.SZ,slice:()=>o.tP,FolderTabManager:()=>j,resetDataObject:()=>o.tl,ObjectTabManager:()=>x.F,useLanguageSelection:()=>T.X,setSchedulesForDataObject:()=>o.dx,SaveTaskType:()=>i.R,useDataObject:()=>c,setPropertiesForDataObject:()=>o.Hj,updateScheduleForDataObject:()=>o.lM,LanguageSelectionProvider:()=>O.O,publishDraft:()=>o.oi,removePropertyFromDataObject:()=>o.BS,addPropertyToDataObject:()=>o.pl,markObjectDataAsModified:()=>o.X1,removeScheduleFromDataObject:()=>o.e$,setActiveTabForDataObject:()=>o.P8,dataObjectsAdapter:()=>o.AX,useDataObjectDraft:()=>b.H,useDataObjectHelper:()=>u.n,useCustomLayouts:()=>r.z,LanguageSelection:()=>y.k,dataObjectReceived:()=>o.C9,useGlobalDataObjectContext:()=>p.J,updatePropertyForDataObject:()=>o.O$,DataObjectEditorWidget:()=>w._,removeDataObject:()=>o.cB,useModifiedObjectDataDraft:()=>l.n,useModifiedObjectDataReducers:()=>l.K,useQuantityValueUnits:()=>g.T,useSave:()=>i.O,setDraftData:()=>o.Bs,resetSchedulesChangesForDataObject:()=>o.bI,selectDataObjectById:()=>o.V8,setModifiedCells:()=>o.Zr,updateKey:()=>o.a9,useAddObject:()=>n.x,LanguageSelectionContext:()=>O.c,unpublishDraft:()=>o.pA,resetChanges:()=>o.sf});var n=a(66490),i=a(98319),o=a(84475),l=a(74152),r=a(88087),d=a(81004),s=a(68922);let c=()=>{let{id:e}=(0,d.useContext)(s.f);return{id:e}};var b=a(90165),u=a(54658),p=a(29981),g=a(63738),h=a(28590),v=a(28395),f=a(5554),m=a(60476);class j extends f.A{constructor(){super(),this.type="folder"}}j=(0,v.gn)([(0,m.injectable)(),(0,v.w6)("design:type",Function),(0,v.w6)("design:paramtypes",[])],j);var x=a(98139),y=a(44171),O=a(51791),T=a(64235),w=a(17155);void 0!==(e=a.hmd(e)).hot&&e.hot.accept()}}]);