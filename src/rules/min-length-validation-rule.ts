import * as Promise from "bluebird";
import {IValidationRule} from "./ivalidation-rule";

export class MinLengthValidationRule implements IValidationRule
{
    public ruleName = "minLength";

    public validate(value, minLength: number): Promise<boolean>
    {
        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        if(value.length >= minLength)
        { return Promise.resolve(true); }

        return Promise.resolve(false);
    }

    public getMessage(value, minLength: number) {
        return `This field has a length of ${value.length} but should more than ${minLength}`;
    }
}