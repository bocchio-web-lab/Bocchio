<script lang="ts">
	import { page } from '$app/stores';

	import * as Header from '$lib/partials/headers/index';
	import Slogan from '$lib/components/slogan/slogan.svelte';
	import * as Footer from '$lib/partials/footers/index';

	$: isHome = $page.url.pathname === '/';
</script>

<Header.Root>
	<Header.Logo />
	<Header.Links />
	<Header.Profile />
</Header.Root>

<Slogan {isHome} />

{#if !isHome}
	<main class="mx-auto my-6 grid w-11/12 max-w-4xl gap-6">
		<slot />
	</main>
{/if}

<Footer.Root>
	<Footer.Social />
	<hr class="mb-1 mt-3" />
	<Footer.Copyright />
</Footer.Root>
