CREATE OR REPLACE FUNCTION proc_mall_to_warehouse(
  p_mid mall.id%TYPE,
  p_uid account.id%TYPE,
  p_mall_status mall.status%TYPE,
  p_warehouse_status warehouse.status%TYPE,
  p_remark warehouse.remark%TYPE
)
  RETURNS integer AS
$$
declare
  v_insert_id integer;
  v_row_count integer;
  v_mall mall%ROWTYPE;
  v_tmp integer;
begin
  --select id into STRICT v_tmp from account where id = p_uid and status = 0;
  select id into v_tmp from account where id = p_uid and status = 0;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'uid % not found', p_uid;
  END IF;
  --select * into STRICT v_mall from mall where id = p_mid and status = 0 for update;
  select * into v_mall from mall where id = p_mid and status = 0 for update;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'mid % not found', p_mid;
  END IF;
  update mall set sell_date = now(), sell_user = p_uid, status = p_mall_status
    where id = v_mall.id and status = 0
      returning id into strict v_tmp;
  get diagnostics v_row_count = row_count;
  if v_row_count <> 1 then
    RAISE EXCEPTION 'update mall error, row_count <> 1';
  end if;
  insert into warehouse (uid,gid,mid,gname,description,sn,bid,pic,category,createdate,price,price_unit,status,remark)
    values(p_uid,v_mall.gid,v_mall.id,v_mall.gname,v_mall.description,v_mall.sn,v_mall.bid,v_mall.pic,v_mall.category,now(),v_mall.price,v_mall.price_unit,p_warehouse_status,p_remark)
      returning id into strict v_insert_id;
  get diagnostics v_row_count = row_count;
  if v_row_count <> 1 then
    RAISE EXCEPTION 'insert warehouse error, row_count <> 1';
  end if;
  return v_insert_id;
end;
$$
LANGUAGE plpgsql VOLATILE
