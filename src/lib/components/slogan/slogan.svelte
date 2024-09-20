<script lang="ts">
	export let isHome: boolean;
</script>

<div class="m-auto flex w-full items-center justify-center p-4 md:p-8">
	<p
		style="line-height: 1.3;"
		class="text-center font-['Bungee_Shade'] font-extrabold text-primary
            {isHome
			? 'mb-8 animate-sloganReveal text-4xl opacity-0 md:mb-12 md:text-6xl lg:p-6 lg:text-8xl'
			: 'text3D text-2xl font-semibold sm:text-4xl'}"
	>
		Get Things Done!
	</p>
</div>
