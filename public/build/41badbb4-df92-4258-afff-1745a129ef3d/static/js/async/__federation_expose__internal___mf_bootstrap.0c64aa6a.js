/*! For license information please see __federation_expose__internal___mf_bootstrap.0c64aa6a.js.LICENSE.txt */
"use strict";(self["chunk_pimcore_studio_ui_bundle "]=self["chunk_pimcore_studio_ui_bundle "]||[]).push([["2108"],{55831(e,i,t){t.a(e,async function(a,n){try{t.r(i),t(30746);var m=t(72022),r=t(80323),p=t(21849),d=t(27755);e=t.hmd(e),void 0!==e.hot&&e.hot.accept(),window.Pimcore=(await Promise.resolve().then(t.bind(t,21849))).Pimcore,window.PimcoreStudio=p.PimcoreStudio,window.addEventListener("load",async()=>{await r.f.loadPlugins(),r.f.initPlugins(),r.f.startupPlugins(),d.s.initModules(),(0,m.T)()}),n()}catch(e){n(e)}},1)},72022(e,i,t){t.d(i,{T:()=>B});var a=t(74848),n=t(47867),m=t(5338),r=t(64471),p=t(86569),d=t(52725),g=t(2659),o=t(35864),l=t(41630),s=t(39808),h=t(44241);let x=(0,h.createGlobalStyle)`
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
`;var c=t(92203),$=t(86375),u=t(19808),X=t(88358),b=t(55638),f=t(74365),S=t(73565),L=t(46881),w=t(52178);let{useMercureCreateCookieMutation:v}=t(53073).api.enhanceEndpoints({addTagTypes:["Mercure"]}).injectEndpoints({endpoints:e=>({mercureCreateCookie:e.mutation({query:()=>({url:"/pimcore-studio/api/mercure/auth",method:"POST"}),invalidatesTags:["Mercure"]})}),overrideExisting:!1});var y=t(72098),M=t(52626),k=t(63824),A=t(76374),D=t(81607),G=t(1019),E=t(66410);let z=e=>{let i,t,m,r,d,[g,h]=(0,n.useState)(!0),z=(0,c.Z)(),{modal:P}=p.App.useApp();$.B.setModalInstance(z),D.Y.setModalInstance(P);let{isAuthenticated:j}=(0,u.X)(),{loadPublicTranslations:_,loadTranslations:T}=(()=>{let[e]=(0,f.oG)();return{loadPublicTranslations:async()=>{await e({translation:{locale:X.g,keys:[],useFallback:!0}}).unwrap().then(e=>{X.A.addResourceBundle(X.g,"translation",e.keys??[],!0,!0),X.A.changeLanguage(X.g)}).catch(()=>{throw(0,b.Ay)(new b.$g("Error loading translations")),Error("Error loading translations")})},loadTranslations:async()=>{let i=(0,S.xu)(l.M_.getState());await e({translation:{locale:i.language,keys:[],useFallback:!0}}).unwrap().then(e=>{X.A.addResourceBundle(i.language,"translation",e.keys??[],!0,!0),X.A.changeLanguage(i.language)}).catch(e=>{console.error("Error loading translations",e),(0,b.Ay)(new b.$g("Error loading translations"))})}}})(),{loadUser:R}=(i=(0,L.useAppDispatch)(),{loadUser:async()=>{let e=i(w.FH.endpoints.userGetCurrentInformation.initiate());await e.then(e=>{let{data:t,isSuccess:a,isError:n,error:m}=e;n?(0,b.Ay)(new b.hD(m)):a&&void 0!==t&&i((0,S.gV)(t))}).catch(e=>{throw(0,b.Ay)(new b.$g("Error loading user information")),Error("Error loading user information",{cause:e})})}}),[F]=v(),{loadSettings:I}=(t=(0,L.useAppDispatch)(),{loadSettings:async()=>{t(M.FH.endpoints.systemSettingsGet.initiate()).then(e=>{let{data:i,isSuccess:a,isError:n,error:m}=e;n&&(0,b.Ay)(new b.hD(m)),a&&void 0!==i&&t((0,y.oc)(i))}).catch(()=>{})}}),{loadAvailableLocales:B}={loadAvailableLocales:async()=>{try{await l.M_.dispatch(k.FH.endpoints.translationGetAvailableLocales.initiate(void 0,{forceRefetch:!1,subscribe:!0})).unwrap()}catch(e){throw(0,b.Ay)(new b.$g("Error loading available locales")),e}}},{loadBrandThumbnailUrls:C}=(m=(0,L.useAppDispatch)(),{loadBrandThumbnailUrls:async()=>{let e=m(M.FH.endpoints.settingAdminThumbnail.initiate());await e.then(e=>{let{data:i,isSuccess:t,isError:a,error:n}=e;a?(0,b.Ay)(new b.hD(n)):t&&void 0!==i&&m((0,y.MM)(i))}).catch(()=>{(0,b.Ay)(new b.$g("Error loading brand thumbnail URLs"))})}}),{loadAdminSettings:H}=(r=(0,l.jL)(),{loadAdminSettings:async()=>{let e=r(M.FH.endpoints.adminSettingsGet.initiate());await e.then(e=>{let{data:i,isSuccess:t,isError:a,error:n}=e;a?(0,b.Ay)(new b.hD(n)):t&&void 0!==i&&r((0,y.XE)(i))}).catch(()=>{(0,b.Ay)(new b.$g("Error loading admin settings"))})}}),{loadPerspective:U}=(0,A.n)(),{initGlobalMessageBus:O}=(d=(0,n.useRef)(!1),{initGlobalMessageBus:e=>{if(!d.current)try{let i=L.container.get(L.serviceIds.globalMessageBus),t=L.container.get(L.serviceIds.globalMessageBusProcess),a=L.container.get(L.serviceIds.backgroundProcessor);i.registerTopics([...Object.values(E.v),`studio-backend-default/user/${e}`]),a.registerProcess(t),i.startGlobalSubscription(),document.addEventListener("visibilitychange",()=>{"visible"!==document.visibilityState||t.isConnected()||t.start()}),window.addEventListener("online",()=>{t.start()}),d.current=!0}catch(e){console.error("Failed to initialize global message bus:",e)}}}),Y=L.container.get(L.serviceIds["AppLoader/Registry"]);async function N(){let e=(0,S.xu)(l.M_.getState()),i=String((null==e?void 0:e.activePerspective)??"studio_default_perspective");return await U(i)}return(0,n.useEffect)(()=>{(async()=>{if(h(()=>!0),void 0!==j&&(j||await Promise.all([_(),C()]).then(()=>{h(()=>!1)}).catch(e=>{console.error("Error during login preparation",e)}),j)){await Promise.all([R()]);let e=(0,S.xu)(l.M_.getState());(0,o.isNil)(null==e?void 0:e.id)||O(e.id),await Promise.all([F(),T(),I(),H(),C(),B(),N(),(0,G.N)()]),await Y.loadAll(),h(()=>!1)}})()},[j]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(x,{}),g&&(0,a.jsx)(s.U,{loading:!0}),!g&&e.children]})};var P=t(37327),j=t(13947),_=t(5481),T=t(81558),R=t(63993);let F=()=>(0,a.jsx)(n.StrictMode,{children:(0,a.jsx)(j.A,{children:(0,a.jsx)(r.D,{children:(0,a.jsx)(p.App,{notification:{stack:!1},children:(0,a.jsx)(R._,{children:(0,a.jsxs)(_.Y,{children:[(0,a.jsx)(T.bk,{}),(0,a.jsx)(P.M,{children:(0,a.jsx)(z,{children:(0,a.jsx)(d.RouterProvider,{router:g.QB})})})]})})})})})});var I=t(70463);function B(){I.a.initialize(l.M_);let e=document.getElementById("app");null===e?(0,b.Ay)(new b.$g("Root element not found")):(0,m.createRoot)(e).render((0,a.jsx)(F,{}))}}}]);