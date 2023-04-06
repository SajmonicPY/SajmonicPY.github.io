const express = require("express")
const app = express()
app.set("view engine", "ejs")
app.use(express.static("styles"))
app.use(express.urlencoded({ extended: true }))

const Document = require("./models/Document")
const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://admin:viHGLOi02ywhgvle@pastelab.2olrr9b.mongodb.net/?retryWrites=true&w=majority');


app.get("/", (req, res) => {
    res.render('landing')
})

app.get("/new", (req, res) => {
    res.render("new")
  })

app.post("/save", async (req, res) => {
    const value = req.body.value
    try {
      const document = await Document.create({ value })
      res.redirect(`/${document.id}`)
    } catch (e) {
      res.render("new", { value })
    }
})

app.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
      const document = await Document.findById(id)
  
      res.render("text-display", { text: document.value, id })
    } catch (e) {
      res.redirect("/")
    }
})

app.listen(5000)