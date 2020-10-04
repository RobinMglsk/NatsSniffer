import dotenv, { config } from "dotenv";
export class Config {
    private static instance: Config;

    private constructor() {
        const result = dotenv.config();

        if (result.error) {
            throw result.error;
        }
    }

    public get(setting: string, fallback?: string): string | void {
        if (process.env[setting]) {
            return process.env[setting]!;
        }

        if (fallback) {
            return fallback;
        }
    }

    public getAsNumber(setting: string, fallback?: number): number | void {
        const value = this.get(setting);
        if (value) {
            return +value;
        }

        if (fallback) {
            return fallback;
        }
    }

    public getFromJSON<T>(setting: string, fallback?: T): T | void {
        const value = this.get(setting);
        if (value) {
            try {
                JSON.parse(value);
            } catch (e) {
                console.error(`Invalid JSON: ${value}`);
            }
        }

        if (fallback) {
            return fallback;
        }
    }

    static getInstance() {
        if(!this.instance){
            this.instance = new Config();
        }

        return this.instance;
    }
}

export default Config.getInstance();