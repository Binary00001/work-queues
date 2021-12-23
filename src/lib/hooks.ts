// import { commentRoute } from './apiRoutes';

export function handleTime(time: number): string {
	let days: number = Math.floor(time / 1440);
	let hours: number = Math.floor(time / 60);
	let mins: number = time % 60;
	let diff: string = '';

	if (days > 0) {
		diff += days === 1 ? `${days} day` : `${days} days`;
		return diff;
	} else if (hours > 0) {
		diff += hours === 1 ? `${hours} hour` : `${hours} hours`;
		return diff;
	}

	return `${mins} minutes`;
}
