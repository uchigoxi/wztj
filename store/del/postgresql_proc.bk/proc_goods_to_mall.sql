CREATE OR REPLACE FUNCTION proc_goods_to_mall(
  p_id goods_pool.id%TYPE, 
  p_use_for goods_pool.use_for%TYPE,
  p_goods_status goods_pool.status%TYPE,
  p_price mall.price%TYPE,
  p_price_unit mall.price_unit%TYPE,
  p_sell_user mall.sell_user%TYPE,
  p_sell_date mall.sell_date%TYPE,
  p_mall_status mall.status%TYPE,
  p_remark mall.remark%TYPE
)
  RETURNS integer AS 
$$
declare
  v_insert_id integer;
  v_row_count integer;
  v_goods goods_pool%ROWTYPE;
  v_tmp integer;
begin
  --select * into STRICT v_goods from goods_pool where id = p_id and status = 0 for update;
  select * into v_goods from goods_pool where id = p_id and status = 0 for update;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'gid % not found', p_id;
  END IF;
  update goods_pool set use_date = now(), use_for = p_use_for, status = p_goods_status 
    where id = v_goods.id and status = 0
      returning id into strict v_tmp;
  get diagnostics v_row_count = row_count;
  if v_row_count <> 1 then
    RAISE EXCEPTION 'update goods_pool error, row_count <> 1';
  end if;
  insert into mall (gid,gname,description,sn,bid,pic,category,createdate,price,price_unit,sell_user,sell_date,status,remark)
    values(v_goods.id,v_goods.name,v_goods.description,v_goods.sn,v_goods.bid,v_goods.pic,v_goods.category,now(),p_price,p_price_unit,p_sell_user,p_sell_date,p_mall_status,p_remark)
      returning id into strict v_insert_id;
  get diagnostics v_row_count = row_count;
  if v_row_count <> 1 then
    RAISE EXCEPTION 'insert mall error, row_count <> 1';
  end if;
  return v_insert_id;
end;
$$
LANGUAGE plpgsql VOLATILE
