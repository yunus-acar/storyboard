import { CreateStoryboard } from '@/graphql/generated';

async function createStoryboard({ title, description }: { title: string; description: string }) {
	const { data, errors } = await CreateStoryboard({
		variables: { title, description }
	});

	if (errors) {
		console.error(errors);
		throw new Error('Failed to create storyboard');
	}

	if (!data?.createStoryboard?.storyboard) {
		throw new Error('Failed to create storyboard');
	}

	return data.createStoryboard.storyboard;
}

export default createStoryboard;
