-- INSERT INTO dbo.AgcmTable (AGPO, AGITEM, AGPART, AGRUN, AGPMCOMMENTS, AGCPEXP) 
-- VALUES
-- ('612000614022', 1, 294U2328-3', 21, 'BURNDOWN ETRAC(9/27)', 'N'),
-- ('612000614022', 1, '294U2330-4 IMA3', 11, 'BURNDOWN ETRAC(9/27)', 'N'),
-- ('612000615409', 1, '146U7734-86', 6, 'BURNDOWN ETRAC(9/28)', 'N'),


-- UPDATE dbo.AgcmTable SET AGPMCOMMENTS = 'BURNDOWN' 
-- WHERE AGPO = '613000529971'
-- AND AGITEM = 1
-- ;

-- select top 10 * from AgwoTable;

-- select top 10 * from dbo.AgendaViewDIQ 
-- where owner = (select AGWCOwner from dbo.AgwoTable where AGWC = 1600); 

-- SELECT * FROM dbo.AgcmTable WHERE AGPO='613000524555';

-- DELETE FROM dbo.AgcmTable WHERE AGPO='613000524555' AND AGRUN=10;

-- SELECT * FROM dbo.RnopTable 
--   WHERE OPCENTER = '1600'
--   AND OPCOMPDATE >= CAST('2021-09-22 00:00:00' AS smalldatetime);

-- SELECT rt.RUNREF, rt.RUNNO, rt.RUNCOMPLETE, rt.RUNQTY, rt.RUNOPCUR, rt.RUNPRIORITY, rt.RUNRTNUM, rnop.OPCENTER, rnop.OPCOMPDATE, rnop.OPINSP
-- FROM dbo.RunsTable as rt
-- LEFT JOIN dbo.RnopTable AS rnop ON rt.RUNREF = rnop.OPREF AND rt.RUNNO = rnop.OPRUN
-- ORDER BY ;
