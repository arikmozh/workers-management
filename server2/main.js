const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");

const authRouter = require("./routers/authRouter");
// const usersRouter = require("./routers/usersRouter");
// const employeesRouter = require("./routers/employeesRouter");
// const departmentsRouter = require("./routers/departmentsRouter");
// const shiftsRouter = require("./routers/shiftsRouter");

const app = express();
const port = 8000;

connectDB();

app.use(cors());
app.use(express.json());

// routers
app.use("/auth", authRouter);
// app.use("/users", usersRouter);
// app.use("/employees", employeesRouter);
// app.use("/departments", departmentsRouter);
// app.use("/shifts", shiftsRouter);

app.listen(port, () =>
  console.log(`app is listening at http://localhost:${port}`)
);
