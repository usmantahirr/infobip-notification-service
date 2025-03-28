import express from "express"

import swaggerUi from "swagger-ui-express"

import { config } from "./config/config"
import logger from "./config/logger"
import { openApiDocument } from "./config/openapi"
import errorHandler from "./middleware/errorHandler"
import rateLimiter from "./middleware/rateLimiter"
import { requestLogger } from "./middleware/requestLogger"
import securityMiddleware from "./middleware/security"
import notificationRoutes from "./routes/notificationRoutes"

const app = express()

securityMiddleware(app)

app.use(rateLimiter)
app.use(requestLogger)
app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument))

app.use("/api/notifications", notificationRoutes)
app.use(errorHandler)

const PORT = config.app.port

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
  logger.info(
    `API Documentation available at http://localhost:${PORT}/api-docs`,
  )
})
