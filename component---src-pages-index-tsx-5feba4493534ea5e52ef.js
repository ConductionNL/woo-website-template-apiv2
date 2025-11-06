(self["webpackChunkproduct_website_template"] = self["webpackChunkproduct_website_template"] || []).push([[245],{

/***/ 2404:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(60270);

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;


/***/ }),

/***/ 2523:
/***/ (function(module) {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ }),

/***/ 4509:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(12651);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),

/***/ 4664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayFilter = __webpack_require__(79770),
    stubArray = __webpack_require__(63345);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),

/***/ 5128:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseEach = __webpack_require__(80909),
    isArrayLike = __webpack_require__(64894);

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

module.exports = baseMap;


/***/ }),

/***/ 10776:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isStrictComparable = __webpack_require__(30756),
    keys = __webpack_require__(95950);

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;


/***/ }),

/***/ 10789:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ pages; }
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(96540);
;// ./src/templates/landing/LandingTemplate.module.css
// extracted by mini-css-extract-plugin
var container = "LandingTemplate-module--container--dc5ab";
var LandingTemplate_module_pagination = "LandingTemplate-module--pagination--fde55";
// EXTERNAL MODULE: ./node_modules/react-loading-skeleton/dist/index.js
var dist = __webpack_require__(70255);
// EXTERNAL MODULE: ./node_modules/@utrecht/component-library-react/dist/css-module/index.mjs
var css_module = __webpack_require__(57640);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.flat.js
var es_array_flat = __webpack_require__(46449);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__(26910);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.unscopables.flat.js
var es_array_unscopables_flat = __webpack_require__(93514);
// EXTERNAL MODULE: ./node_modules/lodash/uniqBy.js
var uniqBy = __webpack_require__(50014);
var uniqBy_default = /*#__PURE__*/__webpack_require__.n(uniqBy);
// EXTERNAL MODULE: ./node_modules/lodash/orderBy.js
var orderBy = __webpack_require__(42877);
var orderBy_default = /*#__PURE__*/__webpack_require__.n(orderBy);
// EXTERNAL MODULE: ./node_modules/lodash/upperFirst.js
var upperFirst = __webpack_require__(55808);
var upperFirst_default = /*#__PURE__*/__webpack_require__.n(upperFirst);
// EXTERNAL MODULE: ./node_modules/lodash/isEqual.js
var isEqual = __webpack_require__(2404);
var isEqual_default = /*#__PURE__*/__webpack_require__.n(isEqual);
// EXTERNAL MODULE: ./node_modules/lodash/isEmpty.js
var isEmpty = __webpack_require__(62193);
var isEmpty_default = /*#__PURE__*/__webpack_require__.n(isEmpty);
;// ./src/templates/templateParts/filters/FiltersTemplate.module.css
// extracted by mini-css-extract-plugin
var FiltersTemplate_module_button = "FiltersTemplate-module--button--c8824";
var FiltersTemplate_module_container = "FiltersTemplate-module--container--53abd";
var FiltersTemplate_module_form = "FiltersTemplate-module--form--ee9e5";
var spinner = "FiltersTemplate-module--spinner--22490";
;// ./src/components/resultsDisplaySwitch/ResultsDisplaySwitch.module.css
// extracted by mini-css-extract-plugin
var ResultsDisplaySwitch_module_button = "ResultsDisplaySwitch-module--button--75fc8";
var ResultsDisplaySwitch_module_container = "ResultsDisplaySwitch-module--container--99044";
// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__(34164);
// EXTERNAL MODULE: ./node_modules/@fortawesome/react-fontawesome/index.es.js
var index_es = __webpack_require__(46784);
// EXTERNAL MODULE: ./node_modules/@fortawesome/free-solid-svg-icons/index.mjs
var free_solid_svg_icons = __webpack_require__(66188);
// EXTERNAL MODULE: ./src/context/displays.ts
var context_displays = __webpack_require__(93279);
// EXTERNAL MODULE: ./node_modules/react-i18next/dist/es/index.js + 15 modules
var es = __webpack_require__(32389);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(74848);
;// ./src/components/resultsDisplaySwitch/ResultsDisplaySwitch.tsx
const ResultsDisplaySwitch=_ref=>{let{layoutClassName,displayKey}=_ref;const{setDisplay,isActive}=(0,context_displays/* useDisplayContext */.d)();const{t}=(0,es/* useTranslation */.Bd)();return/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* ButtonGroup */.e2,{role:"region","aria-label":t("View"),className:(0,clsx/* default */.A)(ResultsDisplaySwitch_module_container,layoutClassName&&layoutClassName),children:[/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* Button */.$n,{appearance:isActive(displayKey,"cards")?"primary-action-button":"secondary-action-button",className:ResultsDisplaySwitch_module_button,onClick:()=>setDisplay({[displayKey]:"cards"}),"aria-label":t("Cards view"),children:[/*#__PURE__*/(0,jsx_runtime.jsx)(index_es/* FontAwesomeIcon */.g,{icon:free_solid_svg_icons/* faGripVertical */.S9g})," ",t("Cards")]}),/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* Button */.$n,{appearance:isActive(displayKey,"table")?"primary-action-button":"secondary-action-button",className:ResultsDisplaySwitch_module_button,onClick:()=>setDisplay({[displayKey]:"table"}),"aria-label":t("Table view"),children:[/*#__PURE__*/(0,jsx_runtime.jsx)(index_es/* FontAwesomeIcon */.g,{icon:free_solid_svg_icons/* faTable */.w97})," ",t("Table")]})]});};/* harmony default export */ var resultsDisplaySwitch_ResultsDisplaySwitch = (ResultsDisplaySwitch);
// EXTERNAL MODULE: ./node_modules/qs/lib/index.js
var lib = __webpack_require__(55373);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);
// EXTERNAL MODULE: ./node_modules/react-hook-form/dist/index.esm.mjs
var index_esm = __webpack_require__(49785);
// EXTERNAL MODULE: ./node_modules/@conduction/components/lib/index.js + 100 modules
var components_lib = __webpack_require__(9429);
// EXTERNAL MODULE: ./src/context/filters.ts
var context_filters = __webpack_require__(22617);
// EXTERNAL MODULE: ./src/services/filtersToQueryParams.ts + 1 modules
var filtersToQueryParams = __webpack_require__(25343);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 4 modules
var gatsby_browser_entry = __webpack_require__(64810);
// EXTERNAL MODULE: ./src/context/gatsby.ts
var gatsby = __webpack_require__(38760);
// EXTERNAL MODULE: ./node_modules/react-query/es/index.js
var react_query_es = __webpack_require__(75942);
// EXTERNAL MODULE: ./src/apiService/apiContext.ts
var apiContext = __webpack_require__(57453);
;// ./src/hooks/availableFilters.ts
const useAvailableFilters=()=>{const API=react.useContext(apiContext/* default */.A);const getCategories=()=>(0,react_query_es.useQuery)(["available_catagories"],()=>API===null||API===void 0?void 0:API.AvailableFilters.getCategories(),{onError:error=>{console.warn(error.message);}});return{getCategories};};
// EXTERNAL MODULE: ./src/context/pagination.ts
var context_pagination = __webpack_require__(33516);
// EXTERNAL MODULE: ./src/context/categoryOptions.ts
var context_categoryOptions = __webpack_require__(51372);
;// ./src/templates/templateParts/filters/FiltersTemplate.tsx
const FiltersTemplate=_ref=>{let{isLoading}=_ref;const{t}=(0,es/* useTranslation */.Bd)();const{setPagination}=(0,context_pagination/* usePaginationContext */.b)();const{gatsbyContext}=(0,gatsby/* useGatsbyContext */.J)();const{filters,setFilters}=(0,context_filters/* useFiltersContext */.Y)();const{categoryOptions,setCategoryOptions}=(0,context_categoryOptions/* useCategoriesContext */.h)();const[yearOptions,setYearOptions]=react.useState([]);const[queryParams,setQueryParams]=react.useState(context_filters/* defaultFiltersContext */.c);const[categoryParams,setCategoryParams]=react.useState();const filterTimeout=react.useRef(null);const{control,register,handleSubmit,watch,setValue,formState:{errors}}=(0,index_esm/* useForm */.mN)();const watcher=watch();const url=gatsbyContext.location.search;const[,params]=url.split("?");const parsedParams=lib_default().parse(params);const getCategories=useAvailableFilters().getCategories();const handleSetFormValues=params=>{const basicFields=["_search","category"];basicFields.forEach(field=>setValue(field,params[field]));setValue("year",yearOptions.find(year=>{return year.value===params.year;}));};const handleSetSelectFormValues=params=>{getCategories.isSuccess&&setValue("category",categoryOptions.options.find(option=>{var _params$categorie;return option.value===((_params$categorie=params.categorie)===null||_params$categorie===void 0?void 0:_params$categorie.replace(/_/g," "));}));};const onSubmit=data=>{var _data$year,_data$year2,_data$category;setFilters({_search:data._search,"@self[published][gte]":(_data$year=data.year)===null||_data$year===void 0?void 0:_data$year.after,"@self[published][lte]":(_data$year2=data.year)===null||_data$year2===void 0?void 0:_data$year2.before,"@self[schema]":(_data$category=data.category)===null||_data$category===void 0?void 0:_data$category.value});};react.useEffect(()=>{if(filterTimeout.current)clearTimeout(filterTimeout.current);filterTimeout.current=setTimeout(()=>onSubmit(watcher),500);},[watcher]);react.useEffect(()=>{if(isEmpty_default()(parsedParams))return;setCategoryParams(parsedParams);handleSetFormValues(parsedParams);},[]);react.useEffect(()=>{if(isEmpty_default()(categoryOptions))return;if(isEmpty_default()(categoryParams))return;handleSetSelectFormValues(categoryParams);},[categoryOptions]);react.useEffect(()=>{var _categoryOptions$opti;//Prevents loop that puts user at top of page after scroll
if(isEqual_default()(filters,queryParams))return;setQueryParams(filters);const categoryLabel=(_categoryOptions$opti=categoryOptions.options.find(option=>option.value===filters["@self[schema]"]))===null||_categoryOptions$opti===void 0?void 0:_categoryOptions$opti.label.replace(/\s+/g,"_");(0,gatsby_browser_entry/* navigate */.oo)("/"+(0,filtersToQueryParams/* filtersToUrlQueryParams */.U)(Object.assign({},filters,{"@self[schema]":categoryLabel})));setPagination({currentPage:1});},[filters]);react.useEffect(()=>{var _ref2,_ref3,_response$availableFa,_response$facets$face,_response$facets,_facets$Self,_facets$Self$schema,_Object$values,_response$facets$face2,_response$facets2,_response$facets2$fac,_response$facets2$fac2,_response$facets2$fac3,_response$facets3,_response$facets3$Se,_response$facets3$Se$;if(!getCategories.isSuccess||!getCategories.data||!getCategories.data.facets)return;// Enrich facets with titles when available (compatible with different API payloads)
const response=getCategories.data;const facetsConfig=(_ref2=(_ref3=(_response$availableFa=response===null||response===void 0?void 0:response.availableFacets)!==null&&_response$availableFa!==void 0?_response$availableFa:response===null||response===void 0?void 0:response.facetsConfig)!==null&&_ref3!==void 0?_ref3:response===null||response===void 0?void 0:response.facets_config)!==null&&_ref2!==void 0?_ref2:response===null||response===void 0?void 0:response.facetable;const rawFacets=(_response$facets$face=response===null||response===void 0?void 0:(_response$facets=response.facets)===null||_response$facets===void 0?void 0:_response$facets.facets)!==null&&_response$facets$face!==void 0?_response$facets$face:response===null||response===void 0?void 0:response.facets;let facets=rawFacets;if(facets){const facetsWithTitles={};Object.entries(facets).forEach(_ref4=>{let[key,value]=_ref4;if(key==="@self"&&value&&typeof value==="object"){facetsWithTitles[key]={};Object.entries(value).forEach(_ref5=>{var _facetsConfig$object_,_facetsConfig$object_2;let[subKey,subValue]=_ref5;facetsWithTitles[key][subKey]=Object.assign({},subValue,{title:(facetsConfig===null||facetsConfig===void 0?void 0:(_facetsConfig$object_=facetsConfig.object_fields)===null||_facetsConfig$object_===void 0?void 0:(_facetsConfig$object_2=_facetsConfig$object_[subKey])===null||_facetsConfig$object_2===void 0?void 0:_facetsConfig$object_2.title)||subKey});});}else{var _facetsConfig$object_3,_facetsConfig$object_4;facetsWithTitles[key]=Object.assign({},value,{title:(facetsConfig===null||facetsConfig===void 0?void 0:(_facetsConfig$object_3=facetsConfig.object_fields)===null||_facetsConfig$object_3===void 0?void 0:(_facetsConfig$object_4=_facetsConfig$object_3[key])===null||_facetsConfig$object_4===void 0?void 0:_facetsConfig$object_4.title)||key});}});facets=facetsWithTitles;}else{console.warn("No facets in response");}if((_facets$Self=facets["@self"])!==null&&_facets$Self!==void 0&&(_facets$Self$schema=_facets$Self.schema)!==null&&_facets$Self$schema!==void 0&&_facets$Self$schema.buckets){facets={categorie:facets["@self"].schema.buckets};}const categoriesWithData=(_Object$values=Object.values(facets))===null||_Object$values===void 0?void 0:_Object$values.map(facet=>facet===null||facet===void 0?void 0:facet.map(category=>(_category$label=>{const id=category.key;const name=(_category$label=category.label)!==null&&_category$label!==void 0?_category$label:id;if(!name)return null;return{label:upperFirst_default()(String(name).toLowerCase()),value:String(id)};})()).filter(Boolean)).flat();const uniqueOptions=orderBy_default()(uniqBy_default()(categoriesWithData,"value"),"label","asc");if(isEqual_default()(uniqueOptions,categoryOptions.options))return;setCategoryOptions({options:uniqueOptions});const yearBuckets=(_response$facets$face2=response===null||response===void 0?void 0:(_response$facets2=response.facets)===null||_response$facets2===void 0?void 0:(_response$facets2$fac=_response$facets2.facets)===null||_response$facets2$fac===void 0?void 0:(_response$facets2$fac2=_response$facets2$fac["@self"])===null||_response$facets2$fac2===void 0?void 0:(_response$facets2$fac3=_response$facets2$fac2.published)===null||_response$facets2$fac3===void 0?void 0:_response$facets2$fac3.buckets)!==null&&_response$facets$face2!==void 0?_response$facets$face2:response===null||response===void 0?void 0:(_response$facets3=response.facets)===null||_response$facets3===void 0?void 0:(_response$facets3$Se=_response$facets3["@self"])===null||_response$facets3$Se===void 0?void 0:(_response$facets3$Se$=_response$facets3$Se.published)===null||_response$facets3$Se$===void 0?void 0:_response$facets3$Se$.buckets;if(yearBuckets){const availableYears=yearBuckets.map(b=>Number(b.key)).filter(Boolean);const dynamicYears=availableYears.map(year=>({label:""+year,value:""+year,before:year+1+"-01-01T00:00:00Z",after:year-1+"-12-31T23:59:59Z"})).sort((a,b)=>Number(b.value)-Number(a.value));if(!isEqual_default()(dynamicYears,yearOptions)){setYearOptions(dynamicYears);if(categoryParams!==null&&categoryParams!==void 0&&categoryParams.year){setValue("year",dynamicYears.find(y=>y.value===categoryParams.year));}}}},[getCategories.isSuccess,getCategories.data]);return/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{id:"filters",className:FiltersTemplate_module_container,children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("form",{role:"region","aria-label":t("Filters"),onSubmit:handleSubmit(onSubmit),className:FiltersTemplate_module_form,children:[/*#__PURE__*/(0,jsx_runtime.jsx)(components_lib/* InputText */.Sm,{name:"_search",placeholder:t("Search")+"..",defaultValue:filters._search,ariaLabel:t("Search"),register,errors}),/*#__PURE__*/(0,jsx_runtime.jsx)(components_lib/* SelectSingle */.L9,{options:yearOptions,name:"year",placeholder:t("Year"),isClearable:true,defaultValue:yearOptions.find(year=>{return year.after===filters["@self[published][gte]"]&&year.before===filters["@self[published][lte]"];}),register,errors,control,ariaLabel:t("Select year")}),getCategories.isLoading&&/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* default */.A,{height:"50px"}),getCategories.isSuccess&&/*#__PURE__*/(0,jsx_runtime.jsx)(components_lib/* SelectSingle */.L9,{options:categoryOptions.options,name:"category",placeholder:t("Category"),defaultValue:categoryOptions.options&&categoryOptions.options.find(option=>option.value===filters["@self[schema]"]),isClearable:true,disabled:getCategories.isLoading,register,errors,control,ariaLabel:t("Select category")}),/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* Button */.$n,{type:"submit",className:FiltersTemplate_module_button,disabled:isLoading,"aria-label":!isLoading?t("Search"):t("Loading results"),children:[/*#__PURE__*/(0,jsx_runtime.jsx)(index_es/* FontAwesomeIcon */.g,{icon:!isLoading?free_solid_svg_icons/* faMagnifyingGlass */.$UM:free_solid_svg_icons/* faSpinner */.z1G})," ",!isLoading&&t("Search")]})]}),/*#__PURE__*/(0,jsx_runtime.jsx)(resultsDisplaySwitch_ResultsDisplaySwitch,{displayKey:"landing-results"})]});};
;// ./src/templates/templateParts/cardsResultsTemplate/CardsResultsTemplate.module.css
// extracted by mini-css-extract-plugin
var cardContainer = "CardsResultsTemplate-module--cardContainer--81f65";
var cardFooter = "CardsResultsTemplate-module--cardFooter--99775";
var cardHeader = "CardsResultsTemplate-module--cardHeader--8e300";
var componentsGrid = "CardsResultsTemplate-module--componentsGrid--cfabc";
var description = "CardsResultsTemplate-module--description--e3e0e";
var title = "CardsResultsTemplate-module--title--5df04";
// EXTERNAL MODULE: ./src/services/dateFormat.ts + 3 modules
var dateFormat = __webpack_require__(96870);
// EXTERNAL MODULE: ./src/layout/Layout.tsx + 98 modules
var Layout = __webpack_require__(88249);
// EXTERNAL MODULE: ./src/services/removeHTMLFromString.ts
var removeHTMLFromString = __webpack_require__(14791);
;// ./src/templates/templateParts/cardsResultsTemplate/CardsResultsTemplate.tsx
const CardsResultsTemplate=_ref=>{let{requests}=_ref;const{t,i18n}=(0,es/* useTranslation */.Bd)();return/*#__PURE__*/(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:componentsGrid,role:"status","aria-live":"polite","aria-atomic":"true","aria-label":t("Woo Request"),children:requests.map(request=>{var _ref2,_request$Self$publis,_ref3,_ref4,_ref5,_request$title,_ref6,_request$summary,_ref7,_request$catalog$orga,_request$catalog,_request$catalog$orga2,_request$organization,_removeHTMLFromString,_ref8,_ref9,_ref0,_request$title2,_ref1,_request$summary2,_request$catalog$orga3,_request$catalog2,_request$catalog2$org,_request$organization2;return/*#__PURE__*/(0,jsx_runtime.jsxs)(components_lib/* CardWrapper */.Ox,{role:"region",className:cardContainer,onClick:()=>(0,gatsby_browser_entry/* navigate */.oo)(request.id.toString()),tabIndex:0,"aria-label":(request["@self"].published?(0,dateFormat/* translateDate */.L)(i18n.language,(_ref2=(_request$Self$publis=request["@self"].published)!==null&&_request$Self$publis!==void 0?_request$Self$publis:request.publicatiedatum)!==null&&_ref2!==void 0?_ref2:request.created):t("N/A"))+", "+(0,removeHTMLFromString/* removeHTMLFromString */.n)((0,removeHTMLFromString/* removeHTMLFromString */.n)((_ref3=(_ref4=(_ref5=(_request$title=request.title)!==null&&_request$title!==void 0?_request$title:request.titel)!==null&&_ref5!==void 0?_ref5:request.name)!==null&&_ref4!==void 0?_ref4:request.naam)!==null&&_ref3!==void 0?_ref3:request.id))+", "+(0,removeHTMLFromString/* removeHTMLFromString */.n)((0,removeHTMLFromString/* removeHTMLFromString */.n)((_ref6=(_request$summary=request.summary)!==null&&_request$summary!==void 0?_request$summary:request.samenvatting)!==null&&_ref6!==void 0?_ref6:t("No summary available")))+" "+(window.sessionStorage.getItem("SHOW_ORGANIZATION")==="true"?","+((_ref7=(_request$catalog$orga=(_request$catalog=request.catalog)===null||_request$catalog===void 0?void 0:(_request$catalog$orga2=_request$catalog.organization)===null||_request$catalog$orga2===void 0?void 0:_request$catalog$orga2.title)!==null&&_request$catalog$orga!==void 0?_request$catalog$orga:(_request$organization=request.organization)===null||_request$organization===void 0?void 0:_request$organization.title)!==null&&_ref7!==void 0?_ref7:t("No municipality available")):"")+" "+(window.sessionStorage.getItem("SHOW_CATEGORY")==="true"?", "+t("Category")+", "+(request["@self"].schema.title||t("No category available")):""),children:[/*#__PURE__*/(0,jsx_runtime.jsxs)(components_lib/* CardHeader */.aR,{className:cardHeader,children:[/*#__PURE__*/(0,jsx_runtime.jsx)(components_lib/* CardHeaderTitle */.es,{className:title,children:/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* Heading2 */.fV,{children:(_removeHTMLFromString=(0,removeHTMLFromString/* removeHTMLFromString */.n)((0,removeHTMLFromString/* removeHTMLFromString */.n)((_ref8=(_ref9=(_ref0=(_request$title2=request.title)!==null&&_request$title2!==void 0?_request$title2:request.titel)!==null&&_ref0!==void 0?_ref0:request.name)!==null&&_ref9!==void 0?_ref9:request.naam)!==null&&_ref8!==void 0?_ref8:request.id)))!==null&&_removeHTMLFromString!==void 0?_removeHTMLFromString:t("No title available")})}),/*#__PURE__*/(0,jsx_runtime.jsx)(components_lib/* CardHeaderDate */.SV,{children:request.publicatiedatum||request["@self"].published?(0,dateFormat/* translateDate */.L)(i18n.language,request.publicatiedatum||request["@self"].published):t("N/A")})]}),/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* Paragraph */.fz,{className:description,children:(0,removeHTMLFromString/* removeHTMLFromString */.n)((0,removeHTMLFromString/* removeHTMLFromString */.n)((_ref1=(_request$summary2=request.summary)!==null&&_request$summary2!==void 0?_request$summary2:request.samenvatting)!==null&&_ref1!==void 0?_ref1:""))}),(window.sessionStorage.getItem("SHOW_CATEGORY")==="true"||window.sessionStorage.getItem("SHOW_ORGANIZATION")==="true")&&/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:cardFooter,children:[window.sessionStorage.getItem("SHOW_ORGANIZATION")==="true"&&/*#__PURE__*/(0,jsx_runtime.jsx)(components_lib/* CardHeaderDate */.SV,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("span",{"data-tooltip-id":Layout.TOOLTIP_ID,"data-tooltip-content":t("Municipality"),children:(_request$catalog$orga3=(_request$catalog2=request.catalog)===null||_request$catalog2===void 0?void 0:(_request$catalog2$org=_request$catalog2.organization)===null||_request$catalog2$org===void 0?void 0:_request$catalog2$org.title)!==null&&_request$catalog$orga3!==void 0?_request$catalog$orga3:(_request$organization2=request.organization)===null||_request$organization2===void 0?void 0:_request$organization2.title})}),window.sessionStorage.getItem("SHOW_CATEGORY")==="true"&&/*#__PURE__*/(0,jsx_runtime.jsx)(components_lib/* CardHeaderDate */.SV,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("span",{"data-tooltip-id":Layout.TOOLTIP_ID,"data-tooltip-content":t("Category"),children:request["@self"].schema.title||t("No category available")})})]})]},request.id);})})});};
;// ./src/templates/templateParts/tableResultsTemplate/TableResultsTemplate.module.css
// extracted by mini-css-extract-plugin
var ComponentsGrid = "TableResultsTemplate-module--ComponentsGrid--71862";
var categoryAndMunicipality = "TableResultsTemplate-module--categoryAndMunicipality--d3d93";
var TableResultsTemplate_module_description = "TableResultsTemplate-module--description--7ac0a";
var table = "TableResultsTemplate-module--table--2ed82";
var tableBody = "TableResultsTemplate-module--tableBody--290ef";
var tableHeader = "TableResultsTemplate-module--tableHeader--a4f80";
var tableRow = "TableResultsTemplate-module--tableRow--b6c7e";
;// ./src/templates/templateParts/tableResultsTemplate/TableResultsTemplate.tsx
const TableResultsTemplate=_ref=>{let{requests}=_ref;const{t,i18n}=(0,es/* useTranslation */.Bd)();return/*#__PURE__*/(0,jsx_runtime.jsx)(components_lib/* HorizontalOverflowWrapper */.ax,{ariaLabels:{scrollLeftButton:t("Scroll table to the left"),scrollRightButton:t("Scroll table to the right")},children:/*#__PURE__*/(0,jsx_runtime.jsx)("div",{role:"status","aria-label":t("Woo Request"),children:/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* Table */.XI,{className:table,children:[/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableHeader */.A0,{className:tableHeader,children:/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* TableRow */.Hj,{children:[/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableHeaderCell */.M_,{children:t("Subject")}),/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableHeaderCell */.M_,{children:t("Publication date")}),(window.sessionStorage.getItem("SHOW_CATEGORY")==="true"||window.sessionStorage.getItem("SHOW_ORGANIZATION")==="true")&&/*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[window.sessionStorage.getItem("SHOW_ORGANIZATION")==="true"&&/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableHeaderCell */.M_,{children:t("Municipality")}),window.sessionStorage.getItem("SHOW_CATEGORY")==="true"&&/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableHeaderCell */.M_,{children:t("Category")})]}),/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableHeaderCell */.M_,{children:t("Summary")})]})}),/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableBody */.BF,{className:tableBody,children:requests.map(request=>{var _ref2,_ref3,_ref4,_request$title,_ref5,_request$Self$organi,_request$Self,_request$Self$organiz,_request$organization,_removeHTMLFromString,_ref6,_request$summary,_removeHTMLFromString2,_ref7,_ref8,_ref9,_request$title2,_ref0,_request$Self$organi2,_request$Self2,_request$Self2$organi,_request$organization2,_ref1,_request$summary2;return/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* TableRow */.Hj,{className:tableRow,onClick:()=>(0,gatsby_browser_entry/* navigate */.oo)(request.id.toString()),tabIndex:0,"aria-label":(0,removeHTMLFromString/* removeHTMLFromString */.n)((0,removeHTMLFromString/* removeHTMLFromString */.n)((_ref2=(_ref3=(_ref4=(_request$title=request.title)!==null&&_request$title!==void 0?_request$title:request.titel)!==null&&_ref4!==void 0?_ref4:request.name)!==null&&_ref3!==void 0?_ref3:request.naam)!==null&&_ref2!==void 0?_ref2:request.id))+",  "+(request.publicatiedatum||request["@self"].published?(0,dateFormat/* translateDate */.L)(i18n.language,request.publicatiedatum||request["@self"].published):t("N/A"))+" "+(window.sessionStorage.getItem("SHOW_ORGANIZATION")==="true"?","+((_ref5=(_request$Self$organi=(_request$Self=request["@self"])===null||_request$Self===void 0?void 0:(_request$Self$organiz=_request$Self.organization)===null||_request$Self$organiz===void 0?void 0:_request$Self$organiz.title)!==null&&_request$Self$organi!==void 0?_request$Self$organi:(_request$organization=request.organization)===null||_request$organization===void 0?void 0:_request$organization.title)!==null&&_ref5!==void 0?_ref5:t("No municipality available")):"")+" "+(window.sessionStorage.getItem("SHOW_CATEGORY")==="true"?", "+(request["@self"].schema.title||t("No category available")):"")+", "+((_removeHTMLFromString=(0,removeHTMLFromString/* removeHTMLFromString */.n)((0,removeHTMLFromString/* removeHTMLFromString */.n)((_ref6=(_request$summary=request.summary)!==null&&_request$summary!==void 0?_request$summary:request.samenvatting)!==null&&_ref6!==void 0?_ref6:"")))!==null&&_removeHTMLFromString!==void 0?_removeHTMLFromString:t("No summary available")),children:[/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableCell */.nA,{children:(_removeHTMLFromString2=(0,removeHTMLFromString/* removeHTMLFromString */.n)((0,removeHTMLFromString/* removeHTMLFromString */.n)((_ref7=(_ref8=(_ref9=(_request$title2=request.title)!==null&&_request$title2!==void 0?_request$title2:request.titel)!==null&&_ref9!==void 0?_ref9:request.name)!==null&&_ref8!==void 0?_ref8:request.naam)!==null&&_ref7!==void 0?_ref7:request.id)))!==null&&_removeHTMLFromString2!==void 0?_removeHTMLFromString2:t("No subject available")}),/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableCell */.nA,{children:request.publicatiedatum||request["@self"].published?(0,dateFormat/* translateDate */.L)(i18n.language,request.publicatiedatum||request["@self"].published):t("No publication date available")}),(window.sessionStorage.getItem("SHOW_CATEGORY")==="true"||window.sessionStorage.getItem("SHOW_ORGANIZATION")==="true")&&/*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[window.sessionStorage.getItem("SHOW_ORGANIZATION")==="true"&&/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableCell */.nA,{className:categoryAndMunicipality,children:(_ref0=(_request$Self$organi2=(_request$Self2=request["@self"])===null||_request$Self2===void 0?void 0:(_request$Self2$organi=_request$Self2.organization)===null||_request$Self2$organi===void 0?void 0:_request$Self2$organi.title)!==null&&_request$Self$organi2!==void 0?_request$Self$organi2:(_request$organization2=request.organization)===null||_request$organization2===void 0?void 0:_request$organization2.title)!==null&&_ref0!==void 0?_ref0:t("No municipality available")}),window.sessionStorage.getItem("SHOW_CATEGORY")==="true"&&/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableCell */.nA,{className:(0,clsx/* default */.A)(window.sessionStorage.getItem("SHOW_ORGANIZATION")!=="true"&&categoryAndMunicipality),children:request["@self"].schema.title||t("No category available")})]}),/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* TableCell */.nA,{children:/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:TableResultsTemplate_module_description,children:(0,removeHTMLFromString/* removeHTMLFromString */.n)((0,removeHTMLFromString/* removeHTMLFromString */.n)((_ref1=(_request$summary2=request.summary)!==null&&_request$summary2!==void 0?_request$summary2:request.samenvatting)!==null&&_ref1!==void 0?_ref1:""))})})]},request.id);})})]})})});};
;// ./src/templates/templateParts/resultsDisplayTemplate/ResultsDisplayTemplate.tsx
const ResultsDisplayTemplate=_ref=>{let{requests,displayKey}=_ref;const{displays,setDisplay}=(0,context_displays/* useDisplayContext */.d)();react.useEffect(()=>{if(displays[displayKey])return;// already registered
setDisplay({[displayKey]:"cards"});// register default to "cards"
},[]);return/*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[displays[displayKey]==="cards"&&/*#__PURE__*/(0,jsx_runtime.jsx)(CardsResultsTemplate,{requests}),displays[displayKey]==="table"&&/*#__PURE__*/(0,jsx_runtime.jsx)(TableResultsTemplate,{requests})]});};
;// ./src/templates/jumbotronTemplate/JumbotronTemplate.module.css
// extracted by mini-css-extract-plugin
var card = "JumbotronTemplate-module--card--cde1d";
var JumbotronTemplate_module_description = "JumbotronTemplate-module--description--19c41";
var JumbotronTemplate_module_title = "JumbotronTemplate-module--title--fb795";
var wrapper = "JumbotronTemplate-module--wrapper--2fbba";
;// ./src/templates/jumbotronTemplate/JumbotronTemplate.tsx
const JumbotronTemplate=()=>{const{t}=(0,es/* useTranslation */.Bd)();return/*#__PURE__*/(0,jsx_runtime.jsx)("div",{style:{backgroundImage:"url(\""+window.sessionStorage.getItem("JUMBOTRON_IMAGE_URL")+"\")"},className:wrapper,children:/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* Page */.YW,{children:/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* PageContent */.TK,{children:/*#__PURE__*/(0,jsx_runtime.jsxs)(components_lib/* CardWrapper */.Ox,{"aria-label":t("Jumbotron card"),role:"contentinfo",className:card,children:[/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* Heading1 */._,{className:JumbotronTemplate_module_title,children:[t("Woo-publications of")," ",window.sessionStorage.getItem("ORGANISATION_NAME")]}),/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* Paragraph */.fz,{className:JumbotronTemplate_module_description,children:[t("On this page you will find the Woo-publications of")," ",window.sessionStorage.getItem("ORGANISATION_NAME")]})]})})})});};
// EXTERNAL MODULE: ./src/hooks/openWoo.ts
var openWoo = __webpack_require__(79878);
// EXTERNAL MODULE: ./src/context/queryLimit.ts
var context_queryLimit = __webpack_require__(47987);
;// ./src/components/paginationLimitSelect/PaginationLimitSelect.module.css
// extracted by mini-css-extract-plugin
var PaginationLimitSelect_module_container = "PaginationLimitSelect-module--container--4b5a5";
;// ./src/components/paginationLimitSelect/PaginationLimitSelect.tsx
const PaginationLimitSelectComponent=_ref=>{let{queryLimitName,layoutClassName}=_ref;const{watch,register,control,setValue,formState:{errors}}=(0,index_esm/* useForm */.mN)();const{queryLimit,setQueryLimit}=(0,context_queryLimit/* useQueryLimitContext */.m7)();const{t}=(0,es/* useTranslation */.Bd)();const watchLimit=watch("limit");const value=queryLimit[queryLimitName];react.useEffect(()=>{if(!watchLimit)return;if(parseInt(watchLimit.value)===value)return;const selectedLimit=limitSelectOptions.find(limitOption=>limitOption.value===watchLimit.value);if(selectedLimit){setQueryLimit(Object.assign({},queryLimit,{[queryLimitName]:parseInt(selectedLimit.value)}));}},[watchLimit]);react.useEffect(()=>{setValue("limit",limitSelectOptions.find(limitOption=>limitOption.value===(value!==undefined&&value.toString())));},[]);return/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:(0,clsx/* default */.A)(PaginationLimitSelect_module_container,layoutClassName&&layoutClassName),children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("span",{children:[t("Results per page"),":"]}),/*#__PURE__*/(0,jsx_runtime.jsx)(components_lib/* SelectSingle */.L9,{ariaLabel:t("Results per page"),register,errors,control,defaultValue:context_queryLimit/* QUERY_LIMIT_DEFAULT */.LF,name:"limit",options:limitSelectOptions,menuPlacement:"auto",placeholder:t("Limit")})]});};const limitSelectOptions=[{label:"6",value:"6"},{label:"9",value:"9"},{label:"12",value:"12"},{label:"21",value:"21"},{label:"30",value:"30"},{label:"60",value:"60"},{label:"120",value:"120"}];
;// ./src/templates/landing/LandingTemplate.tsx
const LandingTemplate=()=>{var _getItems$data,_getItems$data$result,_getItems$data2,_getItems$data3,_getItems$data3$resul;const{t}=(0,es/* useTranslation */.Bd)();const{filters}=(0,context_filters/* useFiltersContext */.Y)();const{pagination,setPagination}=(0,context_pagination/* usePaginationContext */.b)();const{queryLimit,setQueryLimit}=(0,context_queryLimit/* useQueryLimitContext */.m7)();const queryClient=new react_query_es.QueryClient();const getItems=(0,openWoo/* useOpenWoo */.N)(queryClient).getAll(filters,pagination.currentPage,queryLimit.openWooObjectsQueryLimit);react.useEffect(()=>{if(queryLimit.openWooObjectsQueryLimit===queryLimit.previousOpenWooObjectsQueryLimit)return;setPagination({currentPage:1});setQueryLimit(Object.assign({},queryLimit,{previousOpenWooObjectsQueryLimit:queryLimit.openWooObjectsQueryLimit}));},[queryLimit.openWooObjectsQueryLimit]);return/*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[/*#__PURE__*/(0,jsx_runtime.jsx)(JumbotronTemplate,{}),/*#__PURE__*/(0,jsx_runtime.jsx)(css_module/* Page */.YW,{children:/*#__PURE__*/(0,jsx_runtime.jsxs)(css_module/* PageContent */.TK,{className:container,children:[/*#__PURE__*/(0,jsx_runtime.jsx)(FiltersTemplate,{isLoading:getItems.isLoading}),((_getItems$data=getItems.data)===null||_getItems$data===void 0?void 0:(_getItems$data$result=_getItems$data.results)===null||_getItems$data$result===void 0?void 0:_getItems$data$result.length)===0&&!getItems.isLoading&&/*#__PURE__*/(0,jsx_runtime.jsxs)("span",{children:[t("No results found"),"."]}),((_getItems$data2=getItems.data)===null||_getItems$data2===void 0?void 0:_getItems$data2.results)&&((_getItems$data3=getItems.data)===null||_getItems$data3===void 0?void 0:(_getItems$data3$resul=_getItems$data3.results)===null||_getItems$data3$resul===void 0?void 0:_getItems$data3$resul.length)>0&&/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{id:"mainContent",children:[/*#__PURE__*/(0,jsx_runtime.jsx)(ResultsDisplayTemplate,{displayKey:"landing-results",requests:getItems.data.results}),/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{role:"region","aria-label":t("Pagination"),className:LandingTemplate_module_pagination,children:[/*#__PURE__*/(0,jsx_runtime.jsx)(components_lib/* Pagination */.dK,{ariaLabels:{pagination:t("Pagination"),previousPage:t("Previous page"),nextPage:t("Next page"),page:t("Page")},totalPages:getItems.data.pages,currentPage:getItems.data.page,setCurrentPage:page=>setPagination({currentPage:page})}),/*#__PURE__*/(0,jsx_runtime.jsx)(PaginationLimitSelectComponent,{queryLimitName:"openWooObjectsQueryLimit"})]})]}),getItems.isLoading&&/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* default */.A,{height:"200px"})]})})]});};
;// ./src/pages/index.tsx


