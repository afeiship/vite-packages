!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("antd"),require("classnames"),require("noop"),require("object-assign"),require("prop-types"),require("react")):"function"==typeof define&&define.amd?define(["antd","classnames","noop","object-assign","prop-types","react"],t):"object"==typeof exports?exports.ReactAntForm=t(require("antd"),require("classnames"),require("noop"),require("object-assign"),require("prop-types"),require("react")):e.ReactAntForm=t(e.antd,e.classnames,e.noop,e["object-assign"],e["prop-types"],e.react)}(this,function(e,t,r,o,n,a){return function(e){function t(o){if(r[o])return r[o].exports;var n=r[o]={exports:{},id:o,loaded:!1};return e[o].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var r={};return t.m=e,t.c=r,t.p="/",t(0)}([function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(1),a=o(n);t.default=a.default},function(e,t,r){(function(e){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,s,l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},c=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),f=r(2),p=r(6),m=o(p),d=r(3),b=o(d),y=r(4),h=o(y),v=r(5),j=o(v);t.default=f.Form.create()((s=i=function(t){function r(){var e,t,o,u;n(this,r);for(var i=arguments.length,s=Array(i),l=0;l<i;l++)s[l]=arguments[l];return t=o=a(this,(e=r.__proto__||Object.getPrototypeOf(r)).call.apply(e,[this].concat(s))),o._onSubmit=function(e){e.preventDefault();var t=o.props,r=t.onSubmit,n=t.form;n.validateFields(function(e,t){e||r(t)})},u=t,a(o,u)}return u(r,t),c(r,[{key:"componentDidMount",value:function(){var e=this.props,t=e.onLoad,r=e.fieldsValue,o=e.form,n=(o.getFieldDecorator,o.setFields);(0,j.default)(this,{$form:o}),n(r),t({target:{sender:this,value:this.props}})}},{key:"render",value:function(){var t=this.props,r=t.className,o=t.items,n=t.formLayout,a=t.submitLabel,u=t.submitProps,i=this.props.form.getFieldDecorator;return e.createElement(f.Form,{onSubmit:this.onSubmit,className:(0,b.default)("react-ant-form",r)},o.length>0&&o.map(function(t,r){return e.createElement(f.Form.Item,l({className:"react-ant-form-field"},n,{key:r,label:t.label}),i(t.field,{rules:t.rules})(e.createElement(t.component,t.props)))}),e.createElement(f.Form.Item,l({},n,{className:"react-ant-form-submit",label:a,colon:!1}),e.createElement(f.Button,l({},u,{onClick:this._onSubmit}))))}}]),r}(e.Component),i.propTypes={className:m.default.string,fieldsValue:m.default.object,items:m.default.array,onSubmit:m.default.func,onLoad:m.default.func,formLayout:m.default.object,submitLabel:m.default.string,submitProps:m.default.object},i.defaultProps={fieldsValue:{},onSubmit:h.default,onLoad:h.default,formLayout:{labelCol:{span:6},wrapperCol:{span:16}},submitLabel:"&nbsp;",submitProps:{type:"primary",htmlType:"submit"}},s))}).call(t,r(7))},function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t){e.exports=r},function(e,t){e.exports=o},function(e,t){e.exports=n},function(e,t){e.exports=a}])});
//# sourceMappingURL=react-ant-form.js.map