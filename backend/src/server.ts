import App from './app';
import * as http from 'http';

// Create an instance of our app
const app = new App()

http.createServer({}, app.service).listen(process.env.PORT || 4324)