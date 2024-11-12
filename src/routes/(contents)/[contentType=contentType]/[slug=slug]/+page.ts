import type { PageLoad } from './$types';

export const load = (async (param) => {

    const post = (await fetch(`http://blogger.test/api/posts/${param.params.slug}`)).json();

    return { post };

}) satisfies PageLoad;