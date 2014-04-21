CREATE OR REPLACE FUNCTION proc_mall_to_goods_batch(
  p_mall_name   mall.name%TYPE
)
  RETURNS integer[] AS
$$
declare
  v_insert_id integer;
  v_row_count integer;
  v_mall mall%ROWTYPE;
  v_return_id integer[];
begin
  perform * from mall  where name = p_mall_name and status = 0;
  if not found then
    raise exception 'mall does not exist %',p_mall_name;
  end if;
  for v_mall in select * from mall where name=p_mall_name and status=0 for update loop
    delete from mall where id = v_mall.id and status = 0 ;
    get diagnostics v_row_count = row_count;
    if v_row_count = 0 then
      RAISE EXCEPTION 'proc_mall_to_goods_batch:delete mall error, row_count = 0';
    end if;
    update goods_pool set use_date = null, use_for = 0, status = 0 ,remark1=concat(remark1,'mall的ID:',v_mall.id,'物品来自mall,','退库日期:',now()) where id = v_mall.gid
      returning id into v_insert_id;
    get diagnostics v_row_count = row_count;
    if v_row_count = 0 then
      RAISE EXCEPTION 'proc_mall_to_goods_batch:update goods_pool error, row_count = 0';
    end if;
    select array_append(v_return_id, v_insert_id) into v_return_id;
  end loop;
  return v_return_id;
end;
$$
LANGUAGE plpgsql VOLATILE
