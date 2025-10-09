"use strict";
(self["webpackChunkproduct_website_template"] = self["webpackChunkproduct_website_template"] || []).push([[796,945],{

/***/ 901:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ detailPage; }
});

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__(6910);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(5458);
// EXTERNAL MODULE: ./node_modules/lodash/isEmpty.js
var isEmpty = __webpack_require__(2193);
var isEmpty_default = /*#__PURE__*/__webpack_require__.n(isEmpty);
// EXTERNAL MODULE: ./node_modules/lodash/upperFirst.js
var upperFirst = __webpack_require__(5808);
var upperFirst_default = /*#__PURE__*/__webpack_require__.n(upperFirst);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(6540);
;// ./src/templates/wooItemDetailTemplate/WOOItemDetailTemplate.module.css
// extracted by mini-css-extract-plugin
var backLink = "WOOItemDetailTemplate-module--backLink--e33aa";
var container = "WOOItemDetailTemplate-module--container--ccf27";
var content = "WOOItemDetailTemplate-module--content--29ced";
var heading1 = "WOOItemDetailTemplate-module--heading1--ba754";
var WOOItemDetailTemplate_module_pagination = "WOOItemDetailTemplate-module--pagination--a7d7e";
var table = "WOOItemDetailTemplate-module--table--d7844";
var tableBody = "WOOItemDetailTemplate-module--tableBody--9d96b";
var tableRow = "WOOItemDetailTemplate-module--tableRow--d28f2";
// EXTERNAL MODULE: ./node_modules/react-loading-skeleton/dist/index.js
var dist = __webpack_require__(255);
// EXTERNAL MODULE: ./node_modules/@utrecht/component-library-react/dist/css-module/index.mjs
var css_module = __webpack_require__(7640);
// EXTERNAL MODULE: ./src/services/dateFormat.ts + 3 modules
var dateFormat = __webpack_require__(6870);
// EXTERNAL MODULE: ./node_modules/react-i18next/dist/es/index.js + 15 modules
var es = __webpack_require__(2389);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 4 modules
var gatsby_browser_entry = __webpack_require__(4810);
// EXTERNAL MODULE: ./node_modules/@fortawesome/react-fontawesome/index.es.js
var index_es = __webpack_require__(6784);
// EXTERNAL MODULE: ./node_modules/@fortawesome/free-solid-svg-icons/index.mjs
var free_solid_svg_icons = __webpack_require__(6188);
// EXTERNAL MODULE: ./node_modules/react-query/es/index.js
var react_query_es = __webpack_require__(5942);
// EXTERNAL MODULE: ./src/hooks/openWoo.ts
var openWoo = __webpack_require__(9878);
;// ./src/services/getPDFName.ts
const getPDFName=url=>{if(!url)return;const finalSlashIndex=url.lastIndexOf("/");const pdfName=url.substring(finalSlashIndex+1);return pdfName;};
// EXTERNAL MODULE: ./node_modules/@conduction/components/lib/index.js + 100 modules
var lib = __webpack_require__(3306);
// EXTERNAL MODULE: ./src/services/removeHTMLFromString.ts
var removeHTMLFromString = __webpack_require__(4791);
// EXTERNAL MODULE: ./node_modules/react-helmet/es/Helmet.js
var Helmet = __webpack_require__(8154);
// EXTERNAL MODULE: ./src/context/pagination.ts
var context_pagination = __webpack_require__(3516);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
;// ./src/templates/wooItemDetailTemplate/WOOItemDetailTemplate.tsx
const WOOItemDetailTemplate=_ref=>{var _attachmentsNoLabelsQ2,_ref4,_ref5,_ref6,_getItems$data$title,_getItems$data$titel;let{wooItemId}=_ref;const{t,i18n}=(0,es/* useTranslation */.Bd)();const queryClient=new react_query_es.QueryClient();const getItems=(0,openWoo/* useOpenWoo */.N)(queryClient).getOne(wooItemId);const{pagination,setPagination}=(0,context_pagination/* usePaginationContext */.b)();const[requestedPage,setRequestedPage]=react.useState(pagination.currentPage);const attachmentsWithLabelsQuery=(0,openWoo/* useOpenWoo */.N)(queryClient).getAttachmentsWithLabels(wooItemId);const attachmentsNoLabelsQuery=(0,openWoo/* useOpenWoo */.N)(queryClient).getAttachmentsNoLabels(wooItemId,10,requestedPage);const sortAlphaNum=(a,b)=>a.title.localeCompare(b.title,i18n.language,{numeric:true});const getLabel=label=>{switch(upperFirst_default()(label)){case"Informatieverzoek":return t("Information request");case"Convenant":return t("Convenant");case"Besluit":return t("Decision");case"Inventarisatielijst":return t("Inventory list");default:return t(upperFirst_default()(label));}};const getName=name=>{var _getItems$data$Self$,_getItems$data$Self$2;const formattedName=name.replace(/_/g," ");const upperFirstName=upperFirst_default()(formattedName);switch(upperFirstName){case"Bevindingen":return t("Findings");case"Conclusies":return t("Conclusions");case"Functiebenaming":return t("Job title");case"Gedraging":return t("Behavior");case"Onderdeel taak":return t("Part of task");case"Oordeel":return t("Judgement");case"Opdrachtgever":return t("Client");case"Organisatieonderdeel":return t("Organizational unit");default:return upperFirst_default()(t((_getItems$data$Self$=(_getItems$data$Self$2=getItems.data["@self"].schema.properties[name])===null||_getItems$data$Self$2===void 0?void 0:_getItems$data$Self$2.title)!==null&&_getItems$data$Self$!==void 0?_getItems$data$Self$:upperFirstName));}};function isDate(str){// Check for ISO date format (YYYY-MM-DD) or common date formats
const dateRegex=/^\d{4}-\d{2}-\d{2}|^\d{4}\/\d{2}\/\d{2}/;if(!dateRegex.test(str))return false;const date=new Date(str);return!isNaN(date.getTime())&&date.toISOString().slice(0,10)===str.slice(0,10);}const getExtension=attachment=>{if(attachment.extension){return attachment.extension;}else{return attachment.type.split("/").pop();}};const checkIfVisible=property=>{return getItems.data["@self"].schema.properties[property].visible!==false;};const orderProperties=data=>{var _data$Self,_data$Self2,_data$Self2$schema;const excludeKeys=["@self","title","titel","name","naam","id","attachments"].concat((0,toConsumableArray/* default */.A)(Object.keys(getItems.data["@self"].schema.properties).filter(key=>!checkIfVisible(key))));const enrichedData=Object.assign({publicatiedatum:(_data$Self=data["@self"])===null||_data$Self===void 0?void 0:_data$Self.published,categorie:(_data$Self2=data["@self"])===null||_data$Self2===void 0?void 0:(_data$Self2$schema=_data$Self2.schema)===null||_data$Self2$schema===void 0?void 0:_data$Self2$schema.title},data);return Object.entries(enrichedData).filter(_ref2=>{let[key]=_ref2;return!excludeKeys.includes(key);}).sort((a,b)=>{var _data$Self3,_data$Self3$schema,_data$Self3$schema$pr,_data$Self3$schema$pr2,_data$Self4,_data$Self4$schema,_data$Self4$schema$pr,_data$Self4$schema$pr2;const orderA=(_data$Self3=data["@self"])===null||_data$Self3===void 0?void 0:(_data$Self3$schema=_data$Self3.schema)===null||_data$Self3$schema===void 0?void 0:(_data$Self3$schema$pr=_data$Self3$schema.properties)===null||_data$Self3$schema$pr===void 0?void 0:(_data$Self3$schema$pr2=_data$Self3$schema$pr[a[0]])===null||_data$Self3$schema$pr2===void 0?void 0:_data$Self3$schema$pr2.order;const orderB=(_data$Self4=data["@self"])===null||_data$Self4===void 0?void 0:(_data$Self4$schema=_data$Self4.schema)===null||_data$Self4$schema===void 0?void 0:(_data$Self4$schema$pr=_data$Self4$schema.properties)===null||_data$Self4$schema$pr===void 0?void 0:(_data$Self4$schema$pr2=_data$Self4$schema$pr[b[0]])===null||_data$Self4$schema$pr2===void 0?void 0:_data$Self4$schema$pr2.order;// If both have valid non-zero orders, sort normally
if(orderA&&orderB&&orderA!==0&&orderB!==0){return orderA-orderB;}// If orderA is valid and non-zero, it comes first
if(orderA&&orderA!==0)return-1;// If orderB is valid and non-zero, it comes first
if(orderB&&orderB!==0)return 1;// If orderA is 0 and orderB is null/undefined, orderA comes first
if(orderA===0&&!orderB)return-1;// If orderB is 0 and orderA is null/undefined, orderB comes first
if(orderB===0&&!orderA)return 1;// If both are 0 or both are null/undefined, maintain original order
return 0;}).reduce((acc,_ref3)=>{let[key,value]=_ref3;return Object.assign({},acc,{[key]:value});},{});};const groupedAttachmentsWithLabels=react.useMemo(()=>{var _attachmentsWithLabel;if(!attachmentsWithLabelsQuery.isSuccess||!((_attachmentsWithLabel=attachmentsWithLabelsQuery.data)!==null&&_attachmentsWithLabel!==void 0&&_attachmentsWithLabel.results))return[];const attachments=attachmentsWithLabelsQuery.data.results;let multipleLabels=[];let singleLabels=[];let allLabels=[];attachments.forEach(attachment=>{var _attachment$labels;if(((_attachment$labels=attachment.labels)===null||_attachment$labels===void 0?void 0:_attachment$labels.length)>1){multipleLabels.push(attachment);allLabels.push.apply(allLabels,(0,toConsumableArray/* default */.A)(attachment.labels));}else{singleLabels.push(attachment);allLabels.push(attachment.labels[0]);}});const newAttachments=[];multipleLabels.forEach(attachment=>{attachment.labels.forEach((label,idx)=>{newAttachments.push(Object.assign({},attachment,{labels:[attachment.labels[idx]]}));});});const attachmentsAll=[].concat(newAttachments,singleLabels);const uniqueLabels=(0,toConsumableArray/* default */.A)(new Set(allLabels));// Define the specific order for labels
const labelOrder=["informatieverzoek","convenant","besluit","inventarisatielijst","bijlage"];// Sort labels according to the specified order, with any unknown labels at the end
const sortedLabels=uniqueLabels.sort((a,b)=>{const aLower=a.toLowerCase();const bLower=b.toLowerCase();const indexA=labelOrder.indexOf(aLower);const indexB=labelOrder.indexOf(bLower);// If both labels are in the order array, sort by their position
if(indexA!==-1&&indexB!==-1){return indexA-indexB;}// If only one is in the order array, prioritize it
if(indexA!==-1)return-1;if(indexB!==-1)return 1;// If neither is in the order array, sort alphanumerically
return aLower.localeCompare(bLower,i18n.language,{numeric:true});});return sortedLabels.map(label=>({attachments:attachmentsAll.filter(att=>att.labels.includes(label)),label}));},[attachmentsWithLabelsQuery.data]);const unsortedAttachments=react.useMemo(()=>{var _attachmentsNoLabelsQ;if(!attachmentsNoLabelsQuery.isSuccess||!((_attachmentsNoLabelsQ=attachmentsNoLabelsQuery.data)!==null&&_attachmentsNoLabelsQ!==void 0&&_attachmentsNoLabelsQ.results))return[];return (0,toConsumableArray/* default */.A)(attachmentsNoLabelsQuery.data.results).sort(sortAlphaNum);},[attachmentsNoLabelsQuery.data]);const totalAttachmentPages=attachmentsNoLabelsQuery.isSuccess&&(_attachmentsNoLabelsQ2=attachmentsNoLabelsQuery.data)!==null&&_attachmentsNoLabelsQ2!==void 0&&_attachmentsNoLabelsQ2.pages?attachmentsNoLabelsQuery.data.pages:pagination.currentPage;react.useEffect(()=>{if(attachmentsNoLabelsQuery.isSuccess&&pagination.currentPage!==requestedPage){setPagination({currentPage:requestedPage});}},[attachmentsNoLabelsQuery.isSuccess]);return/*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[getItems.isSuccess&&/*#__PURE__*/(0,jsx_runtime.jsx)(Helmet/* Helmet */.m,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("title",{children:"Woo | "+window.sessionStorage.getItem("ORGANISATION_NAME")+" | "+(0,removeHTMLFromString/* removeHTMLFromString */.n)(getItems.data.titel)})}),/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* Page */.YW,{children:/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* PageContent */.TK,{className:container,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("div",{role:"navigation",children:/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* Link */.N_,{className:backLink,href:"/",onClick:e=>{e.preventDefault(),(0,gatsby_browser_entry/* navigate */.oo)("/");},tabIndex:0,"aria-label":t("Back to homepage"),children:[/*#__PURE__*/(0,jsx_runtime.jsx)(index_es/* FontAwesomeIcon */.g,{icon:free_solid_svg_icons/* faArrowLeft */.CeG})," ",/*#__PURE__*/(0,jsx_runtime.jsx)("span",{children:t("Back to homepage")})]})}),getItems.isSuccess&&getItems.data&&/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:content,role:"region","aria-label":t("Details"),children:[/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* Heading1 */._,{id:"mainContent",tabIndex:0,"aria-label":t("Title of woo request")+", "+((_ref4=(_ref5=(_ref6=(_getItems$data$title=getItems.data.title)!==null&&_getItems$data$title!==void 0?_getItems$data$title:getItems.data.titel)!==null&&_ref6!==void 0?_ref6:getItems.data.name)!==null&&_ref5!==void 0?_ref5:getItems.data.naam)!==null&&_ref4!==void 0?_ref4:getItems.data.id),children:(0,removeHTMLFromString/* removeHTMLFromString */.n)((0,removeHTMLFromString/* removeHTMLFromString */.n)((_getItems$data$titel=getItems.data.titel)!==null&&_getItems$data$titel!==void 0?_getItems$data$titel:getItems.data.title))}),/*#__PURE__*/(0,jsx_runtime.jsx)(lib/* HorizontalOverflowWrapper */.ax,{ariaLabels:{scrollLeftButton:t("Scroll table to the left"),scrollRightButton:t("Scroll table to the right")},children:/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* Table */.XI,{className:table,children:/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* TableBody */.BF,{className:tableBody,children:[getItems.data&&Object.entries(orderProperties(getItems.data)).map(_ref7=>{let[key,value]=_ref7;if(!!value){let formattedValue;if(!value||typeof value==="string"&&value.trim()===""||Array.isArray(value)&&value.length===0||typeof value==="object"&&value!==null&&Object.keys(value).length===0){return;}if(typeof value==="string"){var _translateDate;const isValidDate=isDate(value);formattedValue=isValidDate?(_translateDate=(0,dateFormat/* translateDate */.L)(i18n.language,value))!==null&&_translateDate!==void 0?_translateDate:"-":value;}else if(Array.isArray(value)){if(key==="themes"||key==="themas"){return!isEmpty_default()(value)&&/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* TableRow */.Hj,{className:tableRow,tabIndex:0,"aria-labelledby":"themesName themesData",children:[/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableCell */.nA,{id:"themesName",children:t("Themes")}),/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableCell */.nA,{id:"themesData",children:value.map((theme,idx)=>/*#__PURE__*/(0,jsx_runtime.jsx)("span",{children:theme.title?theme.title+(idx!==(value===null||value===void 0?void 0:value.length)-1?", ":""):theme},idx))})]},key);}else{formattedValue=value.map(item=>item.title).join(", ");}}else if(typeof value==="object"){formattedValue=JSON.stringify(value);}else{formattedValue=String(value);}return/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* TableRow */.Hj,{className:tableRow,tabIndex:0,"aria-label":getName(key)+", "+formattedValue,children:[/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableCell */.nA,{children:getName(key)}),/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableCell */.nA,{children:formattedValue})]},key);}}),attachmentsWithLabelsQuery.isSuccess&&groupedAttachmentsWithLabels.length>0&&groupedAttachmentsWithLabels.map((sortedAttachments,idx)=>{var _sortedAttachments$at,_sortedAttachments$at2;return/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* TableRow */.Hj,{className:tableRow,tabIndex:0,"aria-label":sortedAttachments.attachments.length===1?getLabel(sortedAttachments.label)+", "+((_sortedAttachments$at=sortedAttachments.attachments[0].title)!==null&&_sortedAttachments$at!==void 0?_sortedAttachments$at:getPDFName(sortedAttachments.attachments[0].accessUrl)):getLabel(sortedAttachments.label)+", "+t("There are")+" "+sortedAttachments.attachments.length+" "+t("Attachments")+" "+t("With the label")+" "+getLabel(sortedAttachments.label)+", "+t("These are")+" "+sortedAttachments.attachments.map(attachment=>{var _attachment$title;return(_attachment$title=attachment.title)!==null&&_attachment$title!==void 0?_attachment$title:getPDFName(attachment.accessUrl);}).join(", "),children:[/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableCell */.nA,{children:getLabel(sortedAttachments.label)}),sortedAttachments.attachments.length>1&&/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableCell */.nA,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("div",{id:"labelAttachmentsData",children:sortedAttachments.attachments.map((attachment,idx)=>{var _attachment$title2;return/*#__PURE__*/(0,jsx_runtime.jsx)("div",{children:/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* Link */.N_,{href:attachment.accessUrl,target:"blank",children:""+((_attachment$title2=attachment.title)!==null&&_attachment$title2!==void 0?_attachment$title2:getPDFName(attachment.accessUrl))})},idx);})})}),sortedAttachments.attachments.length===1&&/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableCell */.nA,{children:/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* Link */.N_,{href:sortedAttachments.attachments[0].accessUrl,target:"blank",children:""+((_sortedAttachments$at2=sortedAttachments.attachments[0].title)!==null&&_sortedAttachments$at2!==void 0?_sortedAttachments$at2:getPDFName(sortedAttachments.attachments[0].accessUrl))})})]},idx);}),attachmentsNoLabelsQuery.isSuccess&&unsortedAttachments.length>0&&/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* TableRow */.Hj,{className:tableRow,tabIndex:0,"aria-labelledby":"attachmentsName attachmentsData",children:[/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableCell */.nA,{id:"attachmentsName",children:t("Attachments")}),/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* TableCell */.nA,{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("div",{id:"attachmentsData",children:unsortedAttachments.map((bijlage,idx)=>{var _bijlage$accessUrl,_bijlage$accessUrl2;return bijlage.title&&/*#__PURE__*/(0,jsx_runtime.jsx)("div",{children:/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* Link */.N_,{href:((_bijlage$accessUrl=bijlage.accessUrl)===null||_bijlage$accessUrl===void 0?void 0:_bijlage$accessUrl.length)!==0?bijlage.accessUrl:"#",target:((_bijlage$accessUrl2=bijlage.accessUrl)===null||_bijlage$accessUrl2===void 0?void 0:_bijlage$accessUrl2.length)!==0?"blank":"",children:bijlage.title})},idx);})}),/*#__PURE__*/(0,jsx_runtime.jsx)("div",{role:"region","aria-label":t("Pagination"),className:WOOItemDetailTemplate_module_pagination,children:totalAttachmentPages>1&&/*#__PURE__*/(0,jsx_runtime.jsx)(lib/* Pagination */.dK,{ariaLabels:{pagination:t("Pagination"),previousPage:t("Previous page"),nextPage:t("Next page"),page:t("Page")},totalPages:totalAttachmentPages,currentPage:requestedPage,setCurrentPage:page=>setRequestedPage(page)})})]})]})]})})})]}),getItems.isLoading&&/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* default */.A,{height:"200px"})]})})]});};
;// ./src/pages/[id]/detailPage.tsx


const DetailPage = props => {
  return /*#__PURE__*/(0,jsx_runtime.jsx)(WOOItemDetailTemplate, {
    wooItemId: props.params.id
  });
};
/* harmony default export */ var detailPage = (DetailPage);

/***/ }),

/***/ 3811:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _detailPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(901);

/* harmony default export */ __webpack_exports__["default"] = (_detailPage__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ })

}]);
//# sourceMappingURL=component---src-pages-[id]-index-tsx-7372bb7b759a34ece34f.js.map