import { Collection } from "../sequelize/sequelize"
import { handleSpecificError } from "../utils/error-handler";

const addCollection = async (req: any, res: any) => {
    if (!req.body.name || !req.body.logo || !req.body.status)
        return handleSpecificError(res, 400, "Please put name, logo and status in request body.");

    try {
        const collection = {
            name: req.body.name,
            logo: req.body.logo,
            status: req.body.status,
        };

        await Collection.create(collection)
            .then((collection: any) =>
            {
                console.log("[DEV] Collection created: " + collection.name + " (id = " + collection.id + ")");
                return res.status(200).send("OK");
            })
    }
    catch (err: any) {
        console.log(err);
    }
}

const getCollection = async (req: any, res: any) => {
    await Collection.findAll()
        .then((collections: any) => {
            return res.status(200).json(collections)
        })
        .catch((err: any) => {
            return handleSpecificError(res, 400, "Problem with the database");
        })
}
export { addCollection, getCollection };