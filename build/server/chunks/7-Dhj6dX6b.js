import { r as redirect } from './index-DyoisQP2.js';
import './client-BUusD8wq.js';
import './exports-BGi7-Rnc.js';

const load = ({ cookies }) => {
  if (cookies.get("bearer_token_auth")) {
    redirect(307, "/dashboard");
  }
};
const actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");
    try {
      const csrfResponse = await fetch(
        "http://identity.test/sanctum/csrf-cookie",
        {
          credentials: "include"
        }
      );
      const xsrfToken = csrfResponse.headers.getSetCookie().find((cookie) => cookie.startsWith("XSRF-TOKEN"))?.split(";")[0].split("=")[1];
      const requestInit = {
        body: JSON.stringify({ email, password }),
        credentials: "include",
        headers: {
          "content-Type": "application/json",
          "accept": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
        },
        method: "POST"
      };
      console.log("requestInit:", requestInit);
      const loginResponse = await fetch("http://identity.test/login", requestInit);
      console.log("loginResponse:", loginResponse.status, loginResponse.statusText);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BLeSm_t2.js')).default;
const server_id = "src/routes/auth/login/+page.server.ts";
const imports = ["_app/immutable/nodes/7.Dm5f-Jji.js","_app/immutable/chunks/scheduler.Dw1Xknx6.js","_app/immutable/chunks/index.BjN0RBxD.js","_app/immutable/chunks/button.CSNOQBT_.js","_app/immutable/chunks/card.ozY8Lm1u.js","_app/immutable/chunks/create.B7jOBE5H.js","_app/immutable/chunks/index.DAqNsYo8.js","_app/immutable/chunks/label.Cocrb85u.js","_app/immutable/chunks/events.CpruLyBL.js","_app/immutable/chunks/entry.DRO86FrP.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-Dhj6dX6b.js.map
