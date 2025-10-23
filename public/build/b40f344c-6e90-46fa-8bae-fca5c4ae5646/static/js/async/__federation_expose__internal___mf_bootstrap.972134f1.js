/*! For license information please see __federation_expose__internal___mf_bootstrap.972134f1.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["8785"],{8178:function(e,i,t){t.d(i,{LA:()=>n,d_:()=>r,hi:()=>m,wG:()=>p});var a=t(42125);let n=["Settings"],m=a.api.enhanceEndpoints({addTagTypes:n}).injectEndpoints({endpoints:e=>({systemSettingsGet:e.query({query:()=>({url:"/pimcore-studio/api/settings"}),providesTags:["Settings"]}),activeBundlesGet:e.query({query:()=>({url:"/pimcore-studio/api/settings/active-bundles"}),providesTags:["Settings"]})}),overrideExisting:!1}),{useSystemSettingsGetQuery:r,useActiveBundlesGetQuery:p}=m},11918:function(e,i,t){t.a(e,async function(a,n){try{t.r(i),t(3147);var m=t(55237),r=t(55620),p=t(80452),g=t(69984);e=t.hmd(e),void 0!==e.hot&&e.hot.accept(),window.Pimcore=(await Promise.resolve().then(t.bind(t,80452))).Pimcore,window.PimcoreStudio=p.PimcoreStudio,window.addEventListener("load",async()=>{await r.p.loadPlugins(),r.p.initPlugins(),r.p.startupPlugins(),g._.initModules(),(0,m.m)()}),n()}catch(e){n(e)}},1)},55237:function(e,i,t){t.d(i,{m:()=>H});var a=t(85893),n=t(81004),m=t(20745),r=t(13436),p=t(26788),g=t(20602),d=t(78712),o=t(46309),l=t(62368),s=t(29202);let h=(0,s.createGlobalStyle)`
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

  .makeTabsGreatAgain {
    position: absolute;
    inset: 0;
  }
`;var x=t(54409),c=t(44432),$=t(88308),u=t(71099),X=t(81343),b=t(11347),S=t(35316),f=t(40483),L=t(30683);let{useMercureCreateCookieMutation:v}=t(42125).api.enhanceEndpoints({addTagTypes:["Mercure"]}).injectEndpoints({endpoints:e=>({mercureCreateCookie:e.mutation({query:()=>({url:"/pimcore-studio/api/mercure/auth",method:"POST"}),invalidatesTags:["Mercure"]})}),overrideExisting:!1});var y=t(27539),M=t(8178),w=t(54246),k=t(63654),G=t(60552),E=t(35950),P=t(34769),z=t(8156),j=t(56232),D=t(53478),C=t(30225),R=t(80380),Z=t(79771),A=t(93464);let T=async()=>{if((0,E.y)(P.P.Reports)){let e="Reporting",i=R.nC.get(Z.j.mainNavRegistry),t=R.nC.get(Z.j.widgetManager);try{let a=await o.h.dispatch(j.hi.endpoints.customReportsGetTree.initiate({page:1,pageSize:999999})).unwrap();(0,D.isUndefined)(null==a?void 0:a.items)||(a.items.forEach((t,a)=>{if(t.menuShortcut){let n=t.name,m=(0,C.O)(t.niceName)?n:t.niceName,r=(0,C.O)(t.group)?`${e}/${n}`:`${e}/${t.group}/${n}`,p=t.iconClass,g=t.groupIconClass;i.registerMainNavItem({id:`${n}-${a}`,path:r,label:m,group:t.group,order:300+a,permission:P.P.Reports,perspectivePermission:z.Q.Reports,...!(0,C.O)(p)&&{icon:p},...!(0,C.O)(g)&&{groupIcon:g},widgetConfig:{component:"dynamic-report",config:{translationKey:"navigation.reports",icon:{type:"name",value:"pie-chart"},reportId:n}}})}}),t.registerWidget({name:"dynamic-report",component:A.$}))}catch(e){console.error("Failed to load reports for menu:",e)}}},_=e=>{let[i,t]=(0,n.useState)(!0),m=(0,x.s)(),{modal:r}=p.App.useApp();c.E.setModalInstance(m),G.U.setModalInstance(r);let{isAuthenticated:g}=(0,$.k)(),{loadPublicTranslations:d,loadTranslations:s}=(()=>{let[e]=(0,b.tj)();return{loadPublicTranslations:async()=>{await e({translation:{locale:u.L,keys:[],useFallback:!0}}).unwrap().then(e=>{u.Z.addResourceBundle(u.L,"translation",e.keys??[],!0,!0),u.Z.changeLanguage(u.L)}).catch(()=>{throw(0,X.ZP)(new X.aE("Error loading translations")),Error("Error loading translations")})},loadTranslations:async()=>{let i=(0,S.HF)(o.h.getState());await e({translation:{locale:i.language,keys:[],useFallback:!0}}).unwrap().then(e=>{u.Z.addResourceBundle(i.language,"translation",e.keys??[],!0,!0),u.Z.changeLanguage(i.language)}).catch(e=>{console.error("Error loading translations",e),(0,X.ZP)(new X.aE("Error loading translations"))})}}})(),{loadUser:E}=(()=>{let e=(0,f.useAppDispatch)();return{loadUser:async()=>{let i=e(L.hi.endpoints.userGetCurrentInformation.initiate());await i.then(i=>{let{data:t,isSuccess:a,isError:n,error:m}=i;n?(0,X.ZP)(new X.MS(m)):a&&void 0!==t&&e((0,S.av)(t))}).catch(e=>{throw(0,X.ZP)(new X.aE("Error loading user information")),Error("Error loading user information",{cause:e})})}}})(),[P]=v(),{loadSettings:z}=(()=>{let e=(0,f.useAppDispatch)();return{loadSettings:async()=>{e(M.hi.endpoints.systemSettingsGet.initiate()).then(i=>{let{data:t,isSuccess:a,isError:n,error:m}=i;n&&(0,X.ZP)(new X.MS(m)),a&&void 0!==t&&e((0,y.I)(t))}).catch(()=>{})}}})(),{loadAvailableLocales:j}={loadAvailableLocales:async()=>{try{await o.h.dispatch(w.hi.endpoints.translationGetAvailableLocales.initiate(void 0,{forceRefetch:!1,subscribe:!0})).unwrap()}catch(e){throw(0,X.ZP)(new X.aE("Error loading available locales")),e}}},{loadPerspective:D}=(0,k.o)();async function C(){let e=(0,S.HF)(o.h.getState()),i=String((null==e?void 0:e.activePerspective)??"studio_default_perspective");return await D(i)}return(0,n.useEffect)(()=>{(async()=>{t(()=>!0),void 0!==g&&(g||await Promise.all([d()]).then(()=>{t(()=>!1)}).catch(e=>{console.error("Error during login preparation",e)}),g&&(await Promise.all([E()]),await Promise.all([P(),s(),z(),j(),C(),T()]),t(()=>!1)))})()},[g]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(h,{}),i&&(0,a.jsx)(l.V,{loading:!0}),!i&&e.children]})};var I=t(91061),F=t(65980),U=t(14651),q=t(18605),B=t(74939);let N=()=>(0,a.jsx)(n.StrictMode,{children:(0,a.jsx)(F.Z,{children:(0,a.jsx)(r.R,{children:(0,a.jsx)(p.App,{children:(0,a.jsx)(B.a,{children:(0,a.jsxs)(U.$,{children:[(0,a.jsx)(q.i4,{}),(0,a.jsx)(I.z,{children:(0,a.jsx)(_,{children:(0,a.jsx)(g.RouterProvider,{router:d.Nd})})})]})})})})})});var O=t(7117);function H(){O.p.initialize(o.h);try{R.nC.get(Z.j.globalMessageBus).startGlobalSubscription()}catch(e){console.error("Failed to start global message bus subscription:",e)}let e=document.getElementById("app");if(null===e)return void(0,X.ZP)(new X.aE("Root element not found"));(0,m.createRoot)(e).render((0,a.jsx)(N,{}))}}}]);