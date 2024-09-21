export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9')
];

export const server_loads = [];

export const dictionary = {
		"/(contents)": [4,[2]],
		"/auth/login": [~7,[3]],
		"/auth/register": [8,[3]],
		"/auth/reset-password": [9,[3]],
		"/(contents)/[contentType=contentType]": [~5,[2]],
		"/(contents)/[contentType=contentType]/[slug=slug]": [6,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';