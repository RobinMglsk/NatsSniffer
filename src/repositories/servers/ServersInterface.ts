import Server from "../../models/Server";

export default interface ServersInterface {
    all(): Server[];
    create(address: String, port: number, username?: string, password?: string, token?: string): Server;
    read(id: string | number): Server | void;
    update(
        id: string | number,
        address?: string,
        port?: number,
        username?: string,
        password?: string,
        token?: string
    ): Server | void;
    delete(id: string | number): boolean;
}
