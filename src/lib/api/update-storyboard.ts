import { UpdateStoryboard } from '@/graphql/generated';

async function updateStoryboard({
	title,
	description,
	editingCard
}: {
	title: string;
	description: string;
	editingCard: { id: number };
}) {
	if (!editingCard) throw new Error('No card selected for editing');

	const { data, errors } = await UpdateStoryboard({
		variables: { id: editingCard.id, title, description }
	});

	if (errors) {
		console.error(errors);
		throw new Error('Failed to update storyboard');
	}

	if (!data?.updateStoryboard?.storyboard) {
		throw new Error('Failed to update storyboard');
	}

	return data.updateStoryboard.storyboard;
}

export default updateStoryboard;
