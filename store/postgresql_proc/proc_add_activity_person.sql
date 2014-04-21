create or replace function proc_add_activity_person(
p_status       activity_person.status%TYPE,
p_name         activity_person.name%TYPE,
p_type         activity_person.type%TYPE,
p_description  activity_person.description%TYPE,
p_uid          activity_person.uid%TYPE,
p_percent      activity_person.percent%TYPE,
p_cost         activity_person.cost%TYPE,
p_max_person   activity_person.max_person%TYPE,
p_total_integral activity_person.total_integral%TYPE,
p_create_date  activity_person.create_date%TYPE,
p_remark1      activity_person.remark1%TYPE,
p_remark2      activity_person.remark2%TYPE
)
  returns integer as
$$
declare
  v_insert_id integer;
  v_row_count integer;
begin
  update bank set integral = (integral - p_total_integral) where uid = p_uid and integral >= p_total_integral
    returning uid into strict v_insert_id;
  insert into activity_person (status,name,type,description,uid,percent,cost,max_person,total_integral,create_date,win,lost,remark1,remark2)
    values (p_status,p_name,p_type,p_description,p_uid,p_percent,p_cost,p_max_person,p_total_integral,p_create_date,0,0,p_remark1,p_remark2)
      returning id into strict v_insert_id;
  get diagnostics v_row_count = row_count;
    if v_row_count = 0 then
      RAISE EXCEPTION 'proc_add_activity_person:insert activity_person error, row_count = 0';
    end if;
  return v_insert_id;
end;
$$
LANGUAGE plpgsql VOLATILE;

