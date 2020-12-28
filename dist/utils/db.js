"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const log_1 = __importDefault(require("./log"));
class Database {
    constructor() {
        this.uri = `mongodb+srv://camnhung:camnhung123@cluster0.wj4cd.mongodb.net/qldapm?retryWrites=true&w=majority`;
        this.onConnection();
    }
    onConnection() {
        this.connection = mongoose_1.default.connection;
        this.connection.on('connected', () => {
            log_1.default.info('Mongo Connection Established');
        });
        this.connection.on('reconnected', () => {
            log_1.default.info('Mongo Connection Reestablished');
        });
        this.connection.on('disconnected', () => {
            log_1.default.info('Mongo Connection Disconnected');
            log_1.default.info('Trying to reconnect to Mongo...');
            setTimeout(() => {
                mongoose_1.default.connect(this.uri, {
                    keepAlive: true,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    socketTimeoutMS: 3000,
                    connectTimeoutMS: 3000,
                    useCreateIndex: true,
                    useFindAndModify: false,
                    authSource: 'admin',
                });
            }, 3000);
        });
        this.connection.on('close', () => {
            log_1.default.info('Mongo Connection Closed');
        });
        this.connection.on('error', (error) => {
            log_1.default.info(`Mongo Connection Error${error}`);
        });
        const run = () => __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connect(this.uri, {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
                authSource: 'admin',
            });
        });
        run().catch((error) => log_1.default.error(error));
    }
}
exports.default = Database;
//# sourceMappingURL=db.js.map