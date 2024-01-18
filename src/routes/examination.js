import express from "express";
import { selectSql, updateSql, deleteSql, insertSql} from "../database/sql";


const router = express.Router();


//examination 을 get한다. (환자,의사, 날짜, 검사세부정보 )
router.get('/', async (req, res) => {
    if (req.cookies.user) {
        const examination = await selectSql.getExamination(req.cookies.user);
        res.render('examination', { user: req.cookies.user, examination });
    } else {
        res.render('/')
    }
});


//doctor로 로그인 후 reservation update,delete
router.post('/', async (req, res) => {
    
    const vars = req.body;
    const action = req.body.action;
    //vars 는 페이지에서 입력받은 데이터이다

    if(action === 'update'){
        const data ={
            E_id: vars.E_id,
            D_id: vars.D_id,
            Date: vars.Date,
            Info: vars.Info,
        };
        await updateSql.updateExamination(data);
    }
    else if(action === 'delete'){
        const data={
            P_id: vars.P_id,
            Date: vars.Date,
            E_id: vars.E_id,
        };
        await deleteSql.deleteExamination(data);
    }
    else if(action === 'inpatient'){
        const data={
            E_id: vars.E_id,
            D_id: vars.D_id,
            P_id: vars.P_id,
            Date: vars.Date,
            E_id: vars.E_id,
        };
        await insertSql.insertInpatient(data);
    }

    res.redirect('/examination');
})

module.exports = router;