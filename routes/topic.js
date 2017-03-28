var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var Topic = require('../models/topic')
var app = express()

app.use(bodyParser.json({
    strict: false
}));
app.use(bodyParser.urlencoded({ extended: true }));

router.post('/add', (req, res, next) => {
    var reqData = JSON.parse(req.body.topic)
    console.log(reqData)
    console.log(req.body.data.title)
        // new Topic(req.body)
    new Topic({
            author: req.body.author,
            topic: {
                title: reqData.title,
                content: reqData.ctx
            }
        })
        .save((err, doc) => {
            if (err) { console.error(err) } else {
                res.json({
                    code: 0,
                    success: true,
                    message: '添加话题成功',
                    doc: doc
                })
            }
        })

})

module.exports = router