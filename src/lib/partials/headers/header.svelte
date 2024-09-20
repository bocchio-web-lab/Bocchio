<script lang="ts">
	import { Card } from '$lib/components/ui/card/index';
</script>

<header>
	<Card class="p-4">
		<div class="m-auto flex w-full max-w-screen-xl items-center justify-between">
			<slot />
		</div>
	</Card>
</header>
