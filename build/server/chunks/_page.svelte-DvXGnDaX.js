import { c as create_ssr_component, a as subscribe, b as escape } from './ssr-B17Ijy-a.js';
import { p as page } from './stores-JzN8jNTb.js';
import './client-BUusD8wq.js';
import './exports-BGi7-Rnc.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<pre>	${escape(JSON.stringify($page, null, 4))}
</pre>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-DvXGnDaX.js.map
