import type { PageLoad } from './$types';

export const load = (async () => {

    // const res = await fetch('https://dummyjson.com/posts/search?q=' + param.params.contentType);
    const res = await fetch('http://blogger.test/api/posts');
    const posts = await res.json();

    return { posts };

}) satisfies PageLoad;