const IndexPage = () => {
  return /*#__PURE__*/(0,jsx_runtime.jsx)(LandingTemplate, {});
};
/* harmony default export */ var pages = (IndexPage);

/***/ }),

/***/ 12651:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isKeyable = __webpack_require__(74218);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),

/***/ 12749:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(81042);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),

/***/ 14248:
/***/ (function(module) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),

/***/ 14528:
/***/ (function(module) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),

/***/ 15325:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(96131);

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;


/***/ }),

/***/ 15389:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseMatches = __webpack_require__(93663),
    baseMatchesProperty = __webpack_require__(87978),
    identity = __webpack_require__(83488),
    isArray = __webpack_require__(56449),
    property = __webpack_require__(50583);

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;


/***/ }),

/***/ 17255:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGet = __webpack_require__(47422);

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;


/***/ }),

/***/ 17670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(12651);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),

/***/ 19219:
/***/ (function(module) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),

/***/ 20317:
/***/ (function(module) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),

/***/ 21549:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hashClear = __webpack_require__(22032),
    hashDelete = __webpack_require__(63862),
    hashGet = __webpack_require__(66721),
    hashHas = __webpack_require__(12749),
    hashSet = __webpack_require__(35749);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),

/***/ 21986:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(51873),
    Uint8Array = __webpack_require__(37828),
    eq = __webpack_require__(75288),
    equalArrays = __webpack_require__(25911),
    mapToArray = __webpack_require__(20317),
    setToArray = __webpack_require__(84247);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),

