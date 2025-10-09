/*! For license information please see __federation_expose_modules__data_object.fba7ec8a.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["1085"],{98139:function(e,t,a){a.d(t,{F:()=>o});var n=a(28395),i=a(5554),l=a(60476);class o extends i.A{constructor(){super(),this.type="object"}}o=(0,n.gn)([(0,l.injectable)(),(0,n.w6)("design:type",Function),(0,n.w6)("design:paramtypes",[])],o)},88087:function(e,t,a){a.d(t,{z:()=>d});var n=a(90165),i=a(18962),l=a(81343),o=a(53478),r=a(47666),s=a(30378);let d=e=>{let{dataObject:t,isLoading:a}=(0,n.H)(e),{data:d,error:c,isLoading:u}=(0,i.ih)({objectId:e},{skip:void 0===t||"folder"===t.type});void 0!==c&&(0,l.ZP)(new l.MS(c));let b=void 0!==d?d.items:void 0,p=(0,s.Z)(t,"data-object"),{data:h,isFetching:f}=(0,r.d)({elementType:"data-object",elementId:e},{skip:!p});return{layouts:b,getDefaultLayoutId:e=>{if((0,o.isUndefined)(b))return null;let t=b.find(e=>e.default)??b.find(t=>t.id===e)??b.find(e=>e.id===(null==h?void 0:h.layoutId))??b.find(e=>"0"===e.id)??b[0]??null;return(null==t?void 0:t.id)??null},isLoading:a||f||u&&(null==t?void 0:t.type)!=="folder"}}},13221:function(e,t,a){a.r(t),a.d(t,{elementTypes:()=>p.a,addScheduleToDataObject:()=>l.SZ,slice:()=>l.tP,FolderTabManager:()=>v,resetDataObject:()=>l.tl,ObjectTabManager:()=>m.F,LanguageSelectionWithProvider:()=>x.F,useLanguageSelection:()=>T.X,setSchedulesForDataObject:()=>l.dx,SaveTaskType:()=>i.R,useDataObject:()=>s.v,setPropertiesForDataObject:()=>l.Hj,updateScheduleForDataObject:()=>l.lM,LanguageSelectionProvider:()=>y.O,publishDraft:()=>l.oi,removePropertyFromDataObject:()=>l.BS,addPropertyToDataObject:()=>l.pl,markObjectDataAsModified:()=>l.X1,removeScheduleFromDataObject:()=>l.e$,setActiveTabForDataObject:()=>l.P8,dataObjectsAdapter:()=>l.AX,useDataObjectDraft:()=>d.H,useDataObjectHelper:()=>c.n,useCustomLayouts:()=>r.z,LanguageSelection:()=>j.k,dataObjectReceived:()=>l.C9,useGlobalDataObjectContext:()=>u.J,updatePropertyForDataObject:()=>l.O$,DataObjectEditorWidget:()=>O._,removeDataObject:()=>l.cB,useModifiedObjectDataDraft:()=>o.n,useModifiedObjectDataReducers:()=>o.K,useQuantityValueUnits:()=>b.T,useSave:()=>i.O,setDraftData:()=>l.Bs,resetSchedulesChangesForDataObject:()=>l.bI,selectDataObjectById:()=>l.V8,setModifiedCells:()=>l.Zr,updateKey:()=>l.a9,useAddObject:()=>n.x,LanguageSelectionContext:()=>y.c,unpublishDraft:()=>l.pA,resetChanges:()=>l.sf});var n=a(10466),i=a(3848),l=a(65709),o=a(74152),r=a(88087),s=a(36545),d=a(90165),c=a(54658),u=a(29981),b=a(63738),p=a(77244),h=a(28395),f=a(5554),g=a(60476);class v extends f.A{constructor(){super(),this.type="folder"}}v=(0,h.gn)([(0,g.injectable)(),(0,h.w6)("design:type",Function),(0,h.w6)("design:paramtypes",[])],v);var m=a(98139),j=a(2090),x=a(29705),y=a(4851),T=a(26597),O=a(70439);void 0!==(e=a.hmd(e)).hot&&e.hot.accept()},10466:function(e,t,a){a.d(t,{x:()=>m});var n=a(85893),i=a(40483),l=a(94374),o=a(37603),r=a(11173),s=a(81343),d=a(62588),c=a(24861),u=a(51469),b=a(53478);a(81004);var p=a(71695),h=a(54626),f=a(54658),g=a(30873),v=a(23526);let m=()=>{let{t:e}=(0,p.useTranslation)(),t=(0,r.U8)(),[a]=(0,h.Fg)(),m=(0,i.useAppDispatch)(),{openDataObject:j}=(0,f.n)(),{isTreeActionAllowed:x}=(0,c._)(),{getClassDefinitionsForCurrentUser:y}=(0,g.C)(),T=(t,a)=>({label:e(t.name),key:t.id,icon:"class"===t.icon.value?(0,n.jsx)(o.J,{subIconName:"new",subIconVariant:"green",value:"data-object"}):(0,n.jsx)(o.J,{subIconName:"new",subIconVariant:"green",...t.icon}),onClick:()=>{O(t,parseInt(a.id))}}),O=(a,n,i)=>{t.input({title:e("data-object.create-data-object",{className:a.name}),label:e("form.label.new-item"),rule:{required:!0,message:e("form.validation.required")},onOk:async e=>{await k(a.id,e,n),null==i||i(e)}})},k=async(e,t,n)=>{let i=a({parentId:n,dataObjectAddParameters:{key:t,classId:e,type:"object"}});try{let e=await i;if(void 0!==e.error)return void(0,s.ZP)(new s.MS(e.error));let{id:t}=e.data;j({config:{id:t}}),m((0,l.D9)({nodeId:String(n),elementType:"data-object"}))}catch(e){(0,s.ZP)(new s.aE("Error creating data object"))}};return{addObjectTreeContextMenuItem:t=>({label:e("data-object.tree.context-menu.add-object"),key:v.N.addObject,icon:(0,n.jsx)(o.J,{value:"folder"}),hidden:!x(u.W.Add)||!(0,d.x)(t.permissions,"create")||(0,b.isEmpty)(y()),children:(t=>{let a=[],i=[...y()].sort((e,t)=>e.name.localeCompare(t.name)).reduce((e,t)=>{let a=(0,b.isNil)(t.group)||(0,b.isEmpty)(t.group)?"undefined":t.group;return void 0===e[a]&&(e[a]=[]),e[a].push(t),e},{});for(let[l,r]of(void 0!==i.undefined&&(a=i.undefined.map(e=>T(e,t))),Object.entries(i)))"undefined"!==l&&a.push({label:e(l),key:"add-object-group-"+l,icon:(0,n.jsx)(o.J,{value:"folder"}),children:r.map(e=>T(e,t))});return a})(t)})}}},38472:function(e,t,a){a.d(t,{M:()=>r,g:()=>o});var n=a(85893),i=a(81004),l=a(62368);let o=(0,i.createContext)({currentLayout:null,setCurrentLayout:()=>{}}),r=e=>{let{children:t,defaultLayout:a,isLoading:r}=e,[s,d]=(0,i.useState)(a);(0,i.useEffect)(()=>{null===s&&null!==a&&d(a)},[a]);let c=(0,i.useMemo)(()=>({currentLayout:s,setCurrentLayout:d}),[s]);return(0,n.jsx)(o.Provider,{value:c,children:r?(0,n.jsx)(l.V,{loading:!0}):t})}},2090:function(e,t,a){a.d(t,{k:()=>c});var n=a(85893),i=a(81004),l=a(26597),o=a(61442);let r=e=>{let{currentLanguage:t,setCurrentLanguage:a}=(0,l.X)();return(0,n.jsx)(o.X,{isNullable:e.isNullable,onChange:a,value:t})};var s=a(47196),d=a(90165);let c=()=>{let{hasLocalizedFields:e}=(0,l.X)(),{id:t}=(0,i.useContext)(s.f),{editorType:a}=(0,d.H)(t);return e||(null==a?void 0:a.name)==="folder"?(0,n.jsx)(r,{}):(0,n.jsx)(n.Fragment,{})}},70439:function(e,t,a){a.d(t,{_:()=>M});var n=a(85893),i=a(81004),l=a(61949),o=a(47196),r=a(62368),s=a(90165),d=a(29981),c=a(76362),u=a(98926),b=a(52309),p=a(10773),h=a(25367),f=a(27775),g=a(34091);let v=()=>(0,n.jsx)(u.o,{children:(0,n.jsxs)(h.v,{children:[(0,n.jsx)(b.k,{children:(0,n.jsx)(g.O,{slot:f.O.dataObject.editor.toolbar.slots.left.name})}),(0,n.jsx)(b.k,{align:"center",gap:"extra-small",style:{height:"32px"},vertical:!1,children:(0,n.jsx)(g.O,{slot:f.O.dataObject.editor.toolbar.slots.right.name})}),(0,n.jsx)(p.L,{})]})});var m=a(94593),j=a(4851),x=a(71388),y=a(90579),T=a(78040),O=a(80087),k=a(46376);let w=e=>{let{id:t}=e,{isLoading:a,isError:u,dataObject:b,editorType:p}=(0,s.H)(t),h=(0,l.Q)(),{setContext:f,removeContext:g}=(0,d.J)();return((0,i.useEffect)(()=>()=>{g()},[]),(0,i.useEffect)(()=>(h&&f({id:t}),()=>{h||g()}),[h]),a)?(0,n.jsx)(r.V,{loading:!0}):u?(0,n.jsx)(r.V,{padded:!0,children:(0,n.jsx)(O.b,{message:"Error: Loading of data object failed",type:"error"})}):void 0===b||void 0===p?(0,n.jsx)(n.Fragment,{}):(0,n.jsx)(o.g,{id:t,children:(0,n.jsx)(T.U,{children:(0,n.jsx)(x.L,{children:(0,n.jsx)(y.k,{children:(0,n.jsx)(j.O,{children:(0,n.jsx)(m.S,{dataTestId:`data-object-editor-${(0,k.rR)(t.toString())}`,renderTabbar:(0,n.jsx)(c.T,{elementEditorType:p}),renderToolbar:(0,n.jsx)(v,{})})})})})})})};var S=a(88087),C=a(38472),D=a(9622),I=a(71695),P=a(46309),L=a(65709);let M={name:"data-object-editor",component:e=>{let{id:t}=e,{getDefaultLayoutId:a,isLoading:i}=(0,S.z)(t);return(0,n.jsx)(C.M,{defaultLayout:a(),isLoading:i,children:(0,n.jsx)(w,{id:t})})},titleComponent:e=>{let{node:t}=e,{dataObject:a}=(0,s.H)(t.getConfig().id),{t:i}=(0,I.useTranslation)(),l=t.getName();return t.getName=()=>((null==a?void 0:a.parentId)===0&&(t.getName=()=>i("home")),(null==a?void 0:a.key)??l),(0,n.jsx)(D.X,{modified:(null==a?void 0:a.modified)??!1,node:t})},defaultGlobalContext:!1,isModified:e=>{let t=e.getConfig(),a=(0,L.V8)(P.h.getState(),t.id);return(null==a?void 0:a.modified)??!1},getContextProvider:(e,t)=>{let a=e.config;return(0,n.jsx)(o.g,{id:a.id,children:t})}}},98994:function(e,t,a){a.d(t,{X:()=>p});var n=a(85893),i=a(37603),l=a(3848),o=a(51469),r=a(81004),s=a(71695),d=a(77),c=a(62588),u=a(24861),b=a(23526);let p=e=>{let{t}=(0,s.useTranslation)(),{isTreeActionAllowed:a}=(0,u._)(),{executeElementTask:p}=(0,d.f)(),[h,f]=(0,r.useState)(!1),g=e=>!(0,c.x)(e.permissions,"unpublish")||"folder"===e.type||e.isLocked,v=(t,a)=>{p(e,"string"==typeof t.id?parseInt(t.id):t.id,l.R.Unpublish,a)};return{unpublishTreeContextMenuItem:e=>({label:t("element.unpublish"),key:b.N.unpublish,isLoading:h,icon:(0,n.jsx)(i.J,{value:"eye-off"}),hidden:!1===e.isPublished||!a(o.W.Unpublish)||g(e),onClick:()=>{v(e)}}),unpublishContextMenuItem:(e,a)=>({label:t("element.unpublish"),key:b.N.unpublish,isLoading:h,icon:(0,n.jsx)(i.J,{value:"eye-off"}),hidden:!e.published||g(e),onClick:()=>{f(!0),v(e,()=>{null==a||a(),f(!1)})}}),unpublishTreeNode:v}}},94593:function(e,t,a){a.d(t,{S:()=>l});var n=a(85893);a(81004);let i=(0,a(29202).createStyles)(e=>{let{token:t,css:a}=e;return{tabbarToolbar:a`
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
    `}},{hashPriority:"low"}),l=e=>{let{styles:t}=i();return(0,n.jsxs)("div",{className:["tabs-toolbar-layout",t.tabbarToolbar].join(" "),"data-testid":e.dataTestId,children:[(0,n.jsx)("div",{className:"tabs-toolbar-layout__tabbar",children:e.renderTabbar}),(0,n.jsx)("div",{className:"tabs-toolbar-layout__toolbar",children:e.renderToolbar})]})}},76362:function(e,t,a){a.d(t,{T:()=>A});var n=a(85893),i=a(81004);let l=(0,a(29202).createStyles)(e=>{let{token:t,css:a}=e;return{editorTabsContainer:a`
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
    `}},{hashPriority:"low"});var o=a(26788),r=a(58793),s=a.n(r),d=a(81354),c=a(45628),u=a.n(c),b=a(80054),p=a(33159);let h=e=>{let{tabKey:t,activeTabKey:a,tabKeyInFocus:l,tabKeyOutOfFocus:r,title:s,children:d}=e,[c,u]=(0,i.useState)(null);return(0,i.useEffect)(()=>{void 0!==l&&u(l)},[l]),(0,i.useEffect)(()=>{void 0!==r&&r===c&&u(null)},[r]),(0,n.jsx)(o.Tooltip,{open:c===t&&a!==t,placement:"top",title:s,children:(0,n.jsx)("div",{onMouseEnter:()=>{u(t)},onMouseLeave:()=>{u(null)},children:d})})};var f=a(35015),g=a(51776),v=a(97473),m=a(62588),j=a(35950),x=a(93383),y=a(44780);let T=e=>{let{defaultActiveKey:t,showLabelIfActive:a,items:r}=e,{styles:c}=l(),{detachWidget:T}=(()=>{let{openBottomWidget:e}=(0,d.A)(),t=(0,b.O)();return{detachWidget:a=>{let{tabKey:n,config:i={}}=a,l=t.getTab(n);void 0!==l&&e({name:u().t(String(l.label)),id:`${n}-detached`,component:"detachable-tab",config:{...i,icon:l.icon.props,tabKey:n}})}}})(),{id:O,elementType:k}=(0,f.i)(),{activeTab:w,setActiveTab:S}=(0,v.q)(O,k),[C,D]=(0,i.useState)(void 0),[I,P]=(0,i.useState)(void 0),L=(0,v.q)(O,k).element,M=(0,i.useRef)(null),{width:$}=(0,g.Z)(M);(0,i.useEffect)(()=>{null===w&&(null==r?void 0:r.length)>0&&S(r[0].key)},[r]);let F=null==r?void 0:r.map(e=>e.key),A=e=>{let t=e.target.id;return F.find(e=>t.includes(e))};return r=null==(r=r.filter(e=>!(void 0!==e.hidden&&e.hidden(L))&&(void 0===e.workspacePermission||(null==L?void 0:L.permissions)===void 0||!!(0,m.x)(L.permissions,e.workspacePermission))&&(void 0===e.userPermission||!!(0,j.y)(e.userPermission))))?void 0:r.map(e=>{let t={...e,originalLabel:e.label,icon:(0,n.jsx)(h,{activeTabKey:w,tabKey:e.key,tabKeyInFocus:C,tabKeyOutOfFocus:I,title:e.label,children:e.icon})};return!0===t.isDetachable&&(t.label=(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{children:t.label}),(0,n.jsx)(x.h,{className:"detachable-button",icon:{value:"share"},onClick:t=>{t.stopPropagation(),T({tabKey:e.key}),(null==r?void 0:r.length)>0&&S(r[0].key)},type:"link"})]})),t}),(0,n.jsx)("div",{className:c.editorTabsContainer,ref:M,children:(0,n.jsx)(o.Tabs,{activeKey:w??void 0,className:s()(c.editorTabs,{[c.onlyActiveLabel]:a}),defaultActiveKey:t,items:r,onBlur:e=>{P(A(e))},onFocus:e=>{D(A(e))},onTabClick:e=>{S(e)},tabBarExtraContent:{left:(0,n.jsx)(y.x,{padding:{left:"extra-small",top:"extra-small",bottom:"extra-small"},children:(0,n.jsx)(p.U,{editorTabsWidth:$,elementType:k,id:O})})}})})};var O=a(71695),k=a(80380),w=a(63826),S=a(8900),C=a(88148),D=a(50184),I=a(98994),P=a(17180),L=a(88340),M=a(43352),$=a(53478),F=a(30378);let A=e=>{let{elementEditorType:t}=e,{t:a}=(0,O.useTranslation)(),i=(0,k.$1)(t.tabManagerServiceId),{id:l,elementType:o}=(0,f.i)(),{element:r}=(0,v.q)(l,o),s=i.getTabs(),{rename:d}=(0,C.j)(o),{publishNode:c}=(0,D.K)(o),{unpublishTreeNode:u}=(0,I.X)(o),{refreshElement:b}=(0,L.C)(o),{locateInTree:p}=(0,M.B)(o),h=s.map((e,t)=>{let n={...s[t],label:"string"==typeof e.label?a(e.label):e.label};return"workflow"===e.key?{...n,hidden:()=>!(0,F.Z)(r,o)}:n});return(0,S.R)(()=>{null!=r&&d(r.id,(0,P.YJ)(r,o))},"rename"),(0,S.R)(()=>{null!=r&&c(r)},"publish"),(0,S.R)(()=>{null==r||(0,$.isNull)(o)||"asset"===o||u(r)},"unpublish"),(0,S.R)(()=>{null!=r&&b(r.id)},"refresh"),(0,S.R)(()=>{null!=r&&p(r.id)},"openInTree"),(0,n.jsx)(w.d,{tabManager:i,children:(0,n.jsx)(T,{defaultActiveKey:"1",items:h,showLabelIfActive:!0})})}}}]);