var express = require('express');
var router = express.Router();
var path = require('path');
var feederController = require('../controllers/index');

router.get('/', function (req, res) {
    res.render(path.join(__dirname + '../../views/index'));
});

router.post('/submit', (req, res, next) => {
    feederController.saveData(req, res, function (response) {
        if (response.code === 200) {
            if (response.message === 'Data Found') {
                console.log(response.data);
                res.render(path.join(__dirname + '../../views/reviewSubmit'), {
                    message: response.message,
                    data: response.data
                });
            } else {
                res.render(path.join(__dirname + '../../views/afterSubmit'), {
                    message: response.message
                });
            }
        } else {
            res.render(path.join(__dirname + '../../views/index'));
        }
    })
});

router.post('/update', (req, res, next) => {
    console.log("CAME IN UPDATE");
    feederController.update(req, res, function (response) {
        if (response.code === 200) {
            res.render(path.join(__dirname + '../../views/afterSubmit'), {
                message: response.message
            });
        } else {
            res.render(path.join(__dirname + '../../views/index'));
        }
    })
});
router.get('/update', (req, res, next) => {
    feederController.saveData(req, res, function (response) {
        if (response.code === 200) {
            if (response.message === 'Data Found') {
                console.log(response.data);
                res.render(path.join(__dirname + '../../views/reviewSubmit'), {
                    message: response.message,
                    data: response.data
                });
            } else {
                res.render(path.join(__dirname + '../../views/afterSubmit'), {
                    message: response.message
                });
            }
        } else {
            res.render(path.join(__dirname + '../../views/index'));
        }
    })
});

router.get('/retrieve', (req, res, next) => {
    res.render(path.join(__dirname + '../../views/retrieve'));
});

router.post('/search', (req, res, next) => {
    feederController.search(req, res, function (response) {
        if (response.code === 200) {
            if (response.data) {
                var data = {
                    "Type": (response.data.type).toUpperCase(),
                    "Condition": (response.data.condition).toUpperCase(),
                    "Id": response.data.user_id
                }
                res.render(path.join(__dirname + '../../views/details'), {
                    message: response.message,
                    data: data
                });
            } else {
                res.render(path.join(__dirname + '../../views/afterSubmit'), {
                    message: response.message
                });
            }
        } else {
            res.render(path.join(__dirname + '../../views/afterSubmit'), {
                message: response.message
            });
        }
    })
});

router.get('/health-check', (req, res) => {
    console.log('Health Check Called');
    res.send('Success');
});

module.exports = router;