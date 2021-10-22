import { ValidationError } from "sequelize/types";

const handleValidationError = (err: ValidationError, res: any) => {
    let errors = Object.values(err.errors).map(el => el.message);
    let fields = Object.values(err.errors).map(el => el.path);

    const code: number = 400;

    if (errors.length > 1) {
        const formattedErrors = errors.join('.  ');
        res.status(code).send({ error: "Bad request, some fields are not well formatted. Please read the documentation.", fields: fields, messages: formattedErrors });
    } else {
        res.status(code).send({ error: "Bad request, some fields are not well formatted. Please read the documentation.", fields: fields, messages: errors });
    }
}

export { handleValidationError };