import { User, Team } from "../sequelize/sequelize";

const addTeam = async (req: any, res: any) => {
    var team = {
        name: req.body.name
    }

    console.log(req.body);
    var userId = req.get('Authorization');
    console.log("userId: " + userId);

    // check if user exists ??? 

    await Team.create(team)
    .then((createdTeam: any) => {
        console.log("Team created:" + JSON.stringify(createdTeam));
        User.update(
            { TeamId: createdTeam.id },
            { where: { id: userId } }
        );
        return res.status(200).send(createdTeam);
    })
    .catch((err: any) => {
        // have to implement error handler
        console.log(err);
        return res.status(400).send("Problem in request");
    });
}

export { addTeam };