/***/ 22032:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(81042);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),

/***/ 24739:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(26025);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ 25911:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var SetCache = __webpack_require__(38859),
    arraySome = __webpack_require__(14248),
    cacheHas = __webpack_require__(19219);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),

/***/ 26025:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var eq = __webpack_require__(75288);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),

/***/ 28077:
/***/ (function(module) {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;


/***/ }),

/***/ 28586:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isArray = __webpack_require__(56449),
    isSymbol = __webpack_require__(44394);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),

/***/ 29905:
/***/ (function(module) {

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;


/***/ }),

/***/ 30361:
/***/ (function(module) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ 30641:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseFor = __webpack_require__(86649),
    keys = __webpack_require__(95950);

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;


/***/ }),

/***/ 30756:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(23805);

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;


/***/ }),

/***/ 31175:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(26025);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ 31380:
/***/ (function(module) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),

/***/ 31769:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isArray = __webpack_require__(56449),
    isKey = __webpack_require__(28586),
    stringToPath = __webpack_require__(61802),
    toString = __webpack_require__(13222);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),

/***/ 35749:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(81042);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),

/***/ 37217:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(80079),
    stackClear = __webpack_require__(51420),
    stackDelete = __webpack_require__(90938),
    stackGet = __webpack_require__(63605),
    stackHas = __webpack_require__(52198),
    stackSet = __webpack_require__(80945);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),

