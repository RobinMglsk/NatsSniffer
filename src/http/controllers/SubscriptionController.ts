import Subscriptions from "../../repositories/subscriptions/SubscriptionsInMemory";
import Logger from "../../utils/Logger";
import Controller from "./Controller";

export default class SubscriptionController extends Controller {
    index() {
        const subscriptions = Subscriptions.all();
        this.res.json({ data: subscriptions });
    }

    create() {
        if (!this.req.body.subject) {
            this.res.status(400).send();
        }

        const subscription = Subscriptions.create(this.req.body.subject);
        if (subscription) {
            this.res.status(201).json({ data: subscription });
        }

        this.res.status(500).send();
    }

    read() {
        this.checkParamsId();

        const subscription = Subscriptions.read(this.req.params.id);
        if (subscription) {
            this.res.json({ data: subscription });
        }

        this.res.status(404).send();
    }

    update() {
        this.checkParamsId();

        if (!this.req.body.subject) {
            this.res.status(400).send();
        }

        const subscription = Subscriptions.update(
            this.req.params.id,
            this.req.body.subject
        );
        if (subscription) {
            this.res.json({ data: subscription });
        }

        this.res.status(404).send();
    }

    delete() {
        this.checkParamsId();
        if (Subscriptions.delete(this.req.params.id)) {
            this.res.status(204).send();
        }
        this.res.status(404).send();
    }

    private checkParamsId() {
        if (!this.req.params.id) {
            this.res.status(400).send();
        }
    }
}
