import { logRegistration } from "../utils/logging";
import { User, Team } from "../sequelize/sequelize";
import {extractToken} from "../services/authorization";


const addUserAdmin = async (req: any, res: any) => {
    const randomString = Math.random().toString(36).slice(-8);
    if (!req.body.address || !req.body.name || !req.body.email || !req.body.role)
        return res.status(400).send("specify all the field in the body")
    const user = {
        role: req.body.role,
        address: req.body.address,
        name: req.body.name,
        email: req.body.email,
        password: randomString
    }

    //await Team.create(team).then(async () => {
    await User.create(user)
        .then((user: any) => {
            logRegistration(user);
            return res.status(200).send(user);
        })
        .catch((err: any) => {
            // have to implement error handler
            console.log(err);
            return res.status(400).send("Problem in request");
        });
}

const addUser = async (req: any, res: any) => {
    const randomString = Math.random().toString(36).slice(-8);
    if (!req.body.address || !req.body.name || !req.body.email)
        return res.status(400).send("specify all the field in the body")
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
            return res.status(200).send(user);
        })
        .catch((err: any) => {
            return res.status(400).send("Problem in request");
        });
    //});
}

const updateUserRole = async (req: any, res: any) => {
    const token = extractToken(req.headers.authorization)
    if (!req.body.role)
        return res.status(400).send("add in a role in the body")
    if (!req.params.userId && typeof req.params.userId !== 'number')
        return res.status(400).send("make sure you added an int for the param")
    await User.findAll(
    {
        where: { role: "admin" }
    })
    .then(async (users: any) => {
        if (users.length === 1 && req.params.userId === token.id && req.body.role === "user")// ne peut pas delete le dernier admin + check sur le req
            return res.status(400).send("You can't delete the last admin of the API.")
        const result = await User.update({role: req.body.role}, {where: {id: req.params.userId}})
        return res.status(200).json({content: result})
    })
    .catch((err: any) => {
        console.log(err)
        return res.status(400).send("There is a problem with the database.");
    })
}

const deleteUser = async (req: any, res: any) => {
    if (!req.params.userId && typeof req.params.userId === 'number')
        return res.status(400).send("specify the good param for the query")
    await User.destroy({
        where : {
            id: req.params.userId
        }
    })
    .catch((err: any) => {
        return res.status(400).send("Problem with the database")
    })
    return res.status(200).json(`User with id ${req.params.userId} has been deleted`)

}

export { addUser, updateUserRole, addUserAdmin, deleteUser };