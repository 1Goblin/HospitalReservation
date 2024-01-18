-- Create a view named 'user'
CREATE VIEW `user` AS
SELECT
    `M_id` AS `id`,
    `Password`,
    `Role`
FROM
    `test`.`Medical_specialty`

UNION

SELECT
    `D_id` AS `id`,
    `Password`,
    `Role`
FROM
    `test`.`Doctor`

UNION

SELECT
    `N_id` AS `id`,
    `Password`,
    `Role`
FROM
    `test`.`Nurse`

UNION

SELECT
    `P_id` AS `id`,
    `Password`,
    `Role`
FROM
    `test`.`Patient`;

-- 간호사와 의사를 합친 뷰
CREATE VIEW `MedicalTeam` AS
SELECT
    `D`.`D_id` AS `Id`,
    `D`.`Name`,
    `D`.`PhoneNumber`,
    `D`.`Address`,
    `D`.`D_M_id` AS `M_id`,
    `D`.`Role`
FROM
    `test`.`Doctor` `D`

UNION

SELECT
    `N`.`N_id` AS `Id`,
    `N`.`Name`,
    `N`.`PhoneNumber`,
    `N`.`Address`,
    `N`.`N_M_id` AS `M_id`,
    `N`.`Role`
FROM
    `test`.`Nurse` `N`;

