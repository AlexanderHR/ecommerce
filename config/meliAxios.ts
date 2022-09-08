import axios from 'axios';
import { MELI_API_BASE_URL } from '../constants';

const meliAxios = axios.create({ baseURL: MELI_API_BASE_URL });

export { meliAxios };