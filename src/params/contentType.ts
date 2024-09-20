import type { ParamMatcher } from "@sveltejs/kit";

export const match: ParamMatcher = (param) => {

    const types = ['projects', 'mix'];
    return types.includes(param);

};