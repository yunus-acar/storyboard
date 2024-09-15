import { DeleteStoryboard } from '@/graphql/generated';

async function deleteStoryboard(id: number) {
	const { data, errors } = await DeleteStoryboard({
		variables: { id }
	});

	if (errors) {
		console.error(errors);
		throw new Error('Failed to delete storyboard');
	}

	if (!data?.deleteStoryboard?.storyboard) {
		throw new Error('Failed to delete storyboard');
	}

	return data.deleteStoryboard.storyboard;
}

export default deleteStoryboard;
