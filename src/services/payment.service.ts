import PaymentCollection, {IPayment} from '../model/payment.model';

class PaymentService {
    async list(email: string) {
        return PaymentCollection.find(
            { 
                email,
            }
        ).then(res => (res));
    }

    async find(id: string) {
        return PaymentCollection.findById(id).then((res) => {
            if(res) {
                return res;
            }

            const err: Error = {
                message: 'NOT_FOUND',
                name: 'Error',
            }
            throw err;
        })
    }

    async create(input: IPayment) {
        return PaymentCollection.create({
            email: input.email,
            amount: input.amount,
        }).then((res) => (res));
    }

    async update(input: IPayment) {
        const payment = await PaymentCollection.findById(input.id);

        if (!payment) {
            const err: Error = {
                message: 'NOT_FOUND',
                name: 'Error',
            }
            throw err;
        }

        payment.amount = input.amount ? input.amount : payment.amount;
        await payment.save();
        return payment;
    }

    async delete(id: string) {
        return PaymentCollection.findByIdAndRemove(id).then((res) => (res));
    }
}

export default new PaymentService();