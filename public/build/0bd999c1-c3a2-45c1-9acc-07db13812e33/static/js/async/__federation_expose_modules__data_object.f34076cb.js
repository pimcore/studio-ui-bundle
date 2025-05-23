/*! For license information please see __federation_expose_modules__data_object.f34076cb.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["85"],{20085:function(e,t,a){a.d(t,{_F:()=>r,_z:()=>l,qX:()=>o});var n=a(46309);let i=(0,a(59511).oM)({name:"global-context",initialState:[],reducers:{addGlobalContext:(e,t)=>{e.push(t.payload)},removeGlobalContext:(e,t)=>e.filter(e=>e.type!==t.payload)},selectors:{selectContextByType:(e,t)=>e.find(e=>e.type===t)}});(0,n.fz)(i);let{addGlobalContext:l,removeGlobalContext:o}=i.actions,{selectContextByType:r}=i.getSelectors(e=>e["global-context"])},3129:function(e,t,a){a.d(t,{L:()=>m});var n=a(85893);a(81004);var i=a(59072),l=a(84420),o=a(25560),r=a(68686),s=a(88822),d=a(97686),u=a(72551),c=a(26788),b=a(20994),p=a(98244);let m=()=>{let{isModalOpen:e,closeModal:t,contextWorkflowDetails:a}=(0,d.useWorkflow)(),[m]=u.l.useForm(),{submitWorkflowAction:v}=(0,p.useSubmitWorkflow)((null==a?void 0:a.workflowName)??"");return(0,n.jsx)(o.u,{afterClose:()=>{m.resetFields(),t()},footer:(0,n.jsx)(i.m,{divider:!0,children:(0,n.jsxs)(r.k,{align:"center",gap:"extra-small",children:[(0,n.jsx)(l.z,{onClick:()=>{t()},type:"default",children:(0,b.t)("workflow-modal.cancel")}),(0,n.jsx)(l.z,{onClick:()=>{m.submit()},type:"primary",children:(0,b.t)("workflow-modal.perform-action")},"submit")]})}),onCancel:()=>{t()},open:e&&null!==a,size:"M",title:(0,n.jsx)(s.r,{children:(0,b.t)("workflow-modal.log-time")}),children:(0,n.jsxs)(u.l,{form:m,layout:"vertical",onFinish:e=>{null!==a&&v(a.action,a.transition,a.workflowName,{notes:e.notes,additional:{timeWorked:e.timeSpent}}),t()},children:[(0,n.jsx)(u.l.Item,{label:(0,b.t)("workflow-modal.timeSpent"),name:"timeSpent",rules:[{required:!0,message:(0,b.t)("workflow-modal.timeSpent-required")}],children:(0,n.jsx)(c.Input,{})}),(0,n.jsx)(u.l.Item,{label:(0,b.t)("workflow-modal.notes"),name:"notes",rules:[{required:!0,message:(0,b.t)("workflow-modal.notes-required")}],children:(0,n.jsx)(c.Input.TextArea,{rows:4})})]})})}},29981:function(e,t,a){a.d(t,{useGlobalDataObjectContext:()=>l});var n=a(46309),i=a(20085);let l=()=>{let e=(0,n.TL)();return{context:(0,n.CG)(e=>(0,i._F)(e,"data-object")),setContext:function(t){e((0,i._z)({type:"data-object",config:t}))},removeContext:function(){e((0,i.qX)("data-object"))}}}},63738:function(e,t,a){a.d(t,{useQuantityValueUnits:()=>s});var n=a(74976),i=a(96486),l=a.n(i),o=a(49453),r=a(46309);let s=()=>{let{data:e}=(0,o.useUnitQuantityValueListQuery)(),t=(0,r.TL)(),{t:a}=(0,n.useTranslation)();return{getSelectOptions:t=>(null==e?void 0:e.items)===void 0?[]:e.items.filter(e=>void 0===t||null!==e.id&&t.includes(String(e.id))).map(e=>({label:null===e.abbreviation?e.id:a(String(e.abbreviation)),value:e.id})),convertValue:async(a,n,i)=>{if((null==e?void 0:e.items)===void 0)return null;let l=e.items.find(e=>e.id===a),r=e.items.find(e=>e.id===n);if(void 0===l||void 0===r||null===l.baseUnit||l.baseUnit!==r.baseUnit)return null;let{data:s}=await t(o.hi.endpoints.unitQuantityValueConvert.initiate({fromUnitId:a,toUnitId:n,value:i}));return(null==s?void 0:s.data)??null},getAbbreviation:t=>{if((null==e?void 0:e.items)===void 0)return"";let n=e.items.find(e=>e.id===t);return"string"!=typeof(null==n?void 0:n.abbreviation)||l().isEmpty(n.abbreviation)?t:a(n.abbreviation)}}}},49453:function(e,t,a){a.d(t,{hi:()=>n,useUnitQuantityValueConvertAllQuery:()=>i,useUnitQuantityValueListQuery:()=>o});let n=a(62848).h.enhanceEndpoints({addTagTypes:["Units"]}).injectEndpoints({endpoints:e=>({unitQuantityValueConvertAll:e.query({query:e=>({url:"/pimcore-studio/api/unit/quantity-value/convert-all",params:{fromUnitId:e.fromUnitId,value:e.value}}),providesTags:["Units"]}),unitQuantityValueConvert:e.query({query:e=>({url:"/pimcore-studio/api/unit/quantity-value/convert",params:{fromUnitId:e.fromUnitId,toUnitId:e.toUnitId,value:e.value}}),providesTags:["Units"]}),unitQuantityValueList:e.query({query:()=>({url:"/pimcore-studio/api/unit/quantity-value/unit-list"}),providesTags:["Units"]})}),overrideExisting:!1}),{useUnitQuantityValueConvertAllQuery:i,useUnitQuantityValueConvertQuery:l,useUnitQuantityValueListQuery:o}=n},80054:function(e,t,a){a.d(t,{O:()=>r});var n=a(59255),i=a(81004),l=a(96486),o=a.n(l);let r=()=>{let e=(0,i.useContext)(n.L);if(o().isEmpty(e))throw Error("useTabManager must be used within TabManagerProvider");return e.tabManager}},59255:function(e,t,a){a.d(t,{L:()=>l,d:()=>o});var n=a(85893),i=a(81004);let l=(0,i.createContext)({tabManager:null}),o=e=>{let{tabManager:t,children:a}=e;return(0,i.useMemo)(()=>(0,n.jsx)(l.Provider,{value:{tabManager:t},children:a}),[t,a])}},5554:function(e,t,a){a.d(t,{A:()=>l});var n=a(28395),i=a(60476);class l{getTabs(){return this.tabs}getTab(e){return this.tabs.find(t=>t.key===e)}register(e){if(void 0!==this.getTab(e.key))return void this.tabs.splice(this.tabs.findIndex(t=>t.key===e.key),1,e);this.tabs.push(e)}constructor(){this.type="",this.tabs=[]}}l=(0,n.gn)([(0,i.injectable)()],l)},51776:function(e,t,a){a.d(t,{Z:()=>i});var n=a(81004);let i=e=>{let[t,a]=(0,n.useState)(0);return(0,n.useLayoutEffect)(()=>{var t;a((null==(t=e.current)?void 0:t.getBoundingClientRect().width)??0)},[]),(0,n.useEffect)(()=>{if(null==e.current)return;let t=new ResizeObserver(e=>{let[t]=e,n=t.contentRect.width;a(e=>0!==n&&e!==n?n:e)});return t.observe(e.current),()=>{t.disconnect()}},[e]),t}},37793:function(e,t,a){a.r(t),a.d(t,{useDraftDataReducers:()=>D.ZF,SaveTaskType:()=>j.R,useQuantityValueUnits:()=>E.useQuantityValueUnits,resetDataObject:()=>w.tl,useCustomLayouts:()=>O.useCustomLayouts,useDeleteDraft:()=>x.useDeleteDraft,useAddObject:()=>y,addPropertyToDataObject:()=>w.pl,removePropertyFromDataObject:()=>w.BS,updatePropertyForDataObject:()=>w.O$,useLanguageSelection:()=>V.useLanguageSelection,setModifiedCells:()=>w.Zr,LanguageSelectionContext:()=>_.c,setActiveTabForDataObject:()=>w.P8,removeScheduleFromDataObject:()=>w.e$,addScheduleToDataObject:()=>w.SZ,LanguageSelectionProvider:()=>_.O,setPropertiesForDataObject:()=>w.Hj,setSchedulesForDataObject:()=>w.dx,setDraftData:()=>w.Bs,DataObjectEditorWidget:()=>eC,useModifiedObjectDataReducers:()=>T.K,useSave:()=>j.useSave,IS_AUTO_SAVE_DRAFT_CREATED:()=>D.hD,dataObjectsAdapter:()=>w.AX,elementTypes:()=>L.a,removeDataObject:()=>w.cB,markObjectDataAsModified:()=>w.X1,useModifiedObjectDataDraft:()=>T.n,LanguageSelection:()=>$.k,useDataObjectHelper:()=>f.useDataObjectHelper,resetChanges:()=>w.sf,unpublishDraft:()=>w.pA,FolderTabManager:()=>F,useDataObject:()=>C,useDataObjectDraft:()=>S.useDataObjectDraft,useDraftDataDraft:()=>D.M,publishDraft:()=>w.oi,ObjectTabManager:()=>U,updateScheduleForDataObject:()=>w.lM,slice:()=>w.tP,updateKey:()=>w.a9,dataObjectReceived:()=>w.C9,useGlobalDataObjectContext:()=>I.useGlobalDataObjectContext,selectDataObjectById:()=>w.V8,resetSchedulesChangesForDataObject:()=>w.bI});var n=a(85893),i=a(46309),l=a(94374),o=a(55859),r=a(38119),s=a(66660),d=a(62588),u=a(11093),c=a(51469),b=a(96486),p=a(81004),m=a(74976),v=a(54626),f=a(54658),h=a(71125),g=a(23526);let y=()=>{let{t:e}=(0,m.useTranslation)(),t=(0,r.useFormModal)(),[a]=(0,v.Fg)(),p=(0,i.TL)(),{openDataObject:y}=(0,f.useDataObjectHelper)(),{isTreeActionAllowed:x}=(0,u.useTreePermission)(),{getClassDefinitionsForCurrentUser:j}=(0,h.useClassDefinitions)(),w=t=>{let a=[],i=[...j()].sort((e,t)=>e.name.localeCompare(t.name)).reduce((e,t)=>{let a=(0,b.isEmpty)(t.group)?"undefined":t.group;return void 0===e[a]&&(e[a]=[]),e[a].push(t),e},{});for(let[l,r]of(void 0!==i.undefined&&(a=i.undefined.map(e=>D(e,t))),Object.entries(i)))"undefined"!==l&&a.push({label:e(l),key:"add-object-group-"+l,icon:(0,n.jsx)(o.J,{value:"folder"}),children:r.map(e=>D(e,t))});return a},D=(t,a)=>({label:e(t.name),key:t.id,icon:"class"===t.icon.value?(0,n.jsx)(o.J,{subIconName:"new",subIconVariant:"green",value:"data-object"}):(0,n.jsx)(o.J,{subIconName:"new",subIconVariant:"green",...t.icon}),onClick:()=>{T(t,parseInt(a.id))}}),T=(a,n,i)=>{t.input({title:e("data-object.create-data-object",{className:a.name}),label:e("form.label.new-item"),rule:{required:!0,message:e("form.validation.required")},onOk:async e=>{await O(a.id,e,n),null==i||i(e)}})},O=async(e,t,n)=>{let i=a({parentId:n,dataObjectAddParameters:{key:t,classId:e,type:"object"}});try{let e=await i;if(void 0!==e.error)return void(0,s.ZP)(new s.MS(e.error));let{id:t}=e.data;y({config:{id:t}}),p((0,l.D9)({nodeId:String(n),elementType:"data-object"}))}catch(e){(0,s.ZP)(new s.aE("Error creating data object"))}},k=e=>!x(c.W.Add)||!(0,d.x)(e.permissions,"create")||(0,b.isEmpty)(j());return{addObjectTreeContextMenuItem:t=>({label:e("data-object.tree.context-menu.add-object"),key:g.N.addObject,icon:(0,n.jsx)(o.J,{value:"folder"}),hidden:k(t),children:w(t)})}};var x=a(10186),j=a(98319),w=a(84475),D=a(88983),T=a(74152),O=a(88087),k=a(68922);let C=()=>{let{id:e}=(0,p.useContext)(k.f);return{id:e}};var S=a(90165),I=a(29981),E=a(63738),L=a(28590),M=a(28395),A=a(5554),P=a(60476);class F extends A.A{constructor(){super(),this.type="folder"}}F=(0,M.gn)([(0,P.injectable)(),(0,M.w6)("design:type",Function),(0,M.w6)("design:paramtypes",[])],F);class U extends A.A{constructor(){super(),this.type="object"}}U=(0,M.gn)([(0,P.injectable)(),(0,M.w6)("design:type",Function),(0,M.w6)("design:paramtypes",[])],U);var $=a(44171),_=a(51791),V=a(64235),q=a(98482),N=a(19505);let X=()=>{let e=(0,i.CG)(q.u6),t=(0,p.useContext)(N.M);return null!==e&&e.nodeId===t.nodeId};var Q=a(77476),K=a(10781);let R=(0,K.kc)(e=>{let{token:t,css:a}=e;return{editorTabsContainer:a`
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
    `}},{hashPriority:"low"});var W=a(26788),z=a(63387),B=a.n(z),G=a(81354),Z=a(20994),H=a(80054);let J=()=>{let{openBottomWidget:e}=(0,G.useWidgetManager)(),t=(0,H.O)();return{detachWidget:a=>{let{tabKey:n,config:i={}}=a,l=t.getTab(n);void 0!==l&&e({name:Z.ZP.t(String(l.label)),id:`${n}-detached`,component:"detachable-tab",config:{...i,icon:l.icon.props,tabKey:n}})}}};var Y=a(57732);let ee=e=>{let{tabKey:t,activeTabKey:a,tabKeyInFocus:i,tabKeyOutOfFocus:l,title:o,children:r}=e,[s,d]=(0,p.useState)(null);return(0,p.useEffect)(()=>{void 0!==i&&d(i)},[i]),(0,p.useEffect)(()=>{void 0!==l&&l===s&&d(null)},[l]),(0,n.jsx)(W.Tooltip,{open:s===t&&a!==t,placement:"top",title:o,children:(0,n.jsx)("div",{onMouseEnter:()=>{d(t)},onMouseLeave:()=>{d(null)},children:r})})};var et=a(61813),ea=a(51776),en=a(95461),ei=a(35950),el=a(84666),eo=a(84901);let er=e=>{let{defaultActiveKey:t,showLabelIfActive:a,items:i}=e,{styles:l}=R(),{detachWidget:o}=J(),{id:r,elementType:s}=(0,et.useElementContext)(),{activeTab:u,setActiveTab:c}=(0,en.useElementDraft)(r,s),[b,m]=(0,p.useState)(void 0),[v,f]=(0,p.useState)(void 0),h=(0,en.useElementDraft)(r,s).element,g=(0,p.useRef)(null),y=(0,ea.Z)(g);(0,p.useEffect)(()=>{null===u&&(null==i?void 0:i.length)>0&&c(i[0].key)},[i]);let x=null==i?void 0:i.map(e=>e.key),j=e=>{let t=e.target.id;return x.find(e=>t.includes(e))},w=e=>{o(e),(null==i?void 0:i.length)>0&&c(i[0].key)};return i=null==(i=i.filter(e=>!(void 0!==e.hidden&&e.hidden(h))&&(void 0===e.workspacePermission||(null==h?void 0:h.permissions)===void 0||!!(0,d.x)(h.permissions,e.workspacePermission))&&(void 0===e.userPermission||!!(0,ei.y)(e.userPermission))))?void 0:i.map(e=>{let t={...e,originalLabel:e.label,icon:(0,n.jsx)(ee,{activeTabKey:u,tabKey:e.key,tabKeyInFocus:b,tabKeyOutOfFocus:v,title:e.label,children:e.icon})};return!0===t.isDetachable&&(t.label=(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{children:t.label}),(0,n.jsx)(el.h,{className:"detachable-button",icon:{value:"share"},onClick:t=>{t.stopPropagation(),w({tabKey:e.key})},type:"link"})]})),t}),(0,n.jsx)("div",{className:l.editorTabsContainer,ref:g,children:(0,n.jsx)(W.Tabs,{activeKey:u??void 0,className:B()(l.editorTabs,{[l.onlyActiveLabel]:a}),defaultActiveKey:t,items:i,onBlur:e=>{f(j(e))},onFocus:e=>{m(j(e))},onTabClick:e=>{c(e)},tabBarExtraContent:{left:(0,n.jsx)(eo.x,{padding:{left:"extra-small",top:"extra-small",bottom:"extra-small"},children:(0,n.jsx)(Y.U,{editorTabsWidth:y,elementType:s,id:r})})}})})};var es=a(80380),ed=a(59255);let eu=e=>{let{elementEditorType:t}=e,{t:a}=(0,m.useTranslation)(),i=(0,es.$1)(t.tabManagerServiceId),{id:l,elementType:o}=(0,et.useElementContext)(),{element:r}=(0,en.useElementDraft)(l,o),s=i.getTabs(),d=s.map((e,t)=>{let n={...s[t],label:"string"==typeof e.label?a(e.label):e.label};return"workflow"===e.key?{...n,hidden:()=>(null==r?void 0:r.hasWorkflowAvailable)===!1||(null==r?void 0:r.hasWorkflowAvailable)===void 0}:n});return(0,n.jsx)(ed.d,{tabManager:i,children:(0,n.jsx)(er,{defaultActiveKey:"1",items:d,showLabelIfActive:!0})})};var ec=a(47755),eb=a(68686),ep=a(3129),em=a(12174),ev=a(54416),ef=a(27614);let eh=()=>(0,n.jsx)(ec.o,{children:(0,n.jsxs)(em.v,{children:[(0,n.jsx)(eb.k,{children:(0,n.jsx)(ef.O,{slot:ev.O.dataObject.editor.toolbar.slots.left})}),(0,n.jsx)(eb.k,{align:"center",gap:"extra-small",style:{height:"32px"},vertical:!1,children:(0,n.jsx)(ef.O,{slot:ev.O.dataObject.editor.toolbar.slots.right})}),(0,n.jsx)(ep.L,{})]})}),eg=(0,K.kc)(e=>{let{token:t,css:a}=e;return{tabbarToolbar:a`
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
    `}},{hashPriority:"low"}),ey=e=>{let{styles:t}=eg();return(0,n.jsxs)("div",{className:["tabs-toolbar-layout",t.tabbarToolbar].join(" "),children:[(0,n.jsx)("div",{className:"tabs-toolbar-layout__tabbar",children:e.renderTabbar}),(0,n.jsx)("div",{className:"tabs-toolbar-layout__toolbar",children:e.renderToolbar})]})};var ex=a(18639),ej=a(70774),ew=a(11773),eD=a(36414);let eT=e=>{let{id:t}=e,{isLoading:a,isError:i,dataObject:l,editorType:o}=(0,S.useDataObjectDraft)(t),r=X(),{setContext:s,removeContext:d}=(0,I.useGlobalDataObjectContext)();return((0,p.useEffect)(()=>()=>{d()},[]),(0,p.useEffect)(()=>(r&&s({id:t}),()=>{r||d()}),[r]),a)?(0,n.jsx)(Q.V,{loading:!0}):i?(0,n.jsx)(Q.V,{padded:!0,children:(0,n.jsx)(eD.b,{message:"Error: Loading of data object failed",type:"error"})}):void 0===l||void 0===o?(0,n.jsx)(n.Fragment,{}):(0,n.jsx)(k.g,{id:t,children:(0,n.jsx)(ew.U,{children:(0,n.jsx)(ex.L,{children:(0,n.jsx)(ej.k,{children:(0,n.jsx)(_.O,{children:(0,n.jsx)(ey,{renderTabbar:(0,n.jsx)(eu,{elementEditorType:o}),renderToolbar:(0,n.jsx)(eh,{})})})})})})})};var eO=a(44158),ek=a(92430);let eC={name:"data-object-editor",component:e=>{let{id:t}=e,{getDefaultLayoutId:a,isLoading:i}=(0,O.useCustomLayouts)(t);return(0,n.jsx)(eO.M,{defaultLayout:a(),isLoading:i,children:(0,n.jsx)(eT,{id:t})})},titleComponent:e=>{let{node:t}=e,{dataObject:a}=(0,S.useDataObjectDraft)(t.getConfig().id),{t:i}=(0,m.useTranslation)(),l=t.getName();return t.getName=()=>((null==a?void 0:a.parentId)===0&&(t.getName=()=>i("home")),(null==a?void 0:a.key)??l),(0,n.jsx)(ek.X,{modified:(null==a?void 0:a.modified)??!1,node:t})},isModified:e=>{let t=e.getConfig(),a=(0,w.V8)(i.store.getState(),t.id);return(null==a?void 0:a.modified)??!1},getContextProvider:(e,t)=>{let a=e.config;return(0,n.jsx)(k.g,{id:a.id,children:t})}}}}]);