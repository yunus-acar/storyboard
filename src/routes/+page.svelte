<script lang="ts">
	import type { StoryboardsQuery } from '$lib/graphql/generated';
	import { Storyboards } from '$lib/graphql/generated';
	import CardManager from './CardManager.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton';

	const storyboardsResult = Storyboards({
		variables: {
			first: 4
		}
	});
	let storyboards: NonNullable<StoryboardsQuery['query']['storyboards']>['nodes'] = [];

	$: if ($storyboardsResult.data?.query?.storyboards) {
		storyboards = $storyboardsResult.data.query.storyboards.nodes ?? [];
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="bg-[#E4E4E7] h-[calc(100vh-60px)]">
	<div class="container mx-auto"></div>
	{#if $storyboardsResult.loading}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
			{#each Array(4) as _, i}
				<Skeleton class="h-[600px] w-full" />
			{/each}
		</div>
	{:else if $storyboardsResult.error}
		<p>Error: {$storyboardsResult.error.message}</p>
	{:else}
		<CardManager cards={storyboards.filter((s) => s !== null)} />
	{/if}
</section>
