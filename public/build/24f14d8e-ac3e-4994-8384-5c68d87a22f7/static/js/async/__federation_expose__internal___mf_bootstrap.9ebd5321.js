/*! For license information please see __federation_expose__internal___mf_bootstrap.9ebd5321.js.LICENSE.txt */
"use strict";(self["chunk_pimcore_studio_ui_bundle "]=self["chunk_pimcore_studio_ui_bundle "]||[]).push([["2108"],{60656(e,t,i){i.r(t),i.d(t,{PimcoreStudio:()=>h,Pimcore:()=>s});var a=i(63364),n=i(92812),r=i(88358),m=i(89106),o=i(25085);let d=new class{getTranslationResources(){let e={};return(r.A.languages??[]).forEach(t=>{let i=r.A.getResourceBundle(t,"translation");(0,m.isNil)(i)||(e[t]=i)}),e}getCurrentLanguage(){return r.A.language}getFallbackLanguage(){let e=r.A.options.fallbackLng;if(Array.isArray(e))return e[0]??"en";if((0,o.isNonEmptyString)(e))return e;if((0,m.isPlainObject)(e)){var t;return(null==(t=e.default)?void 0:t[0])??"en"}return"en"}reportMissingTranslation(e){r.A.emit("missingKey",[r.A.language],"translation",e,e)}};var g=i(57259),p=i(81607),l=i(70463);let s={container:a.kL},h={document:n.I,i18n:d,element:g.h,modal:p.Y,settings:l.a}},81607(e,t,i){i.d(t,{Y:()=>r});var a=i(89106);let n=null,r=new class{setModalInstance(e){n=e}getModalInstance(){if((0,a.isNull)(n))throw Error("Modal instance not initialized. Make sure App.useApp() is called in the parent window.");return n}constructor(){this.info=e=>this.getModalInstance().info(e),this.success=e=>this.getModalInstance().success(e),this.error=e=>this.getModalInstance().error(e),this.warning=e=>this.getModalInstance().warning(e),this.confirm=e=>this.getModalInstance().confirm(e)}}},70463(e,t,i){i.d(t,{a:()=>n});var a=i(72098);let n=new class{initialize(e){this.store=e}getSettings(){if(null===this.store)return console.warn("Settings API not initialized - Redux store not available"),null;try{return(0,a.mt)(this.store.getState())}catch(e){return console.error("Failed to get settings from store:",e),null}}areSettingsAvailable(){return null!==this.store&&null!==(0,a.mt)(this.store.getState())}constructor(){this.store=null}}},55831(e,t,i){i.a(e,async function(a,n){try{i.r(t),i(30820);var r=i(99924),m=i(80323),o=i(60656),d=i(27755);e=i.hmd(e),void 0!==e.hot&&e.hot.accept(),window.Pimcore=(await Promise.resolve().then(i.bind(i,60656))).Pimcore,window.PimcoreStudio=o.PimcoreStudio,window.addEventListener("load",async()=>{await m.f.loadPlugins(),m.f.initPlugins(),m.f.startupPlugins(),d.s.initModules(),(0,r.T)()}),n()}catch(e){n(e)}},1)},99924(e,t,i){i.d(t,{T:()=>H});var a=i(74848),n=i(47867),r=i(5338),m=i(64471),o=i(86569),d=i(6690),g=i(16665),p=i(89106),l=i(41630),s=i(39154),h=i(77885),x=i(44241);let c=(0,x.createGlobalStyle)`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    background-color: ${e=>e.theme.colorBgCanvas};
  }

  /** MESSAGE **/
  .ant-message {
    position: absolute;
    bottom: 20px !important;
    top: unset !important;
  }

  @keyframes moveUp {
    0% {
        transform: translateY(+30%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
  }

  .ant-message .ant-message-move-up-appear,
  .ant-message .ant-message-move-up-enter {
    animation-name: moveUp;
  }

  .ant-message .ant-message-move-up-leave {
    animation-name: moveUp;
    animation-direction: reverse;
  }

  :not(.menu--is-calculated-height).ant-dropdown-menu,
  .ant-dropdown-menu-sub {
    overflow: auto;
    max-height: 48vh;
  }

  .ant-dropdown-menu-submenu-popup {
    box-shadow: ${e=>e.theme.boxShadowSecondary};
  }

  .active {
    cursor: pointer;
    background: ${e=>e.theme.itemHoverColor};
  }

  .hover:hover {
    cursor: pointer;
    background: ${e=>e.theme.itemHoverColor};
  }

  .relative {
    position: relative;
  }

  .p-none {
    padding: 0;
  }

  .p-mini {
    padding: ${e=>e.theme.paddingXXS}px;
  }

  .p-extra-small {
    padding: ${e=>e.theme.paddingXS}px;
  }

  .p-small {
    padding: ${e=>e.theme.paddingSM}px;
  }

  .p-normal {
    padding: ${e=>e.theme.padding}px;
  }

  .p-medium {
    padding: ${e=>e.theme.paddingMD}px;
  }

  .p-large {
    padding: ${e=>e.theme.paddingLG}px;
  }

  .p-extra-large {
    padding: ${e=>e.theme.paddingXL}px;
  }

  .p-maxi {
    // @todo check missing padding token
    padding: ${e=>e.theme.sizeXXL}px;
  }

  .p-y-none {
    padding-top: 0;
    padding-bottom: 0;
  }

  .p-y-mini {
    padding-top: ${e=>e.theme.paddingXXS}px;
    padding-bottom: ${e=>e.theme.paddingXXS}px;
  }

  .p-y-extra-small {
    padding-top: ${e=>e.theme.paddingXS}px;
    padding-bottom: ${e=>e.theme.paddingXS}px;
  }

  .p-y-small {
    padding-top: ${e=>e.theme.paddingSM}px;
    padding-bottom: ${e=>e.theme.paddingSM}px;
  }

  .p-y-normal {
    padding-top: ${e=>e.theme.padding}px;
    padding-bottom: ${e=>e.theme.padding}px;
  }

  .p-y-medium {
    padding-top: ${e=>e.theme.paddingMD}px;
    padding-bottom: ${e=>e.theme.paddingMD}px;
  }

  .p-y-large {
    padding-top: ${e=>e.theme.paddingLG}px;
    padding-bottom: ${e=>e.theme.paddingLG}px;
  }

  .p-y-extra-large {
    padding-top: ${e=>e.theme.paddingXL}px;
    padding-bottom: ${e=>e.theme.paddingXL}px;
  }

  .p-y-maxi {
    // @todo check missing padding token
    padding-top: ${e=>e.theme.sizeXXL}px;
    padding-bottom: ${e=>e.theme.sizeXXL}px;
  }

  .p-x-none {
    padding-left: 0;
    padding-right: 0;
  }

  .p-x-mini {
    padding-left: ${e=>e.theme.paddingXXS}px;
    padding-right: ${e=>e.theme.paddingXXS}px;
  }

  .p-x-extra-small {
    padding-left: ${e=>e.theme.paddingXS}px;
    padding-right: ${e=>e.theme.paddingXS}px;
  }

  .p-x-small {
    padding-left: ${e=>e.theme.paddingSM}px;
    padding-right: ${e=>e.theme.paddingSM}px;
  }

  .p-x-normal {
    padding-left: ${e=>e.theme.padding}px;
    padding-right: ${e=>e.theme.padding}px;
  }

  .p-x-medium {
    padding-left: ${e=>e.theme.paddingMD}px;
    padding-right: ${e=>e.theme.paddingMD}px;
  }

  .p-x-large {
    padding-left: ${e=>e.theme.paddingLG}px;
    padding-right: ${e=>e.theme.paddingLG}px;
  }

  .p-x-extra-large {
    padding-left: ${e=>e.theme.paddingXL}px;
    padding-right: ${e=>e.theme.paddingXL}px;
  }

  .p-x-maxi {
    // @todo check missing padding token
    padding-left: ${e=>e.theme.sizeXXL}px;
    padding-right: ${e=>e.theme.sizeXXL}px;
  }

  .p-t-none {
    padding-top: 0;
  }

  .p-t-mini {
    padding-top: ${e=>e.theme.paddingXXS}px;
  }

  .p-t-extra-small {
    padding-top: ${e=>e.theme.paddingXS}px;
  }

  .p-t-small {
    padding-top: ${e=>e.theme.paddingSM}px;
  }

  .p-t-normal {
    padding-top: ${e=>e.theme.padding}px;
  }

  .p-t-medium {
    padding-top: ${e=>e.theme.paddingMD}px;
  }

  .p-t-large {
    padding-top: ${e=>e.theme.paddingLG}px;
  }

  .p-t-extra-large {
    padding-top: ${e=>e.theme.paddingXL}px;
  }

  .p-t-maxi {
    // @todo check missing padding token
    padding-top: ${e=>e.theme.sizeXXL}px;
  }

  .p-b-none {
    padding-bottom: 0;
  }

  .p-b-mini {
    padding-bottom: ${e=>e.theme.paddingXXS}px;
  }

  .p-b-extra-small {
    padding-bottom: ${e=>e.theme.paddingXS}px;
  }

  .p-b-small {
    padding-bottom: ${e=>e.theme.paddingSM}px;
  }

  .p-b-normal {
    padding-bottom: ${e=>e.theme.padding}px;
  }

  .p-b-medium {
    padding-bottom: ${e=>e.theme.paddingMD}px;
  }

  .p-b-large {
    padding-bottom: ${e=>e.theme.paddingLG}px;
  }

  .p-b-extra-large {
    padding-bottom: ${e=>e.theme.paddingXL}px;
  }

  .p-b-maxi {
    // @todo check missing padding token
    padding-bottom: ${e=>e.theme.sizeXXL}px;
  }

  .p-l-none {
    padding-left: 0;
  }

  .p-l-mini {
    padding-left: ${e=>e.theme.paddingXXS}px;
  }

  .p-l-extra-small {
    padding-left: ${e=>e.theme.paddingXS}px;
  }

  .p-l-small {
    padding-left: ${e=>e.theme.paddingSM}px;
  }

  .p-l-normal {
    padding-left: ${e=>e.theme.padding}px;
  }

  .p-l-medium {
    padding-left: ${e=>e.theme.paddingMD}px;
  }

  .p-l-large {
    padding-left: ${e=>e.theme.paddingLG}px;
  }

  .p-l-extra-large {
    padding-left: ${e=>e.theme.paddingXL}px;
  }

  .p-l-maxi {
    // @todo check missing padding token
    padding-left: ${e=>e.theme.sizeXXL}px;
  }

  .p-r-none {
    padding-right: 0;
  }

  .p-r-mini {
    padding-right: ${e=>e.theme.paddingXXS}px;
  }

  .p-r-extra-small {
    padding-right: ${e=>e.theme.paddingXS}px;
  }

  .p-r-small {
    padding-right: ${e=>e.theme.paddingSM}px;
  }

  .p-r-normal {
    padding-right: ${e=>e.theme.padding}px;
  }

  .p-r-medium {
    padding-right: ${e=>e.theme.paddingMD}px;
  }

  .p-r-large {
    padding-right: ${e=>e.theme.paddingLG}px;
  }

  .p-r-extra-large {
    padding-right: ${e=>e.theme.paddingXL}px;
  }

  .p-r-maxi {
    // @todo check missing padding token
    padding-right: ${e=>e.theme.sizeXXL}px;
  }

  .m-none {
    margin: 0;
  }

  .m-mini {
    margin: ${e=>e.theme.marginXXS}px;
  }

  .m-extra-small {
    margin: ${e=>e.theme.marginXS}px;
  }

  .m-small {
    margin: ${e=>e.theme.marginSM}px;
  }

  .m-normal {
    margin: ${e=>e.theme.margin}px;
  }

  .m-medium {
    margin: ${e=>e.theme.marginMD}px;
  }

  .m-large {
    margin: ${e=>e.theme.marginLG}px;
  }

  .m-extra-large {
    margin: ${e=>e.theme.marginXL}px;
  }

  .m-maxi {
    // @todo check missing margin token
    margin: ${e=>e.theme.sizeXXL}px;
  }

  .m-y-none {
    margin-top: 0;
    margin-bottom: 0;
  }

  .m-y-mini {
    margin-top: ${e=>e.theme.marginXXS}px;
    margin-bottom: ${e=>e.theme.marginXXS}px;
  }

  .m-y-extra-small {
    margin-top: ${e=>e.theme.marginXS}px;
    margin-bottom: ${e=>e.theme.marginXS}px;
  }

  .m-y-small {
    margin-top: ${e=>e.theme.marginSM}px;
    margin-bottom: ${e=>e.theme.marginSM}px;
  }

  .m-y-normal {
    margin-top: ${e=>e.theme.margin}px;
    margin-bottom: ${e=>e.theme.margin}px;
  }

  .m-y-medium {
    margin-top: ${e=>e.theme.marginMD}px;
    margin-bottom: ${e=>e.theme.marginMD}px;
  }

  .m-y-large {
    margin-top: ${e=>e.theme.marginLG}px;
    margin-bottom: ${e=>e.theme.marginLG}px;
  }

  .m-y-extra-large {
    margin-top: ${e=>e.theme.marginXL}px;
    margin-bottom: ${e=>e.theme.marginXL}px;
  }

  .m-y-maxi {
    // @todo check missing margin token
    margin-top: ${e=>e.theme.sizeXXL}px;
    margin-bottom: ${e=>e.theme.sizeXXL}px;
  }

  .m-x-none {
    margin-left: 0;
    margin-right: 0;
  }

  .m-x-mini {
    margin-left: ${e=>e.theme.marginXXS}px;
    margin-right: ${e=>e.theme.marginXXS}px;
  }

  .m-x-extra-small {
    margin-left: ${e=>e.theme.marginXS}px;
    margin-right: ${e=>e.theme.marginXS}px;
  }

  .m-x-small {
    margin-left: ${e=>e.theme.marginSM}px;
    margin-right: ${e=>e.theme.marginSM}px;
  }

  .m-x-normal {
    margin-left: ${e=>e.theme.margin}px;
    margin-right: ${e=>e.theme.margin}px;
  }

  .m-x-medium {
    margin-left: ${e=>e.theme.marginMD}px;
    margin-right: ${e=>e.theme.marginMD}px;
  }

  .m-x-large {
    margin-left: ${e=>e.theme.marginLG}px;
    margin-right: ${e=>e.theme.marginLG}px;
  }

  .m-x-extra-large {
    margin-left: ${e=>e.theme.marginXL}px;
    margin-right: ${e=>e.theme.marginXL}px;
  }

  .m-x-maxi {
    // @todo check missing margin token
    margin-left: ${e=>e.theme.sizeXXL}px;
    margin-right: ${e=>e.theme.sizeXXL}px;
  }

  .m-t-none {
    margin-top: 0;
  }

  .m-t-mini {
    margin-top: ${e=>e.theme.marginXXS}px;
  }

  .m-t-extra-small {
    margin-top: ${e=>e.theme.marginXS}px;
  }

  .m-t-small {
    margin-top: ${e=>e.theme.marginSM}px;
  }

  .m-t-normal {
    margin-top: ${e=>e.theme.margin}px;
  }

  .m-t-medium {
    margin-top: ${e=>e.theme.marginMD}px;
  }

  .m-t-large {
    margin-top: ${e=>e.theme.marginLG}px;
  }

  .m-t-extra-large {
    margin-top: ${e=>e.theme.marginXL}px;
  }

  .m-t-maxi {
    // @todo check missing margin token
    margin-top: ${e=>e.theme.sizeXXL}px;
  }

  .m-b-none {
    margin-bottom: 0;
  }

  .m-b-mini {
    margin-bottom: ${e=>e.theme.marginXXS}px;
  }

  .m-b-extra-small {
    margin-bottom: ${e=>e.theme.marginXS}px;
  }

  .m-b-small {
    margin-bottom: ${e=>e.theme.marginSM}px;
  }

  .m-b-normal {
    margin-bottom: ${e=>e.theme.margin}px;
  }

  .m-b-medium {
    margin-bottom: ${e=>e.theme.marginMD}px;
  }

  .m-b-large {
    margin-bottom: ${e=>e.theme.marginLG}px;
  }

  .m-b-extra-large {
    margin-bottom: ${e=>e.theme.marginXL}px;
  }

  .m-b-maxi {
    // @todo check missing margin token
    margin-bottom: ${e=>e.theme.sizeXXL}px;
  }

  .m-l-none {
    margin-left: 0;
  }

  .m-l-mini {
    margin-left: ${e=>e.theme.marginXXS}px;
  }

  .m-l-extra-small {
    margin-left: ${e=>e.theme.marginXS}px;
  }

  .m-l-small {
    margin-left: ${e=>e.theme.marginSM}px;
  }

  .m-l-normal {
    margin-left: ${e=>e.theme.margin}px;
  }

  .m-l-medium {
    margin-left: ${e=>e.theme.marginMD}px;
  }

  .m-l-large {
    margin-left: ${e=>e.theme.marginLG}px;
  }

  .m-l-extra-large {
    margin-left: ${e=>e.theme.marginXL}px;
  }

  .m-l-maxi {
    // @todo check missing margin token
    margin-left: ${e=>e.theme.sizeXXL}px;
  }

  .m-r-none {
    margin-right: 0;
  }

  .m-r-mini {
    margin-right: ${e=>e.theme.marginXXS}px;
  }

  .m-r-extra-small {
    margin-right: ${e=>e.theme.marginXS}px;
  }

  .m-r-small {
    margin-right: ${e=>e.theme.marginSM}px;
  }

  .m-r-normal {
    margin-right: ${e=>e.theme.margin}px;
  }

  .m-r-medium {
    margin-right: ${e=>e.theme.marginMD}px;
  }

  .m-r-large {
    margin-right: ${e=>e.theme.marginLG}px;
  }

  .m-r-extra-large {
    margin-right: ${e=>e.theme.marginXL}px;
  }

  .m-r-maxi {
    // @todo check missing margin token
    margin-right: ${e=>e.theme.sizeXXL}px;
  }

  .relative {
    position: relative;
  }

  .absolute {
    position: absolute;
  }

  .w-full {
    width: 100%;
  }

  .max-w-full {
      max-width: 100%;
  }
  
  .min-w-100 {
      min-width: 100px;
  }

  .min-w-200 {
      min-width: 200px;
  }

  .h-full {
    height: 100%;
  }

  .overflow-x-auto {
    overflow-x: auto;
  }

  .absolute-stretch {
    position: absolute;
    inset: 0;
  }

  //fix notification enter transition bug
  .ant-notification-stack > .ant-notification-notice-wrapper {
      transition: transform 0.3s, backdrop-filter 0s;
  }

  /** WORKFLOW PLACE INDICATOR **/
  span:has(> .pimcore-workflow-place-indicator) {
    display: contents;
  }

  .pimcore-workflow-place-indicator {
    display: inline-block;
    vertical-align: middle;
    padding: 2px 8px;
    border-radius: 3px;
    line-height: 1.4;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }
`;var u=i(92203),$=i(86375),b=i(19808),X=i(88358),f=i(55638),S=i(74365),w=i(73565),v=i(46881),L=i(52178);let{useMercureCreateCookieMutation:y}=i(53073).api.enhanceEndpoints({addTagTypes:["Mercure"]}).injectEndpoints({endpoints:e=>({mercureCreateCookie:e.mutation({query:()=>({url:"/pimcore-studio/api/mercure/auth",method:"POST"}),invalidatesTags:["Mercure"]})}),overrideExisting:!1});var M=i(72098),k=i(52626),A=i(63824),E=i(76374),D=i(81607),G=i(1019),z=i(66410);let P=(0,n.createContext)({registerLoader:()=>{},unregisterLoader:()=>{},isAppLoading:!1}),I=e=>{let t,i,r,m,d,[g,x]=(0,n.useState)("loading"),[I,j]=(0,n.useState)(new Set),R=(0,n.useCallback)(e=>{j(t=>new Set(t).add(e))},[]),T=(0,n.useCallback)(e=>{j(t=>{let i=new Set(t);return i.delete(e),i})},[]),_="loading"===g||"outro"===g||I.size>0,C=(0,n.useMemo)(()=>({registerLoader:R,unregisterLoader:T,isAppLoading:_}),[R,T,_]),F=(0,n.useRef)(null),B=(0,n.useCallback)(()=>{x("outro"),F.current=setTimeout(()=>{x("idle")},1e3)},[]);(0,n.useEffect)(()=>()=>{null!==F.current&&clearTimeout(F.current)},[]);let U=(0,u.Z)(),{modal:H}=o.App.useApp();$.B.setModalInstance(U),D.Y.setModalInstance(H);let{isAuthenticated:N}=(0,b.X)(),{loadPublicTranslations:O,loadTranslations:Y}=(()=>{let[e]=(0,S.oG)();return{loadPublicTranslations:async()=>{await e({translation:{locale:X.g,keys:[],useFallback:!0}}).unwrap().then(e=>{X.A.addResourceBundle(X.g,"translation",e.keys??[],!0,!0),X.A.changeLanguage(X.g)}).catch(()=>{throw(0,f.Ay)(new f.$g("Error loading translations")),Error("Error loading translations")})},loadTranslations:async()=>{let t=(0,w.xu)(l.M_.getState());await e({translation:{locale:t.language,keys:[],useFallback:!0}}).unwrap().then(e=>{X.A.addResourceBundle(t.language,"translation",e.keys??[],!0,!0),X.A.changeLanguage(t.language)}).catch(e=>{console.error("Error loading translations",e),(0,f.Ay)(new f.$g("Error loading translations"))})}}})(),{loadUser:K}=(t=(0,v.useAppDispatch)(),{loadUser:async()=>{let e=t(L.FH.endpoints.userGetCurrentInformation.initiate());await e.then(e=>{let{data:i,isSuccess:a,isError:n,error:r}=e;n?(0,f.Ay)(new f.hD(r)):a&&void 0!==i&&t((0,w.gV)(i))}).catch(e=>{throw(0,f.Ay)(new f.$g("Error loading user information")),Error("Error loading user information",{cause:e})})}}),[W]=y(),{loadSettings:q}=(i=(0,v.useAppDispatch)(),{loadSettings:async()=>{i(k.FH.endpoints.systemSettingsGet.initiate()).then(e=>{let{data:t,isSuccess:a,isError:n,error:r}=e;n&&(0,f.Ay)(new f.hD(r)),a&&void 0!==t&&i((0,M.oc)(t))}).catch(()=>{})}}),{loadAvailableLocales:Q}={loadAvailableLocales:async()=>{try{await l.M_.dispatch(A.FH.endpoints.translationGetAvailableLocales.initiate(void 0,{forceRefetch:!1,subscribe:!0})).unwrap()}catch(e){throw(0,f.Ay)(new f.$g("Error loading available locales")),e}}},{loadBrandThumbnailUrls:V}=(r=(0,v.useAppDispatch)(),{loadBrandThumbnailUrls:async()=>{let e=r(k.FH.endpoints.settingAdminThumbnail.initiate());await e.then(e=>{let{data:t,isSuccess:i,isError:a,error:n}=e;a?(0,f.Ay)(new f.hD(n)):i&&void 0!==t&&r((0,M.MM)(t))}).catch(()=>{(0,f.Ay)(new f.$g("Error loading brand thumbnail URLs"))})}}),{loadAdminSettings:Z}=(m=(0,l.jL)(),{loadAdminSettings:async()=>{let e=m(k.FH.endpoints.adminSettingsGet.initiate());await e.then(e=>{let{data:t,isSuccess:i,isError:a,error:n}=e;a?(0,f.Ay)(new f.hD(n)):i&&void 0!==t&&m((0,M.XE)(t))}).catch(()=>{(0,f.Ay)(new f.$g("Error loading admin settings"))})}}),{loadPerspective:J}=(0,E.n)(),{initGlobalMessageBus:ee}=(d=(0,n.useRef)(!1),{initGlobalMessageBus:e=>{if(!d.current)try{let t=v.container.get(v.serviceIds.globalMessageBus),i=v.container.get(v.serviceIds.globalMessageBusProcess),a=v.container.get(v.serviceIds.backgroundProcessor);t.registerTopics([...Object.values(z.v),`studio-backend-default/user/${e}`]),a.registerProcess(i),t.startGlobalSubscription(),document.addEventListener("visibilitychange",()=>{"visible"!==document.visibilityState||i.isConnected()||i.start()}),window.addEventListener("online",()=>{i.start()}),d.current=!0}catch(e){console.error("Failed to initialize global message bus:",e)}}}),et=v.container.get(v.serviceIds["AppLoader/Registry"]);async function ei(){let e=(0,w.xu)(l.M_.getState()),t=String((null==e?void 0:e.activePerspective)??"studio_default_perspective");return await J(t)}return(0,n.useEffect)(()=>{(async()=>{if(x("loading"),void 0!==N&&(N||await Promise.all([O(),V()]).then(()=>{B()}).catch(e=>{console.error("Error during login preparation",e)}),N)){await Promise.all([K()]),await W();let e=(0,w.xu)(l.M_.getState());(0,p.isNil)(null==e?void 0:e.id)||ee(e.id),await Promise.all([Y(),q(),Z(),V(),Q(),ei(),(0,G.N)()]),await et.loadAll(),B()}})()},[N]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(c,{}),(0,a.jsxs)(P.Provider,{value:C,children:[(0,a.jsx)(h.bU,{component:h.eb.app.background.name,props:{phase:g}}),"idle"===g&&(0,a.jsxs)("div",{style:{position:"absolute",inset:0,animation:`${s.y} 600ms ease 200ms both`},children:["            ",e.children]})]})]})};var j=i(37327),R=i(13947),T=i(17777),_=i(81558),C=i(63993);let F=function(){let{themeId:e}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.jsx)(n.StrictMode,{children:(0,a.jsx)(R.A,{children:(0,a.jsx)(m.D,{themeId:e,children:(0,a.jsx)(o.App,{notification:{stack:!1},children:(0,a.jsx)(C._,{children:(0,a.jsxs)(T.Y,{children:[(0,a.jsx)(_.bk,{}),(0,a.jsx)(j.M,{children:(0,a.jsx)(I,{children:(0,a.jsx)(d.RouterProvider,{router:g.QB})})})]})})})})})})};var B=i(70463);let U=function(){var e;let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.location.search,i=null==(e=new URLSearchParams(t).get("theme"))?void 0:e.trim();if(!((0,p.isNil)(i)||(0,p.isEmpty)(i)))return i};function H(){B.a.initialize(l.M_);let e=document.getElementById("app");null===e?(0,f.Ay)(new f.$g("Root element not found")):(0,r.createRoot)(e).render((0,a.jsx)(F,{themeId:U()}))}}}]);