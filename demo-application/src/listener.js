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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fabric_network_1 = require("fabric-network");
var path = require("path");
var fs = require("fs");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var walletPath, wallet, gateway, connectionProfilePath, connectionProfile, connectionOptions, network, contract, listener, finished, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    walletPath = path.join(process.cwd(), 'Org1Wallet');
                    return [4 /*yield*/, fabric_network_1.Wallets.newFileSystemWallet(walletPath)];
                case 1:
                    wallet = _a.sent();
                    console.log("Wallet path: " + walletPath);
                    gateway = new fabric_network_1.Gateway();
                    connectionProfilePath = path.resolve(__dirname, '..', 'connection.json');
                    connectionProfile = JSON.parse(fs.readFileSync(connectionProfilePath, 'utf8'));
                    connectionOptions = { wallet: wallet, identity: 'Org1 Admin', discovery: { enabled: true, asLocalhost: true } };
                    return [4 /*yield*/, gateway.connect(connectionProfile, connectionOptions)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, gateway.getNetwork('mychannel')];
                case 3:
                    network = _a.sent();
                    contract = network.getContract('demo-contract');
                    listener = function (event) { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            if (event.eventName === 'myEvent') {
                                console.log('chaincodeId: ', event.chaincodeId, ' eventName: ', event.eventName, ' payload: ', (_a = event.payload) === null || _a === void 0 ? void 0 : _a.toString());
                            }
                            return [2 /*return*/];
                        });
                    }); };
                    finished = false;
                    return [4 /*yield*/, contract.addContractListener(listener)];
                case 4:
                    _a.sent();
                    console.log('Listening for myEvent events...');
                    _a.label = 5;
                case 5:
                    if (!!finished) return [3 /*break*/, 7];
                    return [4 /*yield*/, sleep(5000)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    process.exit(1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
void main();
