import { c as create_ssr_component, v as validate_component } from './ssr-B17Ijy-a.js';
import { F as Footer, a as Footer_copyright } from './footer-copyright-QH5m5asg.js';
import './card-k7kzoux8.js';
import 'clsx';
import 'tailwind-merge';

const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="m-auto flex h-max w-full flex-col items-center justify-center px-4 py-8">${slots.default ? slots.default({}) : ``}</main> ${validate_component(Footer, "Footer.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Footer_copyright, "Footer.Copyright").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-BX1AHeVl.js.map
