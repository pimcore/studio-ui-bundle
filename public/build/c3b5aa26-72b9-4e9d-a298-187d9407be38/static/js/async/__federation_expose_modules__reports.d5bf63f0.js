/*! For license information please see __federation_expose_modules__reports.d5bf63f0.js.LICENSE.txt */
"use strict";(self["chunk_pimcore_studio_ui_bundle "]=self["chunk_pimcore_studio_ui_bundle "]||[]).push([["1327"],{85422(e,t,a){a.d(t,{d:()=>n});var s,n=((s={}).QuickAccessHidden="quickAccess.hidden",s.OpenDocument="quickAccess.open_document",s.OpenObject="quickAccess.open_object",s.OpenAsset="quickAccess.open_asset",s.RecycleBin="quickAccess.recycle_bin",s.DataManagementHidden="dataManagement.hidden",s.NotesAndEvents="dataManagement.notesEvents",s.SearchReplaceAssignments="dataManagement.searchReplaceAssignments",s.PredefinedProperties="dataManagement.predefinedProperties",s.TagConfiguration="dataManagement.tagConfiguration",s.GDPRDataExtractor="dataManagement.gdprDataExtractor",s.ClassDefinitions="dataManagement.dataModel_classes",s.FieldCollections="dataManagement.dataModel_fieldCollections",s.ObjectBricks="dataManagement.dataModel_objectBricks",s.ClassificationStore="dataManagement.dataModel_classificationStore",s.SelectOptions="dataManagement.dataModel_selectOptions",s.QuantityValues="dataManagement.dataModel_quantityValue",s.BulkExport="dataManagement.dataModel_bulkExport",s.BulkImport="dataManagement.dataModel_bulkImport",s.AssetThumbnails="assetManagement.assetThumbnails",s.PredefinedAssetMetadata="assetManagement.predefinedAssetMetadata",s.ExperienceEcommerceHidden="experienceEcommerce.hidden",s.Mails="experienceEcommerce.emails",s.DocumentTypes="experienceEcommerce.documentTypes",s.WebsiteSettings="experienceEcommerce.websiteSettings",s.Redirects="experienceEcommerce.redirects",s.RobotsTxt="experienceEcommerce.robotsTxt",s.TranslationsHidden="translations.hidden",s.Translations="translations.translations",s.Appearance="system.appearanceBranding",s.ReportingHidden="reporting.hidden",s.Reports="reporting.reports",s.CustomReportsConfiguration="reporting.customReportsConfiguration",s.SystemHidden="system.hidden",s.UsersHidden="system.users_hidden",s.Users="system.users_users",s.Roles="system.users_roles",s.PerspectiveEditor="system.perspectiveEditor",s.WidgetEditor="system.widgetEditor",s.ApplicationLogger="system.applicationLogger",s.About="system.about",s.SystemSettings="system.systemSettings",s.SearchHidden="search.hidden",s)},30727(e,t,a){a.r(t),a.d(t,{BarChart:()=>m.E,COLUMN_KEYS:()=>r.m,CUSTOM_REPORTS_WIDGET:()=>s.h,DynamicTypeCustomReportDefinitionAbstract:()=>i.U,DynamicTypeCustomReportDefinitionRegistry:()=>n.L,LineChart:()=>l.b,PieChart:()=>c.r,REPORTS_WIDGET:()=>s.z,ReportActionType:()=>p.n,ReportChart:()=>d.V,ReportsApiSlice:()=>u,getTypeByActionType:()=>p.w,normalizeReportFormData:()=>o.q,useReportFormState:()=>o.j});var s=a(9915),n=a(31428),i=a(37895),o=a(64594),r=a(26841),d=a(97233),c=a(54791),l=a(59740),m=a(98655),p=a(83209),u=a(48346);void 0!==(e=a.hmd(e)).hot&&e.hot.accept()},78524(e,t,a){a.d(t,{F:()=>i});var s=a(74848);a(47867);let n=(0,a(44241).createStyles)(e=>{let{token:t,css:a}=e;return{tabbarToolbar:a`
      &.tabs-toolbar-layout {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }

      .tabs-toolbar-layout__tabbar {
        display: flex;
        overflow: hidden;
        height: calc(100% - ${t.sizeXXL}px);
        width: 100%;
      }

      .tabs-toolbar-layout__toolbar {
        display: flex;
        overflow: hidden;
        height: ${t.sizeXXL}px;
        width: 100%;
      }
    `}},{hashPriority:"low"}),i=e=>{let{styles:t}=n();return(0,s.jsxs)("div",{className:["tabs-toolbar-layout",t.tabbarToolbar].join(" "),"data-testid":e.dataTestId,children:[(0,s.jsx)("div",{className:"tabs-toolbar-layout__tabbar",children:e.renderTabbar}),(0,s.jsx)("div",{className:"tabs-toolbar-layout__toolbar",children:e.renderToolbar})]})}}}]);