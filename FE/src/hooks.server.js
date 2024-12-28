import PocketBase from 'pocketbase';
import { PUBLIC_PB_URL } from '$env/static/public'


export async function handle({ event, resolve }) {
	event.locals.pb = new PocketBase('http://127.0.0.1:8090');
	// empty function
	return resolve(event);

}