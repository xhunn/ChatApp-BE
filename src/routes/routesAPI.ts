import { Response } from "express";

const sendAPI = (res: Response, data: any) => {
  res.writeHead(data.status, { "Content-Type": "application/json" });
  res.write(JSON.stringify({...data, status: undefined}));
  res.end();
};

export { sendAPI }