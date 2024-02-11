import { Role } from "./Role.model";

export class User{
    public id: number=0;
    public noms : string ="";
    public username: string ="";
    public email: string="";
    public role : Role =new Role;
    constructor( ) {

    }
}