var assert = chai.assert;
var expect = chai.expect;

describe('Ruleset Builder', function () {

    it('should correctly add rules to the ruleset', function () {
        var rulesetBuilder = new Treacherous.RulesetBuilder();

        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
                .addRule("required", true)
                .addRule("maxLength", 20)
            .build();

        expect(ruleset).not.to.be.null;
        expect(ruleset.rules).to.include.keys("foo");
        expect(ruleset.rules.foo.length).to.equal(2);
        expect(ruleset.rules.foo[0]).to.eql(new Treacherous.RuleLink("required", true));
        expect(ruleset.rules.foo[1]).to.eql(new Treacherous.RuleLink("maxLength", 20));
    });

    it('should correctly add rulesets to properties in the generated ruleset', function () {
        var rulesetBuilder = new Treacherous.RulesetBuilder();

        var dummyRuleset = new Treacherous.Ruleset();
        dummyRuleset.rules.bar = [ new Treacherous.RuleLink("required", true) ];

        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
                .addRuleset(dummyRuleset)
            .build();

        expect(ruleset).not.to.be.null;
        expect(ruleset.rules).to.include.keys("foo");
        expect(ruleset.rules.foo.length).to.equal(1);
        expect(ruleset.rules.foo[0]).to.eql(dummyRuleset);
    });

    it('should correctly add foreach rules to the ruleset', function () {
        var rulesetBuilder = new Treacherous.RulesetBuilder();

        var ruleset = rulesetBuilder.create()
            .forProperty("foo")
            .addRuleForEach("required", true)
            .build();

        expect(ruleset).not.to.be.null;
        expect(ruleset.rules).to.include.keys("foo");
        expect(ruleset.rules.foo.length).to.equal(1);
        expect(ruleset.rules.foo[0].isForEach).to.be.true;
    });

});