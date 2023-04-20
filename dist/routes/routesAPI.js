"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAPI = void 0;
const sendAPI = (res, data) => {
    res.writeHead(data.status, { "Content-Type": "application/json" });
    res.write(JSON.stringify(Object.assign(Object.assign({}, data), { status: undefined })));
    res.end();
};
exports.sendAPI = sendAPI;
//# sourceMappingURL=routesAPI.js.map