/***/ 37828:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(9325);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),

/***/ 38329:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isArrayLike = __webpack_require__(64894);

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;


/***/ }),

/***/ 38859:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var MapCache = __webpack_require__(53661),
    setCacheAdd = __webpack_require__(31380),
    setCacheHas = __webpack_require__(51459);

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),

/***/ 41799:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Stack = __webpack_require__(37217),
    baseIsEqual = __webpack_require__(60270);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;


/***/ }),

/***/ 42877:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseOrderBy = __webpack_require__(46155),
    isArray = __webpack_require__(56449);

/**
 * This method is like `_.sortBy` except that it allows specifying the sort
 * orders of the iteratees to sort by. If `orders` is unspecified, all values
 * are sorted in ascending order. Otherwise, specify an order of "desc" for
 * descending or "asc" for ascending sort order of corresponding values.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @param {string[]} [orders] The sort orders of `iteratees`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 36 }
 * ];
 *
 * // Sort by `user` in ascending order and by `age` in descending order.
 * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 */
function orderBy(collection, iteratees, orders, guard) {
  if (collection == null) {
    return [];
  }
  if (!isArray(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees];
  }
  orders = guard ? undefined : orders;
  if (!isArray(orders)) {
    orders = orders == null ? [] : [orders];
  }
  return baseOrderBy(collection, iteratees, orders);
}

