import { c as create_ssr_component, e as each, v as validate_component } from "../../chunks/ssr.js";
const Particles = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="fixed top-0 -z-50 h-screen w-full animate-particleReveal bg-background opacity-0">${each(Array(5), (_, index) => {
    return `<figure class="particle absolute m-0 rounded-full bg-foreground"></figure>`;
  })}</div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${slots.default ? slots.default({}) : ``} ${validate_component(Particles, "Particles").$$render($$result, {}, {}, {})}`;
});
export {
  Layout as default
};
