-- INSERT INTO dbo.AgcmTable (AGPO, AGITEM, AGPART, AGRUN, AGPMCOMMENTS, AGCPEXP) 
-- VALUES
-- ('623000089959', 4, '332U2911-442', 16, 'BURNDOWN', 'N'),
-- ('621001139523', 12, '287W5013-14A', 27, 'BURNDOWN', 'N'),
-- ('633001668515', 1, '413A3008-219B', 30, 'BURNDOWN', 'N'),
-- ('613000490768', 10, '113T1369-916', 6, 'BURNDOWN', 'N'),
-- ('623000090656', 1, '332U2911-140', 9, 'BURNDOWN', 'N'),
-- ('623000090657', 1, '332U2911-405', 8, 'BURNDOWN', 'N');




-- UPDATE dbo.AgcmTable SET AGPMCOMMENTS = 'H/F BACB28AP12Z059 (PO 252179 due 10/15)'
-- WHERE AGPO = '613000444678'
-- AND AGITEM = 10
-- AND AGRUN =  20
-- ;

-- SELECT 
--      (SELECT COUNT(OPREF) FROM RnopTable 
--         INNER JOIN RunsTable ON RUNREF = OPREF 
--         AND RUNNO = OPRUN 
--         WHERE RUNPKPURGED = 0 
--         AND RTRIM(OPINSP) = 'KEITH STONE'
--         AND OPCOMPDATE >= CAST(GETDATE() AS DATE)
--         GROUP BY OPCENTER) AS completed_jobs 
--       ;


-- SELECT PART_NUMBER, RUN, PO, RTRIM(LTRIM(ITEM)) AS ITEM, DAYS_IN_QUEUE, CUSTOMER, PRIORITY, COMMENTS, EXPEDITE, CUST_REQ_DATE, RUN_QTY, WORK_CENTER, WC, t2.WCNDESC as WC_NAME
--       FROM dbo.QueueInfo WITH (nolock)
--       INNER JOIN WcntTable AS t2 ON WC = t2.WCNNUM
--          WHERE WC = '2060'
--          AND SUBSTRING(COMMENTS, 1, 8) = 'BURNDOWN'
--          ORDER BY CUST_REQ_DATE ASC;

-- select top 10 * from AgwoTable;

-- select * from RunsTable WHERE RUNREF = '115u32264'; 
-- UPDATE MrplTable SET MRP_PARTLEVEL = 2 WHERE MRP_SONUM = '413268';
-- select * FROM PartTable WHERE PARTREF = '115u32264';
-- select * from SoitTable WHERE itso = '413268';
-- select * from MrplTable where MRP_SONUM = '413268';
-- select * from SohdTable where SONUMBER = '413268';
-- select * from SohdTable where sonumber = '410812' or SONUMBER = '960812' or SONUMBER = '413268' or SONUMBER = '410983';
-- select * from RnalTable WHERE RAREF = '115u32264'; 
-- select * from RnopTable where opref = '145t190232' and oprun < 14 and oprun > 11;

-- SELECT 
--       (SELECT COUNT(OPREF) FROM RnopTable 
--         INNER JOIN RunsTable ON RUNREF = OPREF 
--         AND RUNNO = OPRUN 
--         WHERE RUNPKPURGED = 0 
--         AND OPCENTER = '2060'
--         AND OPCOMPDATE >= CAST(GETDATE() AS DATE)
--         GROUP BY OPCENTER) AS completed_jobs, 
--       (SELECT COUNT(OPREF) FROM RnopTable 
--         WHERE OPCENTER = '2060'
--         AND OPCOMPLETE = 0 
--         AND OPSCHEDDATE <= CAST(GETDATE() as DATETIME) + 30
--         GROUP BY OPCENTER) AS completed_parts, 
--       SUM(OPACCEPT) as completed_parts
      
--       FROM RnopTable 
--       WHERE OPCENTER = '2060' AND OPCOMPDATE >= CAST(GETDATE() AS DATE);

-- select * from RunsTable WHERE RUNREF = '145t190232' AND RUNNO < 14 AND RUNNO > 11;

-- select * from RnopTable where oprun = 27 and opref = '831z8100319'

-- select * from MrplTable where MRP_SONUM = '413268';
-- OR RAREF = '287T0014325';



-- select * FROM dbo.AgcmTable WHERE AGPMCOMMENTS = '';

-- select * from RunsTable where RUNREF = '831z8100319';



--  SELECT 
--     (SELECT COUNT(OPREF) FROM RnopTable 
--        INNER JOIN RunsTable ON RUNREF = OPREF 
--        AND RUNNO = OPRUN 
--        WHERE RUNPKPURGED = 0 
--        AND OPCOMPDATE >= CAST(GETDATE() AS DATE)
--        GROUP BY OPCENTER) AS completed_jobs, 
--      (SELECT COUNT(OPREF) FROM RnopTable 
--        WHERE OPCOMPLETE = 0 
--        AND OPSCHEDDATE <= CAST(GETDATE() as DATETIME) + 30
--        GROUP BY OPCENTER) AS daily_goal, OPCENTER FROM RnopTable GROUP BY OPCENTER;
 
-- SELECT COUNT(OPREF) as completed FROM dbo.RnopTable 
--     INNER JOIN RunsTable ON RUNREF = OPREF AND RUNNO = OPRUN 
--     WHERE RUNPKPURGED = 0 
--     AND OPCENTER = '1600'
--     AND OPCOMPDATE >= CAST(GETDATE() AS DATE)

--     GROUP BY OPCENTER;
-- SELECT rt.RUNREF, rt.RUNNO, rt.RUNCOMPLETE, rt.RUNQTY, rt.RUNOPCUR, rt.RUNPRIORITY, rt.RUNRTNUM, rnop.OPCENTER, rnop.OPCOMPDATE, rnop.OPINSP
-- FROM dbo.RunsTable as rt
-- LEFT JOIN dbo.RnopTable AS rnop ON rt.RUNREF = rnop.OPREF AND rt.RUNNO = rnop.OPRUN
-- ORDER BY ;



-- select * from TchdTable 
-- where TMDAY >= CAST(GETDATE() AS datetime) - 2
-- ;


SELECT        dbo.EmplTable.PREMNUMBER, CONCAT(RTRIM(dbo.EmplTable.PREMFSTNAME), ' ',RTRIM(dbo.EmplTable.PREMLSTNAME)) AS EMPLOYEE, dbo.PartTable.PARTNUM, dbo.IstcTable.ISRUN, dbo.IstcTable.ISOP
FROM            dbo.EmplTable INNER JOIN
                         dbo.IstcTable ON dbo.EmplTable.PREMNUMBER = dbo.IstcTable.ISEMPLOYEE
                         INNER JOIN dbo.PartTable ON dbo.IstcTable.ISMO = dbo.PartTable.PARTREF
WHERE        (dbo.IstcTable.ISRUN <> 0);

-- select top 1 * from IstcTable;

-- select * from PartTable
--   WHERE PARTREF = '446w165034B';


