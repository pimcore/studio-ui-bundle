/*! For license information please see 3301.920964a1.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["3301"],{12621:function(e,n,i){i.d(n,{Cf:()=>s,FI:()=>c,PA:()=>d,UH:()=>r,qw:()=>u});var t=i(40483),l=i(73288);let o=(0,l.createSlice)({name:"document-editor",initialState:{documentAreablocks:{}},reducers:{setDocumentAreablockTypes:(e,n)=>{e.documentAreablocks[n.payload.documentId]=n.payload.areablockTypes},removeDocument:(e,n)=>{let i=n.payload;if(void 0!==e.documentAreablocks[i]){let{[i]:n,...t}=e.documentAreablocks;e.documentAreablocks=t}},clearAllDocuments:e=>{e.documentAreablocks={}}}}),{setDocumentAreablockTypes:r,removeDocument:s,clearAllDocuments:a}=o.actions,d=e=>e["document-editor"],c=(0,l.createSelector)([d,(e,n)=>n],(e,n)=>e.documentAreablocks[n]??{}),u=(0,l.createSelector)([c],e=>Object.keys(e).length>0);(0,l.createSelector)([c],e=>Object.values(e).flat()),o.reducer,(0,t.injectSliceWithState)(o)},25937:function(e,n,i){i.d(n,{n:()=>d});var t=i(81004),l=i(46309),o=i(66858),r=i(23002),s=i(81422),a=i(12621);let d=()=>{let e=(0,t.useContext)(o.R),{document:n}=(0,r.Z)(e.id),i=(0,l.CG)(a.PA),d=(0,s.W)(null==n?void 0:n.type);return(0,t.useMemo)(()=>d.getVisibleEntries(e),[d,e,i])}},45096:function(e,n,i){i.d(n,{b:()=>a});var t=i(81004),l=i(53478),o=i(35015),r=i(61251),s=i(23646);let a=e=>{let{versionId:n,isSkip:i=!1}=e,{id:a}=(0,o.i)(),{data:d,isLoading:c}=(0,s.Bs)({id:a},{skip:i}),[u,p]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(0,l.isEmpty)(d)||p(`${r.G}${null==d?void 0:d.fullPath}?pimcore_version=${n}`)},[n,d]),{isLoading:c,url:u}}},81422:function(e,n,i){i.d(n,{W:()=>l});var t=i(80380);let l=e=>t.nC.get((e=>{let n=e.charAt(0).toUpperCase()+e.slice(1);return`Document/Editor/Sidebar/${n}SidebarManager`})(e??"page"))},97455:function(e,n,i){i.d(n,{G:()=>r});var t=i(28395),l=i(5554),o=i(60476);class r extends l.A{constructor(){super(),this.type="email"}}r=(0,t.gn)([(0,o.injectable)(),(0,t.w6)("design:type",Function),(0,t.w6)("design:paramtypes",[])],r)},72404:function(e,n,i){i.d(n,{i:()=>r});var t=i(28395),l=i(5554),o=i(60476);class r extends l.A{constructor(){super(),this.type="hardlink"}}r=(0,t.gn)([(0,o.injectable)(),(0,t.w6)("design:type",Function),(0,t.w6)("design:paramtypes",[])],r)},55989:function(e,n,i){i.d(n,{m:()=>r});var t=i(28395),l=i(5554),o=i(60476);class r extends l.A{constructor(){super(),this.type="link"}}r=(0,t.gn)([(0,o.injectable)(),(0,t.w6)("design:type",Function),(0,t.w6)("design:paramtypes",[])],r)},47622:function(e,n,i){i.d(n,{M:()=>r});var t=i(28395),l=i(5554),o=i(60476);class r extends l.A{constructor(){super(),this.type="page"}}r=(0,t.gn)([(0,o.injectable)(),(0,t.w6)("design:type",Function),(0,t.w6)("design:paramtypes",[])],r)},1085:function(e,n,i){i.d(n,{t:()=>r});var t=i(28395),l=i(5554),o=i(60476);class r extends l.A{constructor(){super(),this.type="snippet"}}r=(0,t.gn)([(0,o.injectable)(),(0,t.w6)("design:type",Function),(0,t.w6)("design:paramtypes",[])],r)},22576:function(e,n,i){i.d(n,{$:()=>l});var t=i(10303);let l=function(e){let n=!(arguments.length>1)||void 0===arguments[1]||arguments[1],i=new URL(e,window.location.origin);n&&(i.searchParams.set("pimcore_preview","true"),i.searchParams.set("pimcore_studio_preview","true"));let l=i.toString();return n?(0,t.r)(l,"_dc"):l}},78245:function(e,n,i){i.d(n,{y:()=>t});let t=(0,i(29202).createStyles)(e=>{let{token:n,css:i}=e;return{headerContainer:i`
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
    `,headerItem:i`
      flex: 1 1 50%;
      padding: ${n.paddingXS}px;
      background-color: ${n.Table.headerBg};
      border: 0.5px solid ${n.Table.colorBorderSecondary};
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
    `,content:i`
      position: relative;
      min-width: 220px;
    `,emptyState:i`
      margin-top: 40px;
      max-width: 200px;
      text-align: center;
    `,switchContainer:i`
      position: absolute;
      top: 10px;
      right: ${n.paddingXS}px;
      z-index: 1;
    `}})},16939:function(e,n,i){i.d(n,{N:()=>x});var t=i(85893),l=i(71695),o=i(37603),r=i(81004),s=i(62588),a=i(23526),d=i(46309),c=i(42839),u=i(53478),p=i(51469),h=i(24861),v=i(81343),m=i(22576);let x=()=>{let{t:e}=(0,l.useTranslation)(),[n,i]=(0,r.useState)(!1),x=(0,d.TL)(),{isTreeActionAllowed:g}=(0,h._)(),f=async(e,n,t)=>{i(!0);let{data:l,error:o}=await x(c.hi.endpoints.documentGetById.initiate({id:e}));if((0,u.isUndefined)(o)||((0,v.ZP)(new v.MS(o)),i(!1)),((0,u.isNil)(null==t?void 0:t.preview)||!(null==t?void 0:t.preview))&&!(0,u.isNil)(null==l?void 0:l.settingsData)&&(0,u.has)(null==l?void 0:l.settingsData,"url")&&(0,u.isString)(null==l?void 0:l.settingsData.url)){let e=l.settingsData.url;window.open(e),null==n||n()}else(0,u.isNil)(null==l?void 0:l.fullPath)?console.error("Failed to fetch document data",l):(window.open((0,m.$)(l.fullPath,!!(null==t?void 0:t.preview))),null==n||n());i(!1)},w=(e,n)=>!(0,s.x)(e.permissions,"view")||((0,u.isNil)(null==n?void 0:n.preview)||!(null==n?void 0:n.preview))&&["snippet","newsletter","folder","link","hardlink","email"].includes(e.type)||!(0,u.isNil)(null==n?void 0:n.preview)&&n.preview&&["folder","link","hardlink"].includes(e.type);return{openInNewWindow:f,openInNewWindowTreeContextMenuItem:n=>({label:e("document.open-in-new-window"),key:a.N.openInNewWindow,icon:(0,t.jsx)(o.J,{value:"share"}),hidden:"page"!==n.type||!(0,s.x)(n.permissions,"view")||!g(p.W.Open),onClick:async()=>{await f(parseInt(n.id))}}),openInNewWindowContextMenuItem:(i,l)=>({label:e("document.open-in-new-window"),key:a.N.openInNewWindow,isLoading:n,icon:(0,t.jsx)(o.J,{value:"share"}),hidden:w(i),onClick:async()=>{await f(i.id,l)}}),openPreviewInNewWindowContextMenuItem:(i,l)=>({label:e("document.open-preview-in-new-window"),key:a.N.openPreviewInNewWindow,isLoading:n,icon:(0,t.jsx)(o.J,{value:"eye"}),hidden:w(i,{preview:!0}),onClick:async()=>{await f(i.id,l,{preview:!0})}})}}},10962:function(e,n,i){i.d(n,{O:()=>u,R:()=>s.SaveTaskType});var t=i(81004),l=i(53478),o=i(66858),r=i(23002),s=i(13221),a=i(62002),d=i(40483),c=i(94374);let u=()=>{let{id:e}=(0,t.useContext)(o.R),{document:n}=(0,r.Z)(e),i=(0,d.useAppDispatch)(),[u,p]=(0,t.useState)(!1),[h,v]=(0,t.useState)(!1),[m,x]=(0,t.useState)(!1),[g,f]=(0,t.useState)();return{save:async(t,l)=>{if((null==n?void 0:n.changes)!==void 0)try{var o,r,d;if(p(!0),x(!1),f(void 0),v(!1),await a.lF.saveDocument(e,t),t!==s.SaveTaskType.AutoSave&&(null==n||null==(o=n.changes)?void 0:o.properties)){let t=!!(null==n||null==(d=n.properties)||null==(r=d.find(e=>"navigation_exclude"===e.key))?void 0:r.data);i((0,c.KO)({nodeId:String(e),navigationExclude:t}))}v(!0),null==l||l()}catch(e){throw console.error("Save failed:",e),x(!0),f(e),e}finally{p(!1)}},debouncedAutoSave:(0,t.useCallback)((0,l.debounce)(()=>{a.lF.saveDocument(e,s.SaveTaskType.AutoSave).catch(console.error)},500),[e]),isLoading:u,isSuccess:h,isError:m,error:g}}},15504:function(e,n,i){i.d(n,{V2:()=>L,kw:()=>O,vr:()=>Z});var t=i(85893),l=i(81004),o=i.n(l),r=i(37603),s=i(66858),a=i(23002),d=i(71695),c=i(51139),u=i(42801),p=i(53478),h=i(10303),v=i(25202),m=i(78699),x=i(81422),g=i(25937),f=i(46309),w=i(12621),b=i(80087),j=i(44780),y=i(98550),k=i(91893),C=i(25326);let S=()=>{let{t:e}=(0,d.useTranslation)(),{deleteDraft:n,isLoading:i,buttonText:o}=(0,C._)("document"),{id:c}=(0,l.useContext)(s.R),{document:u}=(0,a.Z)(c);if((0,p.isNil)(u))return(0,t.jsx)(t.Fragment,{});let h=null==u?void 0:u.draftData;if((0,p.isNil)(h)||u.changes[k.hD])return(0,t.jsx)(t.Fragment,{});let v=(0,t.jsx)(y.z,{danger:!0,ghost:!0,loading:i,onClick:n,size:"small",children:o});return(0,t.jsx)(j.x,{padding:"extra-small",children:(0,t.jsx)(b.b,{action:v,icon:(0,t.jsx)(r.J,{value:"draft"}),message:e(h.isAutoSave?"draft-alert-auto-save":"draft-alert"),showIcon:!0,type:"info"})})};var N=i(67459),$=i(52309),I=i(36386),T=i(51776),D=i(78245),F=i(84104);let A=e=>{let{versionsIdList:n,versionUrl:i}=e,{t:o}=(0,d.useTranslation)(),{styles:r}=(0,D.y)(),{height:s}=(0,T.Z)(F.w),a=(0,l.useRef)(null);return(0,l.useEffect)(()=>{(0,p.isNull)(i)||(0,p.isNull)(a.current)||a.current.reload()},[i]),(0,t.jsxs)($.k,{style:{height:s,minWidth:"100%"},vertical:!0,children:[(0,t.jsx)($.k,{className:r.headerContainer,wrap:"wrap",children:n.map((e,n)=>(0,t.jsx)($.k,{className:r.headerItem,children:(0,t.jsxs)(I.x,{children:[o("version.version")," ",e]})},`${n}-${e}`))}),(0,t.jsx)($.k,{className:r.content,flex:1,children:!(0,p.isNull)(i)&&(0,t.jsx)(c.h,{ref:a,src:i})})]})};var P=i(30225),_=i(61251),B=i(45096),E=i(62368),V=i(35015),M=i(35621),z=i(22576);let R=e=>{var n,i;let{id:r}=e,{t:s}=(0,d.useTranslation)(),[u,h]=(0,l.useState)(Date.now()),{document:v}=(0,a.Z)(r),m=o().useRef(null),x=(0,M.Z)(null==(n=m.current)?void 0:n.getElementRef(),!0);(0,l.useEffect)(()=>{x&&h(Date.now())},[null==v||null==(i=v.draftData)?void 0:i.modificationDate,x]);let g=(0,l.useMemo)(()=>(0,p.isNil)(null==v?void 0:v.fullPath)?"":(0,z.$)(v.fullPath),[null==v?void 0:v.fullPath,u]);return""===g||(0,p.isNil)(v)?(0,t.jsx)("div",{children:s("preview.label")}):(0,t.jsx)(c.h,{ref:m,src:g,title:`${s("preview.label")}-${r}`})};var W=i(62588);let Z={key:"edit",label:"edit.label",children:(0,t.jsx)(()=>{let{id:e}=(0,l.useContext)(s.R),{document:n}=(0,a.Z)(e),{t:i}=(0,d.useTranslation)(),r=(0,l.useRef)(null),b=(0,f.TL)(),j=(0,x.W)(null==n?void 0:n.type).getButtons(),y=(0,g.n)(),k=(0,l.useCallback)(()=>{var n;let i=null==(n=r.current)?void 0:n.getIframeElement();if(!(0,p.isNil)(i))try{let{document:n}=(0,u.sH)();n.registerIframe(e,i,r)}catch(e){console.warn("Could not register iframe:",e)}},[e]),C=(0,l.useMemo)(()=>(0,h.r)(`${null==n?void 0:n.fullPath}?pimcore_editmode=true&pimcore_studio=true&documentId=${e}`),[null==n?void 0:n.fullPath,e]);return o().useEffect(()=>()=>{try{let{document:n}=(0,u.sH)();n.unregisterIframe(e)}catch(e){console.warn("Could not unregister iframe:",e)}b((0,w.Cf)(e))},[e,b]),(0,t.jsx)(m.D,{renderSidebar:(0,t.jsx)(v.Y,{buttons:j,entries:y,sizing:"medium",translateTooltips:!0}),renderTopBar:(0,t.jsx)(S,{}),children:(0,t.jsx)(c.h,{onLoad:k,preserveScrollOnReload:!0,ref:r,src:C,title:`${i("edit.label")}-${e}`,useExternalReadyState:!0})})},{}),icon:(0,t.jsx)(r.J,{value:"edit-pen"}),isDetachable:!0},L={key:"versions",label:"version.label",children:(0,t.jsx)(N.e,{ComparisonViewComponent:e=>{var n,i;let{versionIds:o}=e,[r,s]=(0,l.useState)(null),a=o.map(e=>e.count),d=null==o||null==(n=o[0])?void 0:n.id,c=null==o||null==(i=o[1])?void 0:i.id,{url:u}=(0,B.b)({versionId:d});return(0,l.useEffect)(()=>{(0,P.O)(c)?s(u):s(`${_.G}/pimcore-studio/api/documents/diff-versions/from/${d}/to/${c}`)},[o,u]),(0,t.jsx)(A,{versionUrl:r,versionsIdList:a})},SingleViewComponent:e=>{let{versionId:n}=e,{isLoading:i,url:l}=(0,B.b)({versionId:n.id});return i?(0,t.jsx)(E.V,{fullPage:!0,loading:!0}):(0,t.jsx)(A,{versionUrl:l,versionsIdList:[n.count]})}}),icon:(0,t.jsx)(r.J,{value:"history"}),isDetachable:!0,hidden:e=>!(0,W.x)(e.permissions,"versions")},O={key:"preview",label:"preview.label",children:(0,t.jsx)(()=>{let{id:e}=(0,V.i)();return(0,t.jsx)(R,{id:e})},{}),icon:(0,t.jsx)(r.J,{value:"preview"}),isDetachable:!0}},66472:function(e,n,i){i.d(n,{K:()=>u});var t=i(85893);i(81004);var l=i(9622),o=i(23002),r=i(71695),s=i(5750),a=i(46309),d=i(66858),c=i(7594);let u={name:"document-editor",component:e=>(0,t.jsx)(c.OR,{component:c.O8.document.editor.container.name,props:e}),titleComponent:e=>{let{node:n}=e,{document:i}=(0,o.Z)(n.getConfig().id),{t:s}=(0,r.useTranslation)(),a=n.getName();return n.getName=()=>(null==i?void 0:i.parentId)===0?s("home"):(null==i?void 0:i.key)??a,(0,t.jsx)(l.X,{modified:(null==i?void 0:i.modified)??!1,node:n})},defaultGlobalContext:!1,isModified:e=>{let n=e.getConfig(),i=(0,s.yI)(a.h.getState(),n.id);return(null==i?void 0:i.modified)??!1},getContextProvider:(e,n)=>{let i=e.config;return(0,t.jsx)(d.p,{id:i.id,children:n})}}},67459:function(e,n,i){i.d(n,{e:()=>a});var t=i(85893);i(81004);var l=i(2433),o=i(84104),r=i(62368),s=i(35015);let a=e=>{let{SingleViewComponent:n,ComparisonViewComponent:i}=e,{id:a,elementType:d}=(0,s.i)(),{isLoading:c,data:u}=(0,l.KD)({id:a,elementType:d,page:1,pageSize:9999});return c?(0,t.jsx)(r.V,{loading:!0}):(0,t.jsx)(o.c,{ComparisonViewComponent:i,SingleViewComponent:n,versions:u.items})}},84104:function(e,n,i){i.d(n,{w:()=>B,c:()=>E});var t=i(85893),l=i(81004),o=i(58793),r=i.n(o),s=i(71695),a=i(2433),d=i(98550),c=i(18243),u=i(71881),p=i(82141),h=i(41659),v=i(62368),m=i(21459),x=i(76513),g=i(52309),f=i(36386),w=i(53478),b=i(15391),j=i(26788),y=i(37603),k=i(83472),C=i(44780),S=i(38447),N=i(93383),$=i(70202),I=i(45096),T=i(81343),D=i(77244),F=i(29202);let A=(0,F.createStyles)(e=>{let{token:n,css:i}=e;return{versionTag:i`
      width: 56px;
      height: 22px;

      display: inline-grid;
      justify-content: center;

      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
    `,dateContainer:i`
      display: flex;
      align-items: center;
      margin-top: 2px;
      gap: 4px;
    `,dateIcon:i`
      color: ${n.Colors.Neutral.Icon.colorIcon};
    `,dateLabel:i`
      color: ${n.colorTextDescription};
    `}}),P=e=>{let{version:n,setDetailedVersions:i}=e,[o,r]=(0,l.useState)(null==n?void 0:n.note),[d,{isError:c,error:u}]=(0,a.Rl)(),[h,{isLoading:v,isError:m,error:x}]=(0,a.z4)(),[j,{isLoading:C,isError:F,error:P}]=(0,a.y7)(),{t:_}=(0,s.useTranslation)(),{styles:B}=A(),E=n.published??!1,V=n.ctype===D.a.document,M=(0,w.isNil)(n.scheduled)?void 0:(0,b.o0)({timestamp:n.scheduled,dateStyle:"short",timeStyle:"short"}),{isLoading:z,url:R}=(0,I.b)({versionId:n.id,isSkip:!V}),W=async()=>{await h({id:n.id}),m&&(0,T.ZP)(new T.MS(x))},Z=async()=>{await j({id:n.id}),i([]),F&&(0,T.ZP)(new T.MS(P))},L=async()=>{await d({id:n.id,updateVersion:{note:o}}),c&&(0,T.ZP)(new T.MS(u))};return(0,t.jsxs)(g.k,{gap:"extra-small",vertical:!0,children:[(0,t.jsxs)(g.k,{align:"top",justify:"space-between",children:[(0,t.jsxs)(k.V,{className:B.versionTag,children:["ID: ",n.id]}),(0,t.jsxs)(S.T,{size:"mini",children:[!E&&(0,t.jsx)(p.W,{disabled:v||C,icon:{value:"published"},loading:v,onClick:W,children:_("version.publish")}),V&&(0,t.jsx)(N.h,{"aria-label":_("aria.version.delete"),icon:{value:"open-folder"},loading:z,onClick:()=>{(0,w.isNull)(R)||window.open(R,"_blank")},type:"default"}),(0,t.jsx)(N.h,{"aria-label":_("aria.version.delete"),disabled:v||C,icon:{value:"trash"},loading:C,onClick:Z,type:"default"})]})]}),!(0,w.isNil)(M)&&(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{children:_("version.schedule-for")}),(0,t.jsxs)("div",{className:B.dateContainer,children:[(0,t.jsx)(y.J,{className:B.dateIcon,value:"calendar"}),(0,t.jsx)(f.x,{className:B.dateLabel,children:M})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{children:_("version.note")}),(0,t.jsx)($.I,{onBlur:L,onChange:e=>{r(e.target.value)},onClick:e=>{e.stopPropagation()},placeholder:_("version.note.add"),value:o})]})]})},_=(0,F.createStyles)(e=>{let{token:n,css:i}=e,t={highlightBackgroundColor:"#F6FFED",highlightBorderColor:"#B7EB8F",highlightColor:"#52C41A",signalBackgroundColor:"#E6F4FF",signalBorderColor:"#91CAFF",signalColor:"#1677FF",...n};return{versions:i`
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
        background-color: ${n.Colors.Base.Geekblue["2"]} !important;
        color: ${n.Colors.Base.Geekblue["6"]} !important;
        border-color: ${n.Colors.Base.Geekblue["3"]} !important;
      }
    `,compareButton:i`
      background-color: ${n.Colors.Neutral.Fill.colorFill} !important;
    `,notificationMessage:i`
      text-align: center;
      max-width: 200px;
    `}},{hashPriority:"low"}),B="versions_content_view",E=e=>{let{versions:n,SingleViewComponent:i,ComparisonViewComponent:o}=e,[S,N]=(0,l.useState)(!1),[$,I]=(0,l.useState)([]),[D,{isLoading:F,isError:A,error:E}]=(0,a.yK)(),{renderModal:V,showModal:M,handleOk:z}=(0,c.dd)({type:"warn"}),{t:R}=(0,s.useTranslation)(),{styles:W}=_(),Z=async()=>{z(),await D({elementType:n[0].ctype,id:n[0].cid}),A&&(0,T.ZP)(new T.MS(E))},L=e=>{let n=[...$],i=n.some(n=>n.id===e.id);2!==n.length||i||(n=[]),i?n.splice(n.indexOf(e),1):n.push(e),I(n)},O=n.map(e=>(e=>{let{version:n,detailedVersions:i,isComparingActive:l,selectVersion:o,setDetailedVersions:r}=e,a={id:n.id,count:n.versionCount},d=i.some(e=>e.id===n.id),c=n.published??!1,u=n.autosave??!1,p=d?"theme-primary":"theme-default";return{key:String(n.id),selected:d,title:(0,t.jsx)(()=>{let{t:e}=(0,s.useTranslation)();return(0,t.jsxs)("div",{children:[l&&(0,t.jsx)(C.x,{inline:!0,padding:{right:"extra-small"},children:(0,t.jsx)(j.Checkbox,{checked:d,onChange:()=>{o(a)}})}),(0,t.jsx)("span",{className:"title",children:`${e("version.version")} ${n.versionCount} | ${(0,b.o0)({timestamp:n.date,dateStyle:"short",timeStyle:"medium"})}`})]})},{}),subtitle:(0,t.jsx)(()=>{var e;let{t:i}=(0,s.useTranslation)();return(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"sub-title",children:`${i("by")} ${(null==(e=n.user)?void 0:e.name)??""}`}),(0,w.isNil)(n.autosave)&&n.autosave&&(0,t.jsx)(y.J,{value:"auto-save"})]})},{}),extra:(0,t.jsx)(()=>{let{t:e}=(0,s.useTranslation)();return c?(0,t.jsx)(k.V,{color:"success",iconName:"published",children:e("version.published")}):u?(0,t.jsx)(k.V,{color:"geekblue",iconName:"auto-save",children:e("version.autosaved")}):(0,t.jsx)(t.Fragment,{})},{}),children:(0,t.jsx)(P,{setDetailedVersions:r,version:n}),onClick:()=>{l?o(a):r([{id:n.id,count:n.versionCount}])},theme:c?"theme-success":p}})({version:e,detailedVersions:$,isComparingActive:S,selectVersion:L,setDetailedVersions:I})),G=0===n.length,J=0===$.length;return G?(0,t.jsxs)(v.V,{padded:!0,children:[(0,t.jsx)(h.h,{className:"p-l-mini",title:R("version.versions")}),(0,t.jsx)(v.V,{none:!0,noneOptions:{text:R("version.no-versions-to-show")}})]}):(0,t.jsx)(v.V,{className:W.versions,children:(0,t.jsx)(m.K,{leftItem:{size:25,minSize:415,children:(0,t.jsxs)(v.V,{padded:!0,children:[(0,t.jsx)(h.h,{title:R("version.versions"),children:!G&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(g.k,{className:"w-full",gap:"small",justify:"space-between",children:[(0,t.jsx)(d.z,{className:r()({[W.compareButton]:S}),onClick:()=>{I([]),N(!S)},children:R("version.compare-versions")},R("version.compare-versions")),(0,t.jsx)(p.W,{icon:{value:"trash"},loading:F,onClick:M,children:R("version.clear-unpublished")},R("version.clear-unpublished"))]}),(0,t.jsx)(V,{footer:(0,t.jsxs)(u.m,{children:[(0,t.jsx)(d.z,{onClick:Z,type:"primary",children:R("yes")}),(0,t.jsx)(d.z,{onClick:z,type:"default",children:R("no")})]}),title:R("version.clear-unpublished-versions"),children:(0,t.jsx)("span",{children:R("version.confirm-clear-unpublished")})})]})}),!G&&(0,t.jsx)(x.d,{items:O})]})},rightItem:{size:75,children:(0,t.jsx)(v.V,{centered:J,id:B,padded:!0,children:(0,t.jsxs)(g.k,{align:"center",children:[!J&&S&&(0,t.jsx)(o,{versionIds:$}),!J&&!S&&(0,t.jsx)(i,{setDetailedVersions:I,versionId:$[0],versions:n}),J&&(0,t.jsx)(f.x,{className:W.notificationMessage,children:R("version.preview-notification")})]})})}})})}}}]);