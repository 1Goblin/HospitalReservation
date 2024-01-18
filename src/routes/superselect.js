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

//supervisor로 로그인 후 nurse,doctor update
router.post('/', async (req, res) => {
    
    const vars = req.body;
    const action = req.body.action;
    //vars 는 페이지에서 입력받은 데이터이다


    if(action === 'insert'){
        const data={
            Employee_id: vars.e_id,
            Name: vars.name,
            Address: vars.address,
            PhoneNumber: vars.phonenumber,
            Medical_id: vars.m_id,
            Password: vars.password,
            Role: vars.role,
        };
        if(data.Role === 'd'){
            await insertSql.insertDoctor(data);
        }
        else if(data.Role ==='n'){
            await insertSql.insertNurse(data);
        }
    } 


    //vars에서 받은 값의 role이 d이면 doctor라는 의미임으로 updateDoctor를켜준다
    if(vars.role === 'd'){
        if(action === 'modify'){
            const data = {
                D_id: vars.id,
                Name: vars.name,
                Address: vars.address,
                PhoneNumber: vars.phonenumber,
                D_M_id: vars.m_id,
                Role: vars.role,
            };
            await updateSql.updateDoctor(data);
        }
        else if(action === 'delete'){
            const data = {
                D_id: vars.id,
                Name: vars.name,
                Address: vars.address,
                PhoneNumber: vars.phonenumber,
                D_M_id: vars.m_id,
                Role: vars.role,
            };
            await deleteSql.deleteDoctor(data);
        }
    }
    //vars에서 받은 값의 role이 n이면 nurse라는 의미임으로 updateNurse를켜준다
    else if(vars.role === 'n'){
        if(action === 'modify'){
            const data = {
                N_id: vars.id,
                Name: vars.name,
                Address: vars.address,
                PhoneNumber: vars.phonenumber,
                N_M_id: vars.m_id,
                Role: vars.role,
            };
            await updateSql.updateNurse(data);
        }
        else if(action === 'delete'){
            const data={
                N_id: vars.id,
                Name: vars.name,
                Address: vars.address,
                PhoneNumber: vars.phonenumber,
                N_M_id: vars.m_id,
                Role: vars.role,
            };
            await deleteSql.deleteNurse(data);
        }
    }

    res.redirect('/super');
})

module.exports = router;