<<<<<<<< HEAD:public/build/f0bf4c88-4c38-4b99-b2de-4f6b23c63a8c/static/js/async/__federation_expose__internal___mf_bootstrap.b9043fc8.js
/*! For license information please see __federation_expose__internal___mf_bootstrap.b9043fc8.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["8785"],{8178:function(e,t,i){i.d(t,{LA:()=>n,d_:()=>p,hi:()=>m});var a=i(42125);let n=["Settings"],m=a.api.enhanceEndpoints({addTagTypes:n}).injectEndpoints({endpoints:e=>({systemSettingsGet:e.query({query:()=>({url:"/pimcore-studio/api/settings"}),providesTags:["Settings"]})}),overrideExisting:!1}),{useSystemSettingsGetQuery:p}=m},36514:function(e,t,i){i.d(t,{m:()=>D});var a=i(85893),n=i(81004),m=i(20745),p=i(85141),r=i(26788),g=i(20602),d=i(77444),o=i(46309),l=i(77476),h=i(29202);let x=(0,h.createGlobalStyle)`
========
/*! For license information please see __federation_expose__internal___mf_bootstrap.a35c205e.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["8785"],{8178:function(e,t,i){i.d(t,{LA:()=>n,d_:()=>p,hi:()=>m});var a=i(42125);let n=["Settings"],m=a.api.enhanceEndpoints({addTagTypes:n}).injectEndpoints({endpoints:e=>({systemSettingsGet:e.query({query:()=>({url:"/pimcore-studio/api/settings"}),providesTags:["Settings"]})}),overrideExisting:!1}),{useSystemSettingsGetQuery:p}=m},36514:function(e,t,i){i.d(t,{m:()=>_});var a=i(85893),n=i(81004),m=i(20745),p=i(85141),r=i(26788),g=i(20602),d=i(77444),o=i(46309),l=i(77476),h=i(29202);let x=(0,h.createGlobalStyle)`
>>>>>>>> origin/1.x:public/build/02b5e332-46d3-4d37-81a3-440c3403d8ef/static/js/async/__federation_expose__internal___mf_bootstrap.a35c205e.js
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
<<<<<<<< HEAD:public/build/f0bf4c88-4c38-4b99-b2de-4f6b23c63a8c/static/js/async/__federation_expose__internal___mf_bootstrap.b9043fc8.js
`;var s=i(62955),$=i(44432),c=i(88308),X=i(71099),u=i(55721),b=i(11347),S=i(35316),L=i(40483),f=i(30683);let{useMercureCreateCookieMutation:M}=i(42125).api.enhanceEndpoints({addTagTypes:["Mercure"]}).injectEndpoints({endpoints:e=>({mercureCreateCookie:e.mutation({query:()=>({url:"/pimcore-studio/api/mercure/auth",method:"POST"}),invalidatesTags:["Mercure"]})}),overrideExisting:!1});var k=i(27539),v=i(8178),y=i(64435),w=i(60552);let E=e=>{let[t,i]=(0,n.useState)(!0),m=(0,s.s)(),{modal:p}=r.App.useApp();$.E.setModalInstance(m),w.U.setModalInstance(p);let{isAuthenticated:g}=(0,c.k)(),{loadPublicTranslations:d,loadTranslations:h}=(()=>{let[e]=(0,b.tj)();return{loadPublicTranslations:async()=>{await e({translation:{locale:X.L,keys:[],useFallback:!0}}).unwrap().then(e=>{X.Z.addResourceBundle(X.L,"translation",e.keys??[],!0,!0),X.Z.changeLanguage(X.L)}).catch(()=>{throw(0,u.ZP)(new u.aE("Error loading translations")),Error("Error loading translations")})},loadTranslations:async()=>{let t=(0,S.HF)(o.h.getState());await e({translation:{locale:t.language,keys:[],useFallback:!0}}).unwrap().then(e=>{X.Z.addResourceBundle(t.language,"translation",e.keys??[],!0,!0),X.Z.changeLanguage(t.language)}).catch(e=>{console.error("Error loading translations",e),(0,u.ZP)(new u.aE("Error loading translations"))})}}})(),{loadUser:E}=(()=>{let e=(0,L.useAppDispatch)();return{loadUser:async()=>{let t=e(f.hi.endpoints.userGetCurrentInformation.initiate());await t.then(t=>{let{data:i,isSuccess:a,isError:n,error:m}=t;n?(0,u.ZP)(new u.MS(m)):a&&void 0!==i&&e((0,S.av)(i))}).catch(e=>{throw(0,u.ZP)(new u.aE("Error loading user information")),Error("Error loading user information",{cause:e})})}}})(),[G]=M(),{loadSettings:P}=(()=>{let e=(0,L.useAppDispatch)();return{loadSettings:async()=>{e(v.hi.endpoints.systemSettingsGet.initiate()).then(t=>{let{data:i,isSuccess:a,isError:n,error:m}=t;n&&(0,u.ZP)(new u.MS(m)),a&&void 0!==i&&e((0,k.I)(i))}).catch(()=>{})}}})(),{loadPerspective:z}=(0,y.o)();async function D(){let e=(0,S.HF)(o.h.getState()),t=String((null==e?void 0:e.activePerspective)??"studio_default_perspective");return await z(t)}return(0,n.useEffect)(()=>{(async()=>{i(()=>!0),void 0!==g&&(g||await Promise.all([d()]).then(()=>{i(()=>!1)}).catch(e=>{console.error("Error during login preparation",e)}),g&&(await Promise.all([E()]),await Promise.all([G(),h(),P(),D()]),i(()=>!1)))})()},[g]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(x,{}),t&&(0,a.jsx)(l.V,{loading:!0}),!t&&e.children]})};var G=i(44526),P=i(86207);let z=()=>(0,a.jsx)(n.StrictMode,{children:(0,a.jsx)(P.Z,{children:(0,a.jsx)(p.R,{children:(0,a.jsx)(r.App,{children:(0,a.jsx)(G.z,{children:(0,a.jsx)(E,{children:(0,a.jsx)(g.RouterProvider,{router:d.Nd})})})})})})});function D(){let e=document.getElementById("app");if(null===e)return void(0,u.ZP)(new u.aE("Root element not found"));(0,m.createRoot)(e).render((0,a.jsx)(z,{}))}},11918:function(e,t,i){i.a(e,async function(a,n){try{i.r(t),i(95180);var m=i(36514),p=i(55620),r=i(80452),g=i(69984);e=i.hmd(e),void 0!==e.hot&&e.hot.accept(),window.Pimcore=(await Promise.resolve().then(i.bind(i,80452))).Pimcore,window.PimcoreStudio=r.PimcoreStudio,window.addEventListener("load",async()=>{await p.p.loadPlugins(),p.p.initPlugins(),p.p.startupPlugins(),g._.initModules(),(0,m.m)()}),n()}catch(e){n(e)}},1)}}]);
========
`;var s=i(62955),$=i(44432),c=i(88308),X=i(71099),u=i(55721),b=i(11347),S=i(35316);let L=()=>{let[e]=(0,b.tj)();return{loadPublicTranslations:async()=>{await e({translation:{locale:X.L,keys:[],useFallback:!0}}).unwrap().then(e=>{X.Z.addResourceBundle(X.L,"translation",e.keys??[],!0,!0),X.Z.changeLanguage(X.L)}).catch(()=>{throw(0,u.ZP)(new u.aE("Error loading translations")),Error("Error loading translations")})},loadTranslations:async()=>{let t=(0,S.HF)(o.h.getState());await e({translation:{locale:t.language,keys:[],useFallback:!0}}).unwrap().then(e=>{X.Z.addResourceBundle(t.language,"translation",e.keys??[],!0,!0),X.Z.changeLanguage(t.language)}).catch(e=>{console.error("Error loading translations",e),(0,u.ZP)(new u.aE("Error loading translations"))})}}};var f=i(40483),M=i(30683);let v=()=>{let e=(0,f.useAppDispatch)();return{loadUser:async()=>{let t=e(M.hi.endpoints.userGetCurrentInformation.initiate());await t.then(t=>{let{data:i,isSuccess:a,isError:n,error:m}=t;n?(0,u.ZP)(new u.MS(m)):a&&void 0!==i&&e((0,S.av)(i))}).catch(e=>{throw(0,u.ZP)(new u.aE("Error loading user information")),Error("Error loading user information",{cause:e})})}}},{useMercureCreateCookieMutation:k}=i(42125).api.enhanceEndpoints({addTagTypes:["Mercure"]}).injectEndpoints({endpoints:e=>({mercureCreateCookie:e.mutation({query:()=>({url:"/pimcore-studio/api/mercure/auth",method:"POST"}),invalidatesTags:["Mercure"]})}),overrideExisting:!1});var y=i(27539),w=i(8178);let E=()=>{let e=(0,f.useAppDispatch)();return{loadSettings:async()=>{e(w.hi.endpoints.systemSettingsGet.initiate()).then(t=>{let{data:i,isSuccess:a,isError:n,error:m}=t;n&&(0,u.ZP)(new u.MS(m)),a&&void 0!==i&&e((0,y.I)(i))}).catch(()=>{})}}};var G=i(64435),P=i(60552);let z=e=>{let[t,i]=(0,n.useState)(!0),m=(0,s.s)(),{modal:p}=r.App.useApp();$.E.setModalInstance(m),P.U.setModalInstance(p);let{isAuthenticated:g}=(0,c.k)(),{loadPublicTranslations:d,loadTranslations:h}=L(),{loadUser:X}=v(),[u]=k(),{loadSettings:b}=E(),{loadPerspective:f}=(0,G.o)();async function M(){let e=(0,S.HF)(o.h.getState()),t=String((null==e?void 0:e.activePerspective)??"studio_default_perspective");return await f(t)}return(0,n.useEffect)(()=>{(async()=>{i(()=>!0),void 0!==g&&(g||await Promise.all([d()]).then(()=>{i(()=>!1)}).catch(e=>{console.error("Error during login preparation",e)}),g&&(await Promise.all([X()]),await Promise.all([u(),h(),b(),M()]),i(()=>!1)))})()},[g]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(x,{}),t&&(0,a.jsx)(l.V,{loading:!0}),!t&&e.children]})};var D=i(44526),j=i(86207);let Z=()=>(0,a.jsx)(n.StrictMode,{children:(0,a.jsx)(j.Z,{children:(0,a.jsx)(p.R,{children:(0,a.jsx)(r.App,{children:(0,a.jsx)(D.z,{children:(0,a.jsx)(z,{children:(0,a.jsx)(g.RouterProvider,{router:d.Nd})})})})})})});function _(){let e=document.getElementById("app");if(null===e)return void(0,u.ZP)(new u.aE("Root element not found"));(0,m.createRoot)(e).render((0,a.jsx)(Z,{}))}},11918:function(e,t,i){i.a(e,async function(a,n){try{i.r(t),i(98713);var m=i(36514),p=i(55620),r=i(80452),g=i(69984);e=i.hmd(e),void 0!==e.hot&&e.hot.accept(),window.Pimcore=(await Promise.resolve().then(i.bind(i,80452))).Pimcore,window.PimcoreStudio=r.PimcoreStudio,window.addEventListener("load",async()=>{await p.p.loadPlugins(),p.p.initPlugins(),p.p.startupPlugins(),g._.initModules(),(0,m.m)()}),n()}catch(e){n(e)}},1)}}]);
>>>>>>>> origin/1.x:public/build/02b5e332-46d3-4d37-81a3-440c3403d8ef/static/js/async/__federation_expose__internal___mf_bootstrap.a35c205e.js
