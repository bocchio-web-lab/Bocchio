<script lang="ts">
	export let isHome: boolean;
</script>

<div class="flex w-full items-center justify-center p-4 md:p-8 {isHome ? 'm-auto' : ''}">
	<p
		style="line-height: 1.3;"
		class="text-center font-['Bungee_Shade'] font-extrabold text-primary
            {isHome
			? 'mb-8 animate-sloganReveal text-4xl opacity-0 sm:text-5xl md:mb-12 lg:p-6 lg:text-8xl'
			: ''}
            {isHome ? 'text3D text-2xl md:text-5xl' : ''}"
	>
		Get Things Done!
	</p>
</div>
