/*! For license information please see 1766.2d5cf493.js.LICENSE.txt */
"use strict";(self.webpackChunkpimcore_studio_ui_bundle=self.webpackChunkpimcore_studio_ui_bundle||[]).push([["1766"],{79771:function(e,t,a){a.d(t,{J:()=>i,j:()=>n});let i={"DynamicTypes/FieldFilterRegistry":"DynamicTypes/FieldFilterRegistry","DynamicTypes/BatchEditRegistry":"DynamicTypes/BatchEditRegistry","DynamicTypes/GridCellRegistry":"DynamicTypes/GridCellRegistry","DynamicTypes/AdvancedGridCellRegistry":"DynamicTypes/AdvancedGridCellRegistry","DynamicTypes/ListingRegistry":"DynamicTypes/ListingRegistry","DynamicTypes/MetadataRegistry":"DynamicTypes/MetadataRegistry","DynamicTypes/CustomReportDefinitionRegistry":"DynamicTypes/CustomReportDefinitionRegistry","DynamicTypes/ObjectLayoutRegistry":"DynamicTypes/ObjectLayoutRegistry","DynamicTypes/ObjectDataRegistry":"DynamicTypes/ObjectDataRegistry","DynamicTypes/DocumentEditableRegistry":"DynamicTypes/DocumentEditableRegistry","DynamicTypes/EditableDialogLayoutRegistry":"DynamicTypes/EditableDialogLayoutRegistry","DynamicTypes/AssetRegistry":"DynamicTypes/AssetRegistry","DynamicTypes/DocumentRegistry":"DynamicTypes/DocumentRegistry","DynamicTypes/ObjectRegistry":"DynamicTypes/ObjectRegistry","DynamicTypes/Grid/SourceFieldsRegistry":"DynamicTypes/Grid/SourceFieldsRegistry","DynamicTypes/Grid/TransformersRegistry":"DynamicTypes/Grid/TransformersRegistry","DynamicTypes/ThemeRegistry":"DynamicTypes/ThemeRegistry","DynamicTypes/IconSetRegistry":"DynamicTypes/IconSetRegistry","DynamicTypes/IconSet/PimcoreDefault":"DynamicTypes/IconSet/PimcoreDefault","DynamicTypes/IconSet/Twemoji":"DynamicTypes/IconSet/Twemoji","DynamicTypes/WidgetEditor/WidgetTypeRegistry":"DynamicTypes/WidgetEditor/WidgetTypeRegistry"},n={mainNavRegistry:"MainNavRegistry",widgetManager:"WidgetManagerService",backgroundProcessor:"BackgroundProcessorService",debouncedFormRegistry:"DebouncedFormRegistry",globalMessageBusProcess:"GlobalMessageBusProcess",globalMessageBus:"GlobalMessageBus","DynamicTypes/Theme/StudioDefaultLight":"DynamicTypes/Theme/StudioDefaultLight","DynamicTypes/Theme/StudioDefaultDark":"DynamicTypes/Theme/StudioDefaultDark","Asset/Editor/TypeRegistry":"Asset/Editor/TypeRegistry","Asset/Editor/TypeComponentRegistry":"Asset/Editor/TypeComponentRegistry","Asset/Editor/DocumentTabManager":"Asset/Editor/DocumentTabManager","Asset/Editor/FolderTabManager":"Asset/Editor/FolderTabManager","Asset/Editor/ImageTabManager":"Asset/Editor/ImageTabManager","Asset/Editor/TextTabManager":"Asset/Editor/TextTabManager","Asset/Editor/VideoTabManager":"Asset/Editor/VideoTabManager","Asset/Editor/AudioTabManager":"Asset/Editor/AudioTabManager","Asset/Editor/ArchiveTabManager":"Asset/Editor/ArchiveTabManager","Asset/Editor/UnknownTabManager":"Asset/Editor/UnknownTabManager","Asset/ThumbnailService":"Asset/ThumbnailService","DataObject/Editor/TypeRegistry":"DataObject/Editor/TypeRegistry","DataObject/Editor/ObjectTabManager":"DataObject/Editor/ObjectTabManager","DataObject/Editor/VariantTabManager":"DataObject/Editor/VariantTabManager","DataObject/Editor/FolderTabManager":"DataObject/Editor/FolderTabManager","Document/Editor/TypeRegistry":"Document/Editor/TypeRegistry","Document/Editor/PageTabManager":"Document/Editor/PageTabManager","Document/Editor/EmailTabManager":"Document/Editor/EmailTabManager","Document/Editor/FolderTabManager":"Document/Editor/FolderTabManager","Document/Editor/HardlinkTabManager":"Document/Editor/HardlinkTabManager","Document/Editor/LinkTabManager":"Document/Editor/LinkTabManager","Document/Editor/SnippetTabManager":"Document/Editor/SnippetTabManager","Document/Editor/Sidebar/PageSidebarManager":"Document/Editor/Sidebar/PageSidebarManager","Document/Editor/Sidebar/SnippetSidebarManager":"Document/Editor/Sidebar/SnippetSidebarManager","Document/Editor/Sidebar/EmailSidebarManager":"Document/Editor/Sidebar/EmailSidebarManager","Document/Editor/Sidebar/LinkSidebarManager":"Document/Editor/Sidebar/LinkSidebarManager","Document/Editor/Sidebar/HardlinkSidebarManager":"Document/Editor/Sidebar/HardlinkSidebarManager","Document/Editor/Sidebar/FolderSidebarManager":"Document/Editor/Sidebar/FolderSidebarManager",iconLibrary:"IconLibrary","Grid/TypeRegistry":"Grid/TypeRegistry",...i,"DynamicTypes/FieldFilter/DataObjectAdapter":"DynamicTypes/FieldFilter/DataObjectAdapter","DynamicTypes/FieldFilter/DataObjectObjectBrick":"DynamicTypes/FieldFilter/DataObjectObjectBrick","DynamicTypes/FieldFilter/String":"DynamicTypes/FieldFilter/String","DynamicTypes/FieldFilter/Fulltext":"DynamicTypes/FieldFilter/Fulltext","DynamicTypes/FieldFilter/Input":"DynamicTypes/FieldFilter/Input","DynamicTypes/FieldFilter/None":"DynamicTypes/FieldFilter/None","DynamicTypes/FieldFilter/Id":"DynamicTypes/FieldFilter/Id","DynamicTypes/FieldFilter/Number":"DynamicTypes/FieldFilter/Number","DynamicTypes/FieldFilter/Multiselect":"DynamicTypes/FieldFilter/Multiselect","DynamicTypes/FieldFilter/Date":"DynamicTypes/FieldFilter/Date","DynamicTypes/FieldFilter/Boolean":"DynamicTypes/FieldFilter/Boolean","DynamicTypes/FieldFilter/BooleanSelect":"DynamicTypes/FieldFilter/BooleanSelect","DynamicTypes/FieldFilter/Consent":"DynamicTypes/FieldFilter/Consent","DynamicTypes/FieldFilter/ClassificationStore":"DynamicTypes/FieldFilter/ClassificationStore","DynamicTypes/BatchEdit/Text":"DynamicTypes/BatchEdit/Text","DynamicTypes/BatchEdit/TextArea":"DynamicTypes/BatchEdit/TextArea","DynamicTypes/BatchEdit/Datetime":"DynamicTypes/BatchEdit/Datetime","DynamicTypes/BatchEdit/Select":"DynamicTypes/BatchEdit/Select","DynamicTypes/BatchEdit/Checkbox":"DynamicTypes/BatchEdit/Checkbox","DynamicTypes/BatchEdit/ElementDropzone":"DynamicTypes/BatchEdit/ElementDropzone","DynamicTypes/BatchEdit/ClassificationStore":"DynamicTypes/BatchEdit/ClassificationStore","DynamicTypes/BatchEdit/DataObjectAdapter":"DynamicTypes/BatchEdit/DataObjectAdapter","DynamicTypes/BatchEdit/DataObjectObjectBrick":"DynamicTypes/BatchEdit/DataObjectObjectBrick","DynamicTypes/GridCell/Text":"DynamicTypes/GridCell/Text","DynamicTypes/GridCell/String":"DynamicTypes/GridCell/String","DynamicTypes/GridCell/Integer":"DynamicTypes/GridCell/Integer","DynamicTypes/GridCell/Error":"DynamicTypes/GridCell/Error","DynamicTypes/GridCell/Array":"DynamicTypes/GridCell/Array","DynamicTypes/GridCell/Textarea":"DynamicTypes/GridCell/Textarea","DynamicTypes/GridCell/Number":"DynamicTypes/GridCell/Number","DynamicTypes/GridCell/Select":"DynamicTypes/GridCell/Select","DynamicTypes/GridCell/MultiSelect":"DynamicTypes/GridCell/MultiSelect","DynamicTypes/GridCell/Checkbox":"DynamicTypes/GridCell/Checkbox","DynamicTypes/GridCell/Boolean":"DynamicTypes/GridCell/Boolean","DynamicTypes/GridCell/Date":"DynamicTypes/GridCell/Date","DynamicTypes/GridCell/Time":"DynamicTypes/GridCell/Time","DynamicTypes/GridCell/DateTime":"DynamicTypes/GridCell/DateTime","DynamicTypes/GridCell/AssetLink":"DynamicTypes/GridCell/AssetLink","DynamicTypes/GridCell/ObjectLink":"DynamicTypes/GridCell/ObjectLink","DynamicTypes/GridCell/DocumentLink":"DynamicTypes/GridCell/DocumentLink","DynamicTypes/GridCell/OpenElement":"DynamicTypes/GridCell/OpenElement","DynamicTypes/GridCell/AssetPreview":"DynamicTypes/GridCell/AssetPreview","DynamicTypes/GridCell/AssetActions":"DynamicTypes/GridCell/AssetActions","DynamicTypes/GridCell/DataObjectActions":"DynamicTypes/GridCell/DataObjectActions","DynamicTypes/GridCell/DependencyTypeIcon":"DynamicTypes/GridCell/DependencyTypeIcon","DynamicTypes/GridCell/AssetCustomMetadataIcon":"DynamicTypes/GridCell/AssetCustomMetadataIcon","DynamicTypes/GridCell/AssetCustomMetadataValue":"DynamicTypes/GridCell/AssetCustomMetadataValue","DynamicTypes/GridCell/PropertyIcon":"DynamicTypes/GridCell/PropertyIcon","DynamicTypes/GridCell/PropertyValue":"DynamicTypes/GridCell/PropertyValue","DynamicTypes/GridCell/WebsiteSettingsValue":"DynamicTypes/GridCell/WebsiteSettingsValue","DynamicTypes/GridCell/ScheduleActionsSelect":"DynamicTypes/GridCell/ScheduleActionsSelect","DynamicTypes/GridCell/VersionsIdSelect":"DynamicTypes/GridCell/VersionsIdSelect","DynamicTypes/GridCell/AssetVersionPreviewFieldLabel":"DynamicTypes/GridCell/AssetVersionPreviewFieldLabel","DynamicTypes/GridCell/Asset":"DynamicTypes/GridCell/Asset","DynamicTypes/GridCell/Object":"DynamicTypes/GridCell/Object","DynamicTypes/GridCell/Document":"DynamicTypes/GridCell/Document","DynamicTypes/GridCell/Element":"DynamicTypes/GridCell/Element","DynamicTypes/GridCell/LanguageSelect":"DynamicTypes/GridCell/LanguageSelect","DynamicTypes/GridCell/Translate":"DynamicTypes/GridCell/Translate","DynamicTypes/GridCell/DataObjectAdapter":"DynamicTypes/GridCell/DataObjectAdapter","DynamicTypes/GridCell/ClassificationStore":"DynamicTypes/GridCell/ClassificationStore","DynamicTypes/GridCell/DataObjectAdvanced":"DynamicTypes/GridCell/DataObjectAdvanced","DynamicTypes/GridCell/DataObjectObjectBrick":"DynamicTypes/GridCell/DataObjectObjectBrick","DynamicTypes/Listing/Text":"DynamicTypes/Listing/Text","DynamicTypes/Listing/AssetLink":"DynamicTypes/Listing/AssetLink","DynamicTypes/Listing/Select":"DynamicTypes/Listing/Select","DynamicTypes/Metadata/Asset":"DynamicTypes/Metadata/Asset","DynamicTypes/Metadata/Document":"DynamicTypes/Metadata/Document","DynamicTypes/Metadata/Object":"DynamicTypes/Metadata/Object","DynamicTypes/Metadata/Input":"DynamicTypes/Metadata/Input","DynamicTypes/Metadata/Textarea":"DynamicTypes/Metadata/Textarea","DynamicTypes/Metadata/Checkbox":"DynamicTypes/Metadata/Checkbox","DynamicTypes/Metadata/Select":"DynamicTypes/Metadata/Select","DynamicTypes/Metadata/Date":"DynamicTypes/Metadata/Date","DynamicTypes/CustomReportDefinition/Sql":"DynamicTypes/CustomReportDefinition/Sql","DynamicTypes/ObjectLayout/Panel":"DynamicTypes/ObjectLayout/Panel","DynamicTypes/ObjectLayout/Tabpanel":"DynamicTypes/ObjectLayout/Tabpanel","DynamicTypes/ObjectLayout/Accordion":"DynamicTypes/ObjectLayout/Accordion","DynamicTypes/ObjectLayout/Region":"DynamicTypes/ObjectLayout/Region","DynamicTypes/ObjectLayout/Text":"DynamicTypes/ObjectLayout/Text","DynamicTypes/ObjectLayout/Fieldset":"DynamicTypes/ObjectLayout/Fieldset","DynamicTypes/ObjectLayout/FieldContainer":"DynamicTypes/ObjectLayout/FieldContainer","DynamicTypes/ObjectData/Input":"DynamicTypes/ObjectData/Input","DynamicTypes/ObjectData/Textarea":"DynamicTypes/ObjectData/Textarea","DynamicTypes/ObjectData/Wysiwyg":"DynamicTypes/ObjectData/Wysiwyg","DynamicTypes/ObjectData/Password":"DynamicTypes/ObjectData/Password","DynamicTypes/ObjectData/InputQuantityValue":"DynamicTypes/ObjectData/InputQuantityValue","DynamicTypes/ObjectData/Select":"DynamicTypes/ObjectData/Select","DynamicTypes/ObjectData/MultiSelect":"DynamicTypes/ObjectData/MultiSelect","DynamicTypes/ObjectData/Language":"DynamicTypes/ObjectData/Language","DynamicTypes/ObjectData/LanguageMultiSelect":"DynamicTypes/ObjectData/LanguageMultiSelect","DynamicTypes/ObjectData/Country":"DynamicTypes/ObjectData/Country","DynamicTypes/ObjectData/CountryMultiSelect":"DynamicTypes/ObjectData/CountryMultiSelect","DynamicTypes/ObjectData/User":"DynamicTypes/ObjectData/User","DynamicTypes/ObjectData/BooleanSelect":"DynamicTypes/ObjectData/BooleanSelect","DynamicTypes/ObjectData/Numeric":"DynamicTypes/ObjectData/Numeric","DynamicTypes/ObjectData/NumericRange":"DynamicTypes/ObjectData/NumericRange","DynamicTypes/ObjectData/Slider":"DynamicTypes/ObjectData/Slider","DynamicTypes/ObjectData/QuantityValue":"DynamicTypes/ObjectData/QuantityValue","DynamicTypes/ObjectData/QuantityValueRange":"DynamicTypes/ObjectData/QuantityValueRange","DynamicTypes/ObjectData/Consent":"DynamicTypes/ObjectData/Consent","DynamicTypes/ObjectData/Firstname":"DynamicTypes/ObjectData/Firstname","DynamicTypes/ObjectData/Lastname":"DynamicTypes/ObjectData/Lastname","DynamicTypes/ObjectData/Email":"DynamicTypes/ObjectData/Email","DynamicTypes/ObjectData/Gender":"DynamicTypes/ObjectData/Gender","DynamicTypes/ObjectData/RgbaColor":"DynamicTypes/ObjectData/RgbaColor","DynamicTypes/ObjectData/EncryptedField":"DynamicTypes/ObjectData/EncryptedField","DynamicTypes/ObjectData/CalculatedValue":"DynamicTypes/ObjectData/CalculatedValue","DynamicTypes/ObjectData/Checkbox":"DynamicTypes/ObjectData/Checkbox","DynamicTypes/ObjectData/Link":"DynamicTypes/ObjectData/Link","DynamicTypes/ObjectData/UrlSlug":"DynamicTypes/ObjectData/UrlSlug","DynamicTypes/ObjectData/Date":"DynamicTypes/ObjectData/Date","DynamicTypes/ObjectData/Datetime":"DynamicTypes/ObjectData/Datetime","DynamicTypes/ObjectData/DateRange":"DynamicTypes/ObjectData/DateRange","DynamicTypes/ObjectData/Time":"DynamicTypes/ObjectData/Time","DynamicTypes/ObjectData/ExternalImage":"DynamicTypes/ObjectData/ExternalImage","DynamicTypes/ObjectData/Image":"DynamicTypes/ObjectData/Image","DynamicTypes/ObjectData/Video":"DynamicTypes/ObjectData/Video","DynamicTypes/ObjectData/HotspotImage":"DynamicTypes/ObjectData/HotspotImage","DynamicTypes/ObjectData/ImageGallery":"DynamicTypes/ObjectData/ImageGallery","DynamicTypes/ObjectData/GeoPoint":"DynamicTypes/ObjectData/GeoPoint","DynamicTypes/ObjectData/GeoBounds":"DynamicTypes/ObjectData/GeoBounds","DynamicTypes/ObjectData/GeoPolygon":"DynamicTypes/ObjectData/GeoPolygon","DynamicTypes/ObjectData/GeoPolyLine":"DynamicTypes/ObjectData/GeoPolyLine","DynamicTypes/ObjectData/ManyToOneRelation":"DynamicTypes/ObjectData/ManyToOneRelation","DynamicTypes/ObjectData/ManyToManyRelation":"DynamicTypes/ObjectData/ManyToManyRelation","DynamicTypes/ObjectData/ManyToManyObjectRelation":"DynamicTypes/ObjectData/ManyToManyObjectRelation","DynamicTypes/ObjectData/AdvancedManyToManyRelation":"DynamicTypes/ObjectData/AdvancedManyToManyRelation","DynamicTypes/ObjectData/AdvancedManyToManyObjectRelation":"DynamicTypes/ObjectData/AdvancedManyToManyObjectRelation","DynamicTypes/ObjectData/ReverseObjectRelation":"DynamicTypes/ObjectData/ReverseObjectRelation","DynamicTypes/ObjectData/Table":"DynamicTypes/ObjectData/Table","DynamicTypes/ObjectData/StructuredTable":"DynamicTypes/ObjectData/StructuredTable","DynamicTypes/ObjectData/Block":"DynamicTypes/ObjectData/Block","DynamicTypes/ObjectData/LocalizedFields":"DynamicTypes/ObjectData/LocalizedFields","DynamicTypes/ObjectData/FieldCollection":"DynamicTypes/ObjectData/FieldCollection","DynamicTypes/ObjectData/ObjectBrick":"DynamicTypes/ObjectData/ObjectBrick","DynamicTypes/ObjectData/ClassificationStore":"DynamicTypes/ObjectData/ClassificationStore","DynamicTypes/DocumentEditable/Area":"DynamicTypes/DocumentEditable/Area","DynamicTypes/DocumentEditable/Areablock":"DynamicTypes/DocumentEditable/Areablock","DynamicTypes/DocumentEditable/Block":"DynamicTypes/DocumentEditable/Block","DynamicTypes/DocumentEditable/Checkbox":"DynamicTypes/DocumentEditable/Checkbox","DynamicTypes/DocumentEditable/Date":"DynamicTypes/DocumentEditable/Date","DynamicTypes/DocumentEditable/Embed":"DynamicTypes/DocumentEditable/Embed","DynamicTypes/DocumentEditable/Image":"DynamicTypes/DocumentEditable/Image","DynamicTypes/DocumentEditable/Input":"DynamicTypes/DocumentEditable/Input","DynamicTypes/DocumentEditable/Link":"DynamicTypes/DocumentEditable/Link","DynamicTypes/DocumentEditable/MultiSelect":"DynamicTypes/DocumentEditable/MultiSelect","DynamicTypes/DocumentEditable/Numeric":"DynamicTypes/DocumentEditable/Numeric","DynamicTypes/DocumentEditable/Pdf":"DynamicTypes/DocumentEditable/Pdf","DynamicTypes/DocumentEditable/Relation":"DynamicTypes/DocumentEditable/Relation","DynamicTypes/DocumentEditable/Relations":"DynamicTypes/DocumentEditable/Relations","DynamicTypes/DocumentEditable/Renderlet":"DynamicTypes/DocumentEditable/Renderlet","DynamicTypes/DocumentEditable/ScheduledBlock":"DynamicTypes/DocumentEditable/ScheduledBlock","DynamicTypes/DocumentEditable/Select":"DynamicTypes/DocumentEditable/Select","DynamicTypes/DocumentEditable/Snippet":"DynamicTypes/DocumentEditable/Snippet","DynamicTypes/DocumentEditable/Table":"DynamicTypes/DocumentEditable/Table","DynamicTypes/DocumentEditable/Textarea":"DynamicTypes/DocumentEditable/Textarea","DynamicTypes/DocumentEditable/Video":"DynamicTypes/DocumentEditable/Video","DynamicTypes/DocumentEditable/Wysiwyg":"DynamicTypes/DocumentEditable/Wysiwyg","DynamicTypes/EditableDialogLayout/Tabpanel":"DynamicTypes/EditableDialogLayout/Tabpanel","DynamicTypes/EditableDialogLayout/Panel":"DynamicTypes/EditableDialogLayout/Panel","DynamicTypes/Document/Page":"DynamicTypes/Document/Page","DynamicTypes/Document/Newsletter":"DynamicTypes/Document/Newsletter","DynamicTypes/Document/Snippet":"DynamicTypes/Document/Snippet","DynamicTypes/Document/Link":"DynamicTypes/Document/Link","DynamicTypes/Document/Hardlink":"DynamicTypes/Document/Hardlink","DynamicTypes/Document/Email":"DynamicTypes/Document/Email","DynamicTypes/Document/Folder":"DynamicTypes/Document/Folder","DynamicTypes/Asset/Video":"DynamicTypes/Asset/Video","DynamicTypes/Asset/Audio":"DynamicTypes/Asset/Audio","DynamicTypes/Asset/Image":"DynamicTypes/Asset/Image","DynamicTypes/Asset/Document":"DynamicTypes/Asset/Document","DynamicTypes/Asset/Archive":"DynamicTypes/Asset/Archive","DynamicTypes/Asset/Unknown":"DynamicTypes/Asset/Unknown","DynamicTypes/Asset/Folder":"DynamicTypes/Asset/Folder","DynamicTypes/Asset/Text":"DynamicTypes/Asset/Text","DynamicTypes/Object/Folder":"DynamicTypes/Object/Folder","DynamicTypes/Object/Object":"DynamicTypes/Object/Object","DynamicTypes/Object/Variant":"DynamicTypes/Object/Variant","DynamicTypes/Grid/SourceFields/Text":"DynamicTypes/Grid/SourceFields/Text","DynamicTypes/Grid/SourceFields/SimpleField":"DynamicTypes/Grid/SourceFields/SimpleField","DynamicTypes/Grid/SourceFields/RelationField":"DynamicTypes/Grid/SourceFields/RelationField","DynamicTypes/Grid/Transformers/BooleanFormatter":"DynamicTypes/Grid/Transformers/BooleanFormatter","DynamicTypes/Grid/Transformers/DateFormatter":"DynamicTypes/Grid/Transformers/DateFormatter","DynamicTypes/Grid/Transformers/ElementCounter":"DynamicTypes/Grid/Transformers/ElementCounter","DynamicTypes/Grid/Transformers/TwigOperator":"DynamicTypes/Grid/Transformers/TwigOperator","DynamicTypes/Grid/Transformers/Anonymizer":"DynamicTypes/Grid/Transformers/Anonymizer","DynamicTypes/Grid/Transformers/Blur":"DynamicTypes/Grid/Transformers/Blur","DynamicTypes/Grid/Transformers/ChangeCase":"DynamicTypes/Grid/Transformers/ChangeCase","DynamicTypes/Grid/Transformers/Combine":"DynamicTypes/Grid/Transformers/Combine","DynamicTypes/Grid/Transformers/Explode":"DynamicTypes/Grid/Transformers/Explode","DynamicTypes/Grid/Transformers/StringReplace":"DynamicTypes/Grid/Transformers/StringReplace","DynamicTypes/Grid/Transformers/Substring":"DynamicTypes/Grid/Transformers/Substring","DynamicTypes/Grid/Transformers/Trim":"DynamicTypes/Grid/Transformers/Trim","DynamicTypes/Grid/Transformers/Translate":"DynamicTypes/Grid/Transformers/Translate","DynamicTypes/Grid/Transformers/PHPCode":"DynamicTypes/Grid/Transformers/PHPCode","DynamicTypes/WidgetEditor/ElementTree":"DynamicTypes/WidgetEditor/ElementTree","ExecutionEngine/JobComponentRegistry":"ExecutionEngine/JobComponentRegistry",executionEngine:"ExecutionEngine","App/ComponentRegistry/ComponentRegistry":"App/ComponentRegistry/ComponentRegistry","App/ContextMenuRegistry/ContextMenuRegistry":"App/ContextMenuRegistry/ContextMenuRegistry","Document/RequiredFieldsValidationService":"Document/RequiredFieldsValidationService","Document/ProcessorRegistry/UrlProcessor":"Document/ProcessorRegistry/UrlProcessor","Document/ProcessorRegistry/SaveDataProcessor":"Document/ProcessorRegistry/SaveDataProcessor","DataObject/ProcessorRegistry/SaveDataProcessor":"DataObject/ProcessorRegistry/SaveDataProcessor","Asset/ProcessorRegistry/SaveDataProcessor":"Asset/ProcessorRegistry/SaveDataProcessor","Element/ProcessorRegistry/IconProcessor":"Element/ProcessorRegistry/IconProcessor","WidgetManager/ProcessorRegistry/PerspectiveProcessor":"WidgetManager/ProcessorRegistry/PerspectiveProcessor"}},80380:function(e,t,a){a.d(t,{Xl:()=>c,iz:()=>l,gD:()=>m,jm:()=>y,$1:()=>o,nC:()=>s});var i=a(85893),n=a(81004),r=a(60476);let{container:s,ContainerContext:c,ContainerProvider:y,useInjection:o,useMultiInjection:l,useOptionalInjection:m}=function(){var e;let t=new r.Container;(null==(e=window.Pimcore)?void 0:e.container)===void 0&&(window.Pimcore=window.Pimcore??{},window.Pimcore.container=t);let a=window.Pimcore.container,s=(0,n.createContext)(a);return{container:a,ContainerContext:s,ContainerProvider:e=>{let{children:t}=e;return(0,i.jsx)(s.Provider,{value:a,children:t})},useInjection:function(e){return a.get(e)},useOptionalInjection:function(e){return a.isBound(e)?a.get(e):null},useMultiInjection:function(e){return a.getAll(e)}}}()},74347:function(e,t,a){a.d(t,{P:()=>s,Z:()=>c});var i,n=a(53478),r=((i={}).GENERIC_ERROR="error_something_generic_went_wrong",i.ELEMENT_EXISTS="error_element_exists",i.FOLDER_EXISTS="error_folder_exists",i.INVALID_ARGUMENT="error_invalid_argument",i.WIDGET_NAME_MISSING="error_widget_name_missing",i.WIDGET_NAME_INVALID="error_widget_name_invalid",i.VALIDATION_FAILED="error_validation_failed",i.ELEMENT_VALIDATION_FAILED="error_element_validation_failed",i);let s="Something went wrong.",c=class extends Error{handleApiErrorDetails(e){let t=null==e?void 0:e.errorKey,a=null==e?void 0:e.message,i=null==e?void 0:e.error;return(0,n.isEmpty)(t)||t!==r.ELEMENT_VALIDATION_FAILED?(0,n.isEmpty)(t)||t===r.GENERIC_ERROR||t===r.INVALID_ARGUMENT?(0,n.isEmpty)(a)?(0,n.isEmpty)(i)?void 0:i:a:{errorKey:t}:{title:t,errorKey:a}}getContent(){if(!(0,n.isEmpty)(this.errorData)){var e;if(!(0,n.isEmpty)(null==(e=this.errorData)?void 0:e.message))return this.errorData.message;if("data"in this.errorData){let e=this.handleApiErrorDetails(this.errorData.data);if(!(0,n.isUndefined)(e))return e}if("error"in this.errorData&&(0,n.isString)(this.errorData.error))return this.errorData.error}return s}constructor(e){super(),this.errorData=e}}},83101:function(e,t,a){a.d(t,{Z:()=>i});let i=class extends Error{getContent(){return this.errorData}constructor(e){super(),this.errorData=e}}},81343:function(e,t,a){a.d(t,{MS:()=>n.Z,ZP:()=>i.Z,aE:()=>r.Z});var i=a(37172),n=a(74347),r=a(83101)},44432:function(e,t,a){let i;a.d(t,{E:()=>r});var n=a(53478);let r=(i=null,{setModalInstance:e=>{i=e},showError:e=>{let{content:t,title:a}=e;if((0,n.isEmpty)(i)){console.warn("ErrorModalService: Modal instance is not set. Call setModalInstance first."),console.warn("Error title:",a),console.warn("Error content:",t);return}i.error({content:t,title:a})}})},51776:function(e,t,a){a.d(t,{Z:()=>c,g:()=>s});var i=a(81004),n=a(53478);let r=e=>(0,n.isString)(e)?document.getElementById(e):e.current,s=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],[a,s]=(0,i.useState)({width:0,height:0});return(0,i.useLayoutEffect)(()=>{if(t)return;let a=r(e);if(!(0,n.isNull)(a)){let{width:e,height:t}=a.getBoundingClientRect();s({width:e,height:t})}},[t]),(0,i.useEffect)(()=>{if(t)return;let a=r(e);if((0,n.isNull)(a))return;let i=new ResizeObserver(e=>{let t,a,[i]=e;if(!(0,n.isNull)(i.borderBoxSize)&&i.borderBoxSize.length>0)t=i.borderBoxSize[0].inlineSize,a=i.borderBoxSize[0].blockSize;else{let e=i.contentRect;t=e.width,a=e.height}s(e=>0!==t&&0!==a&&(t!==e.width||a!==e.height)?{width:t,height:a}:e)});return i.observe(a),()=>{i.disconnect()}},[e,t]),a},c=s},25125:function(e,t,a){a.d(t,{IQ:()=>c,bz:()=>y,vE:()=>o});var i=a(53478);let n=["none","mini","extra-small","small","normal","medium","large","extra-large","maxi"],r=(e,t,a)=>{let i={margin:{none:0,mini:e.marginXXS,"extra-small":e.marginXS,small:e.marginSM,normal:e.margin,medium:e.marginMD,large:e.marginLG,"extra-large":e.marginXL,maxi:e.marginXXL},padding:{none:0,mini:e.paddingXXS,"extra-small":e.paddingXS,small:e.paddingSM,normal:e.padding,medium:e.paddingMD,large:e.paddingLG,"extra-large":e.paddingXL,maxi:e.sizeXXL}};return i[a][t]??i[a].normal},s=(e,t,a)=>{if((0,i.isUndefined)(t))return{};if("string"==typeof t){let i=r(e,t,a);return{[a]:`${i}px`}}let n={};for(let[s,c]of Object.entries({x:["Left","Right"],y:["Top","Bottom"],top:["Top"],bottom:["Bottom"],left:["Left"],right:["Right"]}))if(!0===Object.prototype.hasOwnProperty.call(t,s)){let y=t[s];if(!(0,i.isUndefined)(y)){let t=r(e,y,a);for(let e of c)n[`${a}${e}`]=`${t}px`}}return n},c=(e,t)=>s(e,t,"margin"),y=(e,t)=>s(e,t,"padding"),o=(e,t,a,s)=>{let c;return c="margin",n.map(n=>((e,t,a,n,s,c)=>{let y=r(c,a,s),o=[];for(let r of n){let n={x:["left","right"],y:["top","bottom"],top:["top"],bottom:["bottom"],left:["left"],right:["right"]}[r];if(!(0,i.isUndefined)(n)){let i=n.map(e=>`${s}-${e}: ${y}px;`).join(" ");o.push(`
        &.${e}--${t}-${a} {
          ${i}
        }
      `)}}return o.join("\n")})(e,t,n,s,c,a)).join("\n")}},30225:function(e,t,a){a.d(t,{H:()=>r,O:()=>n});var i=a(53478);let n=e=>null==e||("object"!=typeof e||Array.isArray(e)?"object"==typeof e&&Array.isArray(e)?0===e.length:"string"==typeof e&&0===e.trim().length:0===Object.keys(e).length),r=e=>(0,i.isString)(e)&&!(0,i.isEmpty)((0,i.trim)(e))},44780:function(e,t,a){a.d(t,{x:()=>y});var i=a(85893),n=a(81004);let r=(0,a(29202).createStyles)(e=>{let{css:t}=e;return{box:t`
      &.box--inline {
        display: inline-block;
      }
    `}});var s=a(25125),c=a(26788);let y=e=>{let{children:t,padding:a,margin:y,className:o,component:l="div",inline:m,style:d,...D}=e,{styles:p}=r(),{useToken:T}=c.theme,{token:u}=T(),b=(0,n.useMemo)(()=>{let e=(0,s.bz)(u,a),t=(0,s.IQ)(u,y);return{...e,...t,...d}},[a,y,d,c.theme]);return(0,n.useMemo)(()=>(0,i.jsx)(l,{className:`box ${p.box} ${!0===m?"box--inline":""} ${o??""}`,style:b,...D,children:t}),[t,o,l,m,b])}},98550:function(e,t,a){a.d(t,{z:()=>d});var i=a(85893),n=a(81004),r=a.n(n),s=a(26788),c=a(63583),y=a(58793),o=a.n(y),l=a(2067);let m=(0,a(29202).createStyles)(e=>{let{token:t,css:a}=e;return{button:a`
      position: relative;

      .button__loading-spinner,
      .ant-spin-dot {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        margin: auto;
        color: inherit;
        transform: translateY(-50%);
      }
      
      .button__text {
        transition: opacity 200ms ease-in-out;
        
        &:empty {
          display: none;
        }
      }
      
      .button__loading-spinner + .button__text {
        opacity: 0;
      }

      &.button--type-action {
        background-color: ${t.colorBgToolbar};
        border: none;
        box-shadow: none;
        border-radius: ${t.borderRadius}px ${t.borderRadius}px 0 0;

        &.ant-btn-variant-outlined:not(:disabled):not(.ant-btn-disabled):hover {
          background-color: ${t.colorFillActive};
        }
      }

      &.button--color-secondary {
        border-color: ${t.colorBorderSecondary};
        box-shadow: none;
        color: ${t.colorText};
      }
      &.button--color-secondary:hover {
        border-color: ${t.colorBorderSecondary} !important;
        color: ${t.colorText} !important;
      }
    `}}),d=r().forwardRef((e,t)=>{let{loading:a,children:r,className:y,type:d,color:D,...p}=e,T=(0,n.useRef)(null),{styles:u}=m();(0,n.useImperativeHandle)(t,()=>T.current);let b=o()("button",`button--type-${d}`,`button--color-${D}`,u.button,{"ant-btn-loading":a},y);return(0,n.useEffect)(()=>(!0===a&&null!==T.current&&(T.current.style.width=T.current.getBoundingClientRect().width+"px",T.current.style.height=T.current.getBoundingClientRect().height+"px"),()=>{!0===a&&null!==T.current&&(T.current.style.width="",T.current.style.height="")}),[a]),(0,i.jsxs)(s.Button,{className:b,ref:T,type:"action"===d?void 0:d,...p,color:"secondary"===D?void 0:D,children:[!0===a?(0,i.jsx)(c.AnimatePresence,{children:(0,i.jsx)(c.motion.div,{animate:{opacity:1},className:"button__loading-spinner",exit:{opacity:0},initial:{opacity:0},children:(0,i.jsx)(l.y,{size:"small",spinning:!0})},"loading")}):null,(0,i.jsx)("span",{className:"button__text",children:r})]})})},62368:function(e,t,a){a.d(t,{V:()=>l});var i=a(85893);a(81004);var n=a(58793),r=a.n(n);let s=(0,a(29202).createStyles)(e=>{let{token:t,css:a}=e;return{content:a`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: auto;
      gap: 12px;

      &.content--overflow-x-hidden {
        overflow-x: hidden;
      }

      &.content--overflow-y-hidden {
        overflow-y: hidden;
      }

      &.content--overflow-x-auto {
        overflow-x: auto;
      }

      &.content--overflow-y-auto {
        overflow-y: auto;
      }

      &.content--overflow-x-visible {
        overflow-x: visible;
      }

      &.content--overflow-y-visible {
        overflow-y: visible;
      }

      &.content--overflow-x-scroll {
        overflow-x: scroll;
      }

      &.content--overflow-y-scroll {
        overflow-y: scroll;
      }

      &.content--padded {
        padding: ${t.paddingSM}px;
      }

      &.content--centered {
        justify-content: center;
        align-items: center;
      }
      
      &.content--padded .ant-table-thead,
      &.p-t-small .ant-table-thead {
        top: -${t.paddingSM}px;
      }
    `,contentFullPage:a`
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
    `}});var c=a(7067),y=a(2067),o=a(44780);let l=e=>{let{children:t,padded:a=!1,padding:n={top:"small",x:"extra-small",bottom:"extra-small"},overflow:l={x:"auto",y:"auto"},margin:m="none",className:d,loading:D=!1,none:p=!1,centered:T=!1,noneOptions:u,fullPage:b,...g}=e,{styles:j}=s(),E=!D&&!p,O=r()(j.content,"content",d,`content--overflow-x-${l.x}`,`content--overflow-y-${l.y}`,{"content--centered":T||p||D,[j.contentFullPage]:b});return(0,i.jsxs)(o.x,{className:O,padding:a?n:"none",...g,children:[D&&(0,i.jsx)(y.y,{asContainer:!0,tip:"Loading"}),p&&!D&&(0,i.jsx)(c.d,{...u}),E&&t]})}},52309:function(e,t,a){a.d(t,{k:()=>m});var i=a(85893),n=a(81004),r=a(26788),s=a(58793),c=a.n(s),y=a(53478);let o=(0,a(29202).createStyles)((e,t)=>{let{css:a}=e;return{rowColGap:a`
      column-gap: ${t.x}px;
      row-gap: ${t.y}px;
    `}}),{useToken:l}=r.theme,m=(0,n.forwardRef)((e,t)=>{let{gap:a=0,className:n,rootClassName:s,children:m,...d}=e,{token:D}=l(),{x:p,y:T}=function(e){let t=e=>(0,y.isNumber)(e)?e:function(e){let{token:t,gap:a}=e;switch(a){case"mini":return t.sizeXXS;case"extra-small":return t.sizeXS;case"small":return t.sizeSM;case"normal":return t.size;case"medium":return t.sizeMD;case"large":return t.sizeLG;case"extra-large":return t.sizeXL;case"maxi":return t.sizeXXL;default:return 0}}({token:D,gap:e});return(0,y.isString)(e)?{x:t(e),y:t(e)}:(0,y.isNumber)(e)?{x:e,y:e}:(0,y.isObject)(e)?{x:t(e.x),y:t(e.y)}:{x:0,y:0}}(a),{styles:u}=o({x:p,y:T}),b=c()(u.rowColGap,n,s);return(0,i.jsx)(r.Flex,{className:b,...d,ref:t,children:m})});m.displayName="Flex"},82141:function(e,t,a){a.d(t,{W:()=>c});var i=a(85893),n=a(98550);a(81004);var r=a(37603),s=a(26788);let c=e=>{let{icon:t,children:a,iconOptions:c,iconPlacement:y="left",...o}=e;return(0,i.jsx)(n.z,{...o,children:(0,i.jsxs)(s.Flex,{align:"center",gap:6,justify:"center",children:["left"===y&&(0,i.jsx)(r.J,{...t}),(0,i.jsx)("span",{children:a}),"right"===y&&(0,i.jsx)(r.J,{...t})]})})}},37603:function(e,t,a){a.d(t,{J:()=>m});var i=a(85893);a(81004);var n=a(53478),r=a(58793),s=a.n(r),c=a(26788),y=a(80380),o=a(79771);let l=(0,a(29202).createStyles)(e=>{let{token:t,css:a}=e;return{iconHide:a`
      display: none;
    `,subIcon:a`
      position: absolute;
      height: 10px;
      z-index: 100;
      bottom: 0;
      left: 0;

      & svg {
        width: inherit;
        height: inherit;
        color: ${t.gold7};
        background: ${t.gold1};
        border-radius: ${t.borderRadiusLG}px;
      }

      &.sub-icon-variant--green {
        & svg {
          color: ${t.green7};
        }
      }
    `}}),m=e=>{let{value:t,type:a="name",options:r,className:m,subIconName:d,subIconVariant:D="default",sphere:p=!1,onLoadError:T,...u}=e,b=(0,y.$1)(o.j.iconLibrary),g=(null==r?void 0:r.width)??16,j=(null==r?void 0:r.height)??16,{styles:E}=l(),{token:O}=c.theme.useToken(),f=p?24:g,h=p?24:j,x="name"===a,C=x?b.get(t):void 0,S=x&&((0,n.isNil)(t)||(0,n.isUndefined)(C)),G=(0,n.isUndefined)(d)?void 0:b.get(d),v=p?{width:f,height:h,position:"relative",backgroundColor:O.colorFillAlter,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}:{width:g,height:j,position:"relative"};return(0,i.jsxs)("div",{className:s()(`pimcore-icon pimcore-icon-${t} anticon ${m}`,{[E.iconHide]:S}),style:v,...u,children:[!(0,n.isNil)(G)&&(0,i.jsx)("div",{className:`${E.subIcon} sub-icon-variant--${D}`,children:(0,i.jsx)(G,{})}),"path"===a?(0,i.jsx)("img",{alt:"",className:"pimcore-icon__image",onError:()=>{null==T||T(!0)},onLoad:()=>{null==T||T(!1)},src:t,style:{width:g,height:j}}):(0,n.isUndefined)(C)?(0,i.jsx)("div",{style:{width:g,height:j}}):(0,i.jsx)(C,{height:j,width:g,...r})]})}},7067:function(e,t,a){a.d(t,{d:()=>c});var i=a(85893),n=a(26788);let r=(0,a(29202).createStyles)(e=>{let{token:t,css:a}=e;return{content:a`
      .ant-empty-image {
        margin-bottom: ${t.marginXS}px;
        height: auto;
      }
        
      .ant-empty-description {
        padding: 5px ${t.controlPaddingHorizontal}px;
        font-size: 14px;
        color: ${t.Empty.colorTextDisabled};
        line-height: 20px;
      }
    `}});a(81004);var s=a(37603);let c=e=>{let{text:t}=e,{styles:a}=r();return(0,i.jsx)("div",{className:a.content,children:(0,i.jsx)(n.Empty,{description:t,image:(0,i.jsx)(s.J,{options:{width:184,height:123},value:"no-content"})})})}},2067:function(e,t,a){a.d(t,{y:()=>y});var i=a(85893);a(81004);var n=a(26788),r=a(45540),s=a(37603);let c=(0,a(29202).createStyles)(e=>{let{token:t,css:a}=e;return{spin:a`
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes spin-dot {
        0% {
          opacity: 0.3;
        } 
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0.3;
        }
      }

      animation-name: spin;
      animation-duration: 2s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;

      circle {
        animation: spin-dot 2s infinite;

        &:nth-child(1) {
          animation-delay: 0.5s;
        }

        &:nth-child(2) {
          animation-delay: 1.5s;
        }

        &:nth-child(3) {
          animation-delay: 1s;
        }

        
        &:nth-child(4) {
          animation-delay: 2s;
        }
      }
    `,spinContainer:a`
      display: flex;
      flex-direction: column;
      gap: 8px;
      justify-content: center;
      align-items: center;
      height: 100px;
      width: 100px;
      color: ${t.colorPrimary};
    `}}),y=e=>{let{asContainer:t=!1,type:a="dotted",tip:y,...o}=e,{styles:l}=c(),m=(0,i.jsx)(s.J,{className:l.spin,value:"spinner"});return"classic"===a&&(m=(0,i.jsx)(r.Z,{spin:!0})),(0,i.jsxs)(i.Fragment,{children:[!t&&(0,i.jsx)(i.Fragment,{children:m}),t&&(0,i.jsxs)("div",{className:l.spinContainer,children:[(0,i.jsx)(n.Spin,{indicator:(0,i.jsx)(i.Fragment,{children:m}),...o}),void 0!==y&&(0,i.jsx)("div",{children:y})]})]})}},36386:function(e,t,a){a.d(t,{x:()=>r});var i=a(85893);a(81004);let{Text:n}=a(26788).Typography,r=e=>(0,i.jsx)(n,{...e})},37172:function(e,t,a){a.d(t,{Z:()=>m});var i=a(85893);a(81004);var n=a(53478),r=a(44432),s=a(81343),c=a(71695),y=a(74347);let o=e=>{let{errorContent:t}=e,{t:a}=(0,c.useTranslation)(),r=(0,n.isString)(t)?t:(0,n.isString)(t)||(0,n.isUndefined)(null==t?void 0:t.errorKey)?y.P:a(`error.${t.errorKey}`);return(0,i.jsx)(i.Fragment,{children:r})},l=new Set,m=(e,t)=>{let a=e.getContent();if(l.has(a))return;l.add(a),setTimeout(()=>{l.clear()},0);let c=()=>e instanceof s.MS?(0,i.jsx)(o,{errorContent:a}):a;if((0,n.isUndefined)(t)?r.E.showError({content:c(),title:"object"==typeof a?a.title:null}):t(c()),e instanceof s.aE)throw Error(a)}},13147:function(e,t,a){a.d(t,{Z:()=>o,x:()=>y});var i,n,r=a(60476),s=a(81343);function c(e,t,a){var i;return(t="symbol"==typeof(i=function(e,t){if("object"!=typeof e||!e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var i=a.call(e,t||"default");if("object"!=typeof i)return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?i:i+"")in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}let y=(0,r.injectable)()(i=class{constructor(){c(this,"id",void 0)}})||i,o=(0,r.injectable)()(n=class{registerDynamicType(e){this.dynamicTypes.has(e.id)&&(0,s.ZP)(new s.aE(`Dynamic type with id "${e.id}" already exists`)),this.dynamicTypes.set(e.id,e)}getDynamicType(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1],a=this.dynamicTypes.get(e);return void 0===a&&t&&(0,s.ZP)(new s.aE(`Dynamic type with id "${e}" not found`)),a}getDynamicTypes(){return Array.from(this.dynamicTypes.values())}overrideDynamicType(e){this.dynamicTypes.has(e.id)||(0,s.ZP)(new s.aE(`Dynamic type with id "${e.id}" not found`)),this.dynamicTypes.set(e.id,e)}hasDynamicType(e){return this.dynamicTypes.has(e)}constructor(){c(this,"dynamicTypes",new Map)}})||n}}]);