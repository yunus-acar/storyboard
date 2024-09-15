<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import Input from '@/components/ui/input/input.svelte';
	import Textarea from '@/components/ui/textarea/textarea.svelte';
	import { Trash2, CirclePlus, PenLine, ListMusic } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { type Storyboard } from '$lib/graphql/generated';
	import * as yup from 'yup';
	import { toast } from 'svelte-sonner';
	import { cn } from '@/utils';
	import storyboardSchema from '@/schema/storyboard.schema';
	import updateStoryboard from '@/api/update-storyboard';
	import createStoryboard from '@/api/create-storyboard';
	import deleteStoryboard from '@/api/delete-storyboard';

	export let cards: Storyboard[] = [];

	let showAddCardForm = false;
	let formErrors: { [key: string]: string } = {};
	let editingCard: Storyboard | null = null;

	function addCard() {
		if (cards.length < 4) {
			showAddCardForm = true;
			editingCard = null;
		}
	}

	function cancelAddCard() {
		showAddCardForm = false;
		editingCard = null;
		formErrors = {};
	}

	async function submitCard(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const titleInput = form.elements.namedItem('title') as HTMLInputElement;
		const descriptionInput = form.elements.namedItem('description') as HTMLTextAreaElement;

		const result = await validateForm(titleInput.value, descriptionInput.value)
			.then((data) =>
				editingCard ? updateStoryboard({ ...data, editingCard }) : createStoryboard(data)
			)
			.then(updateCards)
			.then(resetForm)
			.catch(handleError);

		if (result.isSuccess) {
			toast(`Storyboard ${editingCard ? 'updated' : 'created'} successfully`, {
				duration: 3000
			});
		}
	}

	async function validateForm(title: string, description: string) {
		try {
			await storyboardSchema.validate({ title, description }, { abortEarly: false });
			formErrors = {};
			return { title, description };
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				formErrors = error.inner.reduce(
					(acc, err) => {
						if (err.path) {
							acc[err.path] = err.message;
						}
						return acc;
					},
					{} as { [key: string]: string }
				);
				throw new Error('Validation failed');
			}
			throw error;
		}
	}

	function updateCards(storyboard: Storyboard) {
		if (editingCard) {
			cards = cards.map((card) => (card.id === storyboard.id ? storyboard : card));
		} else {
			cards = [...cards, storyboard];
		}
		return storyboard;
	}

	function resetForm(storyboard: Storyboard) {
		showAddCardForm = false;
		editingCard = null;
		(document.querySelector('form') as HTMLFormElement).reset();
		return { isSuccess: true, storyboard };
	}

	function handleError(error: Error) {
		console.error(error);
		if (error.message === 'Validation failed') {
			toast('Please correct the form errors');
		} else {
			toast(`Failed to ${editingCard ? 'update' : 'create'} storyboard`);
		}
		return { isSuccess: false };
	}

	async function deleteCard(id: number) {
		const result = await deleteStoryboard(id).then(removeCardFromList).catch(handleDeleteError);

		if (result.isSuccess) {
			toast('Storyboard deleted successfully');
			if (editingCard && editingCard.id === id) {
				editingCard = null;
			}
		}
	}

	function removeCardFromList(storyboard: Storyboard) {
		cards = cards.filter((card) => card.id !== storyboard.id);
		return { isSuccess: true, storyboard };
	}

	function handleDeleteError(error: Error) {
		console.error(error);
		toast('Failed to delete storyboard');
		return { isSuccess: false };
	}

	function editCard(card: Storyboard) {
		editingCard = card;
		showAddCardForm = false;
	}
</script>

