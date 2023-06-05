import { Knex } from "knex";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";

type Data = {
  side: string;
  pair: string;
  executedPrice: number;
  executed: number;
  amount: number;
  fee: number;
  unixTimestamp: number;
  datetime: number;
};

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("transaction").del();
  const myFiles = ["./data/transaction-seed.csv"];

  for (let j = 0; j < myFiles.length; j++) {
    const parentPath = path.resolve(__dirname, "..");

    const csvFilePath = path.resolve(parentPath, myFiles[j]);

    const headers = [
      "side",
      "pair",
      "executedPrice",
      "executed",
      "amount",
      "fee",
      "unixTimestamp",
      "datetime",
      "BTC",
      "ETH",
      "SAND",
      "USD"
    ];

    const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

    const data: Data[] = parse(fileContent, {
      delimiter: ",",
      columns: headers,
    });

    let queryResult = await knex
      .from("user")
      .select("id")
      .where({ username: "adamsbaker" });

    // Inserts seed entries to price
    for (let i = 1; i < data.length; i++) {
      await knex("transaction")
        .insert([
          {
            userID: queryResult[0].id,
            side: data[i]["side"],
            pair: data[i]["pair"],
            executedPrice: data[i]["executedPrice"],
            executed: data[i]["executed"],
            amount: data[i]["amount"],
            fee: data[i]["fee"],
            unixTimestamp: data[i]["unixTimestamp"],
            datetime: data[i]["datetime"],
          },
        ])
        .returning("id");
    }
  }
}
