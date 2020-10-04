import { v1 as uuid } from "uuid";

export default class Server {
    public address: string;
    public port = 4222;
    private readonly _id: string;
    private _username?: string;
    private _password?: string;
    private _token?: string;
    private _usingToken = false;

    constructor(data: {
        address: string;
        port?: number;
        username?: string;
        password?: string;
        token?: string;
    }) {
        this._id = uuid();
        if (data.token) {
            this._token = data.token;
            this._usingToken = true;
        } else if (data.username && data.password) {
            this._username = data.username;
            this._password = data.password;
        } else {
            throw new Error("User and password or token needs to be provided");
        }

        this.address = data.address;
        if (data.port) {
            this.port = data.port;
        }
    }

    get id(): string {
        return this._id;
    }

    get token(): string | void {
        if (this._usingToken) {
            return this._token;
        }
    }

    get username(): string | void {
        if (!this._usingToken) {
            return this._username;
        }
    }

    get password(): string | void {
        if (!this._usingToken) {
            return this._password;
        }
    }

    set token(token: string | void) {
        if (typeof token === "string") {
            this._token = token;
            this._username = undefined;
            this._password = undefined;
            this._usingToken = true;
        }
    }

    setUsernameAndPassword(username: string, password: string) {
        this._token = undefined;
        this._username = username;
        this._password = password;
        this._usingToken = false;
    }

    getUrl() {
        if (this._usingToken) {
            return `nats://${this._token}@${this.address}:${this.port}`;
        }
    }
}
