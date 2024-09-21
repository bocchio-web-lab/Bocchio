import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { C as Card_header, a as Card_title, b as Card_description, c as Card_content, B as Button } from "../../../../chunks/button.js";
import { C as Card } from "../../../../chunks/card.js";
import "clsx";
import { L as Label, I as Input } from "../../../../chunks/label.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Card, "Card.Root").$$render($$result, { class: "mx-auto max-w-sm" }, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-xl" }, {}, {
            default: () => {
              return `Sign Up`;
            }
          })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
            default: () => {
              return `Enter your information to create an account`;
            }
          })}`;
        }
      })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `<div class="grid gap-4"><div class="grid grid-cols-2 gap-4"><div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "first-name" }, {}, {
            default: () => {
              return `First name`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              id: "first-name",
              placeholder: "Max",
              required: true
            },
            {},
            {}
          )}</div> <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "last-name" }, {}, {
            default: () => {
              return `Last name`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              id: "last-name",
              placeholder: "Robinson",
              required: true
            },
            {},
            {}
          )}</div></div> <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
            default: () => {
              return `Email`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              id: "email",
              type: "email",
              placeholder: "m@example.com",
              required: true
            },
            {},
            {}
          )}</div> <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "password" }, {}, {
            default: () => {
              return `Password`;
            }
          })} ${validate_component(Input, "Input").$$render($$result, { id: "password", type: "password" }, {}, {})}</div> ${validate_component(Button, "Button").$$render($$result, { type: "submit", class: "w-full" }, {}, {
            default: () => {
              return `Create an account`;
            }
          })} ${validate_component(Button, "Button").$$render($$result, { variant: "outline", class: "w-full" }, {}, {
            default: () => {
              return `Sign up with GitHub`;
            }
          })}</div> <div class="mt-4 text-center text-sm" data-svelte-h="svelte-88fkvn">Already have an account?
			<a href="##" class="underline">Sign in</a></div>`;
        }
      })}`;
    }
  })}`;
});
export {
  Page as default
};
