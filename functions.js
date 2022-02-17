function getDaily(goal) {
	// const goal = goal;
	const days = 22; //write this to find the WORKING days in current month
	const avg = [];

	for (let i = days; i > 0; i--) {
		avg.push(goal / i);
	}

	return avg;
}

// console.log(getDaily(1400000));

function makeArray(string) {
	let arr = string.split(' ').join(', ');
	return arr;
}

console.log(
	makeArray(`
PaalTable FK_PaalTable_PartTable PartTable
PohdTable FK_PohdTable_VndrTable VndrTable
PshdTable FK_PshdTable_CustTable CustTable
PsitTable FK_PsitTable_PartTable PartTable
RfvdTable FK_RfvdTable_VndrTable VndrTable
RjitTable FK_RjitTable_RjhdTable RjhdTable
RndlTable FK_RndlTable_PartTable PartTable
RtpcTable FK_RtpcTable_RthdTable RthdTable
RunsTable FK_RunsTable_PartTable PartTable
ViitTable FK_ViitTable_VihdTable VihdTable
SohdTable FK_SohdTable_CustTable CustTable
RtopTable FK_RtopTable_RthdTable RthdTable
GjitTopTable FK_GjitTopTable_GjhdTable GjhdTable
StcdTable FK_StcdTable_StchTable StchTable
GjitTopTable FK_GjitTopTable_GlacTopTable GlacTopTable
VihdTable FK_VihdTable_VndrTable VndrTable
ViitTable FK_ViitTable_VndrTable VndrTable
VnapTable FK_VnapTable_PartTable PartTable
BdgtTable FK_BdgtTable_GlacTable GlacTable
VnapTable FK_VnapTable_VndrTable VndrTable
BmhdTable FK_BmhdTable_PartTable PartTable
BmplTable FK_BmplTable_BmhdTable BmhdTable
ChksTable FK_ChksTable_VndrTable VndrTable
BmplTable FK_BmplTable_PartTable PartTable
ChseTable FK_ChseTable_VndrTable VndrTable
RnalTable PK_RnalTable_PartTable PartTable
BuycTable FK_BuycTable_BuyrTable BuyrTable
RnalTable PK_RnalTable_RunsTable RunsTable
BuycTable FK_BuycTable_PcodTable PcodTable
BuypTable FK_BuypTable_BuyrTable BuyrTable
BuypTable FK_BuypTable_PartTable PartTable
BuyvTable FK_BuyvTable_BuyrTable BuyrTable
BuyvTable FK_BuyvTable_VndrTable VndrTable
CashTable FK_CashTable_CustTable CustTable
CcltTable FK_CcltTable_CchdTable CchdTable
CcltTable FK_CcltTable_PartTable PartTable
ChbtTable FK_ChbtTable_VndrTable VndrTable
CcitTable FK_CcitTable_CchdTable CchdTable
CcitTable FK_CcitTable_PartTable PartTable
CpayTable FK_CpayTable_CustTable CustTable
EsbmTable FK_EsbmTable_EstiTable EstiTable
EsosTable FK_EsosTable_EstiTable EstiTable
EsplTable FK_EsplTable_EstiTable EstiTable
EsrtTable FK_EsrtTable_EstiTable EstiTable
FaitTable FK_FaitTable_FahdTable FahdTable
GjitTable FK_GjitTable_GjhdTable GjhdTable
MrpPartComments FK_MrpPartComments_PartTable PartTable
GjitTable FK_GjitTable_GlacTable GlacTable
WcntTable FK_WcntTable_ShopTable ShopTable
LohdTable FK_LohdTable_PartTable PartTable
EsReportUserPermissions FK_EsReportUserPermissions_EsReportUsers EsReportUsers
`)
);
