insert into Medical_specialty value ('internal', '02-1234-5678', 'internal', 'internal', '1234' , 's');
insert into Medical_specialty value ('general', '02-1111-3232', 'general', 'general', '1234' , 's');
insert into Medical_specialty value ('pysical', '02-1111-3232', 'pysical', 'pysical', '1234' , 's');
insert into Medical_specialty value ('emergency', '02-1111-3232', 'emergency', 'emergency', '1234' , 's');

insert into doctor value ('doctor1', 'kim', 'seoul', '010-3234-2132', '1234', 'internal', 'd');
insert into doctor value ('doctor2', 'lee', 'gangdong', '010-5545-3333', '1234', 'general', 'd');
insert into doctor value ('doctor3', 'joo', 'jamsil', '010-4345-2222', '1234', 'pysical', 'd');
insert into doctor value ('doctor4', 'park', 'gangnam', '010-3331-6666', '1234', 'emergency', 'd');
insert into doctor value ('doctor5', 'park', 'yongin', '010-1114-4372', '1234', 'general', 'd');
insert into doctor value ('doctor6', 'park', 'busan', '010-1211-8435', '1234', 'pysical', 'd');

insert into nurse value ('nurse1', 'kang', 'seoul', '010-3643-7222', '1234', 'internal', 'n');
insert into nurse value ('nurse2', 'jang', 'gandong', '010-3123-7222', '1234', 'general', 'n');
insert into nurse value ('nurse3', 'son', 'dagu', '010-6548-2222', '1234', 'pysical', 'n');
insert into nurse value ('nurse4', 'kim', 'jeju', '010-3331-7822', '1234', 'emergency', 'n');


insert into patient value('p1', '11111', 'kang', 'm', 'dagu', 'a', 180, 60, '010-2322-1645', '1234', 'p');
insert into patient value('p2', '22222', 'kim', 'w', 'dagu', 'b', 159, 50, '010-2328-5635', '1234', 'p');
insert into patient value('p3', '33333', 'kill', 'w', 'dagu', 'o', 160, 52, '010-2323-4275', '1234', 'p');
insert into patient value('p4', '44444', 'park', 'm', 'dagu', 'a', 188, 90, '010-2323-4545', '1234', 'p');
insert into patient value('p5', '55555', 'lee', 'm', 'dagu', 'a', 180, 60, '010-2121-1775', '1234', 'p');
insert into patient value('p6', '66666', 'kim', 'w', 'dagu', 'b', 159, 50, '010-2378-5735', '1234', 'p');
insert into patient value('p7', '77777', 'kill', 'w', 'dagu', 'o', 160, 52, '010-2723-4275', '1234', 'p');
insert into patient value('p8', '88888', 'kang', 'm', 'dagu', 'a', 188, 90, '010-7323-4745', '1234', 'p');

insert into reservation value ('r1', '2023-12-13', 'p1', 'doctor1', 'internal');
insert into reservation value ('r2', '2023-12-14', 'p2', 'doctor2', 'general');
insert into reservation value ('r3', '2023-12-15', 'p3', 'doctor3', 'pysical');
insert into reservation value ('r4', '2023-12-16', 'p4', 'doctor4', 'emergency');
insert into reservation value ('r5', '2023-12-17', 'p5', 'doctor5', 'general');
insert into reservation value ('r6', '2023-12-18', 'p6', 'doctor6', 'general');
insert into reservation value ('r7', '2023-12-19', 'p3', 'doctor3', 'pysical');
insert into reservation value ('r8', '2023-12-20', 'p4', 'doctor4', 'emergency');


insert into Treatment (Date, T_N_id, T_P_id, T_id, Info) values ("2023-2-8", "nurse1","p1", "T1", "test");
insert into Treatment (Date, T_N_id, T_P_id, T_id, Info) values ("2023-2-9", "nurse2","p2", "T2", "test");
insert into Treatment (Date, T_N_id, T_P_id, T_id, Info) values ("2023-2-10", "nurse3","p3", "T3", "test");
insert into Treatment (Date, T_N_id, T_P_id, T_id, Info) values ("2023-2-11", "nurse3","p4", "T4", "test");


start TRANSACTION;
set autocommit = 0; -- aoutocomitt을 off해줌으로써 트랜잭션의 목적인 ACID를 사용한다.