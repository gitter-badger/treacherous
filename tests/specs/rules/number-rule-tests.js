var assert = chai.assert;
var expect = chai.expect;

describe("Validation Rules", function(){
    describe('Number Rule', function () {

        it('should be valid when number is provided', function (done) {
            var rule = new Treacherous.NumberValidationRule();
            var validNumber = 10;
            rule.validate(validNumber).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when number string is provided', function (done) {
            var rule = new Treacherous.NumberValidationRule();
            var validStringNumber = "10";
            rule.validate(validStringNumber).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new Treacherous.NumberValidationRule();
            rule.validate(null).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be invalid when a valid decimal is provided', function (done) {
            var rule = new Treacherous.NumberValidationRule();
            var validDecimal = 10.25;
            rule.validate(validDecimal).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

        it('should be invalid when a valid decimal string is provided', function (done) {
            var rule = new Treacherous.NumberValidationRule();
            var validDecimalString = "10.25";
            rule.validate(validDecimalString).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

        it('should be invalid when a non numeric string is provided', function (done) {
            var rule = new Treacherous.NumberValidationRule();
            var validDecimalString = "not a number";
            rule.validate(validDecimalString).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });
    });
});