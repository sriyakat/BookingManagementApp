const express = require("express");
require("dotenv").config();


const rolesRoutes = require("./src/modules/roles/roles.routes.js");
const customerRoutes = require("./src/modules/Customer/customers.routes.js");
const bookingRoutes = require("./src/modules/bookings/booking.routes.js");
const bookingTrackingRoutes = require("./src/modules/bookings/tracking/bookingTracking.routes.js");
const authRoutes = require("./src/modules/auth/auth.routes.js");
const errorMiddleware = require("./src/middlewares/error.middleware");
const productRoutes = require("./src/modules/product/product.route.js");
const hubRoutes = require("./src/modules/hub/hub.router.js")

const app = express();

// Built-in body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4200;

// Health check route
app.get("/", (req, res) => {
  res.send("API is Running....");
});

//Module Routes Prefix Setup
app.use("/api/roles", rolesRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/booking/tracking", bookingTrackingRoutes);
app.use("/api/products", productRoutes);
app.use("/api/hub", hubRoutes); 


//Handle 404 Route not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "API Endpoint not found",
  });
});

//Global Error Middleware - Must be at the VERY END
app.use(errorMiddleware);

//const PORT = process.env.PORT || 4200

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});