module.exports = orderBy;


/***/ }),

/***/ 43714:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var compareAscending = __webpack_require__(53730);

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

module.exports = compareMultiple;


/***/ }),

/***/ 44517:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Set = __webpack_require__(76545),
    noop = __webpack_require__(63950),
    setToArray = __webpack_require__(84247);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

module.exports = createSet;


/***/ }),

/***/ 46155:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayMap = __webpack_require__(34932),
    baseGet = __webpack_require__(47422),
    baseIteratee = __webpack_require__(15389),
    baseMap = __webpack_require__(5128),
    baseSortBy = __webpack_require__(73937),
    baseUnary = __webpack_require__(27301),
    compareMultiple = __webpack_require__(43714),
    identity = __webpack_require__(83488),
    isArray = __webpack_require__(56449);

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = arrayMap(iteratees, function(iteratee) {
      if (isArray(iteratee)) {
        return function(value) {
          return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
        }
      }
      return iteratee;
    });
  } else {
    iteratees = [identity];
  }

  var index = -1;
  iteratees = arrayMap(iteratees, baseUnary(baseIteratee));

  var result = baseMap(collection, function(value, key, collection) {
    var criteria = arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}

module.exports = baseOrderBy;


/***/ }),

/***/ 46449:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(46518);
var flattenIntoArray = __webpack_require__(70259);
var toObject = __webpack_require__(48981);
var lengthOfArrayLike = __webpack_require__(26198);
var toIntegerOrInfinity = __webpack_require__(91291);
var arraySpeciesCreate = __webpack_require__(1469);

