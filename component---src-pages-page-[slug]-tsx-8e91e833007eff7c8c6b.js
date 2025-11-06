"use strict";
(self["webpackChunkproduct_website_template"] = self["webpackChunkproduct_website_template"] || []).push([[480],{

/***/ 36050:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  U: function() { return /* binding */ PageTemplate; }
});

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__(26910);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(45458);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(96540);
;// ./src/templates/pages/PageTemplate.module.css
// extracted by mini-css-extract-plugin
var container = "PageTemplate-module--container--5bb24";
// EXTERNAL MODULE: ./node_modules/@utrecht/component-library-react/dist/css-module/index.mjs
var css_module = __webpack_require__(57640);
// EXTERNAL MODULE: ./node_modules/react-i18next/dist/es/index.js + 15 modules
var es = __webpack_require__(32389);
// EXTERNAL MODULE: ./src/hooks/pages.ts
var pages = __webpack_require__(16269);
;// ./src/services/sanitizeHtml.ts
const sanitizeHtml=html=>{if(typeof html!=="string")return"";let safe=html;safe=safe.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi,"");safe=safe.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi,"");safe=safe.replace(/ on[a-z]+\s*=\s*"[^"]*"/gi,"");safe=safe.replace(/ on[a-z]+\s*=\s*'[^']*'/gi,"");safe=safe.replace(/ on[a-z]+\s*=\s*[^\s>]+/gi,"");safe=safe.replace(/href\s*=\s*"javascript:[^"]*"/gi,'href="#"');safe=safe.replace(/href\s*=\s*'javascript:[^']*'/gi,"href='#'");return safe;};
// EXTERNAL MODULE: ./src/services/pageUtils.ts
var pageUtils = __webpack_require__(93015);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(74848);
;// ./src/templates/pages/PageTemplate.tsx
const PageTemplate=_ref=>{let{slug}=_ref;const{t}=(0,es/* useTranslation */.Bd)();const pagesQuery=(0,pages/* usePages */.Q)().getAll();const page=react.useMemo(()=>{const data=pagesQuery===null||pagesQuery===void 0?void 0:pagesQuery.data;const list=(0,pageUtils/* getPagesList */.Xh)(data);return (0,pageUtils/* getPageBySlug */.eh)(list,slug);},[pagesQuery===null||pagesQuery===void 0?void 0:pagesQuery.data,slug]);const blocks=react.useMemo(()=>(Array.isArray(page===null||page===void 0?void 0:page.contents)?(0,toConsumableArray/* default */.A)(page.contents):[]).sort((a,b)=>{var _a$order,_b$order;return Number((_a$order=a===null||a===void 0?void 0:a.order)!==null&&_a$order!==void 0?_a$order:0)-Number((_b$order=b===null||b===void 0?void 0:b.order)!==null&&_b$order!==void 0?_b$order:0);}),[page]);return/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* Page */.YW,{children:/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* PageContent */.TK,{className:container,children:blocks.map((block,index)=>{var _block$type;const type=(_block$type=block===null||block===void 0?void 0:block.type)!==null&&_block$type!==void 0?_block$type:"";if(type==="RichText"){var _block$data$content,_block$data;const html=sanitizeHtml((_block$data$content=block===null||block===void 0?void 0:(_block$data=block.data)===null||_block$data===void 0?void 0:_block$data.content)!==null&&_block$data$content!==void 0?_block$data$content:"");return/*#__PURE__*/(0,jsx_runtime.jsx)("div",{dangerouslySetInnerHTML:{__html:html}},"rt-"+index);}if(type==="Faq"){var _block$data2;const items=Array.isArray(block===null||block===void 0?void 0:(_block$data2=block.data)===null||_block$data2===void 0?void 0:_block$data2.faqs)?block.data.faqs:[];const sections=items.filter(it=>{var _ref2,_it$question;return((_ref2=(_it$question=it===null||it===void 0?void 0:it.question)!==null&&_it$question!==void 0?_it$question:it===null||it===void 0?void 0:it.answer)!==null&&_ref2!==void 0?_ref2:"").length>0;}).map(it=>{var _it$question2,_it$answer;return{label:(_it$question2=it===null||it===void 0?void 0:it.question)!==null&&_it$question2!==void 0?_it$question2:"",body:(_it$answer=it===null||it===void 0?void 0:it.answer)!==null&&_it$answer!==void 0?_it$answer:""};});return/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* AccordionProvider */.If,{sections:sections},"faq-"+index);}return null;})})});};

/***/ }),

/***/ 88120:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _templates_pages_PageTemplate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36050);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74848);


const DynamicPage = props => {
  const slug = props.params.slug;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_templates_pages_PageTemplate__WEBPACK_IMPORTED_MODULE_0__/* .PageTemplate */ .U, {
    slug: slug
  });
};
/* harmony default export */ __webpack_exports__["default"] = (DynamicPage);

/***/ }),

/***/ 93015:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Xh: function() { return /* binding */ getPagesList; },
/* harmony export */   eh: function() { return /* binding */ getPageBySlug; }
/* harmony export */ });
/* unused harmony export getPageHtmlFromContents */
/* harmony import */ var core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26910);
/* harmony import */ var core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _menuUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72659);
const getPagesList=data=>{if(!data)return[];return Array.isArray(data===null||data===void 0?void 0:data.results)?data.results:Array.isArray(data)?data:[];};const getPageBySlug=function(items,slug,userIsAuthenticated,userGroups){if(userIsAuthenticated===void 0){userIsAuthenticated=false;}if(userGroups===void 0){userGroups=[];}if(!Array.isArray(items)||items.length===0)return null;const isVisible=p=>{const hideBefore=Boolean(p===null||p===void 0?void 0:p.hideBeforeLogin);const hideAfter=Boolean(p===null||p===void 0?void 0:p.hideAfterLogin);if(!userIsAuthenticated&&hideBefore)return false;if(userIsAuthenticated&&hideAfter)return false;return (0,_menuUtils__WEBPACK_IMPORTED_MODULE_1__/* .isEntityVisibleForUser */ .EB)(p,userIsAuthenticated,userGroups);};const normalizedSlug=String(slug!==null&&slug!==void 0?slug:"").trim();const candidate=items.find(p=>{var _p$slug;return((_p$slug=p===null||p===void 0?void 0:p.slug)!==null&&_p$slug!==void 0?_p$slug:"")===normalizedSlug;});if(!candidate)return null;return isVisible(candidate)?candidate:null;};const getPageHtmlFromContents=page=>{if(!page)return"";const blocks=Array.isArray(page===null||page===void 0?void 0:page.contents)?page.contents:[];const richTexts=blocks.filter(b=>{var _b$type;return((_b$type=b===null||b===void 0?void 0:b.type)!==null&&_b$type!==void 0?_b$type:"")==="RichText";}).sort((a,b)=>{var _a$order,_b$order;return Number((_a$order=a===null||a===void 0?void 0:a.order)!==null&&_a$order!==void 0?_a$order:0)-Number((_b$order=b===null||b===void 0?void 0:b.order)!==null&&_b$order!==void 0?_b$order:0);}).map(b=>{var _b$data$content,_b$data;return(_b$data$content=b===null||b===void 0?void 0:(_b$data=b.data)===null||_b$data===void 0?void 0:_b$data.content)!==null&&_b$data$content!==void 0?_b$data$content:"";});return richTexts.join("\n");};

/***/ })

}]);
//# sourceMappingURL=component---src-pages-page-[slug]-tsx-8e91e833007eff7c8c6b.js.map