// import { Knex } from "knex";

// export class RegisterService {
//     constructor(private knex: Knex){
//         this.knex = knex;
//     }
    
//     async registerUser(firstName:string, lastName:string, username:string, email:string, password:string) {
//         const register = await this.knex('user').insert({firstName:firstName, lastName:lastName, username:username, 
//             email:email, password:password}).returning('id')
//         return register
//     }
// }


