import { ThirdwebStorage } from "@thirdweb-dev/storage";
const fs = require("fs");

const storage = new ThirdwebStorage();

export const upload = async (file: any) => {
  const up = await storage.upload(fs.readFileSync(file));
  console.log("file", storage.resolveScheme(up));
};
