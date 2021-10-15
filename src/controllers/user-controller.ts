import { User } from "../sequelize/sequelize";

const addUser = async (req: any, res: any) => {
    var randomString = Math.random().toString(36).slice(-8);

    var user = {
        role: "admin",
        address: "0xA3C967BBAe3fcB2adAC2ba4a2ad1c9348DaB5fcA", // valid: 0xA3C967BBAe3fcB2adAC2ba4a2ad1c9348DaB5fcA
        name: "name adm",
        email: "admin@dotnet.fr",
        password: randomString
    }

    /*var user = {
        role: req.body.role,
        address: req.body.address,
        name: req.body.name,
        email: req.body.email,
        password: randomString
    }*/

    await User.create(user)
        .then((user: any) => {
            console.log("User created:" + JSON.stringify(user));
            return res.status(200).send("OK");
        })
        .catch((err: any) => {
            // have to implement error handler
            console.log(err);
            return res.status(400).send("Problem in request");
        });
}

export { addUser };