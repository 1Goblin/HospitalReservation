import mysql from "mysql2";

const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'hospital',
    password: 'pokm1569*',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

// async / await 사용
const promisePool = pool.promise();

// selec query
export const selectSql = {
  getUsers: async () => {
    const [rows] = await promisePool.query(`
    SELECT D_id AS id, Password AS Password, Role AS Role FROM hospital.Doctor
    UNION
    SELECT P_id AS id, Password AS Password, Role AS Role FROM hospital.Patient
    UNION
    SELECT N_id AS id, Password AS Password, Role AS Role FROM hospital.Nurse
    UNION
    SELECT M_id AS id, Password AS Password, Role AS Role FROM hospital.Medical_specialty;
    `);
    return rows;
  },
  //TODO
  getDoctor: async () => {
    const sql = `select *from doctor;`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getNurse: async () => {
    const sql = `select *from nurse`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  //로그인한 D_id 의 값을 가지고있는 reservation의 patinet의 정보를 출력해주는 sql
  getDreservation: async (data) => {
    const sql = `SELECT
                D.D_id,
                R.R_id,
                R.Date,
                P.P_id,
                P.SSN,
                P.Name AS PatientName,
                P.Sex,
                P.Address,
                P.Blood,
                P.Height,
                P.Weight,
                P.PhoneNumber AS PatientPhoneNumber
            FROM
                hospital.Reservation R
            JOIN
                hospital.Patient P ON R.R_P_id = P.P_id
            JOIN
                hospital.Doctor D ON R.R_D_id = D.D_id
            WHERE
                D.D_id = "${data}"`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getExamination: async (data) => {
    const sql = `select *from Examination where E_D_id="${data}"`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getTreatment: async (data) => {
    const sql = `select *from Treatment where T_N_id = "${data}"`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getReservation: async (data) => {
    const sql = `select *from Reservation where R_P_id = "${data}"`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getPatient: async (data) => {
    const sql = `select *from Patient where P_id = "${data}"`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getAllReservation: async (data) => {
    const sql = `select *from Reservation`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getAllPatient: async () => {
    const sql = `select *from Patient`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getBooked: async () => {
    const sql = `SELECT Reservation.R_id, Reservation.Date, Doctor.D_id,Doctor.D_M_id
    FROM hospital.Reservation
    JOIN hospital.Doctor ON Reservation.R_D_id = Doctor.D_id;`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getInpatient: async (data) => {
    const sql = `select *from Inpatient where I_P_id ="${data}"`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  
}


//업데이트 쿼리
export const updateSql = {
  updateDoctor: async (data) => {
      console.log(data);
      const sql = `
          UPDATE Doctor 
          SET D_id = "${data.D_id}", Name = "${data.Name}", 
              Address = "${data.Address}", PhoneNumber = "${data.PhoneNumber}",
              D_M_id = "${data.D_M_id}", Role = "${data.Role}"
          WHERE D_id = "${data.D_id}"`;
      console.log(sql);
      await promisePool.query(sql);
  },
  updateNurse: async (data) => {
    console.log(data);
    const sql = `
        UPDATE Nurse 
        SET N_id = "${data.N_id}", Name = "${data.Name}", 
            Address = "${data.Address}", PhoneNumber = "${data.PhoneNumber}",
            N_M_id = "${data.N_M_id}", Role = "${data.Role}"
        WHERE N_id = "${data.N_id}"`;
    console.log(sql);
    await promisePool.query(sql);
  },

  //doctor로 로그인 후 docotor에게 온 reservaion을 업데이트하는 sql
  updateReserPatient: async (data) => {
    console.log(data);
    const sql=`UPDATE hospital.Reservation R
    JOIN hospital.Patient P ON R.R_P_id = P.P_id
    JOIN hospital.Doctor D ON R.R_D_id = D.D_id
    SET
        D.D_id = "${data.D_id}",
        R.Date = "${data.Date}",
        P.P_id = "${data.P_id}",
        P.Name = "${data.PatientName}",
        P.Sex = "${data.Sex}",
        P.Address = "${data.Address}",
        P.Blood = "${data.Blood}",
        P.Height = "${data.Height}",
        P.Weight = "${data.Weight}",
        P.PhoneNumber = '${data.PatientPhoneNumber}'
    WHERE
        R.R_id = "${data.R_id}"`;
    console.log(sql);
    await promisePool.query(sql);
  },
  
  updateExamination: async (data) => {
    console.log(data);
    const sql = `
        UPDATE Examination 
        SET Date = "${data.Date}", Info = "${data.Info}"
        WHERE E_D_id = "${data.D_id}" and E_id = "${data.E_id}"`;
    console.log(sql);
    await promisePool.query(sql);
  },

  updateTreatment: async (data, nid) => {
    console.log(data);
    const sql = `
        UPDATE Treatment 
        SET date = "${data.Date}", Info = "${data.Info}", T_P_id = "${data.P_id}"
        WHERE T_N_id = "${nid}" and T_id = "${data.T_id}"`;
    console.log(sql);
    await promisePool.query(sql);
  },
};


//delete 쿼리
export const deleteSql = {
  deleteDoctor: async (data) => {
      console.log(data);
      const sql = `delete from Doctor where D_id="${data.D_id}"`
      console.log(sql);
      await promisePool.query(sql);
  },
  deleteNurse: async (data) => {
    console.log(data);
    const sql = `delete from Nurse where N_id="${data.N_id}"`
    console.log(sql);
    await promisePool.query(sql);
  },
  deleteReservation: async (data) => {
    console.log(data);
    const sql = `delete from Reservation where R_id="${data.R_id}"`
    console.log(sql);
    await promisePool.query(sql);
  },
  deleteExamination: async (data) => {
    console.log(data);
    const sql = `delete from Examination where E_P_id="${data.P_id}" and E_id="${data.E_id}"`
    console.log(sql);
    await promisePool.query(sql);
  },
  deleteReservation: async (data) => {
    console.log(data);
    const sql = `delete from Reservation where 
    R_id="${data.R_id}" and Date="${data.Date}" and R_P_id="${data.P_id}"
     and R_D_id="${data.D_id}" and R_M_id="${data.M_id}"`
    console.log(sql);
    await promisePool.query(sql);
  },
  deleteTreatment: async (data) => {
    console.log(data);
    const sql = `delete from Treatment where 
    T_id="${data.T_id}" and T_N_id="${data.N_id}" and T_P_id="${data.P_id}"`
    console.log(sql);
    await promisePool.query(sql);
  },

};


export const insertSql = {
  insertEx: async (data) => {
      const sql = `insert into Examination (Date, E_id, E_D_id, E_P_id) values
       ("${data.Date}", CONCAT("${data.P_id}","${data.Date}"),"${data.D_id}", "${data.P_id}")`
      console.log(data.Date);
      await promisePool.query(sql);
  },
  insertReservation: async (data,pid) => {
    const sql = `insert into Reservation (R_id, Date, R_P_id,  R_D_id, R_M_id) values 
     (CONCAT("${pid}","${data.Date}"), "${data.Date}", "${pid}", "${data.D_id}", "${data.M_id}")`
    console.log(data);
    await promisePool.query(sql);
  },
  insertDoctor: async (data) => {
    const sql = `insert into Doctor values
     ("${data.Employee_id}", "${data.Name}", "${data.Address}", "${data.PhoneNumber}",
      "${data.Password}", "${data.Medical_id}", "${data.Role}")`
    console.log(data);
    await promisePool.query(sql);
  },
  insertNurse: async (data) => {
    const sql = `insert into Nurse values
    ("${data.Employee_id}", "${data.Name}", "${data.Address}", "${data.PhoneNumber}",
     "${data.Password}", "${data.Medical_id}", "${data.Role}")`
    console.log(data);
    await promisePool.query(sql);
  },
  insertTreatment: async (data, nid) => {
    const sql = `insert into Treatment (Date, T_id, T_N_id, T_P_id, Info) values
     ("${data.Date}", CONCAT("${data.P_id}","${data.Date}"),"${nid}", "${data.P_id}", "${data.Info}")`
    await promisePool.query(sql);
  },
  insertInpatient: async (data) => {
    const sql = `insert into Inpatient (I_id, I_date, I_P_id) values
     (CONCAT("${data.E_id}","${data.D_id}"),"${data.Date}", "${data.P_id}")`
    await promisePool.query(sql);
  },
};


export const transactionSql = {
  setCommit: async () => {
      const sql = `COMMIT`
      console.log(sql);
      await promisePool.query(sql);
  },
  setRollback: async () => {
    const sql = `ROLLBACK`
    console.log(sql);
    await promisePool.query(sql);
  },
  setSavePoint: async () => {
    const sql = `COMMIT`
    console.log(sql);
    await promisePool.query(sql);
},

};



export const searchSql = {
  searchName: async (data) => {
    const sql = `select * from patient where Name="${data}"`;
    console.log(sql);
    const result = await promisePool.query(sql); //이부분 아래설명
    return result[0]; // 또는 필요한 형태로 결과를 가공해서 반환
  },
  searchSex: async (data) => {
    const sql = `select * from patient where Sex="${data}"`;
    console.log(sql);
    const result = await promisePool.query(sql); //이부분 아래설명
    return result[0]; // 또는 필요한 형태로 결과를 가공해서 반환
  },
  searchBlood: async (data) => {
    const sql = `select * from patient where Blood="${data}"`;
    console.log(sql);
    const result = await promisePool.query(sql); //이부분 아래설명
    return result[0]; // 또는 필요한 형태로 결과를 가공해서 반환
  },
  searchPid: async (data) => {
    const sql = `select * from patient where P_id="${data}"`;
    console.log(sql);
    const result = await promisePool.query(sql); //이부분 아래설명
    return result[0]; // 또는 필요한 형태로 결과를 가공해서 반환
  },
};

/*
searchSql.searchName 메소드에서 
await promisePool.query(sql);를 호출하면서 반환된 결과를 반환하지 않고 있습니다. 
await promisePool.query(sql);는 프로미스를 반환하기 때문에 이를 반환하지 않으면 호출자에게는 어떠한 결과도 전달되지 않습니다.
*/