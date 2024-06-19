"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidation = void 0;
const modelValidate_1 = require("./models/modelValidate");
// don't write like that again)))
const inputValidation = (video) => {
    const errors = {
        errorsMessages: []
    };
    const result = (0, modelValidate_1.validateMethodFromDady)(video);
    Object.keys(result).forEach(e => {
        if (result[e]) {
            errors.errorsMessages.push({
                message: 'error!!!', field: e
            });
        }
    });
    return errors;
};
exports.inputValidation = inputValidation;
