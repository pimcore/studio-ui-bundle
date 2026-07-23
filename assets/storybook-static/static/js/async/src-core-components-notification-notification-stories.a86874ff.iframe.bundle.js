/*! For license information please see src-core-components-notification-notification-stories.a86874ff.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle_core=self.webpackChunkpimcore_studio_ui_bundle_core||[]).push([["3783"],{"./js/src/core/components/notification/notification.stories.tsx"(e,n,t){t.r(n),t.d(n,{Collapsable:()=>g,default:()=>u,_default:()=>m,__namedExportsOrder:()=>h});var o=t("./node_modules/react/jsx-runtime.js"),i=t("./js/src/core/components/notification/useNotification/index.tsx"),c=t("./js/src/core/components/button/button.tsx"),a=t("./node_modules/react/index.js"),s=t("./js/src/core/components/icon/icon.tsx");let l=(0,t("./js/src/core/modules/ant-design/styles/create-styles.ts").rU)(e=>{let{token:n,css:t}=e;return{"notification-content":t`
      .ant-btn {
        color: ${n.colorPrimary};
        box-shadow: none;
        outline: none;
        transition: unset;
        padding: 0 ${n.paddingXXS}px;

        &:hover {
          color: ${n.colorPrimaryHover};
        }
      }
        
      .notification-content__header { 
        .notification-content__header__content {
          .notification-content__header__headline {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 4px;
              
            > div {
              display: flex;
              flex-direction: row;
              align-items: center;
            }
          
            p {
              margin: 0; 
            }

            .notification-content__header__headline__collapse-btn {
                background: transparent;
                border: none;
                box-shadow: none;
                display: flex;
                width: 24px;
                height: 24px;
                justify-content: center;
                align-items: center;
            }
          }
        }
      }
        
      .notification-content__content {          
        &.collapsed {
          display: none;
        }

        &.collapse {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .notification-content__content__completed-actions {
          .notification-content__content__completed-actions__headline {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 4px;
          }

          .notification-content__content__completed-actions__actions {
            .notification-content__content__completed-actions__actions__action {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;

              p {
                margin: 0;
              }
            }
          }
        }
      }  
    `}});try{l.displayName="useStyle",l.__docgenInfo={description:"",displayName:"useStyle",props:{}}}catch(e){}var r=t("./js/src/core/components/progressbar/progressbar.tsx"),d=t("./node_modules/react-i18next/dist/es/index.js"),p=t("./js/src/core/utils/helpers.tsx");let _=e=>{var n,t;let{actions:i}=e,{styles:_}=l(),[u,m]=(0,a.useState)(!0),{t:g}=(0,d.Bd)();return(0,o.jsxs)("div",{className:_["notification-content"],children:[(0,o.jsx)("div",{className:"notification-content__header",children:(0,o.jsx)("div",{className:"notification-content__header__content",children:(0,o.jsxs)("div",{className:"notification-content__header__headline",children:[(0,o.jsxs)("div",{children:[(0,o.jsxs)("p",{children:[i.length," ",g("notification.action-list.actions")]}),(0,o.jsx)(c.$,{"aria-label":g("aria.notification.action-list.toggle-collapse"),className:"notification-content__header__headline__collapse-btn",icon:u?(0,o.jsx)(s.I,{options:{width:22,height:22},value:"chevron-down"}):(0,o.jsx)(s.I,{options:{width:22,height:22},value:"chevron-up"}),onClick:()=>{m(!u)},onKeyDown:p.Kb})]}),(0,o.jsx)(c.$,{"aria-label":g("aria.notification.action-list.cancel-all"),onClick:()=>{i.forEach(e=>{e.completed||e.cancel()})},onKeyDown:p.Kb,type:"link",children:g("notification.action-list.cancel-all")})]})})}),(0,o.jsxs)("div",{className:["notification-content__content",u?"collapsed":"collapse"].join(" "),children:[i.filter(e=>!e.completed).length>0&&(0,o.jsx)("div",{className:"notification-content__content__actions",children:(0,o.jsx)("div",{className:"notification-content__content__actions__actions",children:i.filter(e=>!e.completed).map(e=>(0,o.jsx)("div",{"aria-label":e.description,className:"notification-content__content__actions__action",children:(0,o.jsx)(r.d,{description:e.description,descriptionAction:(0,o.jsx)(c.$,{"aria-label":`${g("aria.notification.action-list.cancel")} "${e.description}"`,onClick:e.cancel,onKeyDown:p.Kb,type:"link",children:g("notification.action-list.cancel")}),percent:e.progress,progressStatus:e.progressDetail})},e.key))})}),(null==(n=i.filter(e=>e.completed))?void 0:n.length)>0&&(0,o.jsxs)("div",{className:"notification-content__content__completed-actions",children:[(0,o.jsxs)("div",{className:"notification-content__content__completed-actions__headline",children:[(0,o.jsx)(s.I,{options:{width:14,height:14},value:"check-circle"}),(0,o.jsx)("p",{children:g("notification.action-list.completed-actions")})]}),(0,o.jsx)("div",{className:"notification-content__content__completed-actions__actions",children:null==(t=i.filter(e=>e.completed))?void 0:t.map(e=>(0,o.jsxs)("div",{"aria-label":e.description,className:"notification-content__content__completed-actions__actions__action",children:[(0,o.jsx)("p",{children:e.description}),e.completedAction]},e.key))})]})]})]})};try{_.displayName="ActionList",_.__docgenInfo={description:"",displayName:"ActionList",props:{actions:{defaultValue:null,description:"",name:"actions",required:!0,type:{name:"IActions[]"}}}}}catch(e){}let u={title:"Components/Feedback/Notification",component:e=>{let[n]=(0,i.h)(),t="string"==typeof e.status&&"normal"!==e.status?e.status:"open";return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(c.$,{onClick:()=>{n[t]({...e})},children:"Open Notification"})})},parameters:{layout:"centered"},argTypes:{status:{options:["open","success","error","info","warning"],control:{type:"select",labels:{open:"default"}}},description:{table:{disable:!0}},closeIcon:{table:{disable:!0}}},tags:["autodocs"],args:{status:"normal"}},m={args:{message:"Notifications",duration:4.5,description:(0,o.jsx)("span",{children:"Your bookmark list has been shared."})}},g={args:{duration:4.5,message:"Notifications",closeIcon:null,description:(0,o.jsx)(_,{actions:[{key:0,description:"Metadata batch edit in progress",progress:63,progressDetail:"63% completed",completed:!1,completedAction:(0,o.jsx)(c.$,{type:"link",children:"Download"}),cancel:()=>{console.log('canceled "Metadata batch edit in progress"')}},{key:1,description:"all-catalogue-pictures.zip",progress:45,progressDetail:"68 / 150 files zipped",completed:!1,completedAction:(0,o.jsx)(c.$,{type:"link",children:"Download"}),cancel:()=>{console.log('canceled "all-catalogue-pictures.zip"')}},{key:2,description:"all-catalogue-pictures-de.zip",progress:100,progressDetail:"100% completed",completed:!0,completedAction:(0,o.jsx)(c.$,{onClick:()=>{console.log('download "all-catalogue-pictures-de.zip"')},type:"link",children:"Download"}),cancel:()=>{console.log('canceled "all-catalogue-pictures-de.zip"')}}]})}},h=["_default","Collapsable"];m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"{\n  args: {\n    message: 'Notifications',\n    duration: 4.5,\n    description: <span>Your bookmark list has been shared.</span>\n  }\n}",...m.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:"{\n  args: {\n    duration: 4.5,\n    message: 'Notifications',\n    closeIcon: null,\n    description: <ActionList actions={[{\n      key: 0,\n      description: 'Metadata batch edit in progress',\n      progress: 63,\n      progressDetail: '63% completed',\n      completed: false,\n      completedAction: <Button type={'link'}>Download</Button>,\n      cancel: () => {\n        console.log('canceled \"Metadata batch edit in progress\"');\n      }\n    }, {\n      key: 1,\n      description: 'all-catalogue-pictures.zip',\n      progress: 45,\n      progressDetail: '68 / 150 files zipped',\n      completed: false,\n      completedAction: <Button type={'link'}>Download</Button>,\n      cancel: () => {\n        console.log('canceled \"all-catalogue-pictures.zip\"');\n      }\n    }, {\n      key: 2,\n      description: 'all-catalogue-pictures-de.zip',\n      progress: 100,\n      progressDetail: '100% completed',\n      completed: true,\n      completedAction: <Button onClick={() => {\n        console.log('download \"all-catalogue-pictures-de.zip\"');\n      }} type={'link'}>Download</Button>,\n      cancel: () => {\n        console.log('canceled \"all-catalogue-pictures-de.zip\"');\n      }\n    }]} />\n  }\n}",...g.parameters?.docs?.source}}}}}]);