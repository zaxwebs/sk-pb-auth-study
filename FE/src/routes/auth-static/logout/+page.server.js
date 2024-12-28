export async function load({ locals }) {
	console.log("logging out...");

	const pb = locals.pb;

	console.log('authStore.isValid', pb.authStore.isValid);
	console.log('authStore.token', pb.authStore.token);
	console.log('authStore.record?.id', pb.authStore.record?.id);

	// "logout"
	pb.authStore.clear();
}