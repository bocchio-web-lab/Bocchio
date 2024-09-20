<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import type { PageData } from './$types';

	export let data: PageData;
	$: contentType = $page.params.contentType;

	data.posts.forEach((post) => {
		post.link = `${$page.url.pathname}/${post.slug}`;
	});
</script>

<!-- <h1>{contentType} page</h1> -->

{#each data.posts as project}
	<Card.Root
		class="group flex w-full flex-wrap justify-between gap-8 transition-transform odd:flex-row-reverse hover:scale-105"
	>
		<div class="grow-[2] basis-96 content-center">
			<Card.Header>
				<Card.Title>{project.title}</Card.Title>
				<Card.Description>{project.description}</Card.Description>
			</Card.Header>

			<Card.Content>
				{project.body}
			</Card.Content>

			<Card.Footer class="mt-auto hidden md:block">
				<a href={project.link} class=" w-full">
					<Button class="w-full">Read the content</Button>
				</a>
			</Card.Footer>
		</div>
		<div class="grow-[1] basis-60 content-center">
			<img
				src="/icons/github.svg"
				class="m-auto max-h-52 max-w-full rounded-2xl p-6 transition-transform group-hover:scale-110"
				alt="GitHub logo"
			/>
		</div>

		<Card.Footer class="mt-auto block w-full md:hidden">
			<a href={project.link} class=" w-full">
				<Button class="w-full">Read the content</Button>
			</a>
		</Card.Footer>
	</Card.Root>
{/each}
