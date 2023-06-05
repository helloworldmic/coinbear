import { Knex } from "knex";
import { hashPassword } from "../utils/hash";
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();
    // Inserts seed entries
    await knex("user").insert([
        {
            firstName: "Adams",
            lastName: "Baker",
            email: 'adamsbaker@123.com',
            username: "adamsbaker",
            password: await hashPassword("1234") // enter 1234
    
        },
        {
            firstName: "Robot",
            lastName: "Trader",
            email: 'robottrader@123.com',
            username: "robottrader",
            password: await hashPassword("1234") // enter 1234
        }
    ]).returning('id');
};
