import { c as create_ssr_component, a as subscribe, v as validate_component, b as escape, d as compute_rest_props, f as spread, g as escape_attribute_value, h as escape_object, i as add_attribute, j as getContext, s as setContext, k as get_store_value, l as set_current_component, r as run_all, n as current_component } from './ssr-B17Ijy-a.js';
import { p as page } from './stores-JzN8jNTb.js';
import { C as Card, c as cn, f as flyAndScale } from './card-k7kzoux8.js';
import 'clsx';
import { i as is_void, o as omit, w as withGet, m as makeElement, s as styleToString, p as portalAttr, e as effect, a as executeCallbacks, b as addMeltEventListener, c as isHTMLElement$1, F as FIRST_LAST_KEYS, k as kbd, S as SELECTION_KEYS, u as useEscapeKeydown, d as isElementDisabled, f as safeOnMount, g as isBrowser, h as createElHelpers, n as noop, j as disabledAttr, l as addEventListener, q as isFunction, r as isElement$1 } from './create-DzHcwAFu.js';
import { d as derived, w as writable, b as readonly } from './index2-N8t029YN.js';
import { c as createDispatcher, d as disabledAttrs, a as createBitAttrs } from './events-DdNptLs-.js';
import { F as Footer, a as Footer_copyright } from './footer-copyright-QH5m5asg.js';
import './client-BUusD8wq.js';
import './exports-BGi7-Rnc.js';
import 'tailwind-merge';

let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
let nanoid = (size = 21) => {
  let id = '';
  let i = size;
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0];
  }
  return id
};

/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */

const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ['left', 'right'];
  const rl = ['right', 'left'];
  const tb = ['top', 'bottom'];
  const bt = ['bottom', 'top'];
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case 'left':
    case 'right':
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow$1 = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements,
      middlewareData
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const min$1 = minPadding;
    const max = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = clamp(min$1, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. To ensure `shift()` continues to take action,
    // a single reset is performed when this is true.
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && {
          alignmentOffset
        })
      },
      reset: shouldAddOffset
    };
  }
});

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          // Try next placement and re-run the lifecycle.
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$filter2;
                const placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d.placement);
                    return currentSideAxis === initialSideAxis ||
                    // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === 'y';
                  }
                  return true;
                }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.

async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === 'y';
  const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);

  // eslint-disable-next-line prefer-const
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset$1 = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);

      // If the placement is the same and the arrow caused an alignment offset
      // then we don't need to change the positioning coordinates.
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'size',
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform,
        elements
      } = state;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === 'y';
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isYAxis) {
        availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  // Browsers without `ShadowRoot` support.
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [':popover-open', ':modal'].some(selector => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x = rect.left + scroll.scrollLeft - offsets.x;
  const y = rect.top + scroll.scrollTop - offsets.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}

function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === 'static';
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}

const getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};

function isRTL(element) {
  return getComputedStyle$1(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          // If the reference is clipped, the ratio is 0. Throttle the refresh
          // to prevent an infinite loop of updates.
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1000);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = offset$1;

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = shift$1;

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = flip$1;

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = size$1;

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = arrow$1;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
// NOTE: separate `:not()` selectors has broader browser support than the newer
//  `:not([inert], [inert] *)` (Feb 2023)
// CAREFUL: JSDom does not support `:not([inert] *)` as a selector; using it causes
//  the entire query to fail, resulting in no nodes found, which will break a lot
//  of things... so we have to rely on JS to identify nodes inside an inert container
var candidateSelectors = ['input:not([inert])', 'select:not([inert])', 'textarea:not([inert])', 'a[href]:not([inert])', 'button:not([inert])', '[tabindex]:not(slot):not([inert])', 'audio[controls]:not([inert])', 'video[controls]:not([inert])', '[contenteditable]:not([contenteditable="false"]):not([inert])', 'details>summary:first-of-type:not([inert])', 'details:not([inert])'];
var candidateSelector = /* #__PURE__ */candidateSelectors.join(',');
var NoElement = typeof Element === 'undefined';
var matches = NoElement ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function (element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function (element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};

/**
 * Determines if a node is inert or in an inert ancestor.
 * @param {Element} [node]
 * @param {boolean} [lookUp] If true and `node` is not inert, looks up at ancestors to
 *  see if any of them are inert. If false, only `node` itself is considered.
 * @returns {boolean} True if inert itself or by way of being in an inert ancestor.
 *  False if `node` is falsy.
 */
var isInert = function isInert(node, lookUp) {
  var _node$getAttribute;
  if (lookUp === void 0) {
    lookUp = true;
  }
  // CAREFUL: JSDom does not support inert at all, so we can't use the `HTMLElement.inert`
  //  JS API property; we have to check the attribute, which can either be empty or 'true';
  //  if it's `null` (not specified) or 'false', it's an active element
  var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, 'inert');
  var inert = inertAtt === '' || inertAtt === 'true';

  // NOTE: this could also be handled with `node.matches('[inert], :is([inert] *)')`
  //  if it weren't for `matches()` not being a function on shadow roots; the following
  //  code works for any kind of node
  // CAREFUL: JSDom does not appear to support certain selectors like `:not([inert] *)`
  //  so it likely would not support `:is([inert] *)` either...
  var result = inert || lookUp && node && isInert(node.parentNode); // recursive

  return result;
};

/**
 * Determines if a node's content is editable.
 * @param {Element} [node]
 * @returns True if it's content-editable; false if it's not or `node` is falsy.
 */
var isContentEditable = function isContentEditable(node) {
  var _node$getAttribute2;
  // CAREFUL: JSDom does not support the `HTMLElement.isContentEditable` API so we have
  //  to use the attribute directly to check for this, which can either be empty or 'true';
  //  if it's `null` (not specified) or 'false', it's a non-editable element
  var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, 'contenteditable');
  return attValue === '' || attValue === 'true';
};

/**
 * @param {Element} el container to check in
 * @param {boolean} includeContainer add container to check
 * @param {(node: Element) => boolean} filter filter candidates
 * @returns {Element[]}
 */
var getCandidates = function getCandidates(el, includeContainer, filter) {
  // even if `includeContainer=false`, we still have to check it for inertness because
  //  if it's inert, all its children are inert
  if (isInert(el)) {
    return [];
  }
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};

/**
 * @callback GetShadowRoot
 * @param {Element} element to check for shadow root
 * @returns {ShadowRoot|boolean} ShadowRoot if available or boolean indicating if a shadowRoot is attached but not available.
 */

/**
 * @callback ShadowRootFilter
 * @param {Element} shadowHostNode the element which contains shadow content
 * @returns {boolean} true if a shadow root could potentially contain valid candidates.
 */

/**
 * @typedef {Object} CandidateScope
 * @property {Element} scopeParent contains inner candidates
 * @property {Element[]} candidates list of candidates found in the scope parent
 */

/**
 * @typedef {Object} IterativeOptions
 * @property {GetShadowRoot|boolean} getShadowRoot true if shadow support is enabled; falsy if not;
 *  if a function, implies shadow support is enabled and either returns the shadow root of an element
 *  or a boolean stating if it has an undisclosed shadow root
 * @property {(node: Element) => boolean} filter filter candidates
 * @property {boolean} flatten if true then result will flatten any CandidateScope into the returned list
 * @property {ShadowRootFilter} shadowRootFilter filter shadow roots;
 */

/**
 * @param {Element[]} elements list of element containers to match candidates from
 * @param {boolean} includeContainer add container list to check
 * @param {IterativeOptions} options
 * @returns {Array.<Element|CandidateScope>}
 */
var getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (isInert(element, false)) {
      // no need to look up since we're drilling down
      // anything inside this container will also be inert
      continue;
    }
    if (element.tagName === 'SLOT') {
      // add shadow dom slot scope (slot itself cannot be focusable)
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      // check candidate element
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }

      // iterate over shadow content if possible
      var shadowRoot = element.shadowRoot ||
      // check for an undisclosed shadow
      typeof options.getShadowRoot === 'function' && options.getShadowRoot(element);

      // no inert look up because we're already drilling down and checking for inertness
      //  on the way down, so all containers to this root node should have already been
      //  vetted as non-inert
      var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
      if (shadowRoot && validShadowRoot) {
        // add shadow dom scope IIF a shadow root node was given; otherwise, an undisclosed
        //  shadow exists, so look at light dom children as fallback BUT create a scope for any
        //  child candidates found because they're likely slotted elements (elements that are
        //  children of the web component element (which has the shadow), in the light dom, but
        //  slotted somewhere _inside_ the undisclosed shadow) -- the scope is created below,
        //  _after_ we return from this recursive call
        var _nestedCandidates = getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        // there's not shadow so just dig into the element's (light dom) children
        //  __without__ giving the element special scope treatment
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};

/**
 * @private
 * Determines if the node has an explicitly specified `tabindex` attribute.
 * @param {HTMLElement} node
 * @returns {boolean} True if so; false if not.
 */
var hasTabIndex = function hasTabIndex(node) {
  return !isNaN(parseInt(node.getAttribute('tabindex'), 10));
};

/**
 * Determine the tab index of a given node.
 * @param {HTMLElement} node
 * @returns {number} Tab order (negative, 0, or positive number).
 * @throws {Error} If `node` is falsy.
 */
var getTabIndex = function getTabIndex(node) {
  if (!node) {
    throw new Error('No node provided');
  }
  if (node.tabIndex < 0) {
    // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
    // `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
    // yet they are still part of the regular tab order; in FF, they get a default
    // `tabIndex` of 0; since Chrome still puts those elements in the regular tab
    // order, consider their tab index to be 0.
    // Also browsers do not return `tabIndex` correctly for contentEditable nodes;
    // so if they don't have a tabindex attribute specifically set, assume it's 0.
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
};

/**
 * Determine the tab index of a given node __for sort order purposes__.
 * @param {HTMLElement} node
 * @param {boolean} [isScope] True for a custom element with shadow root or slot that, by default,
 *  has tabIndex -1, but needs to be sorted by document order in order for its content to be
 *  inserted into the correct sort position.
 * @returns {number} Tab order (negative, 0, or positive number).
 */
var getSortOrderTabIndex = function getSortOrderTabIndex(node, isScope) {
  var tabIndex = getTabIndex(node);
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0;
  }
  return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput(node) {
  return node.tagName === 'INPUT';
};
var isHiddenInput = function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
};
var isDetailsWithSummary = function isDetailsWithSummary(node) {
  var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function (child) {
    return child.tagName === 'SUMMARY';
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio(node) {
  return isInput(node) && node.type === 'radio';
};
var isNonTabbableRadio = function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
};

// determines if a node is ultimately attached to the window's document
var isNodeAttached = function isNodeAttached(node) {
  var _nodeRoot;
  // The root node is the shadow root if the node is in a shadow DOM; some document otherwise
  //  (but NOT _the_ document; see second 'If' comment below for more).
  // If rootNode is shadow root, it'll have a host, which is the element to which the shadow
  //  is attached, and the one we need to check if it's in the document or not (because the
  //  shadow, and all nodes it contains, is never considered in the document since shadows
  //  behave like self-contained DOMs; but if the shadow's HOST, which is part of the document,
  //  is hidden, or is not in the document itself but is detached, it will affect the shadow's
  //  visibility, including all the nodes it contains). The host could be any normal node,
  //  or a custom element (i.e. web component). Either way, that's the one that is considered
  //  part of the document, not the shadow root, nor any of its children (i.e. the node being
  //  tested).
  // To further complicate things, we have to look all the way up until we find a shadow HOST
  //  that is attached (or find none) because the node might be in nested shadows...
  // If rootNode is not a shadow root, it won't have a host, and so rootNode should be the
  //  document (per the docs) and while it's a Document-type object, that document does not
  //  appear to be the same as the node's `ownerDocument` for some reason, so it's safer
  //  to ignore the rootNode at this point, and use `node.ownerDocument`. Otherwise,
  //  using `rootNode.contains(node)` will _always_ be true we'll get false-positives when
  //  node is actually detached.
  // NOTE: If `nodeRootHost` or `node` happens to be the `document` itself (which is possible
  //  if a tabbable/focusable node was quickly added to the DOM, focused, and then removed
  //  from the DOM as in https://github.com/focus-trap/focus-trap-react/issues/905), then
  //  `ownerDocument` will be `null`, hence the optional chaining on it.
  var nodeRoot = node && getRootNode(node);
  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;

  // in some cases, a detached node will return itself as the root instead of a document or
  //  shadow root object, in which case, we shouldn't try to look further up the host chain
  var attached = false;
  if (nodeRoot && nodeRoot !== node) {
    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
      // since it's not attached and we have a root host, the node MUST be in a nested shadow DOM,
      //  which means we need to get the host's host and check if that parent host is contained
      //  in (i.e. attached to) the document
      nodeRoot = getRootNode(nodeRootHost);
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
    }
  }
  return attached;
};
var isZeroArea = function isZeroArea(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(),
    width = _node$getBoundingClie.width,
    height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden(node, _ref) {
  var displayCheck = _ref.displayCheck,
    getShadowRoot = _ref.getShadowRoot;
  // NOTE: visibility will be `undefined` if node is detached from the document
  //  (see notes about this further down), which means we will consider it visible
  //  (this is legacy behavior from a very long way back)
  // NOTE: we check this regardless of `displayCheck="none"` because this is a
  //  _visibility_ check, not a _display_ check
  if (getComputedStyle(node).visibility === 'hidden') {
    return true;
  }
  var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
    return true;
  }
  if (!displayCheck || displayCheck === 'full' || displayCheck === 'legacy-full') {
    if (typeof getShadowRoot === 'function') {
      // figure out if we should consider the node to be in an undisclosed shadow and use the
      //  'non-zero-area' fallback
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true // check if there's an undisclosed shadow
        ) {
          // node has an undisclosed shadow which means we can only treat it as a black box, so we
          //  fall back to a non-zero-area test
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          // iterate up slot
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          // cross shadow boundary
          node = rootNode.host;
        } else {
          // iterate up normal dom
          node = parentElement;
        }
      }
      node = originalNode;
    }
    // else, `getShadowRoot` might be true, but all that does is enable shadow DOM support
    //  (i.e. it does not also presume that all nodes might have undisclosed shadows); or
    //  it might be a falsy value, which means shadow DOM support is disabled

    // Since we didn't find it sitting in an undisclosed shadow (or shadows are disabled)
    //  now we can just test to see if it would normally be visible or not, provided it's
    //  attached to the main document.
    // NOTE: We must consider case where node is inside a shadow DOM and given directly to
    //  `isTabbable()` or `isFocusable()` -- regardless of `getShadowRoot` option setting.

    if (isNodeAttached(node)) {
      // this works wherever the node is: if there's at least one client rect, it's
      //  somehow displayed; it also covers the CSS 'display: contents' case where the
      //  node itself is hidden in place of its contents; and there's no need to search
      //  up the hierarchy either
      return !node.getClientRects().length;
    }

    // Else, the node isn't attached to the document, which means the `getClientRects()`
    //  API will __always__ return zero rects (this can happen, for example, if React
    //  is used to render nodes onto a detached tree, as confirmed in this thread:
    //  https://github.com/facebook/react/issues/9117#issuecomment-284228870)
    //
    // It also means that even window.getComputedStyle(node).display will return `undefined`
    //  because styles are only computed for nodes that are in the document.
    //
    // NOTE: THIS HAS BEEN THE CASE FOR YEARS. It is not new, nor is it caused by tabbable
    //  somehow. Though it was never stated officially, anyone who has ever used tabbable
    //  APIs on nodes in detached containers has actually implicitly used tabbable in what
    //  was later (as of v5.2.0 on Apr 9, 2021) called `displayCheck="none"` mode -- essentially
    //  considering __everything__ to be visible because of the innability to determine styles.
    //
    // v6.0.0: As of this major release, the default 'full' option __no longer treats detached
    //  nodes as visible with the 'none' fallback.__
    if (displayCheck !== 'legacy-full') {
      return true; // hidden
    }
    // else, fallback to 'none' mode and consider the node visible
  } else if (displayCheck === 'non-zero-area') {
    // NOTE: Even though this tests that the node's client rect is non-zero to determine
    //  whether it's displayed, and that a detached node will __always__ have a zero-area
    //  client rect, we don't special-case for whether the node is attached or not. In
    //  this mode, we do want to consider nodes that have a zero area to be hidden at all
    //  times, and that includes attached or not.
    return isZeroArea(node);
  }

  // visible, as far as we can tell, or per current `displayCheck=none` mode, we assume
  //  it's visible
  return false;
};

