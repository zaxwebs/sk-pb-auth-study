export async function load({ locals }) {
	console.log("logging in...");

	const pb = locals.pb;

	const authData = await pb.collection('users').authWithPassword(
		'bob@example.com',
		'password123',
	);

	console.log('authStore.isValid', pb.authStore.isValid);
	console.log('authStore.token', pb.authStore.token);
	console.log('authStore.record.id', pb.authStore.record.id);
}