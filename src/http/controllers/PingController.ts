import Controller from "./Controller";
import config from "../../utils/Config"
export default class PingController extends Controller{

    ping(){
        this.res.json({status: 'ready', time: new Date(), version: config.get('VERSION', 'Unknown'), env: config.get('ENV', 'Unknown')}) 
    }
}