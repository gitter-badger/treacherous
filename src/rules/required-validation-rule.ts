import * as Promise from "bluebird";
import {IValidationRule} from "./ivalidation-rule";

export class RequiredValidaitonRule implements IValidationRule
{
    public ruleName = "required";

    public validate(value, isRequired: boolean = true): Promise<boolean>
    {
        if (value === undefined || value === null) {
            return Promise.resolve(!isRequired);
        }

        var testValue = value;
        if (typeof (testValue) === 'string') {
            if (String.prototype.trim) {
                testValue = value.trim();
            }
            else {
                testValue = value.replace(/^\s+|\s+$/g, '');
            }
        }

        if (!isRequired) {// if they passed: { required: false }, then don't require this
            return Promise.resolve(true);
        }

        return Promise.resolve((testValue + '').length > 0);
    }

    public getMessage(value, isRequired) {
        return "This field is required";
    }
}