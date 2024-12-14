import { User } from "./models/userSchema";
import { UserInterface ,UserMethods} from "./interfaces";

export class UserServices implements UserMethods {

    public async newUser(user:UserInterface):Promise<UserInterface>{
        console.log(user);
        
        const newUserData=new User(user);
        return await newUserData.save()
    }

    public async getAllUser():Promise<UserInterface[]>{
        return User.find();
    }

    public async updateUser(id:String,user:UserInterface):Promise<UserInterface | null>{
        const updatedUserData=await User.findByIdAndUpdate(id,user,{new:true}
        );
        return updatedUserData;
    } 
    
    public async deleteUser(id:String):Promise<UserInterface|null>{
        return User.findByIdAndDelete(id);
    }

    public async userDetails(id: String): Promise<UserInterface | null> {
        return await User.findById(id)
    }

}