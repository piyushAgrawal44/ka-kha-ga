import { APP_ENV } from "../config/app.config";
import HttpClient from "../utils/http-client";

const ApiClient = new HttpClient(APP_ENV.backendApiUrl);

export default ApiClient;
