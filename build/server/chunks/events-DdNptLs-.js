import { o as createEventDispatcher } from './ssr-B17Ijy-a.js';

function createBitAttrs(bit, parts) {
  const attrs = {};
  parts.forEach((part) => {
    attrs[part] = {
      [`data-${bit}-${part}`]: ""
    };
  });
  return (part) => attrs[part];
}
function disabledAttrs(disabled) {
  return disabled ? { "aria-disabled": "true", "data-disabled": "" } : { "aria-disabled": void 0, "data-disabled": void 0 };
}
function createDispatcher() {
  const dispatch = createEventDispatcher();
  return (e) => {
    const { originalEvent } = e.detail;
    const { cancelable } = e;
    const type = originalEvent.type;
    const shouldContinue = dispatch(type, { originalEvent, currentTarget: originalEvent.currentTarget }, { cancelable });
    if (!shouldContinue) {
      e.preventDefault();
    }
  };
}

export { createBitAttrs as a, createDispatcher as c, disabledAttrs as d };
//# sourceMappingURL=events-DdNptLs-.js.map