// `Array.prototype.flat` method
// https://tc39.es/ecma262/#sec-array.prototype.flat
$({ target: 'Array', proto: true }, {
  flat: function flat(/* depthArg = 1 */) {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = lengthOfArrayLike(O);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toIntegerOrInfinity(depthArg));
    return A;
  }
});


/***/ }),

/***/ 47237:
/***/ (function(module) {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;


/***/ }),

/***/ 47422:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var castPath = __webpack_require__(31769),
    toKey = __webpack_require__(77797);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),

/***/ 48655:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(26025);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ 49326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var castPath = __webpack_require__(31769),
    isArguments = __webpack_require__(72428),
    isArray = __webpack_require__(56449),
    isIndex = __webpack_require__(30361),
    isLength = __webpack_require__(30294),
    toKey = __webpack_require__(77797);

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ }),

/***/ 50002:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(82199),
    getSymbols = __webpack_require__(4664),
    keys = __webpack_require__(95950);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),

/***/ 50014:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIteratee = __webpack_require__(15389),
    baseUniq = __webpack_require__(55765);

/**
 * This method is like `_.uniq` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * uniqueness is computed. The order of result values is determined by the
 * order they occur in the array. The iteratee is invoked with one argument:
 * (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
 * // => [2.1, 1.2]
 *
 * // The `_.property` iteratee shorthand.
 * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */
