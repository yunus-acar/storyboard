import * as yup from 'yup';

const storyboardSchema = yup.object().shape({
	title: yup
		.string()
		.required('Title is required')
		.max(100, 'Title must be at most 100 characters'),
	description: yup.string().required('Description is required')
});

export default storyboardSchema;
