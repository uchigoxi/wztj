create or replace function proc_activity_person_cancel(
)
  returns integer[] as
$$
declare
  v_insert_id integer;
  v_row_count integer;
  v_activity_person  activity_person%ROWTYPE;
  v_return_id integer[];
begin
  for v_activity_person in select * from activity_person where status = 0 and (date_trunc('day',create_date) <> date_trunc('day',now())) for update loop
    update bank set integral = integral + v_activity_person.total_integral + v_activity_person.win*v_activity_person.cost - v_activity_person.lost*v_activity_person.cost*v_activity_person.percent where uid=v_activity_person.uid;
    get diagnostics v_row_count = row_count;
    if v_row_count = 0 then
      RAISE EXCEPTION 'proc_activity_person_cancel:update bank error, row_count = 0';
    end if;
    update activity_person set status = 1 where id = v_activity_person.id and status = 0 returning id into strict v_insert_id;
    get diagnostics v_row_count = row_count;
    if v_row_count = 0 then
      RAISE EXCEPTION 'proc_activity_person_cancel:update activity_person error, row_count = 0';
    end if;
    select array_append(v_return_id, v_insert_id) into v_return_id;
  end loop;
  return v_return_id;
end;
$$
LANGUAGE plpgsql VOLATILE