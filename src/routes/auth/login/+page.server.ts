import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';

export const load = (({ cookies }) => {

    if (cookies.get('bearer_token_auth')) {
        redirect(307, '/dashboard');
    }

}) satisfies PageServerLoad;

export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        try {
            // Fetch CSRF token
            const csrfResponse = await fetch('http://identity.bocchio.dev/sanctum/csrf-cookie',
                {
                    credentials: 'include',
                }
            );
            const xsrfToken: string = csrfResponse.headers
                .getSetCookie()
                .find(cookie => cookie.startsWith('XSRF-TOKEN'))
                ?.split(';')[0]
                .split('=')[1];

            // cookies.set('XSRF-TOKEN', decodeURIComponent(xsrfToken), { path: '/' });

            // Perform login request
            const requestInit: RequestInit = {
                body: JSON.stringify({ email, password }),
                credentials: 'include',
                headers: {
                    'content-Type': 'application/json',
                    'accept': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
                },
                method: 'POST',
            };
            console.log("requestInit:", requestInit);
            const loginResponse = await fetch('http://identity.test/login', requestInit);

            console.log('loginResponse:', loginResponse.status, loginResponse.statusText);

        } catch (error) {
            console.error('An error occurred:', error);
        }
    },
} satisfies Actions;
