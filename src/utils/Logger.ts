import Config from "./Config";

export default class Logger {
    private logs: Log[] = [];
    private showDebug: boolean = Config.getAsBoolean("DEBUG");

    private constructor() {}

    private log(msg: string, type: logTypes, functionName?: string): void {
        const log: Log = {
            timestamp: new Date(),
            message: msg,
            type: type,
            function: functionName,
        };

        this.logs.push(log);
        this.printLog(log);
    }

    private printLog(log: Log): void {
        switch (log.type) {
            case logTypes.DEBUG:
                if (this.showDebug) console.debug(this.format(log));
                break;
            case logTypes.WARNING:
                console.warn(this.format(log));
                break;
            case logTypes.ERROR:
                console.error(this.format(log));
                break;
            default:
                console.log(this.format(log));
        }
    }

    clear() {
        this.logs = [];
    }

    dump() {
        console.log("--------------- DUMPING LOGS ---------------");
        this.logs.forEach((log) => {
            this.printLog(log);
        });
        console.log("----------------- EOF DUMP -----------------");
    }

    private format(log: Log): string {
        return `[${log.timestamp}]${log.function ? ` [${log.function}]` : ''} - ${log.message}`;
    }

    private static instance: Logger;

    static log(msg: string, functionName?: string): void {
        this.getInstance().log(msg, logTypes.INFO, functionName);
    }

    static debug(msg: string, functionName?: string): void {
        this.getInstance().log(msg, logTypes.DEBUG, functionName);
    }

    static warning(msg: string, functionName?: string): void {
        this.getInstance().log(msg, logTypes.WARNING, functionName);
    }

    static error(msg: string, functionName?: string): void {
        this.getInstance().log(msg, logTypes.ERROR, functionName);
    }

    private static getInstance() {
        if (!this.instance) {
            this.instance = new Logger();
        }
        return this.instance;
    }
}

enum logTypes {
    "INFO",
    "DEBUG",
    "WARNING",
    "ERROR",
}

type Log = {
    timestamp: Date;
    message: string;
    type: logTypes;
    function?: string;
};
