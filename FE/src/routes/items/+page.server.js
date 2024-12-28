

export const load = async ({ locals }) => {
	try {
		const pb = locals.pb
		const items = await pb.collection('items').getFullList();
		return { items };
	} catch (error) {
		console.error(error);
		return { error: 'Could not load data' };
	}
};

