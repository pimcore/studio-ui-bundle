/*! For license information please see 6570.6a6f07f5.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["6570"],{66490:function(e,t,a){a.d(t,{x:()=>f});var n=a(85893),i=a(40483),o=a(94374),r=a(55859),l=a(38119),s=a(55721),d=a(62588),u=a(24861),c=a(51469),b=a(53478);a(81004);var p=a(71695),v=a(54626),y=a(54658),m=a(71125),g=a(23526);let f=()=>{let{t:e}=(0,p.useTranslation)(),t=(0,l.U8)(),[a]=(0,v.Fg)(),f=(0,i.useAppDispatch)(),{openDataObject:h}=(0,y.n)(),{isTreeActionAllowed:x}=(0,u._)(),{getClassDefinitionsForCurrentUser:j}=(0,m.C)(),T=t=>{let a=[],i=[...j()].sort((e,t)=>e.name.localeCompare(t.name)).reduce((e,t)=>{let a=(0,b.isNil)(t.group)||(0,b.isEmpty)(t.group)?"undefined":t.group;return void 0===e[a]&&(e[a]=[]),e[a].push(t),e},{});for(let[o,l]of(void 0!==i.undefined&&(a=i.undefined.map(e=>I(e,t))),Object.entries(i)))"undefined"!==o&&a.push({label:e(o),key:"add-object-group-"+o,icon:(0,n.jsx)(r.J,{value:"folder"}),children:l.map(e=>I(e,t))});return a},I=(t,a)=>({label:e(t.name),key:t.id,icon:"class"===t.icon.value?(0,n.jsx)(r.J,{subIconName:"new",subIconVariant:"green",value:"data-object"}):(0,n.jsx)(r.J,{subIconName:"new",subIconVariant:"green",...t.icon}),onClick:()=>{E(t,parseInt(a.id))}}),E=(a,n,i)=>{t.input({title:e("data-object.create-data-object",{className:a.name}),label:e("form.label.new-item"),rule:{required:!0,message:e("form.validation.required")},onOk:async e=>{await w(a.id,e,n),null==i||i(e)}})},w=async(e,t,n)=>{let i=a({parentId:n,dataObjectAddParameters:{key:t,classId:e,type:"object"}});try{let e=await i;if(void 0!==e.error)return void(0,s.ZP)(new s.MS(e.error));let{id:t}=e.data;h({config:{id:t}}),f((0,o.D9)({nodeId:String(n),elementType:"data-object"}))}catch(e){(0,s.ZP)(new s.aE("Error creating data object"))}},S=e=>!x(c.W.Add)||!(0,d.x)(e.permissions,"create")||(0,b.isEmpty)(j());return{addObjectTreeContextMenuItem:t=>({label:e("data-object.tree.context-menu.add-object"),key:g.N.addObject,icon:(0,n.jsx)(r.J,{value:"folder"}),hidden:S(t),children:T(t)})}}},10186:function(e,t,a){a.d(t,{_:()=>b});var n=a(81004),i=a(71695),o=a(68922),r=a(90165),l=a(2433),s=a(66185),d=a(38119),u=a(74347),c=a(53478);let b=()=>{var e;let{t}=(0,i.useTranslation)(),{id:a}=(0,n.useContext)(o.f),{dataObject:b}=(0,r.H)(a),[p,{isLoading:v,isError:y,error:m}]=(0,l.y7)(),{refreshElement:g}=(0,s.C)("data-object"),{confirm:f}=(0,d.U8)();if(y)throw new u.Z(m);let h=t((null==b||null==(e=b.draftData)?void 0:e.isAutoSave)===!0?"delete-draft-auto-save":"delete-draft");return{deleteDraft:async()=>{(0,c.isNil)(null==b?void 0:b.draftData)||f({title:h,content:t("delete-draft-confirmation"),onOk:async()=>{(0,c.isNil)(null==b?void 0:b.draftData)||await p({id:b.draftData.id}).then(()=>{g(b.id)})}})},buttonText:h,isLoading:v,isError:y}}},44158:function(e,t,a){a.d(t,{M:()=>l,g:()=>r});var n=a(85893),i=a(81004),o=a(77476);let r=(0,i.createContext)({currentLayout:null,setCurrentLayout:()=>{}}),l=e=>{let{children:t,defaultLayout:a,isLoading:l}=e,[s,d]=(0,i.useState)(a);(0,i.useEffect)(()=>{null===s&&null!==a&&d(a)},[a]);let u=(0,i.useMemo)(()=>({currentLayout:s,setCurrentLayout:d}),[s]);return(0,n.jsx)(r.Provider,{value:u,children:l?(0,n.jsx)(o.V,{loading:!0}):t})}},44171:function(e,t,a){a.d(t,{k:()=>l});var n=a(85893),i=a(43439),o=a(50444);a(81004);var r=a(64235);let l=()=>{let e=(0,o.r)(),{currentLanguage:t,setCurrentLanguage:a,hasLocalizedFields:l}=(0,r.X)();return l?(0,n.jsx)(i.k,{languages:[...e.requiredLanguages],onSelectLanguage:a,selectedLanguage:t}):(0,n.jsx)(n.Fragment,{})}},98139:function(e,t,a){a.d(t,{F:()=>r});var n=a(28395),i=a(5554),o=a(60476);class r extends i.A{constructor(){super(),this.type="object"}}r=(0,n.gn)([(0,o.injectable)(),(0,n.w6)("design:type",Function),(0,n.w6)("design:paramtypes",[])],r)},17155:function(e,t,a){a.d(t,{_:()=>$});var n=a(85893),i=a(81004),o=a(61949),r=a(68922),l=a(77476),s=a(90165),d=a(29981),u=a(94730),c=a(47755),b=a(68686),p=a(3129),v=a(12174),y=a(70793),m=a(27614);let g=()=>(0,n.jsx)(c.o,{children:(0,n.jsxs)(v.v,{children:[(0,n.jsx)(b.k,{children:(0,n.jsx)(m.O,{slot:y.O.dataObject.editor.toolbar.slots.left.name})}),(0,n.jsx)(b.k,{align:"center",gap:"extra-small",style:{height:"32px"},vertical:!1,children:(0,n.jsx)(m.O,{slot:y.O.dataObject.editor.toolbar.slots.right.name})}),(0,n.jsx)(p.L,{})]})});var f=a(9901),h=a(51791),x=a(18639),j=a(70774),T=a(11773),I=a(36414);let E=e=>{let{id:t}=e,{isLoading:a,isError:c,dataObject:b,editorType:p}=(0,s.H)(t),v=(0,o.Q)(),{setContext:y,removeContext:m}=(0,d.J)();return((0,i.useEffect)(()=>()=>{m()},[]),(0,i.useEffect)(()=>(v&&y({id:t}),()=>{v||m()}),[v]),a)?(0,n.jsx)(l.V,{loading:!0}):c?(0,n.jsx)(l.V,{padded:!0,children:(0,n.jsx)(I.b,{message:"Error: Loading of data object failed",type:"error"})}):void 0===b||void 0===p?(0,n.jsx)(n.Fragment,{}):(0,n.jsx)(r.g,{id:t,children:(0,n.jsx)(T.U,{children:(0,n.jsx)(x.L,{children:(0,n.jsx)(j.k,{children:(0,n.jsx)(h.O,{children:(0,n.jsx)(f.S,{renderTabbar:(0,n.jsx)(u.T,{elementEditorType:p}),renderToolbar:(0,n.jsx)(g,{})})})})})})})};var w=a(88087),S=a(44158),k=a(92430),A=a(71695),L=a(46309),V=a(84475);let $={name:"data-object-editor",component:e=>{let{id:t}=e,{getDefaultLayoutId:a,isLoading:i}=(0,w.z)(t);return(0,n.jsx)(S.M,{defaultLayout:a(),isLoading:i,children:(0,n.jsx)(E,{id:t})})},titleComponent:e=>{let{node:t}=e,{dataObject:a}=(0,s.H)(t.getConfig().id),{t:i}=(0,A.useTranslation)(),o=t.getName();return t.getName=()=>((null==a?void 0:a.parentId)===0&&(t.getName=()=>i("home")),(null==a?void 0:a.key)??o),(0,n.jsx)(k.X,{modified:(null==a?void 0:a.modified)??!1,node:t})},isModified:e=>{let t=e.getConfig(),a=(0,V.V8)(L.h.getState(),t.id);return(null==a?void 0:a.modified)??!1},getContextProvider:(e,t)=>{let a=e.config;return(0,n.jsx)(r.g,{id:a.id,children:t})}}},88087:function(e,t,a){a.d(t,{z:()=>s});var n=a(90165),i=a(18962),o=a(55721),r=a(53478),l=a(47666);let s=e=>{let{dataObject:t,isLoading:a}=(0,n.H)(e),{data:s,error:d,isLoading:u}=(0,i.ih)({objectId:e},{skip:void 0===t||"folder"===t.type});void 0!==d&&(0,o.ZP)(new o.MS(d));let c=void 0!==s?s.items:void 0,b=(null==t?void 0:t.hasWorkflowAvailable)===!0,{data:p,isFetching:v}=(0,l.d)({elementType:"data-object",elementId:e},{skip:!b});return{layouts:c,getDefaultLayoutId:e=>{if((0,r.isUndefined)(c))return null;let t=c.find(e=>e.default)??c.find(t=>t.id===e)??c.find(e=>e.id===(null==p?void 0:p.layoutId))??c.find(e=>"0"===e.id)??c[0]??null;return(null==t?void 0:t.id)??null},isLoading:a||v||u&&(null==t?void 0:t.type)!=="folder"}}},9901:function(e,t,a){a.d(t,{S:()=>o});var n=a(85893);a(81004);let i=(0,a(29202).createStyles)(e=>{let{token:t,css:a}=e;return{tabbarToolbar:a`
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
    `}},{hashPriority:"low"}),o=e=>{let{styles:t}=i();return(0,n.jsxs)("div",{className:["tabs-toolbar-layout",t.tabbarToolbar].join(" "),children:[(0,n.jsx)("div",{className:"tabs-toolbar-layout__tabbar",children:e.renderTabbar}),(0,n.jsx)("div",{className:"tabs-toolbar-layout__toolbar",children:e.renderToolbar})]})}},94730:function(e,t,a){a.d(t,{T:()=>k});var n=a(85893),i=a(81004);let o=(0,a(29202).createStyles)(e=>{let{token:t,css:a}=e;return{editorTabsContainer:a`
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
    `}},{hashPriority:"low"});var r=a(26788),l=a(58793),s=a.n(l),d=a(81354),u=a(45628),c=a.n(u),b=a(80054);let p=()=>{let{openBottomWidget:e}=(0,d.A)(),t=(0,b.O)();return{detachWidget:a=>{let{tabKey:n,config:i={}}=a,o=t.getTab(n);void 0!==o&&e({name:c().t(String(o.label)),id:`${n}-detached`,component:"detachable-tab",config:{...i,icon:o.icon.props,tabKey:n}})}}};var v=a(57732);let y=e=>{let{tabKey:t,activeTabKey:a,tabKeyInFocus:o,tabKeyOutOfFocus:l,title:s,children:d}=e,[u,c]=(0,i.useState)(null);return(0,i.useEffect)(()=>{void 0!==o&&c(o)},[o]),(0,i.useEffect)(()=>{void 0!==l&&l===u&&c(null)},[l]),(0,n.jsx)(r.Tooltip,{open:u===t&&a!==t,placement:"top",title:s,children:(0,n.jsx)("div",{onMouseEnter:()=>{c(t)},onMouseLeave:()=>{c(null)},children:d})})};var m=a(35015),g=a(51776),f=a(97473),h=a(62588),x=a(35950),j=a(84666),T=a(84901);let I=e=>{let{defaultActiveKey:t,showLabelIfActive:a,items:l}=e,{styles:d}=o(),{detachWidget:u}=p(),{id:c,elementType:b}=(0,m.i)(),{activeTab:I,setActiveTab:E}=(0,f.q)(c,b),[w,S]=(0,i.useState)(void 0),[k,A]=(0,i.useState)(void 0),L=(0,f.q)(c,b).element,V=(0,i.useRef)(null),$=(0,g.Z)(V);(0,i.useEffect)(()=>{null===I&&(null==l?void 0:l.length)>0&&E(l[0].key)},[l]);let C=null==l?void 0:l.map(e=>e.key),B=e=>{let t=e.target.id;return C.find(e=>t.includes(e))},N=e=>{u(e),(null==l?void 0:l.length)>0&&E(l[0].key)};return l=null==(l=l.filter(e=>!(void 0!==e.hidden&&e.hidden(L))&&(void 0===e.workspacePermission||(null==L?void 0:L.permissions)===void 0||!!(0,h.x)(L.permissions,e.workspacePermission))&&(void 0===e.userPermission||!!(0,x.y)(e.userPermission))))?void 0:l.map(e=>{let t={...e,originalLabel:e.label,icon:(0,n.jsx)(y,{activeTabKey:I,tabKey:e.key,tabKeyInFocus:w,tabKeyOutOfFocus:k,title:e.label,children:e.icon})};return!0===t.isDetachable&&(t.label=(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{children:t.label}),(0,n.jsx)(j.h,{className:"detachable-button",icon:{value:"share"},onClick:t=>{t.stopPropagation(),N({tabKey:e.key})},type:"link"})]})),t}),(0,n.jsx)("div",{className:d.editorTabsContainer,ref:V,children:(0,n.jsx)(r.Tabs,{activeKey:I??void 0,className:s()(d.editorTabs,{[d.onlyActiveLabel]:a}),defaultActiveKey:t,items:l,onBlur:e=>{A(B(e))},onFocus:e=>{S(B(e))},onTabClick:e=>{E(e)},tabBarExtraContent:{left:(0,n.jsx)(T.x,{padding:{left:"extra-small",top:"extra-small",bottom:"extra-small"},children:(0,n.jsx)(v.U,{editorTabsWidth:$,elementType:b,id:c})})}})})};var E=a(71695),w=a(80380),S=a(59255);let k=e=>{let{elementEditorType:t}=e,{t:a}=(0,E.useTranslation)(),i=(0,w.$1)(t.tabManagerServiceId),{id:o,elementType:r}=(0,m.i)(),{element:l}=(0,f.q)(o,r),s=i.getTabs(),d=s.map((e,t)=>{let n={...s[t],label:"string"==typeof e.label?a(e.label):e.label};return"workflow"===e.key?{...n,hidden:()=>(null==l?void 0:l.hasWorkflowAvailable)===!1||(null==l?void 0:l.hasWorkflowAvailable)===void 0}:n});return(0,n.jsx)(S.d,{tabManager:i,children:(0,n.jsx)(I,{defaultActiveKey:"1",items:d,showLabelIfActive:!0})})}},2433:function(e,t,a){a.d(t,{hi:()=>v,yK:()=>m,Rl:()=>j,y7:()=>g,zZ:()=>y,KD:()=>h,z4:()=>x,Bb:()=>f});var n=a(96068);let i=a(42125).api.enhanceEndpoints({addTagTypes:["Versions"]}).injectEndpoints({endpoints:e=>({versionAssetDownloadById:e.query({query:e=>({url:`/pimcore-studio/api/versions/${e.id}/asset/download`}),providesTags:["Versions"]}),versionImageStreamById:e.query({query:e=>({url:`/pimcore-studio/api/versions/${e.id}/image/stream`}),providesTags:["Versions"]}),versionPdfStreamById:e.query({query:e=>({url:`/pimcore-studio/api/versions/${e.id}/pdf/stream`}),providesTags:["Versions"]}),versionGetById:e.query({query:e=>({url:`/pimcore-studio/api/versions/${e.id}`}),providesTags:["Versions"]}),versionUpdateById:e.mutation({query:e=>({url:`/pimcore-studio/api/versions/${e.id}`,method:"PUT",body:e.updateVersion}),invalidatesTags:["Versions"]}),versionPublishById:e.mutation({query:e=>({url:`/pimcore-studio/api/versions/${e.id}`,method:"POST"}),invalidatesTags:["Versions"]}),versionDeleteById:e.mutation({query:e=>({url:`/pimcore-studio/api/versions/${e.id}`,method:"DELETE"}),invalidatesTags:["Versions"]}),versionGetCollectionForElementByTypeAndId:e.query({query:e=>({url:`/pimcore-studio/api/versions/${e.elementType}/${e.id}`,params:{page:e.page,pageSize:e.pageSize}}),providesTags:["Versions"]}),versionCleanupForElementByTypeAndId:e.mutation({query:e=>({url:`/pimcore-studio/api/versions/${e.elementType}/${e.id}`,method:"DELETE"}),invalidatesTags:["Versions"]})}),overrideExisting:!1}),{useVersionAssetDownloadByIdQuery:o,useVersionImageStreamByIdQuery:r,useVersionPdfStreamByIdQuery:l,useVersionGetByIdQuery:s,useVersionUpdateByIdMutation:d,useVersionPublishByIdMutation:u,useVersionDeleteByIdMutation:c,useVersionGetCollectionForElementByTypeAndIdQuery:b,useVersionCleanupForElementByTypeAndIdMutation:p}=i,v=i.enhanceEndpoints({addTagTypes:[n.fV.ASSET_DETAIL],endpoints:{versionGetById:{providesTags:(e,t,a)=>n.Kx.VERSIONS_DETAIL(a.id)},versionGetCollectionForElementByTypeAndId:{providesTags:(e,t,a)=>{let i=[];return null==e||e.items.forEach(e=>{i.push(...n.Kx.VERSIONS_DETAIL(e.id))}),[...i,...n.Kx.ELEMENT_VERSIONS(a.elementType,a.id)]}},versionCleanupForElementByTypeAndId:{invalidatesTags:(e,t,a)=>n.xc.ELEMENT_VERSIONS(a.elementType,a.id)},versionUpdateById:{invalidatesTags:(e,t,a)=>n.xc.VERSIONS_DETAIL(a.id)},versionPublishById:{invalidatesTags:(e,t,a)=>n.xc.VERSIONS_DETAIL(a.id)},versionDeleteById:{invalidatesTags:(e,t,a)=>n.xc.VERSIONS_DETAIL(a.id)}}}),{useVersionAssetDownloadByIdQuery:y,useVersionCleanupForElementByTypeAndIdMutation:m,useVersionDeleteByIdMutation:g,useVersionGetByIdQuery:f,useVersionGetCollectionForElementByTypeAndIdQuery:h,useVersionPublishByIdMutation:x,useVersionUpdateByIdMutation:j}=v},61949:function(e,t,a){a.d(t,{Q:()=>l});var n=a(40483),i=a(98482),o=a(81004),r=a(19505);let l=()=>{let e=(0,n.useAppSelector)(i.u6),t=(0,o.useContext)(r.M);return null!==e&&e.nodeId===t.nodeId}},51776:function(e,t,a){a.d(t,{Z:()=>i});var n=a(81004);let i=e=>{let[t,a]=(0,n.useState)(0);return(0,n.useLayoutEffect)(()=>{var t;a((null==(t=e.current)?void 0:t.getBoundingClientRect().width)??0)},[]),(0,n.useEffect)(()=>{if(null==e.current)return;let t=new ResizeObserver(e=>{let[t]=e,n=t.contentRect.width;a(e=>0!==n&&e!==n?n:e)});return t.observe(e.current),()=>{t.disconnect()}},[e]),t}}}]);