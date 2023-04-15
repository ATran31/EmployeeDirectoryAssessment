import express from 'express'
import bodyParser from 'body-parser'

import routes from './routes'
import { catchAll, cors, fourOhFourHandler } from './middlewares/global';

class App {
    public service: express.Application

    constructor() {
        this.service = express()
        this.config()

        /// Register routes here
        this.service.use(cors)
        this.service.use(routes)
        this.service.use(fourOhFourHandler)

        /// Catchall errors
        this.service.use(catchAll)
    }

    /// Setup the express application
    config() {
        this.service.use(bodyParser.json({ limit: '15mb' }))
        this.service.use(bodyParser.urlencoded({ extended: false }))
    }
}


export default App