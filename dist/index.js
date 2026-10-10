"use strict";var e=function(i,r){return function(){try{return r||i((r={exports:{}}).exports,r),r.exports}catch(s){throw (r=0, s)}};};var v=e(function(q,t){
var o=require('@stdlib/math-base-assert-is-nan/dist');function c(i,r){var s,u,n;return o(i)||i<=0||o(r)||r<=4?NaN:(s=i+r-1,u=r-1,n=i*s*(5*r-11)+u*u*(u-1),n*=6,n/=i*s*(r-3)*(r-4),n)}t.exports=c
});var m=v();module.exports=m;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
