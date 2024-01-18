import express from "express";
import { selectSql, updateSql, deleteSql, insertSql } from "../database/sql";


const router = express.Router();


//로그인할때 사용자별로 다른 페이지
router.get('/', async (req, res) => {
    if (req.session.user == undefined) {
        res.redirect('/');
    } 
    //sepervisor
    else if (req.session.user.role === 's') {
        const doctor = await selectSql.getDoctor(req.cookies.user);
        const nurse = await selectSql.getNurse(req.cookies.user);
        res.render('super', { user: req.cookies.user, doctor, nurse });
    } 
    //doctor
    else if (req.session.user.role === 'd') {
        const Dreservation = await selectSql.getDreservation(req.cookies.user);
        res.render('doctor', { user: req.cookies.user, Dreservation});
    }
    //nurse
    else if (req.session.user.role === 'n') {
        const treatment = await selectSql.getTreatment(req.cookies.user);
        res.render('nurse', { user: req.cookies.user, treatment });
    } 
    //patient
    else if (req.session.user.role === 'p') {
        const doctor = await selectSql.getDoctor(req.cookies.user);
        const nurse = await selectSql.getNurse(req.cookies.user);
        res.render('patient', { user: req.cookies.user, doctor, nurse });
    } 
    else {
        res.redirect('/');
    } 
});


//doctor로 로그인 후 reservation update,delete
router.post('/', async (req, res) => {
    
    const vars = req.body;
    const action = req.body.action;
    //vars 는 페이지에서 입력받은 데이터이다

    if(action === 'modify'){
        const data ={
            D_id: vars.D_id,
            R_id: vars.R_id,
            Date: vars.Date,
            P_id: vars.P_id,
            PatientName: vars.PatientName,
            Sex: vars.Sex,
            Address: vars.Address,
            Blood: vars.Blood,
            Height: vars.Height,
            Weight: vars.Weight,
            PatientPhoneNumber: vars.PatientPhoneNumber,
        };
        await updateSql.updateReserPatient(data);

    }
    else if(action === 'delete'){
        const data={
            D_id: vars.D_id,
            R_id: vars.R_id,
            Date: vars.Date,
            P_id: vars.P_id,
            PatientName: vars.PatientName,
            Sex: vars.Sex,
            Address: vars.Address,
            Blood: vars.Blood,
            Height: vars.Height,
            Weight: vars.Weight,
            PatientPhoneNumber: vars.PatientPhoneNumber,
        };
        await deleteSql.deleteReservation(data);
    }

    else if(action === 'examination'){
        console.log(vars);
        const data={
            D_id: vars.D_id,
            P_id: vars.P_id,
            Date: vars.Date,
        };
        
        await insertSql.insertEx(data);
        return res.redirect('/examination');
    }




    return res.redirect('/doctor');
})

module.exports = router;