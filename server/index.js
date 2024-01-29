require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const port = process.env.PORT || 5000
const router = require("./routes/routes")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('uploads'))


mongoose.connect(process.env.DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => console.log('Conectado com sucesso!'))
  .catch(err => console.log(err))

app.use("/api/post",router)
app.listen(port,() => {
  console.log(`servidor rodando na porta ${port}`)
})





