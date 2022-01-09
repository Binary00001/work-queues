import { readable, writable } from 'svelte/store';
import { handleFetch } from '$lib/utils';

export const locationStore = readable(null, (set) => {
	fetch('http://imaginetics193.imagineticsinc.local:8008/api/testing/lotlocations', {
		method: 'GET',
		mode: 'cors',
		headers: { 'content-type': 'application/json' }
	})
		.then((res) => res.json())
		.then((json) => set(json));
});

export const locationRefStore = readable(null, (set) => {
	fetch('/api/locations', {
		method: 'GET',
		mode: 'cors',
		headers: { 'content-type': 'application/json' }
	})
		.then((res) => res.json())
		.then((json) => set(json))
		.catch((err) => err);
});
