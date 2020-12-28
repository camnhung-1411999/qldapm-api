import TransactionService from "../services/transaction.service";
import { Request, Response } from "express";
import Mailer from '../middleware/mailer.middlerware';
import { User } from "../middleware/user.auth";
class TransactionController {
  async list(req: Request, res: Response) {
    const user = await User(req, res);
    const results = await TransactionService.list(user);
    res.json(results);
  }

  async find(req: Request, res: Response) {
    TransactionService.find(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(404).json({
          name: "ERROR",
          message: error.message,
        });
      });
  }

  async create(req: Request, res: Response) {
    const sender = await User(req, res);
    const input: any = {
      ...req.body,
      sender,
    };

    TransactionService.create(input)
      .then(async (result) => {
        const url = "../templates/notification";
        const data = {
          fromEmail: sender,
          email: result.receiver,
          url: process.env.URL_FE,
        };
        await Mailer.send(data, url)
          .then(() => {
            res.json(result);
          })
          .catch((error) => {
            res.status(500).json({
              message: error.message,
            });
          });
        
      })
      .catch((err) => {
        res.status(404).json({
          message: err.message,
        });
      });
  }

  async update(req: Request, res: Response) {
    const input = {
      id: req.params.id,
      ...req.body,
    };
    TransactionService.update(input)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(404).json({
          name: "ERROR",
          message: error.message,
        });
      });
  }

  async delete(req: Request, res: Response) {
    const result = await TransactionService.delete(req.params.id);
    res.json(result);
  }
}
export default new TransactionController();
