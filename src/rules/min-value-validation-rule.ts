import * as Promise from "bluebird";
import {IValidationRule} from "./ivalidation-rule";

export class MinValueValidationRule implements IValidationRule
{
    public ruleName = "minValue";

    public validate(value, minValue: number): Promise<boolean>
    {
        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        if(value >= minValue)
        { return Promise.resolve(true); }

        return Promise.resolve(false);
    }

    public getMessage(value, minValue: number) {
        return `This field has a value of ${value} but should be greater than or equal to ${minValue}`;
    }
}