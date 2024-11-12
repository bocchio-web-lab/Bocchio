import type { PageServerLoad, Action, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';

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

        // console.log('Browser:', browser);

        try {
            // Fetch CSRF token
            const csrfResponse = await fetch('https://identity.bocchio.dev/sanctum/csrf-cookie',
                {
                    credentials: 'include',
                    method: 'GET'
                }
            );
            // console.log('csrfResponse:', csrfResponse.status, csrfResponse.statusText);

            const xsrfToken: string = csrfResponse.headers
                .getSetCookie()
                .find(cookie => cookie.startsWith('XSRF-TOKEN'))
                ?.split(';')[0]
                .split('=')[1];
            // console.log('xsrfToken:', xsrfToken);

            // cookies.set('XSRF-TOKEN', xsrfToken, { path: '/' });

            // Perform login request
            const requestInit: RequestInit = {
                credentials: 'include',
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
                    'accept': 'application/json',
                },
                method: 'POST',
                body: data,
            };
            // console.log("requestInit:", requestInit);
            const loginResponse = await fetch('https://identity.bocchio.dev/login', requestInit);

            const text = await loginResponse.text();
            return { success: loginResponse.status == 200, text: text };

        } catch (error) {
            console.error('An error occurred:', error);
        }

    }
} satisfies Actions;
