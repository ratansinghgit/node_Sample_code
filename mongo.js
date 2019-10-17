const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
mongoose.connect('mongodb://localhost/IoT')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
 
const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'hubs' }]
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);

const author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming 333 0',
  age: 50
});

author.save(function (err) {
  if (err) return handleError(err);
console.log("author._id")
console.log(author._id)
  const story1 = new Story({
    title: 'Casino Royale 1 0',
    author: author._id    // assign the _id from the person
  });

  story1.save(function (err) {
    if (err) return handleError(err);
    // thats it!
    // Story.findOne({ title: 'Casino Royale 1 0' }, function(error, story) {
    //   if (error) {
    //     return handleError(error);
    //   }
    //   story.author = author;
    //   console.log(story); // prints "Ian Fleming"
    // });

    Story.
      find({ title: 'Casino Royale 1 0' }).
        populate('author').
      exec(function (err, story) {
    if (err) return handleError(err);

    console.log('The author is %s', story);
    // prints "The author is Ian Fleming"
    
    // prints "The authors age is null'
  });
  });
});

