import fs from "fs";
import csv from "csv-parser";

export const readTiresFromCSV = async () => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream("./data/llantas.csv")
      .pipe(csv())
      .on("data", (row) => {
        results.push({
          size: row.size,
          marca: row.marca,
          precio: row.precio
        });
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};
