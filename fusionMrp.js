// Putting SQL statements as a placeholder until I figure out how to organize this shit

// LOTS IN SYSTEM
const getLots = (partNumber = false, remaining = false) => {
	let query = `
		SELECT LOTNUMBER, LOTUSERLOTID, LOTPARTREF, LOTADATE, LOTREMAININGQTY, LOTUNITCOST, LOTLOCATION
		FROM LohdTable
	`;
	query += partNumber
		? remaining
			? `WHERE LOTPARTREF = '${partNumber}' AND LOTREMAININGQTY > 0`
			: `WHERE LOTPARTREF = '${partNumber}'`
		: remaining
		? 'WHERE LOTREMAININGQTY > 0'
		: null;

	// ORDER BY LOTADATE

	return query;
};

// console.log(getLots('', true));

const mock_dept = [
	{
		Part_Num: '255T4694-6',
		Run: 14,
		Comments: null,
		Priority: 2
	},
	{
		Part_Num: '255T4694-6',
		Run: 14,
		Comments: 'BURNDOWN',
		Priority: 2
	},
	{
		Part_Num: '818-3789-010',
		Run: 5,
		Comments: null,
		Priority: 5
	},
	{
		Part_Num: '710Z7271-11',
		Run: 124,
		Comments: null,
		Priority: 5
	}
];
