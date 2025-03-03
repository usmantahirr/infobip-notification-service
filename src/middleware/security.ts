import cors from "cors"
import helmet from "helmet"

import { config } from "../config/config"

const securityMiddleware = (app: any) => {
  app.use(helmet())
  app.use(cors({ origin: config.security.allowedOrigins }))
}

export default securityMiddleware
