var db = require('mongoose')

var TopicSchema = new db.Schema({
  author: String,
  'topic': {
    'title': String,
    'content': String
  }
})

var Topic = db.model('Topic', TopicSchema)

module.exports = Topic