function uniqBy(array, iteratee) {
  return (array && array.length) ? baseUniq(array, baseIteratee(iteratee, 2)) : [];
}

module.exports = uniqBy;


/***/ }),

/***/ 50104:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var MapCache = __webpack_require__(53661);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),

/***/ 50583:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseProperty = __webpack_require__(47237),
    basePropertyDeep = __webpack_require__(17255),
    isKey = __webpack_require__(28586),
    toKey = __webpack_require__(77797);

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;


/***/ }),

/***/ 50689:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getAllKeys = __webpack_require__(50002);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),

/***/ 51420:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(80079);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),

/***/ 51459:
/***/ (function(module) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),

/***/ 52198:
/***/ (function(module) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),

/***/ 53661:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(63040),
    mapCacheDelete = __webpack_require__(17670),
    mapCacheGet = __webpack_require__(90289),
    mapCacheHas = __webpack_require__(4509),
    mapCacheSet = __webpack_require__(72949);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),

/***/ 53730:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isSymbol = __webpack_require__(44394);

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

module.exports = compareAscending;


/***/ }),

/***/ 55765:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var SetCache = __webpack_require__(38859),
    arrayIncludes = __webpack_require__(15325),
    arrayIncludesWith = __webpack_require__(29905),
    cacheHas = __webpack_require__(19219),
    createSet = __webpack_require__(44517),
    setToArray = __webpack_require__(84247);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;


