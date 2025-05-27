/*! For license information please see __federation_expose_components.215589af.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["38"],{61251:function(e,t,i){i.d(t,{G:()=>o,e:()=>l});let n=document.querySelector("#app"),o=window.location.origin;null===n&&console.warn("App element not found");let r=(null==n?void 0:n.getAttribute("data-app-config"))??null,a=null;null!==r&&(a=JSON.parse(r));let l={baseUrl:(null==a?void 0:a.baseUrl)??"/pimcore-studio/",mercureUrl:(null==a?void 0:a.mercureUrl)??`${o}/.well-known/mercure`,maxPageSize:(null==a?void 0:a.maxPageSize)??9999999,wysiwyg:(null==a?void 0:a.wysiwyg)??{defaultEditorConfig:{dataObject:{},document:{}}}}},45921:function(e,t,i){i.d(t,{PK:()=>tI,ZE:()=>tE,Nd:()=>tD,FH:()=>tN,_j:()=>tP});var n=i(85893),o=i(81004),r=i(89250),a=i(31600),l=i(10781);let s=(0,l.kc)(e=>{let{token:t,css:i}=e;return{leftSidebar:i`
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 1000;
      pointer-events: none;

      .left-sidebar__avatar {
        margin: 8px 15px 0 15px;
        pointer-events: all;
      }

      .ant-avatar {
        background-color: rgba(114, 46, 209, 0.66);

        .anticon {
          vertical-align: 0;
        }
      }
      
      .left-sidebar__nav {
        list-style: none;
        padding: ${t.paddingXXS}px 0;
        margin: ${t.marginSM}px 0;
        position: relative;
        pointer-events: auto;
        text-align: center;
        
        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: ${t.paddingSM}px;
          right: ${t.paddingSM}px;
          height: 1px;
          background: ${t.Divider.colorSplit};
        }
      }
    `}},{hashPriority:"low"});var d=i(54416),c=i(27614),u=i(55859),p=i(26788),m=i(82717),g=i(74976);let h=(0,l.kc)(e=>{let{token:t,css:i}=e;return{userMenu:i`
      .user-menu__title {
        text-transform: uppercase;
      }
      
      .user-menu__item-extra {
        margin-left: auto;
      }
      
      .ant-dropdown-menu-item .ant-flex {
        width: 100%;
      }
    
      .ant-badge .ant-badge-count {
        background: ${t.colorPrimary};
        width: 20px;
        height: 20px;
        border-radius: 100%;
      }
    `}});var x=i(45981),v=i(66660),f=i(80380),b=i(79771);let y=new class{registerModule(e){this.registry.push(e)}initModules(){this.registry.forEach(e=>{e.onInit()})}constructor(){this.registry=[]}};var j=i(2275),w=i(47755),S=i(70302),T=i(11113),C=i(77476),k=i(84901),_=i(96068),$=i(62848);let N=$.h.enhanceEndpoints({addTagTypes:["Notifications"]}).injectEndpoints({endpoints:e=>({notificationGetCollection:e.query({query:e=>({url:"/pimcore-studio/api/notifications",method:"POST",body:e.body}),providesTags:["Notifications"]}),notificationDeleteAll:e.mutation({query:()=>({url:"/pimcore-studio/api/notifications",method:"DELETE"}),invalidatesTags:["Notifications"]}),notificationGetById:e.query({query:e=>({url:`/pimcore-studio/api/notifications/${e.id}`}),providesTags:["Notifications"]}),notificationReadById:e.mutation({query:e=>({url:`/pimcore-studio/api/notifications/${e.id}`,method:"POST"}),invalidatesTags:["Notifications"]}),notificationDeleteById:e.mutation({query:e=>({url:`/pimcore-studio/api/notifications/${e.id}`,method:"DELETE"}),invalidatesTags:["Notifications"]}),notificationSend:e.mutation({query:e=>({url:"/pimcore-studio/api/notifications/send",method:"POST",body:e.sendNotificationParameters}),invalidatesTags:["Notifications"]})}),overrideExisting:!1}),{useNotificationGetCollectionQuery:E,useNotificationDeleteAllMutation:I,useNotificationGetByIdQuery:P,useNotificationReadByIdMutation:M,useNotificationDeleteByIdMutation:D,useNotificationSendMutation:B}=N,{useNotificationDeleteByIdMutation:A,useNotificationDeleteAllMutation:L,useNotificationGetCollectionQuery:F,useNotificationGetByIdQuery:R}=N.enhanceEndpoints({addTagTypes:[_.fV.NOTIFICATION_DETAILS,_.fV.NOTIFICATIONS],endpoints:{notificationGetCollection:{providesTags:(e,t,i)=>{let n=[];return null==e||e.items.forEach(e=>{n.push(..._.Kx.NOTIFICATION(e.id))}),n}},notificationGetById:{providesTags:(e,t,i)=>_.Kx.NOTIFICATION_DETAIL(i.id)},notificationDeleteById:{invalidatesTags:(e,t,i)=>_.xc.NOTIFICATION(i.id)},notificationDeleteAll:{invalidatesTags:(e,t,i)=>_.xc.NOTIFICATIONS()}}}),U=()=>{let[e,t]=(0,o.useState)(1),[i,n]=(0,o.useState)(20),{data:r,isLoading:a,isError:l,error:s}=F((0,o.useMemo)(()=>({body:{filters:{page:e,pageSize:i,includeDescendants:!0}}}),[e,i,e])),[d,{isError:c,error:u,isLoading:p}]=L();return(0,o.useEffect)(()=>{l&&(0,v.ZP)(new v.MS(s))},[l]),(0,o.useEffect)(()=>{c&&(0,v.ZP)(new v.MS(u))},[c]),{notifications:r,isLoading:a,deleteNotificationsForUser:d,deleteLoading:p,page:e,setPage:t,pageSize:i,setPageSize:n}};var O=i(66003),z=i(99209),X=i(15391),q=i(34188),G=i(40439),V=i(78801),H=i(1753);let Z=e=>{let{id:t}=e,[i,n]=(0,o.useState)(!1),{data:r,isLoading:a,isError:l,error:s}=R(i?{id:t}:H.CN),[d,{isError:c,error:u,isLoading:p}]=A(),m=async()=>{await d({id:t})};return(0,o.useEffect)(()=>{l&&(0,v.ZP)(new v.MS(s))},[l]),(0,o.useEffect)(()=>{c&&(0,v.ZP)(new v.MS(u))},[c]),{notificationDetail:r,detailLoading:a,isExpanded:i,setIsExpanded:n,deleteNotification:m,deleteLoading:p}};var W=i(84666),J=i(31584);let K=(0,l.kc)(e=>{let{token:t,css:i}=e;return{unreadNotificationIcon:i`
        color: ${t.colorAccentSecondary};
        margin: 5px;
    `,margin:i`
        margin: 5px;
    `,elementTag:i`
        width: fit-content;
    `,notificationsList:i`
        width: 100%;
    `}});var Q=i(52490);let Y=e=>{let{attachmentId:t,attachmentType:i}=e,{styles:r}=K(),{openElement:a}=(0,Q.useElementHelper)(),{getElementById:l}=(0,Q.useElementApi)(i),[s,d]=(0,o.useState)(null);return((0,o.useEffect)(()=>{(async()=>{d(await l(t))})()},[t,l]),(null==s?void 0:s.fullPath)===void 0)?null:(0,n.jsxs)(J.Flex,{align:"center",className:r.elementTag,children:[(0,n.jsx)(J.ElementTag,{elementType:i,id:s.id,path:s.fullPath}),(0,n.jsx)(J.IconButton,{icon:{value:"open-folder"},onClick:async e=>{e.stopPropagation(),await a({type:i,id:s.id})},theme:"primary"})]})},ee=e=>{let{notification:t}=e,{isExpanded:i,setIsExpanded:r,notificationDetail:a,detailLoading:l,deleteNotification:s,deleteLoading:d}=Z({id:t.id}),{mapToElementType:c}=(0,Q.useElementHelper)(),u=(null==a?void 0:a.attachmentType)!==void 0?c(a.attachmentType):void 0,{styles:p}=K(),[m,g]=(0,o.useState)(t.read);(0,o.useEffect)(()=>{void 0!==a&&g(null==a?void 0:a.read)},[a]);let h={key:t.id.toString(),label:(0,n.jsxs)(J.Flex,{align:"center","justify-content":"center",children:[m?(0,n.jsx)(J.Icon,{className:p.margin,value:"notification-read"}):(0,n.jsx)(J.Icon,{className:p.unreadNotificationIcon,value:"notification-unread"}),(0,n.jsxs)(J.Split,{dividerSize:"small",size:"extra-small",theme:"secondary",children:[""!==t.title&&(0,n.jsx)(q.x,{strong:!0,children:t.title}),(0,n.jsx)(q.x,{type:"secondary",children:t.sender})]})]}),extra:(0,n.jsxs)(z.T,{align:"center","justify-content":"center",size:"extra-small",children:[t.hasAttachment&&(0,n.jsx)(J.Icon,{className:p.margin,value:"attachment"}),void 0!==t.creationDate&&(0,n.jsx)("span",{children:(0,X.o0)({timestamp:t.creationDate,dateStyle:"short",timeStyle:"medium"})}),(0,n.jsx)(W.h,{icon:{value:"trash"},loading:d,onClick:async e=>{e.stopPropagation(),await s()},theme:"primary"})]}),children:(0,n.jsx)(C.V,{loading:l,none:void 0===a||0===a.message.length,children:(0,n.jsxs)(J.Flex,{gap:0,vertical:!0,children:[void 0!==a&&"string"==typeof a.message&&(0,n.jsx)(G.n,{children:(0,O.MT)(a.message)}),(null==a?void 0:a.attachmentId)!==void 0&&void 0!==u&&(0,n.jsx)(Y,{attachmentId:a.attachmentId,attachmentType:u})]})})};return(0,n.jsx)(V.UO,{activeKeys:i?[t.id.toString()]:[],items:[h],onChange:e=>{e.length>0?r(!0):r(!1)}})},et=()=>{let{notifications:e}=U(),{styles:t}=K();return(0,n.jsx)(J.Space,{className:t.notificationsList,direction:"vertical",size:"small",children:null==e?void 0:e.items.map(e=>(0,n.jsx)(ee,{notification:e},e.id))})},ei=()=>{let{t:e}=(0,g.useTranslation)(),{notifications:t,isLoading:i,deleteNotificationsForUser:o,deleteLoading:r,page:a,setPage:l,setPageSize:s}=U();return(0,n.jsx)(S.D,{renderToolbar:(null==t?void 0:t.totalItems)!==0?(0,n.jsxs)(w.o,{justify:"space-between",theme:"secondary",children:[(0,n.jsx)(J.IconTextButton,{icon:{value:"trash"},onClick:()=>{o()},children:e("notifications.remove-all")}),(0,n.jsx)(T.t,{current:a,onChange:(e,t)=>{l(e),s(t)},showSizeChanger:!0,showTotal:t=>e("pagination.show-total",{total:t}),total:(null==t?void 0:t.totalItems)??0})]}):void 0,renderTopBar:(0,n.jsx)(w.o,{justify:"space-between",margin:{x:"mini",y:"none"},theme:"secondary",children:(0,n.jsx)(j.D,{children:e("notifications.label")})}),children:(0,n.jsx)(C.V,{loading:i||r,none:(null==t?void 0:t.totalItems)===0,children:(0,n.jsx)(k.x,{margin:{x:"extra-small",y:"none"},children:(0,n.jsx)(et,{})})})})},en={component:"notifications",name:"Notifications",id:"notifications",config:{translationKey:"notifications.label",icon:{type:"name",value:"notification-read"}}};y.registerModule({onInit:()=>{f.nC.get(b.j.widgetManager).registerWidget({name:"notifications",component:ei})}});var eo=i(84420),er=i(64957),ea=i(72551),el=i(77907),es=i(57196),ed=i(11556);let ec=()=>{let[e]=B();return{sendNotification:async(t,i)=>{let n=e({sendNotificationParameters:t});try{let e=await n;if(void 0!==e.error)return void(0,v.ZP)(new v.MS(e.error));void 0!==i&&i()}catch(e){(0,v.ZP)(new v.aE(e.message))}}}};var eu=i(7932),ep=i(91019);let em=e=>{let{onChange:t}=e,{data:i,isLoading:o}=(0,ep.useUserGetCollectionQuery)(),r=(null==i?void 0:i.items.map(e=>({label:e.username,value:e.id})))??[];return(0,n.jsx)(eu.P,{loading:o,onChange:t,options:r})};var eg=i(84348),eh=i(76693);let ex=e=>{let{open:t,...i}=e,{t:o}=(0,g.useTranslation)(),[r]=ea.l.useForm(),{sendNotification:a}=ec(),l=()=>{r.resetFields(),i.onClose()};return(0,n.jsx)(el.i,{okText:o("user-menu.notification.send"),onCancel:l,onOk:()=>{r.validateFields().then(()=>{var e,t;let i=r.getFieldsValue();a({recipientId:i.to,title:i.title,message:i.message,attachmentType:null==(e=i.attachment)?void 0:e.type,attachmentId:null==(t=i.attachment)?void 0:t.id},()=>{l()})}).catch(e=>{console.error("Validation failed:",e)})},open:t,size:"M",title:o("user-menu.notification.modal.send-a-notification"),zIndex:1e3,children:(0,n.jsx)(ed._v,{children:(0,n.jsxs)(ea.l,{form:r,layout:"vertical",children:[(0,n.jsx)(ea.l.Item,{label:o("user-menu.notification.modal.to"),name:"to",rules:[{required:!0,message:o("user-menu.notification.modal.form.validation.provide-recipient")}],children:(0,n.jsx)(em,{onChange:e=>{r.setFieldValue("to",e)}})}),(0,n.jsx)(ea.l.Item,{label:o("user-menu.notification.modal.title"),name:"title",rules:[{required:!0,message:o("user-menu.notification.modal.form.validation.provide-title")}],children:(0,n.jsx)(eg.I,{})}),(0,n.jsx)(ea.l.Item,{label:o("user-menu.notification.modal.message"),name:"message",rules:[{required:!0,message:o("user-menu.notification.modal.form.validation.provide-message")}],children:(0,n.jsx)(eh.K,{})}),(0,n.jsx)(ea.l.Item,{label:o("user-menu.notification.modal.add-an-attachment"),name:"attachment",children:(0,n.jsx)(es.A,{allowToClearRelation:!0,assetsAllowed:!0,dataObjectsAllowed:!0,documentsAllowed:!0})})]})})})};var ev=i(75052);let ef=e=>{let{className:t}=e,{t:i}=(0,g.useTranslation)(),{styles:r}=h(),[a,l]=(0,o.useState)(!1),[s]=(0,x._y)(),{openMainWidget:d}=(0,er.useWidgetManager)(),c=[{key:"title",label:(0,n.jsx)("div",{className:"user-menu__title",children:i("user-menu.title")}),type:"group"},{key:"notifications",label:i("user-menu.notifications"),icon:(0,n.jsx)(ev.C,{count:5}),onClick:()=>{d(en)},extra:(0,n.jsx)(eo.z,{className:"user-menu__item-extra",onClick:e=>{e.stopPropagation(),l(!0)},size:"small",children:i("user-menu.notification.send")})},{key:"myprofile",label:i("user-menu.my-profile"),icon:(0,n.jsx)(u.J,{value:"user"}),onClick:()=>{console.log("My Profile clicked")}},{key:"logout",label:i("user-menu.log-out"),icon:(0,n.jsx)(u.J,{value:"log-out"}),onClick:()=>{s().then(()=>{window.location.reload()}).catch(e=>{(0,v.ZP)(new v.MS(e))})}}];return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(m.L,{className:t,menu:{items:c},overlayClassName:[r.userMenu].join(" "),overlayStyle:{minWidth:275},children:(0,n.jsx)(p.Avatar,{icon:(0,n.jsx)(u.J,{value:"user"}),size:26})}),(0,n.jsx)(ex,{onClose:()=>{l(!1)},open:a})]})},eb=e=>{let{Component:t,context:i}=e;return(0,n.jsx)("li",{children:t},i.name)},ey=()=>{let{styles:e}=s();return(0,n.jsxs)("div",{className:e.leftSidebar,children:[(0,n.jsx)(ef,{className:"left-sidebar__avatar"}),(0,n.jsx)("ul",{className:"left-sidebar__nav",children:(0,n.jsx)(c.O,{onRenderComponent:(e,t)=>(0,n.jsx)(eb,{Component:e,context:t}),slot:d.O.leftSidebar.slot})})]})};var ej=i(86352);let ew=e=>{let t={zIndexPopup:e.zIndexPopupBase+50,cardBg:e.colorFillAlter,cardHeight:e.controlHeightLG,cardPadding:"",cardPaddingSM:`${1.5*e.paddingXXS}px ${e.padding}px`,cardPaddingLG:`${e.paddingXS}px ${e.padding}px ${1.5*e.paddingXXS}px`,titleFontSize:`${e.fontSize}px`,titleFontSizeLG:`${e.fontSizeLG}px`,titleFontSizeSM:`${e.fontSize}px`,inkBarColor:e.colorPrimary,horizontalMargin:`0 0 ${e.margin}px 0`,horizontalItemGutter:32,horizontalItemMargin:"",horizontalItemMarginRTL:"",horizontalItemPadding:`${e.paddingSM}px 0`,horizontalItemPaddingSM:`${e.paddingXS}px 0`,horizontalItemPaddingLG:`${e.padding}px 0`,verticalItemPadding:`${e.paddingXS}px ${e.paddingLG}px`,verticalItemMargin:`${e.margin}px 0 0 0`,itemSelectedColor:e.colorPrimary,itemHoverColor:e.colorPrimaryHover,itemActiveColor:e.colorPrimaryActive,cardGutter:e.marginXXS/2,...(null==e?void 0:e.Tabs)??{}};return{...t,tabsCardPadding:e.cardPadding??`${(t.cardHeight-Math.round(e.fontSize*e.lineHeight))/2-e.lineWidth}px ${e.paddingSM}px`,dropdownEdgeChildVerticalPadding:e.paddingXXS,tabsActiveTextShadow:"0 0 0.25px currentcolor",tabsDropdownHeight:200,tabsDropdownWidth:120,tabsHorizontalItemMargin:`0 0 0 ${e.horizontalItemGutter}px`,tabsHorizontalItemMarginRTL:`0 0 0 ${e.horizontalItemGutter}px`}},eS=(0,l.kc)(e=>{let{token:t,css:i}=e,n=ew(t);return{widgetManager:i`
        position: absolute;
        inset: 8px 6px 12px 6px;
  
        .flexlayout__layout {
          overflow: visible;
        }
  
        &.widget-manager--inner {
          inset: 0;
        }
  
        .flexlayout__tab_button_leading,
        .flexlayout__border_button_leading {
          display: none;
        }
  
        .flexlayout__tab_button {
          margin: 0;
          padding: ${t.paddingSM}px ${t.paddingSM}px;
          background: ${t.colorFillAlter};
          transition: all ${t.motionDurationSlow} ${t.motionEaseInOut};
          font-size: ${t.fontSize}px;
          color: ${n.itemColor};
          outline: none;
          gap: ${t.marginXXS}px;
        
          &:hover {
            background: ${t.Tabs.colorBgHoverUnselectedTab};
          }
  
          &_trailing {
            display: none;
          }
  
          &--selected {
            font-weight: ${t.fontWeightStrong};
            color: ${n.itemActiveColor};
            background: ${t.colorBgContainer};
            border-top: 2px solid ${t.Tabs.colorBorderActiveTab};

            .widget-manager__tab-title-close-button {
              display: block;
            }
  
            .widget-manager-tab-title {
              margin-top: -2px;
            }
  
            &:hover {
              background: ${t.colorBgContainer};
            }
          }

          .flexlayout__tab_button_trailing {
            margin-top: -2px;
            display: none;
          }
  
          &:focus:not(:focus-visible), &:active {
            color: ${n.itemActiveColor};
          }
  
          &:first-child {
            border-left: 1px solid ${t.Tabs.colorBorderContainer}66;
          }
        }
  
        .flexlayout__tabset_tab_divider {
          width: ${n.cardGutter}px;
        }
  
        .flexlayout__tab_button_top {
          border-radius: ${t.borderRadiusLG}px ${t.borderRadiusLG}px 0 0;
          border-bottom: 0;
        }
  
        .flexlayout__border_inner_tab_container {
          width: calc(100svh - 12px);
          justify-content: flex-end;
        }
  
        .flexlayout__border_inner_tab_container_left, .flexlayout__border_inner_tab_container_right {
          .flexlayout__border_tab_divider {
            width: 0;
          }
        }
  
        .flexlayout__splitter,
        .flexlayout__border,
        .flexlayout__tabset_tabbar_outer {
          background: transparent;
        }
  
        .flexlayout__tab {
          overflow: visible;
          background: ${t.colorBgContainer};
          box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.07), 2px 2px 0px 0px rgba(79, 78, 183, 0.05);
          border-bottom: 1px solid ${t.Tabs.colorBorderContainer}66;
          border-left: 1px solid ${t.Tabs.colorBorderContainer}66;
          border-radius: 0 8px 8px 8px;
        }

        .flexlayout__tab:not(.widget-manager-inner-container) {
          overflow: hidden;
        }
      
        .flexlayout__tab_border {
          box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.07), 2px 2px 0px 0px rgba(79, 78, 183, 0.05);
          border-top: 1px solid ${t.Tabs.colorBorderContainer}66;
          border-right: 1px solid ${t.Tabs.colorBorderContainer}66;
          border-bottom: 1px solid ${t.Tabs.colorBorderContainer}66;
          border-left: 1px solid ${t.Tabs.colorBorderContainer}66;
          border-radius: 8px;
        }
  
        .widget-manager-inner-container {
          background: transparent;
          box-shadow: none;
          border: 0;
        }
  
        .flexlayout__tabset {
          overflow: visible;
          border-radius: ${t.borderRadius}px;
          font-family: ${t.fontFamily};
  
          &, &-selected {
            background: transparent;
          }
        }
  
        .flexlayout__border {
          font-family: ${t.fontFamily};
        }
  
        .flexlayout__border_button {
          margin: 0 0 6px 0;
          background: transparent;
          width: 40px;
          justify-content: center;
          border-radius: ${t.borderRadiusSM}px;
          transition: all ${t.motionDurationSlow} ${t.motionEaseInOut};
  
          &--selected {
            color: ${n.itemActiveColor};
            border-top: 1.5px solid ${t.colorBorderActive};
            background: ${t.controlItemBgHover};
          }
        }
  
        @media (hover: hover) {
          .flexlayout__border_button--unselected:hover {
            color: ${t.colorTextSecondary}; 
            background: ${t.controlItemBgActiveHover};
          }
          
          .flexlayout__tab_button--selected:hover {
            color: ${n.itemActiveColor};
            background: ${t.colorBgContainer};
          }
        }
  
        .flexlayout__border_button_trailing {
          display: none;
        }
  
        .flexlayout__border_left {
          border-right: 0;
  
          .flexlayout__border_button_content {
            transform: rotate(90deg);
          }
        }
  
        .flexlayout__border_right {
          border-left: 0;
  
          .flexlayout__border_button_content {
            transform: rotate(-90deg);
          }
        }
  
        .flexlayout__tabset_tabbar_outer_top {
          border: 0;
        }
  
        .flexlayout__tabset_tabbar_inner_tab_container {
          padding-left: 0;
        }
  
        .flexlayout__border_toolbar {
          display: none;
        }

        .widget-manager__tab-title-close-button {
          display: none;
          width: 12px;
          height: 12px;
          padding: 4px;
          line-height: 0;
          margin-top: -8px;
          color: ${t.colorIcon};
        }
      `}},{hashPriority:"low"});var eT=i(96486),eC=i(81354),ek=i(9149);let e_=(e,t)=>{let[i,r]=(0,o.useState)(null),a=(0,o.useRef)(null),{closeWidget:l}=(0,eC.useWidgetManager)(),s=()=>{r(null)};(0,ek.O)(a,s);let d=(0,o.useMemo)(()=>null===i||(0,eT.isUndefined)(t)?[]:t({contextMenuState:i,closeContextMenu:s,model:e,closeWidget:l}),[i,t,e,l]),c=null===i||(0,eT.isUndefined)(t)?null:(0,n.jsx)(m.L,{menu:{items:d},menuRef:a,open:!0,overlayStyle:{position:"absolute",left:i.x,top:i.y},children:(0,n.jsx)("span",{})});return void 0===t?{}:{showContextMenu:(e,t)=>{e instanceof ej.TabNode&&(t.preventDefault(),r({x:t.clientX,y:t.clientY,tabNode:e}),e.getExtraData())},dropdown:c}},e$=e=>{let{className:t,createContextMenuItems:i,...o}=e,{styles:r}=eS(),{showContextMenu:a,dropdown:l}=e_(o.model,i);return(0,n.jsxs)("div",{className:["widget-manager",t,r.widgetManager].join(" "),children:[(0,n.jsx)(ej.Layout,{...o,onContextMenu:a}),l]})};var eN=i(19505),eE=i(46309),eI=i(98482),eP=i(92430);let eM=e=>{let{node:t}=e,i=t.getComponent(),o=(0,f.$1)(b.j.widgetManager).getWidget(i),r=(0,n.jsx)(eP.X,{modified:!1,node:t});return(null==o?void 0:o.titleComponent)!==void 0&&(r=(0,n.jsx)(o.titleComponent,{node:t})),(0,n.jsxs)(n.Fragment,{children:[" ",r," "]})};var eD=i(20994);let eB=e=>{let{contextMenuState:t,closeContextMenu:i,model:n,closeWidget:o}=e;return[{key:"close-tab",label:(0,eD.t)("close-tab"),onClick:()=>{null!==t&&(o(t.tabNode.getId()),i())}},{key:"close-others",label:(0,eD.t)("close-others"),onClick:()=>{if(null!==t){var e;null==(e=n.getActiveTabset())||e.getChildren().forEach(e=>{e.getId()!==t.tabNode.getId()&&o(e.getId())}),i()}}},{key:"close-unmodified",label:(0,eD.t)("close-unmodified"),onClick:()=>{if(null!==t){var e;let t=f.nC.get(b.j.widgetManager);null==(e=n.getActiveTabset())||e.getChildren().forEach(e=>{let i=t.getWidget(e.getComponent()??""),n=null==i?void 0:i.isModified;void 0!==n&&n(e)||o(e.getId())}),i()}}},{key:"close-all",label:(0,eD.t)("close-all"),onClick:()=>{if(null!==t){var e;null==(e=n.getActiveTabset())||e.getChildren().forEach(e=>{o(e.getId())}),i()}}}]},eA=(0,o.memo)(()=>{let e=(0,eE.CG)(eI.FP),t=(0,eE.TL)(),i=ej.Model.fromJson(e);return(0,o.useEffect)(()=>{i.doAction(ej.Actions.updateModelAttributes({tabSetTabStripHeight:34,tabSetTabHeaderHeight:34,borderBarSize:50}))},[]),(0,o.useEffect)(()=>{var e;let n=null==(e=i.getActiveTabset())?void 0:e.getSelectedNode();void 0!==n?t((0,eI.CM)({nodeId:n.getId()})):t((0,eI.CM)(null))},[i]),(0,n.jsx)(e$,{className:"widget-manager--inner",createContextMenuItems:eB,factory:eL,model:i,onModelChange:function(e){t((0,eI.az)(e.toJson()))},onRenderTab:function(e,t){t.content=(0,n.jsx)(eM,{node:e}),t.leading=(0,n.jsx)(n.Fragment,{})}})}),eL=e=>{if("inner-widget-manager"===e.getComponent())return(0,n.jsx)(eA,{});let t=f.nC.get(b.j.widgetManager),i=e.getComponent();if(void 0===i)return;let o=t.getWidget(i);if(void 0===o)return void(0,v.ZP)(new v.aE(`Widget ${i} not found`));let{component:r}=o;return(0,n.jsx)(eN.H,{component:r,node:e})},eF=()=>{let e=(0,eE.CG)(eI.w9),t=(0,eE.TL)(),i=ej.Model.fromJson(e),o=i.getNodeById("bottom_tabset");return i.doAction(ej.Actions.updateModelAttributes({tabSetTabStripHeight:34,tabSetTabHeaderHeight:34,borderBarSize:50})),0===o.getChildren().length?i.doAction(ej.Actions.updateNodeAttributes(o.getId(),{height:-8})):-8===o.getHeight()&&i.doAction(ej.Actions.updateNodeAttributes(o.getId(),{height:34})),(0,n.jsx)(e$,{factory:eL,model:i,onModelChange:function(e){t((0,eI.jy)(e.toJson()))},onRenderTab:function(e,t){t.content=(0,n.jsx)(eP.X,{node:e}),t.leading=(0,n.jsx)(n.Fragment,{})}})};var eR=i(41912);let eU=(0,l.kc)(e=>{let{token:t,css:i}=e;return{rightSidebar:i`
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      pointer-events: none;

      .logo 
    `}},{hashPriority:"low"}),eO=()=>{let{styles:e}=eU();return(0,n.jsx)("div",{className:e.rightSidebar,children:(0,n.jsx)(eR.T,{})})},ez=(0,l.kc)(e=>{let{token:t,css:i}=e;return{baseLayout:i`
      position: absolute;
      overflow: hidden;
      inset: 0;
    `}},{hashPriority:"low"});var eX=i(61708),eq=i(17584),eG=i(47588),eV=i(54275),eH=i(7828),eZ=i(45980),eW=i(73357),eJ=i(832);let eK=(0,l.kc)(e=>{let{css:t}=e;return{buttonStyle:t`
      padding-left: 2px;
      padding-right: 2px;
      text-transform: capitalize;
    `}}),eQ=e=>{var t,i,o;let{styles:r}=eK(),{t:a}=(0,g.useTranslation)(),l=(0,eT.isUndefined)(e.step)||(0,eT.isUndefined)(e.totalSteps)?void 0:(0,n.jsxs)("strong",{children:[a("jobs.job.step_hint",{step:e.step,total:e.totalSteps}),": "]});return(0,n.jsx)("div",{children:(0,n.jsx)(eW.M,{children:(0,n.jsxs)(eJ.E.div,{animate:{opacity:1,height:"auto"},exit:{opacity:0,height:1},initial:{opacity:0,height:1},children:[e.status===eG.B.QUEUED&&(0,n.jsx)(p.Flex,{align:"center",justify:"space-between",children:(0,n.jsxs)(p.Flex,{align:"center",gap:"small",children:[(0,n.jsx)(eZ.y,{type:"classic"}),(0,n.jsx)("span",{children:a("jobs.job.queued",{title:e.title})})]})}),e.status===eG.B.RUNNING&&(0,n.jsx)(eH.c,{description:(0,n.jsxs)(n.Fragment,{children:[l,a("jobs.job.in-progress",{title:e.title})]}),percent:e.progress,progressStatus:a("jobs.job.progress",{progress:e.progress})}),e.status===eG.B.SUCCESS&&(0,n.jsxs)(p.Flex,{align:"center",justify:"space-between",children:[(0,n.jsxs)(p.Flex,{align:"center",gap:"small",children:[(0,n.jsx)(u.J,{value:"check-circle"}),(0,n.jsx)("span",{children:a("jobs.job.finished",{title:e.title})})]}),(0,n.jsx)(p.Flex,{gap:"small",children:null==(t=e.successButtonActions)?void 0:t.map((e,t)=>(0,n.jsx)(p.Button,{className:r.buttonStyle,onClick:e.handler,type:"link",children:e.label},t))})]}),e.status===eG.B.FINISHED_WITH_ERRORS&&(0,n.jsxs)(p.Flex,{align:"center",justify:"space-between",children:[(0,n.jsxs)(p.Flex,{align:"center",gap:"small",children:[(0,n.jsx)(u.J,{value:"warning-circle"}),(0,n.jsx)("span",{children:a("jobs.job.finished-with-errors",{title:e.title})})]}),(0,n.jsx)(p.Flex,{gap:"small",children:null==(i=e.finishedWithErrorsButtonActions)?void 0:i.map((e,t)=>(0,n.jsx)(p.Button,{className:r.buttonStyle,onClick:e.handler,type:"link",children:e.label},t))})]}),e.status===eG.B.FAILED&&(0,n.jsxs)(p.Flex,{align:"center",justify:"space-between",children:[(0,n.jsxs)(p.Flex,{align:"center",gap:"small",children:[(0,n.jsx)(u.J,{value:"x-circle"}),(0,n.jsx)("span",{children:a("jobs.job.failed",{title:e.title})})]}),(0,n.jsx)(p.Flex,{gap:"small",children:null==(o=e.failureButtonActions)?void 0:o.map((e,t)=>(0,n.jsx)(p.Button,{className:r.buttonStyle,onClick:e.handler,type:"link",children:e.label},t))})]})]},e.status)})})},eY=e=>{let{id:t,topics:i,status:r,action:a}=e,{open:l,close:s}=(0,eV.useServerSideEvent)({topics:i,messageHandler:function(e){let t=JSON.parse(e.data);t.jobRunId===m.current&&(void 0!==t.progress&&c(t.progress),void 0!==t.status&&x(t))},openHandler:function(){a().then(e=>{m.current=e}).catch(console.error)}}),[d,c]=(0,o.useState)(0),{updateJob:u,removeJob:p}=(0,eX.useJobs)(),m=(0,o.useRef)(),{t:h}=(0,g.useTranslation)();(0,o.useEffect)(()=>{eG.B.QUEUED===r&&(u(t,{status:eG.B.RUNNING}),l())},[]);let x=e=>{"finished"===e.status&&(u(t,{status:eG.B.SUCCESS}),s()),"failed"===e.status&&(u(t,{status:eG.B.FAILED}),s())};return(0,n.jsx)(eQ,{failureButtonActions:[{label:h("jobs.job.button-retry"),handler:()=>{u(t,{status:eG.B.QUEUED}),l()}},{label:h("jobs.job.button-hide"),handler:()=>{p(t)}}],successButtonActions:[{label:h("jobs.job.button-hide"),handler:()=>{p(t)}}],...e,progress:d})},e0=e=>{let t=(0,f.$1)(b.j["ExecutionEngine/JobComponentRegistry"]).getComponentByType(e.type)??eY;return(0,n.jsx)(t,{...e})},e1=(0,l.kc)(e=>{let{css:t,token:i}=e;return{jobList:t`
      &.ant-collapse>.ant-collapse-item >.ant-collapse-header {
        padding: ${i.paddingXXS}px 0;
      }

      &.ant-collapse-ghost >.ant-collapse-item >.ant-collapse-content >.ant-collapse-content-box {
        padding: ${i.paddingXXS}px 0;
      }
    `}}),e8=()=>{let{jobs:e}=(0,eX.useJobs)(),{styles:t}=e1(),{t:i}=(0,g.useTranslation)(),r={key:"1",label:(0,n.jsx)("span",{children:i("jobs.notification.jobs",{count:e.length})}),children:(0,n.jsx)(eW.M,{children:e.map(e=>(0,n.jsx)(eJ.E.div,{animate:{opacity:1,height:"auto"},exit:{opacity:0,height:1},initial:{opacity:0,height:1},children:(0,o.createElement)(e0,{...e,key:e.id})},`${e.id}`))}),...0===e.length&&{disabled:!0}};return(0,n.jsx)(V.UO,{bordered:!1,className:t.jobList,defaultActiveKeys:[r.key],hasContentSeparator:!1,items:[r]})},e6=()=>{let{jobs:e}=(0,eX.useJobs)(),t=e.length>0,[i]=(0,eq.l)(),{t:r}=(0,g.useTranslation)();return(0,o.useEffect)(()=>{t&&i.open({message:r("jobs.notification.title"),description:(0,n.jsx)(e8,{}),duration:0,closable:!1,placement:"bottomRight"}),t||i.destroy()},[t]),(0,n.jsx)(n.Fragment,{})},e2=()=>{let{styles:e}=ez();return(0,n.jsxs)("div",{className:["base-layout",e.baseLayout].join(" "),children:[(0,n.jsx)(ey,{}),(0,n.jsx)(eF,{}),(0,n.jsx)(e6,{}),(0,n.jsx)(eO,{})]})};var e5=i(65921),e4=i(91030),e7=i(71098);let e9=()=>{var e,t,i;let n=(0,r.TH)(),{openElement:o}=(0,e7.useElementHelper)();if((null==n||null==(e=n.state)?void 0:e.isDeeplink)===!0){let e=null==n||null==(t=n.state)?void 0:t.id,r=null==n||null==(i=n.state)?void 0:i.elementType;(async()=>{(0,eT.isEmpty)(e)||(0,eT.isEmpty)(r)||await o({id:Number(e),type:r})})().catch(()=>{(0,v.ZP)(new v.aE("An Error occured while opening the Element"))})}},e3=$.h.enhanceEndpoints({addTagTypes:["User Management"]}).injectEndpoints({endpoints:e=>({userCloneById:e.mutation({query:e=>({url:`/pimcore-studio/api/user/clone/${e.id}`,method:"POST",body:e.body}),invalidatesTags:["User Management"]}),userCreate:e.mutation({query:e=>({url:"/pimcore-studio/api/user/",method:"POST",body:e.body}),invalidatesTags:["User Management"]}),userFolderCreate:e.mutation({query:e=>({url:"/pimcore-studio/api/user/folder",method:"POST",body:e.body}),invalidatesTags:["User Management"]}),userGetCurrentInformation:e.query({query:()=>({url:"/pimcore-studio/api/user/current-user-information"}),providesTags:["User Management"]}),userGetById:e.query({query:e=>({url:`/pimcore-studio/api/user/${e.id}`}),providesTags:["User Management"]}),userUpdateById:e.mutation({query:e=>({url:`/pimcore-studio/api/user/${e.id}`,method:"PUT",body:e.updateUser}),invalidatesTags:["User Management"]}),userDeleteById:e.mutation({query:e=>({url:`/pimcore-studio/api/user/${e.id}`,method:"DELETE"}),invalidatesTags:["User Management"]}),userFolderDeleteById:e.mutation({query:e=>({url:`/pimcore-studio/api/user/folder/${e.id}`,method:"DELETE"}),invalidatesTags:["User Management"]}),userDefaultKeyBindings:e.query({query:()=>({url:"/pimcore-studio/api/users/default-key-bindings"}),providesTags:["User Management"]}),userGetAvailablePermissions:e.query({query:()=>({url:"/pimcore-studio/api/user/available-permissions"}),providesTags:["User Management"]}),userGetCollection:e.query({query:()=>({url:"/pimcore-studio/api/users"}),providesTags:["User Management"]}),userResetPassword:e.mutation({query:e=>({url:"/pimcore-studio/api/user/reset-password",method:"POST",body:e.resetPassword}),invalidatesTags:["User Management"]}),pimcoreStudioApiUserSearch:e.query({query:e=>({url:"/pimcore-studio/api/user/search",params:{searchQuery:e.searchQuery}}),providesTags:["User Management"]}),userUpdateActivePerspective:e.mutation({query:e=>({url:`/pimcore-studio/api/user/active-perspective/${e.perspectiveId}`,method:"PUT"}),invalidatesTags:["User Management"]}),userUpdatePasswordById:e.mutation({query:e=>({url:`/pimcore-studio/api/user/${e.id}/password`,method:"PUT",body:e.body}),invalidatesTags:["User Management"]}),userUpdateProfile:e.mutation({query:e=>({url:"/pimcore-studio/api/user/update-profile",method:"PUT",body:e.updateUserProfile}),invalidatesTags:["User Management"]}),userUploadImage:e.mutation({query:e=>({url:`/pimcore-studio/api/user/upload-image/${e.id}`,method:"POST",body:e.body}),invalidatesTags:["User Management"]}),userGetImage:e.query({query:e=>({url:`/pimcore-studio/api/user/image/${e.id}`}),providesTags:["User Management"]}),userGetTree:e.query({query:e=>({url:"/pimcore-studio/api/users/tree",params:{parentId:e.parentId}}),providesTags:["User Management"]})}),overrideExisting:!1}),{useUserCloneByIdMutation:te,useUserCreateMutation:tt,useUserFolderCreateMutation:ti,useUserGetCurrentInformationQuery:tn,useUserGetByIdQuery:to,useUserUpdateByIdMutation:tr,useUserDeleteByIdMutation:ta,useUserFolderDeleteByIdMutation:tl,useUserDefaultKeyBindingsQuery:ts,useUserGetAvailablePermissionsQuery:td,useUserGetCollectionQuery:tc,useUserResetPasswordMutation:tu,usePimcoreStudioApiUserSearchQuery:tp,useUserUpdateActivePerspectiveMutation:tm,useUserUpdatePasswordByIdMutation:tg,useUserUpdateProfileMutation:th,useUserUploadImageMutation:tx,useUserGetImageQuery:tv,useUserGetTreeQuery:tf}=e3,{useUserGetCurrentInformationQuery:tb}=e3.enhanceEndpoints({addTagTypes:[_.fV.CURRENT_USER_INFORMATION],endpoints:{userGetCurrentInformation:{providesTags:(e,t,i)=>_.Kx.CURRENT_USER_INFORMATION()}}});var ty=i(63458);let tj=()=>{let e=(0,eE.CG)(ty.vN),t=(0,eE.TL)(),{isError:i,error:n,isSuccess:r,refetch:a}=tb(void 0,{skip:void 0!==e});return(0,o.useEffect)(()=>{i&&t((0,ty.oJ)(!1)),r&&t((0,ty.oJ)(!0))},[i,r,n]),{isAuthenticated:e,recheck:()=>{a()}}};var tw=i(82179),tS=i(48497),tT=i(61251);let tC=`${tT.G}/pimcore-statistics`,tk=async e=>{try{let t=await fetch(tC,{method:"GET",headers:{"X-Requested-With":"XMLHttpRequest"}});if(t.ok){let i=await t.json();e&&await fetch("https://license.pimcore.com/statistics",{method:"POST",body:new URLSearchParams({data:encodeURIComponent(JSON.stringify(i))})})}}catch(e){console.error("Error while sending statistics: ",e)}},t_=(0,l.kc)(e=>{let{token:t,css:i}=e;return{loginPage:i`
      display: flex;
      align-items: center;
      background: url(/bundles/pimcorestudioui/img/login-bg.png) lightgray 50% / cover no-repeat;
      position: absolute;
      inset: 0;
      overflow: hidden;
    `,loginWidget:i`
      display: flex;
      flex-direction: column;
      width: 503px;
      height: 608px;
      flex-shrink: 0;
      border-radius: 8px;
      background: linear-gradient(335deg, rgba(255, 255, 255, 0.86) 1.72%, rgba(57, 14, 97, 0.86) 158.36%);
      padding: 83px 100px 0 100px;
      margin-left: 80px;
      
      /* Component/Button/primaryShadow */
      box-shadow: 0px 2px 0px 0px rgba(114, 46, 209, 0.10);
      
      img {
        margin-bottom: 50px
      }
    `}});var t$=i(79655);let tN=tT.e.baseUrl.endsWith("/")?tT.e.baseUrl.slice(0,-1)+"/":tT.e.baseUrl,tE=`${tN}login/`,tI=`${tN}:elementType/:id`,tP={root:tN,login:tE,deeplinkAsset:tI},tM=e=>{let{children:t}=e,{isAuthenticated:i}=tj(),o=(0,r.TH)();return(0,n.jsxs)(n.Fragment,{children:[!0===i&&t,!1===i&&(0,n.jsx)(r.Fg,{state:{from:o},to:tP.login})]})},tD=(0,t$.aj)([{path:tP.root,element:(0,n.jsx)(tM,{children:(0,n.jsx)(()=>{e9();let e=e=>{e.preventDefault()};return(0,n.jsxs)("div",{onDragOver:e,onDrop:e,children:[(0,n.jsx)(a.A,{}),(0,n.jsx)(e5.d,{children:(0,n.jsx)(e4.Be,{children:(0,n.jsx)(e2,{})})})]})},{})})},{path:tP.login,element:(0,n.jsx)(()=>{let e=(0,r.s0)(),t=(0,r.TH)(),i=(0,tS.a)(),{isAuthenticated:a}=tj(),{styles:l}=t_();return(0,o.useEffect)(()=>{!0===a&&(async()=>{var n,o;e((null==t||null==(o=t.state)||null==(n=o.from)?void 0:n.pathname)??tP.root),await tk(i.isAdmin)})().catch(()=>{})},[a]),(0,n.jsx)("div",{className:l.loginPage,children:(0,n.jsxs)("div",{className:l.loginWidget,children:[(0,n.jsx)("img",{alt:"Pimcore Logo",src:"/bundles/pimcorestudioui/img/logo.png"}),(0,n.jsx)(tw.U,{})]})})},{})},{path:tP.deeplinkAsset,element:(0,n.jsx)(tM,{children:(0,n.jsx)(()=>{let{elementType:e,id:t}=(0,r.useParams)(),i=(0,r.s0)();return(0,o.useEffect)(()=>{i(tP.root,{state:{isDeeplink:!0,id:t,elementType:e}})},[t,e]),(0,n.jsx)(n.Fragment,{})},{})})}])},31600:function(e,t,i){i.d(t,{A:()=>r});var n=i(85893);i(81004);let o=(0,i(10781).kc)(e=>{let{token:t,css:i}=e;return{background:i`
      position: absolute;
      inset: 0;
      background: #FFF;
      overflow: hidden; 
      opacity: 0.3;

      .background-figure {
        position: absolute;

        &--top-left {
          top: -80%;
          left: -30%;
          width: 1324px;
          height: 1324px;
          transform: rotate(65.637deg);
          flex-shrink: 0;
          border-radius: var(--Components-Input-Component-paddingBlockSM, 1324px);
          background: rgba(55, 217, 243, 0.20);
          filter: blur(310px);
        }


        &--bottom-left {
          width: 651.152px;
          height: 1503.398px;
          transform: rotate(28.303deg);
          flex-shrink: 0;
          border-radius: var(--Components-Input-Component-paddingBlockSM, 1503.398px);
          background: #FDFFFF;
          filter: blur(310px);
        }

        &--bottom-right {
          left: 11%;
          width: 1642px;
          height: 686px;
          transform: rotate(65.637deg);
          flex-shrink: 0;
          border-radius: var(--Components-Input-Component-paddingBlockSM, 1642px);
          background: rgba(122, 58, 212, 0.42);
          filter: blur(310px);
        }
      }
    `}},{hashPriority:"low"}),r=()=>{let{styles:e}=o();return(0,n.jsxs)("div",{className:e.background,children:[(0,n.jsx)("div",{className:"background-figure background-figure--bottom-left"}),(0,n.jsx)("div",{className:"background-figure background-figure--bottom-right"}),(0,n.jsx)("div",{className:"background-figure background-figure--top-left"})]})}},75052:function(e,t,i){i.d(t,{C:()=>r});var n=i(85893);i(81004);var o=i(26788);let r=e=>{let{color:t,...i}=e;return(0,n.jsx)(o.Badge,{color:t,styles:{indicator:{outline:`1px solid ${t}`},root:{marginRight:"5px"}},...i})}},57732:function(e,t,i){i.d(t,{U:()=>h});var n=i(85893),o=i(81004);let r=(0,i(10781).kc)(e=>{let{token:t,css:i}=e;return{toolbar:i`
      display: flex;
      align-items: center;
      gap: 8px;

      .element-toolbar__info-dropdown {
        .ant-dropdown-trigger {
          display: flex;
          align-items: center;
          gap: 4px;
          border: 1px solid ${t.colorBorder};
          background: ${t.colorFillTertiary};
          color: ${t.colorText};

          .ant-btn-icon.ant-btn-icon-end {
            margin-left: 0;
          }

          &:hover .pimcore-icon {
            color: ${t.colorIconHover};
          }
        }
      }
        
      .pimcore-icon {
        color: ${t.colorIcon};
      }
    `}});var a=i(26788),l=i(82717),s=i(55859),d=i(28372),c=i(95461),u=i(45921),p=i(74976),m=i(84666),g=i(20946);let h=e=>{let{id:t,elementType:i,editorTabsWidth:h}=e,{t:x}=(0,p.useTranslation)(),v=(0,o.useRef)(null),{styles:f}=r(),{element:b}=(0,c.useElementDraft)(t,i),y=`${window.location.origin}${u.FH}${i}/${t}`,[j,w]=(0,o.useState)(null),[S,T]=(0,o.useState)(!1),{locateInTree:C}=(0,g.useLocateInTree)(i);if((0,o.useLayoutEffect)(()=>{null!=h&&(h<=800?w("S"):w("L"))},[h]),void 0===b)return(0,n.jsx)(n.Fragment,{});let k=[{key:"1",label:x("element.toolbar.copy-id",{id:b.id}),onClick:()=>{navigator.clipboard.writeText(b.id.toString())}},{key:"2",label:x("element.toolbar.copy-full-path-to-clipboard"),onClick:()=>{navigator.clipboard.writeText(b.fullPath)}},{key:"3",label:x("element.toolbar.copy-deep-link-to-clipboard"),onClick:()=>{navigator.clipboard.writeText(y)}}];return"data-object"===i&&"className"in b&&(null==k||k.splice(0,0,{key:"0",label:x("element.toolbar.copy-className",{className:b.className}),onClick:()=>{navigator.clipboard.writeText(b.className)}})),(0,n.jsxs)("div",{className:f.toolbar,ref:v,children:[(0,n.jsx)(d.a,{editorTabsWidth:h,elementType:i,pageSize:j,path:b.fullPath}),(0,n.jsx)("div",{className:"element-toolbar__info-dropdown",children:(0,n.jsx)(l.L,{menu:{items:k},children:(0,n.jsx)(a.Button,{icon:(0,n.jsx)(s.J,{value:"chevron-down"}),iconPosition:"end",onClick:()=>{navigator.clipboard.writeText(b.id.toString())},size:"small",children:(0,n.jsxs)(a.Space,{children:["ID: ",b.id]})})})}),(0,n.jsx)(m.h,{icon:{value:"target"},loading:S,onClick:()=>{T(!0),C(b.id,()=>{T(!1)})}})]})}},4884:function(e,t,i){i.d(t,{A:()=>o});var n=i(81004);let o=i.n(n)().createContext(void 0)},342:function(e,t,i){i.d(t,{E:()=>r});var n=i(85893);i(81004);var o=i(26788);let r=e=>(0,n.jsx)(o.Image,{...e})},82179:function(e,t,i){i.d(t,{U:()=>h});var n=i(85893),o=i(26788),r=i(84420),a=i(81004);let l=(0,i(10781).kc)(e=>{let{token:t,css:i}=e;return{form:i`
      form {
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-family: Lato, sans-serif;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;

        .flex-space {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ant-btn-link {
          color: ${t.colorPrimary};

          &:hover {
            color: ${t.colorPrimaryHover};
          }
        }
      }
        
      .login__additional-logins {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        
        .ant-btn {
          width: 100%;
        }
      }
    `}});var s=i(81722),d=i(44433),c=i(74976),u=i(55859),p=i(45981),m=i(66660),g=i(63458);let h=e=>{let{additionalLogins:t}=e,i=(0,s.I0)(),{styles:h}=l(),x=(0,d.U)(),{t:v}=(0,c.useTranslation)(),[f,b]=(0,a.useState)({username:"",password:""}),[y]=(0,p.YA)(),[j,w]=(0,a.useState)(!1),S=async e=>{let t=y({credentials:f});w(!0),t.catch(e=>{w(!1),(0,m.ZP)(new m.MS(e))});try{e.preventDefault();let n=await t;void 0!==n.error&&(0,m.ZP)(new m.MS(n.error)),w(!1),i((0,g.oJ)(!0))}catch(e){w(!1),await x.error({content:e.message})}};return(0,n.jsxs)("div",{className:h.form,children:[(0,n.jsxs)("form",{onSubmit:S,children:[(0,n.jsx)(o.Input,{onChange:e=>{b({...f,username:e.target.value})},placeholder:v("login-form.username"),prefix:(0,n.jsx)(u.J,{value:"user"})}),(0,n.jsx)(o.Input.Password,{onChange:e=>{b({...f,password:e.target.value})},placeholder:v("login-form.password")}),(0,n.jsxs)("div",{className:"flex-space",children:[(0,n.jsx)(o.Checkbox,{"aria-label":v("aria.login-form-additional-logins.remember-me-checkbox"),children:v("login-form.remember-me")}),(0,n.jsx)(r.z,{type:"link",children:v("login-form.forgot-password")})]}),(0,n.jsx)(r.z,{htmlType:"submit",loading:j,type:"primary",children:v("login-form.login")})]}),Array.isArray(t)&&(0,n.jsxs)("div",{className:"login__additional-logins",children:[(0,n.jsx)("p",{children:v("login-form-additional-logins.or")}),null==t?void 0:t.map(e=>(0,n.jsx)(r.z,{"aria-label":`${v("aria.login-form-additional-logins.additional-login-provider")} ${e.name}`,href:e.link,type:"primary",children:e.name},e.key))]})]})}},41912:function(e,t,i){i.d(t,{T:()=>a});var n=i(85893);i(81004);let o=e=>(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",...e,children:(0,n.jsx)("path",{fill:"#5520A6",d:"M19 7c-1.7 0-3.2.8-4.2 2.2l-3.7 5.5C10.2 16.2 8.7 17 7 17c-2.8 0-5-2.2-5-5s2.2-5 5-5c1.7 0 3.2.8 4.2 2.2l.6 1L13 8.4l-.2-.3C11.5 6.2 9.3 5 7 5c-3.9 0-7 3.1-7 7s3.1 7 7 7c2.3 0 4.5-1.2 5.8-3.1l1.4-2.1.6 1c.9 1.4 2.5 2.2 4.2 2.2 2.8 0 5-2.2 5-5s-2.2-5-5-5m0 8c-1 0-1.9-.5-2.5-1.3L15.4 12l1.1-1.6C17 9.5 18 9 19 9c1.7 0 3 1.3 3 3s-1.3 3-3 3"})}),r=(0,i(10781).kc)(e=>{let{token:t,css:i}=e;return{logo:i`
      padding: 13px 16px 0 16px;
    `}},{hashPriority:"low"}),a=()=>{let{styles:e}=r();return(0,n.jsx)("div",{className:["logo",e.logo].join(" "),children:(0,n.jsx)(o,{color:"#333",fill:"#ff0000",height:24,width:24})})}},17584:function(e,t,i){i.d(t,{l:()=>r});var n=i(26788);let o=(0,i(10781).kc)(e=>{let{token:t,css:i}=e;return{notification:i`
      .ant-notification-notice-content {          
        .ant-notification-notice-message {
            color: ${t.colorText};
            font-size: 16px !important;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
            margin-bottom: ${t.marginXS}
        }
      }
    `}},{hashPriority:"low"}),r=()=>{let{notification:e}=n.App.useApp(),t={...e},{styles:i}=o();return t.open=t=>{e.open({...t,className:i.notification})},[t]}},4602:function(e,t,i){i.d(t,{s:()=>r});var n=i(85893);i(81004);let o=(0,i(10781).kc)(e=>{let{token:t,css:i}=e;return{"document-container":i`
      width: 100%;
      height: 100%;
      .loading-div {
        position: absolute;
        top: calc(50% - 11px);
        left: calc(50% - 8px);
      }
      
      .display-none {
        display: none;
      }
    `}},{hashPriority:"low"}),r=e=>{let{src:t,className:i}=e,{styles:r}=o();return(0,n.jsx)("div",{className:[r["document-container"],i].join(" "),children:(0,n.jsx)("iframe",{src:t,title:t})})}},99261:function(e,t,i){i.d(t,{o:()=>L});var n=i(85893),o=i(81004),r=i.n(o),a=i(74976),l=i(10781);(0,l.kc)(e=>{let{token:t,css:i}=e;return{preview:i`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      object-fit: contain;

      video {
        display: flex;
        max-height: 70%;
        max-width: 70%;
      }
    `}},{hashPriority:"low"});var s=i(89020);i(70302);class d{getEntries(){return this.entries}getEntry(e){return this.entries.find(t=>t.key===e)}registerEntry(e){if(void 0!==this.getEntry(e.key))return void this.entries.splice(this.entries.findIndex(t=>t.key===e.key),1,e);this.entries.push(e)}getButtons(){return this.buttons}getButton(e){return this.buttons.find(t=>t.key===e)}registerButton(e){if(void 0!==this.getButton(e.key))return void this.buttons.splice(this.buttons.findIndex(t=>t.key===e.key),1,e);this.buttons.push(e)}constructor(){this.entries=[],this.buttons=[]}}var c=i(55859),u=i(56684);let p=(0,l.kc)(e=>{let{token:t,css:i}=e;return{sidebarContentEntry:i`
            .sidebar__content-label {
                color: ${t.colorPrimaryActive};
                line-height: 20px;
                font-weight: 600;
                margin: 0;
                padding-bottom: ${t.paddingXS}px;
                
                &:not(:first-of-type) {
                    padding-top: ${t.paddingXS}px;
                }
            }
            .sidebar__content-hr {
              position: absolute;
              left: 0;
              right: 0;
              border-color: ${t.colorSplit};
              margin: 0;
            }
        `,sidebarContentDimensions:i`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            align-self: stretch;
            
            .entry-content__dimensions-label {
                display: flex;
                padding-bottom: ${t.paddingXXS};
                gap: ${t.marginMD}px;
                align-items: center;
                gap: ${t.marginXXS};
                align-self: stretch;

                p {
                    margin: 0
                }
            }

            .entry-content__dimensions-content {
                color: ${t.colorTextDescription};
                display: flex;
                padding-bottom: ${t.paddingXXS};
                gap: ${t.marginMD}px;
                align-items: center;
                gap: ${t.marginXXS};
                align-self: stretch;

                p {
                    margin: 0;
                    line-height: 22px;
                }
            }
        `,sidebarContentDownload:i`
            .entry-content__download-content-thumbnail {
                display: flex;
                align-items: center;
                gap: ${t.paddingXXS}px;
                padding-bottom: ${t.paddingSM}px;
                
                .ant-select {
                    flex: 1
                }
            }
            
            .entry-content__download-content-custom {
                .ant-form-item {
                    margin-bottom: 0;
                }
                
                .entry-content__download-content-custom__dimensions {
                    display: flex;
                    gap: ${t.marginSM}px;
                    padding-bottom: ${t.paddingSM}px;
                }
                
                .entry-content__download-content-custom__others {
                    display: flex;
                    gap: ${t.paddingXS}px;
                    flex-direction: column;
                    padding-bottom: ${t.paddingSM}px;
                    
                    > div {
                        display: flex;
                        gap: ${t.marginSM}px;
                        
                        >.ant-form-item {
                            flex: 1
                        }
                    }
                }
                
                .entry-content__download-content-custom__button {
                    padding: ${t.paddingXS}px 0;
                }
            }
        `,sidebarContentImagePreview:i`
      & > .sidebar__content-label {
        margin-top: ${t.marginXS}px;
      }
      
      .ant-btn-group {
        button {
          padding: 0 4px;
          height: 24px;
          border-radius: unset;
        }
        button:nth-child(1)  {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }
        button:nth-child(2)  {
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        }
      }

      .ant-card {
        height: 208px;
      }
      
      .ant-card, .ant-card-meta-title {
        margin-top: ${t.marginSM}px;
      }
      
      .image-preview-container {
        height: 129px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        div {
          display: flex;
          gap: ${t.marginXXS}px;
        }
        
        span {
          margin-top: ${t.marginSM}px;
        }
      }

      .image-preview__toolbar {
        position: absolute;
        left: 0;
        right: 0;
        background: none;
        margin-top: ${t.marginXS}px
      }
    `}},{hashPriority:"low"});var m=i(26788),g=i(95658),h=i(46256),x=i(62056),v=i(20511),f=i(11566);let b=(0,o.forwardRef)(function(e,t){let{getStateClasses:i}=(0,v.useDroppable)(),o={width:"21px",height:"21px"},{t:r}=(0,a.useTranslation)(),l=(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{children:[(0,n.jsx)(c.J,{options:o,value:"new"}),(0,n.jsx)(c.J,{options:o,value:"drop-target"})]}),(0,n.jsx)("span",{children:r("drag-and-drop-asset")})]});return""!==e.imgSrc&&(l=(0,n.jsx)(f.X,{src:e.imgSrc})),(0,n.jsx)("div",{className:["image-preview-container",...i()].join(" "),ref:t,children:l})});var y=i(47755),j=i(77476),w=i(49316),S=i(7932);let T=e=>{let t,{width:i,height:r,thumbnails:l,imagePreview:s,onApplyPlayerPosition:d,onChangeThumbnail:u,onClickDownloadByFormat:v,onDropImage:T,isDownloading:C}=e,{styles:k}=p(),{t:_}=(0,a.useTranslation)(),[$,N]=(0,o.useState)("media"),[E,I]=(0,o.useState)("pimcore-system-treepreview"),[P,M]=(0,o.useState)(!1),[D,B]=(0,o.useState)(!1),[A,L]=(0,o.useState)("pimcore-system-treepreview"),F=l.map(e=>({value:e.id,label:e.text}));return t="media"===$?(0,n.jsxs)(n.Fragment,{children:[D?(0,n.jsx)(j.V,{loading:!0}):(0,n.jsx)(x.b,{isValidContext:e=>"asset"===e.type,onDrop:function(e){B(!0),T(e.data.id,()=>{B(!1)})},children:(0,n.jsx)(b,{imgSrc:s})}),(0,n.jsx)(h.Z,{title:(0,n.jsx)(y.o,{theme:"secondary",children:(0,n.jsx)("div",{})})})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"image-preview-container",children:(0,n.jsx)(f.X,{src:s})}),(0,n.jsx)(h.Z,{title:(0,n.jsx)(y.o,{justify:"flex-end",theme:"secondary",children:(0,n.jsx)(m.Button,{loading:P,onClick:function(){M(!0),d(()=>{M(!1)})},children:_("apply")})})})]}),(0,n.jsxs)(j.V,{className:k.sidebarContentEntry,padded:!0,padding:{top:"none",x:"small",bottom:"mini"},children:[(0,n.jsx)(w.h,{title:_("asset.sidebar.details")}),(0,n.jsxs)("div",{className:"sidebar__content-entry-content",children:[(0,n.jsxs)("div",{className:k.sidebarContentDimensions,children:[(0,n.jsxs)("div",{className:"entry-content__dimensions-label",children:[(0,n.jsx)("p",{children:_("width")}),(0,n.jsx)("p",{children:_("height")})]}),(0,n.jsxs)("div",{className:"entry-content__dimensions-content",children:[(0,n.jsxs)("p",{children:[i," px"]}),(0,n.jsxs)("p",{children:[r," px"]})]})]}),(0,n.jsxs)("div",{className:k.sidebarContentDownload,children:[(0,n.jsx)("p",{className:"sidebar__content-label",children:_("thumbnail")}),(0,n.jsxs)("div",{className:"entry-content__download-content",children:[(0,n.jsx)("div",{className:"entry-content__download-content-thumbnail",children:(0,n.jsx)(S.P,{"aria-label":_("aria.asset.image-sidebar.tab.details.custom-thumbnail-mode"),defaultValue:E,onChange:function(e){I(e),u(e)},options:F})}),(0,n.jsx)("p",{className:"sidebar__content-label",children:_("download")}),(0,n.jsxs)("div",{className:"entry-content__download-content-thumbnail",children:[(0,n.jsx)(S.P,{"aria-label":_("aria.asset.image-sidebar.tab.details.custom-thumbnail-mode"),defaultValue:A,onChange:e=>{L(e)},options:F}),(0,n.jsx)(m.Button,{"aria-label":_("aria.asset.image-sidebar.tab.details.download-thumbnail"),icon:(0,n.jsx)(c.J,{value:"download"}),loading:C,onClick:function(){v(A)}})]})]})]}),(0,n.jsx)(m.Divider,{className:"sidebar__content-hr"}),(0,n.jsxs)("div",{className:k.sidebarContentImagePreview,children:[(0,n.jsx)("p",{className:"sidebar__content-label",children:_("select-image-preview")}),(0,n.jsxs)(g.Z,{children:[(0,n.jsx)(m.Button,{onClick:function(){N("media")},type:"media"===$?"primary":"default",children:_("choose-media")}),(0,n.jsx)(m.Button,{onClick:function(){N("player")},type:"player"===$?"primary":"default",children:_("current-player-position")})]}),(0,n.jsx)(m.Card,{size:"small",children:t})]})]})]})};var C=i(19719),k=i(72497),_=i(42962),$=i(63739),N=i(66660),E=i(63387),I=i.n(E),P=i(96486),M=i(4884),D=i(25741);let B=new class extends d{};B.registerEntry({key:"details",icon:(0,n.jsx)(c.J,{options:{width:"16px",height:"16px"},value:"details"}),component:(0,n.jsx)(()=>{let[e,t]=(0,o.useState)(!1),{playerPosition:i,setThumbnail:a}=r().useContext(A),l=(0,o.useContext)(s.N),[d,c]=(0,o.useState)("");(0,o.useMemo)(()=>{x(200,119)},[]);let{data:p}=(0,u.useAssetGetByIdQuery)({id:l.id}),{data:m}=(0,C.useThumbnailVideoGetCollectionQuery)(),g=null==m?void 0:m.items;if(null==g)return(0,n.jsx)(j.V,{loading:!0});let h=()=>{};return(0,n.jsx)(T,{height:p.height??0,imagePreview:d,isDownloading:e,onApplyPlayerPosition:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h;v("image_thumbnail_time",i,e)},onChangeThumbnail:a,onClickDownloadByFormat:function(e){t(!0);let i=`${(0,k.G)()}/assets/${l.id}/video/download/${e}`;(0,$.s)({url:i,onSuccess:e=>{let t=URL.createObjectURL(e);(0,_.K)(t,p.filename)}}).catch(()=>{(0,N.ZP)(new N.aE("An error occured while loading the Video"))}).finally(()=>{t(!1)})},onDropImage:function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:h;v("image_thumbnail_asset",e,t)},thumbnails:g,width:p.width??0});function x(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:h;fetch(`${(0,k.G)()}/assets/${l.id}/video/stream/image-thumbnail?width=${e}&height=${t}&aspectRatio=true`).then(async e=>await e.blob()).then(e=>{c(URL.createObjectURL(e))}).catch(()=>{(0,N.ZP)(new N.aE("An error occurred while loading the Thumbnail"))}).finally(i)}function v(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:h;fetch(`${(0,k.G)()}/assets/${l.id}`,{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({data:{customSettings:[{key:e,value:t}]}})}).then(()=>{x(200,119,i)}).catch(()=>{(0,N.ZP)(new N.aE("An error occured while setting the Image Preview")),i()})}},{})}),B.registerButton({key:"focal-point",icon:(0,n.jsx)(c.J,{options:{width:"16px",height:"16px"},value:"focal-point"}),component:(0,n.jsx)(e=>{let{id:t}=(0,o.useContext)(s.N),i=(0,o.useContext)(M.A),{addImageSettings:r}=(0,D.useAssetDraft)(t),a=()=>{if(!(0,P.isUndefined)(i)){let{isActive:n,setIsActive:o,setCoordinates:a,containerRef:l}=i;if(!(0,P.isNull)(l.current)){var e,t;let i=l.current,s=i.scrollLeft,d=i.scrollTop,c=i.clientWidth,u=i.clientHeight,p=(null==i||null==(e=i.firstElementChild)?void 0:e.clientWidth)??0,m=(null==i||null==(t=i.firstElementChild)?void 0:t.clientHeight)??0,g={x:p>=c?(s+c/2)/p*100:50,y:m>=u?(d+u/2)/m*100:50};a(g),r({focalPoint:g}),o(!n)}}};return(0,n.jsx)("div",{"aria-label":e.key,className:I()("button",{"button--highlighted":(null==i?void 0:i.isActive)===!0}),onClick:a,onKeyDown:a,role:"button",tabIndex:e.index,children:e.icon},e.key)},{})}),i(77664);let A=(0,o.createContext)({thumbnail:"",setThumbnail:()=>{},playerPosition:0,setPlayerPosition:()=>{}}),L=e=>{let{sources:t,tracks:i,width:r,height:l,className:s,poster:d}=e,{t:c}=(0,a.useTranslation)(),{setPlayerPosition:u}=(0,o.useContext)(A);return(0,n.jsxs)("video",{className:s,controls:!0,height:l,onTimeUpdate:function(e){u(e.target.currentTime)},poster:d,width:r,children:[t.map((e,t)=>(0,n.jsx)("source",{src:e.src,type:e.type},`${t}-${e.type}`)),null==i?void 0:i.map((e,t)=>(0,n.jsx)("track",{kind:e.kind,label:e.label,src:e.src,srcLang:e.srcLang},`${t}-${e.label}`)),c("asset.preview.no-video-support")]},t[0].src)}},7828:function(e,t,i){i.d(t,{c:()=>a});var n=i(85893),o=i(26788);i(81004);let r=(0,i(10781).kc)(e=>{let{token:t,css:i}=e;return{progressbar:i`
      padding-bottom: ${t.marginXXS}px;  
        
      .progressbar-description {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
          
        p {
          color: ${t.colorTextTertiary};
          margin: 0;
          font-size: 12px;
          font-weight: 400;
          line-height: 22px;
        }

        .progressbar-description__action {
          .ant-btn {
            color: ${t.colorPrimary};
            height: ${t.controlHeight}px;
            display: flex;
            justify-content: center;
            padding: 0 ${t.paddingXXS}px;
            align-items: flex-end;

            &:hover {
              color: ${t.colorPrimaryHover}
            }
          }
        }
      }
      
      .ant-progress {
        margin-bottom: 0;
          
        .ant-progress-bg {
          background: ${t.colorTextDescription};        
        }
      }

      .progressbar-status {
        p {
          color: ${t.colorTextSecondary};
          font-size: 12px;
          font-weight: 400;
          line-height: 22px;
          margin: 0;
        }
      }
    `}},{hashPriority:"low"}),a=e=>{let{progressStatus:t,description:i,descriptionAction:a,...l}=e,{styles:s}=r();return(0,n.jsxs)("div",{className:s.progressbar,children:[(0,n.jsxs)("div",{className:"progressbar-description",children:[(0,n.jsx)("p",{id:"progressbarLabel",children:i}),(0,n.jsx)("div",{className:"progressbar-description__action",children:a})]}),(0,n.jsx)(o.Progress,{...l,"aria-labelledby":"progressbarLabel",showInfo:!1,status:"normal"}),(0,n.jsx)("div",{className:"progressbar-status",children:(0,n.jsx)("p",{children:t})})]})}},63121:function(e,t,i){i.d(t,{t:()=>a});var n=i(85893),o=i(81004),r=i(26788);let a=(0,o.forwardRef)((e,t)=>{let[i,a]=(0,o.useState)(!1);return(0,o.useImperativeHandle)(t,()=>({refresh:()=>{e.hasDataChanged()?a(!0):e.onReload()}})),(0,n.jsx)(r.Popconfirm,{onCancel:()=>{var t;a(!1),null==(t=e.onCancel)||t.call(e)},onConfirm:()=>{a(!1),e.onReload()},onOpenChange:t=>{if(!t)return void a(!1);e.hasDataChanged()?a(!0):e.onReload()},open:i,title:e.title,children:e.children},"reload")});a.displayName="ReloadPopconfirm"},92174:function(e,t,i){i.d(t,{useMainNav:()=>m});var n=i(80380),o=i(81004),r=i(81722),a=i(79771),l=i(48497),s=i(35950),d=i(96106),c=i(70912),u=i(96486);let p=(e,t)=>{let i=t.path.split("/");if(i.length>4)return void console.warn("MainNav: Maximum depth of 4 levels is allowed, Item will be ignored",t);let n=e;i.forEach((e,o)=>{let r=n.find(t=>t.id===e),a=o===i.length-1;void 0===r?(r={order:a?t.order:100,id:e,label:t.label??e,path:i.slice(0,o+1).join("/"),children:[],icon:a?t.icon:void 0,widgetConfig:a?t.widgetConfig:void 0,onClick:a?t.onClick:void 0,button:a?t.button:void 0,className:a?t.className:void 0,perspectivePermission:a?t.perspectivePermission:void 0,perspectivePermissionHide:a?t.perspectivePermissionHide:void 0},n.push(r)):o===i.length-1&&Object.assign(r,{icon:t.icon,order:t.order??100,className:t.className}),(n=r.children??[]).sort((e,t)=>(e.order??100)-(t.order??100))}),e.sort((e,t)=>(e.order??100)-(t.order??100))},m=()=>{let e=n.nC.get(a.j.mainNavRegistry),t=(0,l.a)(),i=(0,r.v9)(c.BQ),m=()=>{let n=[];return(0,u.isNil)(t)||(0,u.isNil)(i)||e.getMainNavItems().forEach(e=>{(void 0===e.permission||(0,s.y)(e.permission))&&(void 0===e.perspectivePermission||(0,d.i)(e.perspectivePermission))&&p(n,e)}),n};return{navItems:(0,o.useMemo)(()=>m(),[e.getMainNavItems(),t,i])}}},54416:function(e,t,i){i.d(t,{O:()=>t1});var n=i(85486),o=i(85893),r=i(84666),a=i(81004),l=i.n(a),s=i(74976),d=i(89020),c=i(25741),u=i(6862),p=i(82717),m=i(38640),g=i(68289),h=i(7108),x=i(17418),v=i(19233),f=i(66185),b=i(17180),y=i(63121),j=i(96630),w=i(68922),S=i(90165),T=i(44158);let C=()=>(0,a.useContext)(T.g);var k=i(88087),_=i(34188),$=i(96486);let N=()=>{let{t:e}=(0,s.useTranslation)(),{id:t}=(0,a.useContext)(w.f),{dataObject:i}=(0,S.useDataObjectDraft)(t),{refreshElement:n}=(0,f.useElementRefresh)("data-object"),{isLoading:l,layouts:d}=(0,k.useCustomLayouts)(t),{setCurrentLayout:c,currentLayout:u}=C(),[m,g]=(0,a.useState)(),h=(0,a.useRef)(null);if((0,a.useEffect)(()=>{if((0,$.isString)(m)){var e;null==(e=h.current)||e.refresh()}},[m]),l)return(0,o.jsx)(o.Fragment,{});let x=()=>Object.keys((null==i?void 0:i.changes)??{}).length>0,v=(d??[]).map(t=>({key:`reload-${t.id}`,label:(0,o.jsx)(_.x,{strong:u===t.id,children:e(t.name)}),onClick:()=>{g(t.id)}}));return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(y.t,{hasDataChanged:x,onReload:()=>{n(t,!0)},title:e("toolbar.reload.confirmation"),children:(0,o.jsx)(r.h,{icon:{value:"refresh"},children:e("toolbar.reload")})},"reload"),v.length>1&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(y.t,{hasDataChanged:x,onCancel:()=>{g(null)},onReload:()=>{(0,$.isString)(m)&&c(m),n(t,!0)},ref:h,title:e("toolbar.reload.confirmation")},"reload"),(0,o.jsx)(p.L,{menu:{items:v},trigger:["hover"],children:(0,o.jsx)(r.h,{icon:{value:"chevron-down"},onClick:e=>{e.stopPropagation()},children:e("toolbar.switch-layout")})},"switch-layout")]})]})};var E=i(23526),I=i(55859),P=i(98319),M=i(51469),D=i(71098),B=i(62588),A=i(11093);let L=e=>{let{t}=(0,s.useTranslation)(),{isTreeActionAllowed:i}=(0,A.useTreePermission)(),{executeElementTask:n}=(0,D.useElementHelper)(),[r,l]=(0,a.useState)(!1),d=e=>!(0,B.x)(e.permissions,"unpublish")||"folder"===e.type||e.isLocked,c=(t,i)=>{n(e,"string"==typeof t.id?parseInt(t.id):t.id,P.R.Unpublish,i)};return{unpublishTreeContextMenuItem:e=>({label:t("element.unpublish"),key:E.N.unpublish,isLoading:r,icon:(0,o.jsx)(I.J,{value:"eye-off"}),hidden:!1===e.isPublished||!i(M.W.Unpublish)||d(e),onClick:()=>{c(e)}}),unpublishContextMenuItem:(e,i)=>({label:t("element.unpublish"),key:E.N.unpublish,isLoading:r,icon:(0,o.jsx)(I.J,{value:"eye-off"}),hidden:!1===e.published||d(e),onClick:()=>{l(!0),c(e,()=>{null==i||i(),l(!1)})}})}};var F=i(14965),R=i(72551),U=i(26788),O=i(18639),z=i(59738),X=i(36414),q=i(84901),G=i(84420),V=i(88983),H=i(10186);let Z=()=>{let{t:e}=(0,s.useTranslation)(),{deleteDraft:t,isLoading:i,buttonText:n}=(0,H.useDeleteDraft)(),{id:r}=(0,a.useContext)(w.f),{dataObject:l}=(0,S.useDataObjectDraft)(r);if((0,$.isNil)(l))return(0,o.jsx)(o.Fragment,{});let d=null==l?void 0:l.draftData;if((0,$.isNil)(d)||l.changes[V.hD])return(0,o.jsx)(o.Fragment,{});let c=(0,o.jsx)(G.z,{danger:!0,ghost:!0,loading:i,onClick:t,size:"small",children:n});return(0,o.jsx)(q.x,{padding:"extra-small",children:(0,o.jsx)(X.b,{action:c,icon:(0,o.jsx)(I.J,{value:"draft"}),message:e(d.isAutoSave?"draft-alert-auto-save":"draft-alert"),showIcon:!0,type:"info"})})};var W=i(11556),J=i(70302);let K=e=>{let{layout:t,data:i,className:n}=e,{form:r,updateModifiedDataObjectAttributes:l,updateDraft:s,getChangedFieldName:d,disabled:c}=(0,O.useEditFormContext)(),u=(0,z.a)(),p=(e,t)=>{var i;if(c)return;l(e);let n=d(e);null!==n&&(null==u||null==(i=u.getInheritanceState(n))?void 0:i.inherited)===!0&&(null==u||u.breakInheritance(n)),s().catch(e=>{console.error(e)})};return(0,a.useMemo)(()=>(0,o.jsx)(U.ConfigProvider,{theme:{components:{Form:{itemMarginBottom:0}}},children:(0,o.jsx)(W._v,{children:(0,o.jsx)(R.l,{className:n,form:r,initialValues:i,layout:"vertical",onValuesChange:p,preserve:!0,children:(0,o.jsx)(J.D,{renderTopBar:(0,o.jsx)(Z,{}),children:(0,o.jsx)(F.T,{...t})})})})}),[t,i,n])};var Q=i(53320),Y=i(61813),ee=i(77476),et=i(36619),ei=i(10781);let en=(0,ei.kc)(e=>{let{token:t,css:i}=e;return{editContainer:i`
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;

      & > .ant-space,
      & > .ant-space > .ant-space-item {
        display: flex;
        width: 100%;
        height: 100%;

        .ant-tabs {
          width: 100%;
        }
      }
    `}},{hashPriority:"high"});var eo=i(71953),er=i(66660);let ea={key:"edit",label:"asset.asset-editor-tabs.edit",children:(0,o.jsx)(()=>{let{id:e}=(0,Y.useElementContext)(),{currentLayout:t}=C(),{data:i,isLoading:n,error:r}=(0,Q.useDataObjectGetLayoutByIdQuery)({id:e,layoutId:t??void 0}),{dataObject:a,isLoading:l}=(0,S.useDataObjectDraft)(e),{styles:s}=en();return(void 0!==r&&(0,er.ZP)(new er.MS(r)),void 0===i||n||l)?(0,o.jsx)(ee.V,{loading:!0}):(0,o.jsx)(et.w,{children:(0,o.jsx)(eo.C,{children:(0,o.jsx)(K,{className:s.editContainer,data:null==a?void 0:a.objectData,layout:i})})})},{}),icon:(0,o.jsx)(I.J,{value:"edit-pen"}),isDetachable:!0};var el=i(44171),es=i(73357),ed=i(832);let ec=(0,ei.kc)(e=>{let{token:t,css:i}=e;return{mainNav:i`
      position: absolute;
      left: 100%;
      top: 0;
      background: #fff;
      padding: ${t.paddingMD}px;
      box-shadow: ${t.boxShadowSecondary};
      border-radius: ${t.borderRadius}px;
      width: 818px;
      max-width: 90vw;
      min-width: 530px;
      text-align: left;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      
      .main-nav__top {
        display: flex;
        justify-content: space-between;
      }
      
      .main-nav__list-inline {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .main-nav__bottom {
        display: flex;
        text-transform: uppercase;
        gap: ${t.marginSM}px;
        color: ${t.colorTextDescription};
        
        .main-nav__bottom-title {
          margin-top: ${t.marginXS}px;
          line-height: 1.5;
        }

        .main-nav__list-inline {
          gap: ${t.marginXS}px;
          flex-wrap: wrap;
        }
      }
      
      .main-nav__list {
        margin: 0;
        list-style: none;
        width: 100%;
        padding: 0 ${t.paddingXS}px;
        font-size: ${t.fontSize}px;
        position: relative;
        max-height: 100%;
      }

      .main-nav__list--level-0 {
        width: 25%;
        padding: 0;
        background: rgba(0, 0, 0, 0.02);
        
        > .main-nav__list-item.is-active > .main-nav__list-btn {
          border-left: 2px solid ${t.colorPrimary};
          background: ${t.controlItemBgActive};
          color: ${t.colorPrimary};
        }
      }

      .main-nav__list:not(.main-nav__list--level-0) {
        position: static;
      }

      .main-nav__list--level-1 {
        padding: ${t.paddingXS}px;
      }

      .main-nav__list-detail {
        position: absolute;
        left: 100%;
        width: 100%;
        top: 0;
        bottom: 0;
        transform: translateX(-15px);
        opacity: 0;
        visibility: hidden;
        transition: transform 200ms ease-in-out, opacity 200ms ease-in-out;
      }

      .is-active > .main-nav__list-detail {
        opacity: 1;
        transform: translateX(0);
        visibility: visible;
      }

      .main-nav__list-detail-scroll-container {
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        max-height: 100%;
      }

      .main-nav__list-detail-scroll {
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
        scroll-snap-type: x mandatory;
      }

      .main-nav__list-btn {
        background: none;
        border: 0;
        width: 100%;
        padding: ${t.paddingSM}px;
        cursor: pointer;
        text-align: left;
        display: flex;
        align-items: center;
        gap: ${t.marginXXS}px;
        min-height: 46px;
        
        &:hover {
          background: ${t.controlItemBgActiveHover};
          color: ${t.colorPrimary};
        }
      }

      .is-active > .main-nav__list-btn {
        background: ${t.controlItemBgActive};
        color: ${t.colorPrimary};
      }
      
      .main-nav__list-btn-icon {
        margin-left: auto;
      }
      
      .main-nav__divider {
        margin: ${t.marginSM}px 0;
      }
      
      .main-nav__list--level-1 .main-nav__list-btn {
        min-height: unset;
        border-radius: ${t.borderRadius}px;
        padding: ${t.paddingXS}px;
      }
    `}},{hashPriority:"low"});var eu=i(92174),ep=i(81354),em=i(96106),eg=i(60944),eh=i(48497),ex=i(46309),ev=i(91019),ef=i(70912),eb=i(98482),ey=i(94629),ej=i(35316),ew=i(37021),eS=i(45980),eT=i(68686);let eC=()=>{let e=(0,ex.TL)(),t=(0,eh.a)(),[i]=(0,ev.Lw)(),[n,r]=(0,a.useState)(!1),{modal:l}=U.App.useApp(),{t:d}=(0,s.useTranslation)(),c=async t=>{let i=e(ew.hi.endpoints.perspectiveGetConfigById.initiate({perspectiveId:t}));return i.then(t=>{let{data:i,isSuccess:n,isError:o,error:r}=t;o&&(0,er.ZP)(new er.MS(r)),n&&(0,$.isPlainObject)(i)&&(e((0,ef.ZX)(i)),e((0,eb.jy)((0,ey.i)())))}).catch(()=>{}),await i};return{switchPerspective:async n=>{r(!0);let a=l.info({title:(0,o.jsxs)(eT.k,{align:"center",gap:"small",children:[(0,o.jsx)(eS.y,{type:"classic"}),d("perspective.switching.title")]}),content:(0,o.jsxs)("div",{children:[(0,o.jsxs)(q.x,{margin:{bottom:"small"},children:[d("perspective.switching.description"),":"]}),(0,o.jsx)(eg.W,{color:"primary",icon:n.icon,variant:"filled",children:d(n.name)})]}),footer:!1}),s=n.id,u=await i({perspectiveId:s});(0,$.isUndefined)(u.error)?(await c(s),e((0,ej.av)({...t,activePerspective:s}))):(0,er.ZP)(new er.MS(u.error)),r(!1),setTimeout(()=>{a.destroy()},500)},loadPerspective:c,isLoading:n}},ek=e=>{let{setIsOpen:t}=e,{t:i}=(0,s.useTranslation)(),{switchPerspective:n}=eC(),r=(0,eh.a)();return(0,o.jsxs)("div",{className:"main-nav__bottom",children:[(0,o.jsx)("div",{className:"main-nav__bottom-title",children:i("navigation.perspectives")}),(0,o.jsx)("ul",{className:"main-nav__list-inline",children:r.perspectives.map((e,a)=>(0,o.jsx)("li",{children:(0,o.jsx)(eg.W,{color:e.id===r.activePerspective?"primary":"secondary",icon:e.icon,onClick:async()=>{n(e),t(!1)},variant:e.id===r.activePerspective?"filled":"outlined",children:i(e.name)})},e.id))})]})},e_=(0,a.createContext)(void 0),e$=e=>{let[t,i]=(0,a.useState)(!1);return(0,a.useMemo)(()=>(0,o.jsx)(e_.Provider,{value:{open:t,setOpen:i},children:e.children}),[t])},eN=()=>{let e=(0,a.useContext)(e_);if(void 0===e)throw Error("useSearch must be used within a SearchProvider");return{isOpen:e.open,open:()=>{e.setOpen(!0)},close:()=>{e.setOpen(!1)}}},eE=()=>{let{open:e}=eN();return(0,o.jsx)(r.h,{icon:{value:"search"},onClick:()=>{e()},type:"text"})};var eI=i(25560),eP=i(33957),eM=i(28590),eD=i(50088),eB=i(47755);let eA=(0,a.createContext)({searchTerm:""}),eL=e=>{let{searchTerm:t,children:i}=e;return(0,a.useMemo)(()=>(0,o.jsx)(eA.Provider,{value:{searchTerm:t},children:i}),[t,i])},eF=()=>(0,a.useContext)(eA);var eR=i(51863);eR.api.enhanceEndpoints({endpoints:{simpleSearchGet:{keepUnusedDataFor:5}}});let{useSimpleSearchGetQuery:eU}=eR.api;var eO=i(63387),ez=i.n(eO),eX=i(41479);let eq=e=>{let{item:t,active:i,...n}=e,{icon:r,path:a}=t,{openElement:l}=(0,D.useElementHelper)(),{close:s}=eN(),d=ez()("hover",{active:!0===i});return(0,o.jsx)(q.x,{...n,className:d,onClick:()=>{l({id:t.id,type:t.elementType}),s()},padding:"mini",children:(0,o.jsxs)(eT.k,{align:"center",gap:"mini",children:[(0,o.jsx)(I.J,{...r}),(0,o.jsx)(eX.Q,{ellipsis:!i,value:a})]})})};var eG=i(11113),eV=i(7702),eH=i(3653),eZ=i(65866),eW=i(30225),eJ=i(15391);let eK=(0,ei.kc)(e=>{let{token:t,css:i}=e;return{keyValueList:i`
      border: 0;
      border-collapse: collapse;

      tr td {
        padding: ${t.Table.cellPaddingBlockSM}px;
        border: 0;
        border-bottom: 1px solid ${t.colorBorderSecondary};
        
        &:first-child {
          min-width: 100px;
        }
      }

      tr:last-of-type td {
        border-bottom: 0;
      }
    `}}),eQ=["creationDate","modificationDate"],eY=["documentData","objectData"],e0=e=>{let{items:t,skipEmpty:i=!0}=e,{t:n}=(0,s.useTranslation)(),{styles:r}=eK(),a=[],l=e=>i&&((0,eW.O)(e)||(0,$.isEqual)(e,!1));t.forEach(e=>{if(!l(null==e?void 0:e.value))if(eY.includes(e.key)){if((0,$.isObject)(e.value)){let t=i=>{Object.entries(i).forEach(i=>{let[n,o]=i;l(o)||((0,$.isObject)(o)?t(o):a.push({key:n,value:o,withoutTranslate:"objectData"===e.key}))})};t(e.value)}}else a.push(e)});let d=e=>{let t=null==e?void 0:e.value;return eQ.includes(e.key)&&(t=(0,eJ.o0)({timestamp:(null==e?void 0:e.value)??null,dateStyle:"short",timeStyle:"short"})),(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:(0,o.jsx)(_.x,{children:(null==e?void 0:e.withoutTranslate)===!0?e.key:n(`modal-search.field.${e.key}`)})}),(0,o.jsx)("td",{children:(0,o.jsx)(_.x,{children:0===t?t:(0,o.jsx)(eZ.Z,{html:t??""})})})]},e.key)};return(0,o.jsx)("table",{className:r.keyValueList,children:a.map(e=>d(e))})};var e1=i(15688),e8=i(342),e6=i(99261),e2=i(4602);let e5=(0,ei.kc)(e=>{let{token:t,css:i}=e;return{detailContent:i`
      max-height: 400px;
    `,searchResultImage:i`
      min-height: 100px;
      max-height: 200px;
    `,searchResultDocument:i`
      iframe {
        width: 100%;
        height: 100%;
      }
    `}}),e4=["elementType","type"],e7=["image","video","document"],e9=e=>{let{item:t}=e,{id:i,elementType:n}=t,{isError:r,error:l,isLoading:s,data:d}=(0,eR.useSimpleSearchPreviewGetQuery)({id:i,elementType:(0,e1.PM)(n)}),{styles:c}=e5();if((0,a.useEffect)(()=>{r&&(0,er.ZP)(new er.MS(l))},[r]),s)return(0,o.jsx)(ee.V,{loading:!0});if(r||void 0!==l)return(0,o.jsx)(ee.V,{none:!0,noneOptions:{text:"data not available"}});let{additionalAttributes:u,...p}=d,m=Object.entries(p).filter(e=>{let[t]=e;return!e4.includes(t)}).map(e=>{let[t,i]=e;return{key:t,value:i}});return(0,o.jsxs)(ee.V,{className:c.detailContent,children:[(()=>{let e=null==t?void 0:t.type,i=null==t?void 0:t.path;return e7.includes(e)&&!(0,eW.O)(i)?(0,o.jsxs)(eT.k,{justify:"center",children:["image"===e&&(0,o.jsx)(e8.E,{className:c.searchResultImage,preview:!1,src:i}),"video"===e&&(0,o.jsx)(e6.o,{sources:[{src:i}],width:250}),"document"===e&&(0,o.jsx)(e2.s,{className:c.searchResultDocument,src:i})]}):null})(),(0,o.jsx)(e0,{items:m})]})},e3=()=>(0,o.jsx)(ee.V,{children:(0,o.jsx)(eT.k,{align:"center",className:"h-full w-full",justify:"center",children:(0,o.jsx)(eV.d,{text:"No item selected"})})}),te=e=>{let{item:t}=e,i=void 0!==t;return(0,a.useMemo)(()=>i?(0,o.jsx)(e9,{item:t}):(0,o.jsx)(e3,{}),[t])},tt=()=>{let{searchTerm:e}=eF(),[t,i]=(0,a.useState)(1),[n,r]=(0,a.useState)(20),[l,s]=(0,a.useState)(void 0),[d,c]=(0,a.useState)(void 0),{isLoading:u,isError:p,error:m,data:g}=eU({searchTerm:e,page:t,pageSize:n});(0,a.useEffect)(()=>{let e=setTimeout(()=>{s(d)},333);return()=>{clearTimeout(e)}},[d]),(0,a.useEffect)(()=>{i(1),s(void 0)},[e]),(0,a.useEffect)(()=>{p&&(0,er.ZP)(new er.MS(m))},[p]);let h=(e,t)=>{i(e),r(t),s(void 0)},x=e=>{c(e)},v=()=>{c(l)},f=e=>(null==l?void 0:l.id)===e.id&&(null==l?void 0:l.elementType)===e.elementType;return(0,a.useMemo)(()=>u?(0,o.jsx)(ee.V,{loading:!0}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{}),(0,o.jsx)(eH.K,{leftItem:{size:750,children:(0,o.jsx)(ee.V,{overflow:{x:"hidden",y:"auto"},padded:!0,padding:{left:"none",right:"none",y:"none"},style:{height:400},children:(0,o.jsxs)(eT.k,{className:"w-full h-full",gap:0,vertical:!0,children:[null==g?void 0:g.items.map(e=>(0,o.jsx)(eq,{active:f(e),item:e,onMouseEnter:()=>{x(e)},onMouseLeave:()=>{v()}},`${e.id}-${e.elementType}`)),(null==g?void 0:g.items.length)===0&&(0,o.jsx)(eT.k,{align:"center",className:"w-full h-full",gap:"mini",justify:"center",vertical:!0,children:(0,o.jsx)(eV.d,{text:"No results found"})})]})})},rightItem:{size:250,minSize:250,maxSize:250,children:(0,o.jsx)(te,{item:l})},withDivider:!0}),(0,o.jsx)(eB.o,{theme:"secondary",children:(0,o.jsx)(eG.t,{onChange:h,pageSizeOptions:[10,20,50,100],showSizeChanger:!0,showTotal:e=>`Total ${e} items`,total:(null==g?void 0:g.totalItems)??0})})]}),[g,l,u])},ti=()=>{let[e,t]=(0,a.useState)(""),[i,n]=(0,a.useState)("");return(0,a.useEffect)(()=>{let e=setTimeout(()=>{t(i)},500);return()=>{clearTimeout(e)}},[i]),(0,o.jsx)(J.D,{renderTopBar:(0,o.jsx)(eB.o,{padding:{left:"none",right:"none"},position:"top",theme:"secondary",children:(0,o.jsx)(eD.M,{maxWidth:"100%",onChange:e=>{n(e.target.value)},onSearch:e=>{n(e)},value:i})}),children:(0,o.jsx)(eL,{searchTerm:e,children:(0,o.jsx)(tt,{})})})};var tn=i(46082),to=i(76396),tr=i(99911),ta=i(24391),tl=i(93279),ts=i(44835),td=i(55714),tc=i(94780),tu=i(32221),tp=i(28863),tm=i(5657),tg=i(78215),th=i(86641),tx=i(40877),tv=i(275);let tf=()=>(0,o.jsx)(eB.o,{borderStyle:"default",padding:{left:"none",right:"none"},position:"top",theme:"secondary",children:(0,o.jsxs)(eT.k,{className:"w-full",gap:"small",children:[(0,o.jsx)(tx.C,{}),(0,o.jsx)(tv.U,{})]})});var tb=i(27378),ty=i(66707),tj=i(9705),tw=i(692);let tS=()=>(0,o.jsx)(eB.o,{borderStyle:"default",padding:{right:"none",left:"none"},theme:"secondary",children:(0,o.jsx)(eT.k,{className:"w-full",gap:"small",justify:"space-between",children:(0,o.jsxs)(ty.P,{size:"extra-small",children:[(0,o.jsx)(tb.q,{}),(0,o.jsx)(tj.s,{}),(0,o.jsx)(tw.t,{})]})})});var tT=i(91306);let tC=(e,t)=>()=>{let{getGridProps:i,...n}=e(),{openElement:o}=(0,D.useElementHelper)(),{close:r}=eN();return{...n,getGridProps:()=>({...i(),onRowDoubleClick:e=>{let{id:i}=e.original,{elementType:n}=t;o({id:i,type:n}),r()}})}},tk={...tl.l,ViewComponent:()=>{let{dataQueryResult:e}=(0,tm.useData)();return(0,a.useMemo)(()=>(0,o.jsxs)(o.Fragment,{children:[void 0===e&&(0,o.jsx)(ee.V,{loading:!0}),void 0!==e&&(0,o.jsx)(J.D,{renderToolbar:(0,o.jsx)(tS,{}),renderTopBar:(0,o.jsx)(tf,{}),children:(0,o.jsx)(J.D,{renderSidebar:(0,o.jsx)(tg.Y,{}),children:(0,o.jsx)(th.T,{})})})]}),[e])},useDataQuery:eR.HU,useDataQueryHelper:tn.$,useElementId:tr.u},t_=(0,tu.q)(td.L,tp.g,to.p,[ts.o,{handleSearchTermInSidebar:!1}],[tT.V,{elementType:eM.a.asset}],tc.y,[(e,t)=>{let{useGridOptions:i,...n}=e;if(void 0===t)throw Error("OpenElementDecorator requires an elementType prop");return{...n,useGridOptions:tC(i,t)}},{elementType:eM.a.asset}])(tk),t$=()=>(0,o.jsx)(ta.d,{serviceIds:["DynamicTypes/GridCellRegistry","DynamicTypes/MetadataRegistry","DynamicTypes/ListingRegistry"],children:(0,o.jsx)(tl.p,{...t_})}),tN=()=>(0,o.jsx)(ee.V,{style:{height:"65vh"},children:(0,o.jsx)(t$,{})});var tE=i(32278);let tI=()=>(0,o.jsx)(eB.o,{borderStyle:"default",padding:{left:"none",right:"none"},position:"top",theme:"secondary",children:(0,o.jsxs)(U.Flex,{className:"w-full",gap:"small",children:[(0,o.jsx)(tx.C,{}),(0,o.jsx)(tE.i,{nullable:!0}),(0,o.jsx)(tv.U,{})]})}),tP=()=>(0,o.jsx)(eB.o,{borderStyle:"default",padding:{right:"none",left:"none"},theme:"secondary",children:(0,o.jsx)(eT.k,{className:"w-full",gap:"small",justify:"space-between",children:(0,o.jsxs)(ty.P,{size:"extra-small",children:[(0,o.jsx)(tb.q,{}),(0,o.jsx)(tj.s,{}),(0,o.jsx)(tw.t,{})]})})}),tM=(e,t)=>()=>{let{getGridProps:i,...n}=e(),{openElement:o}=(0,D.useElementHelper)(),{close:r}=eN();return{...n,getGridProps:()=>({...i(),onRowDoubleClick:e=>{let{id:i}=e.original,{elementType:n}=t;o({id:i,type:n}),r()}})}};var tD=i(89320),tB=i(2024),tA=i(8439);let tL={...tl.l,ViewComponent:()=>{let{dataQueryResult:e}=(0,tm.useData)();return(0,a.useMemo)(()=>(0,o.jsxs)(o.Fragment,{children:[void 0===e&&(0,o.jsx)(ee.V,{loading:!0}),void 0!==e&&(0,o.jsx)(J.D,{renderToolbar:(0,o.jsx)(tP,{}),renderTopBar:(0,o.jsx)(tI,{}),children:(0,o.jsx)(J.D,{renderSidebar:(0,o.jsx)(tg.Y,{}),children:(0,o.jsx)(th.T,{})})})]}),[e])},useDataQuery:eR.JM,useDataQueryHelper:tD.$,useElementId:tr.u},tF=(0,tu.q)(td.L,tA.F,to.p,[ts.o,{handleSearchTermInSidebar:!1}],tc.y,[tB.F,{showConfigLayer:!1}],[(e,t)=>{let{useGridOptions:i,...n}=e;if(void 0===t)throw Error("OpenElementDecorator requires an elementType prop");return{...n,useGridOptions:tM(i,t)}},{elementType:eM.a.dataObject}],[tT.V,{elementType:eM.a.dataObject}])(tL),tR=()=>(0,o.jsx)(ta.d,{serviceIds:["DynamicTypes/GridCellRegistry","DynamicTypes/ListingRegistry"],children:(0,o.jsx)(tl.p,{...tF})}),tU=()=>(0,o.jsx)(ee.V,{style:{height:"65vh"},children:(0,o.jsx)(tR,{})}),tO=()=>{let{isOpen:e,close:t}=eN(),i=[{label:"All",key:"all",children:(0,o.jsx)(ti,{})},{label:"Assets",key:eM.a.asset,children:(0,o.jsx)(tN,{})},{label:"Data Objects",key:eM.a.dataObject,children:(0,o.jsx)(tU,{})}];return(0,o.jsx)(o.Fragment,{children:e&&(0,o.jsx)(eI.u,{closable:!0,footer:null,onCancel:()=>{t()},open:e,size:"XL",children:(0,o.jsx)(eP.m,{items:i,noTabBarMargin:!0})})})};var tz=i(85536),tX=i(75052),tq=i(97686),tG=i(98244);let tV=(0,ei.kc)(e=>{let{token:t,css:i}=e;return{button:i`
              min-width: 100%;
              justify-items: flex-start;
    `,"not-first":i`
              margin-top: ${t.marginXXS}px;
    `}},{hashPriority:"low"}),tH=e=>{var t,i;let{workflow:n}=e,{openModal:r}=(0,tq.useWorkflow)(),{submitWorkflowAction:a,submissionLoading:l}=(0,tG.useSubmitWorkflow)(n.workflowName),{styles:d}=tV(),{t:c}=(0,s.useTranslation)(),u=(e,t,i)=>{"global"===t?r({action:e,transition:t,workflowName:i}):"transition"===t&&a(e,t,i,{})},p=(e,t)=>(0,o.jsx)(G.z,{className:`${d.button}`,onClick:()=>{u(e,t,n.workflowName)},type:"text",children:c(`${e}`)});return l?(0,o.jsx)(G.z,{loading:l,type:"link"}):(0,o.jsxs)("div",{children:[null==(t=n.allowedTransitions)?void 0:t.map(e=>p(e.label,"transition")),null==(i=n.globalActions)?void 0:i.map(e=>p(e.label,"global"))]})},tZ=()=>{let{t:e}=(0,s.useTranslation)(),[t,i]=l().useState([]),{workflowDetailsData:n,isFetchingWorkflowDetails:r}=(0,tq.useWorkflow)();return(0,a.useEffect)(()=>{(null==n?void 0:n.items)!==void 0&&n.items.length>0&&i(n.items.flatMap(t=>{var i;let r=[];return r.push({key:(((null==n||null==(i=n.items)?void 0:i.length)??0)+1).toString(),type:"custom",component:(0,o.jsx)(tH,{workflow:t})}),{key:e(`${t.workflowName}`),type:"group",label:e(`${t.workflowName}`).toUpperCase(),children:r}}))},[n]),(0,o.jsxs)(eT.k,{align:"center",justify:"flex-end",children:[(0,o.jsx)(tz.P,{itemGap:"extra-small",list:(null==n?void 0:n.items)!==void 0&&n.items.length>0?[n.items.reduce((t,i)=>(i.workflowStatus.forEach(i=>{if(void 0!==i.visibleInDetail&&i.visibleInDetail){let n=i.colorInverted?{backgroundColor:`${i.color}33`}:{},r={children:e(`${i.label}`),icon:(0,o.jsx)(tX.C,{color:i.color}),style:n};t.push(r)}}),t),[])]:[[]],wrap:!1}),void 0!==n&&(0,o.jsx)(p.L,{disabled:r,menu:{items:t},children:(0,o.jsx)(h.P,{children:(0,o.jsx)(I.J,{options:{height:16,width:16},value:"workflow"})})})]})};var tW=i(56684),tJ=i(44433),tK=i(6893),tQ=i(31584),tY=i(45699),t0=i(43367);let t1={...{asset:{editor:{container:{type:n.r.SINGLE,name:"asset.editor.container"},tab:{customMetadata:{type:n.r.SINGLE,name:"asset.editor.tab.customMetadata"},embeddedMetadata:{type:n.r.SINGLE,name:"asset.editor.tab.embeddedMetadata"},versions:{type:n.r.SINGLE,name:"asset.editor.tab.versions"}},toolbar:{slots:{left:{type:n.r.SLOT,name:"asset.editor.toolbar.slots.left",defaultEntries:[{name:"contextMenu",priority:100,component:()=>{let{t:e}=(0,s.useTranslation)(),{id:t}=(0,a.useContext)(d.N),{asset:i}=(0,c.useAssetDraft)(t),{renameContextMenuItem:n}=(0,u.useRename)("asset",(0,b.eG)("asset","rename",i.id)),{deleteContextMenuItem:l}=(0,m.useDelete)("asset",(0,b.eG)("asset","delete",i.id)),{downloadContextMenuItem:w}=(0,g.useDownload)(),{createZipDownloadContextMenuItem:S}=(0,x.useZipDownload)({type:"folder"}),{refreshElement:T}=(0,f.useElementRefresh)("asset"),{clearImageThumbnailContextMenuItem:C,clearVideoThumbnailContextMenuItem:k,clearPdfThumbnailContextMenuItem:_}=(0,v.useClearThumbnails)(),$=[n(i,()=>{T(i.id)}),l(i),w(i),S(i),C(i),k(i),_(i)],N=$.filter(e=>null!==e&&"hidden"in e&&(null==e?void 0:e.hidden)===!1),E=[];return E.push((0,o.jsx)(y.t,{hasDataChanged:function(){return Object.keys((null==i?void 0:i.changes)??{}).length>0},onReload:function(){T(t,!0)},title:e("toolbar.reload.confirmation"),children:(0,o.jsx)(r.h,{icon:{value:"refresh"},children:e("toolbar.reload")})},"reload-button")),N.length>0&&E.push((0,o.jsx)(p.L,{menu:{items:$},children:(0,o.jsx)(h.P,{children:e("toolbar.more")},"dropdown-button")},"more-button")),(0,o.jsx)(j.h,{items:E,noSpacing:!0})}}]},right:{type:n.r.SLOT,name:"asset.editor.toolbar.slots.right",defaultEntries:[{name:"workflowMenu",priority:100,component:tZ},{name:"saveButton",priority:200,component:()=>{let{t:e}=(0,s.useTranslation)(),{id:t}=(0,Y.useElementContext)(),{asset:i,properties:n,removeTrackedChanges:r,customMetadata:l,customSettings:d,imageSettings:u,textData:p}=(0,c.useAssetDraft)(t),[m,{isLoading:g,isSuccess:h,isError:x,error:v}]=(0,tW.useAssetUpdateByIdMutation)(),{saveSchedules:f,isLoading:b,isSuccess:y,isError:j,error:w}=(0,tK.useSaveSchedules)("asset",t,!1),S=(0,tJ.U)();return(0,a.useEffect)(()=>{(async()=>{h&&y&&(r(),await S.success(e("save-success")))})().catch(e=>{console.error(e)})},[h,y]),(0,a.useEffect)(()=>{x&&!(0,$.isNil)(v)?(0,er.ZP)(new er.MS(v)):j&&!(0,$.isNil)(w)&&(0,er.ZP)(new er.MS(w))},[x,j,v,w]),(0,o.jsx)(o.Fragment,{children:(0,B.x)(null==i?void 0:i.permissions,"publish")&&(0,o.jsx)(G.z,{disabled:g||b,loading:g||b,onClick:function(){if((null==i?void 0:i.changes)===void 0)return;let e={};if(i.changes.properties){let t=null==n?void 0:n.map(e=>{let{rowId:t,...i}=e;if("object"==typeof i.data){var n;return{...i,data:(null==i||null==(n=i.data)?void 0:n.id)??null}}return i});e.properties=null==t?void 0:t.filter(e=>!e.inherited)}i.changes.customMetadata&&(e.metadata=null==l?void 0:l.map(e=>{let{rowId:t,...i}=e;return i.type.startsWith("metadata.")&&(i.type=i.type.replace("metadata.","")),null===i.data&&(("input"===i.type||"textarea"===i.type)&&(i.data=""),"checkbox"===i.type&&(i.data=!1)),i})),i.changes.customSettings&&(e.customSettings=d),i.changes.imageSettings&&(e.image=u),i.changes.textData&&(e.data=p),Promise.all([m({id:t,body:{data:{...e}}}),f()]).catch(e=>{console.log(e)})},type:"primary",children:e("toolbar.save-and-publish")})})}}]}}}},tree:{contextMenu:{type:n.r.SINGLE,name:"asset.tree.contextMenu"}}},dataObject:{editor:{toolbar:{slots:{left:{type:n.r.SLOT,name:"dataObject.editor.toolbar.slots.left",defaultEntries:[{name:"contextMenu",priority:100,component:()=>{let{t:e}=(0,s.useTranslation)(),{id:t}=(0,a.useContext)(w.f),{dataObject:i}=(0,S.useDataObjectDraft)(t),{unpublishContextMenuItem:n}=L("data-object"),{renameContextMenuItem:r}=(0,u.useRename)("data-object"),{deleteContextMenuItem:l}=(0,m.useDelete)("data-object"),[d,c]=(0,a.useState)(void 0),g=[n(i,()=>{c(void 0)}),l(i),r(i)],x=g.filter(e=>null!==e&&"hidden"in e&&(null==e?void 0:e.hidden)===!1),v=[];return v.push((0,o.jsx)(N,{},"reload-button")),x.length>0&&v.push((0,o.jsx)(p.L,{menu:{items:g,onClick:e=>{e.key===E.N.unpublish&&c(!0)}},open:d,children:(0,o.jsx)(h.P,{children:e("toolbar.more")})},"dropdown-button")),(0,o.jsx)(j.h,{items:v,noSpacing:!0})}},{name:"languageSelection",priority:200,component:()=>{let{id:e}=(0,a.useContext)(w.f),{activeTab:t}=(0,S.useDataObjectDraft)(e);return t!==ea.key?(0,o.jsx)(o.Fragment,{}):(0,o.jsx)(el.k,{})}}]},right:{type:n.r.SLOT,name:"dataObject.editor.toolbar.slots.right",defaultEntries:[{name:"workflowMenu",priority:100,component:tZ},{name:"saveButtons",priority:200,component:()=>{var e;let{t}=(0,s.useTranslation)(),{id:i}=(0,a.useContext)(w.f),{dataObject:n,removeTrackedChanges:l,publishDraft:d}=(0,S.useDataObjectDraft)(i),{save:c,isLoading:u,isSuccess:m,isError:g,error:h}=(0,P.useSave)(),{isAutoSaveLoading:x,runningTask:v}=(0,t0.useSaveContext)(),{saveSchedules:f,isLoading:b,isSuccess:y,isError:T,error:C}=(0,tK.useSaveSchedules)("data-object",i,!1),{getModifiedDataObjectAttributes:k,resetModifiedDataObjectAttributes:_}=(0,O.useEditFormContext)(),{deleteDraft:N,isLoading:E,buttonText:M}=(0,H.useDeleteDraft)(),D=(0,tJ.U)(),A=(null==n||null==(e=n.draftData)?void 0:e.isAutoSave)===!0;async function L(e,t){(null==n?void 0:n.changes)!==void 0&&Promise.all([c(k(),e,()=>{_(),null==t||t()}),f()]).catch(e=>{console.error(e)})}(0,a.useEffect)(()=>{(async()=>{m&&y&&(l(),await D.success(t("save-success")))})().catch(e=>{console.error(e)})},[m,y]),(0,a.useEffect)(()=>{g&&!(0,$.isNil)(h)?(0,er.ZP)(new er.MS(h)):T&&!(0,$.isNil)(C)&&(0,er.ZP)(new er.MS(C))},[g,T,h,C]);let F=(()=>{let e=[],i=v===P.R.Version&&(u||b)||E;if((0,B.x)(null==n?void 0:n.permissions,"save")){(null==n?void 0:n.published)===!0&&e.push((0,o.jsx)(tQ.Button,{disabled:u||b||i,loading:v===P.R.Version&&(u||b),onClick:async()=>{await L(P.R.Version)},type:"default",children:t("toolbar.save-draft")},"save-draft"));let a=u||b||i;(null==n?void 0:n.published)===!1&&(0,B.x)(null==n?void 0:n.permissions,"save")&&e.push((0,o.jsx)(tQ.Button,{disabled:a,loading:v===P.R.Publish&&(u||b),onClick:async()=>{await L(P.R.Publish,()=>{d()})},type:"default",children:t("toolbar.save-and-publish")},"save-draft")),(0,$.isNil)(null==n?void 0:n.draftData)||e.push((0,o.jsx)(p.L,{menu:{items:[{disabled:u,label:M,key:"delete-draft",onClick:N}]},children:(0,o.jsx)(r.h,{disabled:u||b||i,icon:{value:"chevron-down"},loading:E,type:"default"})},"dropdown"))}return e})(),R=(()=>{let e=[],i=u||b||E;return(null==n?void 0:n.published)===!0&&(0,B.x)(null==n?void 0:n.permissions,"publish")&&e.push((0,o.jsx)(tQ.Button,{disabled:i,loading:v===P.R.Publish&&(u||b),onClick:async()=>{await L(P.R.Publish)},type:"primary",children:t("toolbar.save-and-publish")})),(null==n?void 0:n.published)===!1&&(0,B.x)(null==n?void 0:n.permissions,"save")&&e.push((0,o.jsx)(tQ.Button,{disabled:i,loading:v===P.R.Save&&(u||b),onClick:async()=>{await L(P.R.Save)},type:"primary",children:t("toolbar.save-draft")})),e})();return(0,o.jsxs)(o.Fragment,{children:[x&&(0,o.jsx)(tY.u,{title:t("auto-save.loading-tooltip"),children:(0,o.jsx)(eS.y,{type:"classic"})}),!x&&A&&(0,o.jsx)(tY.u,{title:t("auto-save.tooltip"),children:(0,o.jsx)(I.J,{value:"auto-save"})}),F.length>0&&(0,o.jsx)(j.h,{items:F,noSpacing:!0}),R.length>0&&(0,o.jsx)(j.h,{items:R,noSpacing:!0})]})}}]}}}},tree:{contextMenu:{type:n.r.SINGLE,name:"dataObject.tree.contextMenu"}}},document:{editor:{container:{type:n.r.SINGLE,name:"document.editor.container"}},tree:{contextMenu:{type:n.r.SINGLE,name:"document.tree.contextMenu"}}},leftSidebar:{slot:{type:n.r.SLOT,name:"leftSidebar.slot",defaultEntries:[{name:"mainNav",priority:100,component:()=>{let{t:e}=(0,s.useTranslation)(),{styles:t}=ec(),{navItems:i}=(0,eu.useMainNav)(),{openMainWidget:n}=(0,ep.useWidgetManager)(),[d,c]=l().useState(!1),[u,p]=l().useState([]),m=e=>{if(e.includes("-")){let t=e.substring(0,e.length-1);p([...u.filter(e=>!e.startsWith(t)),e])}e.includes("-")||p(u.includes(e)?u.filter(t=>t!==e):[e])},g=function(t,i){var r;let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,l=void 0!==t.children&&t.children.length>0||void 0!==t.widgetConfig||void 0!==t.onClick||void 0!==t.button,s=void 0!==t.perspectivePermissionHide&&(0,em.i)(t.perspectivePermissionHide);return!l||s?(0,o.jsx)(o.Fragment,{}):(0,o.jsxs)("li",{className:`main-nav__list-item ${u.includes(i)?"is-active":""} ${t.className??""}`,children:[(0,$.isUndefined)(t.button)?(0,o.jsxs)("button",{className:"main-nav__list-btn",onClick:()=>{void 0!==t.children&&t.children.length>0?m(i):void 0!==t.onClick?(t.onClick(),c(!1)):void 0!==t.widgetConfig&&(n(t.widgetConfig),c(!1))},children:[void 0!==t.icon?(0,o.jsx)(I.J,{value:t.icon}):null,e(`${t.label}`),void 0!==t.children&&t.children.length>0?(0,o.jsx)(I.J,{className:"main-nav__list-btn-icon",value:"chevron-right"}):null]}):(0,o.jsx)("div",{children:t.button()}),void 0!==t.children&&t.children.length>0?(0,o.jsx)("div",{className:"main-nav__list-detail",children:(0,o.jsx)("div",{className:"main-nav__list-detail-scroll-container",children:(0,o.jsx)("div",{className:"main-nav__list-detail-scroll",children:(0,o.jsx)("ul",{className:`main-nav__list main-nav__list--level-${a+1}`,children:null==(r=t.children)?void 0:r.map((e,t)=>g(e,`${i}-${t}`,a))})})})}):null]},t.path)},h=(0,a.useRef)(null),x=e=>{null===h.current||h.current.contains(e.target)||c(!1)},v=(0,a.useRef)(null);return(0,a.useEffect)(()=>{if(d&&(document.addEventListener("click",x),null!==v.current)){let e=Array.from(document.querySelectorAll(".main-nav__list")).reduce((e,t)=>Math.max(e,t.scrollHeight),0);v.current.style.height=`${e}px`}return()=>{document.removeEventListener("click",x)}},[d]),(0,o.jsxs)("div",{ref:h,children:[(0,o.jsx)(r.h,{icon:{value:"menu"},onClick:()=>{c(!d)},type:"text"}),(0,o.jsx)(es.M,{children:(0,o.jsx)(ed.E.div,{animate:{opacity:1},exit:{opacity:0},initial:{opacity:+!d},children:d?(0,o.jsxs)("div",{className:["main-nav",t.mainNav].join(" "),children:[(0,o.jsx)("ul",{className:"main-nav__list main-nav__list--level-0",ref:v,children:i.map((e,t)=>g(e,`${t}`))}),(0,o.jsx)(U.Divider,{className:"main-nav__divider"}),(0,o.jsx)(ek,{setIsOpen:c})]}):null},d?"open":"closed")})]})}},{name:"search",priority:200,component:()=>(0,o.jsxs)(e$,{children:[(0,o.jsx)(eE,{}),(0,o.jsx)(tO,{})]})}]}},wysiwyg:{editor:{type:n.r.SINGLE,name:"wysiwyg.editor"}}}}},74902:function(e,t,i){i.d(t,{qW:()=>p,yK:()=>g,O8:()=>a.O,re:()=>s.r,OR:()=>d.O});var n=i(28395),o=i(60476),r=i(66660),a=i(54416),l=i(96486),s=i(85486),d=i(1829),c=i(80380),u=i(79771);function p(){return(0,c.$1)(u.j["App/ComponentRegistry/ComponentRegistry"])}let m=e=>{let t={},i=e=>{for(let n in e){let o=e[n];(0,l.isObject)(o)&&"type"in o?t[o.name]=o:(0,l.isObject)(o)&&i(o)}};return i(e),t};class g{register(e){this.getComponentConfig(e.name).type!==s.r.SINGLE&&(0,r.ZP)(new r.aE(`Component "${e.name}" is not configured as a single component. Use registerToSlot instead.`)),this.has(e.name)&&(0,r.ZP)(new r.aE(`Component with the name "${e.name}" already exists. Use the override method to override it`)),this.registry[e.name]=e}getAll(){return this.registry}get(e){return this.has(e)||(0,r.ZP)(new r.aE(`No component with the name "${e}" found`)),this.registry[e].component}has(e){return e in this.registry}override(e){this.has(e.name)||(0,r.ZP)(new r.aE(`No component named "${e.name}" found to override`)),this.registry[e.name]=e}registerToSlot(e,t){this.getComponentConfig(e).type!==s.r.SLOT&&(0,r.ZP)(new r.aE(`Slot "${e}" is not configured as a slot component.`)),(0,l.isUndefined)(this.slots[e])&&(this.slots[e]=[]),this.slots[e].push(t),this.slots[e].sort((e,t)=>(e.priority??0)-(t.priority??0))}getSlotComponents(e){return this.slots[e]??[]}registerConfig(e){let t=m(e);Object.assign(this.configs,t)}getComponentConfig(e){if((0,l.isUndefined)(this.configs[e]))throw Error(`Component configuration for "${e}" not found.`);return this.configs[e]}constructor(){this.registry={},this.slots={},this.configs=m(a.O)}}g=(0,n.gn)([(0,o.injectable)()],g)},1829:function(e,t,i){i.d(t,{O:()=>r});var n=i(85893);i(81004);var o=i(74902);let r=e=>{let{component:t,props:i}=e,r=(0,o.qW)().get(t);return(0,n.jsx)(r,{...i})}},85486:function(e,t,i){i.d(t,{r:()=>o});var n,o=((n={}).SINGLE="single",n.SLOT="slot",n)},27614:function(e,t,i){i.d(t,{O:()=>l});var n=i(85893),o=i(81004),r=i(74902),a=i(96486);let l=e=>{let{slot:t,props:i,onRenderComponent:l}=e,{name:s,defaultEntries:d}=t,c=(0,r.qW)(),u=(0,o.useRef)(!1);if(!u.current&&!(0,a.isUndefined)(d)){let e=c.getSlotComponents(s).map(e=>{let{name:t}=e;return t});d.forEach(t=>{e.includes(t.name)||c.registerToSlot(s,t)}),u.current=!0}let p=c.getSlotComponents(s);return(0,n.jsx)(n.Fragment,{children:p.map((e,t)=>{let{component:o,name:r}=e,s=(0,n.jsx)(o,{...i},`component-${r}`);return(0,a.isUndefined)(l)?s:l(s,{name:r,index:t,props:i})})})}},19233:function(e,t,i){i.d(t,{useClearThumbnails:()=>u});var n=i(85893),o=i(22940),r=i(55859),a=i(81004),l=i(74976),s=i(62588),d=i(66660),c=i(23526);let u=()=>{let{t:e}=(0,l.useTranslation)(),[t,{isError:i,error:u}]=(0,o.DG)();(0,a.useEffect)(()=>{i&&(0,d.ZP)(new d.MS(u))},[i]);let p=async(e,i)=>{let n=t({id:e.id});await n,null==i||i()};return{clearImageThumbnailContextMenuItem:(t,i)=>({label:e("asset.tree.context-menu.clear-thumbnails"),key:c.N.clearImageThumbnails,icon:(0,n.jsx)(r.J,{value:"remove-image-thumbnail"}),hidden:"image"!==t.type||!(0,s.x)(t.permissions,"publish"),onClick:async()=>{await p(t,i)}}),clearVideoThumbnailContextMenuItem:(t,i)=>({label:e("asset.tree.context-menu.clear-thumbnails"),key:c.N.clearVideoThumbnails,icon:(0,n.jsx)(r.J,{value:"remove-video-thumbnail"}),hidden:"video"!==t.type||!(0,s.x)(t.permissions,"publish"),onClick:async()=>{await p(t,i)}}),clearPdfThumbnailContextMenuItem:(t,i)=>({label:e("asset.tree.context-menu.clear-thumbnails"),key:c.N.clearPdfThumbnails,icon:(0,n.jsx)(r.J,{value:"remove-pdf-thumbnail"}),hidden:"application/pdf"!==t.mimeType||!(0,s.x)(t.permissions,"publish"),onClick:async()=>{await p(t,i)}})}}},17418:function(e,t,i){i.d(t,{useZipDownload:()=>b});var n=i(85893),o=i(61708),r=i(56684),a=i(47588),l=i(35715);let s=e=>({id:(0,l.K)(),action:e.action,type:"download",title:e.title,status:a.B.QUEUED,topics:e.topics,config:{downloadUrl:e.downloadUrl}});var d=i(74976),c=i(72323),u=i(55859),p=i(81004),m=i(62588),g=i(17180),h=i(11093),x=i(51469),v=i(66660),f=i(23526);let b=e=>{let[t]=(0,r.useAssetExportZipFolderMutation)(),[i,{isError:a,error:l}]=(0,r.useAssetExportZipAssetMutation)(),{addJob:b}=(0,o.useJobs)(),{t:y}=(0,d.useTranslation)(),{isTreeActionAllowed:j}=(0,h.useTreePermission)();(0,p.useEffect)(()=>{a&&(0,v.ZP)(new v.MS(l))},[a]);let w=n=>{let{jobTitle:o,requestData:r}=n;b(s({title:y("jobs.zip-job.title",{title:o}),topics:[c.F["zip-download-ready"],...c.b],downloadUrl:"/pimcore-studio/api/assets/download/zip/{jobRunId}",action:async()=>{let n;return n="folder"===e.type?t(r):i(r),(await n).data.jobRunId}}))};return e.type,{createZipDownload:w,createZipDownloadTreeContextMenuItem:e=>({label:y("asset.tree.context-menu.download-as-zip"),key:f.N.downloadAsZip,icon:(0,n.jsx)(u.J,{value:"download-zip"}),hidden:!j(x.W.DownloadZip)||"folder"!==e.type||!(0,m.x)(e.permissions,"view"),onClick:()=>{w({jobTitle:e.label,requestData:{body:{folders:[parseInt(e.id)]}}})}}),createZipDownloadContextMenuItem:(e,t)=>({label:y("asset.tree.context-menu.download-as-zip"),key:f.N.downloadAsZip,icon:(0,n.jsx)(u.J,{value:"download-zip"}),hidden:"folder"!==e.type||!(0,m.x)(e.permissions,"view"),onClick:()=>{w({jobTitle:(0,g.YJ)(e,"asset"),requestData:{body:{folders:[e.id]}}})}})}}},19719:function(e,t,i){i.d(t,{LA:()=>o,hi:()=>r,sB:()=>a,useThumbnailVideoGetCollectionQuery:()=>l});var n=i(62848);let o=["Asset Thumbnails"],r=n.h.enhanceEndpoints({addTagTypes:o}).injectEndpoints({endpoints:e=>({thumbnailImageGetCollection:e.query({query:()=>({url:"/pimcore-studio/api/thumbnails/image"}),providesTags:["Asset Thumbnails"]}),thumbnailVideoGetCollection:e.query({query:()=>({url:"/pimcore-studio/api/thumbnails/video"}),providesTags:["Asset Thumbnails"]})}),overrideExisting:!1}),{useThumbnailImageGetCollectionQuery:a,useThumbnailVideoGetCollectionQuery:l}=r},63458:function(e,t,i){i.d(t,{oJ:()=>r,vN:()=>l});var n=i(46309);let o=(0,i(59511).oM)({name:"authentication",initialState:{isAuthenticated:void 0},reducers:{setAuthState(e,t){e.isAuthenticated=t.payload},resetAuthState(e){e.isAuthenticated=void 0}}});(0,n.fz)(o);let{setAuthState:r,resetAuthState:a}=o.actions,l=e=>e.authentication.isAuthenticated;o.reducer},45981:function(e,t,i){i.d(t,{YA:()=>n,_y:()=>o});let{useLoginMutation:n,useLogoutMutation:o}=i(62848).h.enhanceEndpoints({addTagTypes:["Authorization"]}).injectEndpoints({endpoints:e=>({login:e.mutation({query:e=>({url:"/pimcore-studio/api/login",method:"POST",body:e.credentials}),invalidatesTags:["Authorization"]}),logout:e.mutation({query:()=>({url:"/pimcore-studio/api/logout",method:"POST"}),invalidatesTags:["Authorization"]})}),overrideExisting:!1})},10186:function(e,t,i){i.d(t,{useDeleteDraft:()=>p});var n=i(81004),o=i(74976),r=i(68922),a=i(90165),l=i(2433),s=i(66185),d=i(38119),c=i(74347),u=i(96486);let p=()=>{var e;let{t}=(0,o.useTranslation)(),{id:i}=(0,n.useContext)(r.f),{dataObject:p}=(0,a.useDataObjectDraft)(i),[m,{isLoading:g,isError:h,error:x}]=(0,l.y7)(),{refreshElement:v}=(0,s.useElementRefresh)("data-object"),{confirm:f}=(0,d.useFormModal)();if(h)throw new c.Z(x);let b=t((null==p||null==(e=p.draftData)?void 0:e.isAutoSave)===!0?"delete-draft-auto-save":"delete-draft");return{deleteDraft:async()=>{(0,u.isNil)(null==p?void 0:p.draftData)||f({title:b,content:t("delete-draft-confirmation"),onOk:async()=>{(0,u.isNil)(null==p?void 0:p.draftData)||await m({id:p.draftData.id}).then(()=>{v(p.id)})}})},buttonText:b,isLoading:g,isError:h}}},44158:function(e,t,i){i.d(t,{M:()=>l,g:()=>a});var n=i(85893),o=i(81004),r=i(77476);let a=(0,o.createContext)({currentLayout:null,setCurrentLayout:()=>{}}),l=e=>{let{children:t,defaultLayout:i,isLoading:l}=e,[s,d]=(0,o.useState)(i);(0,o.useEffect)(()=>{null===s&&null!==i&&d(i)},[i]);let c=(0,o.useMemo)(()=>({currentLayout:s,setCurrentLayout:d}),[s]);return(0,n.jsx)(a.Provider,{value:c,children:l?(0,n.jsx)(r.V,{loading:!0}):t})}},44171:function(e,t,i){i.d(t,{k:()=>l});var n=i(85893),o=i(43439),r=i(37566);i(81004);var a=i(64235);let l=()=>{let e=(0,r.r)(),{currentLanguage:t,setCurrentLanguage:i,hasLocalizedFields:l}=(0,a.useLanguageSelection)();return l?(0,n.jsx)(o.k,{languages:[...e.requiredLanguages],onSelectLanguage:i,selectedLanguage:t}):(0,n.jsx)(n.Fragment,{})}},88087:function(e,t,i){i.d(t,{useCustomLayouts:()=>s});var n=i(90165),o=i(18962),r=i(66660),a=i(96486),l=i(47666);let s=e=>{let{dataObject:t,isLoading:i}=(0,n.useDataObjectDraft)(e),{data:s,error:d,isLoading:c}=(0,o.useClassCustomLayoutEditorCollectionQuery)({objectId:e},{skip:void 0===t||"folder"===t.type});void 0!==d&&(0,r.ZP)(new r.MS(d));let u=void 0!==s?s.items:void 0,p=(null==t?void 0:t.hasWorkflowAvailable)===!0,{data:m,isFetching:g}=(0,l.useWorkflowGetDetailsQuery)({elementType:"data-object",elementId:e},{skip:!p});return{layouts:u,getDefaultLayoutId:e=>{if((0,a.isUndefined)(u))return null;let t=u.find(e=>e.default)??u.find(t=>t.id===e)??u.find(e=>e.id===(null==m?void 0:m.layoutId))??u.find(e=>"0"===e.id)??u[0]??null;return(null==t?void 0:t.id)??null},isLoading:i||g||c&&(null==t?void 0:t.type)!=="folder"}}},2433:function(e,t,i){i.d(t,{hi:()=>g,yK:()=>x,Rl:()=>j,y7:()=>v,zZ:()=>h,KD:()=>b,z4:()=>y,Bb:()=>f});var n=i(96068);let o=i(62848).h.enhanceEndpoints({addTagTypes:["Versions"]}).injectEndpoints({endpoints:e=>({versionAssetDownloadById:e.query({query:e=>({url:`/pimcore-studio/api/versions/${e.id}/asset/download`}),providesTags:["Versions"]}),versionImageStreamById:e.query({query:e=>({url:`/pimcore-studio/api/versions/${e.id}/image/stream`}),providesTags:["Versions"]}),versionPdfStreamById:e.query({query:e=>({url:`/pimcore-studio/api/versions/${e.id}/pdf/stream`}),providesTags:["Versions"]}),versionGetById:e.query({query:e=>({url:`/pimcore-studio/api/versions/${e.id}`}),providesTags:["Versions"]}),versionUpdateById:e.mutation({query:e=>({url:`/pimcore-studio/api/versions/${e.id}`,method:"PUT",body:e.updateVersion}),invalidatesTags:["Versions"]}),versionPublishById:e.mutation({query:e=>({url:`/pimcore-studio/api/versions/${e.id}`,method:"POST"}),invalidatesTags:["Versions"]}),versionDeleteById:e.mutation({query:e=>({url:`/pimcore-studio/api/versions/${e.id}`,method:"DELETE"}),invalidatesTags:["Versions"]}),versionGetCollectionForElementByTypeAndId:e.query({query:e=>({url:`/pimcore-studio/api/versions/${e.elementType}/${e.id}`,params:{page:e.page,pageSize:e.pageSize}}),providesTags:["Versions"]}),versionCleanupForElementByTypeAndId:e.mutation({query:e=>({url:`/pimcore-studio/api/versions/${e.elementType}/${e.id}`,method:"DELETE"}),invalidatesTags:["Versions"]})}),overrideExisting:!1}),{useVersionAssetDownloadByIdQuery:r,useVersionImageStreamByIdQuery:a,useVersionPdfStreamByIdQuery:l,useVersionGetByIdQuery:s,useVersionUpdateByIdMutation:d,useVersionPublishByIdMutation:c,useVersionDeleteByIdMutation:u,useVersionGetCollectionForElementByTypeAndIdQuery:p,useVersionCleanupForElementByTypeAndIdMutation:m}=o,g=o.enhanceEndpoints({addTagTypes:[n.fV.ASSET_DETAIL],endpoints:{versionGetById:{providesTags:(e,t,i)=>n.Kx.VERSIONS_DETAIL(i.id)},versionGetCollectionForElementByTypeAndId:{providesTags:(e,t,i)=>{let o=[];return null==e||e.items.forEach(e=>{o.push(...n.Kx.VERSIONS_DETAIL(e.id))}),[...o,...n.Kx.ELEMENT_VERSIONS(i.elementType,i.id)]}},versionCleanupForElementByTypeAndId:{invalidatesTags:(e,t,i)=>n.xc.ELEMENT_VERSIONS(i.elementType,i.id)},versionUpdateById:{invalidatesTags:(e,t,i)=>n.xc.VERSIONS_DETAIL(i.id)},versionPublishById:{invalidatesTags:(e,t,i)=>n.xc.VERSIONS_DETAIL(i.id)},versionDeleteById:{invalidatesTags:(e,t,i)=>n.xc.VERSIONS_DETAIL(i.id)}}}),{useVersionAssetDownloadByIdQuery:h,useVersionCleanupForElementByTypeAndIdMutation:x,useVersionDeleteByIdMutation:v,useVersionGetByIdQuery:f,useVersionGetCollectionForElementByTypeAndIdQuery:b,useVersionPublishByIdMutation:y,useVersionUpdateByIdMutation:j}=g},96106:function(e,t,i){i.d(t,{i:()=>a});var n=i(46309),o=i(70912),r=i(96486);let a=e=>{let t=(0,o.BQ)(n.store.getState());return!(0,r.isNil)(t)&&l(t.contextPermissions,e)},l=(e,t)=>{if((0,r.isNil)(e))return!1;let i=t.split("."),n=e;for(let e of i)if("object"!=typeof n||!(e in n))return!1;else n=n[e];return!0===n}},37021:function(e,t,i){i.d(t,{CX:()=>p,LA:()=>o,OE:()=>m,Rs:()=>g,UN:()=>x,V9:()=>l,YI:()=>u,hi:()=>r,iP:()=>h,jc:()=>c,oT:()=>d,qk:()=>a,wc:()=>s});var n=i(62848);let o=["Perspectives"],r=n.h.enhanceEndpoints({addTagTypes:o}).injectEndpoints({endpoints:e=>({perspectiveCreate:e.mutation({query:e=>({url:"/pimcore-studio/api/perspectives/configuration",method:"POST",body:e.addPerspectiveConfig}),invalidatesTags:["Perspectives"]}),perspectiveGetConfigCollection:e.query({query:()=>({url:"/pimcore-studio/api/perspectives/configurations"}),providesTags:["Perspectives"]}),perspectiveGetConfigById:e.query({query:e=>({url:`/pimcore-studio/api/perspectives/configuration/${e.perspectiveId}`}),providesTags:["Perspectives"]}),perspectiveUpdateConfigById:e.mutation({query:e=>({url:`/pimcore-studio/api/perspectives/configuration/${e.perspectiveId}`,method:"PUT",body:e.savePerspectiveConfig}),invalidatesTags:["Perspectives"]}),perspectiveDelete:e.mutation({query:e=>({url:`/pimcore-studio/api/perspectives/configuration/${e.perspectiveId}`,method:"DELETE"}),invalidatesTags:["Perspectives"]}),perspectiveWidgetCreate:e.mutation({query:e=>({url:`/pimcore-studio/api/perspectives/widgets/${e.widgetType}/configuration`,method:"POST",body:e.body}),invalidatesTags:["Perspectives"]}),perspectiveWidgetGetConfigCollection:e.query({query:()=>({url:"/pimcore-studio/api/perspectives/widgets/configurations"}),providesTags:["Perspectives"]}),perspectiveWidgetGetConfigById:e.query({query:e=>({url:`/pimcore-studio/api/perspectives/widgets/${e.widgetType}/configuration/${e.widgetId}`}),providesTags:["Perspectives"]}),perspectiveWidgetUpdateConfigById:e.mutation({query:e=>({url:`/pimcore-studio/api/perspectives/widgets/${e.widgetType}/configuration/${e.widgetId}`,method:"PUT",body:e.body}),invalidatesTags:["Perspectives"]}),perspectiveWidgetDelete:e.mutation({query:e=>({url:`/pimcore-studio/api/perspectives/widgets/${e.widgetType}/configuration/${e.widgetId}`,method:"DELETE"}),invalidatesTags:["Perspectives"]}),perspectiveWidgetGetTypeCollection:e.query({query:()=>({url:"/pimcore-studio/api/perspectives/widgets/types"}),providesTags:["Perspectives"]})}),overrideExisting:!1}),{usePerspectiveCreateMutation:a,usePerspectiveGetConfigCollectionQuery:l,usePerspectiveGetConfigByIdQuery:s,usePerspectiveUpdateConfigByIdMutation:d,usePerspectiveDeleteMutation:c,usePerspectiveWidgetCreateMutation:u,usePerspectiveWidgetGetConfigCollectionQuery:p,usePerspectiveWidgetGetConfigByIdQuery:m,usePerspectiveWidgetUpdateConfigByIdMutation:g,usePerspectiveWidgetDeleteMutation:h,usePerspectiveWidgetGetTypeCollectionQuery:x}=r},92430:function(e,t,i){i.d(t,{X:()=>v});var n=i(85893),o=i(86352),r=i(81004),a=i(55859),l=i(26788),s=i(74976);let d=e=>{let{icon:t,title:i}=e,{t:o}=(0,s.useTranslation)();return(0,n.jsx)(l.Tooltip,{placement:"right",title:o(i),children:(0,n.jsx)("div",{children:(0,n.jsx)(a.J,{options:{width:16,height:16},...t})})})};var c=i(84420);let u=(0,i(10781).kc)(e=>{let{token:t,css:i}=e;return{title:i`
      .ant-space-item {
        display: flex;
        align-items: center;
      }
    `}},{hashPriority:"low"});var p=i(99209),m=i(41479);let g=e=>{let{icon:t,title:i,onClose:o,onConfirm:r}=e,{styles:d}=u(),{t:g}=(0,s.useTranslation)(),h=()=>{null==o||o()};return(0,n.jsxs)(p.T,{className:["widget-manager-tab-title",d.title].join(" "),onMouseDown:e=>{1===e.button&&h()},size:"mini",children:[(0,n.jsx)(a.J,{options:{width:16,height:16},...t}),(0,n.jsx)(m.Q,{ellipsis:!0,style:{maxWidth:"300px",color:"inherit"},value:i}),void 0!==o&&void 0!==r&&(0,n.jsx)(l.Popconfirm,{onConfirm:()=>{null==r||r()},title:g("widget-manager.tab-title.close-confirmation"),children:x()}),void 0!==o&&void 0===r&&x()]});function x(){return(0,n.jsx)(c.z,{className:"widget-manager__tab-title-close-button",onClick:h,onMouseDown:e=>{e.stopPropagation()},type:"link",children:(0,n.jsx)(a.J,{options:{width:14,height:14},value:"close"})})}};var h=i(81354),x=i(96486);let v=e=>{let{node:t,modified:i}=e,{t:a}=(0,s.useTranslation)(),[l]=(0,r.useState)(t.getParent()instanceof o.BorderNode),c=t.getConfig(),u=c.icon??{value:"widget-default",type:"name"},p=(0,x.isString)(c.translationKey)?a(c.translationKey):t.getName(),{closeWidget:m}=(0,h.useWidgetManager)(),v=t.isEnableClose();return l?(0,n.jsx)(d,{icon:u,title:a(`${t.getName()}`)}):(0,n.jsx)(g,{icon:u,onClose:v?()=>{(!1===i||void 0===i)&&m(t.getId())}:void 0,onConfirm:!0===i?()=>{m(t.getId())}:void 0,title:p+(!0===i?"*":"")})}},19505:function(e,t,i){i.d(t,{H:()=>d,M:()=>s});var n=i(85893),o=i(81004),r=i(86352),a=i(19908),l=i(86207);let s=(0,o.createContext)({nodeId:null}),d=e=>{let{node:t,component:i}=e,[d]=(0,o.useState)(t.getId()),c=t.getParent()instanceof r.BorderNode,u=t.getConfig().icon??{value:"widget-default",type:"name"};return(0,o.useMemo)(()=>(0,n.jsx)(l.Z,{children:(0,n.jsx)(s.Provider,{value:{nodeId:d},children:(0,n.jsx)(a.Lf,{icon:u,showTitle:c,title:t.getName(),children:(0,n.jsx)(i,{...t.getConfig()})})})}),[d,c])}},19908:function(e,t,i){i.d(t,{Lf:()=>h,Xt:()=>m,B$:()=>g});var n=i(85893),o=i(81004),r=i.n(o),a=i(55859),l=i(10781);let s=(0,l.kc)(e=>{let{token:t,css:i}=e;return{WidgetTitle:i`
      display: flex;
      padding: ${t.paddingXS}px ${t.paddingSM}px;
      gap: 8px;
      align-items: center;
      color: ${t.Tree.colorPrimaryHeading};
      font-weight: 600;
    `}},{hashPriority:"low"}),d=e=>{let{styles:t}=s(),{title:i,icon:o,className:r}=e;return(0,n.jsxs)("div",{className:[t.WidgetTitle,r,"foobar"].join(" "),children:[(0,n.jsx)(a.J,{options:{width:18,height:18},...o}),(0,n.jsx)("span",{children:i})]})},c=(0,l.kc)(e=>{let{token:t,css:i}=e;return{Widget:i`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .widget__content {
        flex: 1;
        overflow: auto;
        contain: layout size;
        position: relative;
      }

      .widget__title {
        padding-top: ${t.paddingSM}px;
      }
    `}},{hashPriority:"low"});var u=i(74976),p=i(94047);let m={name:"widget"},g="widget__content",h=r().memo(e=>{let{styleDefinition:t}=(0,p.useCssContainer)(m),{styles:i}=c(),{title:o,showTitle:r,icon:a,children:l}=e,{t:s}=(0,u.useTranslation)();return(0,n.jsxs)("div",{className:["widget",i.Widget,t.styles.container].join(" "),children:[!0===r&&(0,n.jsx)(d,{className:"widget__title",icon:a,title:s(o)}),(0,n.jsx)("div",{className:g,children:l})]})})},94047:function(e,t,i){i.d(t,{useCssContainer:()=>r});var n=i(81004);let o=(0,i(10781).kc)((e,t)=>{let{token:i,css:n}=e;return{container:n`
      container: ${t.name} / ${t.type};
    `}}),r=e=>{let{name:t,type:i="size"}=e,r=o({name:t,type:i});return(0,n.useMemo)(()=>({styleDefinition:r}),[])}},54275:function(e,t,i){i.d(t,{useServerSideEvent:()=>l});var n=i(81004),o=i(61251),r=i(66660);let a=o.e.mercureUrl,l=e=>{let t,{topics:i,messageHandler:o,openHandler:l}=e;function s(){void 0!==t&&t.close()}return 0===i.length&&(0,r.ZP)(new r.aE("No topics provided")),(0,n.useEffect)(()=>()=>{s()},[]),{open:function(){let e=new URL(a);i.forEach(t=>{e.searchParams.append("topic",t)}),t=new EventSource(e.toString()),void 0!==o&&(t.onmessage=o),void 0!==l&&(t.onopen=l)},close:s}}},63739:function(e,t,i){i.d(t,{s:()=>o});var n=i(66660);async function o(e){let{url:t,onSuccess:i,interval:o=3e3}=e,r=async()=>{let e=await fetch(t);200===e.status?i(await e.blob()):202===e.status?setTimeout(r,o):(0,n.ZP)(new n.aE(`Unexpected response status: ${e.status}`))};await r()}},31584:function(e,t,i){i.r(t),i.d(t,{ElementTreeSkeleton:()=>er,fromDayJs:()=>A.Qp,IconButton:()=>u.h,DefaultCell:()=>e0.G,AccordionTimeline:()=>b,Text:()=>t4.x,SortButton:()=>tJ.K,ImagePreview:()=>e7.e,Split:()=>tK.P,useElementTreeNode:()=>eh,Popconfirm:()=>th,Empty:()=>eB,IconTextButton:()=>e5.W,useElementTreeRootNode:()=>eD,DropdownButton:()=>H.P,defaultStyleOptions:()=>e2.r,Sidebar:()=>tq.Y,Progress:()=>tD.E,WindowModal:()=>ty.i,LanguageSelection:()=>ta.k,Icon:()=>eb.J,validateOneFieldEmpty:()=>tS.H9,withError:()=>iS.AQ,StackList:()=>t1.f,detectLanguageFromFilename:()=>is,Badge:()=>S.C,Segmented:()=>tX.r,withInfo:()=>iS.cw,AssetTarget:()=>j.Z,Switch:()=>t8.r,SortDirections:()=>tJ.f,UploadModalButton:()=>tx.F,SkeletonAvatar:()=>tV,useFormModal:()=>tm.useFormModal,getSizingClasses:()=>C.r,Filename:()=>eL.Q,UsersRolesDropdown:()=>iv.h,Divider:()=>L.i,CollapseHeader:()=>$.o6,ElementTag:()=>W.V,CollapseItem:()=>$.TL,Form:()=>eG.l,Grid:()=>eY.r,InheritanceOverlay:()=>ti.A,LoginForm:()=>ik.U,ModalFooter:()=>tp.m,Progressbar:()=>tB.c,TextArea:()=>iu.K,ToolStrip:()=>ig.Q,TreeExpander:()=>ew,addColumnConfig:()=>e1.G,Box:()=>C.x,Checkbox:()=>_.X,NodeApiHookProvider:()=>ep,SanitizeHtml:()=>tO.Z,useModal:()=>iS.useModal,FocalPointProvider:()=>eq,WorkflowCard:()=>ib.J,toDayJs:()=>A.Um,TreeList:()=>ef,Droppable:()=>q.b,PimcoreAudio:()=>iy,TagList:()=>t5.P,SplitLayoutDivider:()=>tY.i,Alert:()=>y.b,Draggable:()=>X,Tag:()=>t2.V,Menu:()=>ts.v,createImageThumbnailUrl:()=>e7.n,withTextarea:()=>tm.mC,TextEditor:()=>ic,sizeOptions:()=>e9.q,Button:()=>m.z,VerticalTimeline:()=>f,Compact:()=>E.D,PimcoreImage:()=>eO.X,UploadModal:()=>tv.Z,SplitLayout:()=>tQ.K,UploadModalProvider:()=>tf.k,useNotification:()=>tw.l,formatDatePickerDate:()=>A.Sw,Dropdown:()=>V.L,transformLanguage:()=>ta.N,useNodeApiHook:()=>em,ColorPicker:()=>N.z,withUpload:()=>tm.LQ,Content:()=>I.V,useElementTree:()=>eg,withSuccess:()=>iS.vq,withWarn:()=>iS.uW,Flex:()=>e$.k,FocalPoint:()=>eX,FieldFilters:()=>eA.B,Input:()=>tn.I,Tabs:()=>t6.m,TreeContext:()=>eP,defaultProps:()=>eI,ContentLayout:()=>P.D,SplitLayoutItem:()=>t0.b,TreeElement:()=>ix._,SizeTypes:()=>tP,PQLQueryInput:()=>tk.F,getLanguageExtensions:()=>il,SearchInput:()=>tz.M,DataObjectPreview:()=>iP,useAlertModal:()=>tu.s,DateRangePicker:()=>D.D,Background:()=>w.A,useUploadModalContext:()=>tb.useUploadModalContext,FormItemWrapper:()=>i_,DragAndDropContextProvider:()=>G.G,ElementToolbarSkeleton:()=>ee,Region:()=>tR,Collapse:()=>$.UO,useEditMode:()=>eY.useEditMode,FormattedDate:()=>eV.J,ModalTitle:()=>tg.r,withConfirm:()=>tm.Au,withInput:()=>tm.ce,DragAndDropInfoContext:()=>G.y,InputPassword:()=>tr.C,Select:()=>e9.P,FormattedDateTime:()=>eH.k,DynamicFilter:()=>Z.x,Paragraph:()=>tC.n,GeoBoundsDrawer:()=>eW.t,Header:()=>e8.h,GeoMap:()=>eJ.W,GeoPolyDrawer:()=>eQ.h,ImageZoom:()=>tt,SkeletonButton:()=>tH,ModalUploadButton:()=>tx.v,NumericRange:()=>tS.mD,useMessage:()=>td.U,Accordion:()=>p,Title:()=>ip.D,ElementTree:()=>eM,PreviewCard:()=>tM,Breadcrumb:()=>T.a,GeoPointPicker:()=>eK.F,Logo:()=>tl.T,Card:()=>k.Z,NoContent:()=>tj.d,NodeApiHookContext:()=>eu,TimePicker:()=>B.j,ToolStripBox:()=>ih.K,TreeNode:()=>ek,ElementToolbar:()=>J.U,DragOverlay:()=>F.y,Spin:()=>ej.y,FormattedTime:()=>eZ.q,UploadContext:()=>tf.c,HotspotImage:()=>e2.E,TreeNodeContent:()=>eN,Modal:()=>tc.u,SkeletonInput:()=>tZ,DatePicker:()=>M.M,PimcoreVideo:()=>iw.o,Slider:()=>tW.i,FileList:()=>iC,Image:()=>e4.E,Toolbar:()=>im.o,treeNodeDefaultProps:()=>eT,PimcoreDocument:()=>ij.s,HorizontalScroll:()=>e6.Z,ReloadPopconfirm:()=>tU.t,validateSecondValueGreater:()=>tS.oS,Skeleton:()=>tG,Pagination:()=>tT.t,useBreadcrumbSize:()=>T.P,InputNumber:()=>to.R,Space:()=>eo.T});var n,o=i(85893),r=i(81004),a=i.n(r),l=i(26788),s=i(10781);let d=(0,s.kc)(e=>{let{token:t,css:i}=e,n={highlightBackgroundColor:"#F6FFED",highlightBorderColor:"#B7EB8F",highlightColor:"#52C41A",...t};return{accordion:i`
        border: none;

        &.ant-collapse-borderless.accordion--spaced {
            > .ant-collapse-item:last-child {
                > .ant-collapse-header[aria-expanded='false'] {
                    border-radius: ${n.borderRadiusLG}px;
                }

                > .ant-collapse-header[aria-expanded='true'] {
                    border-top-left-radius: ${n.borderRadiusLG}px;
                    border-top-right-radius: ${n.borderRadiusLG}px;
                }
            }
        }

        .ant-collapse-item.accordion__item--theme-success {
            border: 1px solid ${n.highlightBorderColor};
            background-color: ${n.highlightBackgroundColor};
            border-radius: ${n.borderRadiusLG}px !important;

            > .ant-collapse-content {
                border-top: 1px solid ${n.highlightBorderColor};
                background-color: transparent;
            }
        }

        .ant-collapse-item.accordion__item--theme-primary {
            border: 1px solid ${n.colorBorder};
            border-radius: ${n.borderRadiusLG}px !important;
            background-color: ${n.colorFillAlter};

            > .ant-collapse-content {
                border-top: 1px solid ${n.colorBorder};
                background-color: transparent;
            }
        }

        .accordion__item {
          + .accordion__item {
            margin-top: ${t.marginXS}px;
          }
          
            > .ant-collapse-header {
                display: inline-flex;
                width: 100%;
                align-items: baseline;

                > .ant-collapse-header-text {
                    margin-inline-end: 0;
                }

                > .ant-collapse-expand-icon {
                    display: none;
                }
            }

            .accordion__chevron-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 ${t.marginXXS}px;
            }

            .accordion__chevron {
                rotate: 180deg;
                transition-duration: 0.6s;
                transition-property: transform;
            }

            .accordion__chevron--up {
                transform: rotate(-180deg);
            }
        }

        .ant-collapse-extra {
            order: 1;
            margin-left: 5px;
        }
    `,table:i`
      width: min-content;
      min-width: 100%;

      .ant-collapse-item .ant-collapse-content .ant-collapse-content-box {
        padding: 0;
      }

      .ant-table {
        table {
          border: 0;
          border-radius: 0;

          th {
            padding: ${t.paddingXXS}px ${t.paddingXS}px !important;
          }
        }

        .ant-table-thead {
          th:first-child {
            border-left: 0;
          }
          tr:first-child th:first-child {
            border-top-left-radius: 0;
          }
          tr:first-child th:last-child {
            border-top-right-radius: 0;
          }
        }

        .ant-table-tbody {
          td:first-child {
            border-left: 0;
          }

          .ant-table-row:last-of-type {
            .ant-table-cell:first-of-type {
              border-bottom-left-radius: 0;
            }

            .ant-table-cell:last-of-type {
              border-bottom-right-radius: 0;
            }

            .ant-table-cell {
              border-bottom: 0;
            }
          }
        }
      }
    `,bordered:i`
      background: ${t.colorBgContainer};
      
      &.accordion--bordered {
        .ant-collapse-item {
          background: ${t.colorBgContainer};
          border: 1px solid ${t.colorBorderSecondary};
          border-radius: ${t.borderRadius}px;
        }
        
        .ant-collapse-header {
          font-weight: ${t.fontWeightStrong};
        }

        .accordion-item__header-info {
          font-weight: 400;
          color: ${t.colorTextSecondary};
        }

        .ant-collapse-content {
          border-color: ${t.colorBorderSecondary};
        }
        
        &.ant-collapse-small {
          .ant-collapse-item {
            border-radius: ${t.borderRadiusSM}px;
          }
          
          .ant-collapse-header {
            padding: ${t.paddingXXS}px ${t.paddingSM}px;
          }
        }
      }
    `,spaced:i`
      background: ${t.colorBgContainer};

      .accordion__item {
        margin-bottom: 24px;
        border-bottom: none;
      }

      .ant-collapse-header[aria-expanded='false'] {
        background-color: ${t.colorBgSelectedTab};
        border: 1px solid ${t.colorBorder};
        border-radius: 5px;
      }

      .ant-collapse-header[aria-expanded='true'] {
        background-color: ${t.colorBgSelectedTab};
        border: 1px solid ${t.colorBorder};
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }

      .ant-collapse-content-box {
        border: 1px solid ${t.colorBorder};
        border-top: none;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        background-color: ${t.colorBgSelectedTab};
      }
    `}});var c=i(20994),u=i(84666);let p=e=>{let{items:t,accordion:i=!1,spaced:n=!1,bordered:a=!1,table:s=!1,className:p,activeKey:m,expandIconPosition:g="after-title",...h}=e,{styles:x}=d(),[v,f]=(0,r.useState)([]);(0,r.useEffect)(()=>{f([String(m)])},[m]);let b=e=>{i?f(t=>t.includes(e)?[]:[e]):f(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])},y=(null==t?void 0:t.map(e=>{let t=["accordion__chevron",null!=e.key&&v.includes(String(e.key))?"accordion__chevron--up":""].join(" "),i=()=>(0,o.jsx)(u.h,{"aria-label":c.ZP.t("aria.notes-and-events.expand"),className:"accordion__chevron-btn",icon:{value:"chevron-up",className:t},onClick:()=>{null!=e.id&&b(e.id)},role:"button",size:"small",type:"text",variant:"minimal"}),{disabled:n,...r}=e,a=[null==e?void 0:e.className,"accordion__item"].filter(Boolean);return void 0!==e.theme&&a.push(`accordion__item--${e.theme}`),{...r,className:a.join(" "),label:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(l.Flex,{align:"baseline",children:["start"===g&&null!==e.children&&!0!==e.disabled&&i(),e.title,"after-title"===g&&null!==e.children&&!0!==e.disabled&&i(),(0,o.jsx)("span",{className:"accordion-item__header-info",children:null!==e.info&&e.info})]}),e.subtitle]}),title:"",subtitle:"",...e.disabled?{collapsible:"icon"}:{}}}))??[],j=["accordion",p,x.accordion];return n&&(j.push("accordion--spaced",x.spaced),j.push(x.spaced)),a&&(j.push("accordion--bordered",x.bordered),j.push(x.bordered)),s&&(j.push("accordion--table",x.table),j.push(x.table)),(0,o.jsx)(l.Collapse,{accordion:i,activeKey:v,bordered:!n,className:j.join(" "),items:y,onChange:e=>{f(Array.isArray(e)?e:[e])},...h})};var m=i(84420),g=i(63387),h=i.n(g);let x=(0,s.kc)(e=>{let{token:t,css:i}=e;return{card:i`
        & .ant-collapse {
            width: 340px;
            background-color: white;
        }

        & span, & div, div.anticon, button {
            vertical-align: middle;
        }
    `}},{hashPriority:"low"}),v=(0,s.kc)(e=>{let{token:t,css:i}=e;return{timeline:i`
      padding-left: ${t.paddingXS}px;
    
      & > div {
        position: relative;
        margin: 0;
        
        padding: 3px 0 7px 21px;
        
        border-left: 2px solid rgba(0,0,0,6%);
      }

      & > div:before {
        content: '';
        
        position: absolute;
        margin-top: 16px;
        margin-right: -4px;
        right: 100%;
        text-align: center;

        height: 6px;
        width: 6px;
        border-radius: 50%;
        background-color: white;
        border: 2px solid ${t.colorTextDisabled};
      }

      & > .is-active:before {
        height: 10px;
        width: 10px;
        margin-right: -6px;
        border-color: ${t.colorPrimary};
      }

      & > .is-published:before {
        border-color: ${t.colorSuccess};
    `}},{hashPriority:"low"}),f=e=>{let{timeStamps:t}=e,{styles:i}=v();return(0,o.jsx)("div",{className:i.timeline,children:t})},b=e=>{let{items:t}=e,{styles:i}=x(),n=t.map(e=>(0,o.jsx)("div",{className:h()(i.card,e.className),children:!0===e.selected?(0,o.jsx)(p,{activeKey:e.key,expandIconPosition:"after-title",items:[e]}):(0,o.jsx)(p,{expandIconPosition:"after-title",items:[e]})},e.key));return(0,o.jsx)(f,{timeStamps:n})};var y=i(36414),j=i(44441),w=i(31600),S=i(75052),T=i(28372),C=i(84901),k=i(34365),_=i(34228),$=i(78801),N=i(52046),E=i(55972),I=i(77476),P=i(70302),M=i(9383),D=i(5438),B=i(94258),A=i(33708),L=i(86263),F=i(80136),R=i(95684),U=i(26254);let O=(0,s.vJ)(e=>{let{theme:t}=e;return{".dnd--dragging":{cursor:"move"},".dnd--invalid":{".dnd__overlay":{background:t.colorErrorBg,color:t.colorErrorActive}}}});var z=i(66660);let X=a().memo(function(e){let[t]=(0,r.useState)((0,U.V)()),{attributes:i,listeners:n,setNodeRef:a}=(0,R.useDraggable)({id:t,data:e.info}),l=r.Children.only(e.children);if(!(0,r.isValidElement)(l))throw(0,z.ZP)(new z.aE("Children must be a valid react component")),Error("Invalid React child element.");return(0,r.useMemo)(()=>(0,o.jsxs)("div",{ref:a,...n,...i,children:[(0,o.jsx)(O,{}),e.children]}),[e.children])});var q=i(62056),G=i(50947),V=i(82717),H=i(7108),Z=i(31070),W=i(97456),J=i(57732);let K=(0,s.kc)(e=>{let{token:t,css:i}=e;return{skeleton:i`
      display: flex;
      align-items: center;
      gap: 8px;
      height: 40px;
    `}}),Q=(0,s.kc)(e=>{let{css:t}=e;return{skeleton:t`
      display: flex;
      gap: 4px;
    `}}),Y=()=>{let{styles:e}=Q();return(0,o.jsxs)("div",{className:e.skeleton,children:[(0,o.jsx)(l.Skeleton.Button,{active:!0,size:"small"}),(0,o.jsx)(l.Skeleton.Input,{active:!0,size:"small"}),(0,o.jsx)(l.Skeleton.Input,{active:!0,size:"small"})]})},ee=()=>{let{styles:e}=K();return(0,o.jsxs)("div",{className:e.skeleton,children:[(0,o.jsx)(Y,{}),(0,o.jsx)(l.Skeleton.Button,{active:!0,size:"small"}),(0,o.jsx)(l.Skeleton.Avatar,{active:!0,shape:"circle",size:"small"})]})},et=(0,s.kc)(e=>{let{token:t,css:i}=e;return{treeNode:i`
      user-select: none;

      &.tree-node--is-root {
        .tree-node__content {
          padding-left: ${t.paddingSM}px;
        }
      }

      &.tree-node--danger {
        .tree-node__content .tree-node__content-wrapper {
          color: ${t.colorError};
          text-decoration: line-through;
        }
      }

      .tree-node__content {
        cursor: pointer;
        width: 100%;
        white-space: nowrap;
        align-items: center;

        .tree-node__content-wrapper {
          width: 100%;
          overflow: hidden;
        }

        @media (hover: hover) {
          &:hover {
            background-color: ${t.controlItemBgActiveHover};
          }
        }

        &:focus {
          outline: none;
          background-color: ${t.controlItemBgActiveHover};
        }
      }

      .tree-node__content-inner {
        padding: 2px ${t.paddingSM}px 2px 0;
      }

      &.tree-node--selected > .tree-node__content {
        background-color: ${t.controlItemBgActive};
      }

      .tree-node-content__label {
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    `}},{hashPriority:"low"}),ei=(0,s.kc)(e=>{let{token:t,css:i}=e;return{"tree-list__pager":i` 
      padding: ${t.paddingSM}px 0;

      &:empty {
        padding: 0;
      }
    `,"tree-list__search":i`
      padding: ${t.paddingXXS}px ${t.paddingSM}px ${t.paddingXS}px 0;

      &:empty {
        padding: 0;
      }

      .ant-btn-default {
        border-color: ${t.colorBorder}
      }
    `}},{hashPriority:"low"});var en=i(832),eo=i(99209);let er=e=>(0,o.jsx)(en.E.div,{animate:{opacity:1},initial:{opacity:0},...e,children:(0,o.jsx)(C.x,{padding:{top:"extra-small",bottom:"extra-small",right:"extra-small"},children:(0,o.jsx)(eo.T,{className:"w-full",direction:"vertical",size:"extra-small",children:Array.from({length:5}).map((e,t)=>(0,o.jsx)(l.Skeleton.Input,{active:!0,block:!0,style:{height:16}},t))})})});var ea=i(46309),el=i(94374),es=i(81722),ed=i(54322),ec=i(96486);let eu=(0,r.createContext)(void 0),ep=e=>{let{nodeApiHook:t,children:i}=e,n=(0,r.useMemo)(()=>({nodeApiHook:t}),[t]);return(0,o.jsx)(eu.Provider,{value:n,children:i})},em=()=>{let e=(0,r.useContext)(eu);if(void 0===e)throw Error("useNodeApiHook must be used within a NodeApiHookProvider");return e},eg=()=>{let e=(0,ea.TL)(),{nodeApiHook:t}=em(),{fetchChildren:i}=t(),{treeId:n}=(0,ed.useTreeId)(),o=e=>{let t=(0,el.RX)(ea.store.getState(),n,e)??{isFetching:!1,page:1,isSelected:!1,isScrollTo:!1,isExpanded:!1,isFetchTriggered:!1};return{...t,isExpanded:t.isExpanded,page:t.page??1}},r=async(t,r)=>{let s=o(t);return r&&e((0,el.X5)({treeId:n,parentId:t,nodes:[],total:0})),((0,ec.isUndefined)(null==s?void 0:s.isLoading)||r)&&a(t,!0),l(t,!0),await i({id:t,internalKey:t},s)},a=(t,i)=>{e((0,el.Xd)({treeId:n,nodeId:t,loading:i}))},l=(t,i)=>{e((0,el.sQ)({treeId:n,nodeId:t,isFetching:i}))},s=(t,i)=>{e((0,el.df)({treeId:n,nodeId:t,page:i}))},d=(t,i)=>{var r;(null==(r=o(t).treeNodeProps)?void 0:r.hasChildren)!==i&&e((0,el.Zq)({treeId:n,nodeId:t,hasChildren:i}))};return{setLoading:a,setFetching:l,setExpanded:(t,i)=>{e((0,el.ri)({treeId:n,nodeId:t,expanded:i}))},setPage:s,setSearchTerm:(t,i)=>{e((0,el.T9)({treeId:n,nodeId:t,searchTerm:i}))},setSelectedIds:t=>{e((0,el.eR)({treeId:n,selectedNodeIds:t}))},setScrollTo:(t,i)=>{e((0,el.Tg)({treeId:n,nodeId:t,scrollTo:i}))},refreshChildren:(t,i)=>{r(t,i).then(i=>{(0,ec.isUndefined)(i)||(e((0,el.X5)({treeId:n,parentId:t,nodes:i.nodes,total:i.total})),o(t).page>1&&0===i.nodes.length&&s(t,1),1===o(t).page&&d(t,i.nodes.length>0)),a(t,!1),l(t,!1)}).catch(e=>{console.error(e)})}}},eh=e=>{let t=(0,ea.TL)(),{treeId:i}=(0,ed.useTreeId)(),{refreshChildren:n,setLoading:o,setFetching:r,setExpanded:a,setPage:l,setSearchTerm:s,setSelectedIds:d,setScrollTo:c}=eg(),u=(0,es.v9)(t=>(0,el.RX)(t,i,e))??{isFetching:!1,page:1,isSelected:!1,isScrollTo:!1,isExpanded:!1,isFetchTriggered:!1},p={...u,isExpanded:u.isExpanded,page:u.page??1};return{...p,setLoading:t=>{o(e,t)},setFetching:t=>{r(e,t)},setExpanded:t=>{a(e,t)},setPage:t=>{l(e,t)},setSearchTerm:t=>{s(e,t)},setSelectedIds:e=>{d(e)},setScrollTo:t=>{c(e,t)},getChildren:()=>(!p.isFetchTriggered&&p.isExpanded&&(t((0,el.Fg)({treeId:i,nodeId:e,fetchTriggered:!0})),n(e,!1)),p.childrenIds??[])}},ex=e=>{let{nodeId:t,level:i}=e,{renderNode:n}=(0,r.useContext)(eP),a=eh(t);return(0,ec.isUndefined)(a.treeNodeProps)?(0,o.jsx)(o.Fragment,{}):(0,o.jsx)(n,{...a.treeNodeProps,level:i})},{useToken:ev}=l.theme,ef=e=>{let{node:t}=e,{token:i}=ev(),{styles:n}=ei(),{renderFilter:a,renderPager:l}=(0,r.useContext)(eP),{isLoading:s,isFetching:d,getChildren:c,total:u}=eh(t.id);if(!0===s)return(0,o.jsx)(er,{style:{paddingLeft:i.paddingSM+(t.level+1.5)*24}});let p=c();return(0,o.jsxs)(o.Fragment,{children:[void 0!==a&&(0,o.jsx)("div",{className:["tree-list__search",n["tree-list__search"]].join(" "),style:{paddingLeft:i.paddingSM+(t.level+1)*24},children:(0,o.jsx)(a,{isLoading:d,node:t,total:u??0})}),(0,o.jsx)("div",{className:"tree-list",children:p.map(e=>(0,o.jsx)(ex,{level:t.level+1,nodeId:e},e))}),void 0!==l&&(0,o.jsx)("div",{className:["tree-list__pager",n["tree-list__pager"]].join(" "),style:{paddingLeft:i.paddingSM+(t.level+1)*24},children:(0,o.jsx)(l,{node:t,total:u??0})})]})};var eb=i(55859),ey=i(74976),ej=i(45980);let ew=e=>{let{node:t,state:i}=e,{hasChildren:n,children:a,isLoading:l}=t,{onLoad:s}=(0,r.useContext)(eP),[d,c]=i,{t:u}=(0,ey.useTranslation)();async function p(e){if(e.stopPropagation(),!0===n){let e=!d;e&&void 0!==s&&void 0!==a&&0===a.length&&await s(t),c(e)}}return(0,o.jsxs)("div",{className:"tree-expander",style:{minWidth:16,width:16,height:16},children:[!0===l&&(0,o.jsx)(ej.y,{type:"classic"}),!0===t.hasChildren&&(0,o.jsx)("span",{"aria-label":u("tree.aria.expand-and-collapse"),onClick:p,role:"button",tabIndex:-1,children:!0!==l&&(0,o.jsx)(o.Fragment,{children:d?(0,o.jsx)(eb.J,{options:{width:16,height:16},value:"chevron-up"}):(0,o.jsx)(eb.J,{options:{width:16,height:16},value:"chevron-down"})})})]})};var eS=i(19908);let eT={id:Math.random().toString(16).slice(2),internalKey:"",icon:{type:"name",value:"folder"},label:"",children:[],permissions:{list:!1,view:!1,publish:!1,delete:!1,rename:!1,create:!1,settings:!1,versions:!1,properties:!1},level:0,locked:null,isLocked:!1,isRoot:!1},{useToken:eC}=l.theme,ek=(0,r.forwardRef)(function(e,t){let{id:i=eT.id,internalKey:n=eT.internalKey,icon:a=eT.icon,label:s=eT.label,level:d=eT.level,isRoot:c=eT.isRoot,isLoading:u=!1,danger:p=!1,wrapNode:m=e=>e,...g}=e,{token:h}=eC(),{styles:x}=et(),{renderNodeContent:v,onSelect:f,onRightClick:b,nodesRefs:y,nodeOrder:j}=(0,r.useContext)(eP),{isExpanded:w,setExpanded:S,isSelected:T,isScrollTo:C,setScrollTo:k,setSelectedIds:_}=eh(i),$={id:i,icon:a,label:s,internalKey:n,level:d,isLoading:u,isRoot:c,danger:p,...g};function N(){_([i]),void 0!==f&&f($)}(0,r.useEffect)(()=>()=>{void 0!==y&&delete y.current[n]},[]),(0,r.useEffect)(()=>{if(C){var e;let t=null==y||null==(e=y.current[n])?void 0:e.el;(0,ec.isNil)(t)||(!function(e){let t=e.closest("."+eS.B$);if(!(0,ec.isNil)(t)){let i=t.getBoundingClientRect(),n=e.getBoundingClientRect(),o=n.top-i.top+t.scrollTop,r=t.scrollTop;if(0===i.height)return;let a=t.offsetHeight-t.clientHeight;o<r?t.scrollTo({top:o,behavior:"smooth"}):o+n.height>r+i.height-a&&t.scrollTo({top:o-i.height+n.height+a,behavior:"smooth"})}}(t),k(!1))}},[C,y,n,k]);let E=(0,o.jsxs)(l.Flex,{className:"tree-node__content-inner",gap:"small",onClick:function(e){N()},onContextMenu:function(e){void 0!==b&&b(e,$)},onKeyDown:function(e){"Enter"===e.key&&N(),"ArrowRight"===e.key&&S(!0),"ArrowLeft"===e.key&&S(!1),"ArrowDown"===e.key&&function(e){e.preventDefault();let t=j().indexOf(n);t<j().length-1&&y.current[j()[t+1]].el.focus()}(e),"ArrowUp"===e.key&&function(e){e.preventDefault();let t=j().indexOf(n);t>0&&y.current[j()[t-1]].el.focus()}(e)},ref:function(e){var t;t=e,y.current[n]={el:t,node:$}},role:"button",style:{paddingLeft:h.paddingSM+20*d,minWidth:`${20*d+200}px`},tabIndex:-1,children:[!0!==c&&(0,o.jsx)(ew,{node:$,state:[w,S]}),(0,o.jsx)("div",{className:"tree-node__content-wrapper",children:(0,o.jsx)(v,{node:$})})]});return(0,o.jsxs)("div",{className:function(){let e=["tree-node",x.treeNode];return T&&e.push("tree-node--selected"),p&&e.push("tree-node--danger"),!0===c&&e.push("tree-node--is-root"),e.join(" ")}(),ref:t,children:[(0,o.jsx)("div",{className:"tree-node__content",children:m(E)}),w&&(0,o.jsx)(ef,{node:$})]})}),e_=(0,s.kc)(e=>{let{token:t,css:i}=e;return{container:i`
      width: 100%;
      overflow: hidden;
    `,containerChild:i`
      min-width: 150px
    `,unpublishedIcon:i`
      color: ${t.colorIconTreeUnpublished}
    `,unpublishedIconPath:i`
       .pimcore-icon__image {
          opacity: 0.4
       }
    `,indirectLockedIcon:i`
      opacity: 0.5;
    `}});var e$=i(68686);let eN=(0,r.forwardRef)(function(e,t){let{icon:i,label:n,isPublished:r,isLocked:a,locked:l}=e.node,{styles:s}=e_();return(0,o.jsxs)(e$.k,{className:s.container,gap:"mini",justify:"space-between",children:[(0,o.jsxs)(e$.k,{align:"center",className:s.containerChild,gap:"small",ref:t,children:[(0,o.jsx)(eb.J,{...i,className:h()({[s.unpublishedIcon]:!1===r&&"name"===i.type,[s.unpublishedIconPath]:!1===r&&"path"===i.type}),options:{width:16,height:16},subIconName:!1===r?"eye-off":void 0}),(0,o.jsx)("span",{className:"tree-node-content__label",children:n})]}),(0,o.jsx)(e$.k,{align:"center",gap:"mini",ref:t,children:a&&(0,o.jsx)(eb.J,{className:(0,ec.isNil)(l)||(0,ec.isEmpty)(l)?s.indirectLockedIcon:"",options:{width:14,height:14},value:"lock"})})]})}),eE=(0,s.kc)(e=>{let{token:t,css:i}=e;return{tree:i`
      padding: ${t.paddingXXS}px 0 ${t.paddingXS}px 0;
      max-width: 100%;
      color: ${t.colorTextTreeElement}
    `}},{hashPriority:"low"}),eI={nodeId:1,renderNodeContent:eN,renderNode:ek,showRoot:!0},eP=(0,r.createContext)({...eI}),eM=e=>{let{renderNode:t=eI.renderNode,renderNodeContent:i=eI.renderNodeContent,contextMenu:n,rootNode:a,...l}=e,{styles:s}=eE(),{nodeId:d}=l,c=void 0!==a&&parseInt(a.id)===d&&l.showRoot,{getChildren:u,isLoading:p}=eh(String(d)),m=(0,r.useRef)({}),g=(0,r.useCallback)(()=>Object.keys(m.current).sort((e,t)=>{let i=m.current[e].node,n=m.current[t].node,o=i.internalKey.split("-"),r=n.internalKey.split("-");for(let e=0;e<o.length;e++)if(o[e]!==r[e])return parseInt(o[e])-parseInt(r[e]);return 0}),[m.current]);async function h(e,t){e.preventDefault()}let x=(0,r.useMemo)(()=>({...l,nodesRefs:m,nodeOrder:g,renderNode:t,renderNodeContent:i,onRightClick:h}),[l,m,g,t,i,h]),v=u(),f=(0,o.jsx)("div",{className:["tree",s.tree].join(" "),children:(0,o.jsxs)(eP.Provider,{value:x,children:[c&&(0,o.jsx)(t,{level:-1,...a},a.id),!c&&(0,o.jsx)(ef,{node:{...a,level:-1}})]})});return(0,o.jsxs)(o.Fragment,{children:[!0===p&&!c&&(0,o.jsx)(C.x,{padding:{left:"extra-small"},children:(0,o.jsx)(er,{})}),(0!==v.length||c)&&f]})},eD=(e,t)=>{let i=(0,es.I0)(),{t:n}=(0,ey.useTranslation)(),{treeId:o}=(0,ed.useTreeId)(),{treeNodeProps:a,isRootFetchTriggered:l}=eh(String(e)),[s,d]=(0,r.useState)(!1),{nodeApiHook:c}=em(),{fetchRoot:u}=c(),p=t=>{i((0,el.JW)({treeId:o,nodeId:String(e),rootNode:t}))};!0!==l&&(i((0,el.l8)({treeId:o,nodeId:String(e),rootFetchTriggered:!0})),s||(d(!0),u(e).then(t=>{(0,ec.isNil)(t)||(0,ec.isNil)(t.nodes[0])?(0,z.ZP)(new z.aE("Root node not found: "+e)):p(t.nodes[0]),d(!1)}).catch(e=>{console.error(e)})));let m={icon:{type:"name",value:"home-root-folder"},level:-1,isRoot:!0},g=(0,ec.isNil)(a)?void 0:{...m,...a,icon:1===e?{type:"name",value:"home-root-folder"}:a.icon,label:1===e?n("home"):a.label,permissions:{...a.permissions,delete:!1,rename:!1}};return{rootNode:void 0===g?void 0:{...m,...g},isLoading:t&&s}},eB=e=>(0,o.jsx)(l.Empty,{...e});var eA=i(41697),eL=i(41479),eF=i(25741),eR=i(89020),eU=i(4884),eO=i(11566);let ez=(0,s.kc)(e=>{let{token:t,css:i}=e;return{container:i`
      position: relative;
      margin: auto;
      user-select: none;
    `,imageContainer:i`
      width: 100%;
    `,draggableElement:i`
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${t.colorPrimary};
      width: ${t.Button.controlHeightSM}px !important;
      height: ${t.Button.controlHeightSM}px !important;
      background: ${t.Colors.Neutral.Fill.colorFill};
      box-shadow: none;
      border: 2px dashed;
      transition: transform 0.05s linear !important;
      transform: translate(-50%, -50%);
      

        &:hover, &:active {
          color: ${t.colorPrimary};
          background: ${t.Colors.Neutral.Fill.colorFill} !important;
      }
    `}}),eX=e=>{let{zoom:t,imageSrc:i}=e,[n,a]=(0,r.useState)(!1),[l,s]=(0,r.useState)(0),d=(0,r.useRef)(n),c=(0,r.useRef)(null);(0,r.useEffect)(()=>{d.current=n},[n]);let{id:p}=(0,r.useContext)(eR.N),m=(0,r.useContext)(eU.A),{isLoading:g,imageSettings:h,addImageSettings:x,removeImageSetting:v}=(0,eF.useAssetDraft)(p),{styles:f}=ez();(0,ec.isUndefined)(m)&&(0,z.ZP)(new z.aE("FocalPoint must be used within the FocalPointProvider"));let{coordinates:b,setCoordinates:y,isActive:j,setIsActive:w,disabled:S,containerRef:T}=m;(0,r.useEffect)(()=>{j||g||null===T.current||v("focalPoint")},[j]),(0,r.useEffect)(()=>{j&&!n&&x({focalPoint:{x:b.x,y:b.y}})},[n]);let C=e=>{if(!((0,ec.isNull)(T.current)||(0,ec.isNull)(c.current))&&!S&&d.current){let t=T.current.firstElementChild,i=c.current,n=t.getBoundingClientRect(),o=i.getBoundingClientRect(),r=o.width/2,a=o.height/2,l=t.clientWidth??0,s=t.clientHeight??0,d=n.left+r,u=n.left+n.width-r,p=n.top+a,m=n.top+n.height-a,g=Math.min(Math.max(d,e.clientX),u),h=Math.min(Math.max(p,e.clientY),m);y({x:(g-n.left)/l*100,y:(h-n.top)/s*100})}},k=()=>{a(!1)};return(0,r.useEffect)(()=>(window.addEventListener("mouseup",k),window.addEventListener("mousemove",C),()=>{window.removeEventListener("mouseup",k),window.removeEventListener("mousemove",C)}),[]),(0,o.jsxs)("div",{className:f.container,style:{width:`${t}%`,maxWidth:`${t/100*l}px`},children:[(0,o.jsx)(eO.X,{alt:"car",onLoad:()=>{var e;let t=null==(e=T.current)?void 0:e.querySelector("img");if(!(0,ec.isNull)(T.current)&&!(0,ec.isNull)(t)){let e=T.current,i=e.clientWidth,n=e.clientHeight,o=t.naturalWidth;if(s(Math.min(i,n*(o/t.naturalHeight),o)),!(0,ec.isUndefined)(null==h?void 0:h.focalPoint)){let e=h.focalPoint;y({x:e.x,y:e.y}),w(!0)}}},src:i,wrapperClassName:f.imageContainer}),j&&!(0,ec.isNull)(T.current)&&(0,o.jsx)(u.h,{"aria-label":"Draggable",className:f.draggableElement,"data-cypress":"draggable-item",hidden:!j,icon:{value:"focal-point"},onMouseDown:()=>{a(!0)},ref:c,style:{left:`${b.x}%`,top:`${b.y}%`},type:"dashed"})]})},eq=e=>{let{children:t}=e,[i,n]=(0,r.useState)({x:0,y:0}),[a,l]=(0,r.useState)(!1),[s,d]=(0,r.useState)(!1),c=(0,r.useRef)(null);return(0,r.useMemo)(()=>(0,o.jsx)(eU.A.Provider,{value:{isActive:a,setIsActive:l,coordinates:i,setCoordinates:n,disabled:s,setDisabled:d,containerRef:c},children:t}),[a,i,s,t])};var eG=i(72551),eV=i(75403),eH=i(98740),eZ=i(77108),eW=i(93304),eJ=i(96169),eK=i(80786),eQ=i(22455),eY=i(73489),e0=i(14863),e1=i(85823),e8=i(49316),e6=i(14339),e2=i(79435),e5=i(60944),e4=i(342),e7=i(49893),e9=i(7932),e3=i(66003);let te=(0,s.kc)(e=>{let{token:t,css:i}=e;return{imageZoomContainer:i`
      display: flex;
      gap: 5px
    `,imageZoom:i`
      .ant-select {
        min-width: 70px;
        text-align: center;

        .ant-select-selector {
          border: 1px solid ${t.Button.defaultBorderColor};

          .ant-select-selection-item {
            padding-inline-end: unset;
          }
        }

        .ant-select-arrow {
          display: none;
        }
      }
    `,imageZoomBtn:i`
      border: 1px solid ${t.Button.defaultBorderColor};
      box-shadow: none !important;
      width: ${t.controlHeight}px;
      height: ${t.controlHeight}px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      .pimcore-icon {
        display: flex;
      }

      &:disabled {
        background: ${t.colorBgContainer};
      }
    `,imageZoomResetBtn:i`
      border: 1px solid ${t.Button.defaultBorderColor};
      box-shadow: none !important;
      width: auto;
      height: ${t.controlHeight}px;
    `}}),tt=e=>{let{zoom:t,setZoom:i,zoomSteps:n=25}=e,[a,s]=(0,r.useState)(!1),[d,c]=(0,r.useState)(!1),u=(0,r.useRef)(null),{styles:p}=te({zoom:t}),{t:m}=(0,ey.useTranslation)();(0,r.useEffect)(()=>{t>=500&&s(!0),a&&t<500&&s(!1),t<=25&&c(!0),d&&t>25&&c(!1)},[t]);let g=e=>{i(parseInt(e)),(0,ec.isNull)(u.current)||u.current.blur()};return(0,o.jsxs)("div",{className:p.imageZoomContainer,children:[100!==t&&(0,o.jsx)(l.Button,{"aria-label":m("aria.asset.image.editor.zoom.reset"),className:p.imageZoomResetBtn,onClick:()=>{i(100)},onKeyDown:e3.zu,children:m("asset.image.editor.zoom.reset")}),(0,o.jsxs)(l.Space.Compact,{className:p.imageZoom,children:[(0,o.jsx)(l.Button,{"aria-disabled":d,"aria-label":m("aria.asset.image.editor.zoom.zoom-out"),className:p.imageZoomBtn,disabled:d,onClick:()=>{i(t-n)},onKeyDown:e3.zu,children:(0,o.jsx)(eb.J,{value:"minus"})}),(0,o.jsx)(e9.P,{"aria-label":m("aria.asset.image.editor.zoom.preconfigured-zoom-levels"),defaultActiveFirstOption:!0,defaultValue:"100",onChange:e=>{g(e)},options:[{value:"100",label:"100%"},{value:"125",label:"125%"},{value:"150",label:"150%"},{value:"175",label:"175%"},{value:"200",label:"200%"},{value:"225",label:"225%"},{value:"250",label:"250%"}],ref:u,value:`${t}%`}),(0,o.jsx)(l.Button,{"aria-disabled":a,"aria-label":m("aria.asset.image.editor.zoom.zoom-in"),className:p.imageZoomBtn,disabled:a,onClick:()=>{i(t+n)},onKeyDown:e3.zu,children:(0,o.jsx)(eb.J,{value:"new"})})]})]})};var ti=i(27659),tn=i(84348),to=i(37227),tr=i(86409),ta=i(43439),tl=i(41912),ts=i(30075),td=i(44433),tc=i(25560),tu=i(62955),tp=i(59072),tm=i(38119),tg=i(88822);let th=e=>(0,o.jsx)(l.Popconfirm,{...e});var tx=i(44126),tv=i(99991),tf=i(48241),tb=i(21412),ty=i(77907),tj=i(7702),tw=i(17584),tS=i(76027),tT=i(11113),tC=i(40439),tk=i(46337);let t_=(0,s.kc)(e=>{let{token:t,css:i}=e;return{card:i`
        &.ant-card {
            height: 103px;
            cursor: pointer;
        }

      &.card-medium {
        height: 150px;
      }
      
      &.ant-card .ant-card-body {
            padding: ${t.paddingXXS}px ${t.paddingXS}px;
            margin-top: 7px;
            margin-bottom: 7px;
            width: 166px;
        }
        
        &.ant-card .ant-card-meta-title {
              font-weight: normal;
        }

        .checkbox, .checkbox-medium {
            position: absolute;
            top: ${t.paddingXXS}px;
            left: ${t.paddingXXS}px;
        }

        .checkbox-medium {
            left: ${t.paddingXS}px;
        }

        .dots-button, .dots-button-medium {
            position: absolute;
            top: ${t.paddingXXS}px;
            right: ${t.paddingXXS}px;
        }

        .dots-button-medium {
            right: ${t.paddingXS}px;
        }
      
        .dropdown-menu__icon {
            vertical-align: text-bottom;
        }

        .dots-button-open-dropdown:not(:disabled):not(.ant-btn-disabled):hover {
            background-color: ${t.Button.defaultColor};
            color: white;
        }

        .ant-card-cover .img-container, .ant-card-cover .img-container-medium {
            display: flex;
            justify-content: center;
            align-items: center;
        }
      
        .ant-card-cover .img-container {
            height: 64px;
            width: 170px;
            
            .pimcore-icon {
                color: ${t.Colors.Neutral.Icon.colorIcon};

                svg * {
                    vector-effect: non-scaling-stroke;
                }
            }
        }

        .ant-image .ant-image-img.img, .ant-image .ant-image-img.img-medium {
            border-radius: unset;
            margin-top: 3px;
        }
        
        .ant-image .ant-image-img.img {
            max-height: 61px;
            max-width: 168px;
        }

        .ant-card-cover .img-container-medium {
            height: 109px;
            width: 236px;
        }

        .ant-image .ant-image-img.img-medium {
            max-height: 106px;
            max-width: 234px;
        }

        .menu-icon {
            margin-right: ${t.marginXS}px;
        }

        .flexbox-start-end {
            display: flex;
            justify-content: space-between;
        }
    }
    `}},{hashPriority:"low"});var t$=i(46256);let tN=(0,s.kc)(e=>{let{token:t,css:i}=e;return{icon:i`
        color: ${t.Colors.Neutral.Icon.colorIcon};
    `}}),tE=e=>{let{styles:t}=tN();return"string"==typeof e.value?(0,o.jsx)(eO.X,{alt:e.alt,className:e.class,src:e.value}):"object"==typeof e.value?(0,o.jsx)(eb.J,{...e.value,className:t.icon,options:{width:50,height:50}}):(0,o.jsx)(o.Fragment,{})};var tI=i(45699),tP=((n={}).SMALL="small",n.MEDIUM="medium",n);let tM=e=>{let{size:t="small"}=e,{styles:i}=t_(),n=(0,r.useRef)(null),a="",s="img",d="img-container",c="dots-button";return"medium"===t&&(a="card-medium",s="img-medium",d="img-container-medium",c="dots-button-medium"),(0,o.jsx)(tI.u,{placement:"right",title:e.name,children:(0,o.jsxs)(l.Card,{className:[i.card,a].join(" "),cover:(0,o.jsx)("div",{className:d,children:(0,o.jsx)(tE,{alt:e.name,class:s,value:e.imgSrc})}),onClick:t=>{var i,o;(null===n.current||(null==(i=n.current.menu)?void 0:i.list.contains(t.target))===!1)&&(null==(o=e.onClick)||o.call(e,t))},children:[(0,o.jsx)(V.L,{menu:{items:e.dropdownItems},menuRef:n,placement:"bottomLeft",children:(0,o.jsx)(l.Button,{className:c,icon:(0,o.jsx)(eb.J,{className:"dropdown-menu__icon",value:"more"}),onClick:e=>{e.stopPropagation()},size:"small"})}),(0,o.jsx)(t$.Z,{title:e.name})]})})};var tD=i(92806),tB=i(7828);let tA=(0,s.kc)((e,t)=>{let{token:i,css:n}=e,{layoutDefinition:o,items:r}=t,a=o.map(e=>`"${e}"`).join(" "),l=r.map(e=>({region:e.region,maxWidth:e.maxWidth})),s=[];o.forEach(e=>{e.split(" ").forEach((e,t)=>{var i;let n=null==(i=l.find(t=>t.region===e))?void 0:i.maxWidth;Array.isArray(s[t])||(s[t]=[]);let o=Number(n??"0"),r=!isNaN(o);void 0!==n&&(""!==n&&"0"!==n&&!r||r&&o>0)&&(r?s[t].push(`${o}px`):s[t].push(n))})});let d=s.map(e=>0===e.length?"1fr":`max(${e.join(",")})`).join(" ");return{region:n`
      display: flex;
      flex-direction: column;
      // @todo make this configurable
      gap: 12px;

      // @todo we should introduce a predefined set of breakpoints
      @container ${eS.Xt.name} (min-width: 768px) {
        display: grid;
        grid-template-areas: ${a};
        grid-template-columns: ${d};
      }
    `}}),tL=(0,s.kc)((e,t)=>{let{token:i,css:n}=e,{region:o}=t;return{regionItem:n`
      grid-area: ${o};
    `}}),tF=e=>{let{region:t,component:i,...n}=e,{styles:r}=tL(e),a=h()(r.regionItem);return(0,o.jsx)("div",{className:a,...n,children:i})},tR=e=>{let{items:t}=e,{styles:i}=tA(e),n=h()(i.region);return(0,o.jsx)("div",{className:n,children:t.map(e=>(0,o.jsx)(tF,{component:e.component,maxWidth:e.maxWidth,region:e.region},e.region))})};var tU=i(63121),tO=i(65866),tz=i(50088),tX=i(52478),tq=i(77664);let tG=e=>(0,o.jsx)(l.Skeleton,{...e}),tV=e=>(0,o.jsx)(l.Skeleton.Avatar,{...e}),tH=e=>(0,o.jsx)(l.Skeleton.Button,{...e}),tZ=e=>(0,o.jsx)(l.Skeleton.Input,{...e});var tW=i(63307),tJ=i(17095),tK=i(66707),tQ=i(3653),tY=i(18077),t0=i(63801),t1=i(7049),t8=i(6185),t6=i(33957),t2=i(76990),t5=i(85536),t4=i(34188),t7=i(54429),t9=i(12227),t3=i(77151),ie=i(18666),it=i(62243),ii=i(54949),io=i(35589),ir=i(62230);let ia={html:{codeMirrorExtension:(0,t9.dy)(),fileExtensions:["html","htm","shtm","shtml","xhtml","cfm","cfml","cfc","dhtml","xht","tpl","twig","kit","jsp","aspx","ascx","asp","master","cshtml","vbhtml"]},css:{codeMirrorExtension:(0,t3.iv)(),fileExtensions:["css","less","scss","sass"]},javascript:{codeMirrorExtension:(0,ie.eJ)({jsx:!0}),fileExtensions:["js","js.erb","jsm","_js","jsx"]},json:{codeMirrorExtension:(0,it.AV)(),fileExtensions:["json","map"]},xml:{codeMirrorExtension:(0,ii.Ls)(),fileExtensions:["xml","wxs","wxl","wsdl","rss","atom","rdf","xslt","xsl","xul","xsd","xbl","mathml","config","plist","xaml"]},sql:{codeMirrorExtension:(0,io.i6)(),fileExtensions:["sql"]},markdown:{codeMirrorExtension:(0,ir.JH)(),fileExtensions:["md","markdown","mdown","mkdn"]}},il=e=>null==e?[]:[ia[e].codeMirrorExtension],is=e=>{let t=e.split(".").pop();if(void 0===t)return null;for(let e in ia)if(ia[e].fileExtensions.includes(t))return e;return null},id=(0,s.kc)(e=>{let{token:t,css:i}=e;return{editor:i`
      height: 100%;
      width: 100%;
      
      & .CodeMirror {
        height: 100%;
        width: 100%;
      }
    `}},{hashPriority:"low"}),ic=e=>{let{lineNumbers:t=!0,className:i,language:n,textValue:r,setTextValue:a}=e,{styles:l}=id();return(0,o.jsx)(t7.ZP,{basicSetup:{lineNumbers:t},className:h()(l.editor,i),extensions:il(n),onChange:e=>{a(e)},value:r})};var iu=i(76693),ip=i(2275),im=i(47755),ig=i(8869),ih=i(99286),ix=i(56277),iv=i(76050),ib=i(32261);let iy=e=>{let{sources:t,tracks:i,className:n}=e,{t:r}=(0,ey.useTranslation)();return(0,o.jsxs)("audio",{className:n,controls:!0,children:[t.map((e,t)=>(0,o.jsx)("source",{src:e.src,type:e.type},`${t}-${e.type}`)),null==i?void 0:i.map((e,t)=>(0,o.jsx)("track",{kind:e.kind,label:e.label,src:e.src,srcLang:e.srcLang},`${t}-${e.label}`)),r("asset.preview.no-audio-support")]})};var ij=i(4602),iw=i(99261),iS=i(72001);let iT=(0,s.kc)(e=>{let{token:t,css:i}=e;return{filesList:i`
            list-style: none;
            padding: 0;
            margin: 10px 0 0;

            li {
                font-size: 12px;
                font-weight: 400;
                line-height: 22px;
                color: ${t.colorTextTertiary}
            }
        `}},{hashPriority:"low"}),iC=e=>{let{styles:t}=iT();return(0,o.jsx)("ul",{className:t.filesList,children:e.files.map((e,t)=>(0,o.jsx)("li",{children:e},`${e}-${t}`))})};var ik=i(82179);let i_=e=>{let{children:t,...i}=e;return(0,o.jsx)(l.Form.Item,{...i,children:t})};var i$=i(72497);let iN=(0,s.kc)(e=>{let{token:t,css:i}=e;return{preview:i`
      border: none
    `}});var iE=i(90165),iI=i(35621);let iP=e=>{var t;let{id:i}=e,{t:n}=(0,ey.useTranslation)(),{styles:l}=iN(),[s,d]=(0,r.useState)(Date.now()),{dataObject:c}=(0,iE.useDataObjectDraft)(i),u=a().useRef(null),p=(0,iI.Z)(u,!0);return(0,r.useEffect)(()=>{p&&d(Date.now())},[null==c||null==(t=c.draftData)?void 0:t.modificationDate,p]),(0,o.jsx)("iframe",{className:["w-full h-full",l.preview].join(" "),ref:u,src:`${(0,i$.G)()}/data-objects/preview/${i}?timestamp=${s}`,title:`${n("preview.label")}-${i}`})}},64957:function(e,t,i){i.r(t),i.d(t,{WidgetRegistry:()=>l,useWidgetManager:()=>n.useWidgetManager});var n=i(81354),o=i(28395),r=i(60476),a=i(81004);class l{registerWidget(e){let t={...e,component:(0,a.memo)(e.component)};this.widgets.push(t)}getWidget(e){return this.widgets.find(t=>t.name===e)}constructor(){this.widgets=[]}}l=(0,o.gn)([(0,r.injectable)()],l)}}]);