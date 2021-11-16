function getDaily(goal) {
	// const goal = goal;
	const days = 22; //write this to find the WORKING days in current month
	const avg = [];

	for (let i = days; i > 0; i--) {
		avg.push(goal / i);
	}

	return avg;
}

console.log(getDaily(1400000));
