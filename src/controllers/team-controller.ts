import { User, Team } from "../sequelize";
import { extractToken } from "../services/authorization";
import { handleSpecificError, handleUnknownError, handleValidationError } from "../utils/error-handler";

const createTeam = async (req: any, res: any) => {
    if (!req.body.name)
        return handleSpecificError(res, 400, 'Make sure you added the field name in the body.');

    const team = {
        name: req.body.name,
        balance: 1000
    };

    const token = extractToken(req.headers.authorization);

    await Team.create(team)
    .then((createdTeam: any) => {
        User.update(
            { TeamId: createdTeam.id },
            { where: { id: token.id } }
        );
        return res.status(200).send(createdTeam);
    })
    .catch((err: any) => {
        console.log(err);
        if (err.name === "SequelizeValidationError")
            handleValidationError(err, res);
        else
            handleUnknownError(res);
    });
}

// request: l'id du user qu'on veut ajouter
const addToTeam = async (req: any, res: any) => {
    if (!req.body.userId)
        return handleSpecificError(res, 400, "You must have a userId in the body request: id of the user you want to add to your team");

    await User.findByPk(req.body.userId)
    .then((user: any) => {
        if (!user)
            return handleSpecificError(res, 400, "The user you try to add to your team does not exist: ID " + req.body.userId + " does not exist")
        if (user.TeamId != null)
            return handleSpecificError(res, 400, "The user you try to add to your team already belongs to a team which id is: " + user.TeamId);
    })
    .catch((err: any) => {
        return handleSpecificError(res, 500, 'Problem with the database');
    });

    const token = extractToken(req.headers.authorization);

    await User.findByPk(token.id)
    .then(async (user: any) => {
        if (!user.TeamId) {
            return handleSpecificError(res, 400, "You have to be in a team to add a user to your team");
        }
        await User.update(
            { TeamId: user.TeamId },
            { where: { id: req.body.userId } }
        ).then((addedUser) => {
            return res.status(200).send(addedUser)
        });
    })
    .catch((err: any) => {
        return handleSpecificError(res, 500, 'Unknown error');
    });


}

const getTeam = async (req: any, res: any) => {
    await Team.findAll()
        .then((teams: any) => {
            return res.status(200).json(teams)
        })
        .catch((err: any) => {
            return handleSpecificError(res, 500, 'Problem with the database');
        })
}

const addToBalance = async (req: any, res: any) => {
    if (!req.body.teamId || !req.body.balance || req.body.balance < 0)
        return handleSpecificError(res, 400, "You must have a correct teamId and a balance (superior to 0) field in the request body");
    
    await Team.findByPk(req.body.teamId)
    .then((team: any) => {
        if (!team)
            return handleSpecificError(res, 404, "The specified teamId: " + req.body.teamId + ", does not exist.")
    })
    .catch((err: any) => {
        return handleSpecificError(res, 500, 'Unknown error');
    });

    await Team.update(
        { balance :  req.body.balance },
        { where: { id: req.body.teamId } }
    ).then((team) => {
        return res.status(201).send({ message: "Balance of the team " + req.body.teamId + " has been changed to " + req.body.balance})
    })
    .catch((err: any) => {
        return handleSpecificError(res, 500, 'Unknown error');
    });   
}

export { createTeam, addToTeam, getTeam, addToBalance };