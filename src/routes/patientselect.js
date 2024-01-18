import express from "express";
import { selectSql, transactionSql, deleteSql, insertSql } from "../database/sql";


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
        const reservation = await selectSql.getReservation(req.cookies.user);
        const patient = await selectSql.getPatient(req.cookies.user);
        const allreservation = await selectSql.getAllReservation(req.cookies.user);
        const booked = await selectSql.getBooked();
        const doctor = await selectSql.getDoctor();
        res.render('patient', { user: req.cookies.user, reservation, patient, allreservation, booked, doctor});
    } 
    else {
        res.redirect('/');
    } 
});

//doctor로 로그인 후 reservation update,delete
router.post('/', async (req, res) => {
    
    const vars = req.body;
    const action = req.body.action;
    const pid= req.cookies.user;
    //vars 는 페이지에서 입력받은 데이터이다
    
    await transactionSql.setSavePoint();

    try {
        if (action === 'delete') {
            const data = {
                R_id: vars.R_id,
                P_id: vars.P_id,
                D_id: vars.D_id,
                M_id: vars.M_id,
                Date: vars.Date,
            };
            await deleteSql.deleteReservation(data);
            await transactionSql.setCommit();
        } else if (action === 'reservation') {
            const data = {
                D_id: vars.D_id,
                M_id: vars.M_id,
                Date: vars.Date,
            };
            await insertSql.insertReservation(data, pid);
            await transactionSql.setCommit();
        }

        return res.redirect('/patient');
    } catch (error) {
        console.error("Error in transaction:", error);
        await transactionSql.setRollback();
        return res.status(500).send("Error in transaction");
    }

    return res.redirect('/patient');
})

module.exports = router;