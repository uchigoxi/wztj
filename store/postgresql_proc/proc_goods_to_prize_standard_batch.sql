CREATE OR REPLACE FUNCTION proc_goods_to_prize_standard_batch(
  p_aid activity_standard.id%TYPE,
  p_gname goods_pool.name%TYPE,
  p_num integer,
  p_use_for goods_pool.use_for%TYPE,
  p_goods_status goods_pool.status%TYPE,
  p_prize_name prize_standard.prize_name%TYPE,
  p_prize_level prize_standard.prize_level%TYPE,
  p_prize_status prize_standard.status%TYPE,
  p_create_date prize_standard.create_date%TYPE,
  p_remark1 prize_standard.remark1%TYPE,
  p_remark2 prize_standard.remark2%TYPE
)
  RETURNS integer[] AS
$$
declare
  v_insert_id integer;
  v_row_count integer;
  v_goods goods_pool%ROWTYPE;
  v_return_id integer[];
begin
  --select count(*) into STRICT v_row_count from activity_standard where id = p_aid and status = 0;
  select count(*) into v_row_count from activity_standard where id = p_aid and status = 0;
  IF v_row_count = 0 THEN
    RAISE EXCEPTION 'proc_goods_to_prize_standard_batch:aid % not found', p_aid;
  END IF;
  select count(*) into v_row_count from prize_standard where prize_level = p_prize_level and aid = p_aid;
  IF v_row_count > 0 THEN
    RAISE EXCEPTION 'proc_goods_to_prize_standard_batch:prize_level has exits';
  END IF;
  select count(*) into v_row_count from goods_pool where name = p_gname and status = 0;
  IF v_row_count < p_num THEN
    RAISE EXCEPTION 'proc_goods_to_prize_standard_batch:库存商品gname: %, 剩余num: %,  < 添加数量%', p_gname, v_row_count, p_num;
  END IF;
  for v_goods in select * from goods_pool where name = p_gname and status = 0 limit p_num for update loop
    update goods_pool set use_date = now(), use_for = p_use_for, status = p_goods_status
      where id = v_goods.id and status = 0;
    get diagnostics v_row_count = row_count;
    if v_row_count <> 1 then
      RAISE EXCEPTION 'proc_goods_to_prize_standard_batch:update goods_pool error, row_count <> 1';
    end if;
    insert into prize_standard (status,create_date,prize_name,prize_level,aid,gid,gname,remark1,remark2)
      values(p_prize_status,p_create_date,p_prize_name,p_prize_level,p_aid,v_goods.id,v_goods.name,p_remark1,p_remark2)
        returning id into v_insert_id;
    get diagnostics v_row_count = row_count;
    if v_row_count <> 1 then
      RAISE EXCEPTION 'proc_goods_to_prize_standard_batch:insert prize_standard error, row_count <> 1';
    end if;
    select array_append(v_return_id, v_insert_id) into v_return_id;
  end loop;
  --IF NOT FOUND THEN
    --RAISE EXCEPTION 'gname % not found', p_gname;
  --END IF;
  return v_return_id;
end;
$$
LANGUAGE plpgsql VOLATILE