<div class="p-4 h-[calc(100vh-200px)]">
	<div class="grid grid-cols-1 h-full md:grid-cols-2 lg:grid-cols-4 gap-4">
		{#each cards as card, index (card.id)}
			<div transition:fade={{ duration: 300 }}>
				<Card class="bg-white h-full shadow-md">
					{#if editingCard && editingCard.id === card.id}
						<form class="h-full" on:submit={submitCard}>
							<CardHeader>
								<div class="flex items-center justify-between">
									<div
										class="text-[#71717A] text-sm border-[#E4E4E7] border size-7 flex items-center justify-center rounded-full"
									>
										#{index + 1}
									</div>
									<Button variant="ghost" size="icon" on:click={() => (editingCard = null)}>
										<Trash2 color="#71717A" class="size-4" />
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div class="space-y-4">
									<div>
										<div
											class={cn('flex items-center gap-2 border-b border-gray-300', {
												'border-red-300': formErrors.title
											})}
										>
											<PenLine color="#71717A" class="size-4" />
											<Input
												type="text"
												id="title"
												name="title"
												placeholder="Title"
												class="border-none focus:border-none focus:ring-0 focus-visible:ring-0"
												value={editingCard.title}
											/>
										</div>
										{#if formErrors.title}
											<p class="text-red-500 text-xs mt-1">{formErrors.title}</p>
										{/if}
									</div>
									<div>
										<div
											class={cn('flex items-start gap-2 border-b border-gray-300', {
												'border-red-300': formErrors.description
											})}
										>
											<ListMusic color="#71717A" class="size-4 my-2" />
											<Textarea
												id="description"
												name="description"
												placeholder="Description"
												class="border-none focus:border-none focus:ring-0 focus-visible:ring-0 resize-none"
												rows={10}
												value={editingCard.description}
											/>
										</div>
										{#if formErrors.description}
											<p class="text-red-500 text-xs mt-1">{formErrors.description}</p>
										{/if}
									</div>
								</div>
							</CardContent>
							<CardFooter class="flex gap-2 justify-end">
								<Button type="submit">Update Card</Button>
							</CardFooter>
						</form>
					{:else}
						<CardHeader>
							<div class="flex items-center justify-between">
								<div
									class="text-[#71717A] text-sm border-[#E4E4E7] border size-7 flex items-center justify-center rounded-full"
								>
									#{index + 1}
								</div>

								<div class="flex gap-2">
									<Button variant="ghost" size="icon" on:click={() => editCard(card)}>
										<PenLine class="size-4" />
									</Button>
									<Button variant="ghost" size="icon" on:click={() => deleteCard(card.id)}>
										<Trash2 class="size-4" />
									</Button>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div class="flex items-center gap-2 border-b border-[#E4E4E7] pb-2">
								<PenLine class="size-4" color="#71717A" />
								<p class="text-sm">{card.title}</p>
							</div>
							<div class="flex items-start gap-2 mt-2 border-b border-[#E4E4E7] pb-2">
								<div class="flex-shrink-0 my-1">
									<ListMusic color="#71717A" class="size-4" />
								</div>
								<p class="text-sm text-[#71717A] break-words">{card.description}</p>
							</div>
						</CardContent>
					{/if}
				</Card>
			</div>
		{/each}
		{#if showAddCardForm}
			<div transition:fade={{ duration: 300 }}>
				<Card class="bg-white h-full shadow-md">
					<CardHeader>
						<div class="flex items-center justify-between">
							<div
								class="text-[#71717A] text-sm border-[#E4E4E7] border size-7 flex items-center justify-center rounded-full"
							>
								#{cards.length + 1}
							</div>

							<Button variant="ghost" size="icon" on:click={cancelAddCard}>
								<Trash2 color="#71717A" class="size-4" />
							</Button>
						</div>
					</CardHeader>
					<form class="h-full" on:submit={submitCard}>
						<CardContent>
							<div class="space-y-4">
								<div>
									<div
										class={cn('flex items-center gap-2 border-b border-gray-300', {
											'border-red-300': formErrors.title
										})}
									>
										<PenLine color="#71717A" class="size-4" />
										<Input
											type="text"
											id="title"
											name="title"
											placeholder="Title"
											class="border-none focus:border-none focus:ring-0 focus-visible:ring-0"
											value=""
										/>
									</div>
									{#if formErrors.title}
										<p class="text-red-500 text-xs mt-1">{formErrors.title}</p>
									{/if}
								</div>
								<div>
									<div
										class={cn('flex items-start gap-2 border-b border-gray-300', {
											'border-red-300': formErrors.description
										})}
									>
										<ListMusic color="#71717A" class="size-4 my-2" />
										<Textarea
											id="description"
											name="description"
											placeholder="Description"
											class="border-none focus:border-none focus:ring-0 focus-visible:ring-0 resize-none"
											rows={10}
											value=""
										/>
									</div>
									{#if formErrors.description}
										<p class="text-red-500 text-xs mt-1">{formErrors.description}</p>
									{/if}
								</div>
							</div>
						</CardContent>
						<CardFooter class="flex gap-2  justify-end">
							<Button type="submit">Add Card</Button>
						</CardFooter>
					</form>
				</Card>
			</div>
		{/if}

		{#if cards.length < 4 && !showAddCardForm && !editingCard}
			<Card
				class="bg-[#DEDEE1] border-[#E4E4E7] border flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors duration-200"
				on:click={addCard}
			>
				<CardContent class="flex flex-col text-[#71717A] items-center justify-center">
					<CirclePlus class="size-4 mb-2" />
					<p class="text-center">Click to Add New Card</p>
				</CardContent>
			</Card>
		{/if}
	</div>
</div>
