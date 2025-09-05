/*! For license information please see 5777.f12c1c68.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["5777"],{12621:function(e,i,n){n.d(i,{Cf:()=>l,FI:()=>c,PA:()=>d,UH:()=>s,qw:()=>u});var t=n(40483),o=n(73288);let r=(0,o.createSlice)({name:"document-editor",initialState:{documentAreablocks:{}},reducers:{setDocumentAreablockTypes:(e,i)=>{e.documentAreablocks[i.payload.documentId]=i.payload.areablockTypes},removeDocument:(e,i)=>{let n=i.payload;if(void 0!==e.documentAreablocks[n]){let{[n]:i,...t}=e.documentAreablocks;e.documentAreablocks=t}},clearAllDocuments:e=>{e.documentAreablocks={}}}}),{setDocumentAreablockTypes:s,removeDocument:l,clearAllDocuments:a}=r.actions,d=e=>e["document-editor"],c=(0,o.createSelector)([d,(e,i)=>i],(e,i)=>e.documentAreablocks[i]??{}),u=(0,o.createSelector)([c],e=>Object.keys(e).length>0);(0,o.createSelector)([c],e=>Object.values(e).flat()),r.reducer,(0,t.injectSliceWithState)(r)},45096:function(e,i,n){n.d(i,{b:()=>a});var t=n(81004),o=n(53478),r=n(35015),s=n(61251),l=n(23646);let a=e=>{let{versionId:i,isSkip:n=!1}=e,{id:a}=(0,r.i)(),{data:d,isLoading:c}=(0,l.Bs)({id:a},{skip:n}),[u,p]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(0,o.isEmpty)(d)||p(`${s.G}${null==d?void 0:d.fullPath}?pimcore_version=${i}`)},[i,d]),{isLoading:c,url:u}}},97455:function(e,i,n){n.d(i,{G:()=>s});var t=n(28395),o=n(5554),r=n(60476);class s extends o.A{constructor(){super(),this.type="email"}}s=(0,t.gn)([(0,r.injectable)(),(0,t.w6)("design:type",Function),(0,t.w6)("design:paramtypes",[])],s)},72404:function(e,i,n){n.d(i,{i:()=>s});var t=n(28395),o=n(5554),r=n(60476);class s extends o.A{constructor(){super(),this.type="hardlink"}}s=(0,t.gn)([(0,r.injectable)(),(0,t.w6)("design:type",Function),(0,t.w6)("design:paramtypes",[])],s)},55989:function(e,i,n){n.d(i,{m:()=>s});var t=n(28395),o=n(5554),r=n(60476);class s extends o.A{constructor(){super(),this.type="link"}}s=(0,t.gn)([(0,r.injectable)(),(0,t.w6)("design:type",Function),(0,t.w6)("design:paramtypes",[])],s)},47622:function(e,i,n){n.d(i,{M:()=>s});var t=n(28395),o=n(5554),r=n(60476);class s extends o.A{constructor(){super(),this.type="page"}}s=(0,t.gn)([(0,r.injectable)(),(0,t.w6)("design:type",Function),(0,t.w6)("design:paramtypes",[])],s)},1085:function(e,i,n){n.d(i,{t:()=>s});var t=n(28395),o=n(5554),r=n(60476);class s extends o.A{constructor(){super(),this.type="snippet"}}s=(0,t.gn)([(0,r.injectable)(),(0,t.w6)("design:type",Function),(0,t.w6)("design:paramtypes",[])],s)},78245:function(e,i,n){n.d(i,{y:()=>t});let t=(0,n(29202).createStyles)(e=>{let{token:i,css:n}=e;return{headerContainer:n`
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
    `}})},16939:function(e,i,n){n.d(i,{N:()=>v});var t=n(85893),o=n(71695),r=n(37603),s=n(81004),l=n(62588),a=n(23526),d=n(46309),c=n(42839),u=n(53478),p=n(51469),h=n(24861),m=n(81343);let v=()=>{let{t:e}=(0,o.useTranslation)(),[i,n]=(0,s.useState)(!1),v=(0,d.TL)(),{isTreeActionAllowed:g}=(0,h._)(),x=async(e,i,t)=>{n(!0);let{data:o,error:r}=await v(c.hi.endpoints.documentGetById.initiate({id:e}));if((0,u.isUndefined)(r)||((0,m.ZP)(new m.MS(r)),n(!1)),((0,u.isNil)(null==t?void 0:t.preview)||!(null==t?void 0:t.preview))&&!(0,u.isNil)(null==o?void 0:o.settingsData)&&(0,u.has)(null==o?void 0:o.settingsData,"url")&&(0,u.isString)(null==o?void 0:o.settingsData.url)){let e=o.settingsData.url;window.open(e),null==i||i()}else if((0,u.isNil)(null==o?void 0:o.fullPath))console.error("Failed to fetch document data",o);else{let e=o.fullPath,n=new URL(e,window.location.origin);!(0,u.isNil)(null==t?void 0:t.preview)&&(null==t?void 0:t.preview)&&(n.searchParams.set("pimcore_preview","true"),n.searchParams.set("pimcore_studio_preview","true"),n.searchParams.set("_dc",Date.now().toString())),e=n.toString(),window.open(e),null==i||i()}n(!1)},w=(e,i)=>!(0,l.x)(e.permissions,"view")||((0,u.isNil)(null==i?void 0:i.preview)||!(null==i?void 0:i.preview))&&["snippet","newsletter","folder","link","hardlink","email"].includes(e.type)||!(0,u.isNil)(null==i?void 0:i.preview)&&i.preview&&["folder","link","hardlink"].includes(e.type);return{openInNewWindow:x,openInNewWindowTreeContextMenuItem:i=>({label:e("document.open-in-new-window"),key:a.N.openInNewWindow,icon:(0,t.jsx)(r.J,{value:"share"}),hidden:"page"!==i.type||!(0,l.x)(i.permissions,"view")||!g(p.W.Open),onClick:async()=>{await x(parseInt(i.id))}}),openInNewWindowContextMenuItem:(n,o)=>({label:e("document.open-in-new-window"),key:a.N.openInNewWindow,isLoading:i,icon:(0,t.jsx)(r.J,{value:"share"}),hidden:w(n),onClick:async()=>{await x(n.id,o)}}),openPreviewInNewWindowContextMenuItem:(n,o)=>({label:e("document.open-preview-in-new-window"),key:a.N.openPreviewInNewWindow,isLoading:i,icon:(0,t.jsx)(r.J,{value:"eye"}),hidden:w(n,{preview:!0}),onClick:async()=>{await x(n.id,o,{preview:!0})}})}}},10962:function(e,i,n){n.d(i,{O:()=>a,R:()=>s.SaveTaskType});var t=n(81004),o=n(66858),r=n(23002),s=n(13221),l=n(62002);let a=()=>{let{id:e}=(0,t.useContext)(o.R),{document:i}=(0,r.Z)(e),[n,s]=(0,t.useState)(!1),[a,d]=(0,t.useState)(!1),[c,u]=(0,t.useState)(!1),[p,h]=(0,t.useState)();return{save:async(n,t)=>{if((null==i?void 0:i.changes)!==void 0)try{s(!0),u(!1),h(void 0),d(!1),await l.lF.saveDocument(e,n),d(!0),null==t||t()}catch(e){throw console.error("Save failed:",e),u(!0),h(e),e}finally{s(!1)}},isLoading:n,isSuccess:a,isError:c,error:p}}},50393:function(e,i,n){n.d(i,{V:()=>P,v:()=>D});var t=n(85893),o=n(81004),r=n.n(o),s=n(37603),l=n(66858),a=n(23002),d=n(71695),c=n(51139),u=n(42801),p=n(53478),h=n(10303),m=n(25202),v=n(78699),g=n(80380),x=n(79771),w=n(46309),f=n(12621),b=n(67459),j=n(52309),y=n(36386),k=n(51776),C=n(78245),S=n(84104);let N=e=>{let{versionsIdList:i,versionUrl:n}=e,{t:r}=(0,d.useTranslation)(),{styles:s}=(0,C.y)(),{height:l}=(0,k.Z)(S.w),a=(0,o.useRef)(null);return(0,o.useEffect)(()=>{(0,p.isNull)(n)||(0,p.isNull)(a.current)||a.current.reload()},[n]),(0,t.jsxs)(j.k,{style:{height:l,minWidth:"100%"},vertical:!0,children:[(0,t.jsx)(j.k,{className:s.headerContainer,wrap:"wrap",children:i.map((e,i)=>(0,t.jsx)(j.k,{className:s.headerItem,children:(0,t.jsxs)(y.x,{children:[r("version.version")," ",e]})},`${i}-${e}`))}),(0,t.jsx)(j.k,{className:s.content,flex:1,children:!(0,p.isNull)(n)&&(0,t.jsx)(c.h,{ref:a,src:n})})]})};var I=n(30225),$=n(61251),T=n(45096),F=n(62368),B=n(62588);let D={key:"edit",label:"edit.label",children:(0,t.jsx)(()=>{let{id:e}=(0,o.useContext)(l.R),{document:i}=(0,a.Z)(e),{t:n}=(0,d.useTranslation)(),s=(0,o.useRef)(null),b=(0,w.TL)(),j=g.nC.get(x.j["Document/Editor/Edit/SidebarManager"]).getButtons(),y=(()=>{let e=(0,o.useContext)(l.R),i=(0,w.CG)(f.PA),n=g.nC.get(x.j["Document/Editor/Edit/SidebarManager"]);return(0,o.useMemo)(()=>n.getVisibleEntries(e),[n,e,i])})(),k=(0,o.useCallback)(()=>{var i;let n=null==(i=s.current)?void 0:i.getIframeElement();if(!(0,p.isNil)(n))try{let{document:i}=(0,u.sH)();i.registerIframe(e,n,s)}catch(e){console.warn("Could not register iframe:",e)}},[e]),C=(0,o.useMemo)(()=>(0,h.r)(`${null==i?void 0:i.fullPath}?pimcore_editmode=true&pimcore_studio=true&documentId=${e}`),[null==i?void 0:i.fullPath,e]);return r().useEffect(()=>()=>{try{let{document:i}=(0,u.sH)();i.unregisterIframe(e)}catch(e){console.warn("Could not unregister iframe:",e)}b((0,f.Cf)(e))},[e,b]),(0,t.jsx)(v.D,{renderSidebar:(0,t.jsx)(m.Y,{buttons:j,entries:y,translateTooltips:!0}),children:(0,t.jsx)(c.h,{onLoad:k,preserveScrollOnReload:!0,ref:s,src:C,title:`${n("edit.label")}-${e}`,useExternalReadyState:!0})})},{}),icon:(0,t.jsx)(s.J,{value:"edit-pen"}),isDetachable:!0},P={key:"versions",label:"version.label",children:(0,t.jsx)(b.e,{ComparisonViewComponent:e=>{var i,n;let{versionIds:r}=e,[s,l]=(0,o.useState)(null),a=r.map(e=>e.count),d=null==r||null==(i=r[0])?void 0:i.id,c=null==r||null==(n=r[1])?void 0:n.id,{url:u}=(0,T.b)({versionId:d});return(0,o.useEffect)(()=>{(0,I.O)(c)?l(u):l(`${$.G}/pimcore-studio/api/documents/diff-versions/from/${d}/to/${c}`)},[r,u]),(0,t.jsx)(N,{versionUrl:s,versionsIdList:a})},SingleViewComponent:e=>{let{versionId:i}=e,{isLoading:n,url:o}=(0,T.b)({versionId:i.id});return n?(0,t.jsx)(F.V,{fullPage:!0,loading:!0}):(0,t.jsx)(N,{versionUrl:o,versionsIdList:[i.count]})}}),icon:(0,t.jsx)(s.J,{value:"history"}),isDetachable:!0,hidden:e=>!(0,B.x)(e.permissions,"versions")}},66472:function(e,i,n){n.d(i,{K:()=>u});var t=n(85893);n(81004);var o=n(9622),r=n(23002),s=n(71695),l=n(5750),a=n(46309),d=n(66858),c=n(7594);let u={name:"document-editor",component:e=>(0,t.jsx)(c.OR,{component:c.O8.document.editor.container.name,props:e}),titleComponent:e=>{let{node:i}=e,{document:n}=(0,r.Z)(i.getConfig().id),{t:l}=(0,s.useTranslation)(),a=i.getName();return i.getName=()=>(null==n?void 0:n.parentId)===0?l("home"):(null==n?void 0:n.key)??a,(0,t.jsx)(o.X,{modified:(null==n?void 0:n.modified)??!1,node:i})},isModified:e=>{let i=e.getConfig(),n=(0,l.yI)(a.h.getState(),i.id);return(null==n?void 0:n.modified)??!1},getContextProvider:(e,i)=>{let n=e.config;return(0,t.jsx)(d.p,{id:n.id,children:i})}}},67459:function(e,i,n){n.d(i,{e:()=>a});var t=n(85893);n(81004);var o=n(2433),r=n(84104),s=n(62368),l=n(35015);let a=e=>{let{SingleViewComponent:i,ComparisonViewComponent:n}=e,{id:a,elementType:d}=(0,l.i)(),{isLoading:c,data:u}=(0,o.KD)({id:a,elementType:d,page:1,pageSize:9999});return c?(0,t.jsx)(s.V,{loading:!0}):(0,t.jsx)(r.c,{ComparisonViewComponent:n,SingleViewComponent:i,versions:u.items})}},84104:function(e,i,n){n.d(i,{w:()=>E,c:()=>V});var t=n(85893),o=n(81004),r=n(58793),s=n.n(r),l=n(71695),a=n(2433),d=n(98550),c=n(18243),u=n(71881),p=n(82141),h=n(41659),m=n(62368),v=n(21459),g=n(76513),x=n(52309),w=n(36386),f=n(53478),b=n(15391),j=n(26788),y=n(37603),k=n(83472),C=n(44780),S=n(38447),N=n(93383),I=n(70202),$=n(45096),T=n(81343),F=n(77244),B=n(29202);let D=(0,B.createStyles)(e=>{let{token:i,css:n}=e;return{versionTag:n`
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
    `}}),P=e=>{let{version:i,setDetailedVersions:n}=e,[r,s]=(0,o.useState)(null==i?void 0:i.note),[d,{isError:c,error:u}]=(0,a.Rl)(),[h,{isLoading:m,isError:v,error:g}]=(0,a.z4)(),[j,{isLoading:C,isError:B,error:P}]=(0,a.y7)(),{t:_}=(0,l.useTranslation)(),{styles:E}=D(),V=i.published??!1,A=i.ctype===F.a.document,M=(0,f.isNil)(i.scheduled)?void 0:(0,b.o0)({timestamp:i.scheduled,dateStyle:"short",timeStyle:"short"}),{isLoading:z,url:L}=(0,$.b)({versionId:i.id,isSkip:!A}),R=async()=>{await h({id:i.id}),v&&(0,T.ZP)(new T.MS(g))},W=async()=>{await j({id:i.id}),n([]),B&&(0,T.ZP)(new T.MS(P))},O=async()=>{await d({id:i.id,updateVersion:{note:r}}),c&&(0,T.ZP)(new T.MS(u))};return(0,t.jsxs)(x.k,{gap:"extra-small",vertical:!0,children:[(0,t.jsxs)(x.k,{align:"top",justify:"space-between",children:[(0,t.jsxs)(k.V,{className:E.versionTag,children:["ID: ",i.id]}),(0,t.jsxs)(S.T,{size:"mini",children:[!V&&(0,t.jsx)(p.W,{disabled:m||C,icon:{value:"published"},loading:m,onClick:R,children:_("version.publish")}),A&&(0,t.jsx)(N.h,{"aria-label":_("aria.version.delete"),icon:{value:"open-folder"},loading:z,onClick:()=>{(0,f.isNull)(L)||window.open(L,"_blank")},type:"default"}),(0,t.jsx)(N.h,{"aria-label":_("aria.version.delete"),disabled:m||C,icon:{value:"trash"},loading:C,onClick:W,type:"default"})]})]}),!(0,f.isNil)(M)&&(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{children:_("version.schedule-for")}),(0,t.jsxs)("div",{className:E.dateContainer,children:[(0,t.jsx)(y.J,{className:E.dateIcon,value:"calendar"}),(0,t.jsx)(w.x,{className:E.dateLabel,children:M})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{children:_("version.note")}),(0,t.jsx)(I.I,{onBlur:O,onChange:e=>{s(e.target.value)},onClick:e=>{e.stopPropagation()},placeholder:_("version.note.add"),value:r})]})]})},_=(0,B.createStyles)(e=>{let{token:i,css:n}=e,t={highlightBackgroundColor:"#F6FFED",highlightBorderColor:"#B7EB8F",highlightColor:"#52C41A",signalBackgroundColor:"#E6F4FF",signalBorderColor:"#91CAFF",signalColor:"#1677FF",...i};return{versions:n`
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
    `}},{hashPriority:"low"}),E="versions_content_view",V=e=>{let{versions:i,SingleViewComponent:n,ComparisonViewComponent:r}=e,[S,N]=(0,o.useState)(!1),[I,$]=(0,o.useState)([]),[F,{isLoading:B,isError:D,error:V}]=(0,a.yK)(),{renderModal:A,showModal:M,handleOk:z}=(0,c.dd)({type:"warn"}),{t:L}=(0,l.useTranslation)(),{styles:R}=_(),W=async()=>{z(),await F({elementType:i[0].ctype,id:i[0].cid}),D&&(0,T.ZP)(new T.MS(V))},O=e=>{let i=[...I],n=i.some(i=>i.id===e.id);2!==i.length||n||(i=[]),n?i.splice(i.indexOf(e),1):i.push(e),$(i)},Z=i.map(e=>(e=>{let{version:i,detailedVersions:n,isComparingActive:o,selectVersion:r,setDetailedVersions:s}=e,a={id:i.id,count:i.versionCount},d=n.some(e=>e.id===i.id),c=i.published??!1,u=i.autosave??!1,p=d?"theme-primary":"theme-default";return{key:String(i.id),selected:d,title:(0,t.jsx)(()=>{let{t:e}=(0,l.useTranslation)();return(0,t.jsxs)("div",{children:[o&&(0,t.jsx)(C.x,{inline:!0,padding:{right:"extra-small"},children:(0,t.jsx)(j.Checkbox,{checked:d,onChange:()=>{r(a)}})}),(0,t.jsx)("span",{className:"title",children:`${e("version.version")} ${i.versionCount} | ${(0,b.o0)({timestamp:i.date,dateStyle:"short",timeStyle:"medium"})}`})]})},{}),subtitle:(0,t.jsx)(()=>{var e;let{t:n}=(0,l.useTranslation)();return(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"sub-title",children:`${n("by")} ${(null==(e=i.user)?void 0:e.name)??""}`}),(0,f.isNil)(i.autosave)&&i.autosave&&(0,t.jsx)(y.J,{value:"auto-save"})]})},{}),extra:(0,t.jsx)(()=>{let{t:e}=(0,l.useTranslation)();return c?(0,t.jsx)(k.V,{color:"success",iconName:"published",children:e("version.published")}):u?(0,t.jsx)(k.V,{color:"geekblue",iconName:"auto-save",children:e("version.autosaved")}):(0,t.jsx)(t.Fragment,{})},{}),children:(0,t.jsx)(P,{setDetailedVersions:s,version:i}),onClick:()=>{o?r(a):s([{id:i.id,count:i.versionCount}])},theme:c?"theme-success":p}})({version:e,detailedVersions:I,isComparingActive:S,selectVersion:O,setDetailedVersions:$})),G=0===i.length,J=0===I.length;return G?(0,t.jsxs)(m.V,{padded:!0,children:[(0,t.jsx)(h.h,{className:"p-l-mini",title:L("version.versions")}),(0,t.jsx)(m.V,{none:!0,noneOptions:{text:L("version.no-versions-to-show")}})]}):(0,t.jsx)(m.V,{className:R.versions,children:(0,t.jsx)(v.K,{leftItem:{size:25,minSize:415,children:(0,t.jsxs)(m.V,{padded:!0,children:[(0,t.jsx)(h.h,{title:L("version.versions"),children:!G&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(x.k,{className:"w-full",gap:"small",justify:"space-between",children:[(0,t.jsx)(d.z,{className:s()({[R.compareButton]:S}),onClick:()=>{$([]),N(!S)},children:L("version.compare-versions")},L("version.compare-versions")),(0,t.jsx)(p.W,{icon:{value:"trash"},loading:B,onClick:M,children:L("version.clear-unpublished")},L("version.clear-unpublished"))]}),(0,t.jsx)(A,{footer:(0,t.jsxs)(u.m,{children:[(0,t.jsx)(d.z,{onClick:W,type:"primary",children:L("yes")}),(0,t.jsx)(d.z,{onClick:z,type:"default",children:L("no")})]}),title:L("version.clear-unpublished-versions"),children:(0,t.jsx)("span",{children:L("version.confirm-clear-unpublished")})})]})}),!G&&(0,t.jsx)(g.d,{items:Z})]})},rightItem:{size:75,children:(0,t.jsx)(m.V,{centered:J,id:E,padded:!0,children:(0,t.jsxs)(x.k,{align:"center",children:[!J&&S&&(0,t.jsx)(r,{versionIds:I}),!J&&!S&&(0,t.jsx)(n,{setDetailedVersions:$,versionId:I[0],versions:i}),J&&(0,t.jsx)(w.x,{className:R.notificationMessage,children:L("version.preview-notification")})]})})}})})}}}]);