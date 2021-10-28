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

const handleUnknownError = (res: any) => {
    const code = 500;
    res.status(code).send({ error: "An unknown error has occured. Please refer to the documentation or check the server availibility." });
}

const handleSpecificError = (res: any, code: number, message: string) => {
    res.status(code).send({ error: message });
}

export { handleValidationError, handleUnknownError, handleSpecificError };