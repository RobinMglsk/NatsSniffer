import { v1 as uuid } from "uuid";

import Subscription from "../../models/Subscription";
import Logger from "../../utils/Logger";
import SubscriptionsInterface from "./SubscriptionsInterface";

class SubscriptionsInMemory implements SubscriptionsInterface {
    private subscriptions: Subscription[] = [];
    private static instance: SubscriptionsInMemory;

    all() {
        Logger.debug(`Reading all subscription`, this.constructor.name)
        return this.subscriptions;
    }

    read(id: string): Subscription | void {
        Logger.debug(`Reading subscription with id: ${id}`, this.constructor.name)
        return this.findSubscriptionById(id);
    }

    create(subject: string): Subscription {

        const subscription = new Subscription({subject});
        this.subscriptions.push(subscription);
        Logger.debug(`Created new subscription with id: ${subscription.id}`, this.constructor.name)

        return subscription;
    }

    update(id: string, subject: string): Subscription | void {
        Logger.debug(`Updating subscription with id: ${id}`, this.constructor.name)

        const subscription = this.findSubscriptionById(id);
        if (subscription) {
            subscription.subject = subject;
            return subscription;
        }
    }

    delete(id: string): boolean {
        const index = this.subscriptions.findIndex( subscription => subscription.id === id);
        if(index > -1){
            this.subscriptions.splice(index, 1);
            return true;
        }
        return false;
    }

    private findSubscriptionById(id: string): Subscription | void {
        return this.subscriptions.find(
            (subscription) => subscription.id === id
        );
    }

    static getInstance(): SubscriptionsInMemory {
        if (!this.instance) {
            this.instance = new SubscriptionsInMemory();
        }

        return this.instance;
    }
}

export default SubscriptionsInMemory.getInstance();
