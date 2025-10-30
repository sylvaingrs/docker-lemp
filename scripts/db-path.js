import { existsSync } from "fs";

const isPi = existsSync("/mnt/nvme256/mariadb-data/dumps/init.sql");
const path = isPi ? "/mnt/nvme256/mariadb-data/dumps/init.sql" : "./mariadb/dumps/init.sql";

console.log(path);
