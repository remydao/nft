import { History } from "../sequelize/sequelize";
import { handleSpecificError, handleUnknownError, handleValidationError } from "../utils/error-handler";


const addHistory = async (req: any, res: any) => {
    if (!req.body.buyerId|| !req.body.sellerId || !req.body.NFTId)
        return handleSpecificError(res, 400, "Please put buyerId, sellerId and NFTId in request body.");

    try {
        const history = {
            buyerId: req.body.buyerId,
            sellerId: req.body.sellerId,
            NFTId: req.body.NFTId,
            date: Date.now()
        };

        await History.create(history)
            .then((history: any) =>
            {
                console.log("[DEV] History created: " + history.id);
                return res.status(200).send("OK");
            })
    }
    catch (err: any) {
        if (err.name === "SequelizeValidationError")
            handleValidationError(err, res);
        else
            handleUnknownError(res);
    }
}

export { addHistory };