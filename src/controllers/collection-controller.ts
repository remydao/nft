import { Collection, NFT, User} from "../sequelize";
import { extractToken } from "../services/authorization";
import { handleSpecificError, handleUnknownError } from "../utils/error-handler";


const createCollection = async (req: any, res: any) => {
    if (!req.body.name || !req.body.logo || !req.body.status)
        return handleSpecificError(res, 400, "Please put name, logo and status in request body.");

    const token = extractToken(req.headers.authorization);

    await User.findByPk(token.id)
        .then(async (user: any) => {
            if (user === null)
                return handleSpecificError(res, 400, "No corresponding user in database, make sure you use the right identification token.");

            if (user.TeamId === null)
                return handleSpecificError(res, 400, "You have to be in a team to create a collection.");

            await Collection.create({
                    name: req.body.name,
                    logo: req.body.logo,
                    status: req.body.status,
                    TeamId: user.TeamId
                })
                .then((collection: any) =>
                {
                    console.log("[DEV] Collection created: " + collection.name + " (id = " + collection.id + ")");
                    return res.status(200).send("OK");
                })
                .catch((err: any) => {
                    console.log(err)
                    return handleUnknownError(res);
                });

        })
        .catch(() => {
            return handleSpecificError(res, 500, 'Problem with the database');
        });


}

const getCollection = async (req: any, res: any) => {
    await Collection.findAll()
        .then((collections: any) => {
            return res.status(200).json(collections)
        })
        .catch(() => {
            return handleSpecificError(res, 500, "Problem with the database");
        })
}

const addToCollection = async (req: any, res: any) => {
    if (!req.body.nftId || !req.body.collectionId)
        return handleSpecificError(res, 400, "Please enter valid nftId and collectionId in request body.");

    const token = extractToken(req.headers.authorization);

    await User.findByPk(token.id)
        .then(async (user: any) => {
            if (user === null)
                return handleSpecificError(res, 400, "No user corresponding in database, make sure you use the right identification token");

            if (user.TeamId === null)
                return handleSpecificError(res, 401, "You have to be in a team to add a NFT to your collection.");

            await Collection.findByPk(req.body.collectionId)
                .then(async (collection: any) => {
                    if (collection === null)
                        return handleSpecificError(res, 400, "No collection corresponding in database. Please verify collectionId.");

                    if (collection.TeamId ==! user.TeamId)
                        return handleSpecificError(res, 401, "This collection doesn't belong to your team.");
                })
            await NFT.findByPk(req.body.nftId)
                .then(async (nft: any) => {
                    if (nft === null)
                        return handleSpecificError(res, 400, "No NFT corresponding in database. Please verify nftId.");

                    if (nft.UserId != user.id)
                        return handleSpecificError(res, 401, "NFT can't be added to collection, it doesn't belongs to you.");
                    
                    if (nft.CollectionId)
                        return handleSpecificError(res, 400, "This NFT is already in a collection");

                    await NFT.update(
                        { CollectionId: req.body.collectionId },
                        { where : { id: req.body.nftId } }
                    )
                        .then((updatedNFT) => {
                            return res.status(200).send(updatedNFT);
                        });
                })
        })
        .catch(() => {
            return handleSpecificError(res, 500, 'Problem with the database');
        });
}

const changeCollectionStatus = async (req: any, res: any) => {

    if (!req.body.status || !req.body.collectionId)
        return handleSpecificError(res, 400, "Please enter valid status and collectionId in request body.");


    const token = extractToken(req.headers.authorization);

    await User.findByPk(token.id)
        .then(async (user: any) => {
            if (user === null)
                return handleSpecificError(res, 400, "No user corresponding in database, make sure you use the right identification token");

            if (user.TeamId === null)
                return handleSpecificError(res, 401, "You have to be in a team to add a NFT to your collection.");

            await Collection.findByPk(req.body.collectionId)
                .then(async (collection: any) => {
                    if (collection === null)
                        return handleSpecificError(res, 400, "No collection corresponding in database. Please verify collectionId.");

                    if (collection.TeamId ==! user.TeamId)
                        return handleSpecificError(res, 401, "This collection doesn't belong to your team.");
                });
        })
        .catch((err: any) => {
            console.log(err)
            return handleSpecificError(res, 500, 'Problem with the database');
        });
    await Collection.update(
        { status : req.body.status },
        { where : { id: req.body.collectionId } }
        )
        .then((updatedCollection) => {
            return res.status(200).send(updatedCollection)
        })
        .catch((err: any) => {
            console.log(err)
            return handleSpecificError(res, 500, 'Problem with the database');
        });
}


export { getCollection, createCollection, addToCollection, changeCollectionStatus };