import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (({ cookies }) => {

    if (cookies.get('bearer_token_auth')) {
        redirect(307, '/dashboard');
    }

}) satisfies PageServerLoad;

export const actions = {
    login: async ({ request, cookies }) => {

        const data = await request.formData();

        try {
            const csrfResponse = await fetch('http://identity.test/sanctum/csrf-cookie');
            const xsrfToken: string = csrfResponse.headers
                .getSetCookie()
                .find(cookie => cookie.startsWith('XSRF-TOKEN'))
                ?.split(';')[0]
                .split('=')[1];
            const identity_service_bocchio_session: string = csrfResponse.headers
                .getSetCookie()
                .find(cookie => cookie.startsWith('identity_service_bocchio_session'))
                ?.split(';')[0]
                .split('=')[1];

            cookies.set('XSRF-TOKEN', xsrfToken, { path: '/' });
            cookies.set('identity_service_bocchio_session', identity_service_bocchio_session, { path: '/' });

            const requestInit: RequestInit = {
                body: data,
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
                    'accept': 'application/json',
                    Cookie: `identity_service_bocchio_session=${identity_service_bocchio_session}; XSRF-TOKEN=${xsrfToken}`,
                },
                cache: 'no-cache',
            };
            const loginResponse = await fetch('http://identity.test/login', requestInit);

            const text = await loginResponse.text();
            return { success: loginResponse.status == 200, requestInit: JSON.stringify(requestInit), text: text };

        } catch (error) {
            console.error('An error occurred:', error);
        }

    }
} satisfies Actions;
