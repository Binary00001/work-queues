SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[AgendaViewAll] AS
Select 
ROW_NUMBER() OVER (ORDER BY ITCUSTREQ ASC, ITSO ASC,ITNUMBER ASC) as RowNum , --0 ROW
Isnull(ISNULL(p1.Partnum,SalesPart.PARTNUM), p2.Partnum) as [PART NUMBER] , --as 'run_part' , --1 PART NUMBER
--RTRIM(SalesPart.PARTNUM) as [PART NUMBER], -- 1 PART NUMBER
--p2.PARTNUM as 'mrp_part',  -- Skipped
p1.PARTNUM as [MOPART],
p2.PartNUm as [MRPPART],
SalesPart.PARTNUM as [SOPART],
SalesPart.PALEVEL as [PT], 
	CASE WHEN p1.PARTNUM IS NULL THEN 'S'
		ELSE  
			CASE
				WHEN RTRIM(p1.Partnum) = RTRIM(p2.partnum) THEN 'S'
				ELSE 'D'
			END  
	END as 'S/D', --2
  (SELECT pm.AGCPPM from AgcpTable as pm where pm.AGCPCustomer = (CASE
	WHEN RTRIM(SOCUST) = 'BOECOM' THEN ('BOE' + SUBSTRING(SOPO,0,4))
	ELSE SOCUST
 END) )as [PM], --3 PM
 (Select cm.AGPMCOMMENTS from AgcmTable as cm Where RTRIM(cm.AGPO) = RTRIM(SOPO)  AND cm.AGITEM = ITNUMBER and cm.AGPART = (Isnull(p1.Partnum , p2.Partnum) ) and cm.AGRUN = RUNNO) AS [PM COMMENTS], --4 PM-COMMENTS
 --(Select cm.AGCPEXP from AgcmTable as cm Where RTRIM(cm.AGPO) = RTRIM(SOPO)  AND cm.AGITEM = ITNUMBER and cm.AGPART = (Isnull(p1.Partnum , p2.Partnum) ) and cm.AGRUN = RUNNO) AS [CP EXP], --5 CP-EXP
  
	CASE 
		WHEN (itcomments like '%customer expedite%') THEN 'Y' 
		ELSE 'N' 
	END as [CP EXP],
 --CAST(ITSCHED as DATE) as [SHIP DATE], --6
 CONCAT( RIGHT('00'+CONVERT(NVARCHAR(2),MONTH(ITSCHED)),2),'/',RIGHT('00'+CONVERT(NVARCHAR(2),DAY(ITSCHED)),2),'/',RIGHT(YEAR(ITSCHED),2)) as [SHIP DATE],
 --CAST(ITCUSTREQ as DATE) as [CUST REQ DATE], --7
 CONCAT( RIGHT('00'+CONVERT(NVARCHAR(2),MONTH(ITCUSTREQ)),2),'/',RIGHT('00'+CONVERT(NVARCHAR(2),DAY(ITCUSTREQ)),2),'/',RIGHT(YEAR(ITCUSTREQ),2)) as [CUST REQ DATE],