/***/ }),

/***/ 58156:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGet = __webpack_require__(47422);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),

/***/ 60270:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(87068),
    isObjectLike = __webpack_require__(40346);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),

/***/ 61802:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(62224);

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),

/***/ 62224:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var memoize = __webpack_require__(50104);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),

/***/ 63040:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Hash = __webpack_require__(21549),
    ListCache = __webpack_require__(80079),
    Map = __webpack_require__(68223);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),

/***/ 63345:
/***/ (function(module) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),

/***/ 63605:
/***/ (function(module) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),

/***/ 63702:
/***/ (function(module) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ 63862:
/***/ (function(module) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),

/***/ 63950:
/***/ (function(module) {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),

/***/ 66721:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(81042);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),

/***/ 67197:
/***/ (function(module) {

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;


/***/ }),

/***/ 70080:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(26025);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ 70695:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseTimes = __webpack_require__(78096),
    isArguments = __webpack_require__(72428),
    isArray = __webpack_require__(56449),
    isBuffer = __webpack_require__(3656),
    isIndex = __webpack_require__(30361),
    isTypedArray = __webpack_require__(37167);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ 72949:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(12651);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),

/***/ 73937:
/***/ (function(module) {

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

module.exports = baseSortBy;


/***/ }),

/***/ 74218:
/***/ (function(module) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),

/***/ 75288:
/***/ (function(module) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ 76959:
/***/ (function(module) {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;


/***/ }),

/***/ 77797:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isSymbol = __webpack_require__(44394);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),

/***/ 78096:
/***/ (function(module) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ 79770:
/***/ (function(module) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),

/***/ 80079:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var listCacheClear = __webpack_require__(63702),
    listCacheDelete = __webpack_require__(70080),
    listCacheGet = __webpack_require__(24739),
    listCacheHas = __webpack_require__(48655),
    listCacheSet = __webpack_require__(31175);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ 80631:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseHasIn = __webpack_require__(28077),
    hasPath = __webpack_require__(49326);

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;


/***/ }),

/***/ 80909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseForOwn = __webpack_require__(30641),
    createBaseEach = __webpack_require__(38329);

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;


/***/ }),

/***/ 80945:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(80079),
    Map = __webpack_require__(68223),
    MapCache = __webpack_require__(53661);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),

/***/ 81042:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(56110);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ 82199:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayPush = __webpack_require__(14528),
    isArray = __webpack_require__(56449);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),

/***/ 83221:
/***/ (function(module) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),

/***/ 83488:
/***/ (function(module) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ 84247:
/***/ (function(module) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),

/***/ 85463:
/***/ (function(module) {

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;


/***/ }),

/***/ 86649:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var createBaseFor = __webpack_require__(83221);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),

/***/ 87068:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Stack = __webpack_require__(37217),
    equalArrays = __webpack_require__(25911),
    equalByTag = __webpack_require__(21986),
    equalObjects = __webpack_require__(50689),
    getTag = __webpack_require__(5861),
    isArray = __webpack_require__(56449),
    isBuffer = __webpack_require__(3656),
    isTypedArray = __webpack_require__(37167);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),

/***/ 87978:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(60270),
    get = __webpack_require__(58156),
    hasIn = __webpack_require__(80631),
    isKey = __webpack_require__(28586),
    isStrictComparable = __webpack_require__(30756),
    matchesStrictComparable = __webpack_require__(67197),
    toKey = __webpack_require__(77797);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;


/***/ }),

/***/ 90289:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(12651);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),

/***/ 90938:
/***/ (function(module) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),

/***/ 93514:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(6469);

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('flat');


/***/ }),

/***/ 93663:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsMatch = __webpack_require__(41799),
    getMatchData = __webpack_require__(10776),
    matchesStrictComparable = __webpack_require__(67197);

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;


/***/ }),

/***/ 95950:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(70695),
    baseKeys = __webpack_require__(88984),
    isArrayLike = __webpack_require__(64894);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),

/***/ 96131:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseFindIndex = __webpack_require__(2523),
    baseIsNaN = __webpack_require__(85463),
    strictIndexOf = __webpack_require__(76959);

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;


/***/ })

}]);
//# sourceMappingURL=component---src-pages-index-tsx-5feba4493534ea5e52ef.js.map