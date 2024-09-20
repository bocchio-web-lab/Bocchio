import type { PageServerLoad } from './$types';

export const load = (async (param) => {
    // const res = await fetch('https://dummyjson.com/posts/search?q=' + param.params.contentType);
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
    return { posts };
}) satisfies PageServerLoad;