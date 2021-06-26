import { registerDecorator, ValidationOptions } from "class-validator";

export function IsNotBlank(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isNotBlank",
            target: object.constructor,
            propertyName: propertyName,
            options: {...validationOptions, message: `${propertyName} can not be only white spaces`},
            validator: {
                validate(value: any) {
                    return typeof value === "string" && value.trim().length > 0;
                }
            }
        });
    };
}