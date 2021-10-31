import { sequelize, User } from "../src/sequelize";
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
    
    User.create(admin2)
        .then((user: any) => {
            logRegistration(user);
        })
        .catch((err: any) => {
            console.log("[ERROR] Error while creating user." + err);
        });
});

