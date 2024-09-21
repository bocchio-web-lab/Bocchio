import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { F as Footer, a as Footer_copyright } from "../../../chunks/footer-copyright.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="m-auto flex h-max w-full flex-col items-center justify-center px-4 py-8">${slots.default ? slots.default({}) : ``}</main> ${validate_component(Footer, "Footer.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Footer_copyright, "Footer.Copyright").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Layout as default
};
