import FileService from '../services/file.service';
import { Request, Response } from 'express';
import { User } from '../middleware/user.auth';
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'camnhung',
  api_key: '432754556175189',
  api_secret: '2TIXe6WJiVufXL41VhbBtYjqkgc',
});
class FileController {
  async list(req: Request, res: Response) {
    const email = await User(req,res);
    const results = await FileService.list(email);
    res.json(results);
  }

  async find(req: Request, res: Response) {
    FileService.find(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(404).json({
          name: 'ERROR',
          message: error.message,
        });
      });
  }

  async create(req: Request, res: Response) {
    const email = await User(req, res);
    const pathFile = req.file.destination + req.file.originalname;
    fs.renameSync(req.file.path, pathFile);
    cloudinary.v2.uploader.upload(
      pathFile,
      { resource_type: 'raw' },
      async (err: any,result: any) => {
        await unlinkAsync(pathFile);
        if (err) {           
          throw err;
        }
        else {
           let input: any = {
            size: result.bytes,
            path: result.url,
            type: result.format,
            email,
            name: req.file.originalname,
          };
          FileService.create(input).then((iresult) => {
            res.json(iresult);
          });
        }
      }
    );
  }

  async update(req: Request, res: Response) {
    const input = {
      id: req.params.id,
      ...req.body,
    };
    FileService.update(input)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(404).json({
          name: 'ERROR',
          message: error.message,
        });
      });
  }

  async delete(req: Request, res: Response) {
    const result = await FileService.delete(req.params.id);
    res.json(result);
  }
}
export default new FileController();
