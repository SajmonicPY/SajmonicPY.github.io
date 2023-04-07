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

const { Types } = mongoose;
  
app.post("/save", async (req, res) => {
      const customId = req.body.customId
      const value = req.body.value
  
      // Convert customId to ObjectId if it exists
      const id = customId && /^[0-9a-fA-F]{24}$/.test(customId)
      ?new Types.ObjectId(customId)
      :undefined;

  
      try {
        const document = await Document.create({ _id: id, value })
        console.log(`Document created with ID ${document.id}`)
        const redirectUrl = `/${document.id}`
        console.log(`Redirecting to ${redirectUrl}`)
        res.redirect(redirectUrl)
      } catch (e) {
        console.error(`Error creating document: ${e.message}`)
        res.render("new", { customId, value })
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
