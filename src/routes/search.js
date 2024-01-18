
import express from "express";
import { selectSql, searchSql } from "../database/sql";

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // 페이지 로딩 시 필요한 작업 수행
    res.render('search',{user: req.cookies.user});
  } catch (error) {
    console.error(error);
    res.status(500).send('내부 서버 오류');
  }
});

router.post('/', async (req, res) => {
  const vars = req.body;
  const action = req.body.action;

  try {
    if (action === 'searchname') {
      const searchname = await searchSql.searchName(vars.Name);
      res.render('search', {user: req.cookies.user, searchname });
    }
    else if (action === 'searchsex') {
        const searchname = await searchSql.searchSex(vars.Sex);
        res.render('search', {user: req.cookies.user, searchname });
    }
    else if (action === 'searchblood') {
        const searchname = await searchSql.searchBlood(vars.Blood);
        res.render('search', {user: req.cookies.user, searchname });
    }  
    else if (action === 'searchpid') {
        const searchname = await searchSql.searchPid(vars.Pid);
        res.render('search', {user: req.cookies.user, searchname });
    }  
    else {
      // action이 'search'가 아닌 경우 '/search'로 리디렉션
      res.redirect('/search');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('내부 서버 오류');
  }
});

module.exports = router;
