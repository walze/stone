import { install } from 'source-map-support';
import { api } from './config';

install();
api.subscribe(() => console.log('API is running => http://localhost:3000/'));
