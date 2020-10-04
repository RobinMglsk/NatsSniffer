import Subscription from "../../models/Subscription";

export default interface SubscriptionsInterface {

    all(): Subscription[];
    create(subject: String): Subscription;
    read(subscriptionId: string | number): Subscription | void;
    update(subscriptionId: string | number, subject: string): Subscription | void;
    delete(subscriptionId: string | number): boolean;

}