/*! For license information please see __federation_expose__internal___mf_bootstrap.4a90ac4c.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["8785"],{8178:function(e,t,i){i.d(t,{LA:()=>n,d_:()=>r,hi:()=>m});var a=i(42125);let n=["Settings"],m=a.api.enhanceEndpoints({addTagTypes:n}).injectEndpoints({endpoints:e=>({systemSettingsGet:e.query({query:()=>({url:"/pimcore-studio/api/settings"}),providesTags:["Settings"]})}),overrideExisting:!1}),{useSystemSettingsGetQuery:r}=m},2818:function(e,t,i){i.d(t,{m:()=>R});var a=i(85893),n=i(81004),m=i(20745),r=i(80380),p=i(46309),g=i(53429),d=i(86346),o=i(14092),l=i(40779),h=i(48241);let x=e=>{let{children:t}=e;return(0,a.jsx)(r.jm,{children:(0,a.jsx)(d.f,{children:(0,a.jsx)(o.Provider,{store:p.h,children:(0,a.jsx)(g.DragAndDropContextProvider,{children:(0,a.jsx)(l.ElementSelectorProvider,{children:(0,a.jsx)(h.k,{children:t})})})})})})};var s=i(26788),$=i(20602),c=i(77444),X=i(77476),u=i(29202);let b=(0,u.createGlobalStyle)`
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

  .h-full {
    height: 100%;
  }

  .overflow-x-auto {
    overflow-x: auto;
  }
`;var S=i(62955),f=i(44432),L=i(67235),v=i(71099),k=i(55721),M=i(11347),y=i(35316);let w=()=>{let[e]=(0,M.tj)();return{loadPublicTranslations:async()=>{await e({translation:{locale:v.L,keys:[],useFallback:!0}}).unwrap().then(e=>{v.Z.addResourceBundle(v.L,"translation",e.keys??[],!0,!0),v.Z.changeLanguage(v.L)}).catch(()=>{throw(0,k.ZP)(new k.aE("Error loading translations")),Error("Error loading translations")})},loadTranslations:async()=>{let t=(0,y.HF)(p.h.getState());await e({translation:{locale:t.language,keys:[],useFallback:!0}}).unwrap().then(e=>{v.Z.addResourceBundle(t.language,"translation",e.keys??[],!0,!0),v.Z.changeLanguage(t.language)}).catch(e=>{console.error("Error loading translations",e),(0,k.ZP)(new k.aE("Error loading translations"))})}}};var E=i(40483),G=i(30683);let D=()=>{let e=(0,E.useAppDispatch)();return{loadUser:async()=>{let t=e(G.hi.endpoints.userGetCurrentInformation.initiate());await t.then(t=>{let{data:i,isSuccess:a,isError:n,error:m}=t;n?(0,k.ZP)(new k.MS(m)):a&&void 0!==i&&e((0,y.av)(i))}).catch(e=>{throw(0,k.ZP)(new k.aE("Error loading user information")),Error("Error loading user information",{cause:e})})}}},{useMercureCreateCookieMutation:j}=i(42125).api.enhanceEndpoints({addTagTypes:["Mercure"]}).injectEndpoints({endpoints:e=>({mercureCreateCookie:e.mutation({query:()=>({url:"/pimcore-studio/api/mercure/auth",method:"POST"}),invalidatesTags:["Mercure"]})}),overrideExisting:!1});var P=i(27539),z=i(8178);let Z=()=>{let e=(0,E.useAppDispatch)();return{loadSettings:async()=>{e(z.hi.endpoints.systemSettingsGet.initiate()).then(t=>{let{data:i,isSuccess:a,isError:n,error:m}=t;n&&(0,k.ZP)(new k.MS(m)),a&&void 0!==i&&e((0,P.I)(i))}).catch(()=>{})}}};var _=i(64435);let C=e=>{let[t,i]=(0,n.useState)(!0),m=(0,S.s)();f.E.setModalInstance(m);let{isAuthenticated:r}=(0,L.k)(),{loadPublicTranslations:g,loadTranslations:d}=w(),{loadUser:o}=D(),[l]=j(),{loadSettings:h}=Z(),{loadPerspective:x}=(0,_.o)();async function s(){let e=(0,y.HF)(p.h.getState()),t=String((null==e?void 0:e.activePerspective)??"studio_default_perspective");return await x(t)}return(0,n.useEffect)(()=>{(async()=>{i(()=>!0),void 0!==r&&(r||await Promise.all([g()]).then(()=>{i(()=>!1)}).catch(e=>{console.error("Error during login preparation",e)}),r&&(await Promise.all([o()]),await Promise.all([l(),d(),h(),s()]),i(()=>!1)))})()},[r]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(b,{}),t&&(0,a.jsx)(X.V,{loading:!0}),!t&&e.children]})};var T=i(44526),A=i(86207);let F=()=>(0,a.jsx)(n.StrictMode,{children:(0,a.jsx)(A.Z,{children:(0,a.jsx)(x,{children:(0,a.jsx)(s.App,{children:(0,a.jsx)(T.z,{children:(0,a.jsx)(C,{children:(0,a.jsx)($.RouterProvider,{router:c.Nd})})})})})})});function R(){let e=document.getElementById("app");if(null===e)return void(0,k.ZP)(new k.aE("Root element not found"));(0,m.createRoot)(e).render((0,a.jsx)(F,{}))}},11918:function(e,t,i){i.a(e,async function(a,n){try{i.r(t),i(3349);var m=i(2818),r=i(55620),p=i(69984);e=i.hmd(e),void 0!==e.hot&&e.hot.accept(),window.Pimcore=(await i.e("5402").then(i.bind(i,9836))).Pimcore,window.addEventListener("load",async()=>{await r.p.loadPlugins(),r.p.initPlugins(),r.p.startupPlugins(),p._.initModules(),(0,m.m)()}),n()}catch(e){n(e)}},1)}}]);