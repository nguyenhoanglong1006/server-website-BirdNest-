module.exports = (req, io) => {

    return new function () {

        const _this = this;

        const _lang = (req.lang) ? req.lang : {};

        const _module = require('./address.module')(req);

        _this.getlist = async () => {

            let result = await _module.getList();

            req.success(null, result);
        }

        _this.changestatus = async () => {

            let id = +req.params.id || 0;

            let skip = false, message = _lang.failure;

            if (id > 0) {

                let result = await _module.updateStatus(id);

                skip = result.rowCount > 0 ? true : false;
            }

            skip == true ? req.success(null, { id: id }) : req.failure(message);
        }


        _this.getrow = async () => {

            let id = req.params.id || 0;

            let result = await _module.getRow(id);

            result = result && result.length > 0 ? result[0] : {}

            req.success(null, result);
        }

        _this.process = async () => {

            let id = +req.params.id || 0;
            let data = req.data || {};

            let skip = false;

            let message = _lang.failure;

            if (Object.keys(data).length > 0) {

                data.maker_date = req.Date.datetime();

                data.maker_id = req.crypto.decrypt(req.auth.info_id);

                data.language_id = +req.language_id;

                let checkProcess = await _module.checkProcess(data.name.trim(), id);

                if (checkProcess[0]['count'] == 0) {

                    let result = await _module.process(data, id);

                    if (+result.rowCount > 0) {

                        id = (id == 0) ? result.insertId : id;

                        skip = true;
                    }

                } else {

                    message = _lang.nameExist;
                }

            }
            skip == true ? req.success(null, id) : req.failure(message);
        }

        _this.remove = async () => {

            let id = +req.params.id || 0;

            let skip = false;

            if (+id > 0) {

                let result = await _module.remove(id);

                skip = +result.rowCount > 0  ? true : false;
            }

            skip == true ? req.success() : req.failure();
        }
    }
}