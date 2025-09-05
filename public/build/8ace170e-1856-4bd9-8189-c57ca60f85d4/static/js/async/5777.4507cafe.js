/*! For license information please see 5777.4507cafe.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["5777"],{12621:function(e,n,t){t.d(n,{Cf:()=>l,FI:()=>c,PA:()=>d,UH:()=>s,qw:()=>u});var i=t(40483),o=t(73288);let r=(0,o.createSlice)({name:"document-editor",initialState:{documentAreablocks:{}},reducers:{setDocumentAreablockTypes:(e,n)=>{e.documentAreablocks[n.payload.documentId]=n.payload.areablockTypes},removeDocument:(e,n)=>{let t=n.payload;if(void 0!==e.documentAreablocks[t]){let{[t]:n,...i}=e.documentAreablocks;e.documentAreablocks=i}},clearAllDocuments:e=>{e.documentAreablocks={}}}}),{setDocumentAreablockTypes:s,removeDocument:l,clearAllDocuments:a}=r.actions,d=e=>e["document-editor"],c=(0,o.createSelector)([d,(e,n)=>n],(e,n)=>e.documentAreablocks[n]??{}),u=(0,o.createSelector)([c],e=>Object.keys(e).length>0);(0,o.createSelector)([c],e=>Object.values(e).flat()),r.reducer,(0,i.injectSliceWithState)(r)},45096:function(e,n,t){t.d(n,{b:()=>a});var i=t(81004),o=t(53478),r=t(35015),s=t(61251),l=t(23646);let a=e=>{let{versionId:n,isSkip:t=!1}=e,{id:a}=(0,r.i)(),{data:d,isLoading:c}=(0,l.Bs)({id:a},{skip:t}),[u,p]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(0,o.isEmpty)(d)||p(`${s.G}${null==d?void 0:d.fullPath}?pimcore_version=${n}`)},[n,d]),{isLoading:c,url:u}}},97455:function(e,n,t){t.d(n,{G:()=>s});var i=t(28395),o=t(5554),r=t(60476);class s extends o.A{constructor(){super(),this.type="email"}}s=(0,i.gn)([(0,r.injectable)(),(0,i.w6)("design:type",Function),(0,i.w6)("design:paramtypes",[])],s)},72404:function(e,n,t){t.d(n,{i:()=>s});var i=t(28395),o=t(5554),r=t(60476);class s extends o.A{constructor(){super(),this.type="hardlink"}}s=(0,i.gn)([(0,r.injectable)(),(0,i.w6)("design:type",Function),(0,i.w6)("design:paramtypes",[])],s)},55989:function(e,n,t){t.d(n,{m:()=>s});var i=t(28395),o=t(5554),r=t(60476);class s extends o.A{constructor(){super(),this.type="link"}}s=(0,i.gn)([(0,r.injectable)(),(0,i.w6)("design:type",Function),(0,i.w6)("design:paramtypes",[])],s)},47622:function(e,n,t){t.d(n,{M:()=>s});var i=t(28395),o=t(5554),r=t(60476);class s extends o.A{constructor(){super(),this.type="page"}}s=(0,i.gn)([(0,r.injectable)(),(0,i.w6)("design:type",Function),(0,i.w6)("design:paramtypes",[])],s)},1085:function(e,n,t){t.d(n,{t:()=>s});var i=t(28395),o=t(5554),r=t(60476);class s extends o.A{constructor(){super(),this.type="snippet"}}s=(0,i.gn)([(0,r.injectable)(),(0,i.w6)("design:type",Function),(0,i.w6)("design:paramtypes",[])],s)},78245:function(e,n,t){t.d(n,{y:()=>i});let i=(0,t(29202).createStyles)(e=>{let{token:n,css:t}=e;return{headerContainer:t`
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
    `,headerItem:t`
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
    `,content:t`
      position: relative;
      min-width: 220px;
    `,emptyState:t`
      margin-top: 40px;
      max-width: 200px;
      text-align: center;
    `,switchContainer:t`
      position: absolute;
      top: 10px;
      right: ${n.paddingXS}px;
      z-index: 1;
    `}})},16939:function(e,n,t){t.d(n,{N:()=>g});var i=t(85893),o=t(71695),r=t(37603),s=t(81004),l=t(62588),a=t(23526),d=t(46309),c=t(42839),u=t(53478),p=t(51469),h=t(24861),m=t(81343);let g=()=>{let{t:e}=(0,o.useTranslation)(),[n,t]=(0,s.useState)(!1),g=(0,d.TL)(),{isTreeActionAllowed:x}=(0,h._)(),v=async(e,n)=>{t(!0);let{data:i,error:o}=await g(c.hi.endpoints.documentGetById.initiate({id:e}));(0,u.isUndefined)(o)||((0,m.ZP)(new m.MS(o)),t(!1)),!(0,u.isNil)(null==i?void 0:i.settingsData)&&(0,u.has)(null==i?void 0:i.settingsData,"url")&&(0,u.isString)(null==i?void 0:i.settingsData.url)?(window.open(i.settingsData.url),null==n||n()):console.error("Failed to fetch document data"),t(!1)},b=e=>"page"!==e.type||!(0,l.x)(e.permissions,"view");return{openInNewWindow:v,openInNewWindowTreeContextMenuItem:n=>({label:e("document.open-in-new-window"),key:a.N.openInNewWindow,icon:(0,i.jsx)(r.J,{value:"share"}),hidden:b(n)||!x(p.W.Open),onClick:async()=>{await v(parseInt(n.id))}}),openInNewWindowContextMenuItem:(t,o)=>({label:e("document.open-in-new-window"),key:a.N.openInNewWindow,isLoading:n,icon:(0,i.jsx)(r.J,{value:"share"}),hidden:b(t),onClick:async()=>{await v(t.id,o)}})}}},10962:function(e,n,t){t.d(n,{O:()=>a,R:()=>s.SaveTaskType});var i=t(81004),o=t(66858),r=t(23002),s=t(13221),l=t(62002);let a=()=>{let{id:e}=(0,i.useContext)(o.R),{document:n}=(0,r.Z)(e),[t,s]=(0,i.useState)(!1),[a,d]=(0,i.useState)(!1),[c,u]=(0,i.useState)(!1),[p,h]=(0,i.useState)();return{save:async(t,i)=>{if((null==n?void 0:n.changes)!==void 0)try{s(!0),u(!1),h(void 0),d(!1),await l.lF.saveDocument(e,t),d(!0),null==i||i()}catch(e){throw console.error("Save failed:",e),u(!0),h(e),e}finally{s(!1)}},isLoading:t,isSuccess:a,isError:c,error:p}}},50393:function(e,n,t){t.d(n,{V:()=>E,v:()=>D});var i=t(85893),o=t(81004),r=t.n(o),s=t(37603),l=t(66858),a=t(23002),d=t(71695),c=t(51139),u=t(42801),p=t(53478),h=t(10303),m=t(25202),g=t(78699),x=t(80380),v=t(79771),b=t(46309),f=t(12621),j=t(67459),y=t(52309),w=t(36386),C=t(51776),k=t(78245),S=t(84104);let N=e=>{let{versionsIdList:n,versionUrl:t}=e,{t:r}=(0,d.useTranslation)(),{styles:s}=(0,k.y)(),{height:l}=(0,C.Z)(S.w),a=(0,o.useRef)(null);return(0,o.useEffect)(()=>{(0,p.isNull)(t)||(0,p.isNull)(a.current)||a.current.reload()},[t]),(0,i.jsxs)(y.k,{style:{height:l,minWidth:"100%"},vertical:!0,children:[(0,i.jsx)(y.k,{className:s.headerContainer,wrap:"wrap",children:n.map((e,n)=>(0,i.jsx)(y.k,{className:s.headerItem,children:(0,i.jsxs)(w.x,{children:[r("version.version")," ",e]})},`${n}-${e}`))}),(0,i.jsx)(y.k,{className:s.content,flex:1,children:!(0,p.isNull)(t)&&(0,i.jsx)(c.h,{ref:a,src:t})})]})};var $=t(30225),I=t(61251),T=t(45096),F=t(62368),B=t(62588);let D={key:"edit",label:"edit.label",children:(0,i.jsx)(()=>{let{id:e}=(0,o.useContext)(l.R),{document:n}=(0,a.Z)(e),{t}=(0,d.useTranslation)(),s=(0,o.useRef)(null),j=(0,b.TL)(),y=x.nC.get(v.j["Document/Editor/Edit/SidebarManager"]).getButtons(),w=(()=>{let e=(0,o.useContext)(l.R),n=(0,b.CG)(f.PA),t=x.nC.get(v.j["Document/Editor/Edit/SidebarManager"]);return(0,o.useMemo)(()=>t.getVisibleEntries(e),[t,e,n])})(),C=(0,o.useCallback)(()=>{var n;let t=null==(n=s.current)?void 0:n.getIframeElement();if(!(0,p.isNil)(t))try{let{document:n}=(0,u.sH)();n.registerIframe(e,t,s)}catch(e){console.warn("Could not register iframe:",e)}},[e]),k=(0,o.useMemo)(()=>(0,h.r)(`${null==n?void 0:n.fullPath}?pimcore_editmode=true&pimcore_studio=true&documentId=${e}`),[null==n?void 0:n.fullPath,e]);return r().useEffect(()=>()=>{try{let{document:n}=(0,u.sH)();n.unregisterIframe(e)}catch(e){console.warn("Could not unregister iframe:",e)}j((0,f.Cf)(e))},[e,j]),(0,i.jsx)(g.D,{renderSidebar:(0,i.jsx)(m.Y,{buttons:y,entries:w,translateTooltips:!0}),children:(0,i.jsx)(c.h,{onLoad:C,preserveScrollOnReload:!0,ref:s,src:k,title:`${t("edit.label")}-${e}`,useExternalReadyState:!0})})},{}),icon:(0,i.jsx)(s.J,{value:"edit-pen"}),isDetachable:!0},E={key:"versions",label:"version.label",children:(0,i.jsx)(j.e,{ComparisonViewComponent:e=>{var n,t;let{versionIds:r}=e,[s,l]=(0,o.useState)(null),a=r.map(e=>e.count),d=null==r||null==(n=r[0])?void 0:n.id,c=null==r||null==(t=r[1])?void 0:t.id,{url:u}=(0,T.b)({versionId:d});return(0,o.useEffect)(()=>{(0,$.O)(c)?l(u):l(`${I.G}/pimcore-studio/api/documents/diff-versions/from/${d}/to/${c}`)},[r,u]),(0,i.jsx)(N,{versionUrl:s,versionsIdList:a})},SingleViewComponent:e=>{let{versionId:n}=e,{isLoading:t,url:o}=(0,T.b)({versionId:n.id});return t?(0,i.jsx)(F.V,{fullPage:!0,loading:!0}):(0,i.jsx)(N,{versionUrl:o,versionsIdList:[n.count]})}}),icon:(0,i.jsx)(s.J,{value:"history"}),isDetachable:!0,hidden:e=>!(0,B.x)(e.permissions,"versions")}},66472:function(e,n,t){t.d(n,{K:()=>u});var i=t(85893);t(81004);var o=t(9622),r=t(23002),s=t(71695),l=t(5750),a=t(46309),d=t(66858),c=t(7594);let u={name:"document-editor",component:e=>(0,i.jsx)(c.OR,{component:c.O8.document.editor.container.name,props:e}),titleComponent:e=>{let{node:n}=e,{document:t}=(0,r.Z)(n.getConfig().id),{t:l}=(0,s.useTranslation)(),a=n.getName();return n.getName=()=>(null==t?void 0:t.parentId)===0?l("home"):(null==t?void 0:t.key)??a,(0,i.jsx)(o.X,{modified:(null==t?void 0:t.modified)??!1,node:n})},isModified:e=>{let n=e.getConfig(),t=(0,l.yI)(a.h.getState(),n.id);return(null==t?void 0:t.modified)??!1},getContextProvider:(e,n)=>{let t=e.config;return(0,i.jsx)(d.p,{id:t.id,children:n})}}},67459:function(e,n,t){t.d(n,{e:()=>a});var i=t(85893);t(81004);var o=t(2433),r=t(84104),s=t(62368),l=t(35015);let a=e=>{let{SingleViewComponent:n,ComparisonViewComponent:t}=e,{id:a,elementType:d}=(0,l.i)(),{isLoading:c,data:u}=(0,o.KD)({id:a,elementType:d,page:1,pageSize:9999});return c?(0,i.jsx)(s.V,{loading:!0}):(0,i.jsx)(r.c,{ComparisonViewComponent:t,SingleViewComponent:n,versions:u.items})}},84104:function(e,n,t){t.d(n,{w:()=>A,c:()=>_});var i=t(85893),o=t(81004),r=t(58793),s=t.n(r),l=t(71695),a=t(2433),d=t(98550),c=t(18243),u=t(71881),p=t(82141),h=t(41659),m=t(62368),g=t(21459),x=t(76513),v=t(52309),b=t(36386),f=t(53478),j=t(15391),y=t(26788),w=t(37603),C=t(83472),k=t(44780),S=t(38447),N=t(93383),$=t(70202),I=t(45096),T=t(81343),F=t(77244),B=t(29202);let D=(0,B.createStyles)(e=>{let{token:n,css:t}=e;return{versionTag:t`
      width: 56px;
      height: 22px;

      display: inline-grid;
      justify-content: center;

      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
    `,dateContainer:t`
      display: flex;
      align-items: center;
      margin-top: 2px;
      gap: 4px;
    `,dateIcon:t`
      color: ${n.Colors.Neutral.Icon.colorIcon};
    `,dateLabel:t`
      color: ${n.colorTextDescription};
    `}}),E=e=>{let{version:n,setDetailedVersions:t}=e,[r,s]=(0,o.useState)(null==n?void 0:n.note),[d,{isError:c,error:u}]=(0,a.Rl)(),[h,{isLoading:m,isError:g,error:x}]=(0,a.z4)(),[y,{isLoading:k,isError:B,error:E}]=(0,a.y7)(),{t:V}=(0,l.useTranslation)(),{styles:A}=D(),_=n.published??!1,M=n.ctype===F.a.document,P=(0,f.isNil)(n.scheduled)?void 0:(0,j.o0)({timestamp:n.scheduled,dateStyle:"short",timeStyle:"short"}),{isLoading:z,url:L}=(0,I.b)({versionId:n.id,isSkip:!M}),O=async()=>{await h({id:n.id}),g&&(0,T.ZP)(new T.MS(x))},R=async()=>{await y({id:n.id}),t([]),B&&(0,T.ZP)(new T.MS(E))},W=async()=>{await d({id:n.id,updateVersion:{note:r}}),c&&(0,T.ZP)(new T.MS(u))};return(0,i.jsxs)(v.k,{gap:"extra-small",vertical:!0,children:[(0,i.jsxs)(v.k,{align:"top",justify:"space-between",children:[(0,i.jsxs)(C.V,{className:A.versionTag,children:["ID: ",n.id]}),(0,i.jsxs)(S.T,{size:"mini",children:[!_&&(0,i.jsx)(p.W,{disabled:m||k,icon:{value:"published"},loading:m,onClick:O,children:V("version.publish")}),M&&(0,i.jsx)(N.h,{"aria-label":V("aria.version.delete"),icon:{value:"open-folder"},loading:z,onClick:()=>{(0,f.isNull)(L)||window.open(L,"_blank")},type:"default"}),(0,i.jsx)(N.h,{"aria-label":V("aria.version.delete"),disabled:m||k,icon:{value:"trash"},loading:k,onClick:R,type:"default"})]})]}),!(0,f.isNil)(P)&&(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{children:V("version.schedule-for")}),(0,i.jsxs)("div",{className:A.dateContainer,children:[(0,i.jsx)(w.J,{className:A.dateIcon,value:"calendar"}),(0,i.jsx)(b.x,{className:A.dateLabel,children:P})]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("span",{children:V("version.note")}),(0,i.jsx)($.I,{onBlur:W,onChange:e=>{s(e.target.value)},onClick:e=>{e.stopPropagation()},placeholder:V("version.note.add"),value:r})]})]})},V=(0,B.createStyles)(e=>{let{token:n,css:t}=e,i={highlightBackgroundColor:"#F6FFED",highlightBorderColor:"#B7EB8F",highlightColor:"#52C41A",signalBackgroundColor:"#E6F4FF",signalBorderColor:"#91CAFF",signalColor:"#1677FF",...n};return{versions:t`
      .title-tag__own-draft {
        color: ${i.signalColor};
        border-color: ${i.signalBorderColor};
        background-color: ${i.signalBackgroundColor};
      }

      .title-tag__published {
        color: ${i.highlightColor};
        border-color: ${i.highlightBorderColor};
        background-color: ${i.highlightBackgroundColor};
      }

      .sub-title {
        font-weight: normal;
        margin-right: 4px;
        color: ${i.colorTextDescription};
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
    `,compareButton:t`
      background-color: ${n.Colors.Neutral.Fill.colorFill} !important;
    `,notificationMessage:t`
      text-align: center;
      max-width: 200px;
    `}},{hashPriority:"low"}),A="versions_content_view",_=e=>{let{versions:n,SingleViewComponent:t,ComparisonViewComponent:r}=e,[S,N]=(0,o.useState)(!1),[$,I]=(0,o.useState)([]),[F,{isLoading:B,isError:D,error:_}]=(0,a.yK)(),{renderModal:M,showModal:P,handleOk:z}=(0,c.dd)({type:"warn"}),{t:L}=(0,l.useTranslation)(),{styles:O}=V(),R=async()=>{z(),await F({elementType:n[0].ctype,id:n[0].cid}),D&&(0,T.ZP)(new T.MS(_))},W=e=>{let n=[...$],t=n.some(n=>n.id===e.id);2!==n.length||t||(n=[]),t?n.splice(n.indexOf(e),1):n.push(e),I(n)},Z=n.map(e=>(e=>{let{version:n,detailedVersions:t,isComparingActive:o,selectVersion:r,setDetailedVersions:s}=e,a={id:n.id,count:n.versionCount},d=t.some(e=>e.id===n.id),c=n.published??!1,u=n.autosave??!1,p=d?"theme-primary":"theme-default";return{key:String(n.id),selected:d,title:(0,i.jsx)(()=>{let{t:e}=(0,l.useTranslation)();return(0,i.jsxs)("div",{children:[o&&(0,i.jsx)(k.x,{inline:!0,padding:{right:"extra-small"},children:(0,i.jsx)(y.Checkbox,{checked:d,onChange:()=>{r(a)}})}),(0,i.jsx)("span",{className:"title",children:`${e("version.version")} ${n.versionCount} | ${(0,j.o0)({timestamp:n.date,dateStyle:"short",timeStyle:"medium"})}`})]})},{}),subtitle:(0,i.jsx)(()=>{var e;let{t}=(0,l.useTranslation)();return(0,i.jsxs)("div",{children:[(0,i.jsx)("span",{className:"sub-title",children:`${t("by")} ${(null==(e=n.user)?void 0:e.name)??""}`}),(0,f.isNil)(n.autosave)&&n.autosave&&(0,i.jsx)(w.J,{value:"auto-save"})]})},{}),extra:(0,i.jsx)(()=>{let{t:e}=(0,l.useTranslation)();return c?(0,i.jsx)(C.V,{color:"success",iconName:"published",children:e("version.published")}):u?(0,i.jsx)(C.V,{color:"geekblue",iconName:"auto-save",children:e("version.autosaved")}):(0,i.jsx)(i.Fragment,{})},{}),children:(0,i.jsx)(E,{setDetailedVersions:s,version:n}),onClick:()=>{o?r(a):s([{id:n.id,count:n.versionCount}])},theme:c?"theme-success":p}})({version:e,detailedVersions:$,isComparingActive:S,selectVersion:W,setDetailedVersions:I})),G=0===n.length,J=0===$.length;return G?(0,i.jsxs)(m.V,{padded:!0,children:[(0,i.jsx)(h.h,{className:"p-l-mini",title:L("version.versions")}),(0,i.jsx)(m.V,{none:!0,noneOptions:{text:L("version.no-versions-to-show")}})]}):(0,i.jsx)(m.V,{className:O.versions,children:(0,i.jsx)(g.K,{leftItem:{size:25,minSize:415,children:(0,i.jsxs)(m.V,{padded:!0,children:[(0,i.jsx)(h.h,{title:L("version.versions"),children:!G&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(v.k,{className:"w-full",gap:"small",justify:"space-between",children:[(0,i.jsx)(d.z,{className:s()({[O.compareButton]:S}),onClick:()=>{I([]),N(!S)},children:L("version.compare-versions")},L("version.compare-versions")),(0,i.jsx)(p.W,{icon:{value:"trash"},loading:B,onClick:P,children:L("version.clear-unpublished")},L("version.clear-unpublished"))]}),(0,i.jsx)(M,{footer:(0,i.jsxs)(u.m,{children:[(0,i.jsx)(d.z,{onClick:R,type:"primary",children:L("yes")}),(0,i.jsx)(d.z,{onClick:z,type:"default",children:L("no")})]}),title:L("version.clear-unpublished-versions"),children:(0,i.jsx)("span",{children:L("version.confirm-clear-unpublished")})})]})}),!G&&(0,i.jsx)(x.d,{items:Z})]})},rightItem:{size:75,children:(0,i.jsx)(m.V,{centered:J,id:A,padded:!0,children:(0,i.jsxs)(v.k,{align:"center",children:[!J&&S&&(0,i.jsx)(r,{versionIds:$}),!J&&!S&&(0,i.jsx)(t,{setDetailedVersions:I,versionId:$[0],versions:n}),J&&(0,i.jsx)(b.x,{className:O.notificationMessage,children:L("version.preview-notification")})]})})}})})}}}]);