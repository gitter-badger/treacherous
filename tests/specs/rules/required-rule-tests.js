var assert = chai.assert;
var expect = chai.expect;

describe("Validation Rules", function(){
    describe('Required Rule', function () {

        it('should be valid when non empty string is required', function (done) {
            var rule = new Treacherous.RequiredValidaitonRule();
            var validString = "1";
            rule.validate(validString, true).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when non empty array is required', function (done) {
            var rule = new Treacherous.RequiredValidaitonRule();
            var validArray = [0,1,2,3,4,5,6,7,8,9];
            rule.validate(validArray, true).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when number is required', function (done) {
            var rule = new Treacherous.RequiredValidaitonRule();
            var validNumber = 1;
            rule.validate(validNumber, true).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be invalid when empty string is required', function (done) {
            var rule = new Treacherous.RequiredValidaitonRule();
            var invalidString = "";
            rule.validate(invalidString, true).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

        it('should be invalid when empty array is required', function (done) {
            var rule = new Treacherous.RequiredValidaitonRule();
            var invalidArray = [];
            rule.validate(invalidArray, true).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

        it('should be invalid when null is required', function (done) {
            var rule = new Treacherous.RequiredValidaitonRule();
            rule.validate(null, true).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

        it('should be invalid when undefined is required', function (done) {
            var rule = new Treacherous.RequiredValidaitonRule();
            rule.validate(undefined, true).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            });
        });

        it('should be valid when empty string is not required', function (done) {
            var rule = new Treacherous.RequiredValidaitonRule();
            var validString = "";
            rule.validate(validString, false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when array is not required', function (done) {
            var rule = new Treacherous.RequiredValidaitonRule();
            var validArray = [];
            rule.validate(validArray, false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when array is not required', function (done) {
            var rule = new Treacherous.RequiredValidaitonRule();
            var validArray = [];
            rule.validate(validArray, false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when null is not required', function (done) {
            var rule = new Treacherous.RequiredValidaitonRule();
            rule.validate(null, false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when undefined is not required', function (done) {
            var rule = new Treacherous.RequiredValidaitonRule();
            rule.validate(undefined, false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when string is not required', function (done) {
            var rule = new Treacherous.RequiredValidaitonRule();
            var someString = "hello";
            rule.validate(someString, false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });


        it('should be valid when string is not required', function (done) {
            var rule = new Treacherous.RequiredValidaitonRule();
            var someString = "hello";
            rule.validate(someString, false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });

        it('should be valid when array is not required', function (done) {
            var rule = new Treacherous.RequiredValidaitonRule();
            var someArray = [1];
            rule.validate(someArray, false).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            });
        });
    });
});