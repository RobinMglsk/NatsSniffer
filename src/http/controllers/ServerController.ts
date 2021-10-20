import { json } from "body-parser";
import Servers from "../../repositories/servers/ServersInMemory";
import Controller from "./Controller";

export default class ServerController extends Controller {
    index() {
        const servers = Servers.all();
        this.res.json({ data: servers });
    }

    create(){
        if (!this.req.body.address) {
            this.res.status(400).send();
        }

        const server = Servers.create(this.req.body.address, this.req.body.port, this.req.body.username, this.req.body.password, this.req.body.token);
        if (server) {
            this.res.status(201).json({ data: server });
        }

        this.res.status(500).send();
    }

    read(){
        this.checkParamsId();

        const server = Servers.read(this.req.params.id);
        if(server){
            this.res.json({data: server})
        }

        this.res.status(404).send();
    }

    connect(){
        this.checkParamsId();

        const server = Servers.read(this.req.params.id);
        if(server){
            server.connect();
            this.res.json({data: server})
        }

        this.res.status(404).send();
    }

    disconnect(){
        this.checkParamsId();

        const server = Servers.read(this.req.params.id);
        if(server){
            server.disconnect();
            this.res.json({data: server})
        }

        this.res.status(404).send();
    }

    private checkParamsId() {
        if (!this.req.params.id) {
            this.res.status(400).send();
        }
    }
}
