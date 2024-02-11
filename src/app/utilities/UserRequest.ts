export class UserRequest{

    constructor( public id:number | null,
        public noms : string,
        public username: string,
        public email: string,
        public role : number) {}
}