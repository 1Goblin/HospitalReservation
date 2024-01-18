import express from "express";
import logger from "morgan";
import path from "path";
import liveReload from 'livereload';
import connectLiveReload from 'connect-livereload';

import loginRouter from "./routes/login";
import logoutRouter from './routes/logout';
import superselectRouter from "./routes/superselect";
import doctorselectRouter from "./routes/doctorselect";
import examinationRouter from "./routes/examination";
import nurseselectRouter from "./routes/nurseselect";
import patientselectRouter from "./routes/patientselect";
import searchRouter from "./routes/search";
import inpatientRouter from "./routes/inpatient";



const PORT = 3000;

const liveReloadServer = liveReload.createServer(); 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100)
});

const app = express();

app.use(connectLiveReload());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, 'public')));
// css 경로 설정

app.use(logger("dev"));

app.use("/", loginRouter);
app.use("/logout", logoutRouter);
app.use("/super", superselectRouter);
app.use("/doctor", doctorselectRouter);
app.use("/examination", examinationRouter);
app.use("/nurse", nurseselectRouter);
app.use("/patient", patientselectRouter);
app.use("/search", searchRouter);
app.use("/inpatient", inpatientRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
