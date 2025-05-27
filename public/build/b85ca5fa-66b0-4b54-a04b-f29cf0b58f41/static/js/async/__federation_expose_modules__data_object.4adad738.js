/*! For license information please see __federation_expose_modules__data_object.4adad738.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["85"],{51776:function(e,t,a){a.d(t,{Z:()=>i});var n=a(81004);let i=e=>{let[t,a]=(0,n.useState)(0);return(0,n.useLayoutEffect)(()=>{var t;a((null==(t=e.current)?void 0:t.getBoundingClientRect().width)??0)},[]),(0,n.useEffect)(()=>{if(null==e.current)return;let t=new ResizeObserver(e=>{let[t]=e,n=t.contentRect.width;a(e=>0!==n&&e!==n?n:e)});return t.observe(e.current),()=>{t.disconnect()}},[e]),t}},37793:function(e,t,a){a.r(t),a.d(t,{useDraftDataReducers:()=>w.ZF,SaveTaskType:()=>y.R,useQuantityValueUnits:()=>$.T,resetDataObject:()=>O.tl,useCustomLayouts:()=>T.z,useDeleteDraft:()=>x._,useAddObject:()=>j,addPropertyToDataObject:()=>O.pl,removePropertyFromDataObject:()=>O.BS,updatePropertyForDataObject:()=>O.O$,useLanguageSelection:()=>X.X,setModifiedCells:()=>O.Zr,LanguageSelectionContext:()=>N.c,setActiveTabForDataObject:()=>O.P8,removeScheduleFromDataObject:()=>O.e$,addScheduleToDataObject:()=>O.SZ,LanguageSelectionProvider:()=>N.O,setPropertiesForDataObject:()=>O.Hj,setSchedulesForDataObject:()=>O.dx,setDraftData:()=>O.Bs,DataObjectEditorWidget:()=>eS,useModifiedObjectDataReducers:()=>D.K,useSave:()=>y.O,IS_AUTO_SAVE_DRAFT_CREATED:()=>w.hD,dataObjectsAdapter:()=>O.AX,elementTypes:()=>P.a,removeDataObject:()=>O.cB,markObjectDataAsModified:()=>O.X1,useModifiedObjectDataDraft:()=>D.n,LanguageSelection:()=>L.k,useDataObjectHelper:()=>v.n,resetChanges:()=>O.sf,unpublishDraft:()=>O.pA,FolderTabManager:()=>E,useDataObject:()=>S,useDataObjectDraft:()=>C.H,useDraftDataDraft:()=>w.M,publishDraft:()=>O.oi,ObjectTabManager:()=>F,updateScheduleForDataObject:()=>O.lM,slice:()=>O.tP,updateKey:()=>O.a9,dataObjectReceived:()=>O.C9,useGlobalDataObjectContext:()=>A.J,selectDataObjectById:()=>O.V8,resetSchedulesChangesForDataObject:()=>O.bI});var n=a(85893),i=a(46309),o=a(94374),r=a(55859),l=a(38119),s=a(66660),d=a(62588),c=a(11093),b=a(51469),u=a(96486),p=a(81004),h=a(74976),g=a(54626),v=a(54658),f=a(71125),m=a(23526);let j=()=>{let{t:e}=(0,h.$G)(),t=(0,l.U8)(),[a]=(0,g.Fg)(),p=(0,i.TL)(),{openDataObject:j}=(0,v.n)(),{isTreeActionAllowed:x}=(0,c._)(),{getClassDefinitionsForCurrentUser:y}=(0,f.C)(),O=t=>{let a=[],i=[...y()].sort((e,t)=>e.name.localeCompare(t.name)).reduce((e,t)=>{let a=(0,u.isEmpty)(t.group)?"undefined":t.group;return void 0===e[a]&&(e[a]=[]),e[a].push(t),e},{});for(let[o,l]of(void 0!==i.undefined&&(a=i.undefined.map(e=>w(e,t))),Object.entries(i)))"undefined"!==o&&a.push({label:e(o),key:"add-object-group-"+o,icon:(0,n.jsx)(r.J,{value:"folder"}),children:l.map(e=>w(e,t))});return a},w=(t,a)=>({label:e(t.name),key:t.id,icon:"class"===t.icon.value?(0,n.jsx)(r.J,{subIconName:"new",subIconVariant:"green",value:"data-object"}):(0,n.jsx)(r.J,{subIconName:"new",subIconVariant:"green",...t.icon}),onClick:()=>{D(t,parseInt(a.id))}}),D=(a,n,i)=>{t.input({title:e("data-object.create-data-object",{className:a.name}),label:e("form.label.new-item"),rule:{required:!0,message:e("form.validation.required")},onOk:async e=>{await T(a.id,e,n),null==i||i(e)}})},T=async(e,t,n)=>{let i=a({parentId:n,dataObjectAddParameters:{key:t,classId:e,type:"object"}});try{let e=await i;if(void 0!==e.error)return void(0,s.ZP)(new s.MS(e.error));let{id:t}=e.data;j({config:{id:t}}),p((0,o.D9)({nodeId:String(n),elementType:"data-object"}))}catch(e){(0,s.ZP)(new s.aE("Error creating data object"))}},k=e=>!x(b.W.Add)||!(0,d.x)(e.permissions,"create")||(0,u.isEmpty)(y());return{addObjectTreeContextMenuItem:t=>({label:e("data-object.tree.context-menu.add-object"),key:m.N.addObject,icon:(0,n.jsx)(r.J,{value:"folder"}),hidden:k(t),children:O(t)})}};var x=a(10186),y=a(98319),O=a(84475),w=a(88983),D=a(74152),T=a(88087),k=a(68922);let S=()=>{let{id:e}=(0,p.useContext)(k.f);return{id:e}};var C=a(90165),A=a(29981),$=a(63738),P=a(28590),M=a(28395),I=a(5554),_=a(14216);class E extends I.A{constructor(){super(),this.type="folder"}}E=(0,M.gn)([(0,_.injectable)(),(0,M.w6)("design:type",Function),(0,M.w6)("design:paramtypes",[])],E);class F extends I.A{constructor(){super(),this.type="object"}}F=(0,M.gn)([(0,_.injectable)(),(0,M.w6)("design:type",Function),(0,M.w6)("design:paramtypes",[])],F);var L=a(44171),N=a(51791),X=a(64235),K=a(98482),R=a(19505);let H=()=>{let e=(0,i.CG)(K.u6),t=(0,p.useContext)(R.M);return null!==e&&e.nodeId===t.nodeId};var V=a(77476),Z=a(28651);let B=(0,Z.kc)(e=>{let{token:t,css:a}=e;return{editorTabsContainer:a`
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
    `}},{hashPriority:"low"});var U=a(26788),J=a(63387),W=a.n(J),q=a(81354),z=a(20994),G=a(80054);let Q=()=>{let{openBottomWidget:e}=(0,q.A)(),t=(0,G.O)();return{detachWidget:a=>{let{tabKey:n,config:i={}}=a,o=t.getTab(n);void 0!==o&&e({name:z.ZP.t(String(o.label)),id:`${n}-detached`,component:"detachable-tab",config:{...i,icon:o.icon.props,tabKey:n}})}}};var Y=a(57732);let ee=e=>{let{tabKey:t,activeTabKey:a,tabKeyInFocus:i,tabKeyOutOfFocus:o,title:r,children:l}=e,[s,d]=(0,p.useState)(null);return(0,p.useEffect)(()=>{void 0!==i&&d(i)},[i]),(0,p.useEffect)(()=>{void 0!==o&&o===s&&d(null)},[o]),(0,n.jsx)(U.Tooltip,{open:s===t&&a!==t,placement:"top",title:r,children:(0,n.jsx)("div",{onMouseEnter:()=>{d(t)},onMouseLeave:()=>{d(null)},children:l})})};var et=a(61813),ea=a(51776),en=a(95461),ei=a(35950),eo=a(84666),er=a(84901);let el=e=>{let{defaultActiveKey:t,showLabelIfActive:a,items:i}=e,{styles:o}=B(),{detachWidget:r}=Q(),{id:l,elementType:s}=(0,et.i)(),{activeTab:c,setActiveTab:b}=(0,en.q)(l,s),[u,h]=(0,p.useState)(void 0),[g,v]=(0,p.useState)(void 0),f=(0,en.q)(l,s).element,m=(0,p.useRef)(null),j=(0,ea.Z)(m);(0,p.useEffect)(()=>{null===c&&(null==i?void 0:i.length)>0&&b(i[0].key)},[i]);let x=null==i?void 0:i.map(e=>e.key),y=e=>{let t=e.target.id;return x.find(e=>t.includes(e))},O=e=>{r(e),(null==i?void 0:i.length)>0&&b(i[0].key)};return i=null==(i=i.filter(e=>!(void 0!==e.hidden&&e.hidden(f))&&(void 0===e.workspacePermission||(null==f?void 0:f.permissions)===void 0||!!(0,d.x)(f.permissions,e.workspacePermission))&&(void 0===e.userPermission||!!(0,ei.y)(e.userPermission))))?void 0:i.map(e=>{let t={...e,originalLabel:e.label,icon:(0,n.jsx)(ee,{activeTabKey:c,tabKey:e.key,tabKeyInFocus:u,tabKeyOutOfFocus:g,title:e.label,children:e.icon})};return!0===t.isDetachable&&(t.label=(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{children:t.label}),(0,n.jsx)(eo.h,{className:"detachable-button",icon:{value:"share"},onClick:t=>{t.stopPropagation(),O({tabKey:e.key})},type:"link"})]})),t}),(0,n.jsx)("div",{className:o.editorTabsContainer,ref:m,children:(0,n.jsx)(U.Tabs,{activeKey:c??void 0,className:W()(o.editorTabs,{[o.onlyActiveLabel]:a}),defaultActiveKey:t,items:i,onBlur:e=>{v(y(e))},onFocus:e=>{h(y(e))},onTabClick:e=>{b(e)},tabBarExtraContent:{left:(0,n.jsx)(er.x,{padding:{left:"extra-small",top:"extra-small",bottom:"extra-small"},children:(0,n.jsx)(Y.U,{editorTabsWidth:j,elementType:s,id:l})})}})})};var es=a(80380),ed=a(59255);let ec=e=>{let{elementEditorType:t}=e,{t:a}=(0,h.$G)(),i=(0,es.$1)(t.tabManagerServiceId),{id:o,elementType:r}=(0,et.i)(),{element:l}=(0,en.q)(o,r),s=i.getTabs(),d=s.map((e,t)=>{let n={...s[t],label:"string"==typeof e.label?a(e.label):e.label};return"workflow"===e.key?{...n,hidden:()=>(null==l?void 0:l.hasWorkflowAvailable)===!1||(null==l?void 0:l.hasWorkflowAvailable)===void 0}:n});return(0,n.jsx)(ed.d,{tabManager:i,children:(0,n.jsx)(el,{defaultActiveKey:"1",items:d,showLabelIfActive:!0})})};var eb=a(47755),eu=a(68686),ep=a(3129),eh=a(12174),eg=a(54416),ev=a(27614);let ef=()=>(0,n.jsx)(eb.o,{children:(0,n.jsxs)(eh.v,{children:[(0,n.jsx)(eu.k,{children:(0,n.jsx)(ev.O,{slot:eg.O.dataObject.editor.toolbar.slots.left})}),(0,n.jsx)(eu.k,{align:"center",gap:"extra-small",style:{height:"32px"},vertical:!1,children:(0,n.jsx)(ev.O,{slot:eg.O.dataObject.editor.toolbar.slots.right})}),(0,n.jsx)(ep.L,{})]})}),em=(0,Z.kc)(e=>{let{token:t,css:a}=e;return{tabbarToolbar:a`
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
    `}},{hashPriority:"low"}),ej=e=>{let{styles:t}=em();return(0,n.jsxs)("div",{className:["tabs-toolbar-layout",t.tabbarToolbar].join(" "),children:[(0,n.jsx)("div",{className:"tabs-toolbar-layout__tabbar",children:e.renderTabbar}),(0,n.jsx)("div",{className:"tabs-toolbar-layout__toolbar",children:e.renderToolbar})]})};var ex=a(18639),ey=a(70774),eO=a(11773),ew=a(36414);let eD=e=>{let{id:t}=e,{isLoading:a,isError:i,dataObject:o,editorType:r}=(0,C.H)(t),l=H(),{setContext:s,removeContext:d}=(0,A.J)();return((0,p.useEffect)(()=>()=>{d()},[]),(0,p.useEffect)(()=>(l&&s({id:t}),()=>{l||d()}),[l]),a)?(0,n.jsx)(V.V,{loading:!0}):i?(0,n.jsx)(V.V,{padded:!0,children:(0,n.jsx)(ew.b,{message:"Error: Loading of data object failed",type:"error"})}):void 0===o||void 0===r?(0,n.jsx)(n.Fragment,{}):(0,n.jsx)(k.g,{id:t,children:(0,n.jsx)(eO.U,{children:(0,n.jsx)(ex.L,{children:(0,n.jsx)(ey.k,{children:(0,n.jsx)(N.O,{children:(0,n.jsx)(ej,{renderTabbar:(0,n.jsx)(ec,{elementEditorType:r}),renderToolbar:(0,n.jsx)(ef,{})})})})})})})};var eT=a(44158),ek=a(92430);let eS={name:"data-object-editor",component:e=>{let{id:t}=e,{getDefaultLayoutId:a,isLoading:i}=(0,T.z)(t);return(0,n.jsx)(eT.M,{defaultLayout:a(),isLoading:i,children:(0,n.jsx)(eD,{id:t})})},titleComponent:e=>{let{node:t}=e,{dataObject:a}=(0,C.H)(t.getConfig().id),{t:i}=(0,h.$G)(),o=t.getName();return t.getName=()=>((null==a?void 0:a.parentId)===0&&(t.getName=()=>i("home")),(null==a?void 0:a.key)??o),(0,n.jsx)(ek.X,{modified:(null==a?void 0:a.modified)??!1,node:t})},isModified:e=>{let t=e.getConfig(),a=(0,O.V8)(i.h.getState(),t.id);return(null==a?void 0:a.modified)??!1},getContextProvider:(e,t)=>{let a=e.config;return(0,n.jsx)(k.g,{id:a.id,children:t})}}}}]);