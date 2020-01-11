drop temporary table if exists temp;
create temporary table temp( val char(255) );
set @str ="1,2,3,4,5";
set @sql = concat("insert into temp (val) values ('", replace(@str, ",", "'),('"),"');");
prepare stmt1 from @sql;
execute stmt1;
select distinct(val) from temp;