const express = require('express')
const connectionDB = require("./config/db")
require("dotenv").config();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const AuthRouter = require("../server/routes/auth/AuthRoute")
const AdminRouter = require("../server/routes/admin/AdminRoute")
const shoppingRoutes = require("../server/routes/shop/shoppingRoutes")
const cartRouter = require("../server/routes/shop/cartRouter")
const shopAddressRoutes = require("../server/routes/shop/addressRoute")
const shopOrderRoutes = require("../server/routes/shop/orderRoute")
const shopProductReviewRoutes = require("../server/routes/shop/review")
const shopServiceRoutes = require("../server/routes/shop/service")



connectionDB()
const app = express()
const PORT = process.env.PORT || 5000;


app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials: true
    })
)


app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', AuthRouter)
app.use('/api/admin', AdminRouter)
app.use('/api/shop', shoppingRoutes)
app.use('/api/shop/cart', cartRouter)
app.use('/api/shop/address', shopAddressRoutes)
app.use('/api/shop/order', shopOrderRoutes)
app.use('/api/shop/reviews', shopProductReviewRoutes)
app.use('/api/shop/service', shopServiceRoutes)

app.listen(PORT, () => {
    console.log(`server runnng on port ${process.env.PORT}`)
})
