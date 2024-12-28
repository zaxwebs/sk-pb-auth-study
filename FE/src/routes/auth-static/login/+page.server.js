export async function load({ locals, cookies, request }) {
	// Step 1: Log a message indicating the process is starting.
	console.log("Logging in...");

	// Step 2: Retrieve the PocketBase instance from locals.
	const pb = locals.pb;

	// Step 3: Authenticate the user using a hardcoded email and password.
	// This will return authentication data, including the user's auth store.
	const authData = await pb.collection('users').authWithPassword(
		'bob@example.com', // Example email
		'password123'      // Example password
	);

	// Step 4: Log the current auth store exported as a cookie string.
	console.log("Auth store cookie string:", pb.authStore.exportToCookie({ httpOnly: false }));

	// Step 5: Export the auth store as a cookie string.
	// This cookie string can be used to maintain the user's authentication session.
	const cookieString = pb.authStore.exportToCookie({ httpOnly: false });

	// Step 6: Clear the auth store to simulate loading from a fresh state.
	pb.authStore.clear();
	console.log("Auth store cleared:", pb.authStore);

	// Step 7: Manually parse the cookie string to demonstrate how we can handle cookie attributes.
	// we will manually extract and parse the cookie for educational purposes.
	const cookieParts = cookieString.split(';').map(part => part.trim());

	// The first part of the cookie is the name-value pair.
	const [nameValue, ...attributes] = cookieParts;

	// Split the name-value pair to separate the cookie name and value.
	let [cookieName, cookieValue] = nameValue.split('=');
	cookieValue = decodeURIComponent(cookieValue); // Decode the value in case it contains special characters.

	// Step 8: Parse cookie attributes (e.g., Expires, Path, Secure, SameSite).
	// These attributes control the behavior of the cookie, such as its expiration date, 
	// the path for which the cookie is valid, and security settings.
	const cookieOptions = {};
	attributes.forEach(attribute => {
		if (attribute.startsWith('Expires=')) {
			cookieOptions.expires = new Date(attribute.replace('Expires=', ''));
		} else if (attribute.startsWith('Path=')) {
			cookieOptions.path = attribute.replace('Path=', '');
		} else if (attribute.startsWith('Secure')) {
			cookieOptions.secure = true; // Ensure cookie is transmitted over HTTPS.
		} else if (attribute.startsWith('SameSite=')) {
			cookieOptions.sameSite = attribute.replace('SameSite=', ''); // Controls cross-site cookie behavior.
		}
	});

	// Step 9: Set the cookie using the parsed name, value, and options.
	cookies.set(cookieName, cookieValue, cookieOptions);

	// Step 10: Load the authentication state from the cookie to simulate resuming the session.
	// This demonstrates how to restore the auth store state from the cookie header.
	pb.authStore.loadFromCookie(request.headers.get('cookie') || '');

	// Step 11: Log various properties of the auth store to confirm it's loaded properly.
	console.log("Auth store validity:", pb.authStore.isValid);      // Is the session still valid?
	console.log("Auth store token:", pb.authStore.token);           // Access token for API requests.
	console.log("Auth store user ID:", pb.authStore.record?.id);    // The authenticated user's ID.
}
