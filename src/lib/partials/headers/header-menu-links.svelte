<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav>
	<ul class="flex gap-4 sm:gap-8">
		<li>
			<a
				href="/projects"
				class="text-center text-lg font-bold hover:text-primary sm:text-xl
				{$page.url.pathname === '/projects' ? 'text-primary' : ''}"
			>
				Projects
			</a>
		</li>
		<li>
			<a
				href="/apps"
				class="text-center text-lg font-bold hover:text-primary sm:text-xl
				{$page.url.pathname === '/apps' ? 'text-primary' : ''}"
			>
				Apps
			</a>
		</li>
		<li>
			<a
				href="/mix"
				class="text-center text-lg font-bold hover:text-primary sm:text-xl
				{$page.url.pathname === '/mix' ? 'text-primary' : ''}"
			>
				Mix
			</a>
		</li>
	</ul>
</nav>
