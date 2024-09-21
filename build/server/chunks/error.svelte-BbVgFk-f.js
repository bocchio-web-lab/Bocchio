import { c as create_ssr_component, a as subscribe, b as escape } from './ssr-B17Ijy-a.js';
import { p as page } from './stores-JzN8jNTb.js';
import './client-BUusD8wq.js';
import './exports-BGi7-Rnc.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
});

export { Error as default };
//# sourceMappingURL=error.svelte-BbVgFk-f.js.map
