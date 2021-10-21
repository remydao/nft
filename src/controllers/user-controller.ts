import { logRegistration } from "../utils/logging";
import { User, Team } from "../sequelize/sequelize";

const addUser = async (req: any, res: any) => {
    var randomString = Math.random().toString(36).slice(-8);

    /*var user = {
        role: "admin",
        address: "0xA3C967BBAe3fcB2adAC2ba4a2ad1c9348DaB5fcA", // valid: 0xA3C967BBAe3fcB2adAC2ba4a2ad1c9348DaB5fcA
        name: "name adm",
        email: "admin@dotnet.fr",
        password: randomString,
        TeamId: 1
    }*/

    var user = {
        role: "admin",
        address: req.body.address,
        name: req.body.name,
        email: req.body.email,
        password: randomString
    }

    /*var team = {
        name: "Team roquette",
        balance: 20
    }*/

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
    //});
}

const updateUserRole = async (req: any, res: any) => {
    try {
        await User.findAll({
            where : {role: "admin"}
        })
        .then(async (users: any) => {
            if (users.length <= 1)// we can't delete an admin
                return res.status(400).send("You can't delete the last admin of the API")
            const result = await User.update({role: req.body.role}, {where: {id: req.params.userId}})
            return res.status(200).json({content: result})
        })
    }
    catch (err) {
        console.log(err)
    }
}

export { addUser, updateUserRole };