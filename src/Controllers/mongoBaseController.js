
// author: Ulvi Memmedov
'use strict';

class MongoController {

    constructor(model) {

        this._model = model;
        this.create = this.create;

    }

    Create = (req, res, next) => {

        let obj = req.body;

        if (!obj) {

            res.json({

                success: false,
                msg: "request body undefined"

            })

        } else {

            let object = new this._model(obj);

            if (object) {

                object.save()

                return res.status(200).json({

                    success: true,
                    object: object

                });


            } else {

                return res.status(500).json({

                    success: false,
                    msg: "Server Error"

                })

            }
        }
    }

    Update = async (req, res, next) => {
        let obj = req.body;

        if (!obj) {

            res.json({

                success: false,
                msg: "request body undefined"

            })

        } else {

            let object = new this._model(obj);

            if (object) {

                object.save()

                return res.status(200).json({

                    success: true,
                    object: object

                });


            } else {

                return res.status(500).json({

                    success: false,
                    msg: "Server Error"

                })

            }
        }
    }
}

module.exports = MongoController;