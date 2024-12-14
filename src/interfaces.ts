export interface UserInterface {
    id?:String;
    first_name:String;
    last_name:String;
    email:String;
    phone:Number;
}

export interface UserMethods{
    newUser(user:UserInterface):Promise<UserInterface>;
    getAllUser():Promise<UserInterface[]>;
    updateUser(id:String,user:UserInterface):Promise<UserInterface|null>;
    deleteUser(id:String):Promise<UserInterface|null>;
    userDetails(id:String):Promise<UserInterface|null>;
}