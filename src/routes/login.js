import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
import { selectSql } from "../database/sql";

const router = express.Router();

router.use(cookieParser());
router.use(expressSession({
    secret: 'dilab',
    resave: true,
    saveUninitialized: true,
}))

router.get('/', (req, res) => {
    if (req.cookies.user) {
        res.render('main', { 
            'user': req.cookies.user,
        });
    } else {
        res.render('login');
    }
});

router.get('/logout', (req, res) => {
    if (req.cookies.user) {
        res.clearCookie('user')
        res.redirect("/");
    } else {
        res.redirect("/");
    }
})

router.post('/', async (req, res) => {
    const vars = req.body;
    const users = await selectSql.getUsers();
    var whoAmI = 1;
    let checkLogin = false;

    users.map((user) => {
        if (vars.id == user.id && vars.password === user.Password) {
            checkLogin = true;
            whoAmI = user.id;
            req.session.user = { role: user.Role, checkLogin: true };   //session을 사용해서 user의 getUser을통해 role을 등록
        }
    })


    //로그인시 role을 파악해서 어느페이지로 보낼지 결정하는 코드 
    if (req.session.user == undefined) {
        res.send(`/`)
    } else if (req.session.user.checkLogin && req.session.user.role === 's') {
        res.cookie('user', whoAmI, {
            expires: new Date(Date.now() + 36000000), // ms 단위 (3600000: 1시간 유효)
            httpOnly: true
        })
        res.redirect('/super');
    } else if (req.session.user.checkLogin && req.session.user.role === 'd') {
        res.cookie('user', whoAmI, {
            expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)
            httpOnly: true
        })
        res.redirect('/doctor');
    } else if (req.session.user.checkLogin && req.session.user.role === 'n') {
        res.cookie('user', whoAmI, {
            expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)
            httpOnly: true
        })
        res.redirect('/nurse');
    } else if (req.session.user.checkLogin && req.session.user.role === 'p') {
        res.cookie('user', whoAmI, {
            expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)
            httpOnly: true
        })
        res.redirect('/patient');
    }
})

module.exports = router;
