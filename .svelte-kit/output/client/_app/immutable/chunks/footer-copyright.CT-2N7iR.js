import{s as v,e as i,c as f,b as u,f as l,i as p,l as x,m as d,u as y,o as C,p as T,t as $,d as g,h as _,n as h}from"./scheduler.Dw1Xknx6.js";import{S as E,i as F,c as B,a as D,m as O,t as b,b as w,d as S}from"./index.BjN0RBxD.js";import{C as j}from"./card.ozY8Lm1u.js";function q(n){let s,a;const r=n[0].default,t=x(r,n,n[1],null);return{c(){s=i("div"),t&&t.c(),this.h()},l(e){s=f(e,"DIV",{class:!0});var o=u(s);t&&t.l(o),o.forEach(l),this.h()},h(){d(s,"class","m-auto w-full max-w-sm justify-center")},m(e,o){p(e,s,o),t&&t.m(s,null),a=!0},p(e,o){t&&t.p&&(!a||o&2)&&y(t,r,e,e[1],a?T(r,e[1],o,null):C(e[1]),null)},i(e){a||(b(t,e),a=!0)},o(e){w(t,e),a=!1},d(e){e&&l(s),t&&t.d(e)}}}function A(n){let s,a,r;return a=new j({props:{class:"p-4",$$slots:{default:[q]},$$scope:{ctx:n}}}),{c(){s=i("footer"),B(a.$$.fragment)},l(t){s=f(t,"FOOTER",{});var e=u(s);D(a.$$.fragment,e),e.forEach(l)},m(t,e){p(t,s,e),O(a,s,null),r=!0},p(t,[e]){const o={};e&2&&(o.$$scope={dirty:e,ctx:t}),a.$set(o)},i(t){r||(b(a.$$.fragment,t),r=!0)},o(t){w(a.$$.fragment,t),r=!1},d(t){t&&l(s),S(a)}}}function H(n,s,a){let{$$slots:r={},$$scope:t}=s;return n.$$set=e=>{"$$scope"in e&&a(1,t=e.$$scope)},[r,t]}class k extends E{constructor(s){super(),F(this,s,H,A,v,{})}}function I(n){let s,a,r,t=new Date().getFullYear()+"",e;return{c(){s=i("h4"),a=i("a"),r=$("Tommaso Bocchietti © "),e=$(t),this.h()},l(o){s=f(o,"H4",{class:!0});var c=u(s);a=f(c,"A",{href:!0});var m=u(a);r=g(m,"Tommaso Bocchietti © "),e=g(m,t),m.forEach(l),c.forEach(l),this.h()},h(){d(a,"href","/"),d(s,"class","text-center text-lg font-bold")},m(o,c){p(o,s,c),_(s,a),_(a,r),_(a,e)},p:h,i:h,o:h,d(o){o&&l(s)}}}class z extends E{constructor(s){super(),F(this,s,null,I,v,{})}}export{k as F,z as a};