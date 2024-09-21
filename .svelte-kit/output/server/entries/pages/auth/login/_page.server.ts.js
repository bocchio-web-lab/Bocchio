import { r as redirect } from "../../../../chunks/index.js";
import "../../../../chunks/client.js";
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
export {
  actions,
  load
};
