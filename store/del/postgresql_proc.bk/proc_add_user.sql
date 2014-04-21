create or replace function proc_add_user(
  p_name account.name%TYPE,
  p_password account.password%TYPE,
  p_salt account.salt%TYPE,
  p_key account.key%TYPE,
  p_address account.address%TYPE,
  p_nickname account.nickname%TYPE,
  p_status account.status%TYPE,
  p_regdate account.regdate%TYPE,
  p_bid account.bid%TYPE,
  p_bkey account.bkey%TYPE,
  p_area account.area%TYPE,
  p_temp account.temp%TYPE,
  p_regplatform account.regplatform%TYPE,
  p_pic account.pic%TYPE,
  p_icode account.icode%TYPE
)
  returns integer as
$$
declare
  v_insert_id integer;
  v_row_count integer;
  v_tmp integer;
begin
  insert into account (name,password,salt,key,address,nickname,status,regdate,bid,bkey,area,temp,regplatform,pic,icode)
    values (p_name,p_password,p_salt,p_key,p_address,p_nickname,p_status,p_regdate,p_bid,p_bkey,p_area,p_temp,p_regplatform,p_pic,p_icode)
      returning id into strict v_insert_id;
  get diagnostics v_row_count = row_count;
  if v_row_count <> 1 then
    RAISE EXCEPTION 'insert account error, row_count <> 1';
  end if;
  insert into bank (uid, integral, ticket, money) values (v_insert_id, 0, 0, 0) returning uid into strict v_tmp;
  get diagnostics v_row_count = row_count;
  if v_row_count <> 1 then
    RAISE EXCEPTION 'insert bank error, row_count <> 1';
  end if;
  return v_insert_id;
end;
$$
LANGUAGE plpgsql VOLATILE;
