import { writable, readable } from 'svelte/store'
import { parts } from '$lib/db'


// set the part store
export const partList = writable({message: 'testing'})