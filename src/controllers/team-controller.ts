import { User, Team } from "../sequelize/sequelize";
import { extractToken } from "../services/authorization";

const createTeam = async (req: any, res: any) => {
    var team = {
        name: req.body.name
    }

    console.log(req.body);
    const token = extractToken(req.headers.authorization);
    console.log("userId: " + token.id);

    // check if user exists ??? 

    await Team.create(team)
    .then((createdTeam: any) => {
        console.log("Team created:" + JSON.stringify(createdTeam));
        User.update(
            { TeamId: createdTeam.id },
            { where: { id: token.id } }
        );
        return res.status(200).send(createdTeam);
    })
    .catch((err: any) => {
        // have to implement error handler
        console.log(err);
        return res.status(400).send("Problem in request");
    });
}



// request: l'id du user qu'on veut ajouter
const addToTeam = async (req: any, res: any) => {
    if (!req.body.userId){
        return res.status(400).send("You must have a userId in the body request: id of the user you want to add to your team");
    }

    // Check if the added user exists and if he already belongs to a team
    await User.findByPk(req.body.userId)
    .then((user: any) => {
        if (!user) {
            return res.status(400).send("The user you try to add to your team does not exist: ID " + req.body.userId + "does not exist")
        } else if (user.TeamId != null) {
            return res.status(400).send("The user you try to add to your team already belongs to a team which id is: " + user.TeamId);
        }
    });

    // Authorization
    const token = extractToken(req.headers.authorization);
    console.log("userId: " + token.id);

    // Check if the user has a team: if yes then add the added user to the team
    await User.findByPk(token.id)
    .then(async (user: any) => {
        if (!user.TeamId) {
            return res.status(400).send("You have to be in a team to add a user to your team");
        }
        await User.update(
            { TeamId: user.TeamId },
            { where: { id: req.body.userId } }
        ).then((addedUser) => {return res.status(200).send(addedUser)});
    });

}

export { createTeam, addToTeam };