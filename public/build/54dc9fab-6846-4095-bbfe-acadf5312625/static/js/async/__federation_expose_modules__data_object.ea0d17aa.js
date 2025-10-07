/*! For license information please see __federation_expose_modules__data_object.ea0d17aa.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["1085"],{98139:function(e,t,a){a.d(t,{F:()=>o});var n=a(28395),l=a(5554),i=a(60476);class o extends l.A{constructor(){super(),this.type="object"}}o=(0,n.gn)([(0,i.injectable)(),(0,n.w6)("design:type",Function),(0,n.w6)("design:paramtypes",[])],o)},88087:function(e,t,a){a.d(t,{z:()=>d});var n=a(90165),l=a(18962),i=a(81343),o=a(53478),r=a(47666),s=a(30378);let d=e=>{let{dataObject:t,isLoading:a}=(0,n.H)(e),{data:d,error:c,isLoading:u}=(0,l.ih)({objectId:e},{skip:void 0===t||"folder"===t.type});void 0!==c&&(0,i.ZP)(new i.MS(c));let b=void 0!==d?d.items:void 0,p=(0,s.Z)(t,"data-object"),{data:h,isFetching:m}=(0,r.d)({elementType:"data-object",elementId:e},{skip:!p});return{layouts:b,getDefaultLayoutId:e=>{if((0,o.isUndefined)(b))return null;let t=b.find(e=>e.default)??b.find(t=>t.id===e)??b.find(e=>e.id===(null==h?void 0:h.layoutId))??b.find(e=>"0"===e.id)??b[0]??null;return(null==t?void 0:t.id)??null},isLoading:a||m||u&&(null==t?void 0:t.type)!=="folder"}}},13221:function(e,t,a){a.r(t),a.d(t,{elementTypes:()=>p.a,addScheduleToDataObject:()=>i.SZ,slice:()=>i.tP,FolderTabManager:()=>g,resetDataObject:()=>i.tl,ObjectTabManager:()=>v.F,LanguageSelectionWithProvider:()=>j.F,useLanguageSelection:()=>w.X,setSchedulesForDataObject:()=>i.dx,SaveTaskType:()=>l.R,useDataObject:()=>s.v,setPropertiesForDataObject:()=>i.Hj,updateScheduleForDataObject:()=>i.lM,LanguageSelectionProvider:()=>y.O,publishDraft:()=>i.oi,removePropertyFromDataObject:()=>i.BS,addPropertyToDataObject:()=>i.pl,markObjectDataAsModified:()=>i.X1,removeScheduleFromDataObject:()=>i.e$,setActiveTabForDataObject:()=>i.P8,dataObjectsAdapter:()=>i.AX,useDataObjectDraft:()=>d.H,useDataObjectHelper:()=>c.n,useCustomLayouts:()=>r.z,LanguageSelection:()=>x.k,dataObjectReceived:()=>i.C9,useGlobalDataObjectContext:()=>u.J,updatePropertyForDataObject:()=>i.O$,DataObjectEditorWidget:()=>k._,removeDataObject:()=>i.cB,useModifiedObjectDataDraft:()=>o.n,useModifiedObjectDataReducers:()=>o.K,useQuantityValueUnits:()=>b.T,useSave:()=>l.O,setDraftData:()=>i.Bs,resetSchedulesChangesForDataObject:()=>i.bI,selectDataObjectById:()=>i.V8,setModifiedCells:()=>i.Zr,updateKey:()=>i.a9,useAddObject:()=>n.x,LanguageSelectionContext:()=>y.c,unpublishDraft:()=>i.pA,resetChanges:()=>i.sf});var n=a(10466),l=a(3848),i=a(65709),o=a(74152),r=a(88087),s=a(36545),d=a(90165),c=a(54658),u=a(29981),b=a(63738),p=a(77244),h=a(28395),m=a(5554),f=a(60476);class g extends m.A{constructor(){super(),this.type="folder"}}g=(0,h.gn)([(0,f.injectable)(),(0,h.w6)("design:type",Function),(0,h.w6)("design:paramtypes",[])],g);var v=a(98139),x=a(2090),j=a(29705),y=a(4851),w=a(26597),k=a(70439);void 0!==(e=a.hmd(e)).hot&&e.hot.accept()},86493:function(e,t,a){a.d(t,{L:()=>h});var n=a(85893);a(81004);var l=a(71881),i=a(98550),o=a(81655),r=a(52309),s=a(8403),d=a(97686),c=a(33311),u=a(26788),b=a(45628),p=a(98244);let h=()=>{let{isModalOpen:e,closeModal:t,contextWorkflowDetails:a}=(0,d.D)(),[h]=c.l.useForm(),{submitWorkflowAction:m}=(0,p.Y)((null==a?void 0:a.workflowName)??"");return(0,n.jsx)(o.u,{afterClose:()=>{h.resetFields(),t()},footer:(0,n.jsx)(l.m,{divider:!0,children:(0,n.jsxs)(r.k,{align:"center",gap:"extra-small",children:[(0,n.jsx)(i.z,{onClick:()=>{t()},type:"default",children:(0,b.t)("workflow-modal.cancel")}),(0,n.jsx)(i.z,{onClick:()=>{h.submit()},type:"primary",children:(0,b.t)("workflow-modal.perform-action")},"submit")]})}),onCancel:()=>{t()},open:e&&null!==a,size:"M",title:(0,n.jsx)(s.r,{children:(0,b.t)("workflow-modal.log-time")}),children:(0,n.jsxs)(c.l,{form:h,layout:"vertical",onFinish:e=>{null!==a&&m(a.action,a.transition,a.workflowName,{notes:e.notes,additional:{timeWorked:e.timeSpent}}),t()},children:[(0,n.jsx)(c.l.Item,{label:(0,b.t)("workflow-modal.timeSpent"),name:"timeSpent",rules:[{required:!0,message:(0,b.t)("workflow-modal.timeSpent-required")}],children:(0,n.jsx)(u.Input,{})}),(0,n.jsx)(c.l.Item,{label:(0,b.t)("workflow-modal.notes"),name:"notes",rules:[{required:!0,message:(0,b.t)("workflow-modal.notes-required")}],children:(0,n.jsx)(u.Input.TextArea,{rows:4})})]})})}},10466:function(e,t,a){a.d(t,{x:()=>v});var n=a(85893),l=a(40483),i=a(94374),o=a(37603),r=a(11173),s=a(81343),d=a(62588),c=a(24861),u=a(51469),b=a(53478);a(81004);var p=a(71695),h=a(54626),m=a(54658),f=a(30873),g=a(23526);let v=()=>{let{t:e}=(0,p.useTranslation)(),t=(0,r.U8)(),[a]=(0,h.Fg)(),v=(0,l.useAppDispatch)(),{openDataObject:x}=(0,m.n)(),{isTreeActionAllowed:j}=(0,c._)(),{getClassDefinitionsForCurrentUser:y}=(0,f.C)(),w=(t,a)=>({label:e(t.name),key:t.id,icon:"class"===t.icon.value?(0,n.jsx)(o.J,{subIconName:"new",subIconVariant:"green",value:"data-object"}):(0,n.jsx)(o.J,{subIconName:"new",subIconVariant:"green",...t.icon}),onClick:()=>{k(t,parseInt(a.id))}}),k=(a,n,l)=>{t.input({title:e("data-object.create-data-object",{className:a.name}),label:e("form.label.new-item"),rule:{required:!0,message:e("form.validation.required")},onOk:async e=>{await T(a.id,e,n),null==l||l(e)}})},T=async(e,t,n)=>{let l=a({parentId:n,dataObjectAddParameters:{key:t,classId:e,type:"object"}});try{let e=await l;if(void 0!==e.error)return void(0,s.ZP)(new s.MS(e.error));let{id:t}=e.data;x({config:{id:t}}),v((0,i.D9)({nodeId:String(n),elementType:"data-object"}))}catch(e){(0,s.ZP)(new s.aE("Error creating data object"))}};return{addObjectTreeContextMenuItem:t=>({label:e("data-object.tree.context-menu.add-object"),key:g.N.addObject,icon:(0,n.jsx)(o.J,{value:"folder"}),hidden:!j(u.W.Add)||!(0,d.x)(t.permissions,"create")||(0,b.isEmpty)(y()),children:(t=>{let a=[],l=[...y()].sort((e,t)=>e.name.localeCompare(t.name)).reduce((e,t)=>{let a=(0,b.isNil)(t.group)||(0,b.isEmpty)(t.group)?"undefined":t.group;return void 0===e[a]&&(e[a]=[]),e[a].push(t),e},{});for(let[i,r]of(void 0!==l.undefined&&(a=l.undefined.map(e=>w(e,t))),Object.entries(l)))"undefined"!==i&&a.push({label:e(i),key:"add-object-group-"+i,icon:(0,n.jsx)(o.J,{value:"folder"}),children:r.map(e=>w(e,t))});return a})(t)})}}},38472:function(e,t,a){a.d(t,{M:()=>r,g:()=>o});var n=a(85893),l=a(81004),i=a(62368);let o=(0,l.createContext)({currentLayout:null,setCurrentLayout:()=>{}}),r=e=>{let{children:t,defaultLayout:a,isLoading:r}=e,[s,d]=(0,l.useState)(null),c=(0,l.useRef)(!1);(0,l.useEffect)(()=>{c.current||r||null===a||(d(a),c.current=!0)},[a,r]);let u=(0,l.useMemo)(()=>({currentLayout:s,setCurrentLayout:d}),[s]);return(0,n.jsx)(o.Provider,{value:u,children:r?(0,n.jsx)(i.V,{loading:!0}):t})}},2090:function(e,t,a){a.d(t,{k:()=>c});var n=a(85893),l=a(81004),i=a(26597),o=a(61442);let r=e=>{let{currentLanguage:t,setCurrentLanguage:a}=(0,i.X)();return(0,n.jsx)(o.X,{isNullable:e.isNullable,onChange:a,value:t})};var s=a(47196),d=a(90165);let c=()=>{let{hasLocalizedFields:e}=(0,i.X)(),{id:t}=(0,l.useContext)(s.f),{editorType:a}=(0,d.H)(t);return e||(null==a?void 0:a.name)==="folder"?(0,n.jsx)(r,{}):(0,n.jsx)(n.Fragment,{})}},70439:function(e,t,a){a.d(t,{_:()=>F});var n=a(85893),l=a(81004),i=a(61949),o=a(47196),r=a(62368),s=a(90165),d=a(29981),c=a(76362),u=a(98926),b=a(52309),p=a(86493),h=a(60027),m=a(27775),f=a(34091);let g=()=>(0,n.jsx)(u.o,{children:(0,n.jsxs)(h.v,{children:[(0,n.jsx)(b.k,{children:(0,n.jsx)(f.O,{slot:m.O.dataObject.editor.toolbar.slots.left.name})}),(0,n.jsx)(b.k,{align:"center",gap:"extra-small",style:{height:"32px"},vertical:!1,children:(0,n.jsx)(f.O,{slot:m.O.dataObject.editor.toolbar.slots.right.name})}),(0,n.jsx)(p.L,{})]})});var v=a(94593),x=a(4851),j=a(71388),y=a(90579),w=a(78040),k=a(80087),T=a(46376);let O=e=>{let{id:t}=e,{isLoading:a,isError:u,dataObject:b,editorType:p}=(0,s.H)(t),h=(0,i.Q)(),{setContext:m,removeContext:f}=(0,d.J)();return((0,l.useEffect)(()=>()=>{f()},[]),(0,l.useEffect)(()=>(h&&m({id:t}),()=>{h||f()}),[h]),a)?(0,n.jsx)(r.V,{loading:!0}):u?(0,n.jsx)(r.V,{padded:!0,children:(0,n.jsx)(k.b,{message:"Error: Loading of data object failed",type:"error"})}):void 0===b||void 0===p?(0,n.jsx)(n.Fragment,{}):(0,n.jsx)(o.g,{id:t,children:(0,n.jsx)(w.U,{children:(0,n.jsx)(j.L,{children:(0,n.jsx)(y.k,{children:(0,n.jsx)(x.O,{children:(0,n.jsx)(v.S,{dataTestId:`data-object-editor-${(0,T.rR)(t.toString())}`,renderTabbar:(0,n.jsx)(c.T,{elementEditorType:p}),renderToolbar:(0,n.jsx)(g,{})})})})})})})};var S=a(88087),C=a(38472),D=a(9622),I=a(71695),L=a(46309),P=a(65709);let F={name:"data-object-editor",component:e=>{let{id:t}=e,{getDefaultLayoutId:a,isLoading:l}=(0,S.z)(t);return(0,n.jsx)(C.M,{defaultLayout:a(),isLoading:l,children:(0,n.jsx)(O,{id:t})})},titleComponent:e=>{let{node:t}=e,{dataObject:a}=(0,s.H)(t.getConfig().id),{t:l}=(0,I.useTranslation)(),i=t.getName();return t.getName=()=>((null==a?void 0:a.parentId)===0&&(t.getName=()=>l("home")),(null==a?void 0:a.key)??i),(0,n.jsx)(D.X,{modified:(null==a?void 0:a.modified)??!1,node:t})},defaultGlobalContext:!1,isModified:e=>{let t=e.getConfig(),a=(0,P.V8)(L.h.getState(),t.id);return(null==a?void 0:a.modified)??!1},getContextProvider:(e,t)=>{let a=e.config;return(0,n.jsx)(o.g,{id:a.id,children:t})}}},98994:function(e,t,a){a.d(t,{X:()=>p});var n=a(85893),l=a(37603),i=a(3848),o=a(51469),r=a(81004),s=a(71695),d=a(77),c=a(62588),u=a(24861),b=a(23526);let p=e=>{let{t}=(0,s.useTranslation)(),{isTreeActionAllowed:a}=(0,u._)(),{executeElementTask:p}=(0,d.f)(),[h,m]=(0,r.useState)(!1),f=e=>!(0,c.x)(e.permissions,"unpublish")||"folder"===e.type||e.isLocked,g=(t,a)=>{p(e,"string"==typeof t.id?parseInt(t.id):t.id,i.R.Unpublish,a)};return{unpublishTreeContextMenuItem:e=>({label:t("element.unpublish"),key:b.N.unpublish,isLoading:h,icon:(0,n.jsx)(l.J,{value:"eye-off"}),hidden:!1===e.isPublished||!a(o.W.Unpublish)||f(e),onClick:()=>{g(e)}}),unpublishContextMenuItem:(e,a)=>({label:t("element.unpublish"),key:b.N.unpublish,isLoading:h,icon:(0,n.jsx)(l.J,{value:"eye-off"}),hidden:!e.published||f(e),onClick:()=>{m(!0),g(e,()=>{null==a||a(),m(!1)})}}),unpublishTreeNode:g}}},94593:function(e,t,a){a.d(t,{S:()=>i});var n=a(85893);a(81004);let l=(0,a(29202).createStyles)(e=>{let{token:t,css:a}=e;return{tabbarToolbar:a`
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
    `}},{hashPriority:"low"}),i=e=>{let{styles:t}=l();return(0,n.jsxs)("div",{className:["tabs-toolbar-layout",t.tabbarToolbar].join(" "),"data-testid":e.dataTestId,children:[(0,n.jsx)("div",{className:"tabs-toolbar-layout__tabbar",children:e.renderTabbar}),(0,n.jsx)("div",{className:"tabs-toolbar-layout__toolbar",children:e.renderToolbar})]})}},76362:function(e,t,a){a.d(t,{T:()=>A});var n=a(85893),l=a(81004);let i=(0,a(29202).createStyles)(e=>{let{token:t,css:a}=e;return{editorTabsContainer:a`
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
    `}},{hashPriority:"low"});var o=a(26788),r=a(58793),s=a.n(r),d=a(81354),c=a(45628),u=a.n(c),b=a(80054),p=a(33159);let h=e=>{let{tabKey:t,activeTabKey:a,tabKeyInFocus:i,tabKeyOutOfFocus:r,title:s,children:d}=e,[c,u]=(0,l.useState)(null);return(0,l.useEffect)(()=>{void 0!==i&&u(i)},[i]),(0,l.useEffect)(()=>{void 0!==r&&r===c&&u(null)},[r]),(0,n.jsx)(o.Tooltip,{open:c===t&&a!==t,placement:"top",title:s,children:(0,n.jsx)("div",{onMouseEnter:()=>{u(t)},onMouseLeave:()=>{u(null)},children:d})})};var m=a(35015),f=a(51776),g=a(97473),v=a(62588),x=a(35950),j=a(93383),y=a(44780);let w=e=>{let{defaultActiveKey:t,showLabelIfActive:a,items:r}=e,{styles:c}=i(),{detachWidget:w}=(()=>{let{openBottomWidget:e}=(0,d.A)(),t=(0,b.O)();return{detachWidget:a=>{let{tabKey:n,config:l={}}=a,i=t.getTab(n);void 0!==i&&e({name:u().t(String(i.label)),id:`${n}-detached`,component:"detachable-tab",config:{...l,icon:i.icon.props,tabKey:n}})}}})(),{id:k,elementType:T}=(0,m.i)(),{activeTab:O,setActiveTab:S}=(0,g.q)(k,T),[C,D]=(0,l.useState)(void 0),[I,L]=(0,l.useState)(void 0),P=(0,g.q)(k,T).element,F=(0,l.useRef)(null),{width:M}=(0,f.Z)(F);(0,l.useEffect)(()=>{null===O&&(null==r?void 0:r.length)>0&&S(r[0].key)},[r]);let $=null==r?void 0:r.map(e=>e.key),A=e=>{let t=e.target.id;return $.find(e=>t.includes(e))};return r=null==(r=r.filter(e=>!(void 0!==e.hidden&&e.hidden(P))&&(void 0===e.workspacePermission||(null==P?void 0:P.permissions)===void 0||!!(0,v.x)(P.permissions,e.workspacePermission))&&(void 0===e.userPermission||!!(0,x.y)(e.userPermission))))?void 0:r.map(e=>{let t={...e,originalLabel:e.label,icon:(0,n.jsx)(h,{activeTabKey:O,tabKey:e.key,tabKeyInFocus:C,tabKeyOutOfFocus:I,title:e.label,children:e.icon})};return!0===t.isDetachable&&(t.label=(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{children:t.label}),(0,n.jsx)(j.h,{className:"detachable-button",icon:{value:"share"},onClick:t=>{t.stopPropagation(),w({tabKey:e.key}),(null==r?void 0:r.length)>0&&S(r[0].key)},type:"link"})]})),t}),(0,n.jsx)("div",{className:c.editorTabsContainer,ref:F,children:(0,n.jsx)(o.Tabs,{activeKey:O??void 0,className:s()(c.editorTabs,{[c.onlyActiveLabel]:a}),defaultActiveKey:t,items:r,onBlur:e=>{L(A(e))},onFocus:e=>{D(A(e))},onTabClick:e=>{S(e)},tabBarExtraContent:{left:(0,n.jsx)(y.x,{padding:{left:"extra-small",top:"extra-small",bottom:"extra-small"},children:(0,n.jsx)(p.U,{editorTabsWidth:M,elementType:T,id:k})})}})})};var k=a(71695),T=a(80380),O=a(63826),S=a(8900),C=a(88148),D=a(50184),I=a(98994),L=a(17180),P=a(88340),F=a(43352),M=a(53478),$=a(30378);let A=e=>{let{elementEditorType:t}=e,{t:a}=(0,k.useTranslation)(),l=(0,T.$1)(t.tabManagerServiceId),{id:i,elementType:o}=(0,m.i)(),{element:r}=(0,g.q)(i,o),s=l.getTabs(),{rename:d}=(0,C.j)(o),{publishNode:c}=(0,D.K)(o),{unpublishTreeNode:u}=(0,I.X)(o),{refreshElement:b}=(0,P.C)(o),{locateInTree:p}=(0,F.B)(o),h=s.map((e,t)=>{let n={...s[t],label:"string"==typeof e.label?a(e.label):e.label};return"workflow"===e.key?{...n,hidden:()=>!(0,$.Z)(r,o)}:n});return(0,S.R)(()=>{null!=r&&d(r.id,(0,L.YJ)(r,o))},"rename"),(0,S.R)(()=>{null!=r&&c(r)},"publish"),(0,S.R)(()=>{null==r||(0,M.isNull)(o)||"asset"===o||u(r)},"unpublish"),(0,S.R)(()=>{null!=r&&b(r.id)},"refresh"),(0,S.R)(()=>{null!=r&&p(r.id)},"openInTree"),(0,n.jsx)(O.d,{tabManager:l,children:(0,n.jsx)(w,{defaultActiveKey:"1",items:h,showLabelIfActive:!0})})}}}]);