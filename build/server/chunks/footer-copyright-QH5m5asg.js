import { c as create_ssr_component, v as validate_component, b as escape } from './ssr-B17Ijy-a.js';
import { C as Card } from './card-k7kzoux8.js';
import 'clsx';

const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<footer>${validate_component(Card, "Card").$$render($$result, { class: "p-4" }, {}, {
    default: () => {
      return `<div class="m-auto w-full max-w-sm justify-center">${slots.default ? slots.default({}) : ``}</div>`;
    }
  })}</footer>`;
});
const Footer_copyright = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h4 class="text-center text-lg font-bold"><a href="/">Tommaso Bocchietti © ${escape((/* @__PURE__ */ new Date()).getFullYear())}</a></h4>`;
});

export { Footer as F, Footer_copyright as a };
//# sourceMappingURL=footer-copyright-QH5m5asg.js.map
