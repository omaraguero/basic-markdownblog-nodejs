const express = require('express')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog', {
})

app.set('view engine' , 'ejs')


app.use(express.urlencoded({extended : false}))
app.use(methodOverride('_method'))

app.use(express.static(__dirname + '/public'))

app.get('/articles', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles : articles})
})
app.listen(5000)

app.use('/articles', articleRouter)

