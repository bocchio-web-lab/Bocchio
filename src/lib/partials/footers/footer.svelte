<script lang="ts">
	import { Card } from '$lib/components/ui/card/index';
</script>

<footer>
	<Card class="p-4">
		<div class="m-auto w-full max-w-sm justify-center">
			<slot />
		</div>
	</Card>
</footer>
