const mongoose = require('mongoose');
require("../models/audit");


const Audit = mongoose.model('audit');


//GET - Retorna los ultimos 20 logs
exports.findAllLogs = async () => {
    let logs = await Audit.find().sort({ 'dateTime': -1 }).limit(20)
    return logs;
};

//GET - Retorna un log con el id proporcionado
exports.findLogById = async (id) => {
    let log = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
        log = await Audit.findById(id)
    };
    return log;
};

