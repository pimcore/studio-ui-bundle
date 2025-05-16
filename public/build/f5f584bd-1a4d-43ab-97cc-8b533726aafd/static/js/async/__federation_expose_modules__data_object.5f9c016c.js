/*! For license information please see __federation_expose_modules__data_object.5f9c016c.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["85"],{20085:function(e,t,a){a.d(t,{_F:()=>l,_z:()=>r,qX:()=>o});var n=a(46309);let i=(0,a(94226).oM)({name:"global-context",initialState:[],reducers:{addGlobalContext:(e,t)=>{e.push(t.payload)},removeGlobalContext:(e,t)=>e.filter(e=>e.type!==t.payload)},selectors:{selectContextByType:(e,t)=>e.find(e=>e.type===t)}});(0,n.fz)(i);let{addGlobalContext:r,removeGlobalContext:o}=i.actions,{selectContextByType:l}=i.getSelectors(e=>e["global-context"])},3129:function(e,t,a){a.d(t,{L:()=>v});var n=a(85893);a(81034);var i=a(59072),r=a(84420),o=a(25560),l=a(68686),s=a(88822),d=a(97686),c=a(72551),u=a(5708),b=a(20994),p=a(98244);let v=()=>{let{isModalOpen:e,closeModal:t,contextWorkflowDetails:a}=(0,d.D)(),[v]=c.l.useForm(),{submitWorkflowAction:m}=(0,p.Y)((null==a?void 0:a.workflowName)??"");return(0,n.jsx)(o.u,{afterClose:()=>{v.resetFields(),t()},footer:(0,n.jsx)(i.m,{divider:!0,children:(0,n.jsxs)(l.k,{align:"center",gap:"extra-small",children:[(0,n.jsx)(r.z,{onClick:()=>{t()},type:"default",children:(0,b.t)("workflow-modal.cancel")}),(0,n.jsx)(r.z,{onClick:()=>{v.submit()},type:"primary",children:(0,b.t)("workflow-modal.perform-action")},"submit")]})}),onCancel:()=>{t()},open:e&&null!==a,size:"M",title:(0,n.jsx)(s.r,{children:(0,b.t)("workflow-modal.log-time")}),children:(0,n.jsxs)(c.l,{form:v,layout:"vertical",onFinish:e=>{null!==a&&m(a.action,a.transition,a.workflowName,{notes:e.notes,additional:{timeWorked:e.timeSpent}}),t()},children:[(0,n.jsx)(c.l.Item,{label:(0,b.t)("workflow-modal.timeSpent"),name:"timeSpent",rules:[{required:!0,message:(0,b.t)("workflow-modal.timeSpent-required")}],children:(0,n.jsx)(u.Input,{})}),(0,n.jsx)(c.l.Item,{label:(0,b.t)("workflow-modal.notes"),name:"notes",rules:[{required:!0,message:(0,b.t)("workflow-modal.notes-required")}],children:(0,n.jsx)(u.Input.TextArea,{rows:4})})]})})}},29981:function(e,t,a){a.d(t,{J:()=>r});var n=a(46309),i=a(20085);let r=()=>{let e=(0,n.TL)();return{context:(0,n.CG)(e=>(0,i._F)(e,"data-object")),setContext:function(t){e((0,i._z)({type:"data-object",config:t}))},removeContext:function(){e((0,i.qX)("data-object"))}}}},63738:function(e,t,a){a.d(t,{T:()=>s});var n=a(74976),i=a(96486),r=a.n(i),o=a(49453),l=a(46309);let s=()=>{let{data:e}=(0,o.jF)(),t=(0,l.TL)(),{t:a}=(0,n.$G)();return{getSelectOptions:t=>(null==e?void 0:e.items)===void 0?[]:e.items.filter(e=>void 0===t||null!==e.id&&t.includes(String(e.id))).map(e=>({label:null===e.abbreviation?e.id:a(String(e.abbreviation)),value:e.id})),convertValue:async(a,n,i)=>{if((null==e?void 0:e.items)===void 0)return null;let r=e.items.find(e=>e.id===a),l=e.items.find(e=>e.id===n);if(void 0===r||void 0===l||null===r.baseUnit||r.baseUnit!==l.baseUnit)return null;let{data:s}=await t(o.hi.endpoints.unitQuantityValueConvert.initiate({fromUnitId:a,toUnitId:n,value:i}));return(null==s?void 0:s.data)??null},getAbbreviation:t=>{if((null==e?void 0:e.items)===void 0)return"";let n=e.items.find(e=>e.id===t);return"string"!=typeof(null==n?void 0:n.abbreviation)||r().isEmpty(n.abbreviation)?t:a(n.abbreviation)}}}},49453:function(e,t,a){a.d(t,{hi:()=>n,jF:()=>o,sd:()=>i});let n=a(62848).h.enhanceEndpoints({addTagTypes:["Units"]}).injectEndpoints({endpoints:e=>({unitQuantityValueConvertAll:e.query({query:e=>({url:"/pimcore-studio/api/unit/quantity-value/convert-all",params:{fromUnitId:e.fromUnitId,value:e.value}}),providesTags:["Units"]}),unitQuantityValueConvert:e.query({query:e=>({url:"/pimcore-studio/api/unit/quantity-value/convert",params:{fromUnitId:e.fromUnitId,toUnitId:e.toUnitId,value:e.value}}),providesTags:["Units"]}),unitQuantityValueList:e.query({query:()=>({url:"/pimcore-studio/api/unit/quantity-value/unit-list"}),providesTags:["Units"]})}),overrideExisting:!1}),{useUnitQuantityValueConvertAllQuery:i,useUnitQuantityValueConvertQuery:r,useUnitQuantityValueListQuery:o}=n},80054:function(e,t,a){a.d(t,{O:()=>l});var n=a(59255),i=a(81034),r=a(96486),o=a.n(r);let l=()=>{let e=(0,i.useContext)(n.L);if(o().isEmpty(e))throw Error("useTabManager must be used within TabManagerProvider");return e.tabManager}},59255:function(e,t,a){a.d(t,{L:()=>r,d:()=>o});var n=a(85893),i=a(81034);let r=(0,i.createContext)({tabManager:null}),o=e=>{let{tabManager:t,children:a}=e;return(0,i.useMemo)(()=>(0,n.jsx)(r.Provider,{value:{tabManager:t},children:a}),[t,a])}},5554:function(e,t,a){a.d(t,{A:()=>r});var n=a(28395),i=a(43733);class r{getTabs(){return this.tabs}getTab(e){return this.tabs.find(t=>t.key===e)}register(e){if(void 0!==this.getTab(e.key))return void this.tabs.splice(this.tabs.findIndex(t=>t.key===e.key),1,e);this.tabs.push(e)}constructor(){this.type="",this.tabs=[]}}r=(0,n.gn)([(0,i.injectable)()],r)},51776:function(e,t,a){a.d(t,{Z:()=>i});var n=a(81034);let i=e=>{let[t,a]=(0,n.useState)(0);return(0,n.useLayoutEffect)(()=>{var t;a((null==(t=e.current)?void 0:t.getBoundingClientRect().width)??0)},[]),(0,n.useEffect)(()=>{if(null==e.current)return;let t=new ResizeObserver(e=>{let[t]=e,n=t.contentRect.width;a(e=>0!==n&&e!==n?n:e)});return t.observe(e.current),()=>{t.disconnect()}},[e]),t}},37793:function(e,t,a){a.r(t),a.d(t,{useDraftDataReducers:()=>T.ZF,SaveTaskType:()=>j.R,useQuantityValueUnits:()=>A.T,resetDataObject:()=>w.tl,useCustomLayouts:()=>O.z,useDeleteDraft:()=>x._,useAddObject:()=>y,addPropertyToDataObject:()=>w.pl,removePropertyFromDataObject:()=>w.BS,updatePropertyForDataObject:()=>w.O$,useLanguageSelection:()=>U.X,setModifiedCells:()=>w.Zr,LanguageSelectionContext:()=>q.c,setActiveTabForDataObject:()=>w.P8,removeScheduleFromDataObject:()=>w.e$,addScheduleToDataObject:()=>w.SZ,LanguageSelectionProvider:()=>q.O,setPropertiesForDataObject:()=>w.Hj,setSchedulesForDataObject:()=>w.dx,setDraftData:()=>w.Bs,DataObjectEditorWidget:()=>eS,useModifiedObjectDataReducers:()=>k.K,useSave:()=>j.O,IS_AUTO_SAVE_DRAFT_CREATED:()=>T.hD,dataObjectsAdapter:()=>w.AX,elementTypes:()=>M.a,removeDataObject:()=>w.cB,markObjectDataAsModified:()=>w.X1,useModifiedObjectDataDraft:()=>k.n,LanguageSelection:()=>_.k,useDataObjectHelper:()=>f.n,resetChanges:()=>w.sf,unpublishDraft:()=>w.pA,FolderTabManager:()=>L,useDataObject:()=>S,useDataObjectDraft:()=>D.H,useDraftDataDraft:()=>T.M,publishDraft:()=>w.oi,ObjectTabManager:()=>P,updateScheduleForDataObject:()=>w.lM,slice:()=>w.tP,updateKey:()=>w.a9,dataObjectReceived:()=>w.C9,useGlobalDataObjectContext:()=>I.J,selectDataObjectById:()=>w.V8,resetSchedulesChangesForDataObject:()=>w.bI});var n=a(85893),i=a(46309),r=a(94374),o=a(55859),l=a(38119),s=a(66660),d=a(62588),c=a(11093),u=a(51469),b=a(96486),p=a(81034),v=a(74976),m=a(54626),f=a(54658),h=a(71125),g=a(23526);let y=()=>{let{t:e}=(0,v.$G)(),t=(0,l.U8)(),[a]=(0,m.Fg)(),p=(0,i.TL)(),{openDataObject:y}=(0,f.n)(),{isTreeActionAllowed:x}=(0,c._)(),{getClassDefinitionsForCurrentUser:j}=(0,h.C)(),w=t=>{let a=[],i=[...j()].sort((e,t)=>e.name.localeCompare(t.name)).reduce((e,t)=>{let a=(0,b.isEmpty)(t.group)?"undefined":t.group;return void 0===e[a]&&(e[a]=[]),e[a].push(t),e},{});for(let[r,l]of(void 0!==i.undefined&&(a=i.undefined.map(e=>T(e,t))),Object.entries(i)))"undefined"!==r&&a.push({label:e(r),key:"add-object-group-"+r,icon:(0,n.jsx)(o.J,{value:"folder"}),children:l.map(e=>T(e,t))});return a},T=(t,a)=>({label:e(t.name),key:t.id,icon:"class"===t.icon.value?(0,n.jsx)(o.J,{subIconName:"new",subIconVariant:"green",value:"data-object"}):(0,n.jsx)(o.J,{subIconName:"new",subIconVariant:"green",...t.icon}),onClick:()=>{k(t,parseInt(a.id))}}),k=(a,n,i)=>{t.input({title:e("data-object.create-data-object",{className:a.name}),label:e("form.label.new-item"),rule:{required:!0,message:e("form.validation.required")},onOk:async e=>{await O(a.id,e,n),null==i||i(e)}})},O=async(e,t,n)=>{let i=a({parentId:n,dataObjectAddParameters:{key:t,classId:e,type:"object"}});try{let e=await i;if(void 0!==e.error)return void(0,s.ZP)(new s.MS(e.error));let{id:t}=e.data;y({config:{id:t}}),p((0,r.D9)({nodeId:String(n),elementType:"data-object"}))}catch(e){(0,s.ZP)(new s.aE("Error creating data object"))}},C=e=>!x(u.W.Add)||!(0,d.x)(e.permissions,"create")||(0,b.isEmpty)(j());return{addObjectTreeContextMenuItem:t=>({label:e("data-object.tree.context-menu.add-object"),key:g.N.addObject,icon:(0,n.jsx)(o.J,{value:"folder"}),hidden:C(t),children:w(t)})}};var x=a(10186),j=a(98319),w=a(84475),T=a(88983),k=a(74152),O=a(88087),C=a(68922);let S=()=>{let{id:e}=(0,p.useContext)(C.f);return{id:e}};var D=a(90165),I=a(29981),A=a(63738),M=a(28590),F=a(28395),$=a(5554),E=a(43733);class L extends $.A{constructor(){super(),this.type="folder"}}L=(0,F.gn)([(0,E.injectable)(),(0,F.w6)("design:type",Function),(0,F.w6)("design:paramtypes",[])],L);class P extends $.A{constructor(){super(),this.type="object"}}P=(0,F.gn)([(0,E.injectable)(),(0,F.w6)("design:type",Function),(0,F.w6)("design:paramtypes",[])],P);var _=a(44171),q=a(51791),U=a(64235),N=a(98482),X=a(19505);let V=()=>{let e=(0,i.CG)(N.u6),t=(0,p.useContext)(X.M);return null!==e&&e.nodeId===t.nodeId};var z=a(77476),K=a(28651);let R=(0,K.kc)(e=>{let{token:t,css:a}=e;return{editorTabsContainer:a`
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
    `}},{hashPriority:"low"});var G=a(5708),B=a(63387),H=a.n(B),Z=a(81354),J=a(20994),W=a(80054);let Q=()=>{let{openBottomWidget:e}=(0,Z.A)(),t=(0,W.O)();return{detachWidget:a=>{let{tabKey:n,config:i={}}=a,r=t.getTab(n);void 0!==r&&e({name:J.ZP.t(String(r.label)),id:`${n}-detached`,component:"detachable-tab",config:{...i,icon:r.icon.props,tabKey:n}})}}};var Y=a(57732);let ee=e=>{let{tabKey:t,activeTabKey:a,tabKeyInFocus:i,tabKeyOutOfFocus:r,title:o,children:l}=e,[s,d]=(0,p.useState)(null);return(0,p.useEffect)(()=>{void 0!==i&&d(i)},[i]),(0,p.useEffect)(()=>{void 0!==r&&r===s&&d(null)},[r]),(0,n.jsx)(G.Tooltip,{open:s===t&&a!==t,placement:"top",title:o,children:(0,n.jsx)("div",{onMouseEnter:()=>{d(t)},onMouseLeave:()=>{d(null)},children:l})})};var et=a(35015),ea=a(51776),en=a(97473),ei=a(35950),er=a(84666),eo=a(84901);let el=e=>{let{defaultActiveKey:t,showLabelIfActive:a,items:i}=e,{styles:r}=R(),{detachWidget:o}=Q(),{id:l,elementType:s}=(0,et.i)(),{activeTab:c,setActiveTab:u}=(0,en.q)(l,s),[b,v]=(0,p.useState)(void 0),[m,f]=(0,p.useState)(void 0),h=(0,en.q)(l,s).element,g=(0,p.useRef)(null),y=(0,ea.Z)(g);(0,p.useEffect)(()=>{null===c&&(null==i?void 0:i.length)>0&&u(i[0].key)},[i]);let x=null==i?void 0:i.map(e=>e.key),j=e=>{let t=e.target.id;return x.find(e=>t.includes(e))},w=e=>{o(e),(null==i?void 0:i.length)>0&&u(i[0].key)};return i=null==(i=i.filter(e=>!(void 0!==e.hidden&&e.hidden(h))&&(void 0===e.workspacePermission||(null==h?void 0:h.permissions)===void 0||!!(0,d.x)(h.permissions,e.workspacePermission))&&(void 0===e.userPermission||!!(0,ei.y)(e.userPermission))))?void 0:i.map(e=>{let t={...e,originalLabel:e.label,icon:(0,n.jsx)(ee,{activeTabKey:c,tabKey:e.key,tabKeyInFocus:b,tabKeyOutOfFocus:m,title:e.label,children:e.icon})};return!0===t.isDetachable&&(t.label=(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{children:t.label}),(0,n.jsx)(er.h,{className:"detachable-button",icon:{value:"share"},onClick:t=>{t.stopPropagation(),w({tabKey:e.key})},type:"link"})]})),t}),(0,n.jsx)("div",{className:r.editorTabsContainer,ref:g,children:(0,n.jsx)(G.Tabs,{activeKey:c??void 0,className:H()(r.editorTabs,{[r.onlyActiveLabel]:a}),defaultActiveKey:t,items:i,onBlur:e=>{f(j(e))},onFocus:e=>{v(j(e))},onTabClick:e=>{u(e)},tabBarExtraContent:{left:(0,n.jsx)(eo.x,{padding:{left:"extra-small",top:"extra-small",bottom:"extra-small"},children:(0,n.jsx)(Y.U,{editorTabsWidth:y,elementType:s,id:l})})}})})};var es=a(80380),ed=a(59255);let ec=e=>{let{elementEditorType:t}=e,{t:a}=(0,v.$G)(),i=(0,es.$1)(t.tabManagerServiceId),{id:r,elementType:o}=(0,et.i)(),{element:l}=(0,en.q)(r,o),s=i.getTabs(),d=s.map((e,t)=>{let n={...s[t],label:"string"==typeof e.label?a(e.label):e.label};return"workflow"===e.key?{...n,hidden:()=>(null==l?void 0:l.hasWorkflowAvailable)===!1||(null==l?void 0:l.hasWorkflowAvailable)===void 0}:n});return(0,n.jsx)(ed.d,{tabManager:i,children:(0,n.jsx)(el,{defaultActiveKey:"1",items:d,showLabelIfActive:!0})})};var eu=a(47755),eb=a(68686),ep=a(3129),ev=a(12174),em=a(51234),ef=a(27614);let eh=()=>(0,n.jsx)(eu.o,{children:(0,n.jsxs)(ev.v,{children:[(0,n.jsx)(eb.k,{children:(0,n.jsx)(ef.O,{slot:em.O.dataObject.editor.toolbar.slots.left})}),(0,n.jsx)(eb.k,{align:"center",gap:"extra-small",style:{height:"32px"},vertical:!1,children:(0,n.jsx)(ef.O,{slot:em.O.dataObject.editor.toolbar.slots.right})}),(0,n.jsx)(ep.L,{})]})}),eg=(0,K.kc)(e=>{let{token:t,css:a}=e;return{tabbarToolbar:a`
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
    `}},{hashPriority:"low"}),ey=e=>{let{styles:t}=eg();return(0,n.jsxs)("div",{className:["tabs-toolbar-layout",t.tabbarToolbar].join(" "),children:[(0,n.jsx)("div",{className:"tabs-toolbar-layout__tabbar",children:e.renderTabbar}),(0,n.jsx)("div",{className:"tabs-toolbar-layout__toolbar",children:e.renderToolbar})]})};var ex=a(18639),ej=a(70774),ew=a(11773),eT=a(36414);let ek=e=>{let{id:t}=e,{isLoading:a,isError:i,dataObject:r,editorType:o}=(0,D.H)(t),l=V(),{setContext:s,removeContext:d}=(0,I.J)();return((0,p.useEffect)(()=>()=>{d()},[]),(0,p.useEffect)(()=>(l&&s({id:t}),()=>{l||d()}),[l]),a)?(0,n.jsx)(z.V,{loading:!0}):i?(0,n.jsx)(z.V,{padded:!0,children:(0,n.jsx)(eT.b,{message:"Error: Loading of data object failed",type:"error"})}):void 0===r||void 0===o?(0,n.jsx)(n.Fragment,{}):(0,n.jsx)(C.g,{id:t,children:(0,n.jsx)(ew.U,{children:(0,n.jsx)(ex.L,{children:(0,n.jsx)(ej.k,{children:(0,n.jsx)(q.O,{children:(0,n.jsx)(ey,{renderTabbar:(0,n.jsx)(ec,{elementEditorType:o}),renderToolbar:(0,n.jsx)(eh,{})})})})})})})};var eO=a(44158),eC=a(92430);let eS={name:"data-object-editor",component:e=>{let{id:t}=e,{getDefaultLayoutId:a,isLoading:i}=(0,O.z)(t);return(0,n.jsx)(eO.M,{defaultLayout:a(),isLoading:i,children:(0,n.jsx)(ek,{id:t})})},titleComponent:e=>{let{node:t}=e,{dataObject:a}=(0,D.H)(t.getConfig().id),{t:i}=(0,v.$G)(),r=t.getName();return t.getName=()=>((null==a?void 0:a.parentId)===0&&(t.getName=()=>i("home")),(null==a?void 0:a.key)??r),(0,n.jsx)(eC.X,{modified:(null==a?void 0:a.modified)??!1,node:t})},isModified:e=>{let t=e.getConfig(),a=(0,w.V8)(i.h.getState(),t.id);return(null==a?void 0:a.modified)??!1},getContextProvider:(e,t)=>{let a=e.config;return(0,n.jsx)(C.g,{id:a.id,children:t})}}}}]);