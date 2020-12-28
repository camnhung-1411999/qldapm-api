import PaymentService from '../services/payment.service';
import { Request, Response } from 'express';
import { User } from '../middleware/user.auth';
class PaymentController {
    async list(req: Request, res: Response) {
        const email = await User(req,res);
        const results = await PaymentService.list(email);
        res.json(results);
    }

    async find(req: Request, res: Response) {
        PaymentService.find(req.params.id).then((result) => {
            res.json(result);
        }).catch((error) => {
            res.status(404).json({
                name: 'ERROR',
                message: error.message,
            });
        })
    }

    async create(req: Request, res: Response) {
        const email = await User(req,res);
        const input: any = {
            ...req.body,
            email,
        }

        PaymentService.create(input).then((result) => {
            res.json(result);
        })
    }

    async update(req: Request, res: Response) {
        const input = {
            id: req.params.id,
            ...req.body,
        }
        PaymentService.update(input).then((result) => {
            res.json(result);
        }).catch((error) => {
            res.status(404).json({
                name: 'ERROR',
                message: error.message,
            })
        })
    }

    async delete(req: Request, res: Response) {
        const result = await PaymentService.delete(req.params.id);
        res.json(result);
    }
}
export default new PaymentController();