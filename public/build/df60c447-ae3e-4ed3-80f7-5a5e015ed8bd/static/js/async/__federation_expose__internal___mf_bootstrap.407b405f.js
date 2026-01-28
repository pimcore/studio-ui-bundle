<<<<<<<< HEAD:public/build/ad74099e-89be-440c-95b8-c5ee5fa8a202/static/js/async/__federation_expose__internal___mf_bootstrap.1adffdff.js
/*! For license information please see __federation_expose__internal___mf_bootstrap.1adffdff.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["8785"],{11918:function(e,t,a){a.a(e,async function(i,n){try{a.r(t),a(81196);var m=a(88688),r=a(55620),p=a(3477),d=a(69984);e=a.hmd(e),void 0!==e.hot&&e.hot.accept(),window.Pimcore=(await Promise.resolve().then(a.bind(a,3477))).Pimcore,window.PimcoreStudio=p.PimcoreStudio,window.addEventListener("load",async()=>{await r.p.loadPlugins(),r.p.initPlugins(),r.p.startupPlugins(),d._.initModules(),(0,m.m)()}),n()}catch(e){n(e)}},1)},88688:function(e,t,a){a.d(t,{m:()=>F});var i=a(85893),n=a(81004),m=a(20745),r=a(2953),p=a(26788),d=a(20602),g=a(17799),o=a(53478),l=a(46309),s=a(62368),h=a(29202);let x=(0,h.createGlobalStyle)`
========
/*! For license information please see __federation_expose__internal___mf_bootstrap.407b405f.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["8785"],{11918:function(e,a,t){t.a(e,async function(i,n){try{t.r(a),t(45969);var m=t(6144),r=t(55620),p=t(3477),d=t(69984);e=t.hmd(e),void 0!==e.hot&&e.hot.accept(),window.Pimcore=(await Promise.resolve().then(t.bind(t,3477))).Pimcore,window.PimcoreStudio=p.PimcoreStudio,window.addEventListener("load",async()=>{await r.p.loadPlugins(),r.p.initPlugins(),r.p.startupPlugins(),d._.initModules(),(0,m.m)()}),n()}catch(e){n(e)}},1)},6144:function(e,a,t){t.d(a,{m:()=>I});var i=t(85893),n=t(81004),m=t(20745),r=t(2953),p=t(26788),d=t(20602),g=t(87117),o=t(46309),l=t(62368),h=t(29202);let s=(0,h.createGlobalStyle)`
>>>>>>>> 4cc1a1912c6c38ef7e74c492ba20feba0215301c:public/build/df60c447-ae3e-4ed3-80f7-5a5e015ed8bd/static/js/async/__federation_expose__internal___mf_bootstrap.407b405f.js
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
<<<<<<<< HEAD:public/build/ad74099e-89be-440c-95b8-c5ee5fa8a202/static/js/async/__federation_expose__internal___mf_bootstrap.1adffdff.js
`;var c=a(54409),$=a(44432),u=a(88308),X=a(71099),b=a(81343),S=a(11347),f=a(35316),L=a(40483),v=a(30683);let{useMercureCreateCookieMutation:w}=a(42125).api.enhanceEndpoints({addTagTypes:["Mercure"]}).injectEndpoints({endpoints:e=>({mercureCreateCookie:e.mutation({query:()=>({url:"/pimcore-studio/api/mercure/auth",method:"POST"}),invalidatesTags:["Mercure"]})}),overrideExisting:!1});var M=a(27539),y=a(8178),k=a(54246),E=a(63654),G=a(60552),P=a(691),z=a(72323);let D=e=>{let[t,a]=(0,n.useState)(!0),m=(0,c.s)(),{modal:r}=p.App.useApp();$.E.setModalInstance(m),G.U.setModalInstance(r);let{isAuthenticated:d}=(0,u.k)(),{loadPublicTranslations:g,loadTranslations:h}=(()=>{let[e]=(0,S.tj)();return{loadPublicTranslations:async()=>{await e({translation:{locale:X.L,keys:[],useFallback:!0}}).unwrap().then(e=>{X.Z.addResourceBundle(X.L,"translation",e.keys??[],!0,!0),X.Z.changeLanguage(X.L)}).catch(()=>{throw(0,b.ZP)(new b.aE("Error loading translations")),Error("Error loading translations")})},loadTranslations:async()=>{let t=(0,f.HF)(l.h.getState());await e({translation:{locale:t.language,keys:[],useFallback:!0}}).unwrap().then(e=>{X.Z.addResourceBundle(t.language,"translation",e.keys??[],!0,!0),X.Z.changeLanguage(t.language)}).catch(e=>{console.error("Error loading translations",e),(0,b.ZP)(new b.aE("Error loading translations"))})}}})(),{loadUser:D}=(()=>{let e=(0,L.useAppDispatch)();return{loadUser:async()=>{let t=e(v.hi.endpoints.userGetCurrentInformation.initiate());await t.then(t=>{let{data:a,isSuccess:i,isError:n,error:m}=t;n?(0,b.ZP)(new b.MS(m)):i&&void 0!==a&&e((0,f.av)(a))}).catch(e=>{throw(0,b.ZP)(new b.aE("Error loading user information")),Error("Error loading user information",{cause:e})})}}})(),[j]=w(),{loadSettings:Z}=(()=>{let e=(0,L.useAppDispatch)();return{loadSettings:async()=>{e(y.hi.endpoints.systemSettingsGet.initiate()).then(t=>{let{data:a,isSuccess:i,isError:n,error:m}=t;n&&(0,b.ZP)(new b.MS(m)),i&&void 0!==a&&e((0,M.I)(a))}).catch(()=>{})}}})(),{loadAvailableLocales:A}={loadAvailableLocales:async()=>{try{await l.h.dispatch(k.hi.endpoints.translationGetAvailableLocales.initiate(void 0,{forceRefetch:!1,subscribe:!0})).unwrap()}catch(e){throw(0,b.ZP)(new b.aE("Error loading available locales")),e}}},{loadPerspective:I}=(0,E.o)(),{initGlobalMessageBus:R}=(()=>{let e=(0,n.useRef)(!1);return{initGlobalMessageBus:t=>{if(!e.current)try{let a=L.container.get(L.serviceIds.globalMessageBus),i=L.container.get(L.serviceIds.globalMessageBusProcess),n=L.container.get(L.serviceIds.backgroundProcessor);a.registerTopics([...Object.values(z.F),`studio-backend-default/user/${t}`]),n.registerProcess(i),a.startGlobalSubscription(),document.addEventListener("visibilitychange",()=>{"visible"!==document.visibilityState||i.isConnected()||i.start()}),window.addEventListener("online",()=>{i.start()}),e.current=!0}catch(e){console.error("Failed to initialize global message bus:",e)}}}})(),_=L.container.get(L.serviceIds["AppLoader/Registry"]);async function C(){let e=(0,f.HF)(l.h.getState()),t=String((null==e?void 0:e.activePerspective)??"studio_default_perspective");return await I(t)}return(0,n.useEffect)(()=>{(async()=>{if(a(()=>!0),void 0!==d&&(d||await Promise.all([g()]).then(()=>{a(()=>!1)}).catch(e=>{console.error("Error during login preparation",e)}),d)){await Promise.all([D()]);let e=(0,f.HF)(l.h.getState());(0,o.isNil)(null==e?void 0:e.id)||R(e.id),await Promise.all([j(),h(),Z(),A(),C(),(0,P.G)()]),await _.loadAll(),a(()=>!1)}})()},[d]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(x,{}),t&&(0,i.jsx)(s.V,{loading:!0}),!t&&e.children]})};var j=a(91061),Z=a(65980),A=a(40296),I=a(18605),R=a(74939);let _=()=>(0,i.jsx)(n.StrictMode,{children:(0,i.jsx)(Z.Z,{children:(0,i.jsx)(r.R,{children:(0,i.jsx)(p.App,{children:(0,i.jsx)(R.a,{children:(0,i.jsxs)(A.$,{children:[(0,i.jsx)(I.i4,{}),(0,i.jsx)(j.z,{children:(0,i.jsx)(D,{children:(0,i.jsx)(d.RouterProvider,{router:g.Nd})})})]})})})})})});var C=a(7117);function F(){C.p.initialize(l.h);let e=document.getElementById("app");if(null===e)return void(0,b.ZP)(new b.aE("Root element not found"));(0,m.createRoot)(e).render((0,i.jsx)(_,{}))}}}]);
========
`;var x=t(54409),$=t(44432),c=t(88308),u=t(71099),X=t(81343),b=t(11347),S=t(35316),L=t(40483),f=t(30683);let{useMercureCreateCookieMutation:w}=t(42125).api.enhanceEndpoints({addTagTypes:["Mercure"]}).injectEndpoints({endpoints:e=>({mercureCreateCookie:e.mutation({query:()=>({url:"/pimcore-studio/api/mercure/auth",method:"POST"}),invalidatesTags:["Mercure"]})}),overrideExisting:!1});var M=t(27539),v=t(8178),y=t(54246),k=t(75),E=t(63654),G=t(60552),P=t(691);let z=e=>{let[a,t]=(0,n.useState)(!0),m=(0,x.s)(),{modal:r}=p.App.useApp();$.E.setModalInstance(m),G.U.setModalInstance(r);let{isAuthenticated:d}=(0,c.k)(),{loadPublicTranslations:g,loadTranslations:h}=(()=>{let[e]=(0,b.tj)();return{loadPublicTranslations:async()=>{await e({translation:{locale:u.L,keys:[],useFallback:!0}}).unwrap().then(e=>{u.Z.addResourceBundle(u.L,"translation",e.keys??[],!0,!0),u.Z.changeLanguage(u.L)}).catch(()=>{throw(0,X.ZP)(new X.aE("Error loading translations")),Error("Error loading translations")})},loadTranslations:async()=>{let a=(0,S.HF)(o.h.getState());await e({translation:{locale:a.language,keys:[],useFallback:!0}}).unwrap().then(e=>{u.Z.addResourceBundle(a.language,"translation",e.keys??[],!0,!0),u.Z.changeLanguage(a.language)}).catch(e=>{console.error("Error loading translations",e),(0,X.ZP)(new X.aE("Error loading translations"))})}}})(),{loadUser:z}=(()=>{let e=(0,L.useAppDispatch)();return{loadUser:async()=>{let a=e(f.hi.endpoints.userGetCurrentInformation.initiate());await a.then(a=>{let{data:t,isSuccess:i,isError:n,error:m}=a;n?(0,X.ZP)(new X.MS(m)):i&&void 0!==t&&e((0,S.av)(t))}).catch(e=>{throw(0,X.ZP)(new X.aE("Error loading user information")),Error("Error loading user information",{cause:e})})}}})(),[D]=w(),{loadSettings:j}=(()=>{let e=(0,L.useAppDispatch)();return{loadSettings:async()=>{e(v.hi.endpoints.systemSettingsGet.initiate()).then(a=>{let{data:t,isSuccess:i,isError:n,error:m}=a;n&&(0,X.ZP)(new X.MS(m)),i&&void 0!==t&&e((0,M.I)(t))}).catch(()=>{})}}})(),{loadAvailableLocales:Z}={loadAvailableLocales:async()=>{try{await o.h.dispatch(y.hi.endpoints.translationGetAvailableLocales.initiate(void 0,{forceRefetch:!1,subscribe:!0})).unwrap()}catch(e){throw(0,X.ZP)(new X.aE("Error loading available locales")),e}}},{loadThumbnails:A}=(()=>{let e=(0,L.useAppDispatch)();return{loadThumbnails:async()=>{e(k.hi.endpoints.settingAdminThumbnail.initiate()).then(e=>{let{isError:a,error:t}=e;a&&(0,X.ZP)(new X.MS(t))}).catch(()=>{})}}})(),{loadAdminSettings:T}=(()=>{let e=(0,o.TL)();return{loadAdminSettings:async()=>{e(v.hi.endpoints.adminSettingsGet.initiate()).then(e=>{let{isError:a,error:t}=e;a&&(0,X.ZP)(new X.MS(t))}).catch(()=>{(0,X.ZP)(new X.aE("Error loading admin settings"))})}}})(),{loadPerspective:_}=(0,E.o)(),C=L.container.get(L.serviceIds["AppLoader/Registry"]);async function R(){let e=(0,S.HF)(o.h.getState()),a=String((null==e?void 0:e.activePerspective)??"studio_default_perspective");return await _(a)}return(0,n.useEffect)(()=>{(async()=>{t(()=>!0),void 0!==d&&(d||await Promise.all([g(),A()]).then(()=>{t(()=>!1)}).catch(e=>{console.error("Error during login preparation",e)}),d&&(await Promise.all([z()]),await Promise.all([D(),h(),j(),T(),A(),Z(),R(),(0,P.G)()]),await C.loadAll(),t(()=>!1)))})()},[d]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s,{}),a&&(0,i.jsx)(l.V,{loading:!0}),!a&&e.children]})};var D=t(91061),j=t(65980),Z=t(40296),A=t(18605),T=t(74939);let _=()=>(0,i.jsx)(n.StrictMode,{children:(0,i.jsx)(j.Z,{children:(0,i.jsx)(r.R,{children:(0,i.jsx)(p.App,{children:(0,i.jsx)(T.a,{children:(0,i.jsxs)(Z.$,{children:[(0,i.jsx)(A.i4,{}),(0,i.jsx)(D.z,{children:(0,i.jsx)(z,{children:(0,i.jsx)(d.RouterProvider,{router:g.Nd})})})]})})})})})});var C=t(7117),R=t(80380),F=t(79771);function I(){C.p.initialize(o.h);try{R.nC.get(F.j.globalMessageBus).startGlobalSubscription()}catch(e){console.error("Failed to start global message bus subscription:",e)}let e=document.getElementById("app");if(null===e)return void(0,X.ZP)(new X.aE("Root element not found"));(0,m.createRoot)(e).render((0,i.jsx)(_,{}))}}}]);
>>>>>>>> 4cc1a1912c6c38ef7e74c492ba20feba0215301c:public/build/df60c447-ae3e-4ed3-80f7-5a5e015ed8bd/static/js/async/__federation_expose__internal___mf_bootstrap.407b405f.js
