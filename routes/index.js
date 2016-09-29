var express = require('express');
var router = express.Router();
var Person = require('./../models/Person');

/* GET home page. */
router.get('/', function(req, res, next) {
    // new Person()
    //     .fetch()
    //     .then(function(people) {

    //     });
    Person
        .forge()
        .fetchAll()
        .then(function(people) {
            if (!people) {
                return res
                        .status(404)
                        .json({
                            code: 404,
                            data: {}
                        });
            }

            return res
                    .status(200)
                    .json({
                        code: 200,
                        data: people
                    });
        })
        .catch(function(err) {
            return res
                    .status(500)
                    .json({
                        code: 500,
                        data: {}
                    });
        });
});

router.post('/', function(req, res, next) {
    Person.validateIfNameExists(req.body.name)
          .then(function(result) {
            console.log('result post', result);
          });

    Person
        .forge(req.body)
        .save()
        .then(function(person) {
            return res
                    .status(200)
                    .json({
                        code: 200,
                        data: person
                    });
        })
        .catch(function(err) {
            console.log(err);
            return res
                    .status(500)
                    .json({
                        code: 500,
                        data: {}
                    });
        });
});

router.put('/:id', function(req, res, next) {
    Person
        .forge({ id: req.params.id })
        .fetch()
        .then(function(person) {
            if (!person) {
                return res
                        .status(404)
                        .json({
                            code: 404,
                            data: {}
                        });
            }

            person
                .save({
                    name: req.body.name || person.get('name') ,
                    age : req.body.age  || person.get('age')
                })
                .then(function(person) {
                    return res
                            .status(200)
                            .json({
                                code: 200,
                                data: person
                            })
                })
                .catch(function(err) {
                    return res
                            .status(500)
                            .json({
                                code: 500,
                                data: {}
                            });

                });
        })
        .catch(function(err) {
            return res
                    .status(500)
                    .json({
                        code: 500,
                        data: {}
                    });

        });
});

router.delete('/:id', function(req, res, next) {
    Person
        .forge({ id: req.params.id })
        .fetch()
        .then(function(person) {
            if (!person) {
                return res
                        .status(404)
                        .json({
                            code: 404,
                            data: {}
                        });
            }

            person
                .destroy()
                .then(function() {
                    res
                        .status(204)
                        .json({
                            code: 204,
                            data: person
                        });
                })
                .catch(function(err) {
                    return res
                            .status(500)
                            .json({
                                code: 500,
                                data: {}
                            });
                });
        })
        .catch(function(err) {
            return res
                    .status(500)
                    .json({
                        code: 500,
                        data: {}
                    });
        });
});

module.exports = router;
