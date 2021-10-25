import { User, Team } from "../sequelize/sequelize";
import { extractToken } from "../services/authorization";

const createTeam = async (req: any, res: any) => {
    if (!req.body.name)
        return res.status(400).send('Make sure you added the good field in the body.')
    const team = {
        name: req.body.name,
        balance: 1000
    }
    const token = extractToken(req.headers.authorization);

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
        console.log(err);
        return res.status(400).send("Problem in request");
    });
}

// request: l'id du user qu'on veut ajouter
const addToTeam = async (req: any, res: any) => {
    if (!req.body.userId){
        return res.status(400).send("You must have a userId in the body request: id of the user you want to add to your team");
    }

    await User.findByPk(req.body.userId)
    .then((user: any) => {
        if (!user) {
            return res.status(400).send("The user you try to add to your team does not exist: ID " + req.body.userId + "does not exist")
        } else if (user.TeamId != null) {
            return res.status(400).send("The user you try to add to your team already belongs to a team which id is: " + user.TeamId);
        }
    })
    .catch((err: any) => {
        return res.status(400).send('Problem with the database');
    });

    const token = extractToken(req.headers.authorization);

    await User.findByPk(token.id)
    .then(async (user: any) => {
        if (!user.TeamId) {
            return res.status(400).send("You have to be in a team to add a user to your team");
        }
        await User.update(
            { TeamId: user.TeamId },
            { where: { id: req.body.userId } }
        ).then((addedUser) => {return res.status(200).send(addedUser)});
    })
    .catch((err: any) => {
        return res.status(400).send('Problem with the database');
    });


}

export { createTeam, addToTeam };