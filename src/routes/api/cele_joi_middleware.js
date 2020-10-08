const { celebrate, Segments } = require('celebrate');

function check_body(joi_obj){
    return celebrate({[Segments.BODY]: joi_obj})
}

function check_query(joi_obj){
    return celebrate({[Segments.QUERY]: joi_obj})
}

function check_params(joi_obj){
    return celebrate({[Segments.PARAMS]: joi_obj})
}

module.exports = {check_body, check_query, check_params}