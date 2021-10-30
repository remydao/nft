import { logRegistration } from "../utils/logging";
import { User } from "../sequelize/sequelize";
import { extractToken } from "../services/authorization";
import { handleSpecificError } from "../utils/error-handler";

const getUser = async (req: any, res: any) => {
    await User.findAll()
        .then((users: any) => {
            return res.status(200).json(users);
        })
        .catch((err: any) => {
            return handleSpecificError(res, 500, 'Problem with the database');
        })
}

const addUserAdmin = async (req: any, res: any) => {
    const randomString = Math.random().toString(36).slice(-8);

    if (!req.body.address || !req.body.name || !req.body.email || !req.body.role)
        return handleSpecificError(res, 400, "Please specify all the fields in the body: address, name, email, role")

    const user = {
        role: req.body.role,
        address: req.body.address,
        name: req.body.name,
        email: req.body.email,
        password: randomString
    }

    await User.create(user)
        .then((user: any) => {
            logRegistration(user);
            return res.status(201).send(user);
        })
        .catch((err: any) => {
            return handleSpecificError(res, 500, "Problem in request");
        });
}

const addUser = async (req: any, res: any) => {
    if (!req.body.address || !req.body.name || !req.body.email)
        return handleSpecificError(res, 400, "Please specify all the field in the body: address, name, email")

    const randomString = Math.random().toString(36).slice(-8);

    const user = {
        role: "user",
        address: req.body.address,
        name: req.body.name,
        email: req.body.email,
        password: randomString
    }

    await User.create(user)
    .then((user: any) => {
        logRegistration(user);
        return res.status(201).send(user);
    })
    .catch((err: any) => {
        return handleSpecificError(res, 500, "Problem in request. The email may be already in use or the address in incorrect.")
    });
}

const updateUserRole = async (req: any, res: any) => {
    const token = extractToken(req.headers.authorization);

    if (!req.body.role)
        return handleSpecificError(res, 400, "Add in a role field in the body")
        
    if (!req.params.userId && typeof req.params.userId !== 'number')
        return handleSpecificError(res, 400, "Make sure you added an integer for the param 'userId'.")

    await User.findAll(
    {
        where: { role: "admin" }
    })
    .then(async (users: any) => {
        if (users.length === 1 && req.params.userId === token.id && req.body.role === "user") // ne peut pas delete le dernier admin + check sur le req
            return handleSpecificError(res, 400, "You can't delete the last admin of the database.");

        const result = await User.update({role: req.body.role}, {where: {id: req.params.userId}})
        return res.status(200).json({content: `User role from user ${req.params.userId} has been changed to ${req.body.role}`})
    })
    .catch((err: any) => {
        return res.status(500).send("There is a problem with the database.");
    })
}

const deleteUser = async (req: any, res: any) => {
    if (!req.params.userId && typeof req.params.userId === 'number')
        return handleSpecificError(res, 400, "Specify the good param for the query: userId")
    
    await User.destroy({
        where : {
            id: req.params.userId
        }
    })
    .catch((err: any) => {
        return handleSpecificError(res, 500, "Problem with the database")
    })

    return res.status(200).json(`User with id ${req.params.userId} has been deleted`)
}

export { addUser, updateUserRole, addUserAdmin, deleteUser, getUser };