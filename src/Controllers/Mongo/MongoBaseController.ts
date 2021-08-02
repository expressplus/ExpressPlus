const { AsyncHandler } = require('express-async-handler');

module.exports = class MongoController2 {

    private model: any;

    constructor(model) {

        this.model = model;
        this.Create = this.Create;
        this.Update = this.Update;
        this.Find = this.Find;
    }

    Create = AsyncHandler(async (req, res) => {

        let obj = req.body;

        if (!obj) {

            res.json({

                success: false,
                msg: "request body undefined"

            })

        } else {

            if (!this.model) {

                res.json({

                    success: false,
                    msg: "model undefined"

                })


            } else {

                let object = new this.model(obj);

                if (object) {

                    object.save()

                    return res.status(200).json({

                        success: true,
                        msg: "Model created",
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

    });
    /**
    @params
    id
    **/
    Update = AsyncHandler(async (req, res, next) => {
        let obj = req.body;

        if (!obj) {

            res.json({

                success: false,
                msg: "request body undefined"

            })

        } else {

            if (!this.model) {

                res.json({

                    success: false,
                    msg: "model undefined"

                })

            } else {

                const data = await this.model.findById({ _id: obj.id });

                if (!data) {

                    res.json({

                        success: false,
                        msg: "data not found"

                    })

                } else {

                    let update = await this.model.findByIdAndUpdate({ _id: obj.id })

                    if (!update) {

                        res.json({

                            success: false,
                            msg: "server error update"

                        })

                    } else {

                        return res.status(200).json({

                            success: true,
                            msg: "update success",
                            object: update

                        });

                    }
                }
            }
        }
    });
    /**
    @params
    **/
    Find = AsyncHandler(async (req, res, next) => {

        if (!this.model) {

            res.status(200).json({

                success: false,
                msg: "model undefined"

            })

        } else {

            let data = await this.model.find({})

            if (!data) {

                res.json({

                    success: false,
                    msg: "data not found"

                })

            } else {

                return res.status(200).json({

                    success: true,
                    msg: "find success",
                    object: data

                });

            }

        }


    });
    /**
    @params
    id
    **/
    FindOne = AsyncHandler(async (req, res, next) => {

        if (!this.model) {
            
            res.status(200).json({

                success: false,
                msg: "model undefined"
            
            })

        }else {

            let { id } = req.body;

            if (!id) {

                res.json({

                    success: false,
                    msg: "id undefined"

                })

            }else {

                let data = await this.model.findById({_id:id})

                if (!data) {

                    res.json({

                        success: false,
                        msg: "data not found"

                    })

                } else {

                    return res.status(200).json({

                        success: true,
                        msg: "find success",
                        object: data

                    });

                }

            }

        }

    })
    

}

