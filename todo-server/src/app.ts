import corsOptions from './config/cors.config';
import TodoRoute from './routes/todo.route';

import cors from "cors";

const express = require('express')
const app = express()
app.use(cors(corsOptions));
app.use(express.json());
const port = 3000




app.use("/todo", TodoRoute)

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`)
})