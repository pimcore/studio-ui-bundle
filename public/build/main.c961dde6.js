var Pimcore;(()=>{"use strict";var e,n,t,o,r,a={4377:(e,n,t)=>{t.r(n);var o=t(6609),r=t(1072);o.ZP.use(r.Db).init({fallbackLng:"en",partialBundledLanguages:!0,ns:[],resources:{},saveMissing:!0}).catch((function(e){console.error(e)})),o.ZP.on("missingKey",(function(e,n,t,o){}));var a=[],i=function(e){a.push(e)},l=t(7294),c=t(469),d=t(5007),u=t(9202),s=t(7426),p=(0,u.LC)({baseQuery:(0,s.ni)({baseUrl:"/admin/"}),endpoints:function(){return{}}}),f=function(e,n,t){if(t||2===arguments.length)for(var o,r=0,a=n.length;r<a;r++)!o&&r in n||(o||(o=Array.prototype.slice.call(n,0,r)),o[r]=n[r]);return e.concat(o||Array.prototype.slice.call(n))},b=[p],g=c.Ku.apply(void 0,f([{}],b,!1)).withLazyLoadedSlices(),m=(0,c.xC)({reducer:g,middleware:function(e){return e().concat(p.middleware)}}),y=function(e){return b.push(e),g=c.Ku.apply(void 0,f([{}],b,!1)).withLazyLoadedSlices(),m.replaceReducer(g),g},x=d.I0,h=d.v9,_=(0,c.oM)({name:"example",initialState:{value:"test2"},reducers:{selectSlice:function(e){return e},setValue:function(e,n){e.value=n.payload}},selectors:{selectValue:function(e){return e.value}}});y(_);var v,w,E=_.actions,O=_.selectors,S=E.setValue,P=O.selectValue,k=t(1127),j=t(7124),C=t(3334),T=function(e,n){return Object.defineProperty?Object.defineProperty(e,"raw",{value:n}):e.raw=n,e},B=(0,C.kc)((function(e){var n=e.token;return{example:(0,e.css)(v||(v=T(["\n      color: ",";\n    "],["\n      color: ",";\n    "])),n.Example.color)}})),M=function(e){var n=e.value,t=e.prefix,o=B().styles;return l.createElement("div",null,l.createElement(k.Z,null,l.createElement("label",{className:o.example},t),l.createElement(j.ZP,{type:"primary"},n)))},A=t(6352),z=function(){return z=Object.assign||function(e){for(var n,t=1,o=arguments.length;t<o;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},z.apply(this,arguments)},I={model:{global:{tabEnableRename:!1,tabSetEnableMaximize:!1},layout:{type:"row",weight:100,children:[{id:"main",type:"row",children:[{type:"tabset",id:"main_tabset",enableDeleteWhenEmpty:!1,weight:50,selected:0,children:[]},{type:"tabset",id:"bottom_tabset",enableDeleteWhenEmpty:!1,weight:50,height:200,selected:0,children:[]}]}]},borders:[{type:"border",location:"left",size:315,selected:0,children:[{type:"tab",icon:"camera",name:"actions",component:"widget-manager-actions",enableClose:!1}]},{type:"border",location:"right",size:315,selected:0,children:[{type:"tab",icon:"camera",name:"actions",component:"widget-manager-actions",enableClose:!1}]}]}},L=(0,c.oM)({name:"widget-manager",initialState:I,reducers:{updateModel:function(e,n){e.model=z({},n.payload)},openMainWidget:function(e,n){var t=A.Model.fromJson(e.model);console.log({payload:n.payload}),t.doAction(A.Actions.addNode(n.payload,"main_tabset",A.DockLocation.CENTER,-1,!0)),e.model=z({},t.toJson())},openBottomWidget:function(e,n){var t=A.Model.fromJson(e.model);t.doAction(A.Actions.addNode(n.payload,"bottom_tabset",A.DockLocation.CENTER,-1,!0)),e.model=z({},t.toJson())},openLeftWidget:function(e,n){var t=A.Model.fromJson(e.model);t.doAction(A.Actions.addNode(n.payload,"border_left",A.DockLocation.CENTER,-1,!0)),e.model=z({},t.toJson())},openRightWidget:function(e,n){var t=A.Model.fromJson(e.model);t.doAction(A.Actions.addNode(n.payload,"border_right",A.DockLocation.CENTER,-1,!0)),e.model=z({},t.toJson())}},selectors:{selectModel:function(e){return e.model}}});y(L);var W=(w=L.actions).updateModel,N=w.openMainWidget,R=w.openBottomWidget,H=w.openLeftWidget,F=w.openRightWidget,D=L.selectors.selectModel,G=function(){return G=Object.assign||function(e){for(var n,t=1,o=arguments.length;t<o;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},G.apply(this,arguments)},J=function(e,n,t,o){return new(t||(t=Promise))((function(r,a){function i(e){try{c(o.next(e))}catch(e){a(e)}}function l(e){try{c(o.throw(e))}catch(e){a(e)}}function c(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(i,l)}c((o=o.apply(e,n||[])).next())}))},X=function(e,n){var t,o,r,a,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(l){return function(c){return function(l){if(t)throw new TypeError("Generator is already executing.");for(;a&&(a=0,l[0]&&(i=0)),i;)try{if(t=1,o&&(r=2&l[0]?o.return:l[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,l[1])).done)return r;switch(o=0,r&&(l=[2&l[0],r.value]),l[0]){case 0:case 1:r=l;break;case 4:return i.label++,{value:l[1],done:!1};case 5:i.label++,o=l[1],l=[0];continue;case 7:l=i.ops.pop(),i.trys.pop();continue;default:if(!(r=i.trys,(r=r.length>0&&r[r.length-1])||6!==l[0]&&2!==l[0])){i=0;continue}if(3===l[0]&&(!r||l[1]>r[0]&&l[1]<r[3])){i.label=l[1];break}if(6===l[0]&&i.label<r[1]){i.label=r[1],r=l;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(l);break}r[2]&&i.ops.pop(),i.trys.pop();continue}l=n.call(e,i)}catch(e){l=[6,e],o=0}finally{t=r=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,c])}}},Z={camera:l.lazy((function(){return J(void 0,void 0,void 0,(function(){return X(this,(function(e){switch(e.label){case 0:return[4,t.e(58).then(t.bind(t,1058))];case 1:return[2,e.sent()]}}))}))})),folder:l.lazy((function(){return J(void 0,void 0,void 0,(function(){return X(this,(function(e){switch(e.label){case 0:return[4,t.e(678).then(t.bind(t,5678))];case 1:return[2,e.sent()]}}))}))})),"widget-default":l.lazy((function(){return J(void 0,void 0,void 0,(function(){return X(this,(function(e){switch(e.label){case 0:return[4,t.e(625).then(t.bind(t,3625))];case 1:return[2,e.sent()]}}))}))}))},U=function(e){var n=e.name,t=e.options,o=Z[n];return l.createElement("div",{style:{width:null==t?void 0:t.width,height:null==t?void 0:t.height},className:"pimcore-icon pimcore-icon-".concat(n," anticon")},l.createElement(l.Suspense,{fallback:l.createElement("div",null)},l.createElement(o,G({},t))))};i({name:"example",component:function(){var e=h(P),n=x(),t=(0,r.$G)(),o=t.t,a=t.i18n,i=a.format(new Date,"DateTime",a.language);return(0,l.useEffect)((function(){n(S("test"))}),[]),l.createElement(M,{prefix:i+" - "+o("example-prefix"),value:o("example-value.".concat(e))})}}),i({name:"widget-manager-actions",component:function(){var e,n=(e=x(),{openMainWidget:function(n){e(N(n))},openBottomWidget:function(n){e(R(n))},openLeftWidget:function(n){e(H(n))},openRightWidget:function(n){e(F(n))}}),t=n.openMainWidget,o=n.openBottomWidget,r=n.openLeftWidget,a=n.openRightWidget;return l.createElement(k.Z,{style:{padding:"8px"}},l.createElement(j.ZP,{type:"primary",icon:l.createElement(U,{name:"folder",options:{width:12,height:12}}),onClick:function(){t({component:"widget-manager-actions",name:"Widget Manager Actions"})}},"Open Main Widget"),l.createElement(j.ZP,{type:"default",icon:l.createElement(U,{name:"camera",options:{width:12,height:12}}),onClick:function(){o({component:"widget-manager-actions",name:"Widget Manager Actions"})}},"Open Bottom Widget"),l.createElement(j.ZP,{type:"text",icon:l.createElement(U,{name:"folder",options:{width:12,height:12}}),onClick:function(){r({component:"widget-manager-actions",name:"Widget Manager Actions"})}},"Open Left Widget"),l.createElement(j.ZP,{type:"dashed",icon:l.createElement(U,{name:"camera",options:{width:12,height:12}}),onClick:function(){a({component:"widget-manager-actions",name:"Widget Manager Actions"})}},"Open Right Widget"))}});var V=t(745);function $(e){return $="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},$(e)}function K(){K=function(e,n){return new t(e,void 0,n)};var e=RegExp.prototype,n=new WeakMap;function t(e,o,r){var a=new RegExp(e,o);return n.set(a,r||n.get(e)),Q(a,t.prototype)}function o(e,t){var o=n.get(t);return Object.keys(o).reduce((function(n,t){var r=o[t];if("number"==typeof r)n[t]=e[r];else{for(var a=0;void 0===e[r[a]]&&a+1<r.length;)a++;n[t]=e[r[a]]}return n}),Object.create(null))}return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),n&&Q(e,n)}(t,RegExp),t.prototype.exec=function(n){var t=e.exec.call(this,n);if(t){t.groups=o(t,this);var r=t.indices;r&&(r.groups=o(r,this))}return t},t.prototype[Symbol.replace]=function(t,r){if("string"==typeof r){var a=n.get(this);return e[Symbol.replace].call(this,t,r.replace(/\$<([^>]+)>/g,(function(e,n){var t=a[n];return"$"+(Array.isArray(t)?t.join("$"):t)})))}if("function"==typeof r){var i=this;return e[Symbol.replace].call(this,t,(function(){var e=arguments;return"object"!=$(e[e.length-1])&&(e=[].slice.call(e)).push(o(e,i)),r.apply(this,e)}))}return e[Symbol.replace].call(this,t,r)},K.apply(this,arguments)}function Q(e,n){return Q=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,n){return e.__proto__=n,e},Q(e,n)}var q=function(){return q=Object.assign||function(e){for(var n,t=1,o=arguments.length;t<o;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},q.apply(this,arguments)},Y={token:q({colorLinkHover:"#9254de",controlOutline:"rgba(0.4470588266849518, 0.18039216101169586, 0.8196078538894653, 0.10000000149011612)",controlItemBgActive:"#f8eeff",colorFill:"rgba(0.9098039269447327, 0.8941176533699036, 0.9450980424880981, 0.6000000238418579)",colorFillQuaternary:"rgba(0.9098039269447327, 0.8941176533699036, 0.9450980424880981, 0.44999998807907104)",colorBgLayout:"#fcfcfc",colorPrimary:"#722ed1",fontSize:12,fontSizeHeading1:35,colorIconSecondary:"#4d4169",colorFillNav:"rgba(0.3019607961177826, 0.2549019753932953, 0.4117647111415863, 0.07999999821186066)",colovIconSidebar:"#22075e",colorBorderActive:"#fa8c16",colorLogo:"#5520a6",colorBorderTertiary:"#dfd7ea",colorTextTreeElement:"#404655",colorIconTree:"#404655",colorIconTreeUnpublished:"rgba(0.250980406999588, 0.27450981736183167, 0.3333333432674408, 0.4000000059604645)"},{fontFamily:"Lato, sans-serif"}),components:{Pagination:{colorPrimary:"#531dab"},Tree:{colorBorderTree:"#dfd7ea",colorTextTree:"#404655",colorPrimaryHeading:"#531dab",colorTextTreeUnpublished:"rgba(0, 0, 0, 0.25)"},Button:{defaultBorderColor:"#d3adf7",defaultColor:"#722ed1",defaultGhostBorderColor:"#d9d9d9",textGhostColor:"rgba(0, 0, 0, 0.8799999952316284)"},Table:{cellPaddingBlockSM:4,cellPaddingInlineSM:4,footerBg:"#fafafa",headerBg:"#fafafa"},Tabs:{colorBgSelectedTab:"#ffffff",inkBarColor:"#531dab",itemColor:"rgba(0, 0, 0, 0.6499999761581421)",itemHoverColor:"rgba(0.9098039269447327, 0.8941176533699036, 0.9450980424880981, 0.6000000238418579)",itemUnselectedIconColor:"#4d4169",colorBorderActiveTab:"#fa8c16",colorBgUnselectedTab:"rgba(0.9098039269447327, 0.8941176533699036, 0.9450980424880981, 0.44999998807907104)",colorBgHoverUnselectedTab:"rgba(0.9098039269447327, 0.8941176533699036, 0.9450980424880981, 0.6000000238418579)",colorBorderContainer:"#dfd7ea"},Avatar:{colorUserIndicator:"#722ed1"},Example:{color:"#722ed1"}}},ee=JSON.stringify(Y),ne=K(/rgba\((\d+(\.\d+)?),\s(\d+(\.\d+)?),\s(\d+(\.\d+)?),\s(\d+(\.\d+)?)\)/g,{red:1,green:3,blue:5,alpha:7});ee=ee.replace(ne,(function(e,n,t,o,r,a,i,l){return"rgba(".concat(256*n,", ").concat(256*o,", ").concat(256*a,", ").concat(l,")")}));var te,oe,re,ae=JSON.parse(ee),ie=function(e){var n=e.children;return l.createElement(C.f6,{theme:ae},n)},le=function(e){var n=e.children;return l.createElement(ie,null,l.createElement(d.zt,{store:m},n))},ce=t(9850),de=t(9366),ue=function(e,n){return Object.defineProperty?Object.defineProperty(e,"raw",{value:n}):e.raw=n,e},se=(0,C.kc)((function(e){e.token;return{leftSidebar:(0,e.css)(te||(te=ue(["\n      position: absolute;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      z-index: 2;\n      pointer-events: none;\n\n      .left-sidebar__avatar {\n        margin: 8px 15px 0 15px;\n        pointer-events: all;\n      }\n\n      .ant-avatar {\n        background-color: rgba(114, 46, 209, 0.66);\n\n        .anticon {\n          vertical-align: 0;\n        }\n      }\n    "],["\n      position: absolute;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      z-index: 2;\n      pointer-events: none;\n\n      .left-sidebar__avatar {\n        margin: 8px 15px 0 15px;\n        pointer-events: all;\n      }\n\n      .ant-avatar {\n        background-color: rgba(114, 46, 209, 0.66);\n\n        .anticon {\n          vertical-align: 0;\n        }\n      }\n    "])))}})),pe=function(){var e=se().styles;return l.createElement("div",{className:e.leftSidebar},l.createElement(ce.C,{className:"left-sidebar__avatar",size:26,icon:l.createElement(de.Z,null)}))},fe=function(e,n){return Object.defineProperty?Object.defineProperty(e,"raw",{value:n}):e.raw=n,e},be=function(){return be=Object.assign||function(e){for(var n,t=1,o=arguments.length;t<o;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},be.apply(this,arguments)},ge=function(e){var n,t,o=be({zIndexPopup:e.zIndexPopupBase+50,cardBg:e.colorFillAlter,cardHeight:e.controlHeightLG,cardPadding:"",cardPaddingSM:"".concat(1.5*e.paddingXXS,"px ").concat(e.padding,"px"),cardPaddingLG:"".concat(e.paddingXS,"px ").concat(e.padding,"px ").concat(1.5*e.paddingXXS,"px"),titleFontSize:"".concat(e.fontSize,"px"),titleFontSizeLG:"".concat(e.fontSizeLG,"px"),titleFontSizeSM:"".concat(e.fontSize,"px"),inkBarColor:e.colorPrimary,horizontalMargin:"0 0 ".concat(e.margin,"px 0"),horizontalItemGutter:32,horizontalItemMargin:"",horizontalItemMarginRTL:"",horizontalItemPadding:"".concat(e.paddingSM,"px 0"),horizontalItemPaddingSM:"".concat(e.paddingXS,"px 0"),horizontalItemPaddingLG:"".concat(e.padding,"px 0"),verticalItemPadding:"".concat(e.paddingXS,"px ").concat(e.paddingLG,"px"),verticalItemMargin:"".concat(e.margin,"px 0 0 0"),itemSelectedColor:e.colorPrimary,itemHoverColor:e.colorPrimaryHover,itemActiveColor:e.colorPrimaryActive,cardGutter:e.marginXXS/2},null!==(n=null==e?void 0:e.Tabs)&&void 0!==n?n:{});return o=be(be({},o),{tabsCardPadding:null!==(t=e.cardPadding)&&void 0!==t?t:"".concat((o.cardHeight-Math.round(e.fontSize*e.lineHeight))/2-e.lineWidth,"px ").concat(e.paddingSM,"px"),dropdownEdgeChildVerticalPadding:e.paddingXXS,tabsActiveTextShadow:"0 0 0.25px currentcolor",tabsDropdownHeight:200,tabsDropdownWidth:120,tabsHorizontalItemMargin:"0 0 0 ".concat(e.horizontalItemGutter,"px"),tabsHorizontalItemMarginRTL:"0 0 0 ".concat(e.horizontalItemGutter,"px")})},me=(0,C.kc)((function(e){var n=e.token,t=e.css,o=ge(n);return{widgetManager:t(oe||(oe=fe(["\n      position: absolute;\n      inset: 8px 6px 4px 6px;\n\n      .flexlayout__tab_button_leading,\n      .flexlayout__border_button_leading {\n        display: none;\n      }\n\n      .flexlayout__tab_button {\n        margin: 0;\n        padding: ",";\n        background: ",";\n        transition: all "," ",";\n        font-size: ","px;\n        color: ",";\n        outline: none;\n        gap: ","px;\n      \n        &:hover {\n          background: ",";\n        }\n\n        &_trailing {\n          display: none;\n        }\n\n        &--selected {\n          font-weight: ",";\n          color: ",";\n          background: ",";\n          border-top: 1px solid ",";\n\n          &:hover {\n            background: ",";\n          }\n\n          & .flexlayout__tab_button_trailing {\n            display: flex;\n          }\n        }\n\n        &:focus:not(:focus-visible), &:active {\n          color: ",";\n        }\n\n        &:first-child {\n          border-left: 1px solid ","66;\n        }\n      }\n\n      .flexlayout__tabset_tab_divider {\n        width: ","px;\n      }\n\n      .flexlayout__tab_button_top {\n        border-radius: ","px ","px 0 0;\n        border-bottom: 0;\n      }\n\n      .flexlayout__border_inner_tab_container {\n        width: calc(100svh - 12px);\n        justify-content: flex-end;\n      }\n\n      .flexlayout__border_inner_tab_container_left, .flexlayout__border_inner_tab_container_right {\n        alignItems: end;\n\n        .flexlayout__border_tab_divider {\n          width: 0;\n        }\n      }\n\n      .flexlayout__splitter,\n      .flexlayout__border,\n      .flexlayout__tabset_tabbar_outer {\n        background: transparent;\n      }\n\n      .flexlayout__tab {\n        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.02), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.03);\n        border-right: 1px solid ","66;\n        border-bottom: 1px solid ","66;\n        border-left: 1px solid ","66;\n        border-radius: 0 ","px ","px ","px;\n      }\n\n      .flexlayout__tab_border {\n        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.02), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.03);\n        border-top: 1px solid ","66;\n        border-right: 1px solid ","66;\n        border-bottom: 1px solid ","66;\n        border-left: 1px solid ","66;\n        border-radius: ","px;\n      }\n\n      .flexlayout__tabset {\n        overflow: visible;\n        border-radius: ","px;\n        font-family: ",";\n\n        &, &-selected {\n          background: transparent;\n        }\n      }\n\n      .flexlayout__border {\n        font-family: ",";\n      }\n\n      .flexlayout__border_button {\n        margin: 0 0 6px 0;\n        background: transparent;\n        width: 40px;\n        justify-content: center;\n        border-radius: ","px;\n        transition: all "," ",";\n\n        &--selected {\n          color: ",";\n          border-top: 1.5px solid var(--Colors-Base-Purple-7, #531DAB);\n          background: ",";\n        }\n      }\n\n      @media (hover: hover) {\n        .flexlayout__border_button--unselected:hover {\n          color: ","; \n          background: ",";\n        }\n      }\n\n      .flexlayout__border_button_trailing {\n        display: none;\n      }\n\n      .flexlayout__border_left {\n        border-right: 0;\n\n        .flexlayout__border_button_content {\n          transform: rotate(90deg);\n        }\n      }\n\n      .flexlayout__border_right {\n        border-left: 0;\n\n        .flexlayout__border_button_content {\n          transform: rotate(-90deg);\n        }\n      }\n\n      .flexlayout__tabset_tabbar_outer_top {\n        border: 0;\n      }\n\n      .flexlayout__tabset_tabbar_inner_tab_container {\n        padding-left: 0;\n      }\n\n      .flexlayout__border_toolbar {\n        display: none;\n      }\n    "],["\n      position: absolute;\n      inset: 8px 6px 4px 6px;\n\n      .flexlayout__tab_button_leading,\n      .flexlayout__border_button_leading {\n        display: none;\n      }\n\n      .flexlayout__tab_button {\n        margin: 0;\n        padding: ",";\n        background: ",";\n        transition: all "," ",";\n        font-size: ","px;\n        color: ",";\n        outline: none;\n        gap: ","px;\n      \n        &:hover {\n          background: ",";\n        }\n\n        &_trailing {\n          display: none;\n        }\n\n        &--selected {\n          font-weight: ",";\n          color: ",";\n          background: ",";\n          border-top: 1px solid ",";\n\n          &:hover {\n            background: ",";\n          }\n\n          & .flexlayout__tab_button_trailing {\n            display: flex;\n          }\n        }\n\n        &:focus:not(:focus-visible), &:active {\n          color: ",";\n        }\n\n        &:first-child {\n          border-left: 1px solid ","66;\n        }\n      }\n\n      .flexlayout__tabset_tab_divider {\n        width: ","px;\n      }\n\n      .flexlayout__tab_button_top {\n        border-radius: ","px ","px 0 0;\n        border-bottom: 0;\n      }\n\n      .flexlayout__border_inner_tab_container {\n        width: calc(100svh - 12px);\n        justify-content: flex-end;\n      }\n\n      .flexlayout__border_inner_tab_container_left, .flexlayout__border_inner_tab_container_right {\n        alignItems: end;\n\n        .flexlayout__border_tab_divider {\n          width: 0;\n        }\n      }\n\n      .flexlayout__splitter,\n      .flexlayout__border,\n      .flexlayout__tabset_tabbar_outer {\n        background: transparent;\n      }\n\n      .flexlayout__tab {\n        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.02), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.03);\n        border-right: 1px solid ","66;\n        border-bottom: 1px solid ","66;\n        border-left: 1px solid ","66;\n        border-radius: 0 ","px ","px ","px;\n      }\n\n      .flexlayout__tab_border {\n        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.02), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.03);\n        border-top: 1px solid ","66;\n        border-right: 1px solid ","66;\n        border-bottom: 1px solid ","66;\n        border-left: 1px solid ","66;\n        border-radius: ","px;\n      }\n\n      .flexlayout__tabset {\n        overflow: visible;\n        border-radius: ","px;\n        font-family: ",";\n\n        &, &-selected {\n          background: transparent;\n        }\n      }\n\n      .flexlayout__border {\n        font-family: ",";\n      }\n\n      .flexlayout__border_button {\n        margin: 0 0 6px 0;\n        background: transparent;\n        width: 40px;\n        justify-content: center;\n        border-radius: ","px;\n        transition: all "," ",";\n\n        &--selected {\n          color: ",";\n          border-top: 1.5px solid var(--Colors-Base-Purple-7, #531DAB);\n          background: ",";\n        }\n      }\n\n      @media (hover: hover) {\n        .flexlayout__border_button--unselected:hover {\n          color: ","; \n          background: ",";\n        }\n      }\n\n      .flexlayout__border_button_trailing {\n        display: none;\n      }\n\n      .flexlayout__border_left {\n        border-right: 0;\n\n        .flexlayout__border_button_content {\n          transform: rotate(90deg);\n        }\n      }\n\n      .flexlayout__border_right {\n        border-left: 0;\n\n        .flexlayout__border_button_content {\n          transform: rotate(-90deg);\n        }\n      }\n\n      .flexlayout__tabset_tabbar_outer_top {\n        border: 0;\n      }\n\n      .flexlayout__tabset_tabbar_inner_tab_container {\n        padding-left: 0;\n      }\n\n      .flexlayout__border_toolbar {\n        display: none;\n      }\n    "])),o.tabsCardPadding,n.Tabs.colorBgUnselectedTab,n.motionDurationSlow,n.motionEaseInOut,n.fontSize,o.itemColor,n.marginXS,n.Tabs.colorBgHoverUnselectedTab,n.fontWeightStrong,o.itemActiveColor,n.colorBgContainer,n.Tabs.colorBorderActiveTab,n.colorBgContainer,o.itemActiveColor,n.Tabs.colorBorderContainer,o.cardGutter,n.borderRadius,n.borderRadius,n.Tabs.colorBorderContainer,n.Tabs.colorBorderContainer,n.Tabs.colorBorderContainer,n.borderRadius,n.borderRadius,n.borderRadius,n.Tabs.colorBorderContainer,n.Tabs.colorBorderContainer,n.Tabs.colorBorderContainer,n.Tabs.colorBorderContainer,n.borderRadius,n.borderRadius,n.fontFamily,n.fontFamily,n.borderRadiusSM,n.motionDurationSlow,n.motionEaseInOut,o.itemActiveColor,n.controlItemBgHover,n.colorTextSecondary,n.controlItemBgActiveHover)}})),ye=function(){return ye=Object.assign||function(e){for(var n,t=1,o=arguments.length;t<o;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},ye.apply(this,arguments)},xe=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)n.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(t[o[r]]=e[o[r]])}return t},he=function(e){var n=xe(e,[]),t=me().styles;return l.createElement("div",{className:["widget-manager",t.widgetManager].join(" ")},l.createElement(A.Layout,ye({},n)))},_e=function(e){var n=e.getComponent();if(void 0!==n){var t,o=(t=n,a.find((function(e){return e.name===t})));if(void 0===o)throw new Error("Widget ".concat(n," not found"));var r=o.component;return l.createElement(r,null)}},ve=t(9372),we=function(e){var n=e.icon;e.title;return l.createElement("div",null,l.createElement(U,{name:n,options:{width:16,height:16}}))},Ee=function(e){var n=e.icon,t=e.title;return l.createElement(k.Z,null,l.createElement(U,{name:n,options:{width:16,height:16}}),l.createElement("span",null,t))},Oe=function(e){var n,t=e.node,o=(0,l.useState)(t.getParent()instanceof A.BorderNode)[0],r=(0,l.useState)(null!==(n=t.getIcon())&&void 0!==n?n:"widget-default")[0];return o?l.createElement(we,{icon:r,title:t.getName()}):l.createElement(Ee,{icon:r,title:t.getName()})},Se=ve.Z.useToken,Pe=function(){var e=h(D),n=x(),t=A.Model.fromJson(e),o=t.getNodeById("bottom_tabset"),r=Se().token;return(0,l.useEffect)((function(){var e=ge(r);t.doAction(A.Actions.updateModelAttributes({tabSetTabStripHeight:e.cardHeight,tabSetTabHeaderHeight:e.cardHeight,borderBarSize:50}))}),[]),0===o.getChildren().length?t.doAction(A.Actions.updateNodeAttributes(o.getId(),{height:-8})):-8===o.getHeight()&&t.doAction(A.Actions.updateNodeAttributes(o.getId(),{height:200})),l.createElement(he,{model:t,factory:_e,onModelChange:function(e){n(W(e.toJson()))},onRenderTab:function(e,n){n.content=l.createElement(Oe,{node:e}),n.leading=l.createElement(l.Fragment,null)}})};function ke(){return ke=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},ke.apply(this,arguments)}const je=function(e){return l.createElement("svg",ke({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24"},e),re||(re=l.createElement("path",{fill:"#5520A6",d:"M19 7c-1.7 0-3.2.8-4.2 2.2l-3.7 5.5C10.2 16.2 8.7 17 7 17c-2.8 0-5-2.2-5-5s2.2-5 5-5c1.7 0 3.2.8 4.2 2.2l.6 1L13 8.4l-.2-.3C11.5 6.2 9.3 5 7 5c-3.9 0-7 3.1-7 7s3.1 7 7 7c2.3 0 4.5-1.2 5.8-3.1l1.4-2.1.6 1c.9 1.4 2.5 2.2 4.2 2.2 2.8 0 5-2.2 5-5s-2.2-5-5-5m0 8c-1 0-1.9-.5-2.5-1.3L15.4 12l1.1-1.6C17 9.5 18 9 19 9c1.7 0 3 1.3 3 3s-1.3 3-3 3"})))};var Ce,Te,Be,Me=function(e,n){return Object.defineProperty?Object.defineProperty(e,"raw",{value:n}):e.raw=n,e},Ae=(0,C.kc)((function(e){e.token;return{logo:(0,e.css)(Ce||(Ce=Me(["\n      padding: 13px 16px 0 16px;\n    "],["\n      padding: 13px 16px 0 16px;\n    "])))}})),ze=function(){var e=Ae().styles;return l.createElement("div",{className:["logo",e.logo].join(" ")},l.createElement(je,{width:24,height:24,color:"#333",fill:"#ff0000"}))},Ie=function(e,n){return Object.defineProperty?Object.defineProperty(e,"raw",{value:n}):e.raw=n,e},Le=(0,C.kc)((function(e){e.token;return{rightSidebar:(0,e.css)(Te||(Te=Ie(["\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      z-index: 2;\n      pointer-events: none;\n\n      .logo \n    "],["\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      z-index: 2;\n      pointer-events: none;\n\n      .logo \n    "])))}})),We=function(){var e=Le().styles;return l.createElement("div",{className:e.rightSidebar},l.createElement(ze,null))},Ne=function(e,n){return Object.defineProperty?Object.defineProperty(e,"raw",{value:n}):e.raw=n,e},Re=(0,C.kc)((function(e){e.token;return{baseLayout:(0,e.css)(Be||(Be=Ne(["\n      position: absolute;\n      inset: 0;\n      background: #FCFCFC;\n    "],["\n      position: absolute;\n      inset: 0;\n      background: #FCFCFC;\n    "])))}})),He=function(){var e=Re().styles;return l.createElement("div",{className:["base-layout",e.baseLayout].join(" ")},l.createElement(pe,null),l.createElement(Pe,null),l.createElement(We,null))},Fe=function(){return l.createElement(l.Fragment,null,l.createElement(l.StrictMode,null,l.createElement(le,null,l.createElement(He,null))))};void 0!==(e=t.hmd(e)).hot&&e.hot.accept(),function(){var e=document.getElementById("app");if(null===e)throw new Error("Root element not found");(0,V.s)(e).render(l.createElement(Fe,null))}()}},i={};function l(e){var n=i[e];if(void 0!==n)return n.exports;var t=i[e]={id:e,loaded:!1,exports:{}};return a[e].call(t.exports,t,t.exports,l),t.loaded=!0,t.exports}l.m=a,e=[],l.O=(n,t,o,r)=>{if(!t){var a=1/0;for(u=0;u<e.length;u++){for(var[t,o,r]=e[u],i=!0,c=0;c<t.length;c++)(!1&r||a>=r)&&Object.keys(l.O).every((e=>l.O[e](t[c])))?t.splice(c--,1):(i=!1,r<a&&(a=r));if(i){e.splice(u--,1);var d=o();void 0!==d&&(n=d)}}return n}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[t,o,r]},l.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return l.d(n,{a:n}),n},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,l.t=function(e,o){if(1&o&&(e=this(e)),8&o)return e;if("object"==typeof e&&e){if(4&o&&e.__esModule)return e;if(16&o&&"function"==typeof e.then)return e}var r=Object.create(null);l.r(r);var a={};n=n||[null,t({}),t([]),t(t)];for(var i=2&o&&e;"object"==typeof i&&!~n.indexOf(i);i=t(i))Object.getOwnPropertyNames(i).forEach((n=>a[n]=()=>e[n]));return a.default=()=>e,l.d(r,a),r},l.d=(e,n)=>{for(var t in n)l.o(n,t)&&!l.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},l.f={},l.e=e=>Promise.all(Object.keys(l.f).reduce(((n,t)=>(l.f[t](e,n),n)),[])),l.u=e=>e+"."+{58:"9cf6e23a",625:"b487b20e",678:"c220b736"}[e]+".js",l.miniCssF=e=>{},l.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),l.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),l.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),o={},r="Pimcore:",l.l=(e,n,t,a)=>{if(o[e])o[e].push(n);else{var i,c;if(void 0!==t)for(var d=document.getElementsByTagName("script"),u=0;u<d.length;u++){var s=d[u];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==r+t){i=s;break}}i||(c=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,l.nc&&i.setAttribute("nonce",l.nc),i.setAttribute("data-webpack",r+t),i.src=e),o[e]=[n];var p=(n,t)=>{i.onerror=i.onload=null,clearTimeout(f);var r=o[e];if(delete o[e],i.parentNode&&i.parentNode.removeChild(i),r&&r.forEach((e=>e(t))),n)return n(t)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=p.bind(null,i.onerror),i.onload=p.bind(null,i.onload),c&&document.head.appendChild(i)}},l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.p="/bundles/pimcorestudioui/build/",(()=>{var e={179:0};l.f.j=(n,t)=>{var o=l.o(e,n)?e[n]:void 0;if(0!==o)if(o)t.push(o[2]);else{var r=new Promise(((t,r)=>o=e[n]=[t,r]));t.push(o[2]=r);var a=l.p+l.u(n),i=new Error;l.l(a,(t=>{if(l.o(e,n)&&(0!==(o=e[n])&&(e[n]=void 0),o)){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;i.message="Loading chunk "+n+" failed.\n("+r+": "+a+")",i.name="ChunkLoadError",i.type=r,i.request=a,o[1](i)}}),"chunk-"+n,n)}},l.O.j=n=>0===e[n];var n=(n,t)=>{var o,r,[a,i,c]=t,d=0;if(a.some((n=>0!==e[n]))){for(o in i)l.o(i,o)&&(l.m[o]=i[o]);if(c)var u=c(l)}for(n&&n(t);d<a.length;d++)r=a[d],l.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return l.O(u)},t=self.webpackChunkPimcore=self.webpackChunkPimcore||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})();var c=l.O(void 0,[610],(()=>l(4377)));c=l.O(c),Pimcore=c})();