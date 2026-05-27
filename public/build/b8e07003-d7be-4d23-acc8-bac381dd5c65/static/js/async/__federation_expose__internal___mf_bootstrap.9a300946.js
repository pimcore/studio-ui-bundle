/*! For license information please see __federation_expose__internal___mf_bootstrap.9a300946.js.LICENSE.txt */
"use strict";(self["chunk_pimcore_studio_ui_bundle "]=self["chunk_pimcore_studio_ui_bundle "]||[]).push([["2108"],{55831(e,i,t){t.a(e,async function(a,n){try{t.r(i),t(3684);var m=t(53458),r=t(80323),p=t(21849),d=t(27755);e=t.hmd(e),void 0!==e.hot&&e.hot.accept(),window.Pimcore=(await Promise.resolve().then(t.bind(t,21849))).Pimcore,window.PimcoreStudio=p.PimcoreStudio,window.addEventListener("load",async()=>{await r.f.loadPlugins(),r.f.initPlugins(),r.f.startupPlugins(),d.s.initModules(),(0,m.T)()}),n()}catch(e){n(e)}},1)},53458(e,i,t){t.d(i,{T:()=>H});var a=t(74848),n=t(47867),m=t(5338),r=t(64471),p=t(86569),d=t(52725),g=t(2659),o=t(35864),l=t(41630),s=t(39154),h=t(77885),x=t(44241);let c=(0,x.createGlobalStyle)`
  * {
    box-sizing: border-box;
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
`;var $=t(92203),u=t(86375),b=t(19808),X=t(88358),f=t(55638),S=t(74365),L=t(73565),w=t(46881),v=t(52178);let{useMercureCreateCookieMutation:y}=t(53073).api.enhanceEndpoints({addTagTypes:["Mercure"]}).injectEndpoints({endpoints:e=>({mercureCreateCookie:e.mutation({query:()=>({url:"/pimcore-studio/api/mercure/auth",method:"POST"}),invalidatesTags:["Mercure"]})}),overrideExisting:!1});var M=t(72098),k=t(52626),A=t(63824),D=t(76374),G=t(81607),E=t(1019),z=t(66410);let P=(0,n.createContext)({registerLoader:()=>{},unregisterLoader:()=>{},isAppLoading:!1}),j=e=>{let i,t,m,r,d,[g,x]=(0,n.useState)("loading"),[j,_]=(0,n.useState)(new Set),T=(0,n.useCallback)(e=>{_(i=>new Set(i).add(e))},[]),C=(0,n.useCallback)(e=>{_(i=>{let t=new Set(i);return t.delete(e),t})},[]),R="loading"===g||"outro"===g||j.size>0,F=(0,n.useMemo)(()=>({registerLoader:T,unregisterLoader:C,isAppLoading:R}),[T,C,R]),I=(0,n.useRef)(null),B=(0,n.useCallback)(()=>{x("outro"),I.current=setTimeout(()=>{x("idle")},1e3)},[]);(0,n.useEffect)(()=>()=>{null!==I.current&&clearTimeout(I.current)},[]);let H=(0,$.Z)(),{modal:U}=p.App.useApp();u.B.setModalInstance(H),G.Y.setModalInstance(U);let{isAuthenticated:O}=(0,b.X)(),{loadPublicTranslations:Y,loadTranslations:N}=(()=>{let[e]=(0,S.oG)();return{loadPublicTranslations:async()=>{await e({translation:{locale:X.g,keys:[],useFallback:!0}}).unwrap().then(e=>{X.A.addResourceBundle(X.g,"translation",e.keys??[],!0,!0),X.A.changeLanguage(X.g)}).catch(()=>{throw(0,f.Ay)(new f.$g("Error loading translations")),Error("Error loading translations")})},loadTranslations:async()=>{let i=(0,L.xu)(l.M_.getState());await e({translation:{locale:i.language,keys:[],useFallback:!0}}).unwrap().then(e=>{X.A.addResourceBundle(i.language,"translation",e.keys??[],!0,!0),X.A.changeLanguage(i.language)}).catch(e=>{console.error("Error loading translations",e),(0,f.Ay)(new f.$g("Error loading translations"))})}}})(),{loadUser:W}=(i=(0,w.useAppDispatch)(),{loadUser:async()=>{let e=i(v.FH.endpoints.userGetCurrentInformation.initiate());await e.then(e=>{let{data:t,isSuccess:a,isError:n,error:m}=e;n?(0,f.Ay)(new f.hD(m)):a&&void 0!==t&&i((0,L.gV)(t))}).catch(e=>{throw(0,f.Ay)(new f.$g("Error loading user information")),Error("Error loading user information",{cause:e})})}}),[q]=y(),{loadSettings:K}=(t=(0,w.useAppDispatch)(),{loadSettings:async()=>{t(k.FH.endpoints.systemSettingsGet.initiate()).then(e=>{let{data:i,isSuccess:a,isError:n,error:m}=e;n&&(0,f.Ay)(new f.hD(m)),a&&void 0!==i&&t((0,M.oc)(i))}).catch(()=>{})}}),{loadAvailableLocales:Q}={loadAvailableLocales:async()=>{try{await l.M_.dispatch(A.FH.endpoints.translationGetAvailableLocales.initiate(void 0,{forceRefetch:!1,subscribe:!0})).unwrap()}catch(e){throw(0,f.Ay)(new f.$g("Error loading available locales")),e}}},{loadBrandThumbnailUrls:V}=(m=(0,w.useAppDispatch)(),{loadBrandThumbnailUrls:async()=>{let e=m(k.FH.endpoints.settingAdminThumbnail.initiate());await e.then(e=>{let{data:i,isSuccess:t,isError:a,error:n}=e;a?(0,f.Ay)(new f.hD(n)):t&&void 0!==i&&m((0,M.MM)(i))}).catch(()=>{(0,f.Ay)(new f.$g("Error loading brand thumbnail URLs"))})}}),{loadAdminSettings:Z}=(r=(0,l.jL)(),{loadAdminSettings:async()=>{let e=r(k.FH.endpoints.adminSettingsGet.initiate());await e.then(e=>{let{data:i,isSuccess:t,isError:a,error:n}=e;a?(0,f.Ay)(new f.hD(n)):t&&void 0!==i&&r((0,M.XE)(i))}).catch(()=>{(0,f.Ay)(new f.$g("Error loading admin settings"))})}}),{loadPerspective:J}=(0,D.n)(),{initGlobalMessageBus:ee}=(d=(0,n.useRef)(!1),{initGlobalMessageBus:e=>{if(!d.current)try{let i=w.container.get(w.serviceIds.globalMessageBus),t=w.container.get(w.serviceIds.globalMessageBusProcess),a=w.container.get(w.serviceIds.backgroundProcessor);i.registerTopics([...Object.values(z.v),`studio-backend-default/user/${e}`]),a.registerProcess(t),i.startGlobalSubscription(),document.addEventListener("visibilitychange",()=>{"visible"!==document.visibilityState||t.isConnected()||t.start()}),window.addEventListener("online",()=>{t.start()}),d.current=!0}catch(e){console.error("Failed to initialize global message bus:",e)}}}),ei=w.container.get(w.serviceIds["AppLoader/Registry"]);async function et(){let e=(0,L.xu)(l.M_.getState()),i=String((null==e?void 0:e.activePerspective)??"studio_default_perspective");return await J(i)}return(0,n.useEffect)(()=>{(async()=>{if(x("loading"),void 0!==O&&(O||await Promise.all([Y(),V()]).then(()=>{B()}).catch(e=>{console.error("Error during login preparation",e)}),O)){await Promise.all([W()]);let e=(0,L.xu)(l.M_.getState());(0,o.isNil)(null==e?void 0:e.id)||ee(e.id),await Promise.all([q(),N(),K(),Z(),V(),Q(),et(),(0,E.N)()]),await ei.loadAll(),B()}})()},[O]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(c,{}),(0,a.jsxs)(P.Provider,{value:F,children:[(0,a.jsx)(h.bU,{component:h.eb.app.background.name,props:{phase:g}}),"idle"===g&&(0,a.jsxs)("div",{style:{position:"absolute",inset:0,animation:`${s.y} 600ms ease 200ms both`},children:["            ",e.children]})]})]})};var _=t(37327),T=t(13947),C=t(17777),R=t(81558),F=t(63993);let I=()=>(0,a.jsx)(n.StrictMode,{children:(0,a.jsx)(T.A,{children:(0,a.jsx)(r.D,{children:(0,a.jsx)(p.App,{notification:{stack:!1},children:(0,a.jsx)(F._,{children:(0,a.jsxs)(C.Y,{children:[(0,a.jsx)(R.bk,{}),(0,a.jsx)(_.M,{children:(0,a.jsx)(j,{children:(0,a.jsx)(d.RouterProvider,{router:g.QB})})})]})})})})})});var B=t(70463);function H(){B.a.initialize(l.M_);let e=document.getElementById("app");null===e?(0,f.Ay)(new f.$g("Root element not found")):(0,m.createRoot)(e).render((0,a.jsx)(I,{}))}}}]);