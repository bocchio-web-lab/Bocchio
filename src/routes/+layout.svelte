<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import Particles from '$lib/components/particles/particles.svelte';

	onMount(() => {
		const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		// document.documentElement.dataset.theme = theme;
	});
</script>

<slot />

<Particles />
