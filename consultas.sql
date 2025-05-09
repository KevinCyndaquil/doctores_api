select 
	d.id as hijo_id,
	d.name as hijo_name,
	s.id as padre_id,
	s.name as padre_name
from deparments d 
left join deparments s 
	on d.parentId = s.id;

select 
	s.id as padre_id,
	s.name as padre_name,
	count(s.id) as hijos_count 
from deparments d 
left join deparments s 
	on d.parentId = s.id 
where s.id is not null
	and s.parentId is null
group by 
	s.id,
	s.name;

select *
from deparments
where parentId = 1;

select 
	d.id as id,
	d.name as name,
	count(s.id) as hijos_count 
from (select *
	from deparments
	where parentId = 2) d 
left join deparments s 
	on s.parentId = d.id 
group by 
	d.id,
	d.name;

select
	d.id as id,
	d.name as name,
	count(s.id) as hijos_count
from deparments d
left join deparments s
	on s.parentId = d.id
where d.parentId = 1
group by 
	d.id,
	d.name;