create or replace function proc_activity_person_play(
p_aid     activity_person.id%TYPE,
p_uid     bank.uid%TYPE,
p_winner  integer
)
  returns integer as
$$
declare
  v_row_count integer;
  v_activity_person  activity_person%ROWTYPE;
begin
  select * into v_activity_person from activity_person where id=p_aid and status = 0 and date_trunc('day',create_date) = date_trunc('day',now()) and max_person > (win + lost) for update;
  if not found then
    raise exception 'proc_activity_person_play:不可用的活动ID %',p_aid;
  end if;
  perform * from bank where uid =p_uid and integral >= v_activity_person.cost for update;
  if not found then
      raise exception 'proc_activity_person_play:不可用的用户ID %',p_uid;
  end if;

  if p_winner = 0 then
    update activity_person set win = (win + 1) where id=p_aid;
    get diagnostics v_row_count = row_count;
    if v_row_count = 0 then
      RAISE EXCEPTION 'proc_activity_person_play:update activity_person error, row_count = 0';
    end if;
    update bank set integral = (integral - v_activity_person.cost) where uid =p_uid and integral >= v_activity_person.cost;
    get diagnostics v_row_count = row_count;
    if v_row_count = 0 then
      RAISE EXCEPTION 'proc_activity_person_play:update bank error, row_count = 0';
    end if;
    return v_activity_person.cost;
  elsif p_winner = 1 then
    update activity_person set lost = (lost + 1) where id=p_aid;
    get diagnostics v_row_count = row_count;
    if v_row_count = 0 then
      RAISE EXCEPTION 'proc_activity_person_play:update activity_person error, row_count = 0';
    end if;
    update bank set integral = (integral + v_activity_person.cost*v_activity_person.percent) where uid =p_uid;
    get diagnostics v_row_count = row_count;
    if v_row_count = 0 then
      RAISE EXCEPTION 'proc_activity_person_play:update bank error, row_count = 0';
    end if;
    return v_activity_person.cost*v_activity_person.percent;
  else
    raise exception 'proc_activity_person_play:不可用的winner %',p_winner;
    return 0;
  end if;
end;
$$
LANGUAGE plpgsql VOLATILE;