CREATE OR REPLACE FUNCTION proc_prize_standard_to_goods_batch(
  p_aid   activity_standard.id%TYPE
)
  RETURNS integer[] AS
$$
declare
  v_insert_id integer;
  v_row_count integer;
  v_prize_standard prize_standard%ROWTYPE;
  v_return_id integer[]; 
begin
select id into v_insert_id from activity_standard  where (sdate > now() or edate < now() or status=1) and id=p_aid;
  for v_prize_standard in select * from prize_standard where aid=p_aid and status=0 for update loop
    delete from prize_standard where id = v_prize_standard.id ;
    get diagnostics v_row_count = row_count;
    if v_row_count = 0 then
      RAISE EXCEPTION 'proc_prize_standard_to_goods_batch:delete prize_standard error, row_count = 0';
    end if;
    update goods_pool set use_date = null, use_for = 0, status = 0 ,remark1=concat(remark1,'prize_standard的活动ID:',v_prize_standard.aid,'物品来自prize_standard,','退库日期:',now()) where id = v_prize_standard.gid
      returning id into v_insert_id;
    get diagnostics v_row_count = row_count;
    if v_row_count = 0 then
      RAISE EXCEPTION 'proc_prize_standard_to_goods_batch:update goods_pool error, row_count = 0';
    end if;
    select array_append(v_return_id, v_insert_id) into v_return_id;
  end loop;
return v_return_id;
end;
$$
LANGUAGE plpgsql VOLATILE
 