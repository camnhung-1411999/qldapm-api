import UserService from "../services/user.service";
import { Request, Response } from "express";
import { User } from "../middleware/user.auth";
import Mailer from "../middleware/mailer.middlerware";
import moment from "moment";
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

var cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "camnhung",
  api_key: "432754556175189",
  api_secret: "2TIXe6WJiVufXL41VhbBtYjqkgc",
});
class UserController {
  async list(req: Request, res: Response) {
    const users = await UserService.list();
    res.json(users);
  }

  async find(req: Request, res: Response) {
    const username = await User(req, res);
    const user = await UserService.find(username);
    res.json(user);
  }

  async sendMail(req: Request, res: Response) {
    const idate = new Date();
    const username = await User(req, res);

    const data = {
      fromEmail: username,
      email: req.body.toEmail,
      title: req.body.title,
      content: req.body.content,
      url: process.env.URL_FE,
      date: moment(idate).format("DD/MM/YYYY"),
      time: moment(idate).format("HH:mm"),
    };
    const url = "../templates/message";
    await Mailer.send(data, url)
      .then(() => {
        res.json("Sent");
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
  }

  async detail(req: Request, res: Response) {
    const iuser: any = {
      email: req.body.email,
      password: req.body.password,
    };
    await UserService.detail(iuser)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        if (err.message === "NOT_FOUND") {
          res.status(404).json({
            name: "ERROR",
            message: err.message,
          });
        } else {
          res.status(422).json({
            name: "ERROR",
            message: err.message,
          });
        }
      });
  }

  async create(req: Request, res: Response) {
    const input = {
      ...req.body,
    };
    await UserService.create(input)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(422).json({
          name: "ERROR",
          message: err.message,
        });
      });
  }
  async update(req: Request, res: Response) {
    const email = await User(req, res);
    if (req.file) {
      const pathFile = req.file.destination + req.file.originalname;
      fs.renameSync(req.file.path, pathFile);
      cloudinary.v2.uploader.upload(
        pathFile,
        { resource_type: "raw" },
        async (err: any, result: any) => {
          await unlinkAsync(pathFile);
          if (err) {
            throw err;
          } else {
            let iinput: any = {
              image: result.url,
              email,
            };
            UserService.update(iinput).then((iresult) => {
              res.json(iresult);
            });
          }
        }
      );
    }
    const input = {
      ...req.body,
      email,
    };
    const user = await UserService.update(input);
    res.json(user);
  }
}

export default new UserController();