(Rtrim(SOTYPE) + RTRIM(ITSO)) as [SO#], -- 8
 STR(ITNUMBER) + RTRIM(ITREV) as [ITEM], -- 9
 CASE
	WHEN RTRIM(SOCUST) = 'BOECOM' THEN ('BOE' + SUBSTRING(SOPO,0,4))
	ELSE 
	SOCUST
 END as [CUSTOMER], --10
 Rtrim(SOPO) as [PO], --11
 SoitTable.ITCUSTITEMNO as [POIT],
 ISNULL(dbo.SoitTable.ITQTY * dbo.SoitTable.ITDOLLARS, 0) as [EXT PRICE], --12
 ITQTY as [QTY], --13
 ISNULL(p1.PAQOH,p2.PAQOH) as [QOH], --14
 ( ISNULL(p1.PAQOH,p2.PAQOH) - ITQTY) AS [BAL], -- 15 BAL
 RUNNO as [RUN], --16
 RUNSTATUS as [RUN STATUS], --17
 RUNQTY as [RUN QTY], --18
 (Select AgwoTable.AGWCOwner From AgwoTable Where AGWC = (Select OPCENTER From RnopTable inner join parttable on opref = partref inner join runstable as rt on oprun = rt.runno and OPNO = (Select TOP 1 OPNO From RnopTable as ot2 inner join parttable on opref = partref inner join runstable as rt2 on oprun = rt.runno and opref = runref WHERE rt2.runref = f1.RUNREF  and ot2.oprun = f1.RUNNO and ot2.OPCOMPDATE IS NULL  ORDER BY OPNO ASC) and opref = runref Where rt.runref = f1.RUNREF  and oprun = f1.RUNNO)) AS [OWNER], --19 OWNER
 (Select CONCAT( RIGHT('00'+CONVERT(NVARCHAR(2),MONTH(OpSchedDate)),2),'/',RIGHT('00'+CONVERT(NVARCHAR(2),DAY(OpSchedDate)),2),'/',RIGHT(YEAR(OpSchedDate),2)) From RnopTable Where RnopTable.OPRUN = RUNNO and rnoptable.opref = f1.RUNREF AND  RnopTable.OPNO =  (SELECT TOP 1 ro2.OPNO FROM RnopTable as ro2 WHERE ro2.OPRUN = RUNNO AND ro2.OPREF=f1.runref AND ro2.OPCOMPLETE = 0 ORDER BY RnopTable.OPNO ASC)) AS [CURRENT OP DATE], --20 CURRENT OP DATE
 DATEDIFF(dd, (Select OpSchedDate From RnopTable Where RnopTable.OPRUN = RUNNO and rnoptable.opref = RUNREF AND RnopTable.OPNO =  (SELECT TOP 1 ro2.OPNO FROM RnopTable as ro2 WHERE ro2.OPRUN = RUNNO AND ro2.OPREF=f1.runref AND ro2.OPCOMPLETE = 0 ORDER BY RnopTable.OPNO ASC)), GETDATE()) AS [DAYS LATE], --21 DAYS LATE
 (Select RTRIM(ISNULL(AGWCNick,'*'+WCNDESC)) + ',' AS [text()] From rnoptable as rn3 LEFT JOIN AgwoTable on AGWC = rn3.OPCENTER INNER JOIN WcntTable on WCNREF = rn3.OPCENTER Where rn3.OPRUN = RUNNO and rn3.opref = runref and rn3.OPCOMPLETE = 0  ORDER BY rn3.OPNO ASC FOR XML PATH (''))  AS [OPEN OPERATIONS], --22 OPEN OPERATIONS
 (SELECT DATEDIFF(dd,(Select TOP 1 OPCOMPDATE From RnopTable WHERE OPREF = f1.RUNREF AND OPRUN = f1.RUNNO AND OPCOMPLETE = 1 ORDER BY OPCOMPDATE DESC),GETDATE())) as [DAYS IN QUEUE], -- DIQ	(Could use f1.RUNPKSTART as an ISNULL Conditional)
 '' AS [EXP], --23 EXP
 (SELECT TOP 1 dbo.PohdTable.POVENDOR FROM dbo.PohdTable INNER JOIN  dbo.PoitTable ON dbo.PohdTable.PONUMBER = dbo.PoitTable.PINUMBER  WHERE (dbo.PoitTable.PIADATE IS NULL) AND (dbo.PoitTable.PITYPE <> 16) AND PIRUNPART = f1.RUNREF AND PoitTable.PIRUNNO = RUNNO) AS [SUPPLIER] , --24 SUPPLIER
 (SELECT TOP 1 dbo.PohdTable.PONUMBER FROM dbo.PohdTable INNER JOIN  dbo.PoitTable ON dbo.PohdTable.PONUMBER = dbo.PoitTable.PINUMBER WHERE (dbo.PoitTable.PIADATE IS NULL) AND (dbo.PoitTable.PITYPE <> 16) AND RTRIM(PIRUNPART) = RTRIM(f1.RUNREF) AND PIRUNNO = RUNNO ORDER BY PIPDATE asc) AS [PO NUMBER], --25 PO NUMBER
(SELECT TOP 1 Replace(STR(dbo.PoitTable.PIITEM) + RTRIM(dbo.PoitTable.PIREV),' ','') FROM dbo.PohdTable INNER JOIN  dbo.PoitTable ON dbo.PohdTable.PONUMBER = dbo.PoitTable.PINUMBER WHERE (dbo.PoitTable.PIADATE IS NULL) AND (dbo.PoitTable.PITYPE <> 16) AND RTRIM(PIRUNPART) = RTRIM(f1.RUNREF) AND PIRUNNO = RUNNO  ORDER BY PIPDATE asc) AS [PO ITEM], --26 PO ITEM
 (SELECT TOP 1 dbo.PoitTable.PIPDATE FROM dbo.PohdTable INNER JOIN  dbo.PoitTable ON dbo.PohdTable.PONUMBER = dbo.PoitTable.PINUMBER WHERE (dbo.PoitTable.PIADATE IS NULL) AND (dbo.PoitTable.PITYPE <> 16) AND RTRIM(PIRUNPART) = RTRIM(f1.RUNREF) AND PIRUNNO = RUNNO ORDER BY PIPDATE asc) AS [DUE DATE], --27 DUE DATE
	--ITINVOICE,
	--ITPSSHIPPED,
	PsitTable.*
FROM            dbo.RunsTable as f1 INNER JOIN
        dbo.RnalTable on f1.RUNNO =  dbo.RnalTable.RARUN AND f1.RUNREF = dbo.RnalTable.RAREF AND f1.RUNSTATUS <> 'CL' 
		RIGHT OUTER JOIN
        dbo.PartTable AS SalesPart INNER JOIN
        dbo.SoitTable ON SalesPart.PARTREF = dbo.SoitTable.ITPART AND SalesPart.PARTREF = dbo.SoitTable.ITPART ON dbo.RnalTable.RASO = dbo.SoitTable.ITSO AND 
        dbo.RnalTable.RASOITEM = dbo.SoitTable.ITNUMBER AND dbo.RnalTable.RASOREV = dbo.SoitTable.ITREV 
		LEFT OUTER JOIN -- if we want a loose attach to mrp
		--INNER JOIN --If we want a firm attach to MRP
        dbo.MrplTable ON dbo.SoitTable.ITSO = dbo.MrplTable.MRP_SONUM AND dbo.SoitTable.ITNUMBER = dbo.MrplTable.MRP_SOITEM AND 
        dbo.SoitTable.ITREV = dbo.MrplTable.MRP_SOREV AND SalesPart.PALEVEL = dbo.MrplTable.MRP_PARTLEVEL 
		LEFT OUTER JOIN --
		--INNER JOIN --This can probably just be an inner.
        dbo.SohdTable ON dbo.SoitTable.ITSO = dbo.SohdTable.SONUMBER AND ITCANCELED=0 LEFT JOIN
		PARTTABLE as p1 on f1.Runref = p1.partref 
		LEFT JOIN 
		--INNER JOIN
		PARTTABLE as p2 ON MRP_PARTREF = p2.PARTREF 
		LEFT JOIN PsitTable on ITSO = PISONUMBER AND ITNUMBER = PISOITEM AND ITREV = PISOREV

		--WHERE PIPACKSLIP IS NOT NUll

--WHERE (dbo.SoitTable.ITCANCELED = 0) --AND (dbo.SoitTable.ITINVOICE = 0) AND (dbo.SoitTable.ITPSSHIPPED = 0)AND 
					     --(dbo.SohdTable.SOSALESMAN LIKE '%%') AND 
                         --(PartTable.PACLASS LIKE '%%') AND (PartTable.PAPRODCODE LIKE '%%') AND 
						 --dbo.SohdTable.SOSALESMAN IS NOT NULL AND SalesPart.PACLASS IS NOT NULL AND SalesPart.PAPRODCODE IS NOT NULL AND 
						 --(SalesPart.PALEVEL = 2 OR 
						 --SalesPart.PALEVEL =1)  
						 --AND 

  --AND DATEDIFF(ww,ITCUSTREQ,GETDATE()) < 12

--ORDER BY Rownum
--GO	

--Select * From AgendaView Order by RowNum --[DUE DATE] asc
--Select * from AgendaViewTest Order by RowNum
--Anomolies:
--Select * From AgendaView WHERE OWNER IS NULL Order by RowNum
--SELECT * FROM AgendaView WHERE AgendaView.[CURRENT OP DATE] IS NULL
--Select * From AgendaViewTest WHERE OWNER IS NULL Order by RowNum
--SELECT * FROM AgendaViewTest WHERE AgendaViewTest.[CURRENT OP DATE] IS NULL

--Select * From RunsTable INNER JOIN RnopTable on Opref=runref and OPRUN = runno  where runref='007F31365' AND RUNNO = 7 
GO
