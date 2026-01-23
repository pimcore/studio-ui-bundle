/*! For license information please see __federation_expose__internal___mf_bootstrap.8655f251.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["8785"],{11918:function(e,a,t){t.a(e,async function(i,n){try{t.r(a),t(59521);var m=t(483),p=t(55620),r=t(3477),g=t(69984);e=t.hmd(e),void 0!==e.hot&&e.hot.accept(),window.Pimcore=(await Promise.resolve().then(t.bind(t,3477))).Pimcore,window.PimcoreStudio=r.PimcoreStudio,window.addEventListener("load",async()=>{await p.p.loadPlugins(),p.p.initPlugins(),p.p.startupPlugins(),g._.initModules(),(0,m.m)()}),n()}catch(e){n(e)}},1)},483:function(e,a,t){t.d(a,{m:()=>I});var i=t(85893),n=t(81004),m=t(20745),p=t(13436),r=t(26788),g=t(20602),d=t(17799),o=t(46309),l=t(62368),h=t(29202);let s=(0,h.createGlobalStyle)`
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
`;var x=t(54409),$=t(44432),c=t(88308),u=t(71099),X=t(81343),b=t(11347),S=t(35316),L=t(40483),f=t(30683);let{useMercureCreateCookieMutation:w}=t(42125).api.enhanceEndpoints({addTagTypes:["Mercure"]}).injectEndpoints({endpoints:e=>({mercureCreateCookie:e.mutation({query:()=>({url:"/pimcore-studio/api/mercure/auth",method:"POST"}),invalidatesTags:["Mercure"]})}),overrideExisting:!1});var v=t(27539),M=t(8178),y=t(54246),k=t(63654),G=t(60552),E=t(691);let P=e=>{let[a,t]=(0,n.useState)(!0),m=(0,x.s)(),{modal:p}=r.App.useApp();$.E.setModalInstance(m),G.U.setModalInstance(p);let{isAuthenticated:g}=(0,c.k)(),{loadPublicTranslations:d,loadTranslations:h}=(()=>{let[e]=(0,b.tj)();return{loadPublicTranslations:async()=>{await e({translation:{locale:u.L,keys:[],useFallback:!0}}).unwrap().then(e=>{u.Z.addResourceBundle(u.L,"translation",e.keys??[],!0,!0),u.Z.changeLanguage(u.L)}).catch(()=>{throw(0,X.ZP)(new X.aE("Error loading translations")),Error("Error loading translations")})},loadTranslations:async()=>{let a=(0,S.HF)(o.h.getState());await e({translation:{locale:a.language,keys:[],useFallback:!0}}).unwrap().then(e=>{u.Z.addResourceBundle(a.language,"translation",e.keys??[],!0,!0),u.Z.changeLanguage(a.language)}).catch(e=>{console.error("Error loading translations",e),(0,X.ZP)(new X.aE("Error loading translations"))})}}})(),{loadUser:P}=(()=>{let e=(0,L.useAppDispatch)();return{loadUser:async()=>{let a=e(f.hi.endpoints.userGetCurrentInformation.initiate());await a.then(a=>{let{data:t,isSuccess:i,isError:n,error:m}=a;n?(0,X.ZP)(new X.MS(m)):i&&void 0!==t&&e((0,S.av)(t))}).catch(e=>{throw(0,X.ZP)(new X.aE("Error loading user information")),Error("Error loading user information",{cause:e})})}}})(),[z]=w(),{loadSettings:D}=(()=>{let e=(0,L.useAppDispatch)();return{loadSettings:async()=>{e(M.hi.endpoints.systemSettingsGet.initiate()).then(a=>{let{data:t,isSuccess:i,isError:n,error:m}=a;n&&(0,X.ZP)(new X.MS(m)),i&&void 0!==t&&e((0,v.I)(t))}).catch(()=>{})}}})(),{loadAvailableLocales:j}={loadAvailableLocales:async()=>{try{await o.h.dispatch(y.hi.endpoints.translationGetAvailableLocales.initiate(void 0,{forceRefetch:!1,subscribe:!0})).unwrap()}catch(e){throw(0,X.ZP)(new X.aE("Error loading available locales")),e}}},{loadPerspective:Z}=(0,k.o)(),A=L.container.get(L.serviceIds["AppLoader/Registry"]);async function _(){let e=(0,S.HF)(o.h.getState()),a=String((null==e?void 0:e.activePerspective)??"studio_default_perspective");return await Z(a)}return(0,n.useEffect)(()=>{(async()=>{t(()=>!0),void 0!==g&&(g||await Promise.all([d()]).then(()=>{t(()=>!1)}).catch(e=>{console.error("Error during login preparation",e)}),g&&(await Promise.all([P()]),await Promise.all([z(),h(),D(),j(),_(),(0,E.G)()]),await A.loadAll(),t(()=>!1)))})()},[g]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s,{}),a&&(0,i.jsx)(l.V,{loading:!0}),!a&&e.children]})};var z=t(91061),D=t(65980),j=t(40296),Z=t(18605),A=t(74939);let _=()=>(0,i.jsx)(n.StrictMode,{children:(0,i.jsx)(D.Z,{children:(0,i.jsx)(p.R,{children:(0,i.jsx)(r.App,{children:(0,i.jsx)(A.a,{children:(0,i.jsxs)(j.$,{children:[(0,i.jsx)(Z.i4,{}),(0,i.jsx)(z.z,{children:(0,i.jsx)(P,{children:(0,i.jsx)(g.RouterProvider,{router:d.Nd})})})]})})})})})});var C=t(7117),R=t(80380),F=t(79771);function I(){C.p.initialize(o.h);try{R.nC.get(F.j.globalMessageBus).startGlobalSubscription()}catch(e){console.error("Failed to start global message bus subscription:",e)}let e=document.getElementById("app");if(null===e)return void(0,X.ZP)(new X.aE("Root element not found"));(0,m.createRoot)(e).render((0,i.jsx)(_,{}))}}}]);