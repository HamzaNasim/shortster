const express = require('express');
const router = express.Router();
const controller = require('./controller');

/*Post the url*/
router.post("/url",controller.url);

/*Post the url with desire short code */
router.post("/desireUrl",controller.desireUrl);

/*Get the list of short code report */
router.get("/states/",controller.statesReport)

/*Get detail of specific short code*/
router.get("/:shortCode/states/",controller.states);

/*Create the click on url and update the last access date */
router.patch('/url/:id',controller.urlHits)

module.exports = router;