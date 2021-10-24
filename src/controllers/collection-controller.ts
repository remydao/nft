import {Collection} from "../sequelize/sequelize"

const addCollection = async (req: any, res: any) => {
    if (!req.body.name|| !req.body.logo || !req.body.status)
        return res.status(400).send("Please put name, logo and status in request body.");

    try {

        const collection = {
            name: req.body.name,
            logo: req.body.logo,
            status: req.body.status,
        };

        await Collection.create(collection)
            .then((nft: any) =>
            {
                console.log("Collection created:" + JSON.stringify(nft));
                return res.status(200).send("OK");
            })
    }
    catch (err: any) {
        console.log(err);
    }
}
export { addCollection };