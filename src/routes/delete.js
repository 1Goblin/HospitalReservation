import express from "express";
import { selectSql, deleteSql } from "../database/sql";


const router = express.Router();


router.post('/', async (req, res) => {

    const vars = req.body;
    const action = req.body.delete;
    if(vars.role === 'n' && action === 'delete'){
        const data = {
            N_id: vars.id,
            Name: vars.name,
            Address: vars.address,
            PhoneNumber: vars.phonenumber,
            N_M_id: vars.m_id,
            Role: vars.role,
        };
        await deleteSql.deleteNurse(data);
    }

    else if(vars.role === 'd' && action === 'delete'){
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

    res.redirect('/super');
})