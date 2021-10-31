import { NFT, sequelize, Team, User } from "../src/sequelize";
import { logRegistration } from "../src/utils/logging";


sequelize.sync()
.then(() => {
	const admin1 = {
        role: "admin",
        address: "0xc0A2D17f12Adaa24719Ca3a05d6E62996c9CC396",
        name: "Gazi",
        email: "gazi@hotmail.fr",
        password: "testtest"
    }
    
    User.create(admin1)
        .then((user: any) => {
            logRegistration(user);
        })
        .catch((err: any) => {
            console.log("[ERROR] Error while creating user." + err);
        });
    
    const admin2 = {
        role: "admin",
        address: "0xc0A2D17f12Adaa24719Ca3a05d6E62996c9CC397",
        name: "Remy",
        email: "remy@gmail.com",
        password: "testtest"
    }
    
    User.create(admin2).then((user: any) => {
        logRegistration(user);

        const nft1 = {
            name: "NFT1",
            price: 100,
            status: "Draft",
            rate: 0,
            numberOfRate: 0,
            UserId: user.id,
            image: "image_inconnue2"
        };

        NFT.create(nft1).then((nft: any) => {
            console.log("NFT1 (id: " + nft.id + ") created and added to userId " + user.id + " (" + user.name + ")");

            const nft2 = {
                name: "NFT2",
                price: 50,
                status: "Draft",
                rate: 0,
                numberOfRate: 0,
                UserId: user.id,
                image: "image_inconnue"
            };


            NFT.create(nft2).then((nft: any) => {
                console.log("NFT2 (id: " + nft.id + ") created and added to userId " + user.id + " (" + user.name + ")")

                const team = {
                    name: "GaziTeam",
                    balance: 1000
                };
    
                Team.create(team).then((team: any) => {
                    console.log(team.name + " created with balance " + team.balance + " (TeamId: " + team.id + ")");
                })
            })
        })
    })
    .catch((err: any) => {
        console.log("[ERROR] Error while creating data from models: " + err);
    });
});

