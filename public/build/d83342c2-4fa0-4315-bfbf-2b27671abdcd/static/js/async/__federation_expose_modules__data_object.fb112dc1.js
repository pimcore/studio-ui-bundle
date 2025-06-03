/*! For license information please see __federation_expose_modules__data_object.fb112dc1.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["1085"],{2433:function(e,t,a){a.d(t,{hi:()=>v,yK:()=>g,Rl:()=>j,y7:()=>m,zZ:()=>y,KD:()=>f,z4:()=>x,Bb:()=>h});var n=a(96068);let i=a(42125).api.enhanceEndpoints({addTagTypes:["Versions"]}).injectEndpoints({endpoints:e=>({versionAssetDownloadById:e.query({query:e=>({url:`/pimcore-studio/api/versions/${e.id}/asset/download`}),providesTags:["Versions"]}),versionImageStreamById:e.query({query:e=>({url:`/pimcore-studio/api/versions/${e.id}/image/stream`}),providesTags:["Versions"]}),versionPdfStreamById:e.query({query:e=>({url:`/pimcore-studio/api/versions/${e.id}/pdf/stream`}),providesTags:["Versions"]}),versionGetById:e.query({query:e=>({url:`/pimcore-studio/api/versions/${e.id}`}),providesTags:["Versions"]}),versionUpdateById:e.mutation({query:e=>({url:`/pimcore-studio/api/versions/${e.id}`,method:"PUT",body:e.updateVersion}),invalidatesTags:["Versions"]}),versionPublishById:e.mutation({query:e=>({url:`/pimcore-studio/api/versions/${e.id}`,method:"POST"}),invalidatesTags:["Versions"]}),versionDeleteById:e.mutation({query:e=>({url:`/pimcore-studio/api/versions/${e.id}`,method:"DELETE"}),invalidatesTags:["Versions"]}),versionGetCollectionForElementByTypeAndId:e.query({query:e=>({url:`/pimcore-studio/api/versions/${e.elementType}/${e.id}`,params:{page:e.page,pageSize:e.pageSize}}),providesTags:["Versions"]}),versionCleanupForElementByTypeAndId:e.mutation({query:e=>({url:`/pimcore-studio/api/versions/${e.elementType}/${e.id}`,method:"DELETE"}),invalidatesTags:["Versions"]})}),overrideExisting:!1}),{useVersionAssetDownloadByIdQuery:o,useVersionImageStreamByIdQuery:r,useVersionPdfStreamByIdQuery:s,useVersionGetByIdQuery:l,useVersionUpdateByIdMutation:d,useVersionPublishByIdMutation:u,useVersionDeleteByIdMutation:c,useVersionGetCollectionForElementByTypeAndIdQuery:b,useVersionCleanupForElementByTypeAndIdMutation:p}=i,v=i.enhanceEndpoints({addTagTypes:[n.fV.ASSET_DETAIL],endpoints:{versionGetById:{providesTags:(e,t,a)=>n.Kx.VERSIONS_DETAIL(a.id)},versionGetCollectionForElementByTypeAndId:{providesTags:(e,t,a)=>{let i=[];return null==e||e.items.forEach(e=>{i.push(...n.Kx.VERSIONS_DETAIL(e.id))}),[...i,...n.Kx.ELEMENT_VERSIONS(a.elementType,a.id)]}},versionCleanupForElementByTypeAndId:{invalidatesTags:(e,t,a)=>n.xc.ELEMENT_VERSIONS(a.elementType,a.id)},versionUpdateById:{invalidatesTags:(e,t,a)=>n.xc.VERSIONS_DETAIL(a.id)},versionPublishById:{invalidatesTags:(e,t,a)=>n.xc.VERSIONS_DETAIL(a.id)},versionDeleteById:{invalidatesTags:(e,t,a)=>n.xc.VERSIONS_DETAIL(a.id)}}}),{useVersionAssetDownloadByIdQuery:y,useVersionCleanupForElementByTypeAndIdMutation:g,useVersionDeleteByIdMutation:m,useVersionGetByIdQuery:h,useVersionGetCollectionForElementByTypeAndIdQuery:f,useVersionPublishByIdMutation:x,useVersionUpdateByIdMutation:j}=v},51776:function(e,t,a){a.d(t,{Z:()=>i});var n=a(81004);let i=e=>{let[t,a]=(0,n.useState)(0);return(0,n.useLayoutEffect)(()=>{var t;a((null==(t=e.current)?void 0:t.getBoundingClientRect().width)??0)},[]),(0,n.useEffect)(()=>{if(null==e.current)return;let t=new ResizeObserver(e=>{let[t]=e,n=t.contentRect.width;a(e=>0!==n&&e!==n?n:e)});return t.observe(e.current),()=>{t.disconnect()}},[e]),t}},59035:function(e,t,a){a.r(t),a.d(t,{useDraftDataReducers:()=>w.ZF,SaveTaskType:()=>E.R,useQuantityValueUnits:()=>B.T,resetDataObject:()=>O.tl,useCustomLayouts:()=>k,useDeleteDraft:()=>S,useAddObject:()=>f,addPropertyToDataObject:()=>O.pl,removePropertyFromDataObject:()=>O.BS,updatePropertyForDataObject:()=>O.O$,useLanguageSelection:()=>X.X,setModifiedCells:()=>O.Zr,LanguageSelectionContext:()=>H.c,setActiveTabForDataObject:()=>O.P8,removeScheduleFromDataObject:()=>O.e$,addScheduleToDataObject:()=>O.SZ,LanguageSelectionProvider:()=>H.O,setPropertiesForDataObject:()=>O.Hj,setSchedulesForDataObject:()=>O.dx,setDraftData:()=>O.Bs,DataObjectEditorWidget:()=>eP,useModifiedObjectDataReducers:()=>A.K,useSave:()=>E.O,IS_AUTO_SAVE_DRAFT_CREATED:()=>w.hD,dataObjectsAdapter:()=>O.AX,elementTypes:()=>P.a,removeDataObject:()=>O.cB,markObjectDataAsModified:()=>O.X1,useModifiedObjectDataDraft:()=>A.n,LanguageSelection:()=>U,useDataObjectHelper:()=>g.n,resetChanges:()=>O.sf,unpublishDraft:()=>O.pA,FolderTabManager:()=>N,useDataObject:()=>V,useDataObjectDraft:()=>j.H,useDraftDataDraft:()=>w.M,publishDraft:()=>O.oi,ObjectTabManager:()=>q,updateScheduleForDataObject:()=>O.lM,slice:()=>O.tP,updateKey:()=>O.a9,dataObjectReceived:()=>O.C9,useGlobalDataObjectContext:()=>$.J,selectDataObjectById:()=>O.V8,resetSchedulesChangesForDataObject:()=>O.bI});var n=a(85893),i=a(76139),o=a(94374),r=a(55859),s=a(38119),l=a(66660),d=a(62588),u=a(11093),c=a(51469),b=a(53478),p=a(81004),v=a(71695),y=a(54626),g=a(54658),m=a(71125),h=a(23526);let f=()=>{let{t:e}=(0,v.useTranslation)(),t=(0,s.U8)(),[a]=(0,y.Fg)(),p=(0,i.useAppDispatch)(),{openDataObject:f}=(0,g.n)(),{isTreeActionAllowed:x}=(0,u._)(),{getClassDefinitionsForCurrentUser:j}=(0,m.C)(),T=t=>{let a=[],i=[...j()].sort((e,t)=>e.name.localeCompare(t.name)).reduce((e,t)=>{let a=(0,b.isNil)(t.group)||(0,b.isEmpty)(t.group)?"undefined":t.group;return void 0===e[a]&&(e[a]=[]),e[a].push(t),e},{});for(let[o,s]of(void 0!==i.undefined&&(a=i.undefined.map(e=>D(e,t))),Object.entries(i)))"undefined"!==o&&a.push({label:e(o),key:"add-object-group-"+o,icon:(0,n.jsx)(r.J,{value:"folder"}),children:s.map(e=>D(e,t))});return a},D=(t,a)=>({label:e(t.name),key:t.id,icon:"class"===t.icon.value?(0,n.jsx)(r.J,{subIconName:"new",subIconVariant:"green",value:"data-object"}):(0,n.jsx)(r.J,{subIconName:"new",subIconVariant:"green",...t.icon}),onClick:()=>{I(t,parseInt(a.id))}}),I=(a,n,i)=>{t.input({title:e("data-object.create-data-object",{className:a.name}),label:e("form.label.new-item"),rule:{required:!0,message:e("form.validation.required")},onOk:async e=>{await S(a.id,e,n),null==i||i(e)}})},S=async(e,t,n)=>{let i=a({parentId:n,dataObjectAddParameters:{key:t,classId:e,type:"object"}});try{let e=await i;if(void 0!==e.error)return void(0,l.ZP)(new l.MS(e.error));let{id:t}=e.data;f({config:{id:t}}),p((0,o.D9)({nodeId:String(n),elementType:"data-object"}))}catch(e){(0,l.ZP)(new l.aE("Error creating data object"))}},E=e=>!x(c.W.Add)||!(0,d.x)(e.permissions,"create")||(0,b.isEmpty)(j());return{addObjectTreeContextMenuItem:t=>({label:e("data-object.tree.context-menu.add-object"),key:h.N.addObject,icon:(0,n.jsx)(r.J,{value:"folder"}),hidden:E(t),children:T(t)})}};var x=a(68922),j=a(90165),T=a(2433),D=a(66185),I=a(74347);let S=()=>{var e;let{t}=(0,v.useTranslation)(),{id:a}=(0,p.useContext)(x.f),{dataObject:n}=(0,j.H)(a),[i,{isLoading:o,isError:r,error:l}]=(0,T.y7)(),{refreshElement:d}=(0,D.C)("data-object"),{confirm:u}=(0,s.U8)();if(r)throw new I.Z(l);let c=t((null==n||null==(e=n.draftData)?void 0:e.isAutoSave)===!0?"delete-draft-auto-save":"delete-draft");return{deleteDraft:async()=>{(0,b.isNil)(null==n?void 0:n.draftData)||u({title:c,content:t("delete-draft-confirmation"),onOk:async()=>{(0,b.isNil)(null==n?void 0:n.draftData)||await i({id:n.draftData.id}).then(()=>{d(n.id)})}})},buttonText:c,isLoading:o,isError:r}};var E=a(44402),O=a(84475),w=a(88983),A=a(74152),C=a(18962),L=a(47666);let k=e=>{let{dataObject:t,isLoading:a}=(0,j.H)(e),{data:n,error:i,isLoading:o}=(0,C.ih)({objectId:e},{skip:void 0===t||"folder"===t.type});void 0!==i&&(0,l.ZP)(new l.MS(i));let r=void 0!==n?n.items:void 0,s=(null==t?void 0:t.hasWorkflowAvailable)===!0,{data:d,isFetching:u}=(0,L.d)({elementType:"data-object",elementId:e},{skip:!s});return{layouts:r,getDefaultLayoutId:e=>{if((0,b.isUndefined)(r))return null;let t=r.find(e=>e.default)??r.find(t=>t.id===e)??r.find(e=>e.id===(null==d?void 0:d.layoutId))??r.find(e=>"0"===e.id)??r[0]??null;return(null==t?void 0:t.id)??null},isLoading:a||u||o&&(null==t?void 0:t.type)!=="folder"}},V=()=>{let{id:e}=(0,p.useContext)(x.f);return{id:e}};var $=a(29981),B=a(63738),P=a(28590),M=a(28395),F=a(5554),_=a(14216);class N extends F.A{constructor(){super(),this.type="folder"}}N=(0,M.gn)([(0,_.injectable)(),(0,M.w6)("design:type",Function),(0,M.w6)("design:paramtypes",[])],N);class q extends F.A{constructor(){super(),this.type="object"}}q=(0,M.gn)([(0,_.injectable)(),(0,M.w6)("design:type",Function),(0,M.w6)("design:paramtypes",[])],q);var R=a(43439),K=a(37566),X=a(64235);let U=()=>{let e=(0,K.r)(),{currentLanguage:t,setCurrentLanguage:a,hasLocalizedFields:i}=(0,X.X)();return i?(0,n.jsx)(R.k,{languages:[...e.requiredLanguages],onSelectLanguage:a,selectedLanguage:t}):(0,n.jsx)(n.Fragment,{})};var H=a(51791),Z=a(2771),z=a(19505);let G=()=>{let e=(0,i.useAppSelector)(Z.u6),t=(0,p.useContext)(z.M);return null!==e&&e.nodeId===t.nodeId};var W=a(77476),J=a(29202);let Q=(0,J.createStyles)(e=>{let{token:t,css:a}=e;return{editorTabsContainer:a`
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
    `}},{hashPriority:"low"});var Y=a(26788),ee=a(58793),et=a.n(ee),ea=a(81354),en=a(45628),ei=a.n(en),eo=a(80054);let er=()=>{let{openBottomWidget:e}=(0,ea.A)(),t=(0,eo.O)();return{detachWidget:a=>{let{tabKey:n,config:i={}}=a,o=t.getTab(n);void 0!==o&&e({name:ei().t(String(o.label)),id:`${n}-detached`,component:"detachable-tab",config:{...i,icon:o.icon.props,tabKey:n}})}}};var es=a(57732);let el=e=>{let{tabKey:t,activeTabKey:a,tabKeyInFocus:i,tabKeyOutOfFocus:o,title:r,children:s}=e,[l,d]=(0,p.useState)(null);return(0,p.useEffect)(()=>{void 0!==i&&d(i)},[i]),(0,p.useEffect)(()=>{void 0!==o&&o===l&&d(null)},[o]),(0,n.jsx)(Y.Tooltip,{open:l===t&&a!==t,placement:"top",title:r,children:(0,n.jsx)("div",{onMouseEnter:()=>{d(t)},onMouseLeave:()=>{d(null)},children:s})})};var ed=a(61813),eu=a(51776),ec=a(95461),eb=a(35950),ep=a(84666),ev=a(84901);let ey=e=>{let{defaultActiveKey:t,showLabelIfActive:a,items:i}=e,{styles:o}=Q(),{detachWidget:r}=er(),{id:s,elementType:l}=(0,ed.i)(),{activeTab:u,setActiveTab:c}=(0,ec.q)(s,l),[b,v]=(0,p.useState)(void 0),[y,g]=(0,p.useState)(void 0),m=(0,ec.q)(s,l).element,h=(0,p.useRef)(null),f=(0,eu.Z)(h);(0,p.useEffect)(()=>{null===u&&(null==i?void 0:i.length)>0&&c(i[0].key)},[i]);let x=null==i?void 0:i.map(e=>e.key),j=e=>{let t=e.target.id;return x.find(e=>t.includes(e))},T=e=>{r(e),(null==i?void 0:i.length)>0&&c(i[0].key)};return i=null==(i=i.filter(e=>!(void 0!==e.hidden&&e.hidden(m))&&(void 0===e.workspacePermission||(null==m?void 0:m.permissions)===void 0||!!(0,d.x)(m.permissions,e.workspacePermission))&&(void 0===e.userPermission||!!(0,eb.y)(e.userPermission))))?void 0:i.map(e=>{let t={...e,originalLabel:e.label,icon:(0,n.jsx)(el,{activeTabKey:u,tabKey:e.key,tabKeyInFocus:b,tabKeyOutOfFocus:y,title:e.label,children:e.icon})};return!0===t.isDetachable&&(t.label=(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{children:t.label}),(0,n.jsx)(ep.h,{className:"detachable-button",icon:{value:"share"},onClick:t=>{t.stopPropagation(),T({tabKey:e.key})},type:"link"})]})),t}),(0,n.jsx)("div",{className:o.editorTabsContainer,ref:h,children:(0,n.jsx)(Y.Tabs,{activeKey:u??void 0,className:et()(o.editorTabs,{[o.onlyActiveLabel]:a}),defaultActiveKey:t,items:i,onBlur:e=>{g(j(e))},onFocus:e=>{v(j(e))},onTabClick:e=>{c(e)},tabBarExtraContent:{left:(0,n.jsx)(ev.x,{padding:{left:"extra-small",top:"extra-small",bottom:"extra-small"},children:(0,n.jsx)(es.U,{editorTabsWidth:f,elementType:l,id:s})})}})})};var eg=a(80380),em=a(59255);let eh=e=>{let{elementEditorType:t}=e,{t:a}=(0,v.useTranslation)(),i=(0,eg.$1)(t.tabManagerServiceId),{id:o,elementType:r}=(0,ed.i)(),{element:s}=(0,ec.q)(o,r),l=i.getTabs(),d=l.map((e,t)=>{let n={...l[t],label:"string"==typeof e.label?a(e.label):e.label};return"workflow"===e.key?{...n,hidden:()=>(null==s?void 0:s.hasWorkflowAvailable)===!1||(null==s?void 0:s.hasWorkflowAvailable)===void 0}:n});return(0,n.jsx)(em.d,{tabManager:i,children:(0,n.jsx)(ey,{defaultActiveKey:"1",items:d,showLabelIfActive:!0})})};var ef=a(47755),ex=a(68686),ej=a(3129),eT=a(12174),eD=a(70793),eI=a(27614);let eS=()=>(0,n.jsx)(ef.o,{children:(0,n.jsxs)(eT.v,{children:[(0,n.jsx)(ex.k,{children:(0,n.jsx)(eI.O,{slot:eD.O.dataObject.editor.toolbar.slots.left.name})}),(0,n.jsx)(ex.k,{align:"center",gap:"extra-small",style:{height:"32px"},vertical:!1,children:(0,n.jsx)(eI.O,{slot:eD.O.dataObject.editor.toolbar.slots.right.name})}),(0,n.jsx)(ej.L,{})]})}),eE=(0,J.createStyles)(e=>{let{token:t,css:a}=e;return{tabbarToolbar:a`
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
    `}},{hashPriority:"low"}),eO=e=>{let{styles:t}=eE();return(0,n.jsxs)("div",{className:["tabs-toolbar-layout",t.tabbarToolbar].join(" "),children:[(0,n.jsx)("div",{className:"tabs-toolbar-layout__tabbar",children:e.renderTabbar}),(0,n.jsx)("div",{className:"tabs-toolbar-layout__toolbar",children:e.renderToolbar})]})};var ew=a(18639),eA=a(70774),eC=a(11773),eL=a(36414);let ek=e=>{let{id:t}=e,{isLoading:a,isError:i,dataObject:o,editorType:r}=(0,j.H)(t),s=G(),{setContext:l,removeContext:d}=(0,$.J)();return((0,p.useEffect)(()=>()=>{d()},[]),(0,p.useEffect)(()=>(s&&l({id:t}),()=>{s||d()}),[s]),a)?(0,n.jsx)(W.V,{loading:!0}):i?(0,n.jsx)(W.V,{padded:!0,children:(0,n.jsx)(eL.b,{message:"Error: Loading of data object failed",type:"error"})}):void 0===o||void 0===r?(0,n.jsx)(n.Fragment,{}):(0,n.jsx)(x.g,{id:t,children:(0,n.jsx)(eC.U,{children:(0,n.jsx)(ew.L,{children:(0,n.jsx)(eA.k,{children:(0,n.jsx)(H.O,{children:(0,n.jsx)(eO,{renderTabbar:(0,n.jsx)(eh,{elementEditorType:r}),renderToolbar:(0,n.jsx)(eS,{})})})})})})})},eV=(0,p.createContext)({currentLayout:null,setCurrentLayout:()=>{}}),e$=e=>{let{children:t,defaultLayout:a,isLoading:i}=e,[o,r]=(0,p.useState)(a);(0,p.useEffect)(()=>{null===o&&null!==a&&r(a)},[a]);let s=(0,p.useMemo)(()=>({currentLayout:o,setCurrentLayout:r}),[o]);return(0,n.jsx)(eV.Provider,{value:s,children:i?(0,n.jsx)(W.V,{loading:!0}):t})};var eB=a(92430);let eP={name:"data-object-editor",component:e=>{let{id:t}=e,{getDefaultLayoutId:a,isLoading:i}=k(t);return(0,n.jsx)(e$,{defaultLayout:a(),isLoading:i,children:(0,n.jsx)(ek,{id:t})})},titleComponent:e=>{let{node:t}=e,{dataObject:a}=(0,j.H)(t.getConfig().id),{t:i}=(0,v.useTranslation)(),o=t.getName();return t.getName=()=>((null==a?void 0:a.parentId)===0&&(t.getName=()=>i("home")),(null==a?void 0:a.key)??o),(0,n.jsx)(eB.X,{modified:(null==a?void 0:a.modified)??!1,node:t})},isModified:e=>{let t=e.getConfig(),a=(0,O.V8)(i.store.getState(),t.id);return(null==a?void 0:a.modified)??!1},getContextProvider:(e,t)=>{let a=e.config;return(0,n.jsx)(x.g,{id:a.id,children:t})}}}}]);