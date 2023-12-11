import express,{Express} from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { connectDB } from './database';
import { PORT } from './config';
import {routes} from './routes'

export class Server {
    private app: Express;

    constructor() {
        this.app = express();
        connectDB();
        this.configuration();
        this.middlewares();
        this.routes()
    }
    configuration() {
        this.app.set('port', PORT || 3000);
         
    }
    middlewares() {
        this.app.use(morgan('dev'));
        //agregado esta linea
        this.app.use(cors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            optionsSuccessStatus: 204,
        }));
        this.app.use(express.json());


        
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.status(200).json(
                {
                    name: 'API REST TASK'
                })
        });
        // agregado esta linea
        this.app.use((err: any, req: any, res: any, next: any) => {
            console.error(err.stack);
            res.status(500).send('Something went wrong!');
        });
        this.app.use('/api/task', routes.
        TaskRoute);
        this.app.post('/', (req, res) => {
            console.log(req.body);
            res.json(req.body)
        })
        

    }
    listen() {
        this.app.listen(this.app.get('port'), () =>
        {
            console.log(`el server esta corriendo en el puerto ${this.app.get('port')}`);
        })
    }

}