const express = require('express')
const uuid = require('uuid/v4')
const logger = require('../logger')
const { bookmarks } = require('../store')

const bookRouter = express.Router()
const bodyParser = express.json()


bookRouter
  .route('/bookmarks')
  .get((req, res) => {
    res.json(store.bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const { id, title, url, description, rating  } = req.body

    // validate id, title, url, description, rating exist
    if (!id) {
      logger.error(`ID is required`);
      return res
        .status(400)
        .send('Invalid data');
    }
    
    if (!title) {
        logger.error(`Title is required`);
        return res
          .status(400)
          .send('Invalid data');
      }
      
      if (!url) {
        logger.error(`URL is required`);
        return res
          .status(400)
          .send('Invalid data');
      }

      if (!description) {
        logger.error(`Description is required`);
        return res
          .status(400)
          .send('Invalid data');
      }

      if (!rating || !Number.isInteger(rating)) {
        logger.error(`Rating is a number and is required`);
        return res
          .status(400)
          .send('Invalid data');
      }
  })

    // get an id
const id = uuid();

const bookmark = {
  id: uuid(),
  title,
  url,
  description,
  rating
};

store.bookmarks.push(bookmark);

// log card creation and send response including location header
logger.info(`bookmark with id ${bookmark.id} created`);

res
  .status(201)
  .location(`http://localhost:8000/bookmarks/${bookmark.id}`)
  .json(bookmark);



  // bookmark ID ROUTERRRRR
bookRouter
  .route('/bookmarks/:bookmark_id')
  .get((req, res) => {
    const { bookmark_id } = req.params;

    const bookmark = store.bookmarks.find(c => c.id == bookmark_id)


       // make sure we found a card
       if (!bookmark) {
         logger.error(`bookmark with id ${bookmark_id} not found.`);
         return res
           .status(404)
           .send('bookmark Not Found');
       }
    
       res.json(bookmark);
  })

  .delete((req, res) => {
    const { bookmark_id } = req.params;
   
    const bookIndex = store.bookmarks.findIndex(b => b.id == bookmark_id);

   if (bookIndex === -1) {
    logger.error(`bookmarks with id ${bookmark_id} not found.`);
   return res
      .status(404)
       .send('Bookmark Not found');
    }
  
     store.bookmarks.splice(bookIndex, 1);
    
       logger.info(`bookmarks with id ${bookmark_id} deleted.`);
    
       res
         .status(204)
         .end();
  })



module.exports = bookRouter
