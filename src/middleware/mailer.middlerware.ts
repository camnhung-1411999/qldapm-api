import Email from "email-templates";
import path from "path";
import nodemailer from "nodemailer";

class Mailer {
  async send(data: any, url: string): Promise<void> {
    const transporter: any = await nodemailer.createTransport({
      pool: true,
      service: "Gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.HOST_MAIL || "camnhung111777@gmail.com",
        pass: process.env.PASS_MAIL || "swxajgfvfvzvtesu",
      },
    });
    const email = new Email({
      message: {
        from: process.env.HOST_MAIL || "camnhung111777@gmail.com",
      },
      send: true,
      transport: transporter,
    });
    try {
      const mail2 = await email.send({
        template: path.join(__dirname, url),
        message: {
          to: data.email,
        },
        locals: {
          data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Mailer();
