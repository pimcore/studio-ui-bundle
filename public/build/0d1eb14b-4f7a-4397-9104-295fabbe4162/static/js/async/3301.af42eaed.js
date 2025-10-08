/*! For license information please see 3301.af42eaed.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["3301"],{12621:function(e,i,n){n.d(i,{Cf:()=>s,FI:()=>c,PA:()=>d,UH:()=>r,qw:()=>u});var t=n(40483),l=n(73288);let o=(0,l.createSlice)({name:"document-editor",initialState:{documentAreablocks:{}},reducers:{setDocumentAreablockTypes:(e,i)=>{e.documentAreablocks[i.payload.documentId]=i.payload.areablockTypes},removeDocument:(e,i)=>{let n=i.payload;if(void 0!==e.documentAreablocks[n]){let{[n]:i,...t}=e.documentAreablocks;e.documentAreablocks=t}},clearAllDocuments:e=>{e.documentAreablocks={}}}}),{setDocumentAreablockTypes:r,removeDocument:s,clearAllDocuments:a}=o.actions,d=e=>e["document-editor"],c=(0,l.createSelector)([d,(e,i)=>i],(e,i)=>e.documentAreablocks[i]??{}),u=(0,l.createSelector)([c],e=>Object.keys(e).length>0);(0,l.createSelector)([c],e=>Object.values(e).flat()),o.reducer,(0,t.injectSliceWithState)(o)},25937:function(e,i,n){n.d(i,{n:()=>d});var t=n(81004),l=n(46309),o=n(66858),r=n(23002),s=n(81422),a=n(12621);let d=()=>{let e=(0,t.useContext)(o.R),{document:i}=(0,r.Z)(e.id),n=(0,l.CG)(a.PA),d=(0,s.W)(null==i?void 0:i.type);return(0,t.useMemo)(()=>d.getVisibleEntries(e),[d,e,n])}},45096:function(e,i,n){n.d(i,{b:()=>a});var t=n(81004),l=n(53478),o=n(35015),r=n(61251),s=n(23646);let a=e=>{let{versionId:i,isSkip:n=!1}=e,{id:a}=(0,o.i)(),{data:d,isLoading:c}=(0,s.Bs)({id:a},{skip:n}),[u,p]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(0,l.isEmpty)(d)||p(`${r.G}${null==d?void 0:d.fullPath}?pimcore_version=${i}`)},[i,d]),{isLoading:c,url:u}}},81422:function(e,i,n){n.d(i,{W:()=>l});var t=n(80380);let l=e=>t.nC.get((e=>{let i=e.charAt(0).toUpperCase()+e.slice(1);return`Document/Editor/Sidebar/${i}SidebarManager`})(e??"page"))},97455:function(e,i,n){n.d(i,{G:()=>r});var t=n(28395),l=n(5554),o=n(60476);class r extends l.A{constructor(){super(),this.type="email"}}r=(0,t.gn)([(0,o.injectable)(),(0,t.w6)("design:type",Function),(0,t.w6)("design:paramtypes",[])],r)},72404:function(e,i,n){n.d(i,{i:()=>r});var t=n(28395),l=n(5554),o=n(60476);class r extends l.A{constructor(){super(),this.type="hardlink"}}r=(0,t.gn)([(0,o.injectable)(),(0,t.w6)("design:type",Function),(0,t.w6)("design:paramtypes",[])],r)},55989:function(e,i,n){n.d(i,{m:()=>r});var t=n(28395),l=n(5554),o=n(60476);class r extends l.A{constructor(){super(),this.type="link"}}r=(0,t.gn)([(0,o.injectable)(),(0,t.w6)("design:type",Function),(0,t.w6)("design:paramtypes",[])],r)},47622:function(e,i,n){n.d(i,{M:()=>r});var t=n(28395),l=n(5554),o=n(60476);class r extends l.A{constructor(){super(),this.type="page"}}r=(0,t.gn)([(0,o.injectable)(),(0,t.w6)("design:type",Function),(0,t.w6)("design:paramtypes",[])],r)},1085:function(e,i,n){n.d(i,{t:()=>r});var t=n(28395),l=n(5554),o=n(60476);class r extends l.A{constructor(){super(),this.type="snippet"}}r=(0,t.gn)([(0,o.injectable)(),(0,t.w6)("design:type",Function),(0,t.w6)("design:paramtypes",[])],r)},22576:function(e,i,n){n.d(i,{$:()=>l});var t=n(10303);let l=function(e){let i=!(arguments.length>1)||void 0===arguments[1]||arguments[1],n=new URL(e,window.location.origin);i&&(n.searchParams.set("pimcore_preview","true"),n.searchParams.set("pimcore_studio_preview","true"));let l=n.toString();return i?(0,t.r)(l,"_dc"):l}},78245:function(e,i,n){n.d(i,{y:()=>t});let t=(0,n(29202).createStyles)(e=>{let{token:i,css:n}=e;return{headerContainer:n`
      position: sticky;
      top: 0;
      width: 100%;
      z-index: 999999999;
      
      &::before {
        content: '';
        position: absolute;
        top: -15px;
        bottom: 0;
        width: 100%;
        height: 20px;
        background-color: #fff;
        z-index: -1;
      }
    `,headerItem:n`
      flex: 1 1 50%;
      padding: ${i.paddingXS}px;
      background-color: ${i.Table.headerBg};
      border: 0.5px solid ${i.Table.colorBorderSecondary};
      border-top-width: 0;
      box-shadow: 0 2px 4px 0 rgba(35, 11, 100, .2);
      
      &:first-child {
        border-right: 0;
      }

      &:last-child {
        border-left: 0;
      }

      &:only-child {
        flex: 1 1 100%;
        border-right: 0.5px;
        border-left: 0.5px;
      }
    `,content:n`
      position: relative;
      min-width: 220px;
    `,emptyState:n`
      margin-top: 40px;
      max-width: 200px;
      text-align: center;
    `,switchContainer:n`
      position: absolute;
      top: 10px;
      right: ${i.paddingXS}px;
      z-index: 1;
    `}})},16939:function(e,i,n){n.d(i,{N:()=>x});var t=n(85893),l=n(71695),o=n(37603),r=n(81004),s=n(62588),a=n(23526),d=n(46309),c=n(42839),u=n(53478),p=n(51469),h=n(24861),v=n(81343),m=n(22576);let x=()=>{let{t:e}=(0,l.useTranslation)(),[i,n]=(0,r.useState)(!1),x=(0,d.TL)(),{isTreeActionAllowed:g}=(0,h._)(),f=async(e,i,t)=>{n(!0);let{data:l,error:o}=await x(c.hi.endpoints.documentGetById.initiate({id:e}));if((0,u.isUndefined)(o)||((0,v.ZP)(new v.MS(o)),n(!1)),((0,u.isNil)(null==t?void 0:t.preview)||!(null==t?void 0:t.preview))&&!(0,u.isNil)(null==l?void 0:l.settingsData)&&(0,u.has)(null==l?void 0:l.settingsData,"url")&&(0,u.isString)(null==l?void 0:l.settingsData.url)){let e=l.settingsData.url;window.open(e),null==i||i()}else(0,u.isNil)(null==l?void 0:l.fullPath)?console.error("Failed to fetch document data",l):(window.open((0,m.$)(l.fullPath,!!(null==t?void 0:t.preview))),null==i||i());n(!1)},w=(e,i)=>!(0,s.x)(e.permissions,"view")||((0,u.isNil)(null==i?void 0:i.preview)||!(null==i?void 0:i.preview))&&["snippet","newsletter","folder","link","hardlink","email"].includes(e.type)||!(0,u.isNil)(null==i?void 0:i.preview)&&i.preview&&["folder","link","hardlink"].includes(e.type);return{openInNewWindow:f,openInNewWindowTreeContextMenuItem:i=>({label:e("document.open-in-new-window"),key:a.N.openInNewWindow,icon:(0,t.jsx)(o.J,{value:"share"}),hidden:"page"!==i.type||!(0,s.x)(i.permissions,"view")||!g(p.W.Open),onClick:async()=>{await f(parseInt(i.id))}}),openInNewWindowContextMenuItem:(n,l)=>({label:e("document.open-in-new-window"),key:a.N.openInNewWindow,isLoading:i,icon:(0,t.jsx)(o.J,{value:"share"}),hidden:w(n),onClick:async()=>{await f(n.id,l)}}),openPreviewInNewWindowContextMenuItem:(n,l)=>({label:e("document.open-preview-in-new-window"),key:a.N.openPreviewInNewWindow,isLoading:i,icon:(0,t.jsx)(o.J,{value:"eye"}),hidden:w(n,{preview:!0}),onClick:async()=>{await f(n.id,l,{preview:!0})}})}}},10962:function(e,i,n){n.d(i,{O:()=>u,R:()=>s.SaveTaskType});var t=n(81004),l=n(53478),o=n(66858),r=n(23002),s=n(13221),a=n(62002),d=n(40483),c=n(94374);let u=()=>{let{id:e}=(0,t.useContext)(o.R),{document:i}=(0,r.Z)(e),n=(0,d.useAppDispatch)(),[u,p]=(0,t.useState)(!1),[h,v]=(0,t.useState)(!1),[m,x]=(0,t.useState)(!1),[g,f]=(0,t.useState)();return{save:async(t,l)=>{if((null==i?void 0:i.changes)!==void 0)try{var o,r,d;if(p(!0),x(!1),f(void 0),v(!1),await a.lF.saveDocument(e,t),t!==s.SaveTaskType.AutoSave&&(null==i||null==(o=i.changes)?void 0:o.properties)){let t=!!(null==i||null==(d=i.properties)||null==(r=d.find(e=>"navigation_exclude"===e.key))?void 0:r.data);n((0,c.KO)({nodeId:String(e),navigationExclude:t}))}v(!0),null==l||l()}catch(e){throw console.error("Save failed:",e),x(!0),f(e),e}finally{p(!1)}},debouncedAutoSave:(0,t.useCallback)((0,l.debounce)(()=>{a.lF.saveDocument(e,s.SaveTaskType.AutoSave).catch(console.error)},500),[e]),isLoading:u,isSuccess:h,isError:m,error:g}}},15504:function(e,i,n){n.d(i,{V2:()=>L,kw:()=>O,vr:()=>Z});var t=n(85893),l=n(81004),o=n.n(l),r=n(37603),s=n(66858),a=n(23002),d=n(71695),c=n(51139),u=n(42801),p=n(53478),h=n(10303),v=n(25202),m=n(78699),x=n(81422),g=n(25937),f=n(46309),w=n(12621),b=n(80087),j=n(44780),y=n(98550),k=n(91893),C=n(25326);let S=()=>{let{t:e}=(0,d.useTranslation)(),{deleteDraft:i,isLoading:n,buttonText:o}=(0,C._)("document"),{id:c}=(0,l.useContext)(s.R),{document:u}=(0,a.Z)(c);if((0,p.isNil)(u))return(0,t.jsx)(t.Fragment,{});let h=null==u?void 0:u.draftData;if((0,p.isNil)(h)||u.changes[k.hD])return(0,t.jsx)(t.Fragment,{});let v=(0,t.jsx)(y.z,{danger:!0,ghost:!0,loading:n,onClick:i,size:"small",children:o});return(0,t.jsx)(j.x,{padding:"extra-small",children:(0,t.jsx)(b.b,{action:v,icon:(0,t.jsx)(r.J,{value:"draft"}),message:e(h.isAutoSave?"draft-alert-auto-save":"draft-alert"),showIcon:!0,type:"info"})})};var N=n(67459),$=n(52309),I=n(36386),T=n(51776),D=n(78245),F=n(84104);let A=e=>{let{versionsIdList:i,versionUrl:n}=e,{t:o}=(0,d.useTranslation)(),{styles:r}=(0,D.y)(),{height:s}=(0,T.Z)(F.w),a=(0,l.useRef)(null);return(0,l.useEffect)(()=>{(0,p.isNull)(n)||(0,p.isNull)(a.current)||a.current.reload()},[n]),(0,t.jsxs)($.k,{style:{height:s,minWidth:"100%"},vertical:!0,children:[(0,t.jsx)($.k,{className:r.headerContainer,wrap:"wrap",children:i.map((e,i)=>(0,t.jsx)($.k,{className:r.headerItem,children:(0,t.jsxs)(I.x,{children:[o("version.version")," ",e]})},`${i}-${e}`))}),(0,t.jsx)($.k,{className:r.content,flex:1,children:!(0,p.isNull)(n)&&(0,t.jsx)(c.h,{ref:a,src:n})})]})};var B=n(30225),P=n(61251),_=n(45096),E=n(62368),V=n(35015),z=n(35621),M=n(22576);let R=e=>{var i,n;let{id:r}=e,{t:s}=(0,d.useTranslation)(),[u,h]=(0,l.useState)(Date.now()),{document:v}=(0,a.Z)(r),m=o().useRef(null),x=(0,z.Z)(null==(i=m.current)?void 0:i.getElementRef(),!0);(0,l.useEffect)(()=>{x&&h(Date.now())},[null==v||null==(n=v.draftData)?void 0:n.modificationDate,x]);let g=(0,l.useMemo)(()=>(0,p.isNil)(null==v?void 0:v.fullPath)?"":(0,M.$)(v.fullPath),[null==v?void 0:v.fullPath,u]);return""===g||(0,p.isNil)(v)?(0,t.jsx)("div",{children:s("preview.label")}):(0,t.jsx)(c.h,{ref:m,src:g,title:`${s("preview.label")}-${r}`})};var W=n(62588);let Z={key:"edit",label:"edit.label",children:(0,t.jsx)(()=>{let{id:e}=(0,l.useContext)(s.R),{document:i}=(0,a.Z)(e),{t:n}=(0,d.useTranslation)(),r=(0,l.useRef)(null),b=(0,f.TL)(),j=(0,x.W)(null==i?void 0:i.type).getButtons(),y=(0,g.n)(),k=(0,l.useCallback)(()=>{var i;let n=null==(i=r.current)?void 0:i.getIframeElement();if(!(0,p.isNil)(n))try{let{document:i}=(0,u.sH)();i.registerIframe(e,n,r)}catch(e){console.warn("Could not register iframe:",e)}},[e]),C=(0,l.useMemo)(()=>(0,h.r)(`${null==i?void 0:i.fullPath}?pimcore_editmode=true&pimcore_studio=true&documentId=${e}`),[null==i?void 0:i.fullPath,e]);return o().useEffect(()=>()=>{try{let{document:i}=(0,u.sH)();i.unregisterIframe(e)}catch(e){console.warn("Could not unregister iframe:",e)}b((0,w.Cf)(e))},[e,b]),(0,t.jsx)(m.D,{renderSidebar:y.length>0?(0,t.jsx)(v.Y,{buttons:j,entries:y,sizing:"medium",translateTooltips:!0}):void 0,renderTopBar:(0,t.jsx)(S,{}),children:(0,t.jsx)(c.h,{onLoad:k,preserveScrollOnReload:!0,ref:r,src:C,title:`${n("edit.label")}-${e}`,useExternalReadyState:!0})})},{}),icon:(0,t.jsx)(r.J,{value:"edit-pen"}),isDetachable:!1,hidden:e=>!(0,W.x)(e.permissions,"save")&&!(0,W.x)(e.permissions,"publish")},L={key:"versions",label:"version.label",children:(0,t.jsx)(N.e,{ComparisonViewComponent:e=>{var i,n;let{versionIds:o}=e,[r,s]=(0,l.useState)(null),a=o.map(e=>e.count),d=null==o||null==(i=o[0])?void 0:i.id,c=null==o||null==(n=o[1])?void 0:n.id,{url:u}=(0,_.b)({versionId:d});return(0,l.useEffect)(()=>{(0,B.O)(c)?s(u):s(`${P.G}/pimcore-studio/api/documents/diff-versions/from/${d}/to/${c}`)},[o,u]),(0,t.jsx)(A,{versionUrl:r,versionsIdList:a})},SingleViewComponent:e=>{let{versionId:i}=e,{isLoading:n,url:l}=(0,_.b)({versionId:i.id});return n?(0,t.jsx)(E.V,{fullPage:!0,loading:!0}):(0,t.jsx)(A,{versionUrl:l,versionsIdList:[i.count]})}}),icon:(0,t.jsx)(r.J,{value:"history"}),isDetachable:!0,hidden:e=>!(0,W.x)(e.permissions,"versions")},O={key:"preview",label:"preview.label",children:(0,t.jsx)(()=>{let{id:e}=(0,V.i)(),{id:i}=(0,l.useContext)(s.R),{document:n}=(0,a.Z)(i);if(!(!(0,W.x)(null==n?void 0:n.permissions,"save")&&!(0,W.x)(null==n?void 0:n.permissions,"publish")))return(0,t.jsx)(R,{id:e});let o=(0,x.W)(null==n?void 0:n.type).getButtons(),r=(0,g.n)();return(0,t.jsx)(m.D,{renderSidebar:r.length>0?(0,t.jsx)(v.Y,{buttons:o,entries:r,sizing:"medium",translateTooltips:!0}):void 0,children:(0,t.jsx)(R,{id:e})})},{}),icon:(0,t.jsx)(r.J,{value:"preview"}),isDetachable:!0}},66472:function(e,i,n){n.d(i,{K:()=>u});var t=n(85893);n(81004);var l=n(9622),o=n(23002),r=n(71695),s=n(5750),a=n(46309),d=n(66858),c=n(7594);let u={name:"document-editor",component:e=>(0,t.jsx)(c.OR,{component:c.O8.document.editor.container.name,props:e}),titleComponent:e=>{let{node:i}=e,{document:n}=(0,o.Z)(i.getConfig().id),{t:s}=(0,r.useTranslation)(),a=i.getName();return i.getName=()=>(null==n?void 0:n.parentId)===0?s("home"):(null==n?void 0:n.key)??a,(0,t.jsx)(l.X,{modified:(null==n?void 0:n.modified)??!1,node:i})},defaultGlobalContext:!1,isModified:e=>{let i=e.getConfig(),n=(0,s.yI)(a.h.getState(),i.id);return(null==n?void 0:n.modified)??!1},getContextProvider:(e,i)=>{let n=e.config;return(0,t.jsx)(d.p,{id:n.id,children:i})}}},67459:function(e,i,n){n.d(i,{e:()=>a});var t=n(85893);n(81004);var l=n(2433),o=n(84104),r=n(62368),s=n(35015);let a=e=>{let{SingleViewComponent:i,ComparisonViewComponent:n}=e,{id:a,elementType:d}=(0,s.i)(),{isLoading:c,data:u}=(0,l.KD)({id:a,elementType:d,page:1,pageSize:9999});return c?(0,t.jsx)(r.V,{loading:!0}):(0,t.jsx)(o.c,{ComparisonViewComponent:n,SingleViewComponent:i,versions:u.items})}},84104:function(e,i,n){n.d(i,{w:()=>_,c:()=>E});var t=n(85893),l=n(81004),o=n(58793),r=n.n(o),s=n(71695),a=n(2433),d=n(98550),c=n(18243),u=n(71881),p=n(82141),h=n(41659),v=n(62368),m=n(21459),x=n(76513),g=n(52309),f=n(36386),w=n(53478),b=n(15391),j=n(26788),y=n(37603),k=n(83472),C=n(44780),S=n(38447),N=n(93383),$=n(70202),I=n(45096),T=n(81343),D=n(77244),F=n(29202);let A=(0,F.createStyles)(e=>{let{token:i,css:n}=e;return{versionTag:n`
      width: 56px;
      height: 22px;

      display: inline-grid;
      justify-content: center;

      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
    `,dateContainer:n`
      display: flex;
      align-items: center;
      margin-top: 2px;
      gap: 4px;
    `,dateIcon:n`
      color: ${i.Colors.Neutral.Icon.colorIcon};
    `,dateLabel:n`
      color: ${i.colorTextDescription};
    `}}),B=e=>{let{version:i,setDetailedVersions:n}=e,[o,r]=(0,l.useState)(null==i?void 0:i.note),[d,{isError:c,error:u}]=(0,a.Rl)(),[h,{isLoading:v,isError:m,error:x}]=(0,a.z4)(),[j,{isLoading:C,isError:F,error:B}]=(0,a.y7)(),{t:P}=(0,s.useTranslation)(),{styles:_}=A(),E=i.published??!1,V=i.ctype===D.a.document,z=(0,w.isNil)(i.scheduled)?void 0:(0,b.o0)({timestamp:i.scheduled,dateStyle:"short",timeStyle:"short"}),{isLoading:M,url:R}=(0,I.b)({versionId:i.id,isSkip:!V}),W=async()=>{await h({id:i.id}),m&&(0,T.ZP)(new T.MS(x))},Z=async()=>{await j({id:i.id}),n([]),F&&(0,T.ZP)(new T.MS(B))},L=async()=>{await d({id:i.id,updateVersion:{note:o}}),c&&(0,T.ZP)(new T.MS(u))};return(0,t.jsxs)(g.k,{gap:"extra-small",vertical:!0,children:[(0,t.jsxs)(g.k,{align:"top",justify:"space-between",children:[(0,t.jsxs)(k.V,{className:_.versionTag,children:["ID: ",i.id]}),(0,t.jsxs)(S.T,{size:"mini",children:[!E&&(0,t.jsx)(p.W,{disabled:v||C,icon:{value:"published"},loading:v,onClick:W,children:P("version.publish")}),V&&(0,t.jsx)(N.h,{"aria-label":P("aria.version.delete"),icon:{value:"open-folder"},loading:M,onClick:()=>{(0,w.isNull)(R)||window.open(R,"_blank")},type:"default"}),(0,t.jsx)(N.h,{"aria-label":P("aria.version.delete"),disabled:v||C,icon:{value:"trash"},loading:C,onClick:Z,type:"default"})]})]}),!(0,w.isNil)(z)&&(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{children:P("version.schedule-for")}),(0,t.jsxs)("div",{className:_.dateContainer,children:[(0,t.jsx)(y.J,{className:_.dateIcon,value:"calendar"}),(0,t.jsx)(f.x,{className:_.dateLabel,children:z})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{children:P("version.note")}),(0,t.jsx)($.I,{onBlur:L,onChange:e=>{r(e.target.value)},onClick:e=>{e.stopPropagation()},placeholder:P("version.note.add"),value:o})]})]})},P=(0,F.createStyles)(e=>{let{token:i,css:n}=e,t={highlightBackgroundColor:"#F6FFED",highlightBorderColor:"#B7EB8F",highlightColor:"#52C41A",signalBackgroundColor:"#E6F4FF",signalBorderColor:"#91CAFF",signalColor:"#1677FF",...i};return{versions:n`
      .title-tag__own-draft {
        color: ${t.signalColor};
        border-color: ${t.signalBorderColor};
        background-color: ${t.signalBackgroundColor};
      }

      .title-tag__published {
        color: ${t.highlightColor};
        border-color: ${t.highlightBorderColor};
        background-color: ${t.highlightBackgroundColor};
      }

      .sub-title {
        font-weight: normal;
        margin-right: 4px;
        color: ${t.colorTextDescription};
      }

      .ant-tag {
        display: flex;
        align-items: center;
      }

      .ant-tag-geekblue {
        background-color: ${i.Colors.Base.Geekblue["2"]} !important;
        color: ${i.Colors.Base.Geekblue["6"]} !important;
        border-color: ${i.Colors.Base.Geekblue["3"]} !important;
      }
    `,compareButton:n`
      background-color: ${i.Colors.Neutral.Fill.colorFill} !important;
    `,notificationMessage:n`
      text-align: center;
      max-width: 200px;
    `}},{hashPriority:"low"}),_="versions_content_view",E=e=>{let{versions:i,SingleViewComponent:n,ComparisonViewComponent:o}=e,[S,N]=(0,l.useState)(!1),[$,I]=(0,l.useState)([]),[D,{isLoading:F,isError:A,error:E}]=(0,a.yK)(),{renderModal:V,showModal:z,handleOk:M}=(0,c.dd)({type:"warn"}),{t:R}=(0,s.useTranslation)(),{styles:W}=P(),Z=async()=>{M(),await D({elementType:i[0].ctype,id:i[0].cid}),A&&(0,T.ZP)(new T.MS(E))},L=e=>{let i=[...$],n=i.some(i=>i.id===e.id);2!==i.length||n||(i=[]),n?i.splice(i.indexOf(e),1):i.push(e),I(i)},O=i.map(e=>(e=>{let{version:i,detailedVersions:n,isComparingActive:l,selectVersion:o,setDetailedVersions:r}=e,a={id:i.id,count:i.versionCount},d=n.some(e=>e.id===i.id),c=i.published??!1,u=i.autosave??!1,p=d?"theme-primary":"theme-default";return{key:String(i.id),selected:d,title:(0,t.jsx)(()=>{let{t:e}=(0,s.useTranslation)();return(0,t.jsxs)("div",{children:[l&&(0,t.jsx)(C.x,{inline:!0,padding:{right:"extra-small"},children:(0,t.jsx)(j.Checkbox,{checked:d,onChange:()=>{o(a)}})}),(0,t.jsx)("span",{className:"title",children:`${e("version.version")} ${i.versionCount} | ${(0,b.o0)({timestamp:i.date,dateStyle:"short",timeStyle:"medium"})}`})]})},{}),subtitle:(0,t.jsx)(()=>{var e;let{t:n}=(0,s.useTranslation)();return(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"sub-title",children:`${n("by")} ${(null==(e=i.user)?void 0:e.name)??""}`}),(0,w.isNil)(i.autosave)&&i.autosave&&(0,t.jsx)(y.J,{value:"auto-save"})]})},{}),extra:(0,t.jsx)(()=>{let{t:e}=(0,s.useTranslation)();return c?(0,t.jsx)(k.V,{color:"success",iconName:"published",children:e("version.published")}):u?(0,t.jsx)(k.V,{color:"geekblue",iconName:"auto-save",children:e("version.autosaved")}):(0,t.jsx)(t.Fragment,{})},{}),children:(0,t.jsx)(B,{setDetailedVersions:r,version:i}),onClick:()=>{l?o(a):r([{id:i.id,count:i.versionCount}])},theme:c?"theme-success":p}})({version:e,detailedVersions:$,isComparingActive:S,selectVersion:L,setDetailedVersions:I})),G=0===i.length,J=0===$.length;return G?(0,t.jsxs)(v.V,{padded:!0,children:[(0,t.jsx)(h.h,{className:"p-l-mini",title:R("version.versions")}),(0,t.jsx)(v.V,{none:!0,noneOptions:{text:R("version.no-versions-to-show")}})]}):(0,t.jsx)(v.V,{className:W.versions,children:(0,t.jsx)(m.K,{leftItem:{size:25,minSize:415,children:(0,t.jsxs)(v.V,{padded:!0,children:[(0,t.jsx)(h.h,{title:R("version.versions"),children:!G&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(g.k,{className:"w-full",gap:"small",justify:"space-between",children:[(0,t.jsx)(d.z,{className:r()({[W.compareButton]:S}),onClick:()=>{I([]),N(!S)},children:R("version.compare-versions")},R("version.compare-versions")),(0,t.jsx)(p.W,{icon:{value:"trash"},loading:F,onClick:z,children:R("version.clear-unpublished")},R("version.clear-unpublished"))]}),(0,t.jsx)(V,{footer:(0,t.jsxs)(u.m,{children:[(0,t.jsx)(d.z,{onClick:Z,type:"primary",children:R("yes")}),(0,t.jsx)(d.z,{onClick:M,type:"default",children:R("no")})]}),title:R("version.clear-unpublished-versions"),children:(0,t.jsx)("span",{children:R("version.confirm-clear-unpublished")})})]})}),!G&&(0,t.jsx)(x.d,{items:O})]})},rightItem:{size:75,children:(0,t.jsx)(v.V,{centered:J,id:_,padded:!0,children:(0,t.jsxs)(g.k,{align:"center",children:[!J&&S&&(0,t.jsx)(o,{versionIds:$}),!J&&!S&&(0,t.jsx)(n,{setDetailedVersions:I,versionId:$[0],versions:i}),J&&(0,t.jsx)(f.x,{className:W.notificationMessage,children:R("version.preview-notification")})]})})}})})}}}]);