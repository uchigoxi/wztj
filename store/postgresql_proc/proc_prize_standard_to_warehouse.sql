CREATE OR REPLACE FUNCTION proc_prize_standard_to_warehouse(
  p_uid account.id%TYPE,
  p_aid activity_standard.id%TYPE,
  p_prize_level  prize_standard.prize_level%TYPE,
  p_prize_status prize_standard.status%TYPE,
  p_warehouse_status  warehouse.status%TYPE,
  p_wfrom             warehouse.wfrom%TYPE,
  p_create_date       warehouse.create_date%TYPE,
  p_remark1           warehouse.remark1%TYPE,
  p_remark2           warehouse.remark2%TYPE
)
  RETURNS integer AS
$$
declare
  v_insert_id integer;
  v_row_count integer;
  v_prize_standard   prize_standard%ROWTYPE;
begin
  select * into  v_prize_standard from prize_standard where aid=p_aid  and prize_level=p_prize_level and status=0 limit 1 for update;
  if not found then
    RAISE EXCEPTION 'proc_prize_standard_to_warehouse:活动ID:%不存在，奖品等级:%不存在', p_aid,p_prize_level;
  end if;
  update prize_standard set uid=p_uid, prize_date=now(), status = p_prize_status
    where id = v_prize_standard.id and status = 0;
  get diagnostics v_row_count = row_count;
  if v_row_count = 0 then
    RAISE EXCEPTION 'proc_prize_standard_to_warehouse:update prize_standard error, row_count = 0';
  end if;
  insert into warehouse(status,create_date,uid,gid,gname,wfrom,psid,remark1,remark2)
    values(p_warehouse_status,p_create_date,p_uid,v_prize_standard.gid,v_prize_standard.gname,p_wfrom,v_prize_standard.id,p_remark1,p_remark2)
      returning id into strict v_insert_id;
  get diagnostics v_row_count = row_count;
  if v_row_count =0 then
    RAISE EXCEPTION 'proc_prize_standard_to_warehouse:insert warehouse error, row_count =0';
  end if;
  return v_insert_id;
end;
$$
LANGUAGE plpgsql VOLATILE
