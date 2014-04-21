create or replace function proc_add_goods_batch(
  p_name goods_pool.name%TYPE,
  p_description goods_pool.description%TYPE,
  p_bid goods_pool.bid%TYPE,
  p_pic goods_pool.pic%TYPE,
  p_category goods_pool.category%TYPE,
  p_createdate goods_pool.createdate%TYPE,
  p_use_date goods_pool.use_date%TYPE,
  p_use_for goods_pool.use_for%TYPE,
  p_status goods_pool.status%TYPE,
  p_owner goods_pool.owner%TYPE,
  p_sdate goods_pool.sdate%TYPE,
  p_edate goods_pool.edate%TYPE,
  p_remark1 goods_pool.remark1%TYPE,
  p_remark2 goods_pool.remark2%TYPE,
  p_sn_array character[]
)
  returns integer[] as
$$
declare
  v_insert_id integer;
  v_row_count integer;
  v_sn_count integer;
  v_return_id integer[];
begin
  select array_length(p_sn_array,1) into v_sn_count;
  for i in 1..v_sn_count loop
    insert into goods_pool (name,description,sn,bid,pic,category,createdate,use_date,use_for,status,owner,sdate,edate,remark1,remark2)
      values (p_name,p_description,p_sn_array[i],p_bid,p_pic,p_category,p_createdate,p_use_date,p_use_for,p_status,p_owner,p_sdate,p_edate,p_remark1,p_remark2)
        returning id into strict v_insert_id;
    get diagnostics v_row_count = row_count;
    if v_row_count <> 1 then
        RAISE EXCEPTION 'proc_add_goods_batch 插入数据错误, insert goods_pool error, row_count <> 1';
    end if;
    v_return_id[i] := v_insert_id;
  end loop;
  return v_return_id;
end;
$$
LANGUAGE plpgsql VOLATILE;
