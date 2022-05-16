const db = require("../../models");
const Url = db.urltable;
const validUrl = require('valid-url');
const baseUrl = 'http:localhost:5000'
const date = new Date().toLocaleString();
const { generateRandomString } = require('../../services/util');



/*Automatically allocated unique shortcode */
exports.url = async (req, res) => {
    try {
        const { longUrl } = req.body // destructure the longUrl from req.body.longUrl

        // check base url if valid using the validUrl.isUri method
        if (!validUrl.isUri(baseUrl)) {
            return res.status(401).json('Invalid base URL')
        }

        // if valid, we create the url code
        const urlCode = generateRandomString(6)

        if (validUrl.isUri(longUrl)) {

            let url = await Url.findOne({ where: { longUrl: longUrl } })

            // url exist and return the respose
            if (url) {
                res.json(url)
            } else {
                // join the generated short code the the base url
                const shortUrl = baseUrl + '/' + urlCode

                // invoking the Url model and saving to the DB
                url = new Url({
                    longUrl,
                    shortUrl: shortUrl,
                    shortCode: urlCode,
                    click: 0,
                    createdAt: date,
                    updatedAt: date
                })
                console.log(url);
                await url.save()
                return res.status(200).json(url);
            }
        }
        else {
            return res.status(401).json('Invalid longUrl')
        }
    }
    catch (err) { /*Error handling */
        return res.status(500).json({ error: err.message })
    }
}


/*Desired shortcode  if it is available. */
exports.desireUrl = async (req, res) => {
    try {
        const { longUrl, shortCode } = req.body // destructure the longUrl from req.body.longUrl

        // check base url if valid using the validUrl.isUri method
        if (!validUrl.isUri(baseUrl)) {
            return res.status(401).json('Invalid base URL')
        }

        if (shortCode.length < 4) {
            return res.status(400).json({ message: "Short code not less than 4 character" });
        }

        /*Regex */
        let letters = /^[0-9a-zA-Z]+$/;

        if (shortCode.match(letters)) {

            let shortCodeExist = await Url.findOne({
                where: {
                    shortCode: shortCode
                }
            })

            if (shortCodeExist) {
                return res.status(400).json({ message: "Short code occupied" });
            }

            if (validUrl.isUri(longUrl)) {

                let url = await Url.findOne({
                    where: {
                        longUrl: longUrl
                    }
                })
                // url exist and return the respose
                if (url) {
                    return res.status(200).json(url)
                } else {
                    // join the generated short code the the base url
                    const shortUrl = baseUrl + '/' + shortCode

                    // invoking the Url model and saving to the DB
                    url = new Url({
                        longUrl,
                        shortUrl: shortUrl,
                        shortCode,
                        click: 0,
                        createdAt: date,
                        updatedAt: date
                    })
                    await url.save()

                    return res.status(200).json(url);
                }
            } else {
                return res.status(401).json('Invalid longUrl')
            }
        }
        else {
            return res.status(401).json({ message: 'Please enter alphnumeric character' });
        }

    }
    catch (err) { /*Error handling */
        return res.status(500).json({ error: err.message })
    }
}

/*Short code detail*/
exports.states = async (req, res) => {
    try {
        const { shortCode } = req.params; /*Short Code from parameter */
        let urlData = await Url.findOne({ where: { shortCode: shortCode } }); /*Find data by short code */
        if (urlData) {  /*If data exist send it to response */
            urlData
            return res.status(200).json(urlData);
        }
        return res.status(404).json({ message: "Not Found" }); /*Show no data found */
    }
    catch (err) { /*Error handling */
        res.status(500).json({ error: err.message });
    }
}

/*Short code report*/
exports.statesReport = async (req, res) => {
    try {
        let urlData = await Url.findAll({order:[["id","Desc"]]}); /*Find all data from Url table */
        if (urlData) {
            return res.status(200).json(urlData); /*Show all data in response */
        }
        return res.status(404).json({ message: "Not found" }); /*Show not found message in response */
    }
    catch (err) { /*Error handling */
        res.status(500).json({ error: err.message });
    }
}

exports.urlHits = async (req, res) => {
    try {
        const urlId = parseInt(req.params.id); /*Coversion in interger */
        let url = await Url.findOne({ where: { id: urlId } }); /*Find id to check it exist or not */
        if (url) { /*Update record of click and updateAt field in url table */
            await Url.update({
                click: url.click + 1,
                updatedAt: date
            }, { where: { id: urlId } })

            let updateUrl = await Url.findOne({ where: { id: urlId } }); /*Find the lastest record from the table */
            return res.status(200).json({ message: `Number of visit on url is ${updateUrl.click}` }) /*Show response  */
        }
        return res.status(200).json({ message: `No url found for this id ${urlId}` }) /*Show the id not found for this url*/
    }
    catch (err) { /*Error handling */
        res.status(500).json({ error: err.message })
    }
}