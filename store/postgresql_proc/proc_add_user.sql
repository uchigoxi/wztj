create or replace function proc_add_user(
  p_name account.name%TYPE,
  p_sex account.sex%TYPE,
  p_password account.password%TYPE,
  p_salt account.salt%TYPE,
  p_key account.key%TYPE,
  p_address account.address%TYPE,
  p_nickname account.nickname%TYPE,
  p_status account.status%TYPE,
  p_regdate account.regdate%TYPE,
  p_age account.age%TYPE,
  p_qq account.qq%TYPE,
  p_tel account.tel%TYPE,
  p_regplatform account.regplatform%TYPE,
  p_pic account.pic%TYPE,
  p_icode account.icode%TYPE,
  p_remark1 account.remark1%TYPE,
  p_remark2 account.remark2%TYPE
)
  returns integer as
$$
declare
  v_insert_id integer;
  v_row_count integer;
  v_tmp integer;
begin
  insert into account (name,sex,password,salt,key,address,nickname,status,regdate,age,qq,tel,regplatform,pic,icode,remark1,remark2)
    values (p_name,p_sex,p_password,p_salt,p_key,p_address,p_nickname,p_status,p_regdate,p_age,p_qq,p_tel,p_regplatform,p_pic,p_icode,p_remark1,p_remark2)
      returning id into strict v_insert_id;
  get diagnostics v_row_count = row_count;
  if v_row_count <> 1 then
    RAISE EXCEPTION 'proc_add_user:insert account error, row_count <> 1';
  end if;
  insert into bank (uid, integral, ticket, money) values (v_insert_id, 0, 0, 0) returning uid into strict v_tmp;
  get diagnostics v_row_count = row_count;
  if v_row_count <> 1 then
    RAISE EXCEPTION 'proc_add_user:insert bank error, row_count <> 1';
  end if;
  return v_insert_id;
end;
$$
LANGUAGE plpgsql VOLATILE;
