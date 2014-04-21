CREATE OR REPLACE FUNCTION proc_goods_to_mall_batch(
    p_gname            goods_pool.name%TYPE,
    p_description      mall.description%TYPE,
    p_num              integer,
    p_use_for          goods_pool.use_for%TYPE,
    p_goods_status     goods_pool.status%TYPE,
    p_mall_name        mall.name%TYPE,
    p_mall_price       mall.price%TYPE,
    p_mall_price_unit  mall.price_unit%TYPE,
    p_mall_status      mall.status%TYPE,
    p_create_date      mall.create_date%TYPE,
    p_pic              mall.pic%TYPE,
    p_remark1          mall.remark1%TYPE,
    p_remark2          mall.remark2%TYPE
)
  RETURNS integer[] AS
$$
declare
  v_insert_id integer;
  v_row_count integer;
  v_goods goods_pool%ROWTYPE;
  v_return_id integer[];
begin
  perform * from mall where name = p_mall_name;
  if found then
    raise exception 'mall already exist %',p_mall_name;
  end if;
  select count(*) into v_row_count from goods_pool where name = p_gname and status = 0;
  IF v_row_count < p_num THEN
    RAISE EXCEPTION 'proc_goods_to_mall_batch:库存商品: %, 剩余num: % < 添加数量%', p_gname, v_row_count, p_num;
  END IF;
  for v_goods in select * from goods_pool where name = p_gname and status = 0 limit p_num for update loop
    update goods_pool set use_date = now(), use_for = p_use_for, status = p_goods_status
      where id = v_goods.id and status = 0;
    get diagnostics v_row_count = row_count;
    if v_row_count =0 then
      RAISE EXCEPTION 'proc_goods_to_mall_batch:update goods_pool error, row_count = 0';
    end if;
    insert into mall (name,description,status,create_date,price,price_unit,gid,gname,pic,remark1,remark2)
      values(p_mall_name,p_description,p_mall_status,p_create_date,p_mall_price,p_mall_price_unit,v_goods.id,v_goods.name,p_pic,p_remark1,p_remark2) returning id into v_insert_id;
    get diagnostics v_row_count = row_count;
    if v_row_count = 0 then
      RAISE EXCEPTION 'proc_goods_to_mall_batch:insert mall error, row_count = 0';
    end if;
    select array_append(v_return_id, v_insert_id) into v_return_id;
  end loop;
  return v_return_id;
end;
$$
LANGUAGE plpgsql VOLATILE
