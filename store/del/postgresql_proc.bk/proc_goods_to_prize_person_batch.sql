CREATE OR REPLACE FUNCTION proc_goods_to_prize_person_batch(
  p_aid activity_person.id%TYPE,
  p_gname goods_pool.name%TYPE,
  p_num integer,
  p_use_for goods_pool.use_for%TYPE,
  p_goods_status goods_pool.status%TYPE,
  p_prize_name prize_person.prize_name%TYPE,
  p_prize_level prize_person.prize_level%TYPE,
  p_prize_status prize_person.status%TYPE,
  p_remark prize_person.remark%TYPE
)
  RETURNS integer[] AS
$$
declare
  v_insert_id integer;
  v_row_count integer;
  v_goods goods_pool%ROWTYPE;
  v_tmp integer;
  v_return_id integer[];
begin
  --select count(*) into STRICT v_tmp from activity_person where id = p_aid and status = 0;
  select count(*) into v_tmp from activity_person where id = p_aid and status = 0;
  IF v_tmp = 0 THEN
    RAISE EXCEPTION 'aid % not found', p_aid;
  END IF;
  select count(*) into v_tmp from prize_person where prize_level = p_prize_level and aid = p_aid;
  IF v_tmp > 0 THEN
    RAISE EXCEPTION 'prize_level has exits';
  END IF;
  select count(*) into v_tmp from goods_pool where name = p_gname and status = 0;
  IF v_tmp < p_num THEN
    RAISE EXCEPTION 'gname: %, num: %,  < %', p_gname, v_tmp, p_num;
  END IF;
  for v_goods in select * from goods_pool where name = p_gname and status = 0 limit p_num for update loop
    update goods_pool set use_date = now(), use_for = p_use_for, status = p_goods_status
      where id = v_goods.id and status = 0
        returning id into strict v_tmp;
    get diagnostics v_row_count = row_count;
    if v_row_count <> 1 then
      RAISE EXCEPTION 'update goods_pool error, row_count <> 1';
    end if;
    insert into prize_person (aid,status,create_date,gid,gname,description,sn,bid,pic,category,prize_name,prize_level,remark)
      values(p_aid,p_prize_status,now(),v_goods.id,v_goods.name,v_goods.description,v_goods.sn,v_goods.bid,v_goods.pic,v_goods.category,p_prize_name,p_prize_level,p_remark)
        returning id into strict v_insert_id;
    get diagnostics v_row_count = row_count;
    if v_row_count <> 1 then
      RAISE EXCEPTION 'insert mall error, row_count <> 1';
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