// form fields (nested) inside a disabled fieldset are not focusable/tabbable
//  unless they are in the _first_ <legend> element of the top-most disabled
//  fieldset
var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    // check if `node` is contained in a disabled <fieldset>
    while (parentNode) {
      if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
        // look for the first <legend> among the children of the disabled <fieldset>
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          // when the first <legend> (in document order) is found
          if (child.tagName === 'LEGEND') {
            // if its parent <fieldset> is not nested in another disabled <fieldset>,
            // return whether `node` is a descendant of its first <legend>
            return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node);
          }
        }
        // the disabled <fieldset> containing `node` has no <legend>
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }

  // else, node's tabbable/focusable state should not be affected by a fieldset's
  //  enabled/disabled state
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
  if (node.disabled ||
  // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  isInert(node) || isHiddenInput(node) || isHidden(node, options) ||
  // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute('tabindex'), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  // If a custom element has an explicit negative tabindex,
  // browsers will not allow tab targeting said element's children.
  return false;
};

/**
 * @param {Array.<Element|CandidateScope>} candidates
 * @returns Element[]
 */
var sortByOrder = function sortByOrder(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function (item, i) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getSortOrderTabIndex(element, isScope);
    var elements = isScope ? sortByOrder(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item: item,
        isScope: isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function (acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusable = function focusable(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable(node, options) {
  options = options || {};
  if (!node) {
    throw new Error('No node provided');
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = /* #__PURE__ */candidateSelectors.concat('iframe').join(',');
var isFocusable = function isFocusable(node, options) {
  options = options || {};
  if (!node) {
    throw new Error('No node provided');
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorFocusable(options, node);
};

/*!
* focus-trap 7.5.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var activeFocusTraps = {
  activateTrap: function activateTrap(trapStack, trap) {
    if (trapStack.length > 0) {
      var activeTrap = trapStack[trapStack.length - 1];
      if (activeTrap !== trap) {
        activeTrap.pause();
      }
    }
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex === -1) {
      trapStack.push(trap);
    } else {
      // move this existing trap to the front of the queue
      trapStack.splice(trapIndex, 1);
      trapStack.push(trap);
    }
  },
  deactivateTrap: function deactivateTrap(trapStack, trap) {
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex !== -1) {
      trapStack.splice(trapIndex, 1);
    }
    if (trapStack.length > 0) {
      trapStack[trapStack.length - 1].unpause();
    }
  }
};
var isSelectableInput = function isSelectableInput(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
};
var isEscapeEvent = function isEscapeEvent(e) {
  return (e === null || e === void 0 ? void 0 : e.key) === 'Escape' || (e === null || e === void 0 ? void 0 : e.key) === 'Esc' || (e === null || e === void 0 ? void 0 : e.keyCode) === 27;
};
var isTabEvent = function isTabEvent(e) {
  return (e === null || e === void 0 ? void 0 : e.key) === 'Tab' || (e === null || e === void 0 ? void 0 : e.keyCode) === 9;
};

// checks for TAB by default
var isKeyForward = function isKeyForward(e) {
  return isTabEvent(e) && !e.shiftKey;
};

// checks for SHIFT+TAB by default
var isKeyBackward = function isKeyBackward(e) {
  return isTabEvent(e) && e.shiftKey;
};
var delay = function delay(fn) {
  return setTimeout(fn, 0);
};

// Array.find/findIndex() are not supported on IE; this replicates enough
//  of Array.findIndex() for our needs
var findIndex = function findIndex(arr, fn) {
  var idx = -1;
  arr.every(function (value, i) {
    if (fn(value)) {
      idx = i;
      return false; // break
    }

    return true; // next
  });

  return idx;
};

/**
 * Get an option's value when it could be a plain value, or a handler that provides
 *  the value.
 * @param {*} value Option's value to check.
 * @param {...*} [params] Any parameters to pass to the handler, if `value` is a function.
 * @returns {*} The `value`, or the handler's returned value.
 */
var valueOrHandler = function valueOrHandler(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  return typeof value === 'function' ? value.apply(void 0, params) : value;
};
var getActualTarget = function getActualTarget(event) {
  // NOTE: If the trap is _inside_ a shadow DOM, event.target will always be the
  //  shadow host. However, event.target.composedPath() will be an array of
  //  nodes "clicked" from inner-most (the actual element inside the shadow) to
  //  outer-most (the host HTML document). If we have access to composedPath(),
  //  then use its first element; otherwise, fall back to event.target (and
  //  this only works for an _open_ shadow DOM; otherwise,
  //  composedPath()[0] === event.target always).
  return event.target.shadowRoot && typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target;
};

// NOTE: this must be _outside_ `createFocusTrap()` to make sure all traps in this
//  current instance use the same stack if `userOptions.trapStack` isn't specified
var internalTrapStack = [];
var createFocusTrap$1 = function createFocusTrap(elements, userOptions) {
  // SSR: a live trap shouldn't be created in this type of environment so this
  //  should be safe code to execute if the `document` option isn't specified
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
  var trapStack = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.trapStack) || internalTrapStack;
  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true,
    isKeyForward: isKeyForward,
    isKeyBackward: isKeyBackward
  }, userOptions);
  var state = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   posTabIndexesFound: boolean,
    //   firstTabbableNode: HTMLElement|undefined,
    //   lastTabbableNode: HTMLElement|undefined,
    //   firstDomTabbableNode: HTMLElement|undefined,
    //   lastDomTabbableNode: HTMLElement|undefined,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list

    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: undefined,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: undefined
  };
  var trap; // eslint-disable-line prefer-const -- some private functions reference it, and its methods reference private functions, so we must declare here and define later

  /**
   * Gets a configuration option value.
   * @param {Object|undefined} configOverrideOptions If true, and option is defined in this set,
   *  value will be taken from this object. Otherwise, value will be taken from base configuration.
   * @param {string} optionName Name of the option whose value is sought.
   * @param {string|undefined} [configOptionName] Name of option to use __instead of__ `optionName`
   *  IIF `configOverrideOptions` is not defined. Otherwise, `optionName` is used.
   */
  var getOption = function getOption(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== undefined ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };

  /**
   * Finds the index of the container that contains the element.
   * @param {HTMLElement} element
   * @param {Event} [event] If available, and `element` isn't directly found in any container,
   *  the event's composed path is used to see if includes any known trap containers in the
   *  case where the element is inside a Shadow DOM.
   * @returns {number} Index of the container in either `state.containers` or
   *  `state.containerGroups` (the order/length of these lists are the same); -1
   *  if the element isn't found.
   */
  var findContainerIndex = function findContainerIndex(element, event) {
    var composedPath = typeof (event === null || event === void 0 ? void 0 : event.composedPath) === 'function' ? event.composedPath() : undefined;
    // NOTE: search `containerGroups` because it's possible a group contains no tabbable
    //  nodes, but still contains focusable nodes (e.g. if they all have `tabindex=-1`)
    //  and we still need to find the element in there
    return state.containerGroups.findIndex(function (_ref) {
      var container = _ref.container,
        tabbableNodes = _ref.tabbableNodes;
      return container.contains(element) || ( // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      composedPath === null || composedPath === void 0 ? void 0 : composedPath.includes(container)) || tabbableNodes.find(function (node) {
        return node === element;
      });
    });
  };

  /**
   * Gets the node for the given option, which is expected to be an option that
   *  can be either a DOM node, a string that is a selector to get a node, `false`
   *  (if a node is explicitly NOT given), or a function that returns any of these
   *  values.
   * @param {string} optionName
   * @returns {undefined | false | HTMLElement | SVGElement} Returns
   *  `undefined` if the option is not specified; `false` if the option
   *  resolved to `false` (node explicitly not given); otherwise, the resolved
   *  DOM node.
   * @throws {Error} If the option is set, not `false`, and is not, or does not
   *  resolve to a node.
   */
  var getNodeForOption = function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    if (typeof optionValue === 'function') {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }
      optionValue = optionValue.apply(void 0, params);
    }
    if (optionValue === true) {
      optionValue = undefined; // use default value
    }

    if (!optionValue) {
      if (optionValue === undefined || optionValue === false) {
        return optionValue;
      }
      // else, empty string (invalid), null (invalid), 0 (invalid)

      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }
    var node = optionValue; // could be HTMLElement, SVGElement, or non-empty string at this point

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue); // resolve to node, or null if fails
      if (!node) {
        throw new Error("`".concat(optionName, "` as selector refers to no known node"));
      }
    }
    return node;
  };
  var getInitialFocusNode = function getInitialFocusNode() {
    var node = getNodeForOption('initialFocus');

    // false explicitly indicates we want no initialFocus at all
    if (node === false) {
      return false;
    }
    if (node === undefined || !isFocusable(node, config.tabbableOptions)) {
      // option not specified nor focusable: use fallback options
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;

        // NOTE: `fallbackFocus` option function cannot return `false` (not supported)
        node = firstTabbableNode || getNodeForOption('fallbackFocus');
      }
    }
    if (!node) {
      throw new Error('Your focus-trap needs to have at least one focusable element');
    }
    return node;
  };
  var updateTabbableNodes = function updateTabbableNodes() {
    state.containerGroups = state.containers.map(function (container) {
      var tabbableNodes = tabbable(container, config.tabbableOptions);

      // NOTE: if we have tabbable nodes, we must have focusable nodes; focusable nodes
      //  are a superset of tabbable nodes since nodes with negative `tabindex` attributes
      //  are focusable but not tabbable
      var focusableNodes = focusable(container, config.tabbableOptions);
      var firstTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[0] : undefined;
      var lastTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : undefined;
      var firstDomTabbableNode = focusableNodes.find(function (node) {
        return isTabbable(node);
      });
      var lastDomTabbableNode = focusableNodes.slice().reverse().find(function (node) {
        return isTabbable(node);
      });
      var posTabIndexesFound = !!tabbableNodes.find(function (node) {
        return getTabIndex(node) > 0;
      });
      return {
        container: container,
        tabbableNodes: tabbableNodes,
        focusableNodes: focusableNodes,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: posTabIndexesFound,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: firstTabbableNode,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: lastTabbableNode,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: firstDomTabbableNode,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: lastDomTabbableNode,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function nextTabbableNode(node) {
          var forward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          var nodeIdx = tabbableNodes.indexOf(node);
          if (nodeIdx < 0) {
            // either not tabbable nor focusable, or was focused but not tabbable (negative tabindex):
            //  since `node` should at least have been focusable, we assume that's the case and mimic
            //  what browsers do, which is set focus to the next node in __document position order__,
            //  regardless of positive tabindexes, if any -- and for reasons explained in the NOTE
            //  above related to `firstDomTabbable` and `lastDomTabbable` properties, we fall back to
            //  basic DOM order
            if (forward) {
              return focusableNodes.slice(focusableNodes.indexOf(node) + 1).find(function (el) {
                return isTabbable(el);
              });
            }
            return focusableNodes.slice(0, focusableNodes.indexOf(node)).reverse().find(function (el) {
              return isTabbable(el);
            });
          }
          return tabbableNodes[nodeIdx + (forward ? 1 : -1)];
        }
      };
    });
    state.tabbableGroups = state.containerGroups.filter(function (group) {
      return group.tabbableNodes.length > 0;
    });

    // throw if no groups have tabbable nodes and we don't have a fallback focus node either
    if (state.tabbableGroups.length <= 0 && !getNodeForOption('fallbackFocus') // returning false not supported for this option
    ) {
      throw new Error('Your focus-trap must have at least one container with at least one tabbable node in it at all times');
    }

    // NOTE: Positive tabindexes are only properly supported in single-container traps because
    //  doing it across multiple containers where tabindexes could be all over the place
    //  would require Tabbable to support multiple containers, would require additional
    //  specialized Shadow DOM support, and would require Tabbable's multi-container support
    //  to look at those containers in document position order rather than user-provided
    //  order (as they are treated in Focus-trap, for legacy reasons). See discussion on
    //  https://github.com/focus-trap/focus-trap/issues/375 for more details.
    if (state.containerGroups.find(function (g) {
      return g.posTabIndexesFound;
    }) && state.containerGroups.length > 1) {
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
    }
  };

  /**
   * Gets the current activeElement. If it's a web-component and has open shadow-root
   * it will recursively search inside shadow roots for the "true" activeElement.
   *
   * @param {Document | ShadowRoot} el
   *
   * @returns {HTMLElement} The element that currently has the focus
   **/
  var getActiveElement = function getActiveElement(el) {
    var activeElement = el.activeElement;
    if (!activeElement) {
      return;
    }
    if (activeElement.shadowRoot && activeElement.shadowRoot.activeElement !== null) {
      return getActiveElement(activeElement.shadowRoot);
    }
    return activeElement;
  };
  var tryFocus = function tryFocus(node) {
    if (node === false) {
      return;
    }
    if (node === getActiveElement(document)) {
      return;
    }
    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }
    node.focus({
      preventScroll: !!config.preventScroll
    });
    // NOTE: focus() API does not trigger focusIn event so set MRU node manually
    state.mostRecentlyFocusedNode = node;
    if (isSelectableInput(node)) {
      node.select();
    }
  };
  var getReturnFocusNode = function getReturnFocusNode(previousActiveElement) {
    var node = getNodeForOption('setReturnFocus', previousActiveElement);
    return node ? node : node === false ? false : previousActiveElement;
  };

  /**
   * Finds the next node (in either direction) where focus should move according to a
   *  keyboard focus-in event.
   * @param {Object} params
   * @param {Node} [params.target] Known target __from which__ to navigate, if any.
   * @param {KeyboardEvent|FocusEvent} [params.event] Event to use if `target` isn't known (event
   *  will be used to determine the `target`). Ignored if `target` is specified.
   * @param {boolean} [params.isBackward] True if focus should move backward.
   * @returns {Node|undefined} The next node, or `undefined` if a next node couldn't be
   *  determined given the current state of the trap.
   */
  var findNextNavNode = function findNextNavNode(_ref2) {
    var target = _ref2.target,
      event = _ref2.event,
      _ref2$isBackward = _ref2.isBackward,
      isBackward = _ref2$isBackward === void 0 ? false : _ref2$isBackward;
    target = target || getActualTarget(event);
    updateTabbableNodes();
    var destinationNode = null;
    if (state.tabbableGroups.length > 0) {
      // make sure the target is actually contained in a group
      // NOTE: the target may also be the container itself if it's focusable
      //  with tabIndex='-1' and was given initial focus
      var containerIndex = findContainerIndex(target, event);
      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : undefined;
      if (containerIndex < 0) {
        // target not found in any group: quite possible focus has escaped the trap,
        //  so bring it back into...
        if (isBackward) {
          // ...the last node in the last group
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          // ...the first node in the first group
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (isBackward) {
        // REVERSE

        // is the target the first tabbable node in a group?
        var startOfGroupIndex = findIndex(state.tabbableGroups, function (_ref3) {
          var firstTabbableNode = _ref3.firstTabbableNode;
          return target === firstTabbableNode;
        });
        if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
          // an exception case where the target is either the container itself, or
          //  a non-tabbable node that was given focus (i.e. tabindex is negative
          //  and user clicked on it or node was programmatically given focus)
          //  and is not followed by any other tabbable node, in which
          //  case, we should handle shift+tab as if focus were on the container's
          //  first tabbable node, and go to the last tabbable node of the LAST group
          startOfGroupIndex = containerIndex;
        }
        if (startOfGroupIndex >= 0) {
          // YES: then shift+tab should go to the last tabbable node in the
          //  previous group (and wrap around to the last tabbable node of
          //  the LAST group if it's the first tabbable node of the FIRST group)
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = getTabIndex(target) >= 0 ? destinationGroup.lastTabbableNode : destinationGroup.lastDomTabbableNode;
        } else if (!isTabEvent(event)) {
          // user must have customized the nav keys so we have to move focus manually _within_
          //  the active group: do this based on the order determined by tabbable()
          destinationNode = containerGroup.nextTabbableNode(target, false);
        }
      } else {
        // FORWARD

        // is the target the last tabbable node in a group?
        var lastOfGroupIndex = findIndex(state.tabbableGroups, function (_ref4) {
          var lastTabbableNode = _ref4.lastTabbableNode;
          return target === lastTabbableNode;
        });
        if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
          // an exception case where the target is the container itself, or
          //  a non-tabbable node that was given focus (i.e. tabindex is negative
          //  and user clicked on it or node was programmatically given focus)
          //  and is not followed by any other tabbable node, in which
          //  case, we should handle tab as if focus were on the container's
          //  last tabbable node, and go to the first tabbable node of the FIRST group
          lastOfGroupIndex = containerIndex;
        }
        if (lastOfGroupIndex >= 0) {
          // YES: then tab should go to the first tabbable node in the next
          //  group (and wrap around to the first tabbable node of the FIRST
          //  group if it's the last tabbable node of the LAST group)
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = getTabIndex(target) >= 0 ? _destinationGroup.firstTabbableNode : _destinationGroup.firstDomTabbableNode;
        } else if (!isTabEvent(event)) {
          // user must have customized the nav keys so we have to move focus manually _within_
          //  the active group: do this based on the order determined by tabbable()
          destinationNode = containerGroup.nextTabbableNode(target);
        }
      }
    } else {
      // no groups available
      // NOTE: the fallbackFocus option does not support returning false to opt-out
      destinationNode = getNodeForOption('fallbackFocus');
    }
    return destinationNode;
  };

  // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.
  var checkPointerDown = function checkPointerDown(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target, e) >= 0) {
      // allow the click since it ocurred inside the trap
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      // immediately deactivate the trap
      trap.deactivate({
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked (and if not focusable, to "nothing"); by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node), whether the
        //  outside click was on a focusable node or not
        returnFocus: config.returnFocusOnDeactivate
      });
      return;
    }

    // This is needed for mobile devices.
    // (If we'll only let `click` events through,
    // then on mobile they will be blocked anyways if `touchstart` is blocked.)
    if (valueOrHandler(config.allowOutsideClick, e)) {
      // allow the click outside the trap to take place
      return;
    }

    // otherwise, prevent the click
    e.preventDefault();
  };

  // In case focus escapes the trap for some strange reason, pull it back in.
  // NOTE: the focusIn event is NOT cancelable, so if focus escapes, it may cause unexpected
  //  scrolling if the node that got focused was out of view; there's nothing we can do to
  //  prevent that from happening by the time we discover that focus escaped
  var checkFocusIn = function checkFocusIn(event) {
    var target = getActualTarget(event);
    var targetContained = findContainerIndex(target, event) >= 0;

    // In Firefox when you Tab out of an iframe the Document is briefly focused.
    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      // escaped! pull it back in to where it just left
      event.stopImmediatePropagation();

      // focus will escape if the MRU node had a positive tab index and user tried to nav forward;
      //  it will also escape if the MRU node had a 0 tab index and user tried to nav backward
      //  toward a node with a positive tab index
      var nextNode; // next node to focus, if we find one
      var navAcrossContainers = true;
      if (state.mostRecentlyFocusedNode) {
        if (getTabIndex(state.mostRecentlyFocusedNode) > 0) {
          // MRU container index must be >=0 otherwise we wouldn't have it as an MRU node...
          var mruContainerIdx = findContainerIndex(state.mostRecentlyFocusedNode);
          // there MAY not be any tabbable nodes in the container if there are at least 2 containers
          //  and the MRU node is focusable but not tabbable (focus-trap requires at least 1 container
          //  with at least one tabbable node in order to function, so this could be the other container
          //  with nothing tabbable in it)
          var tabbableNodes = state.containerGroups[mruContainerIdx].tabbableNodes;
          if (tabbableNodes.length > 0) {
            // MRU tab index MAY not be found if the MRU node is focusable but not tabbable
            var mruTabIdx = tabbableNodes.findIndex(function (node) {
              return node === state.mostRecentlyFocusedNode;
            });
            if (mruTabIdx >= 0) {
              if (config.isKeyForward(state.recentNavEvent)) {
                if (mruTabIdx + 1 < tabbableNodes.length) {
                  nextNode = tabbableNodes[mruTabIdx + 1];
                  navAcrossContainers = false;
                }
                // else, don't wrap within the container as focus should move to next/previous
                //  container
              } else {
                if (mruTabIdx - 1 >= 0) {
                  nextNode = tabbableNodes[mruTabIdx - 1];
                  navAcrossContainers = false;
                }
                // else, don't wrap within the container as focus should move to next/previous
                //  container
              }
              // else, don't find in container order without considering direction too
            }
          }
          // else, no tabbable nodes in that container (which means we must have at least one other
          //  container with at least one tabbable node in it, otherwise focus-trap would've thrown
          //  an error the last time updateTabbableNodes() was run): find next node among all known
          //  containers
        } else {
          // check to see if there's at least one tabbable node with a positive tab index inside
          //  the trap because focus seems to escape when navigating backward from a tabbable node
          //  with tabindex=0 when this is the case (instead of wrapping to the tabbable node with
          //  the greatest positive tab index like it should)
          if (!state.containerGroups.some(function (g) {
            return g.tabbableNodes.some(function (n) {
              return getTabIndex(n) > 0;
            });
          })) {
            // no containers with tabbable nodes with positive tab indexes which means the focus
            //  escaped for some other reason and we should just execute the fallback to the
            //  MRU node or initial focus node, if any
            navAcrossContainers = false;
          }
        }
      } else {
        // no MRU node means we're likely in some initial condition when the trap has just
        //  been activated and initial focus hasn't been given yet, in which case we should
        //  fall through to trying to focus the initial focus node, which is what should
        //  happen below at this point in the logic
        navAcrossContainers = false;
      }
      if (navAcrossContainers) {
        nextNode = findNextNavNode({
          // move FROM the MRU node, not event-related node (which will be the node that is
          //  outside the trap causing the focus escape we're trying to fix)
          target: state.mostRecentlyFocusedNode,
          isBackward: config.isKeyBackward(state.recentNavEvent)
        });
      }
      if (nextNode) {
        tryFocus(nextNode);
      } else {
        tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
      }
    }
    state.recentNavEvent = undefined; // clear
  };

  // Hijack key nav events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.
  var checkKeyNav = function checkKeyNav(event) {
    var isBackward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    state.recentNavEvent = event;
    var destinationNode = findNextNavNode({
      event: event,
      isBackward: isBackward
    });
    if (destinationNode) {
      if (isTabEvent(event)) {
        // since tab natively moves focus, we wouldn't have a destination node unless we
        //  were on the edge of a container and had to move to the next/previous edge, in
        //  which case we want to prevent default to keep the browser from moving focus
        //  to where it normally would
        event.preventDefault();
      }
      tryFocus(destinationNode);
    }
    // else, let the browser take care of [shift+]tab and move the focus
  };

  var checkKey = function checkKey(event) {
    if (isEscapeEvent(event) && valueOrHandler(config.escapeDeactivates, event) !== false) {
      event.preventDefault();
      trap.deactivate();
      return;
    }
    if (config.isKeyForward(event) || config.isKeyBackward(event)) {
      checkKeyNav(event, config.isKeyBackward(event));
    }
  };
  var checkClick = function checkClick(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target, e) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
  };

  //
  // EVENT LISTENERS
  //

  var addListeners = function addListeners() {
    if (!state.active) {
      return;
    }

    // There can be only one listening focus trap at a time
    activeFocusTraps.activateTrap(trapStack, trap);

    // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.
    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function () {
      tryFocus(getInitialFocusNode());
    }) : tryFocus(getInitialFocusNode());
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener('keydown', checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  };
  var removeListeners = function removeListeners() {
    if (!state.active) {
      return;
    }
    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);
    return trap;
  };

  //
  // MUTATION OBSERVER
  //

  var checkDomRemoval = function checkDomRemoval(mutations) {
    var isFocusedNodeRemoved = mutations.some(function (mutation) {
      var removedNodes = Array.from(mutation.removedNodes);
      return removedNodes.some(function (node) {
        return node === state.mostRecentlyFocusedNode;
      });
    });

    // If the currently focused is removed then browsers will move focus to the
    // <body> element. If this happens, try to move focus back into the trap.
    if (isFocusedNodeRemoved) {
      tryFocus(getInitialFocusNode());
    }
  };

  // Use MutationObserver - if supported - to detect if focused node is removed
  // from the DOM.
  var mutationObserver = typeof window !== 'undefined' && 'MutationObserver' in window ? new MutationObserver(checkDomRemoval) : undefined;
  var updateObservedNodes = function updateObservedNodes() {
    if (!mutationObserver) {
      return;
    }
    mutationObserver.disconnect();
    if (state.active && !state.paused) {
      state.containers.map(function (container) {
        mutationObserver.observe(container, {
          subtree: true,
          childList: true
        });
      });
    }
  };

  //
  // TRAP DEFINITION
  //

  trap = {
    get active() {
      return state.active;
    },
    get paused() {
      return state.paused;
    },
    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }
      var onActivate = getOption(activateOptions, 'onActivate');
      var onPostActivate = getOption(activateOptions, 'onPostActivate');
      var checkCanFocusTrap = getOption(activateOptions, 'checkCanFocusTrap');
      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }
      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;
      onActivate === null || onActivate === void 0 || onActivate();
      var finishActivation = function finishActivation() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }
        addListeners();
        updateObservedNodes();
        onPostActivate === null || onPostActivate === void 0 || onPostActivate();
      };
      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }
      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }
      var options = _objectSpread2({
        onDeactivate: config.onDeactivate,
        onPostDeactivate: config.onPostDeactivate,
        checkCanReturnFocus: config.checkCanReturnFocus
      }, deactivateOptions);
      clearTimeout(state.delayInitialFocusTimer); // noop if undefined
      state.delayInitialFocusTimer = undefined;
      removeListeners();
      state.active = false;
      state.paused = false;
      updateObservedNodes();
      activeFocusTraps.deactivateTrap(trapStack, trap);
      var onDeactivate = getOption(options, 'onDeactivate');
      var onPostDeactivate = getOption(options, 'onPostDeactivate');
      var checkCanReturnFocus = getOption(options, 'checkCanReturnFocus');
      var returnFocus = getOption(options, 'returnFocus', 'returnFocusOnDeactivate');
      onDeactivate === null || onDeactivate === void 0 || onDeactivate();
      var finishDeactivation = function finishDeactivation() {
        delay(function () {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }
          onPostDeactivate === null || onPostDeactivate === void 0 || onPostDeactivate();
        });
      };
      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }
      finishDeactivation();
      return this;
    },
    pause: function pause(pauseOptions) {
      if (state.paused || !state.active) {
        return this;
      }
      var onPause = getOption(pauseOptions, 'onPause');
      var onPostPause = getOption(pauseOptions, 'onPostPause');
      state.paused = true;
      onPause === null || onPause === void 0 || onPause();
      removeListeners();
      updateObservedNodes();
      onPostPause === null || onPostPause === void 0 || onPostPause();
      return this;
    },
    unpause: function unpause(unpauseOptions) {
      if (!state.paused || !state.active) {
        return this;
      }
      var onUnpause = getOption(unpauseOptions, 'onUnpause');
      var onPostUnpause = getOption(unpauseOptions, 'onPostUnpause');
      state.paused = false;
      onUnpause === null || onUnpause === void 0 || onUnpause();
      updateTabbableNodes();
      addListeners();
      updateObservedNodes();
      onPostUnpause === null || onPostUnpause === void 0 || onPostUnpause();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function (element) {
        return typeof element === 'string' ? doc.querySelector(element) : element;
      });
      if (state.active) {
        updateTabbableNodes();
      }
      updateObservedNodes();
      return this;
    }
  };

  // initialize container elements
  trap.updateContainerElements(elements);
  return trap;
};

