!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ReactAntFormSchema=t():e.ReactAntFormSchema=t()}(window,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=9)}([function(e,t){e.exports=require("prop-types")},function(e,t){e.exports=require("react")},function(e,t){e.exports=require("antd")},function(e,t){e.exports=require("@feizheng/noop")},function(e,t){e.exports=require("classnames")},function(e,t){e.exports=require("@feizheng/react-list")},function(e,t){e.exports=require("deep-equal")},function(e,t){e.exports=require("react-dom")},function(e,t){e.exports=require("object-assign")},function(e,t,r){"use strict";r.r(t);var n,o,a=r(1),i=r.n(a),u=(r(7),r(0)),c=r.n(u),l=r(4),f=r.n(l),s=r(5),p=r.n(s),m=r(3),b=r.n(m),y=(r(8),r(6)),d=r.n(y),h=r(2);function v(e){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function O(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?O(Object(r),!0).forEach((function(t){S(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function S(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function g(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function P(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function x(e,t){return(x=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function w(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=F(e);if(t){var o=F(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return _(this,r)}}function _(e,t){return!t||"object"!==v(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function F(e){return(F=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(){return(E=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var q="react-ant-form-schema",C={labelCol:{span:6},wrapperCol:{span:16}},R=h.Form.create()((o=n=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&x(e,t)}(a,e);var t,r,n,o=w(a);function a(){var e;g(this,a);for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return(e=o.call.apply(o,[this].concat(r))).handleSubmit=function(t){t.preventDefault();var r=e.props,n=r.onSubmit,o=r.onSubmitSuccess,a=r.onSubmitFailed;r.form.validateFields((function(e,t){e||n(t).then(o).catch(a)}))},e.handleReset=function(){var t=e.props,r=t.initialValue;t.form.setFieldsValue(r)},e.template=function(t){var r=t.index,n=t.item,o=e.props,a=o.form,u=o.template,c=o.defaultComponent,l=a.getFieldDecorator,f=n.component,s=n.field,p=n.rules,m=n.decorator,b=n.props,y=f||c;return u({index:r,item:n},(function(){return l(s,j(j(j({},e.props.decorator()),m&&m()),{},{rules:p}))(i.a.createElement(y,b))}))},e}return t=a,(r=[{key:"componentDidMount",value:function(){var e=this.props,t=e.onLoad,r=e.initialValue,n=e.form;(0,n.setFieldsValue)(r),t({target:{form:n,value:r}})}},{key:"shouldComponentUpdate",value:function(e){var t=this.props.form.setFields,r=e.fieldsValue;return d()(r,this.props.fieldsValue)||t(r),!0}},{key:"render",value:function(){var e=this.props,t=e.className,r=e.items,n=e.tailLayout,o=e.submitProps,a=e.resetProps;return i.a.createElement(h.Form,{"data-component":q,className:f()(q,t),onSubmit:this.handleSubmit},i.a.createElement(p.a,{items:r,template:this.template}),i.a.createElement(h.Form.Item,E({},n,{className:"".concat(q,"__actions"),colon:!1}),i.a.createElement(h.Button,o),a&&i.a.createElement(h.Button,E({onClick:this.handleReset},a))))}}])&&P(t.prototype,r),n&&P(t,n),a}(a.Component),n.displayName=q,n.version="1.1.1",n.propTypes={className:c.a.string,initialValue:c.a.object,items:c.a.array,template:c.a.func,defaultComponent:c.a.any,onSubmit:c.a.func,onSubmitSuccess:c.a.func,onSubmitFailed:c.a.func,onLoad:c.a.func,formLayout:c.a.object,tailLayout:c.a.object,submitProps:c.a.object,resetProps:c.a.object,decorator:c.a.func},n.defaultProps={initialValue:{},items:[],template:function(e,t){var r=e.index,n=e.item;return i.a.createElement(h.Form.Item,E({className:"".concat(q,"__field")},C,{key:r,label:n.label,children:t()}))},defaultComponent:h.Input,onSubmit:b.a,onSubmitSuccess:b.a,onSubmitFailed:b.a,onLoad:b.a,formLayout:C,tailLayout:{wrapperCol:{offset:6,span:16}},submitProps:{type:"primary",htmlType:"submit",children:"Save"},resetProps:null,decorator:b.a},o));t.default=R}])}));
//# sourceMappingURL=index.js.map