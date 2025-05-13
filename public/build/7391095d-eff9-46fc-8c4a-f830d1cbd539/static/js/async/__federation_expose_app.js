(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_app"], {
"./node_modules/dayjs/plugin/timezone.js": (function (module) {
!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t={year:0,month:1,day:2,hour:3,minute:4,second:5},e={};return function(n,i,o){var r,a=function(t,n,i){void 0===i&&(i={});var o=new Date(t),r=function(t,n){void 0===n&&(n={});var i=n.timeZoneName||"short",o=t+"|"+i,r=e[o];return r||(r=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:i}),e[o]=r),r}(n,i);return r.formatToParts(o)},u=function(e,n){for(var i=a(e,n),r=[],u=0;u<i.length;u+=1){var f=i[u],s=f.type,m=f.value,c=t[s];c>=0&&(r[c]=parseInt(m,10))}var d=r[3],l=24===d?0:d,h=r[0]+"-"+r[1]+"-"+r[2]+" "+l+":"+r[4]+":"+r[5]+":000",v=+e;return(o.utc(h).valueOf()-(v-=v%1e3))/6e4},f=i.prototype;f.tz=function(t,e){void 0===t&&(t=r);var n,i=this.utcOffset(),a=this.toDate(),u=a.toLocaleString("en-US",{timeZone:t}),f=Math.round((a-new Date(u))/1e3/60),s=15*-Math.round(a.getTimezoneOffset()/15)-f;if(!Number(s))n=this.utcOffset(0,e);else if(n=o(u,{locale:this.$L}).$set("millisecond",this.$ms).utcOffset(s,!0),e){var m=n.utcOffset();n=n.add(i-m,"minute")}return n.$x.$timezone=t,n},f.offsetName=function(t){var e=this.$x.$timezone||o.tz.guess(),n=a(this.valueOf(),e,{timeZoneName:t}).find((function(t){return"timezonename"===t.type.toLowerCase()}));return n&&n.value};var s=f.startOf;f.startOf=function(t,e){if(!this.$x||!this.$x.$timezone)return s.call(this,t,e);var n=o(this.format("YYYY-MM-DD HH:mm:ss:SSS"),{locale:this.$L});return s.call(n,t,e).tz(this.$x.$timezone,!0)},o.tz=function(t,e,n){var i=n&&e,a=n||e||r,f=u(+o(),a);if("string"!=typeof t)return o(t).tz(a);var s=function(t,e,n){var i=t-60*e*1e3,o=u(i,n);if(e===o)return[i,e];var r=u(i-=60*(o-e)*1e3,n);return o===r?[i,o]:[t-60*Math.min(o,r)*1e3,Math.max(o,r)]}(o.utc(t,i).valueOf(),f,a),m=s[0],c=s[1],d=o(m).utcOffset(c);return d.$x.$timezone=a,d},o.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},o.tz.setDefault=function(t){r=t}}}));

}),
"./node_modules/dayjs/plugin/utc.js": (function (module) {
!function(t,i){ true?module.exports=i():0}(this,(function(){"use strict";var t="minute",i=/[+-]\d\d(?::?\d\d)?/g,e=/([+-]|\d\d)/g;return function(s,f,n){var u=f.prototype;n.utc=function(t){var i={date:t,utc:!0,args:arguments};return new f(i)},u.utc=function(i){var e=n(this.toDate(),{locale:this.$L,utc:!0});return i?e.add(this.utcOffset(),t):e},u.local=function(){return n(this.toDate(),{locale:this.$L,utc:!1})};var o=u.parse;u.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t)};var r=u.init;u.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else r.call(this)};var a=u.utcOffset;u.utcOffset=function(s,f){var n=this.$utils().u;if(n(s))return this.$u?0:n(this.$offset)?a.call(this):this.$offset;if("string"==typeof s&&(s=function(t){void 0===t&&(t="");var s=t.match(i);if(!s)return null;var f=(""+s[0]).match(e)||["-",0,0],n=f[0],u=60*+f[1]+ +f[2];return 0===u?0:"+"===n?u:-u}(s),null===s))return this;var u=Math.abs(s)<=16?60*s:s,o=this;if(f)return o.$offset=u,o.$u=0===s,o;if(0!==s){var r=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(u+r,t)).$offset=u,o.$x.$localOffset=r}else o=this.utc();return o};var h=u.format;u.format=function(t){var i=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return h.call(this,i)},u.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},u.isUTC=function(){return!!this.$u},u.toISOString=function(){return this.toDate().toISOString()},u.toString=function(){return this.toDate().toUTCString()};var l=u.toDate;u.toDate=function(t){return"s"===t&&this.$offset?n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var c=u.diff;u.diff=function(t,i,e){if(t&&this.$u===t.$u)return c.call(this,t,i,e);var s=this.local(),f=n(t).local();return c.call(s,f,i,e)}}}));

}),
"./js/src/core/app/config/date-time.tsx": (function (module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DateTimeConfig: () => (DateTimeConfig)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/dayjs/dayjs.min.js");
/* ESM import */var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var dayjs_plugin_customParseFormat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/dayjs/plugin/customParseFormat.js");
/* ESM import */var dayjs_plugin_customParseFormat__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_customParseFormat__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var dayjs_plugin_advancedFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/dayjs/plugin/advancedFormat.js");
/* ESM import */var dayjs_plugin_advancedFormat__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_advancedFormat__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var dayjs_plugin_weekday__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/dayjs/plugin/weekday.js");
/* ESM import */var dayjs_plugin_weekday__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_weekday__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var dayjs_plugin_localeData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/dayjs/plugin/localeData.js");
/* ESM import */var dayjs_plugin_localeData__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_localeData__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var dayjs_plugin_weekOfYear__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/dayjs/plugin/weekOfYear.js");
/* ESM import */var dayjs_plugin_weekOfYear__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_weekOfYear__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var dayjs_plugin_weekYear__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/dayjs/plugin/weekYear.js");
/* ESM import */var dayjs_plugin_weekYear__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_weekYear__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/dayjs/plugin/utc.js");
/* ESM import */var dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var dayjs_plugin_timezone__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./node_modules/dayjs/plugin/timezone.js");
/* ESM import */var dayjs_plugin_timezone__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_timezone__WEBPACK_IMPORTED_MODULE_10__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 










const DateTimeConfig = (props)=>{
    dayjs__WEBPACK_IMPORTED_MODULE_2___default().extend((dayjs_plugin_customParseFormat__WEBPACK_IMPORTED_MODULE_3___default()));
    dayjs__WEBPACK_IMPORTED_MODULE_2___default().extend((dayjs_plugin_advancedFormat__WEBPACK_IMPORTED_MODULE_4___default()));
    dayjs__WEBPACK_IMPORTED_MODULE_2___default().extend((dayjs_plugin_weekday__WEBPACK_IMPORTED_MODULE_5___default()));
    dayjs__WEBPACK_IMPORTED_MODULE_2___default().extend((dayjs_plugin_localeData__WEBPACK_IMPORTED_MODULE_6___default()));
    dayjs__WEBPACK_IMPORTED_MODULE_2___default().extend((dayjs_plugin_weekOfYear__WEBPACK_IMPORTED_MODULE_7___default()));
    dayjs__WEBPACK_IMPORTED_MODULE_2___default().extend((dayjs_plugin_weekYear__WEBPACK_IMPORTED_MODULE_8___default()));
    dayjs__WEBPACK_IMPORTED_MODULE_2___default().extend((dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_9___default()));
    dayjs__WEBPACK_IMPORTED_MODULE_2___default().extend((dayjs_plugin_timezone__WEBPACK_IMPORTED_MODULE_10___default()));
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: props.children
    }, void 0, false);
};
_c = DateTimeConfig;
var _c;
$RefreshReg$(_c, "DateTimeConfig");

