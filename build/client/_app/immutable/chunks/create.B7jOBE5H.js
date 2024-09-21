import{d as y,w as D,r as b}from"./index.DAqNsYo8.js";import{q as O,a4 as S,a5 as p}from"./scheduler.Dw1Xknx6.js";function h(e){return Object.keys(e).reduce((n,t)=>e[t]===void 0?n:n+`${t}:${e[t]};`,"")}function V(e){return e?!0:void 0}h({position:"absolute",opacity:0,"pointer-events":"none",margin:0,transform:"translateX(-100%)"});function x(e){if(e!==null)return""}function A(e){function n(t){return t(e),()=>{}}return{subscribe:n}}const E=e=>new Proxy(e,{get(n,t,r){return Reflect.get(n,t,r)},ownKeys(n){return Reflect.ownKeys(n).filter(t=>t!=="action")}}),m=e=>typeof e=="function";v("empty");function v(e,n){const{stores:t,action:r,returned:a}=n??{},s=(()=>{if(t&&a)return y(t,o=>{const u=a(o);if(m(u)){const c=(...f)=>E({...u(...f),[`data-melt-${e}`]:"",action:r??l});return c.action=r??l,c}return E({...u,[`data-melt-${e}`]:"",action:r??l})});{const o=a,u=o==null?void 0:o();if(m(u)){const c=(...f)=>E({...u(...f),[`data-melt-${e}`]:"",action:r??l});return c.action=r??l,A(c)}return A(E({...u,[`data-melt-${e}`]:"",action:r??l}))}})(),i=r??(()=>{});return i.subscribe=s.subscribe,i}function G(e){const n=s=>s?`${e}-${s}`:e,t=s=>`data-melt-${e}${s?`-${s}`:""}`,r=s=>`[data-melt-${e}${s?`-${s}`:""}]`;return{name:n,attribute:t,selector:r,getEl:s=>document.querySelector(r(s))}}const j=typeof document<"u",R=e=>typeof e=="function";function q(e){return e instanceof Element}function F(e){return e instanceof HTMLElement}function B(e){const n=e.getAttribute("aria-disabled"),t=e.getAttribute("disabled"),r=e.hasAttribute("data-disabled");return!!(n==="true"||t!==null||r)}function T(e){return e!==null&&typeof e=="object"}function L(e){return T(e)&&"subscribe"in e}function P(...e){return(...n)=>{for(const t of e)typeof t=="function"&&t(...n)}}function l(){}function g(e,n,t,r){const a=Array.isArray(n)?n:[n];return a.forEach(s=>e.addEventListener(s,t,r)),()=>{a.forEach(s=>e.removeEventListener(s,t,r))}}function Y(e,n,t,r){const a=Array.isArray(n)?n:[n];if(typeof t=="function"){const s=C(i=>t(i));return a.forEach(i=>e.addEventListener(i,s,r)),()=>{a.forEach(i=>e.removeEventListener(i,s,r))}}return()=>void 0}function k(e){const n=e.currentTarget;if(!F(n))return null;const t=new CustomEvent(`m-${e.type}`,{detail:{originalEvent:e},cancelable:!0});return n.dispatchEvent(t),t}function C(e){return n=>{const t=k(n);if(!(t!=null&&t.defaultPrevented))return e(n)}}const X=e=>{try{O(e)}catch{return e}},_=e=>{try{S(e)}catch{return e}};function M(e,...n){const t={};for(const r of Object.keys(e))n.includes(r)||(t[r]=e[r]);return t}function w(e){return{...e,get:()=>p(e)}}w.writable=function(e){const n=D(e);let t=e;return{subscribe:n.subscribe,set(r){n.set(r),t=r},update(r){const a=r(t);n.set(a),t=a},get(){return t}}};w.derived=function(e,n){const t=new Map,r=()=>{const s=Array.isArray(e)?e.map(i=>i.get()):e.get();return n(s)};return{get:r,subscribe:s=>{const i=[];return(Array.isArray(e)?e:[e]).forEach(u=>{i.push(u.subscribe(()=>{s(r())}))}),s(r()),t.set(s,i),()=>{const u=t.get(s);if(u)for(const c of u)c();t.delete(s)}}}};const d={ALT:"Alt",ARROW_DOWN:"ArrowDown",ARROW_LEFT:"ArrowLeft",ARROW_RIGHT:"ArrowRight",ARROW_UP:"ArrowUp",BACKSPACE:"Backspace",CAPS_LOCK:"CapsLock",CONTROL:"Control",DELETE:"Delete",END:"End",ENTER:"Enter",ESCAPE:"Escape",F1:"F1",F10:"F10",F11:"F11",F12:"F12",F2:"F2",F3:"F3",F4:"F4",F5:"F5",F6:"F6",F7:"F7",F8:"F8",F9:"F9",HOME:"Home",META:"Meta",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",SHIFT:"Shift",SPACE:" ",TAB:"Tab",CTRL:"Control",ASTERISK:"*",A:"a",P:"p"},$=[d.ARROW_DOWN,d.PAGE_UP,d.HOME],W=[d.ARROW_UP,d.PAGE_DOWN,d.END],z=[...$,...W],J=[d.ENTER,d.SPACE];function K(e,n){let t;const r=y(e,s=>{t==null||t(),t=n(s)}).subscribe(l),a=()=>{r(),t==null||t()};return _(a),a}b(void 0,e=>{function n(r){e(r),e(void 0)}return g(document,"pointerup",n,{passive:!1,capture:!0})});const N=b(void 0,e=>{function n(r){r&&r.key===d.ESCAPE&&e(r),e(void 0)}return g(document,"keydown",n,{passive:!1})}),Q=(e,n={})=>{let t=l;function r(a={}){t();const s={enabled:!0,...a},i=L(s.enabled)?s.enabled:b(s.enabled);t=P(N.subscribe(o=>{var c;if(!o||!p(i))return;const u=o.target;if(!(!F(u)||u.closest("[data-escapee]")!==e)){if(o.preventDefault(),s.ignore){if(R(s.ignore)){if(s.ignore(o))return}else if(Array.isArray(s.ignore)&&s.ignore.length>0&&s.ignore.some(f=>f&&u===f))return}(c=s.handler)==null||c.call(s,o)}}),K(i,o=>{o?e.dataset.escapee="":delete e.dataset.escapee}))}return r(n),{update:r,destroy(){e.removeAttribute("data-escapee"),t()}}};b(!1),b(!1),b(void 0);const U={isDateDisabled:void 0,isDateUnavailable:void 0,value:void 0,preventDeselect:!1,numberOfMonths:1,pagedNavigation:!1,weekStartsOn:0,fixedWeeks:!1,calendarLabel:"Event Date",locale:"en",minValue:void 0,maxValue:void 0,disabled:!1,readonly:!1,weekdayFormat:"narrow"};({...M(U,"isDateDisabled","isDateUnavailable","value","locale","disabled","readonly","minValue","maxValue","weekdayFormat")});export{z as F,J as S,Y as a,F as b,R as c,q as d,P as e,g as f,K as g,B as h,j as i,X as j,d as k,G as l,v as m,l as n,V as o,x as p,M as q,h as s,Q as u,w};