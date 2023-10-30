const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");

const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const departmentsRouter = require("./routers/departmentsRouter");
const shiftsRouter = require("./routers/shiftsRouter");
const employeesRouter = require("./routers/employeesRouter");
const allDataRouter = require("./routers/allDataRouter");

const app = express();
const port = 8000;

connectDB();

app.use(cors());
app.use(express.json());

// routers
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/departments", departmentsRouter);
app.use("/shifts", shiftsRouter);
app.use("/employees", employeesRouter);
app.use("/allData", allDataRouter);

app.listen(port, () =>
  console.log(`app is listening at http://localhost:${port}`)
);
