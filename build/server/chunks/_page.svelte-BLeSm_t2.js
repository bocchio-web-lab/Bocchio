import { c as create_ssr_component, v as validate_component } from './ssr-B17Ijy-a.js';
import { C as Card_header, a as Card_title, b as Card_description, c as Card_content, B as Button } from './button-iUksiiSu.js';
import { C as Card } from './card-k7kzoux8.js';
import 'clsx';
import { L as Label, I as Input } from './label-CHPj8fud.js';
import './client-BUusD8wq.js';
import './create-DzHcwAFu.js';
import './index2-N8t029YN.js';
import 'tailwind-variants';
import 'tailwind-merge';
import './events-DdNptLs-.js';
import './exports-BGi7-Rnc.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "tommmaso.bocchietti@gmail.com";
  let password = "1234";
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Card, "Card.Root").$$render($$result, { class: "mx-auto max-w-sm" }, {}, {
      default: () => {
        return `<form method="POST" action="?/login">${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-2xl" }, {}, {
              default: () => {
                return `Login`;
              }
            })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
              default: () => {
                return `Enter your email below to login to your account`;
              }
            })}`;
          }
        })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="grid gap-4"><div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
              default: () => {
                return `Email`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                id: "email",
                type: "email",
                name: "email",
                placeholder: "tommaso.bocchietti@gmail.com",
                required: true,
                value: email
              },
              {
                value: ($$value) => {
                  email = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div> <div class="grid gap-2"><div class="flex items-center">${validate_component(Label, "Label").$$render($$result, { for: "password" }, {}, {
              default: () => {
                return `Password`;
              }
            })} <a href="reset-password" class="ml-auto inline-block text-sm underline" data-svelte-h="svelte-71akpn">Forgot your password?</a></div> ${validate_component(Input, "Input").$$render(
              $$result,
              {
                id: "password",
                type: "password",
                name: "password",
                required: true,
                value: password
              },
              {
                value: ($$value) => {
                  password = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div> ${validate_component(Button, "Button").$$render($$result, { type: "submit", class: "w-full" }, {}, {
              default: () => {
                return `Login`;
              }
            })}</div> <div class="mt-4 text-center text-sm" data-svelte-h="svelte-etjd00">Don&#39;t have an account?
				<a href="register" class="underline">Sign up</a></div>`;
          }
        })}</form>`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BLeSm_t2.js.map
