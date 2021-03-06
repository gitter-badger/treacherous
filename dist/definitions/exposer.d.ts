import { RuleRegistry } from "./rules/rule-registry";
import { Ruleset } from "./rulesets/ruleset";
import { RulesetBuilder } from "./rulesets/ruleset-builder";
import { ValidationGroup } from "./validation-group";
export declare var ruleRegistry: RuleRegistry;
export declare function createRuleset(): RulesetBuilder;
export declare function createGroupWithRules(model: any, rulesCreator: (rulesetBuilder: RulesetBuilder) => Ruleset): ValidationGroup;
export declare function createGroup(model: any, ruleset: Ruleset): ValidationGroup;
