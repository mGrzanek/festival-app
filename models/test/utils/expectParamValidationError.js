const expect = require('chai').expect;

const expectParamValidationError = async (model, field) => {
    try {
        await model.validate();
        throw new Error('Validation should have failed.');
    } catch(err) {
        if(Array.isArray(field)){
            for(let value of field){
                expect(err.errors[value.name]).to.exist;
            }
        }
        else if(field) {
            expect(err.errors[field]).to.exist;
        } else expect(err.errors).to.not.be.empty;
    }
}

module.exports = expectParamValidationError;