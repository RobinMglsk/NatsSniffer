import { v1 as uuid } from "uuid";

export default class Subscription {
    id: string | number;
    subject: string;
    createdAt: Date;

    constructor(data?: {
        id?: string | number;
        subject?: string;
        createdAt?: Date;
    }) {
        if (data && data.id) {
            this.id = data.id;
        } else {
            this.id = uuid();
        }

        if (data && data.subject) {
            this.subject = data.subject;
        } else {
            this.subject = "";
        }

        if (data && data.createdAt) {
            this.createdAt = data.createdAt;
        } else {
            this.createdAt = new Date();
        }
    }
}
