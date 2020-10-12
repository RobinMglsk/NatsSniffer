import Server from "../../models/Server";
import ServersInterface from "./ServersInterface";

class ServersInMemory implements ServersInterface {
    private servers: Server[] = [];
    private constructor() {}

    all(): Server[] {
        return this.servers;
    }

    create(
        address: string,
        port: number,
        username?: string,
        password?: string,
        token?: string
    ): Server {
        const server = new Server({ address, port, username, password, token });
        this.servers.push(server);
        return server;
    }

    read(id: string): Server | void {
        return this.findById(id);
    }

    update(
        id: string,
        address: string,
        port: number,
        username?: string,
        password?: string,
        token?: string
    ): Server | void {
        const server = this.findById(id);

        if (server) {
            server.address = address;
            server.port = port ?? 4222;
            if (token) {
                server.token = token;
            } else if (username && password) {
                server.setUsernameAndPassword(username, password);
            }

            return server;
        }
    }

    delete(id: string): boolean {
        const index = this.servers.findIndex((server) => server.id === id);
        if (index !== -1) {
            this.servers.splice(index, 1);
            return true;
        }
        return false;
    }

    private findById(id: string) {
        return this.servers.find((server) => server.id === id);
    }

    static instance: ServersInMemory;
    static getInstance() {
        if (this.instance) {
            this.instance = new ServersInMemory();
        }
        return this.instance;
    }
}

export default ServersInMemory.getInstance();
