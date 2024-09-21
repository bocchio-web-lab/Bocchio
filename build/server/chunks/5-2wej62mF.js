const load = async (param) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return { posts };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DotDQZBM.js')).default;
const server_id = "src/routes/(contents)/[contentType=contentType]/+page.server.ts";
const imports = ["_app/immutable/nodes/5.BjQN0EDu.js","_app/immutable/chunks/scheduler.Dw1Xknx6.js","_app/immutable/chunks/index.BjN0RBxD.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/stores.Bv_7Uz84.js","_app/immutable/chunks/entry.DRO86FrP.js","_app/immutable/chunks/index.DAqNsYo8.js","_app/immutable/chunks/button.CSNOQBT_.js","_app/immutable/chunks/card.ozY8Lm1u.js","_app/immutable/chunks/create.B7jOBE5H.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-2wej62mF.js.map
