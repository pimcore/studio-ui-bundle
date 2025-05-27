/*! For license information please see __federation_expose_modules__data_object.16775412.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["85"],{51776:function(e,t,a){a.d(t,{Z:()=>o});var n=a(81004);let o=e=>{let[t,a]=(0,n.useState)(0);return(0,n.useLayoutEffect)(()=>{var t;a((null==(t=e.current)?void 0:t.getBoundingClientRect().width)??0)},[]),(0,n.useEffect)(()=>{if(null==e.current)return;let t=new ResizeObserver(e=>{let[t]=e,n=t.contentRect.width;a(e=>0!==n&&e!==n?n:e)});return t.observe(e.current),()=>{t.disconnect()}},[e]),t}},37793:function(e,t,a){a.r(t),a.d(t,{useDraftDataReducers:()=>O.ZF,SaveTaskType:()=>y.R,useQuantityValueUnits:()=>E.useQuantityValueUnits,resetDataObject:()=>D.tl,useCustomLayouts:()=>T.useCustomLayouts,useDeleteDraft:()=>x.useDeleteDraft,useAddObject:()=>j,addPropertyToDataObject:()=>D.pl,removePropertyFromDataObject:()=>D.BS,updatePropertyForDataObject:()=>D.O$,useLanguageSelection:()=>X.useLanguageSelection,setModifiedCells:()=>D.Zr,LanguageSelectionContext:()=>N.c,setActiveTabForDataObject:()=>D.P8,removeScheduleFromDataObject:()=>D.e$,addScheduleToDataObject:()=>D.SZ,LanguageSelectionProvider:()=>N.O,setPropertiesForDataObject:()=>D.Hj,setSchedulesForDataObject:()=>D.dx,setDraftData:()=>D.Bs,DataObjectEditorWidget:()=>ek,useModifiedObjectDataReducers:()=>w.K,useSave:()=>y.useSave,IS_AUTO_SAVE_DRAFT_CREATED:()=>O.hD,dataObjectsAdapter:()=>D.AX,elementTypes:()=>P.a,removeDataObject:()=>D.cB,markObjectDataAsModified:()=>D.X1,useModifiedObjectDataDraft:()=>w.n,LanguageSelection:()=>_.k,useDataObjectHelper:()=>g.useDataObjectHelper,resetChanges:()=>D.sf,unpublishDraft:()=>D.pA,FolderTabManager:()=>F,useDataObject:()=>k,useDataObjectDraft:()=>S.useDataObjectDraft,useDraftDataDraft:()=>O.M,publishDraft:()=>D.oi,ObjectTabManager:()=>I,updateScheduleForDataObject:()=>D.lM,slice:()=>D.tP,updateKey:()=>D.a9,dataObjectReceived:()=>D.C9,useGlobalDataObjectContext:()=>A.useGlobalDataObjectContext,selectDataObjectById:()=>D.V8,resetSchedulesChangesForDataObject:()=>D.bI});var n=a(85893),o=a(46309),i=a(94374),l=a(55859),r=a(38119),s=a(66660),d=a(62588),c=a(11093),b=a(51469),u=a(96486),p=a(81004),h=a(74976),f=a(54626),g=a(54658),m=a(71125),v=a(23526);let j=()=>{let{t:e}=(0,h.useTranslation)(),t=(0,r.useFormModal)(),[a]=(0,f.Fg)(),p=(0,o.TL)(),{openDataObject:j}=(0,g.useDataObjectHelper)(),{isTreeActionAllowed:x}=(0,c.useTreePermission)(),{getClassDefinitionsForCurrentUser:y}=(0,m.useClassDefinitions)(),D=t=>{let a=[],o=[...y()].sort((e,t)=>e.name.localeCompare(t.name)).reduce((e,t)=>{let a=(0,u.isEmpty)(t.group)?"undefined":t.group;return void 0===e[a]&&(e[a]=[]),e[a].push(t),e},{});for(let[i,r]of(void 0!==o.undefined&&(a=o.undefined.map(e=>O(e,t))),Object.entries(o)))"undefined"!==i&&a.push({label:e(i),key:"add-object-group-"+i,icon:(0,n.jsx)(l.J,{value:"folder"}),children:r.map(e=>O(e,t))});return a},O=(t,a)=>({label:e(t.name),key:t.id,icon:"class"===t.icon.value?(0,n.jsx)(l.J,{subIconName:"new",subIconVariant:"green",value:"data-object"}):(0,n.jsx)(l.J,{subIconName:"new",subIconVariant:"green",...t.icon}),onClick:()=>{w(t,parseInt(a.id))}}),w=(a,n,o)=>{t.input({title:e("data-object.create-data-object",{className:a.name}),label:e("form.label.new-item"),rule:{required:!0,message:e("form.validation.required")},onOk:async e=>{await T(a.id,e,n),null==o||o(e)}})},T=async(e,t,n)=>{let o=a({parentId:n,dataObjectAddParameters:{key:t,classId:e,type:"object"}});try{let e=await o;if(void 0!==e.error)return void(0,s.ZP)(new s.MS(e.error));let{id:t}=e.data;j({config:{id:t}}),p((0,i.D9)({nodeId:String(n),elementType:"data-object"}))}catch(e){(0,s.ZP)(new s.aE("Error creating data object"))}},C=e=>!x(b.W.Add)||!(0,d.x)(e.permissions,"create")||(0,u.isEmpty)(y());return{addObjectTreeContextMenuItem:t=>({label:e("data-object.tree.context-menu.add-object"),key:v.N.addObject,icon:(0,n.jsx)(l.J,{value:"folder"}),hidden:C(t),children:D(t)})}};var x=a(10186),y=a(98319),D=a(84475),O=a(88983),w=a(74152),T=a(88087),C=a(68922);let k=()=>{let{id:e}=(0,p.useContext)(C.f);return{id:e}};var S=a(90165),A=a(29981),E=a(63738),P=a(28590),M=a(28395),L=a(5554),$=a(60476);class F extends L.A{constructor(){super(),this.type="folder"}}F=(0,M.gn)([(0,$.injectable)(),(0,M.w6)("design:type",Function),(0,M.w6)("design:paramtypes",[])],F);class I extends L.A{constructor(){super(),this.type="object"}}I=(0,M.gn)([(0,$.injectable)(),(0,M.w6)("design:type",Function),(0,M.w6)("design:paramtypes",[])],I);var _=a(44171),N=a(51791),X=a(64235),K=a(98482),R=a(19505);let V=()=>{let e=(0,o.CG)(K.u6),t=(0,p.useContext)(R.M);return null!==e&&e.nodeId===t.nodeId};var Z=a(77476),B=a(10781);let H=(0,B.kc)(e=>{let{token:t,css:a}=e;return{editorTabsContainer:a`
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
    `}},{hashPriority:"low"});var U=a(26788),W=a(63387),G=a.n(W),J=a(81354),z=a(20994),q=a(80054);let Q=()=>{let{openBottomWidget:e}=(0,J.useWidgetManager)(),t=(0,q.O)();return{detachWidget:a=>{let{tabKey:n,config:o={}}=a,i=t.getTab(n);void 0!==i&&e({name:z.ZP.t(String(i.label)),id:`${n}-detached`,component:"detachable-tab",config:{...o,icon:i.icon.props,tabKey:n}})}}};var Y=a(57732);let ee=e=>{let{tabKey:t,activeTabKey:a,tabKeyInFocus:o,tabKeyOutOfFocus:i,title:l,children:r}=e,[s,d]=(0,p.useState)(null);return(0,p.useEffect)(()=>{void 0!==o&&d(o)},[o]),(0,p.useEffect)(()=>{void 0!==i&&i===s&&d(null)},[i]),(0,n.jsx)(U.Tooltip,{open:s===t&&a!==t,placement:"top",title:l,children:(0,n.jsx)("div",{onMouseEnter:()=>{d(t)},onMouseLeave:()=>{d(null)},children:r})})};var et=a(61813),ea=a(51776),en=a(95461),eo=a(35950),ei=a(84666),el=a(84901);let er=e=>{let{defaultActiveKey:t,showLabelIfActive:a,items:o}=e,{styles:i}=H(),{detachWidget:l}=Q(),{id:r,elementType:s}=(0,et.useElementContext)(),{activeTab:c,setActiveTab:b}=(0,en.useElementDraft)(r,s),[u,h]=(0,p.useState)(void 0),[f,g]=(0,p.useState)(void 0),m=(0,en.useElementDraft)(r,s).element,v=(0,p.useRef)(null),j=(0,ea.Z)(v);(0,p.useEffect)(()=>{null===c&&(null==o?void 0:o.length)>0&&b(o[0].key)},[o]);let x=null==o?void 0:o.map(e=>e.key),y=e=>{let t=e.target.id;return x.find(e=>t.includes(e))},D=e=>{l(e),(null==o?void 0:o.length)>0&&b(o[0].key)};return o=null==(o=o.filter(e=>!(void 0!==e.hidden&&e.hidden(m))&&(void 0===e.workspacePermission||(null==m?void 0:m.permissions)===void 0||!!(0,d.x)(m.permissions,e.workspacePermission))&&(void 0===e.userPermission||!!(0,eo.y)(e.userPermission))))?void 0:o.map(e=>{let t={...e,originalLabel:e.label,icon:(0,n.jsx)(ee,{activeTabKey:c,tabKey:e.key,tabKeyInFocus:u,tabKeyOutOfFocus:f,title:e.label,children:e.icon})};return!0===t.isDetachable&&(t.label=(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{children:t.label}),(0,n.jsx)(ei.h,{className:"detachable-button",icon:{value:"share"},onClick:t=>{t.stopPropagation(),D({tabKey:e.key})},type:"link"})]})),t}),(0,n.jsx)("div",{className:i.editorTabsContainer,ref:v,children:(0,n.jsx)(U.Tabs,{activeKey:c??void 0,className:G()(i.editorTabs,{[i.onlyActiveLabel]:a}),defaultActiveKey:t,items:o,onBlur:e=>{g(y(e))},onFocus:e=>{h(y(e))},onTabClick:e=>{b(e)},tabBarExtraContent:{left:(0,n.jsx)(el.x,{padding:{left:"extra-small",top:"extra-small",bottom:"extra-small"},children:(0,n.jsx)(Y.U,{editorTabsWidth:j,elementType:s,id:r})})}})})};var es=a(80380),ed=a(59255);let ec=e=>{let{elementEditorType:t}=e,{t:a}=(0,h.useTranslation)(),o=(0,es.$1)(t.tabManagerServiceId),{id:i,elementType:l}=(0,et.useElementContext)(),{element:r}=(0,en.useElementDraft)(i,l),s=o.getTabs(),d=s.map((e,t)=>{let n={...s[t],label:"string"==typeof e.label?a(e.label):e.label};return"workflow"===e.key?{...n,hidden:()=>(null==r?void 0:r.hasWorkflowAvailable)===!1||(null==r?void 0:r.hasWorkflowAvailable)===void 0}:n});return(0,n.jsx)(ed.d,{tabManager:o,children:(0,n.jsx)(er,{defaultActiveKey:"1",items:d,showLabelIfActive:!0})})};var eb=a(47755),eu=a(68686),ep=a(3129),eh=a(12174),ef=a(54416),eg=a(27614);let em=()=>(0,n.jsx)(eb.o,{children:(0,n.jsxs)(eh.v,{children:[(0,n.jsx)(eu.k,{children:(0,n.jsx)(eg.O,{slot:ef.O.dataObject.editor.toolbar.slots.left})}),(0,n.jsx)(eu.k,{align:"center",gap:"extra-small",style:{height:"32px"},vertical:!1,children:(0,n.jsx)(eg.O,{slot:ef.O.dataObject.editor.toolbar.slots.right})}),(0,n.jsx)(ep.L,{})]})}),ev=(0,B.kc)(e=>{let{token:t,css:a}=e;return{tabbarToolbar:a`
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
    `}},{hashPriority:"low"}),ej=e=>{let{styles:t}=ev();return(0,n.jsxs)("div",{className:["tabs-toolbar-layout",t.tabbarToolbar].join(" "),children:[(0,n.jsx)("div",{className:"tabs-toolbar-layout__tabbar",children:e.renderTabbar}),(0,n.jsx)("div",{className:"tabs-toolbar-layout__toolbar",children:e.renderToolbar})]})};var ex=a(18639),ey=a(70774),eD=a(11773),eO=a(36414);let ew=e=>{let{id:t}=e,{isLoading:a,isError:o,dataObject:i,editorType:l}=(0,S.useDataObjectDraft)(t),r=V(),{setContext:s,removeContext:d}=(0,A.useGlobalDataObjectContext)();return((0,p.useEffect)(()=>()=>{d()},[]),(0,p.useEffect)(()=>(r&&s({id:t}),()=>{r||d()}),[r]),a)?(0,n.jsx)(Z.V,{loading:!0}):o?(0,n.jsx)(Z.V,{padded:!0,children:(0,n.jsx)(eO.b,{message:"Error: Loading of data object failed",type:"error"})}):void 0===i||void 0===l?(0,n.jsx)(n.Fragment,{}):(0,n.jsx)(C.g,{id:t,children:(0,n.jsx)(eD.U,{children:(0,n.jsx)(ex.L,{children:(0,n.jsx)(ey.k,{children:(0,n.jsx)(N.O,{children:(0,n.jsx)(ej,{renderTabbar:(0,n.jsx)(ec,{elementEditorType:l}),renderToolbar:(0,n.jsx)(em,{})})})})})})})};var eT=a(44158),eC=a(92430);let ek={name:"data-object-editor",component:e=>{let{id:t}=e,{getDefaultLayoutId:a,isLoading:o}=(0,T.useCustomLayouts)(t);return(0,n.jsx)(eT.M,{defaultLayout:a(),isLoading:o,children:(0,n.jsx)(ew,{id:t})})},titleComponent:e=>{let{node:t}=e,{dataObject:a}=(0,S.useDataObjectDraft)(t.getConfig().id),{t:o}=(0,h.useTranslation)(),i=t.getName();return t.getName=()=>((null==a?void 0:a.parentId)===0&&(t.getName=()=>o("home")),(null==a?void 0:a.key)??i),(0,n.jsx)(eC.X,{modified:(null==a?void 0:a.modified)??!1,node:t})},isModified:e=>{let t=e.getConfig(),a=(0,D.V8)(o.store.getState(),t.id);return(null==a?void 0:a.modified)??!1},getContextProvider:(e,t)=>{let a=e.config;return(0,n.jsx)(C.g,{id:a.id,children:t})}}}}]);