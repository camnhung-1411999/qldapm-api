"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./utils/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
const data = new db_1.default();
app_1.default.listen(Number(process.env.PORT || 4000), '0.0.0.0', () => {
    console.log(`Express started.\nListening on port 4000`);
});
//# sourceMappingURL=index.js.map