const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<header>${validate_component(Card, "Card").$$render($$result, { class: "p-4" }, {}, {
    default: () => {
      return `<div class="m-auto flex w-full max-w-screen-xl items-center justify-between">${slots.default ? slots.default({}) : ``}</div>`;
    }
  })}</header>`;
});
const Header_logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<a href="/" class="group flex items-center gap-4" data-svelte-h="svelte-194oriu"><svg viewBox="0 0 205 200" xmlns="http://www.w3.org/2000/svg" class="h-9 sm:h-14"><g id="Bulbo"><path d="M113.41,66.31A43.93,43.93,0,0,0,69.33,110.5c0,7.21,1.28,10.53,1.28,10.53,4,13.94,11.13,16.53,14.19,24.21,4.45,11.2,4.78,22.59,5.16,26,.46,4.13,1.41,4.09,23.45,4.09s23,0,23.45-4.09c.37-3.37.71-14.76,5.16-26,3-7.68,10.19-10.27,14.18-24.21,0,0,1.28-3.32,1.28-10.53a43.92,43.92,0,0,0-44.07-44.19" transform="translate(-13.85 -17.21)" class="stroke-primary" style="fill:none;stroke-miterlimit:10;stroke-width:5.5px"></path><path d="M81,101a33.83,33.83,0,0,1,23.43-23.25" transform="translate(-13.85 -17.21)" class="stroke-primary" style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:5.5px"></path><path d="M92.17,183.92c10.19.71,18.49.55,21.17.55h.13c2.69,0,11,.16,21.17-.55" transform="translate(-13.85 -17.21)" class="stroke-primary" style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:7.5px"></path><path d="M95.35,194.18h36.11" transform="translate(-13.85 -17.21)" class="stroke-primary" style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:7.5px"></path><path d="M113.41,200.12c-14.65,0-15.88-.23-15.88,1.36,0,1.29,2.74,3.62,4.87,4.78,3.65,2,9,1.89,10.94,1.89h.13c1.94,0,7.29.12,11-1.89,2.12-1.16,4.87-3.49,4.87-4.78C129.29,199.89,128.06,200.11,113.41,200.12Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path></g><g id="Ingranaggi"><g id="Grande"><path d="M145,99.51c-2.29,1.35-4.61,2.86-7.28,3.18l-1.68-6a10.05,10.05,0,0,1,3.83-.91,28.49,28.49,0,0,1,4-.18L145,99.51Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M142.73,113.35c-2.62-.44-5.38-.78-7.62-2.24l2.54-5.65a10.31,10.31,0,0,1,3.52,1.76,28.78,28.78,0,0,1,3.21,2.46l-1.65,3.67Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M132.13,122.52c-1.73-2-3.63-4-4.41-6.62l5.59-2.69a10.4,10.4,0,0,1,1.56,3.61,28.29,28.29,0,0,1,.87,4l-3.61,1.75Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M118.11,122.72c0-2.66-.18-5.43.88-7.9l6,1.53a10.34,10.34,0,0,1-1.13,3.77,29.92,29.92,0,0,1-1.87,3.59l-3.89-1Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M107.23,113.87c1.7-2.06,3.36-4.27,5.76-5.49l3.62,5a10.24,10.24,0,0,1-3.29,2.17,28.8,28.8,0,0,1-3.74,1.55l-2.35-3.26Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M104.6,100.1c2.62-.49,5.32-1.11,7.93-.51l-.46,6.19a10.4,10.4,0,0,1-3.91-.46,29.69,29.69,0,0,1-3.86-1.22l.3-4Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M111.43,87.85c2.32,1.31,4.79,2.57,6.4,4.72L113.5,97a10.27,10.27,0,0,1-2.7-2.87,28.21,28.21,0,0,1-2.17-3.41l2.8-2.88Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M124.53,82.87c.94,2.49,2,5,1.88,7.72l-6.17.62a10.38,10.38,0,0,1-.23-3.93,29.39,29.39,0,0,1,.53-4l4-.4Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M137.78,87.47c-.89,2.51-1.7,5.16-3.53,7.12l-5.13-3.49a10.38,10.38,0,0,1,2.36-3.16,28.81,28.81,0,0,1,3-2.73l3.32,2.26Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><circle cx="110.96" cy="86.21" r="12.61" class="stroke-primary" style="fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:5.5px"></circle></g><g id="Piccolo"><circle cx="83.71" cy="106.39" r="7.57" class="stroke-primary" style="fill:none;stroke-miterlimit:10;stroke-width:4px"></circle><path d="M105,113.44a14.33,14.33,0,0,1-1.6,4.72L98.9,115.8a14.42,14.42,0,0,1,3-4l3.14,1.64Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M110.25,123.2a14.58,14.58,0,0,1-4.69,1.68l-1-5a14.53,14.53,0,0,1,5-.18l.68,3.49Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M105.87,133.37a14.63,14.63,0,0,1-4.24-2.62l3.31-3.87a14.61,14.61,0,0,1,3.24,3.79l-2.31,2.7Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M95.19,136.27a14.38,14.38,0,0,1-.59-4.94l5.08.18a14.26,14.26,0,0,1-1,4.89l-3.54-.13Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M86.26,129.72a14.4,14.4,0,0,1,3.51-3.54l3,4.09a14.57,14.57,0,0,1-4.42,2.31l-2.11-2.86Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M85.83,118.66a14.24,14.24,0,0,1,5,.54l-1.33,4.91a14.28,14.28,0,0,1-4.55-2l.92-3.42Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M94.23,111.43a14.74,14.74,0,0,1,2.66,4.22l-4.67,2A14.42,14.42,0,0,1,91,112.85l3.26-1.42Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path></g></g><g id="Raggi"><path d="M61.53,152.88,37.91,173.39c-4.31,3.47-9.28-3-4.83-6.26L59,149.53a2.12,2.12,0,0,1,2.58,3.35Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M47.79,96,17.05,90.2C11.66,89,13.62,81.09,19,82.54L48.82,91.9a2.12,2.12,0,0,1-1,4.11Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M82.78,50.51l-15-27.45a4,4,0,1,1,7.14-3.38l11.71,29a2.12,2.12,0,0,1-3.82,1.81Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M167.86,149.53l25.87,17.6c4.45,3.29-.5,9.73-4.82,6.26l-23.63-20.51a2.12,2.12,0,0,1,2.58-3.35Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M178,91.9l29.86-9.36c5.33-1.46,7.32,6.42,1.92,7.66L179,96a2.12,2.12,0,0,1-1-4.11Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path><path d="M140.22,48.7l11.71-29c2.26-5,9.61-1.58,7.14,3.38L144,50.51a2.12,2.12,0,0,1-3.82-1.81Z" transform="translate(-13.85 -17.21)" class="fill-primary"></path></g></svg> </a>`;
});
const Header_menu_links = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<nav><ul class="flex gap-4 sm:gap-8"><li><a href="/projects" class="${"text-center text-lg font-bold hover:text-primary sm:text-xl " + escape($page.url.pathname === "/projects" ? "text-primary" : "", true)}">Projects</a></li> <li><a href="/apps" class="${"text-center text-lg font-bold hover:text-primary sm:text-xl " + escape($page.url.pathname === "/apps" ? "text-primary" : "", true)}">Apps</a></li> <li><a href="/mix" class="${"text-center text-lg font-bold hover:text-primary sm:text-xl " + escape($page.url.pathname === "/mix" ? "text-primary" : "", true)}">Mix</a></li></ul></nav>`;
});
function last(array) {
  return array[array.length - 1];
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
function addHighlight(element) {
  element.setAttribute("data-highlighted", "");
}
function removeHighlight(element) {
  element.removeAttribute("data-highlighted");
}
const overridable = (_store, onChange) => {
  const store = withGet(_store);
  const update2 = (updater, sideEffect) => {
    store.update((curr) => {
      const next = updater(curr);
      let res = next;
      if (onChange) {
        res = onChange({ curr, next });
      }
      sideEffect?.(res);
      return res;
    });
  };
  const set = (curr) => {
    update2(() => curr);
  };
  return {
    ...store,
    update: update2,
    set
  };
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function generateId$1() {
  return nanoid(10);
}
function generateIds(args) {
  return args.reduce((acc, curr) => {
    acc[curr] = generateId$1();
    return acc;
  }, {});
}
function debounce(fn, wait = 500) {
  let timeout = null;
  return function(...args) {
    const later = () => {
      timeout = null;
      fn(...args);
    };
    timeout && clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
const isDom = () => typeof window !== "undefined";
function getPlatform() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
const pt = (v) => isDom() && v.test(getPlatform().toLowerCase());
const isTouchDevice = () => isDom() && !!navigator.maxTouchPoints;
const isMac = () => pt(/^mac/) && !isTouchDevice();
const isApple = () => pt(/mac|iphone|ipad|ipod/i);
const isIos = () => isApple() && !isMac();
const LOCK_CLASSNAME = "data-melt-scroll-lock";
function assignStyle(el, style) {
  if (!el)
    return;
  const previousStyle = el.style.cssText;
  Object.assign(el.style, style);
  return () => {
    el.style.cssText = previousStyle;
  };
}
function setCSSProperty(el, property, value) {
  if (!el)
    return;
  const previousValue = el.style.getPropertyValue(property);
  el.style.setProperty(property, value);
  return () => {
    if (previousValue) {
      el.style.setProperty(property, previousValue);
    } else {
      el.style.removeProperty(property);
    }
  };
}
function getPaddingProperty(documentElement) {
  const documentLeft = documentElement.getBoundingClientRect().left;
  const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
  return scrollbarX ? "paddingLeft" : "paddingRight";
}
function removeScroll(_document) {
  const doc = document;
  const win = doc.defaultView ?? window;
  const { documentElement, body } = doc;
  const locked = body.hasAttribute(LOCK_CLASSNAME);
  if (locked)
    return noop;
  body.setAttribute(LOCK_CLASSNAME, "");
  const scrollbarWidth = win.innerWidth - documentElement.clientWidth;
  const setScrollbarWidthProperty = () => setCSSProperty(documentElement, "--scrollbar-width", `${scrollbarWidth}px`);
  const paddingProperty = getPaddingProperty(documentElement);
  const scrollbarSidePadding = win.getComputedStyle(body)[paddingProperty];
  const setStyle = () => assignStyle(body, {
    overflow: "hidden",
    [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
  });
  const setIOSStyle = () => {
    const { scrollX, scrollY, visualViewport } = win;
    const offsetLeft = visualViewport?.offsetLeft ?? 0;
    const offsetTop = visualViewport?.offsetTop ?? 0;
    const restoreStyle = assignStyle(body, {
      position: "fixed",
      overflow: "hidden",
      top: `${-(scrollY - Math.floor(offsetTop))}px`,
      left: `${-(scrollX - Math.floor(offsetLeft))}px`,
      right: "0",
      [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
    });
    return () => {
      restoreStyle?.();
      win.scrollTo(scrollX, scrollY);
    };
  };
  const cleanups = [setScrollbarWidthProperty(), isIos() ? setIOSStyle() : setStyle()];
  return () => {
    cleanups.forEach((fn) => fn?.());
    body.removeAttribute(LOCK_CLASSNAME);
  };
}
function derivedVisible(obj) {
  const { open, forceVisible, activeTrigger } = obj;
  return derived([open, forceVisible, activeTrigger], ([$open, $forceVisible, $activeTrigger]) => ($open || $forceVisible) && $activeTrigger !== null);
}
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = withGet(writable(value));
  });
  return result;
}
function handleRovingFocus(nextElement) {
  if (!isBrowser)
    return;
  sleep(1).then(() => {
    const currentFocusedElement = document.activeElement;
    if (!isHTMLElement$1(currentFocusedElement) || currentFocusedElement === nextElement)
      return;
    currentFocusedElement.tabIndex = -1;
    if (nextElement) {
      nextElement.tabIndex = 0;
      nextElement.focus();
    }
  });
}
function getFocusableElements() {
  return Array.from(document.querySelectorAll('a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'));
}
function getNextFocusable(currentElement) {
  const focusableElements = getFocusableElements();
  const currentIndex = focusableElements.indexOf(currentElement);
  const nextIndex = currentIndex + 1;
  const nextElement = focusableElements[nextIndex];
  if (nextIndex < focusableElements.length && isHTMLElement$1(nextElement)) {
    return nextElement;
  }
  return null;
}
function getPreviousFocusable(currentElement) {
  const focusableElements = getFocusableElements();
  const currentIndex = focusableElements.indexOf(currentElement);
  const previousIndex = currentIndex - 1;
  const prevElement = focusableElements[previousIndex];
  if (previousIndex >= 0 && isHTMLElement$1(prevElement)) {
    return prevElement;
  }
  return null;
}
const ignoredKeys = /* @__PURE__ */ new Set(["Shift", "Control", "Alt", "Meta", "CapsLock", "NumLock"]);
const defaults$3 = {
  onMatch: handleRovingFocus,
  getCurrentItem: () => document.activeElement
};
function createTypeaheadSearch(args = {}) {
  const withDefaults = { ...defaults$3, ...args };
  const typed = withGet(writable([]));
  const resetTyped = debounce(() => {
    typed.update(() => []);
  });
  const handleTypeaheadSearch = (key, items) => {
    if (ignoredKeys.has(key))
      return;
    const currentItem = withDefaults.getCurrentItem();
    const $typed = get_store_value(typed);
    if (!Array.isArray($typed)) {
      return;
    }
    $typed.push(key.toLowerCase());
    typed.set($typed);
    const candidateItems = items.filter((item) => {
      if (item.getAttribute("disabled") === "true" || item.getAttribute("aria-disabled") === "true" || item.hasAttribute("data-disabled")) {
        return false;
      }
      return true;
    });
    const isRepeated = $typed.length > 1 && $typed.every((char) => char === $typed[0]);
    const normalizeSearch = isRepeated ? $typed[0] : $typed.join("");
    const currentItemIndex = isHTMLElement$1(currentItem) ? candidateItems.indexOf(currentItem) : -1;
    let wrappedItems = wrapArray(candidateItems, Math.max(currentItemIndex, 0));
    const excludeCurrentItem = normalizeSearch.length === 1;
    if (excludeCurrentItem) {
      wrappedItems = wrappedItems.filter((v) => v !== currentItem);
    }
    const nextItem = wrappedItems.find((item) => item?.innerText && item.innerText.toLowerCase().startsWith(normalizeSearch.toLowerCase()));
    if (isHTMLElement$1(nextItem) && nextItem !== currentItem) {
      withDefaults.onMatch(nextItem);
    }
    resetTyped();
  };
  return {
    typed,
    resetTyped,
    handleTypeaheadSearch
  };
}
function getPortalParent(node) {
  let parent = node.parentElement;
  while (isHTMLElement$1(parent) && !parent.hasAttribute("data-portal")) {
    parent = parent.parentElement;
  }
  return parent || "body";
}
function getPortalDestination(node, portalProp) {
  if (portalProp !== void 0)
    return portalProp;
  const portalParent = getPortalParent(node);
  if (portalParent === "body")
    return document.body;
  return null;
}
async function handleFocus(args) {
  const { prop, defaultEl } = args;
  await Promise.all([sleep(1), tick]);
  if (prop === void 0) {
    defaultEl?.focus();
    return;
  }
  const returned = isFunction(prop) ? prop(defaultEl) : prop;
  if (typeof returned === "string") {
    const el = document.querySelector(returned);
    if (!isHTMLElement$1(el))
      return;
    el.focus();
  } else if (isHTMLElement$1(returned)) {
    returned.focus();
  }
}
const defaultConfig$1 = {
  strategy: "absolute",
  placement: "top",
  gutter: 5,
  flip: true,
  sameWidth: false,
  overflowPadding: 8
};
const ARROW_TRANSFORM = {
  bottom: "rotate(45deg)",
  left: "rotate(135deg)",
  top: "rotate(225deg)",
  right: "rotate(315deg)"
};
function useFloating(reference, floating, opts = {}) {
  if (!floating || !reference || opts === null)
    return {
      destroy: noop
    };
  const options = { ...defaultConfig$1, ...opts };
  const arrowEl = floating.querySelector("[data-arrow=true]");
  const middleware = [];
  if (options.flip) {
    middleware.push(flip({
      boundary: options.boundary,
      padding: options.overflowPadding
    }));
  }
  const arrowOffset = isHTMLElement$1(arrowEl) ? arrowEl.offsetHeight / 2 : 0;
  if (options.gutter || options.offset) {
    const data = options.gutter ? { mainAxis: options.gutter } : options.offset;
    if (data?.mainAxis != null) {
      data.mainAxis += arrowOffset;
    }
    middleware.push(offset(data));
  }
  middleware.push(shift({
    boundary: options.boundary,
    crossAxis: options.overlap,
    padding: options.overflowPadding
  }));
  if (arrowEl) {
    middleware.push(arrow({ element: arrowEl, padding: 8 }));
  }
  middleware.push(size({
    padding: options.overflowPadding,
    apply({ rects, availableHeight, availableWidth }) {
      if (options.sameWidth) {
        Object.assign(floating.style, {
          width: `${Math.round(rects.reference.width)}px`,
          minWidth: "unset"
        });
      }
      if (options.fitViewport) {
        Object.assign(floating.style, {
          maxWidth: `${availableWidth}px`,
          maxHeight: `${availableHeight}px`
        });
      }
    }
  }));
  function compute() {
    if (!reference || !floating)
      return;
    if (isHTMLElement$1(reference) && !reference.ownerDocument.documentElement.contains(reference))
      return;
    const { placement, strategy } = options;
    computePosition(reference, floating, {
      placement,
      middleware,
      strategy
    }).then((data) => {
      const x = Math.round(data.x);
      const y = Math.round(data.y);
      const [side, align] = getSideAndAlignFromPlacement(data.placement);
      floating.setAttribute("data-side", side);
      floating.setAttribute("data-align", align);
      Object.assign(floating.style, {
        position: options.strategy,
        top: `${y}px`,
        left: `${x}px`
      });
      if (isHTMLElement$1(arrowEl) && data.middlewareData.arrow) {
        const { x: x2, y: y2 } = data.middlewareData.arrow;
        const dir = data.placement.split("-")[0];
        arrowEl.setAttribute("data-side", dir);
        Object.assign(arrowEl.style, {
          position: "absolute",
          left: x2 != null ? `${x2}px` : "",
          top: y2 != null ? `${y2}px` : "",
          [dir]: `calc(100% - ${arrowOffset}px)`,
          transform: ARROW_TRANSFORM[dir],
          backgroundColor: "inherit",
          zIndex: "inherit"
        });
      }
      return data;
    });
  }
  Object.assign(floating.style, {
    position: options.strategy
  });
  return {
    destroy: autoUpdate(reference, floating, compute)
  };
}
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
function createFocusTrap(config = {}) {
  let trap;
  const { immediate, ...focusTrapOptions } = config;
  const hasFocus = writable(false);
  const isPaused = writable(false);
  const activate = (opts) => trap?.activate(opts);
  const deactivate = (opts) => {
    trap?.deactivate(opts);
  };
  const pause = () => {
    if (trap) {
      trap.pause();
      isPaused.set(true);
    }
  };
  const unpause = () => {
    if (trap) {
      trap.unpause();
      isPaused.set(false);
    }
  };
  const useFocusTrap = (node) => {
    trap = createFocusTrap$1(node, {
      ...focusTrapOptions,
      onActivate() {
        hasFocus.set(true);
        config.onActivate?.();
      },
      onDeactivate() {
        hasFocus.set(false);
        config.onDeactivate?.();
      }
    });
    if (immediate) {
      activate();
    }
    return {
      destroy() {
        deactivate();
        trap = void 0;
      }
    };
  };
  return {
    useFocusTrap,
    hasFocus: readonly(hasFocus),
    isPaused: readonly(isPaused),
    activate,
    deactivate,
    pause,
    unpause
  };
}
const visibleModals = [];
const useModal = (node, config) => {
  let unsubInteractOutside = noop;
  function removeNodeFromVisibleModals() {
    const index = visibleModals.indexOf(node);
    if (index >= 0) {
      visibleModals.splice(index, 1);
    }
  }
  function update2(config2) {
    unsubInteractOutside();
    const { open, onClose, shouldCloseOnInteractOutside, closeOnInteractOutside } = config2;
    sleep(100).then(() => {
      if (open) {
        visibleModals.push(node);
      } else {
        removeNodeFromVisibleModals();
      }
    });
    function isLastModal() {
      return last(visibleModals) === node;
    }
    function closeModal() {
      if (isLastModal() && onClose) {
        onClose();
        removeNodeFromVisibleModals();
      }
    }
    function onInteractOutsideStart(e) {
      const target = e.target;
      if (!isElement$1(target))
        return;
      if (target && isLastModal()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
    function onInteractOutside(e) {
      if (shouldCloseOnInteractOutside?.(e) && isLastModal()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        closeModal();
      }
    }
    unsubInteractOutside = useInteractOutside(node, {
      onInteractOutsideStart,
      onInteractOutside: closeOnInteractOutside ? onInteractOutside : void 0,
      enabled: open
    }).destroy;
  }
  update2(config);
  return {
    update: update2,
    destroy() {
      removeNodeFromVisibleModals();
      unsubInteractOutside();
    }
  };
};
const defaultConfig = {
  floating: {},
  focusTrap: {},
  modal: {},
  escapeKeydown: {},
  portal: "body"
};
const usePopper = (popperElement, args) => {
  popperElement.dataset.escapee = "";
  const { anchorElement, open, options } = args;
  if (!anchorElement || !open || !options) {
    return { destroy: noop };
  }
  const opts = { ...defaultConfig, ...options };
  const callbacks = [];
  if (opts.portal !== null) {
    callbacks.push(usePortal(popperElement, opts.portal).destroy);
  }
  callbacks.push(useFloating(anchorElement, popperElement, opts.floating).destroy);
  if (opts.focusTrap !== null) {
    const { useFocusTrap } = createFocusTrap({
      immediate: true,
      escapeDeactivates: false,
      allowOutsideClick: true,
      returnFocusOnDeactivate: false,
      fallbackFocus: popperElement,
      ...opts.focusTrap
    });
    callbacks.push(useFocusTrap(popperElement).destroy);
  }
  if (opts.modal !== null) {
    callbacks.push(useModal(popperElement, {
      onClose: () => {
        if (isHTMLElement$1(anchorElement)) {
          open.set(false);
          anchorElement.focus();
        }
      },
      shouldCloseOnInteractOutside: (e) => {
        if (e.defaultPrevented)
          return false;
        if (isHTMLElement$1(anchorElement) && anchorElement.contains(e.target)) {
          return false;
        }
        return true;
      },
      ...opts.modal
    }).destroy);
  }
  if (opts.escapeKeydown !== null) {
    callbacks.push(useEscapeKeydown(popperElement, {
      enabled: open,
      handler: () => {
        open.set(false);
      },
      ...opts.escapeKeydown
    }).destroy);
  }
  const unsubscribe = executeCallbacks(...callbacks);
  return {
    destroy() {
      unsubscribe();
    }
  };
};
const usePortal = (el, target = "body") => {
  let targetEl;
  if (!isHTMLElement$1(target) && typeof target !== "string") {
    return {
      destroy: noop
    };
  }
  async function update2(newTarget) {
    target = newTarget;
    if (typeof target === "string") {
      targetEl = document.querySelector(target);
      if (targetEl === null) {
        await tick();
        targetEl = document.querySelector(target);
      }
      if (targetEl === null) {
        throw new Error(`No element found matching css selector: "${target}"`);
      }
    } else if (target instanceof HTMLElement) {
      targetEl = target;
    } else {
      throw new TypeError(`Unknown portal target type: ${target === null ? "null" : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`);
    }
    el.dataset.portal = "";
    targetEl.appendChild(el);
    el.hidden = false;
  }
  function destroy() {
    el.remove();
  }
  update2(target);
  return {
    update: update2,
    destroy
  };
};
const useInteractOutside = (node, config) => {
  let unsub = noop;
  let unsubClick = noop;
  let isPointerDown = false;
  let isPointerDownInside = false;
  let ignoreEmulatedMouseEvents = false;
  function update2(config2) {
    unsub();
    unsubClick();
    const { onInteractOutside, onInteractOutsideStart, enabled } = config2;
    if (!enabled)
      return;
    function onPointerDown(e) {
      if (onInteractOutside && isValidEvent(e, node)) {
        onInteractOutsideStart?.(e);
      }
      const target = e.target;
      if (isElement$1(target) && isOrContainsTarget(node, target)) {
        isPointerDownInside = true;
      }
      isPointerDown = true;
    }
    function triggerInteractOutside(e) {
      onInteractOutside?.(e);
    }
    const documentObj = getOwnerDocument(node);
    if (typeof PointerEvent !== "undefined") {
      const onPointerUp = (e) => {
        unsubClick();
        const handler = (e2) => {
          if (shouldTriggerInteractOutside(e2)) {
            triggerInteractOutside(e2);
          }
          resetPointerState();
        };
        if (e.pointerType === "touch") {
          unsubClick = addEventListener(documentObj, "click", handler, {
            capture: true,
            once: true
          });
          return;
        }
        handler(e);
      };
      unsub = executeCallbacks(addEventListener(documentObj, "pointerdown", onPointerDown, true), addEventListener(documentObj, "pointerup", onPointerUp, true));
    } else {
      const onMouseUp = (e) => {
        if (ignoreEmulatedMouseEvents) {
          ignoreEmulatedMouseEvents = false;
        } else if (shouldTriggerInteractOutside(e)) {
          triggerInteractOutside(e);
        }
        resetPointerState();
      };
      const onTouchEnd = (e) => {
        ignoreEmulatedMouseEvents = true;
        if (shouldTriggerInteractOutside(e)) {
          triggerInteractOutside(e);
        }
        resetPointerState();
      };
      unsub = executeCallbacks(addEventListener(documentObj, "mousedown", onPointerDown, true), addEventListener(documentObj, "mouseup", onMouseUp, true), addEventListener(documentObj, "touchstart", onPointerDown, true), addEventListener(documentObj, "touchend", onTouchEnd, true));
    }
  }
  function shouldTriggerInteractOutside(e) {
    if (isPointerDown && !isPointerDownInside && isValidEvent(e, node)) {
      return true;
    }
    return false;
  }
  function resetPointerState() {
    isPointerDown = false;
    isPointerDownInside = false;
  }
  update2(config);
  return {
    update: update2,
    destroy() {
      unsub();
      unsubClick();
    }
  };
};
function isValidEvent(e, node) {
  if ("button" in e && e.button > 0)
    return false;
  const target = e.target;
  if (!isElement$1(target))
    return false;
  const ownerDocument = target.ownerDocument;
  if (!ownerDocument || !ownerDocument.documentElement.contains(target)) {
    return false;
  }
  return node && !isOrContainsTarget(node, target);
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return el?.ownerDocument ?? document;
}
const SUB_OPEN_KEYS = {
  ltr: [...SELECTION_KEYS, kbd.ARROW_RIGHT],
  rtl: [...SELECTION_KEYS, kbd.ARROW_LEFT]
};
const SUB_CLOSE_KEYS = {
  ltr: [kbd.ARROW_LEFT],
  rtl: [kbd.ARROW_RIGHT]
};
const menuIdParts = ["menu", "trigger"];
const defaults$2 = {
  arrowSize: 8,
  positioning: {
    placement: "bottom"
  },
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  portal: void 0,
  loop: false,
  dir: "ltr",
  defaultOpen: false,
  typeahead: true,
  closeOnItemClick: true,
  onOutsideClick: void 0
};
function createMenuBuilder(opts) {
  const { name, selector } = createElHelpers(opts.selector);
  const { preventScroll, arrowSize, positioning, closeOnEscape, closeOnOutsideClick, portal, forceVisible, typeahead, loop, closeFocus, disableFocusFirstItem, closeOnItemClick, onOutsideClick } = opts.rootOptions;
  const rootOpen = opts.rootOpen;
  const rootActiveTrigger = opts.rootActiveTrigger;
  const nextFocusable = opts.nextFocusable;
  const prevFocusable = opts.prevFocusable;
  const isUsingKeyboard = withGet.writable(false);
  const lastPointerX = withGet(writable(0));
  const pointerGraceIntent = withGet(writable(null));
  const pointerDir = withGet(writable("right"));
  const currentFocusedItem = withGet(writable(null));
  const pointerMovingToSubmenu = withGet(derived([pointerDir, pointerGraceIntent], ([$pointerDir, $pointerGraceIntent]) => {
    return (e) => {
      const isMovingTowards = $pointerDir === $pointerGraceIntent?.side;
      return isMovingTowards && isPointerInGraceArea(e, $pointerGraceIntent?.area);
    };
  }));
  const { typed, handleTypeaheadSearch } = createTypeaheadSearch();
  const rootIds = toWritableStores({ ...generateIds(menuIdParts), ...opts.ids });
  const isVisible = derivedVisible({
    open: rootOpen,
    forceVisible,
    activeTrigger: rootActiveTrigger
  });
  const rootMenu = makeElement(name(), {
    stores: [isVisible, portal, rootIds.menu, rootIds.trigger],
    returned: ([$isVisible, $portal, $rootMenuId, $rootTriggerId]) => {
      return {
        role: "menu",
        hidden: $isVisible ? void 0 : true,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        id: $rootMenuId,
        "aria-labelledby": $rootTriggerId,
        "data-state": $isVisible ? "open" : "closed",
        "data-portal": portalAttr($portal),
        tabindex: -1
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubDerived = effect([isVisible, rootActiveTrigger, positioning, closeOnOutsideClick, portal, closeOnEscape], ([$isVisible, $rootActiveTrigger, $positioning, $closeOnOutsideClick, $portal, $closeOnEscape]) => {
        unsubPopper();
        if (!$isVisible || !$rootActiveTrigger)
          return;
        tick().then(() => {
          unsubPopper();
          setMeltMenuAttribute(node, selector);
          unsubPopper = usePopper(node, {
            anchorElement: $rootActiveTrigger,
            open: rootOpen,
            options: {
              floating: $positioning,
              modal: {
                closeOnInteractOutside: $closeOnOutsideClick,
                shouldCloseOnInteractOutside: (e) => {
                  onOutsideClick.get()?.(e);
                  if (e.defaultPrevented)
                    return false;
                  if (isHTMLElement$1($rootActiveTrigger) && $rootActiveTrigger.contains(e.target)) {
                    return false;
                  }
                  return true;
                },
                onClose: () => {
                  rootOpen.set(false);
                  $rootActiveTrigger.focus();
                },
                open: $isVisible
              },
              portal: getPortalDestination(node, $portal),
              escapeKeydown: $closeOnEscape ? void 0 : null
            }
          }).destroy;
        });
      });
      const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
        const target = e.target;
        const menuEl = e.currentTarget;
        if (!isHTMLElement$1(target) || !isHTMLElement$1(menuEl))
          return;
        const isKeyDownInside = target.closest('[role="menu"]') === menuEl;
        if (!isKeyDownInside)
          return;
        if (FIRST_LAST_KEYS.includes(e.key)) {
          handleMenuNavigation(e, loop.get() ?? false);
        }
        if (e.key === kbd.TAB) {
          e.preventDefault();
          rootOpen.set(false);
          handleTabNavigation(e, nextFocusable, prevFocusable);
          return;
        }
        const isCharacterKey = e.key.length === 1;
        const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
        if (!isModifierKey && isCharacterKey && typeahead.get() === true) {
          handleTypeaheadSearch(e.key, getMenuItems(menuEl));
        }
      }));
      return {
        destroy() {
          unsubDerived();
          unsubEvents();
          unsubPopper();
        }
      };
    }
  });
  const rootTrigger = makeElement(name("trigger"), {
    stores: [rootOpen, rootIds.menu, rootIds.trigger],
    returned: ([$rootOpen, $rootMenuId, $rootTriggerId]) => {
      return {
        "aria-controls": $rootMenuId,
        "aria-expanded": $rootOpen,
        "data-state": $rootOpen ? "open" : "closed",
        id: $rootTriggerId,
        tabindex: 0
      };
    },
    action: (node) => {
      applyAttrsIfDisabled(node);
      rootActiveTrigger.update((p) => {
        if (p)
          return p;
        return node;
      });
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        const $rootOpen = rootOpen.get();
        const triggerEl = e.currentTarget;
        if (!isHTMLElement$1(triggerEl))
          return;
        handleOpen(triggerEl);
        if (!$rootOpen)
          e.preventDefault();
      }), addMeltEventListener(node, "keydown", (e) => {
        const triggerEl = e.currentTarget;
        if (!isHTMLElement$1(triggerEl))
          return;
        if (!(SELECTION_KEYS.includes(e.key) || e.key === kbd.ARROW_DOWN))
          return;
        e.preventDefault();
        handleOpen(triggerEl);
        const menuId = triggerEl.getAttribute("aria-controls");
        if (!menuId)
          return;
        const menu = document.getElementById(menuId);
        if (!menu)
          return;
        const menuItems = getMenuItems(menu);
        if (!menuItems.length)
          return;
        handleRovingFocus(menuItems[0]);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const rootArrow = makeElement(name("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  const overlay = makeElement(name("overlay"), {
    stores: [isVisible],
    returned: ([$isVisible]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        "aria-hidden": "true",
        "data-state": stateAttr($isVisible)
      };
    },
    action: (node) => {
      let unsubEscapeKeydown = noop;
      if (closeOnEscape.get()) {
        const escapeKeydown = useEscapeKeydown(node, {
          handler: () => {
            rootOpen.set(false);
            const $rootActiveTrigger = rootActiveTrigger.get();
            if ($rootActiveTrigger)
              $rootActiveTrigger.focus();
          }
        });
        if (escapeKeydown && escapeKeydown.destroy) {
          unsubEscapeKeydown = escapeKeydown.destroy;
        }
      }
      const unsubPortal = effect([portal], ([$portal]) => {
        if ($portal === null)
          return noop;
        const portalDestination = getPortalDestination(node, $portal);
        if (portalDestination === null)
          return noop;
        return usePortal(node, portalDestination).destroy;
      });
      return {
        destroy() {
          unsubEscapeKeydown();
          unsubPortal();
        }
      };
    }
  });
  const item = makeElement(name("item"), {
    returned: () => {
      return {
        role: "menuitem",
        tabindex: -1,
        "data-orientation": "vertical"
      };
    },
    action: (node) => {
      setMeltMenuAttribute(node, selector);
      applyAttrsIfDisabled(node);
      const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
        const itemEl = e.currentTarget;
        if (!isHTMLElement$1(itemEl))
          return;
        if (isElementDisabled(itemEl)) {
          e.preventDefault();
          return;
        }
      }), addMeltEventListener(node, "click", (e) => {
        const itemEl = e.currentTarget;
        if (!isHTMLElement$1(itemEl))
          return;
        if (isElementDisabled(itemEl)) {
          e.preventDefault();
          return;
        }
        if (e.defaultPrevented) {
          handleRovingFocus(itemEl);
          return;
        }
        if (closeOnItemClick.get()) {
          sleep(1).then(() => {
            rootOpen.set(false);
          });
        }
      }), addMeltEventListener(node, "keydown", (e) => {
        onItemKeyDown(e);
      }), addMeltEventListener(node, "pointermove", (e) => {
        onMenuItemPointerMove(e);
      }), addMeltEventListener(node, "pointerleave", (e) => {
        onMenuItemPointerLeave(e);
      }), addMeltEventListener(node, "focusin", (e) => {
        onItemFocusIn(e);
      }), addMeltEventListener(node, "focusout", (e) => {
        onItemFocusOut(e);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const group = makeElement(name("group"), {
    returned: () => {
      return (groupId) => ({
        role: "group",
        "aria-labelledby": groupId
      });
    }
  });
  const groupLabel = makeElement(name("group-label"), {
    returned: () => {
      return (groupId) => ({
        id: groupId
      });
    }
  });
  const checkboxItemDefaults = {
    defaultChecked: false,
    disabled: false
  };
  const createCheckboxItem = (props) => {
    const withDefaults = { ...checkboxItemDefaults, ...props };
    const checkedWritable = withDefaults.checked ?? writable(withDefaults.defaultChecked ?? null);
    const checked = overridable(checkedWritable, withDefaults.onCheckedChange);
    const disabled = writable(withDefaults.disabled);
    const checkboxItem = makeElement(name("checkbox-item"), {
      stores: [checked, disabled],
      returned: ([$checked, $disabled]) => {
        return {
          role: "menuitemcheckbox",
          tabindex: -1,
          "data-orientation": "vertical",
          "aria-checked": isIndeterminate($checked) ? "mixed" : $checked ? "true" : "false",
          "data-disabled": disabledAttr($disabled),
          "data-state": getCheckedState($checked)
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        applyAttrsIfDisabled(node);
        const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement$1(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            e.preventDefault();
            return;
          }
        }), addMeltEventListener(node, "click", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement$1(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            e.preventDefault();
            return;
          }
          if (e.defaultPrevented) {
            handleRovingFocus(itemEl);
            return;
          }
          checked.update((prev) => {
            if (isIndeterminate(prev))
              return true;
            return !prev;
          });
          if (closeOnItemClick.get()) {
            tick().then(() => {
              rootOpen.set(false);
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          onItemKeyDown(e);
        }), addMeltEventListener(node, "pointermove", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement$1(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            onItemLeave(e);
            return;
          }
          onMenuItemPointerMove(e, itemEl);
        }), addMeltEventListener(node, "pointerleave", (e) => {
          onMenuItemPointerLeave(e);
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          onItemFocusOut(e);
        }));
        return {
          destroy: unsub
        };
      }
    });
    const isChecked = derived(checked, ($checked) => $checked === true);
    const _isIndeterminate = derived(checked, ($checked) => $checked === "indeterminate");
    return {
      elements: {
        checkboxItem
      },
      states: {
        checked
      },
      helpers: {
        isChecked,
        isIndeterminate: _isIndeterminate
      },
      options: {
        disabled
      }
    };
  };
  const createMenuRadioGroup = (args = {}) => {
    const valueWritable = args.value ?? writable(args.defaultValue ?? null);
    const value = overridable(valueWritable, args.onValueChange);
    const radioGroup = makeElement(name("radio-group"), {
      returned: () => ({
        role: "group"
      })
    });
    const radioItemDefaults = {
      disabled: false
    };
    const radioItem = makeElement(name("radio-item"), {
      stores: [value],
      returned: ([$value]) => {
        return (itemProps) => {
          const { value: itemValue, disabled } = { ...radioItemDefaults, ...itemProps };
          const checked = $value === itemValue;
          return {
            disabled,
            role: "menuitemradio",
            "data-state": checked ? "checked" : "unchecked",
            "aria-checked": checked,
            "data-disabled": disabledAttr(disabled),
            "data-value": itemValue,
            "data-orientation": "vertical",
            tabindex: -1
          };
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement$1(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            e.preventDefault();
            return;
          }
        }), addMeltEventListener(node, "click", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement$1(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            e.preventDefault();
            return;
          }
          if (e.defaultPrevented) {
            if (!isHTMLElement$1(itemEl))
              return;
            handleRovingFocus(itemEl);
            return;
          }
          value.set(itemValue);
          if (closeOnItemClick.get()) {
            tick().then(() => {
              rootOpen.set(false);
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          onItemKeyDown(e);
        }), addMeltEventListener(node, "pointermove", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement$1(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            onItemLeave(e);
            return;
          }
          onMenuItemPointerMove(e, itemEl);
        }), addMeltEventListener(node, "pointerleave", (e) => {
          onMenuItemPointerLeave(e);
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          onItemFocusOut(e);
        }));
        return {
          destroy: unsub
        };
      }
    });
    const isChecked = derived(value, ($value) => {
      return (itemValue) => {
        return $value === itemValue;
      };
    });
    return {
      elements: {
        radioGroup,
        radioItem
      },
      states: {
        value
      },
      helpers: {
        isChecked
      }
    };
  };
  const { elements: { root: separator } } = createSeparator({
    orientation: "horizontal"
  });
  const subMenuDefaults = {
    ...defaults$2,
    disabled: false,
    positioning: {
      placement: "right-start",
      gutter: 8
    }
  };
  const createSubmenu = (args) => {
    const withDefaults = { ...subMenuDefaults, ...args };
    const subOpenWritable = withDefaults.open ?? writable(false);
    const subOpen = overridable(subOpenWritable, withDefaults?.onOpenChange);
    const options = toWritableStores(omit(withDefaults, "ids"));
    const { positioning: positioning2, arrowSize: arrowSize2, disabled } = options;
    const subActiveTrigger = withGet(writable(null));
    const subOpenTimer = withGet(writable(null));
    const pointerGraceTimer = withGet(writable(0));
    const subIds = toWritableStores({ ...generateIds(menuIdParts), ...withDefaults.ids });
    safeOnMount(() => {
      const subTrigger2 = document.getElementById(subIds.trigger.get());
      if (subTrigger2) {
        subActiveTrigger.set(subTrigger2);
      }
    });
    const subIsVisible = derivedVisible({
      open: subOpen,
      forceVisible,
      activeTrigger: subActiveTrigger
    });
    const subMenu = makeElement(name("submenu"), {
      stores: [subIsVisible, subIds.menu, subIds.trigger],
      returned: ([$subIsVisible, $subMenuId, $subTriggerId]) => {
        return {
          role: "menu",
          hidden: $subIsVisible ? void 0 : true,
          style: styleToString({
            display: $subIsVisible ? void 0 : "none"
          }),
          id: $subMenuId,
          "aria-labelledby": $subTriggerId,
          "data-state": $subIsVisible ? "open" : "closed",
          // unit tests fail on `.closest` if the id starts with a number
          // so using a data attribute
          "data-id": $subMenuId,
          tabindex: -1
        };
      },
      action: (node) => {
        let unsubPopper = noop;
        const unsubDerived = effect([subIsVisible, positioning2], ([$subIsVisible, $positioning]) => {
          unsubPopper();
          if (!$subIsVisible)
            return;
          const activeTrigger = subActiveTrigger.get();
          if (!activeTrigger)
            return;
          tick().then(() => {
            unsubPopper();
            const parentMenuEl = getParentMenu(activeTrigger);
            unsubPopper = usePopper(node, {
              anchorElement: activeTrigger,
              open: subOpen,
              options: {
                floating: $positioning,
                portal: isHTMLElement$1(parentMenuEl) ? parentMenuEl : void 0,
                modal: null,
                focusTrap: null,
                escapeKeydown: null
              }
            }).destroy;
          });
        });
        const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
          if (e.key === kbd.ESCAPE) {
            return;
          }
          const target = e.target;
          const menuEl = e.currentTarget;
          if (!isHTMLElement$1(target) || !isHTMLElement$1(menuEl))
            return;
          const isKeyDownInside = target.closest('[role="menu"]') === menuEl;
          if (!isKeyDownInside)
            return;
          if (FIRST_LAST_KEYS.includes(e.key)) {
            e.stopImmediatePropagation();
            handleMenuNavigation(e, loop.get() ?? false);
            return;
          }
          const isCloseKey = SUB_CLOSE_KEYS["ltr"].includes(e.key);
          const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
          const isCharacterKey = e.key.length === 1;
          if (isCloseKey) {
            const $subActiveTrigger = subActiveTrigger.get();
            e.preventDefault();
            subOpen.update(() => {
              if ($subActiveTrigger) {
                handleRovingFocus($subActiveTrigger);
              }
              return false;
            });
            return;
          }
          if (e.key === kbd.TAB) {
            e.preventDefault();
            rootOpen.set(false);
            handleTabNavigation(e, nextFocusable, prevFocusable);
            return;
          }
          if (!isModifierKey && isCharacterKey && typeahead.get() === true) {
            handleTypeaheadSearch(e.key, getMenuItems(menuEl));
          }
        }), addMeltEventListener(node, "pointermove", (e) => {
          onMenuPointerMove(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          const $subActiveTrigger = subActiveTrigger.get();
          if (isUsingKeyboard.get()) {
            const target = e.target;
            const submenuEl = document.getElementById(subIds.menu.get());
            if (!isHTMLElement$1(submenuEl) || !isHTMLElement$1(target))
              return;
            if (!submenuEl.contains(target) && target !== $subActiveTrigger) {
              subOpen.set(false);
            }
          } else {
            const menuEl = e.currentTarget;
            const relatedTarget = e.relatedTarget;
            if (!isHTMLElement$1(relatedTarget) || !isHTMLElement$1(menuEl))
              return;
            if (!menuEl.contains(relatedTarget) && relatedTarget !== $subActiveTrigger) {
              subOpen.set(false);
            }
          }
        }));
        return {
          destroy() {
            unsubDerived();
            unsubPopper();
            unsubEvents();
          }
        };
      }
    });
    const subTrigger = makeElement(name("subtrigger"), {
      stores: [subOpen, disabled, subIds.menu, subIds.trigger],
      returned: ([$subOpen, $disabled, $subMenuId, $subTriggerId]) => {
        return {
          role: "menuitem",
          id: $subTriggerId,
          tabindex: -1,
          "aria-controls": $subMenuId,
          "aria-expanded": $subOpen,
          "data-state": $subOpen ? "open" : "closed",
          "data-disabled": disabledAttr($disabled),
          "aria-haspopop": "menu"
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        applyAttrsIfDisabled(node);
        subActiveTrigger.update((p) => {
          if (p)
            return p;
          return node;
        });
        const unsubTimer = () => {
          clearTimerStore(subOpenTimer);
          window.clearTimeout(pointerGraceTimer.get());
          pointerGraceIntent.set(null);
        };
        const unsubEvents = executeCallbacks(addMeltEventListener(node, "click", (e) => {
          if (e.defaultPrevented)
            return;
          const triggerEl = e.currentTarget;
          if (!isHTMLElement$1(triggerEl) || isElementDisabled(triggerEl))
            return;
          handleRovingFocus(triggerEl);
          if (!subOpen.get()) {
            subOpen.update((prev) => {
              const isAlreadyOpen = prev;
              if (!isAlreadyOpen) {
                subActiveTrigger.set(triggerEl);
                return !prev;
              }
              return prev;
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          const $typed = typed.get();
          const triggerEl = e.currentTarget;
          if (!isHTMLElement$1(triggerEl) || isElementDisabled(triggerEl))
            return;
          const isTypingAhead = $typed.length > 0;
          if (isTypingAhead && e.key === kbd.SPACE)
            return;
          if (SUB_OPEN_KEYS["ltr"].includes(e.key)) {
            if (!subOpen.get()) {
              triggerEl.click();
              e.preventDefault();
              return;
            }
            const menuId = triggerEl.getAttribute("aria-controls");
            if (!menuId)
              return;
            const menuEl = document.getElementById(menuId);
            if (!isHTMLElement$1(menuEl))
              return;
            const firstItem = getMenuItems(menuEl)[0];
            handleRovingFocus(firstItem);
          }
        }), addMeltEventListener(node, "pointermove", (e) => {
          if (!isMouse(e))
            return;
          onItemEnter(e);
          if (e.defaultPrevented)
            return;
          const triggerEl = e.currentTarget;
          if (!isHTMLElement$1(triggerEl))
            return;
          if (!isFocusWithinSubmenu(subIds.menu.get())) {
            handleRovingFocus(triggerEl);
          }
          const openTimer = subOpenTimer.get();
          if (!subOpen.get() && !openTimer && !isElementDisabled(triggerEl)) {
            subOpenTimer.set(window.setTimeout(() => {
              subOpen.update(() => {
                subActiveTrigger.set(triggerEl);
                return true;
              });
              clearTimerStore(subOpenTimer);
            }, 100));
          }
        }), addMeltEventListener(node, "pointerleave", (e) => {
          if (!isMouse(e))
            return;
          clearTimerStore(subOpenTimer);
          const submenuEl = document.getElementById(subIds.menu.get());
          const contentRect = submenuEl?.getBoundingClientRect();
          if (contentRect) {
            const side = submenuEl?.dataset.side;
            const rightSide = side === "right";
            const bleed = rightSide ? -5 : 5;
            const contentNearEdge = contentRect[rightSide ? "left" : "right"];
            const contentFarEdge = contentRect[rightSide ? "right" : "left"];
            pointerGraceIntent.set({
              area: [
                // Apply a bleed on clientX to ensure that our exit point is
                // consistently within polygon bounds
                { x: e.clientX + bleed, y: e.clientY },
                { x: contentNearEdge, y: contentRect.top },
                { x: contentFarEdge, y: contentRect.top },
                { x: contentFarEdge, y: contentRect.bottom },
                { x: contentNearEdge, y: contentRect.bottom }
              ],
              side
            });
            window.clearTimeout(pointerGraceTimer.get());
            pointerGraceTimer.set(window.setTimeout(() => {
              pointerGraceIntent.set(null);
            }, 300));
          } else {
            onTriggerLeave(e);
            if (e.defaultPrevented)
              return;
            pointerGraceIntent.set(null);
          }
        }), addMeltEventListener(node, "focusout", (e) => {
          const triggerEl = e.currentTarget;
          if (!isHTMLElement$1(triggerEl))
            return;
          removeHighlight(triggerEl);
          const relatedTarget = e.relatedTarget;
          if (!isHTMLElement$1(relatedTarget))
            return;
          const menuId = triggerEl.getAttribute("aria-controls");
          if (!menuId)
            return;
          const menu = document.getElementById(menuId);
          if (menu && !menu.contains(relatedTarget)) {
            subOpen.set(false);
          }
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }));
        return {
          destroy() {
            unsubTimer();
            unsubEvents();
          }
        };
      }
    });
    const subArrow = makeElement(name("subarrow"), {
      stores: arrowSize2,
      returned: ($arrowSize) => ({
        "data-arrow": true,
        style: styleToString({
          position: "absolute",
          width: `var(--arrow-size, ${$arrowSize}px)`,
          height: `var(--arrow-size, ${$arrowSize}px)`
        })
      })
    });
    effect([rootOpen], ([$rootOpen]) => {
      if (!$rootOpen) {
        subActiveTrigger.set(null);
        subOpen.set(false);
      }
    });
    effect([pointerGraceIntent], ([$pointerGraceIntent]) => {
      if (!isBrowser || $pointerGraceIntent)
        return;
      window.clearTimeout(pointerGraceTimer.get());
    });
    effect([subOpen], ([$subOpen]) => {
      if (!isBrowser)
        return;
      if ($subOpen && isUsingKeyboard.get()) {
        sleep(1).then(() => {
          const menuEl = document.getElementById(subIds.menu.get());
          if (!menuEl)
            return;
          const menuItems = getMenuItems(menuEl);
          if (!menuItems.length)
            return;
          handleRovingFocus(menuItems[0]);
        });
      }
      if (!$subOpen) {
        const focusedItem = currentFocusedItem.get();
        const subTriggerEl = document.getElementById(subIds.trigger.get());
        if (focusedItem) {
          sleep(1).then(() => {
            const menuEl = document.getElementById(subIds.menu.get());
            if (!menuEl)
              return;
            if (menuEl.contains(focusedItem)) {
              removeHighlight(focusedItem);
            }
          });
        }
        if (!subTriggerEl || document.activeElement === subTriggerEl)
          return;
        removeHighlight(subTriggerEl);
      }
    });
    return {
      ids: subIds,
      elements: {
        subTrigger,
        subMenu,
        subArrow
      },
      states: {
        subOpen
      },
      options
    };
  };
  safeOnMount(() => {
    const triggerEl = document.getElementById(rootIds.trigger.get());
    if (isHTMLElement$1(triggerEl) && rootOpen.get()) {
      rootActiveTrigger.set(triggerEl);
    }
    const unsubs = [];
    const handlePointer = () => isUsingKeyboard.set(false);
    const handleKeyDown = () => {
      isUsingKeyboard.set(true);
      unsubs.push(executeCallbacks(addEventListener(document, "pointerdown", handlePointer, { capture: true, once: true }), addEventListener(document, "pointermove", handlePointer, { capture: true, once: true })));
    };
    const keydownListener = (e) => {
      if (e.key === kbd.ESCAPE && closeOnEscape.get()) {
        rootOpen.set(false);
        return;
      }
    };
    unsubs.push(addEventListener(document, "keydown", handleKeyDown, { capture: true }));
    unsubs.push(addEventListener(document, "keydown", keydownListener));
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  effect([rootOpen, currentFocusedItem], ([$rootOpen, $currentFocusedItem]) => {
    if (!$rootOpen && $currentFocusedItem) {
      removeHighlight($currentFocusedItem);
    }
  });
  effect([rootOpen], ([$rootOpen]) => {
    if (!isBrowser)
      return;
    if (!$rootOpen) {
      const $rootActiveTrigger = rootActiveTrigger.get();
      if (!$rootActiveTrigger)
        return;
      const $closeFocus = closeFocus.get();
      if (!$rootOpen && $rootActiveTrigger) {
        handleFocus({ prop: $closeFocus, defaultEl: $rootActiveTrigger });
      }
    }
  });
  effect([rootOpen, preventScroll], ([$rootOpen, $preventScroll]) => {
    if (!isBrowser)
      return;
    const unsubs = [];
    if ($rootOpen && $preventScroll) {
      unsubs.push(removeScroll());
    }
    sleep(1).then(() => {
      const menuEl = document.getElementById(rootIds.menu.get());
      if (menuEl && $rootOpen && isUsingKeyboard.get()) {
        if (disableFocusFirstItem.get()) {
          handleRovingFocus(menuEl);
          return;
        }
        const menuItems = getMenuItems(menuEl);
        if (!menuItems.length)
          return;
        handleRovingFocus(menuItems[0]);
      }
    });
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  effect(rootOpen, ($rootOpen) => {
    if (!isBrowser)
      return;
    const handlePointer = () => isUsingKeyboard.set(false);
    const handleKeyDown = (e) => {
      isUsingKeyboard.set(true);
      if (e.key === kbd.ESCAPE && $rootOpen && closeOnEscape.get()) {
        rootOpen.set(false);
        return;
      }
    };
    return executeCallbacks(addEventListener(document, "pointerdown", handlePointer, { capture: true, once: true }), addEventListener(document, "pointermove", handlePointer, { capture: true, once: true }), addEventListener(document, "keydown", handleKeyDown, { capture: true }));
  });
  function handleOpen(triggerEl) {
    rootOpen.update((prev) => {
      const isOpen = !prev;
      if (isOpen) {
        nextFocusable.set(getNextFocusable(triggerEl));
        prevFocusable.set(getPreviousFocusable(triggerEl));
        rootActiveTrigger.set(triggerEl);
      }
      return isOpen;
    });
  }
  function onItemFocusIn(e) {
    const itemEl = e.currentTarget;
    if (!isHTMLElement$1(itemEl))
      return;
    const $currentFocusedItem = currentFocusedItem.get();
    if ($currentFocusedItem) {
      removeHighlight($currentFocusedItem);
    }
    addHighlight(itemEl);
    currentFocusedItem.set(itemEl);
  }
  function onItemFocusOut(e) {
    const itemEl = e.currentTarget;
    if (!isHTMLElement$1(itemEl))
      return;
    removeHighlight(itemEl);
  }
  function onItemEnter(e) {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  }
  function onItemLeave(e) {
    if (isPointerMovingToSubmenu(e)) {
      return;
    }
    const target = e.target;
    if (!isHTMLElement$1(target))
      return;
    const parentMenuEl = getParentMenu(target);
    if (!parentMenuEl)
      return;
    handleRovingFocus(parentMenuEl);
  }
  function onTriggerLeave(e) {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  }
  function onMenuPointerMove(e) {
    if (!isMouse(e))
      return;
    const target = e.target;
    const currentTarget = e.currentTarget;
    if (!isHTMLElement$1(currentTarget) || !isHTMLElement$1(target))
      return;
    const $lastPointerX = lastPointerX.get();
    const pointerXHasChanged = $lastPointerX !== e.clientX;
    if (currentTarget.contains(target) && pointerXHasChanged) {
      const newDir = e.clientX > $lastPointerX ? "right" : "left";
      pointerDir.set(newDir);
      lastPointerX.set(e.clientX);
    }
  }
  function onMenuItemPointerMove(e, currTarget = null) {
    if (!isMouse(e))
      return;
    onItemEnter(e);
    if (e.defaultPrevented)
      return;
    if (currTarget) {
      handleRovingFocus(currTarget);
      return;
    }
    const currentTarget = e.currentTarget;
    if (!isHTMLElement$1(currentTarget))
      return;
    handleRovingFocus(currentTarget);
  }
  function onMenuItemPointerLeave(e) {
    if (!isMouse(e))
      return;
    onItemLeave(e);
  }
  function onItemKeyDown(e) {
    const $typed = typed.get();
    const isTypingAhead = $typed.length > 0;
    if (isTypingAhead && e.key === kbd.SPACE) {
      e.preventDefault();
      return;
    }
    if (SELECTION_KEYS.includes(e.key)) {
      e.preventDefault();
      const itemEl = e.currentTarget;
      if (!isHTMLElement$1(itemEl))
        return;
      itemEl.click();
    }
  }
  function isIndeterminate(checked) {
    return checked === "indeterminate";
  }
  function getCheckedState(checked) {
    return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
  }
  function isPointerMovingToSubmenu(e) {
    return pointerMovingToSubmenu.get()(e);
  }
  function getParentMenu(element) {
    const parentMenuEl = element.closest('[role="menu"]');
    if (!isHTMLElement$1(parentMenuEl))
      return null;
    return parentMenuEl;
  }
  return {
    elements: {
      trigger: rootTrigger,
      menu: rootMenu,
      overlay,
      item,
      group,
      groupLabel,
      arrow: rootArrow,
      separator
    },
    builders: {
      createCheckboxItem,
      createSubmenu,
      createMenuRadioGroup
    },
    states: {
      open: rootOpen
    },
    helpers: {
      handleTypeaheadSearch
    },
    ids: rootIds,
    options: opts.rootOptions
  };
}
function handleTabNavigation(e, nextFocusable, prevFocusable) {
  if (e.shiftKey) {
    const $prevFocusable = prevFocusable.get();
    if ($prevFocusable) {
      e.preventDefault();
      sleep(1).then(() => $prevFocusable.focus());
      prevFocusable.set(null);
    }
  } else {
    const $nextFocusable = nextFocusable.get();
    if ($nextFocusable) {
      e.preventDefault();
      sleep(1).then(() => $nextFocusable.focus());
      nextFocusable.set(null);
    }
  }
}
function getMenuItems(menuElement) {
  return Array.from(menuElement.querySelectorAll(`[data-melt-menu-id="${menuElement.id}"]`)).filter((item) => isHTMLElement$1(item));
}
function applyAttrsIfDisabled(element) {
  if (!element || !isElementDisabled(element))
    return;
  element.setAttribute("data-disabled", "");
  element.setAttribute("aria-disabled", "true");
}
function clearTimerStore(timerStore) {
  if (!isBrowser)
    return;
  const timer = timerStore.get();
  if (timer) {
    window.clearTimeout(timer);
    timerStore.set(null);
  }
}
function isMouse(e) {
  return e.pointerType === "mouse";
}
function setMeltMenuAttribute(element, selector) {
  if (!element)
    return;
  const menuEl = element.closest(`${selector()}, ${selector("submenu")}`);
  if (!isHTMLElement$1(menuEl))
    return;
  element.setAttribute("data-melt-menu-id", menuEl.id);
}
function handleMenuNavigation(e, loop) {
  e.preventDefault();
  const currentFocusedItem = document.activeElement;
  const currentTarget = e.currentTarget;
  if (!isHTMLElement$1(currentFocusedItem) || !isHTMLElement$1(currentTarget))
    return;
  const menuItems = getMenuItems(currentTarget);
  if (!menuItems.length)
    return;
  const candidateNodes = menuItems.filter((item) => {
    if (item.hasAttribute("data-disabled") || item.getAttribute("disabled") === "true") {
      return false;
    }
    return true;
  });
  const currentIndex = candidateNodes.indexOf(currentFocusedItem);
  let nextIndex;
  switch (e.key) {
    case kbd.ARROW_DOWN:
      if (loop) {
        nextIndex = currentIndex < candidateNodes.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex < candidateNodes.length - 1 ? currentIndex + 1 : currentIndex;
      }
      break;
    case kbd.ARROW_UP:
      if (loop) {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : candidateNodes.length - 1;
      } else {
        nextIndex = currentIndex < 0 ? candidateNodes.length - 1 : currentIndex > 0 ? currentIndex - 1 : 0;
      }
      break;
    case kbd.HOME:
      nextIndex = 0;
      break;
    case kbd.END:
      nextIndex = candidateNodes.length - 1;
      break;
    default:
      return;
  }
  handleRovingFocus(candidateNodes[nextIndex]);
}
function isPointerInGraceArea(e, area) {
  if (!area)
    return false;
  const cursorPos = { x: e.clientX, y: e.clientY };
  return isPointInPolygon(cursorPos, area);
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function isFocusWithinSubmenu(submenuId) {
  const activeEl = document.activeElement;
  if (!isHTMLElement$1(activeEl))
    return false;
  const submenuEl = activeEl.closest(`[data-id="${submenuId}"]`);
  return isHTMLElement$1(submenuEl);
}
function stateAttr(open) {
  return open ? "open" : "closed";
}
const defaults$1 = {
  arrowSize: 8,
  positioning: {
    placement: "bottom"
  },
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  portal: void 0,
  loop: false,
  dir: "ltr",
  defaultOpen: false,
  forceVisible: false,
  typeahead: true,
  closeFocus: void 0,
  disableFocusFirstItem: false,
  closeOnItemClick: true,
  onOutsideClick: void 0
};
function createDropdownMenu(props) {
  const withDefaults = { ...defaults$1, ...props };
  const rootOptions = toWritableStores(omit(withDefaults, "ids"));
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const rootOpen = overridable(openWritable, withDefaults?.onOpenChange);
  const rootActiveTrigger = withGet(writable(null));
  const nextFocusable = withGet(writable(null));
  const prevFocusable = withGet(writable(null));
  const { elements, builders, ids, states, options } = createMenuBuilder({
    rootOptions,
    rootOpen,
    rootActiveTrigger: withGet(rootActiveTrigger),
    nextFocusable: withGet(nextFocusable),
    prevFocusable: withGet(prevFocusable),
    selector: "dropdown-menu",
    removeScroll: true,
    ids: withDefaults.ids
  });
  return {
    ids,
    elements,
    states,
    builders,
    options
  };
}
const defaults = {
  orientation: "horizontal",
  decorative: false
};
const createSeparator = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(withDefaults);
  const { orientation, decorative } = options;
  const root = makeElement("separator", {
    stores: [orientation, decorative],
    returned: ([$orientation, $decorative]) => {
      const ariaOrientation = $orientation === "vertical" ? $orientation : void 0;
      return {
        role: $decorative ? "none" : "separator",
        "aria-orientation": ariaOrientation,
        "aria-hidden": $decorative,
        "data-orientation": $orientation
      };
    }
  });
  return {
    elements: {
      root
    },
    options
  };
};
function generateId() {
  return nanoid(10);
}
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function getOptionUpdater(options) {
  return function(key, value) {
    if (value === void 0)
      return;
    const store = options[key];
    if (store) {
      store.set(value);
    }
  };
}
function getPositioningUpdater(store) {
  return (props = {}) => {
    return updatePositioning$1(store, props);
  };
}
function updatePositioning$1(store, props) {
  const defaultPositioningProps = {
    side: "bottom",
    align: "center",
    sideOffset: 0,
    alignOffset: 0,
    sameWidth: false,
    avoidCollisions: true,
    collisionPadding: 8,
    fitViewport: false,
    strategy: "absolute",
    overlap: false
  };
  const withDefaults = { ...defaultPositioningProps, ...props };
  store.update((prev) => {
    return {
      ...prev,
      placement: joinPlacement(withDefaults.side, withDefaults.align),
      offset: {
        ...prev.offset,
        mainAxis: withDefaults.sideOffset,
        crossAxis: withDefaults.alignOffset
      },
      gutter: 0,
      sameWidth: withDefaults.sameWidth,
      flip: withDefaults.avoidCollisions,
      overflowPadding: withDefaults.collisionPadding,
      boundary: withDefaults.collisionBoundary,
      fitViewport: withDefaults.fitViewport,
      strategy: withDefaults.strategy,
      overlap: withDefaults.overlap
    };
  });
}
function joinPlacement(side, align) {
  if (align === "center")
    return side;
  return `${side}-${align}`;
}
function getMenuData() {
  const NAME = "menu";
  const SUB_NAME = "menu-submenu";
  const RADIO_GROUP_NAME = "menu-radiogroup";
  const CHECKBOX_ITEM_NAME = "menu-checkboxitem";
  const RADIO_ITEM_NAME = "menu-radioitem";
  const GROUP_NAME = "menu-group";
  const PARTS = [
    "arrow",
    "checkbox-indicator",
    "checkbox-item",
    "content",
    "group",
    "item",
    "label",
    "radio-group",
    "radio-item",
    "radio-indicator",
    "separator",
    "sub-content",
    "sub-trigger",
    "trigger"
  ];
  return {
    NAME,
    SUB_NAME,
    RADIO_GROUP_NAME,
    CHECKBOX_ITEM_NAME,
    RADIO_ITEM_NAME,
    GROUP_NAME,
    PARTS
  };
}
function getCtx() {
  const { NAME } = getMenuData();
  return getContext(NAME);
}
function setCtx(props) {
  const { NAME, PARTS } = getMenuData();
  const getAttrs = createBitAttrs("menu", PARTS);
  const dropdownMenu = {
    ...createDropdownMenu({ ...removeUndefined(props), forceVisible: true }),
    getAttrs
  };
  setContext(NAME, dropdownMenu);
  return {
    ...dropdownMenu,
    updateOption: getOptionUpdater(dropdownMenu.options)
  };
}
function setGroupCtx() {
  const { GROUP_NAME } = getMenuData();
  const { elements: { group }, getAttrs } = getCtx();
  const id = generateId();
  setContext(GROUP_NAME, id);
  return { group, id, getAttrs };
}
function getGroupLabel() {
  const { GROUP_NAME } = getMenuData();
  const id = getContext(GROUP_NAME) ?? generateId();
  const { elements: { groupLabel }, getAttrs } = getCtx();
  return { groupLabel, id, getAttrs };
}
function updatePositioning(props) {
  const defaultPlacement = {
    side: "bottom",
    align: "center"
  };
  const withDefaults = { ...defaultPlacement, ...props };
  const { options: { positioning } } = getCtx();
  const updater = getPositioningUpdater(positioning);
  updater(withDefaults);
}
const Menu_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let attrs;
  let $$restProps = compute_rest_props($$props, ["href", "asChild", "disabled", "el"]);
  let $item, $$unsubscribe_item;
  let { href = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { disabled = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { item }, getAttrs } = getCtx();
  $$unsubscribe_item = subscribe(item, (value) => $item = value);
  createDispatcher();
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $item;
  attrs = {
    ...getAttrs("item"),
    ...disabledAttrs(disabled)
  };
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_item();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `${((tag) => {
    return tag ? `<${href ? "a" : "div"}${spread(
      [
        { href: escape_attribute_value(href) },
        escape_object(builder),
        escape_object($$restProps)
      ],
      {}
    )}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({ builder }) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "div")}`}`;
});
const Menu_group = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $group, $$unsubscribe_group;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { group, id, getAttrs } = setGroupCtx();
  $$unsubscribe_group = subscribe(group, (value) => $group = value);
  const attrs = getAttrs("group");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $group(id);
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_group();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Menu_label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $groupLabel, $$unsubscribe_groupLabel;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { groupLabel, id, getAttrs } = getGroupLabel();
  $$unsubscribe_groupLabel = subscribe(groupLabel, (value) => $groupLabel = value);
  const attrs = getAttrs("label");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $groupLabel(id);
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_groupLabel();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Menu_separator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $separator, $$unsubscribe_separator;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { separator }, getAttrs } = getCtx();
  $$unsubscribe_separator = subscribe(separator, (value) => $separator = value);
  const attrs = getAttrs("separator");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $separator;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_separator();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object($separator), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>`}`;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { closeOnOutsideClick = void 0 } = $$props;
  let { closeOnEscape = void 0 } = $$props;
  let { portal = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { preventScroll = void 0 } = $$props;
  let { loop = void 0 } = $$props;
  let { dir = void 0 } = $$props;
  let { typeahead = void 0 } = $$props;
  let { closeFocus = void 0 } = $$props;
  let { disableFocusFirstItem = void 0 } = $$props;
  let { closeOnItemClick = void 0 } = $$props;
  let { onOutsideClick = void 0 } = $$props;
  const { states: { open: localOpen }, updateOption, ids } = setCtx({
    closeOnOutsideClick,
    closeOnEscape,
    portal,
    forceVisible: true,
    defaultOpen: open,
    preventScroll,
    loop,
    dir,
    typeahead,
    closeFocus,
    disableFocusFirstItem,
    closeOnItemClick,
    onOutsideClick,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.menu, ids.trigger], ([$menuId, $triggerId]) => ({ menu: $menuId, trigger: $triggerId }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.closeOnOutsideClick === void 0 && $$bindings.closeOnOutsideClick && closeOnOutsideClick !== void 0) $$bindings.closeOnOutsideClick(closeOnOutsideClick);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0) $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0) $$bindings.portal(portal);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0) $$bindings.onOpenChange(onOpenChange);
  if ($$props.preventScroll === void 0 && $$bindings.preventScroll && preventScroll !== void 0) $$bindings.preventScroll(preventScroll);
  if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0) $$bindings.loop(loop);
  if ($$props.dir === void 0 && $$bindings.dir && dir !== void 0) $$bindings.dir(dir);
  if ($$props.typeahead === void 0 && $$bindings.typeahead && typeahead !== void 0) $$bindings.typeahead(typeahead);
  if ($$props.closeFocus === void 0 && $$bindings.closeFocus && closeFocus !== void 0) $$bindings.closeFocus(closeFocus);
  if ($$props.disableFocusFirstItem === void 0 && $$bindings.disableFocusFirstItem && disableFocusFirstItem !== void 0) $$bindings.disableFocusFirstItem(disableFocusFirstItem);
  if ($$props.closeOnItemClick === void 0 && $$bindings.closeOnItemClick && closeOnItemClick !== void 0) $$bindings.closeOnItemClick(closeOnItemClick);
  if ($$props.onOutsideClick === void 0 && $$bindings.onOutsideClick && onOutsideClick !== void 0) $$bindings.onOutsideClick(onOutsideClick);
  open !== void 0 && localOpen.set(open);
  {
    updateOption("closeOnOutsideClick", closeOnOutsideClick);
  }
  {
    updateOption("closeOnEscape", closeOnEscape);
  }
  {
    updateOption("portal", portal);
  }
  {
    updateOption("preventScroll", preventScroll);
  }
  {
    updateOption("loop", loop);
  }
  {
    updateOption("dir", dir);
  }
  {
    updateOption("closeFocus", closeFocus);
  }
  {
    updateOption("disableFocusFirstItem", disableFocusFirstItem);
  }
  {
    updateOption("typeahead", typeahead);
  }
  {
    updateOption("closeOnItemClick", closeOnItemClick);
  }
  {
    updateOption("onOutsideClick", onOutsideClick);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const Menu_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id",
    "side",
    "align",
    "sideOffset",
    "alignOffset",
    "collisionPadding",
    "avoidCollisions",
    "collisionBoundary",
    "sameWidth",
    "fitViewport",
    "strategy",
    "overlap",
    "el"
  ]);
  let $open, $$unsubscribe_open;
  let $menu, $$unsubscribe_menu;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { side = "bottom" } = $$props;
  let { align = "center" } = $$props;
  let { sideOffset = 0 } = $$props;
  let { alignOffset = 0 } = $$props;
  let { collisionPadding = 8 } = $$props;
  let { avoidCollisions = true } = $$props;
  let { collisionBoundary = void 0 } = $$props;
  let { sameWidth = false } = $$props;
  let { fitViewport = false } = $$props;
  let { strategy = "absolute" } = $$props;
  let { overlap = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { menu }, states: { open }, ids, getAttrs } = getCtx();
  $$unsubscribe_menu = subscribe(menu, (value) => $menu = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  createDispatcher();
  const attrs = getAttrs("content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0) $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0) $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0) $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0) $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.side === void 0 && $$bindings.side && side !== void 0) $$bindings.side(side);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0) $$bindings.align(align);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0) $$bindings.sideOffset(sideOffset);
  if ($$props.alignOffset === void 0 && $$bindings.alignOffset && alignOffset !== void 0) $$bindings.alignOffset(alignOffset);
  if ($$props.collisionPadding === void 0 && $$bindings.collisionPadding && collisionPadding !== void 0) $$bindings.collisionPadding(collisionPadding);
  if ($$props.avoidCollisions === void 0 && $$bindings.avoidCollisions && avoidCollisions !== void 0) $$bindings.avoidCollisions(avoidCollisions);
  if ($$props.collisionBoundary === void 0 && $$bindings.collisionBoundary && collisionBoundary !== void 0) $$bindings.collisionBoundary(collisionBoundary);
  if ($$props.sameWidth === void 0 && $$bindings.sameWidth && sameWidth !== void 0) $$bindings.sameWidth(sameWidth);
  if ($$props.fitViewport === void 0 && $$bindings.fitViewport && fitViewport !== void 0) $$bindings.fitViewport(fitViewport);
  if ($$props.strategy === void 0 && $$bindings.strategy && strategy !== void 0) $$bindings.strategy(strategy);
  if ($$props.overlap === void 0 && $$bindings.overlap && overlap !== void 0) $$bindings.overlap(overlap);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.menu.set(id);
    }
  }
  builder = $menu;
  {
    Object.assign(builder, attrs);
  }
  {
    if ($open) {
      updatePositioning({
        side,
        align,
        sideOffset,
        alignOffset,
        collisionPadding,
        avoidCollisions,
        collisionBoundary,
        sameWidth,
        fitViewport,
        strategy,
        overlap
      });
    }
  }
  $$unsubscribe_open();
  $$unsubscribe_menu();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Menu_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, ids, getAttrs } = getCtx();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getAttrs("trigger");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.trigger.set(id);
    }
  }
  builder = $trigger;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_trigger();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const Dropdown_menu_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "inset"]);
  let { class: className = void 0 } = $$props;
  let { inset = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.inset === void 0 && $$bindings.inset && inset !== void 0) $$bindings.inset(inset);
  return `${validate_component(Menu_item, "DropdownMenuPrimitive.Item").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Dropdown_menu_label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "inset"]);
  let { class: className = void 0 } = $$props;
  let { inset = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.inset === void 0 && $$bindings.inset && inset !== void 0) $$bindings.inset(inset);
  return `${validate_component(Menu_label, "DropdownMenuPrimitive.Label").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Dropdown_menu_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "sideOffset", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { sideOffset = 4 } = $$props;
  let { transition = flyAndScale } = $$props;
  let { transitionConfig = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0) $$bindings.sideOffset(sideOffset);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Menu_content, "DropdownMenuPrimitive.Content").$$render(
    $$result,
    Object.assign(
      {},
      { transition },
      { transitionConfig },
      { sideOffset },
      {
        class: cn("bg-popover text-popover-foreground z-50 min-w-[8rem] rounded-md border p-1 shadow-md focus:outline-none", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Dropdown_menu_separator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Menu_separator, "DropdownMenuPrimitive.Separator").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("bg-muted -mx-1 my-1 h-px", className)
      },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const Root = Menu;
const Trigger = Menu_trigger;
const Group = Menu_group;
const Header_menu_profile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${`${validate_component(Root, "DropdownMenu.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Trigger, "DropdownMenu.Trigger").$$render($$result, {}, {}, {
        default: () => {
          return `<svg viewBox="0 0 512 512" fill="bg-card" xmlns="http://www.w3.org/2000/svg" class="h-8 rounded-full border p-2 shadow-sm sm:h-12"><circle cx="256" cy="114.526" r="114.526" class="fill-card-foreground"></circle><path d="M256,256c-111.619,0-202.105,90.487-202.105,202.105c0,29.765,24.13,53.895,53.895,53.895h296.421
					c29.765,0,53.895-24.13,53.895-53.895C458.105,346.487,367.619,256,256,256z" class="fill-card-foreground"></path></svg>`;
        }
      })} ${validate_component(Dropdown_menu_content, "DropdownMenu.Content").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Group, "DropdownMenu.Group").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Dropdown_menu_label, "DropdownMenu.Label").$$render($$result, {}, {}, {
                default: () => {
                  return `Guest`;
                }
              })} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                default: () => {
                  return `<a href="/auth/login" data-svelte-h="svelte-14i773u">Login</a>`;
                }
              })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                default: () => {
                  return `<a href="/auth/register" data-svelte-h="svelte-z6e0kc">Register</a>`;
                }
              })}`;
            }
          })}`;
        }
      })}`;
    }
  })}`}`;
});
const Slogan = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isHome } = $$props;
  if ($$props.isHome === void 0 && $$bindings.isHome && isHome !== void 0) $$bindings.isHome(isHome);
  return `<div class="m-auto flex w-full items-center justify-center p-4 md:p-8"><p style="line-height: 1.3;" class="${"text-center font-['Bungee_Shade'] font-extrabold text-primary " + escape(
    isHome ? "mb-8 animate-sloganReveal text-4xl opacity-0 md:mb-12 md:text-6xl lg:p-6 lg:text-8xl" : "text3D text-2xl font-semibold sm:text-4xl",
    true
  )}">Get Things Done!</p></div>`;
});
const Footer_social = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<nav data-svelte-h="svelte-1uma8m"><ul class="flex justify-around"><li><a href="https://t.me/Bocchio01" rel="nofollow noopener noreferrer" target="_blank" aria-label="Message Bocchio via Telegram"><img src="/icons/telegram.svg" alt="Telegram icon" class="h-8 rounded-full bg-white md:h-10"></a></li> <li><a href="https://github.com/Bocchio01" rel="nofollow noopener noreferrer" target="_blank" aria-label="Open Bocchio's GitHub page"><img src="/icons/github.svg" alt="Github icon" class="h-8 rounded-full bg-white md:h-10"></a></li> <li><a href="mailto:tommaso.bocchietti@gmail.com" rel="nofollow noopener noreferrer" target="_blank" aria-label="Mail to Bocchio"><img src="/icons/email.svg" alt="Email icon" class="h-8 rounded-full bg-white md:h-10"></a></li></ul></nav>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isHome;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  isHome = $page.url.pathname === "/";
  $$unsubscribe_page();
  return `${validate_component(Header, "Header.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Header_logo, "Header.Logo").$$render($$result, {}, {}, {})} ${validate_component(Header_menu_links, "Header.Links").$$render($$result, {}, {}, {})} ${validate_component(Header_menu_profile, "Header.Profile").$$render($$result, {}, {}, {})}`;
    }
  })} ${validate_component(Slogan, "Slogan").$$render($$result, { isHome }, {}, {})} ${!isHome ? `<main class="mx-auto my-6 grid w-11/12 max-w-4xl gap-6">${slots.default ? slots.default({}) : ``}</main>` : ``} ${validate_component(Footer, "Footer.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Footer_social, "Footer.Social").$$render($$result, {}, {}, {})} <hr class="mb-1 mt-3"> ${validate_component(Footer_copyright, "Footer.Copyright").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-T5PBN41G.js.map
