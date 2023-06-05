import { Knex } from "knex";
// import { User } from "./models"

export class UserService {

    constructor(private knex: Knex) {
        this.knex = knex;
    }

    async login(username: string, password: string) {
        const users = await this.knex
            .select('id', 'username', 'password')
            .from('user').where({
                username: username,
                password: password
            });
        return users
    }
    // Get User by username
    async getUser(username: string) {
        let user = await this.knex
            .from('user')
            .where({ username: username })
            .select('id', 'username', 'password')
        return user[0]
    }

    // Get User by id
    async getUserById(id: number) {
        let user = await this.knex
            .from('user')
            .where({ id: id })
            .select('id', 'username', 'password')
        return user[0]
    }

    //get all user
    async getUsers() {
        let user = await this.knex
            .from('user')
            .select('id', 'username', 'password')
        return user
    }
}