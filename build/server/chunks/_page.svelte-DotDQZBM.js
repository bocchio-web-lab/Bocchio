import { c as create_ssr_component, a as subscribe, e as each, v as validate_component, b as escape, i as add_attribute, d as compute_rest_props, f as spread, g as escape_attribute_value, h as escape_object } from './ssr-B17Ijy-a.js';
import { p as page } from './stores-JzN8jNTb.js';
import { C as Card_header, a as Card_title, b as Card_description, c as Card_content, B as Button } from './button-iUksiiSu.js';
import { C as Card, c as cn } from './card-k7kzoux8.js';
import './client-BUusD8wq.js';
import './exports-BGi7-Rnc.js';
import './create-DzHcwAFu.js';
import './index2-N8t029YN.js';
import 'tailwind-variants';
import 'clsx';
import 'tailwind-merge';

const Card_footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex items-center p-6 pt-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  data.posts.forEach((post) => {
    post.link = `${$page.url.pathname}/${post.slug}`;
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $page.params.contentType;
  $$unsubscribe_page();
  return ` ${each(data.posts, (project) => {
    return `${validate_component(Card, "Card.Root").$$render(
      $$result,
      {
        class: "group flex w-full flex-wrap justify-between gap-8 transition-transform odd:flex-row-reverse hover:scale-105"
      },
      {},
      {
        default: () => {
          return `<div class="grow-[2] basis-96 content-center">${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
                default: () => {
                  return `${escape(project.title)}`;
                }
              })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
                default: () => {
                  return `${escape(project.description)}`;
                }
              })} `;
            }
          })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
            default: () => {
              return `${escape(project.body)} `;
            }
          })} ${validate_component(Card_footer, "Card.Footer").$$render($$result, { class: "mt-auto hidden md:block" }, {}, {
            default: () => {
              return `<a${add_attribute("href", project.link, 0)} class="w-full">${validate_component(Button, "Button").$$render($$result, { class: "w-full" }, {}, {
                default: () => {
                  return `Read the content`;
                }
              })}</a> `;
            }
          })}</div> <div class="grow-[1] basis-60 content-center" data-svelte-h="svelte-exhwvh"><img src="/icons/github.svg" class="m-auto max-h-52 max-w-full rounded-2xl p-6 transition-transform group-hover:scale-110" alt="GitHub logo"></div> ${validate_component(Card_footer, "Card.Footer").$$render($$result, { class: "mt-auto block w-full md:hidden" }, {}, {
            default: () => {
              return `<a${add_attribute("href", project.link, 0)} class="w-full">${validate_component(Button, "Button").$$render($$result, { class: "w-full" }, {}, {
                default: () => {
                  return `Read the content`;
                }
              })}</a> `;
            }
          })} `;
        }
      }
    )}`;
  })}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-DotDQZBM.js.map
