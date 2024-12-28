
import { redirect } from '@sveltejs/kit'; 8

export const actions = {
	default: async ({ locals, request }) => {
		const pb = locals.pb;
		const data = await request.formData();
		const name = data.get('name');
		console.log(name);

		const record = await pb.collection('items').create({ name });

		redirect(303, '/items');
	}
};