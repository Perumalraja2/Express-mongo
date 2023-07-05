const  express = require('express')
const indexRouter = require('./routes/index')
const userRouter  = require ('./routes/mentor')
const studentRouter = require('./routes/student')
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

app.use('/',indexRouter)
app.use('/mentor',userRouter)
app.use('/student',studentRouter)

app.listen(8000,()=>console.log("Server running in port"))