CREATE OR REPLACE FUNCTION proc_mall_to_warehouse_batch(
  p_uid               account.id%TYPE,
  p_mall_name         mall.name%TYPE,
  p_num               integer,
  p_mall_status       mall.status%TYPE,
  p_warehouse_status  warehouse.status%TYPE,
  p_wfrom             warehouse.wfrom%TYPE,
  p_create_date       warehouse.create_date%TYPE,
  p_remark1           warehouse.remark1%TYPE,
  p_remark2           warehouse.remark2%TYPE
)
  RETURNS integer[] AS
$$
declare
  v_price_total integer;
  v_update_id integer;
  v_insert_id integer;
  v_row_count integer;
  v_mall   mall%ROWTYPE;
  v_return_id integer[];
begin

  select count(*) into v_row_count from mall where name = p_mall_name and status = 0 ;
  IF v_row_count < p_num THEN
    RAISE EXCEPTION 'proc_mall_to_warehouse:商品name: %, 剩余num: %,  < 购买数量%', p_mall_name, v_row_count, p_num;
  END IF;

  select price into strict v_row_count from mall where name = p_mall_name and status = 0 limit 1;
  perform * from bank where uid = p_uid and integral >=  (v_row_count*p_num);
  if not found then
    raise exception 'proc_mall_to_warehouse:user: % has not enough integral , need %', p_uid,v_row_count*p_num;
  end if;
  update bank set integral = integral - (v_row_count*p_num) where uid = p_uid returning uid into strict v_row_count;
  for v_mall in select * from mall where name = p_mall_name and status = 0 limit p_num for update loop
    update mall set uid = p_uid, status = p_mall_status, sell_date = now() where id = v_mall.id and status = 0 returning id into strict v_update_id;
    insert into warehouse(status,create_date,uid,gid,gname,wfrom,mid,remark1,remark2)
      values(p_warehouse_status,p_create_date,p_uid,v_mall.gid,v_mall.gname,p_wfrom,v_mall.id,p_remark1,p_remark2)
        returning id into strict v_insert_id;
    select array_append(v_return_id, v_update_id) into v_return_id;
  end loop;
  --IF NOT FOUND THEN
    --RAISE EXCEPTION 'gname % not found', p_gname;
  --END IF;
  return v_return_id;
end;
$$
LANGUAGE plpgsql VOLATILE

