export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","fonts/BungeeShade_Regular.woff2","fonts/Catamaran.woff2","fonts/Roboto_Condensed.woff2","icons/email.svg","icons/gear-bulb.svg","icons/github.svg","icons/guest.svg","icons/profile-user.svg","icons/telegram.svg"]),
	mimeTypes: {".png":"image/png",".woff2":"font/woff2",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.neY63KHU.js","app":"_app/immutable/entry/app.WntMN_yH.js","imports":["_app/immutable/entry/start.neY63KHU.js","_app/immutable/chunks/entry.DRO86FrP.js","_app/immutable/chunks/scheduler.Dw1Xknx6.js","_app/immutable/chunks/index.DAqNsYo8.js","_app/immutable/entry/app.WntMN_yH.js","_app/immutable/chunks/scheduler.Dw1Xknx6.js","_app/immutable/chunks/index.BjN0RBxD.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js'))
		],
		routes: [
			{
				id: "/(contents)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/auth/login",
				pattern: /^\/auth\/login\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/auth/register",
				pattern: /^\/auth\/register\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/auth/reset-password",
				pattern: /^\/auth\/reset-password\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(contents)/[contentType=contentType]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"contentType","matcher":"contentType","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(contents)/[contentType=contentType]/[slug=slug]",
				pattern: /^\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"contentType","matcher":"contentType","optional":false,"rest":false,"chained":false},{"name":"slug","matcher":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			const { match: contentType } = await import ('./entries/matchers/contentType.js')
			const { match: slug } = await import ('./entries/matchers/slug.js')
			return { contentType, slug };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base = "";