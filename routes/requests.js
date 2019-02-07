const express  = require('express');
const router   = express.Router();
const config   = require('../config/database');

const Req = require('../models/reqs');

//Upload new request
router.post('/new', (req, res) => {
    let newReq = new Req({
        title: req.body.title,
        description: req.body.description,
        request: req.body.request,
        response: req.body.response,
        ale_messages: req.body.ale_messages
    });

    newReq.save((err, req) => {
        if(err) {
            res.send(err);
            // throw err
        }
        else {
            res.send("data added!")
        }
    });
});

//Update an existing obj
router.post('/modify', (req, res) => {
    Req.updateReq(req.body, (err, ret) => {
        res.send(err ? err : ret)
    });
});

router.get('/request', (req, res) => {
    Req.getAttrByTitle(req.query.title, 'request', (err, attrVal) => {
        res.send(err ? err : attrVal)
    });
});

router.get('/response', (req, res) => {
    Req.getAttrByTitle(req.query.title, 'response', (err, attrVal) => {
        res.send(err ? err : attrVal)
    });
});

router.get('/ale_messages', (req, res) => {
    Req.getAttrByTitle(req.query.title, 'ale_messages', (err, attrVal) => {
        if(err) {
            return res.send(err)
        }

        res.send(attrVal.join('\r\n\r\n'))
    });
});

router.get('/description', (req, res) => {
    Req.getAttrByTitle(req.query.title, 'description', (err, attrVal) => {
        res.send(err ? err : attrVal)
    });
});

//Profile
router.get('/', (req, res, next) => {
    Req.getReqByTitle(req.query.title, (err, returnedReq) => {
        if (err) {
            throw err;
        }

        if (!returnedReq) {
            return res.json({success: false, msg: 'Data not found for title:'+req.query.title});
        } else {
            return res.json(returnedReq)
        }
    });
});

module.exports = router;