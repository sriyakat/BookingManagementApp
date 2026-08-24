const express = require("express");
require("dotenv").config();

const rolesRoutes = require("./src/modules/roles/roles.routes");
const customerRoutes = require("./src/modules/Customer/customers.routes")


const app = express();

//Ye middleware JSON request body ko parse karta hai.
app.use(express.json());

const PORT = process.env.PORT || 4200;

app.get("/", (req, res)=>{
    res.send("API is Running....")
});


app.use("/api/roles", rolesRoutes);
app.use("/api/customers", customerRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