function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),
"./js/src/sdk/app/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ContainerContext: () => (/* reexport safe */ _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_3__.ContainerContext),
  ContainerProvider: () => (/* reexport safe */ _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_3__.ContainerProvider),
  DEEP_LINK_URL: () => (/* reexport safe */ _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_4__.DEEP_LINK_URL),
  DateTimeConfig: () => (/* reexport safe */ _Pimcore_app_config_date_time__WEBPACK_IMPORTED_MODULE_1__.DateTimeConfig),
  LOGIN_URL: () => (/* reexport safe */ _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_4__.LOGIN_URL),
  Trans: () => (/* reexport safe */ react_i18next__WEBPACK_IMPORTED_MODULE_6__.Trans),
  addAppMiddleware: () => (/* reexport safe */ _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_5__.addAppMiddleware),
  appConfig: () => (/* reexport safe */ _Pimcore_app_config_app_config__WEBPACK_IMPORTED_MODULE_0__.appConfig),
  baseUrl: () => (/* reexport safe */ _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_4__.baseUrl),
  container: () => (/* reexport safe */ _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_3__.container),
  currentDomain: () => (/* reexport safe */ _Pimcore_app_config_app_config__WEBPACK_IMPORTED_MODULE_0__.currentDomain),
  dynamicTypeRegistriesServiceIds: () => (/* reexport safe */ _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_2__.dynamicTypeRegistriesServiceIds),
  injectSliceWithState: () => (/* reexport safe */ _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_5__.injectSliceWithState),
  rootReducer: () => (/* reexport safe */ _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_5__.rootReducer),
  router: () => (/* reexport safe */ _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_4__.router),
  routes: () => (/* reexport safe */ _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_4__.routes),
  serviceIds: () => (/* reexport safe */ _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_2__.serviceIds),
  store: () => (/* reexport safe */ _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_5__.store),
  useAppDispatch: () => (/* reexport safe */ _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_5__.useAppDispatch),
  useAppSelector: () => (/* reexport safe */ _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_5__.useAppSelector),
  useInjection: () => (/* reexport safe */ _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_3__.useInjection),
  useMultiInjection: () => (/* reexport safe */ _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_3__.useMultiInjection),
  useOptionalInjection: () => (/* reexport safe */ _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_3__.useOptionalInjection),
  useTranslation: () => (/* reexport safe */ react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation),
  withAppMiddleware: () => (/* reexport safe */ _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_5__.withAppMiddleware)
});
/* ESM import */var _Pimcore_app_config_app_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/config/app-config.ts");
/* ESM import */var _Pimcore_app_config_date_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/config/date-time.tsx");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/router/router.tsx");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 







function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),

}]);
//# sourceMappingURL=__federation_expose_app.js.map