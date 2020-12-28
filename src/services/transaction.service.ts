import TransactionCollection, {ITransaction} from '../model/transaction.model';
import FileCollection from '../model/file.model';
import UserCollection from '../model/user.model';
class TransactionService {
    async list(data: string) {
        return TransactionCollection.find({
            receiver: data,
        }).populate('fileId').then((result) =>{
            return result;
        })
    }

    async find(id: string) {
        return TransactionCollection.findById({
            _id: <Object>id,
        }).then((transaction) => {
            if (transaction) {
                return transaction;
            }
            const err: Error = {
                message: 'NOT_FOUND',
                name: 'Error',
            }
            throw err;
        })
    }

    async create(input: ITransaction) {
        const user = await UserCollection.findOne({
            email: input.receiver,
        });
        if(!user){
            const err: Error = {
                message: 'RECEIVER_NOT_FOUND',
                name: 'Error',
            }
            throw err;
        }
        return TransactionCollection.create({
          sender: input.sender,
          receiver: input.receiver,
          fileId: input.fileId,
          status: input.status,
        }).then((res) => (res));
    }

    async update(input: any) {
        const transaction = await TransactionCollection.findById(input.id);

        if (!transaction) {
            const err: Error = {
                message: 'NOT_FOUND',
                name: 'Error',
            }
            throw err;
        }

        transaction.sender = input.sender ? input.sender : transaction.sender;
        transaction.receiver = input.receiver ? input.receiver: transaction.receiver;
        transaction.fileId = input.fileId ? input.fileId : transaction.fileId;
        transaction.status = input.status ? input.status : transaction.status;

        await transaction.save();

        return transaction;
    }

    async delete(id: string) {
        return TransactionCollection.findByIdAndDelete(id).then((res) => (res));
    }
}

export default new TransactionService();