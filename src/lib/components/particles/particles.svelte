<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const particles: NodeListOf<HTMLDivElement> = document.querySelectorAll('.particle');

		particles.forEach((particle) => animateParticle(particle));
	});

	const animateParticle = (particle: HTMLDivElement) => {
		const size = Math.random() * 5 + 1;
		const opacity = Math.random();
		const delay = Math.random();

		const xInitial = Math.random() * 100;
		const yInitial = Math.random() * 100;
		const xFinal = Math.random() * 100;
		const yFinal = Math.random() * 100;

		particle.style.width = `${size}px`;
		particle.style.height = `${size}px`;
		particle.style.opacity = `opacity`;
		particle.style.transform = `translate(${xInitial}vw, ${yInitial}vh)`;

		particle.animate(
			[
				{
					transform: `translate(${xFinal}vw, ${yFinal}vh)`
				}
			],
			{
				duration: 100 * 1000,
				iterations: Infinity,
				easing: 'linear',
				delay: delay
			}
		);
	};
</script>

<div class="opacity-0 fixed -z-50 top-0 w-full h-screen animate-particleReveal bg-background">
	{#each Array(100) as _, index (index)}
		<figure class="particle absolute bg-foreground m-0 rounded-full"></figure>
	{/each}
</div>
