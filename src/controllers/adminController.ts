import { Request,Response } from "express";
import { UserInterface,UserMethods } from "../interfaces";

export class AdminController {
    private userService:UserMethods;

    constructor(userService:UserMethods){
        this.userService = userService
    }
    public addUser =async(req:Request,res:Response):Promise<void>=>{
        const {first_name,last_name,email,phone}=req.body;
        console.log(first_name,last_name,email,phone);
        
        if(!first_name || !last_name ||!email||!phone){
            res.status(404).json({success:false,message:"All field data is required"})
        }
        try {
            const newUser:UserInterface={first_name,last_name,email,phone}
            const user:UserInterface=await this.userService.newUser(newUser);
            if(user){
                res.status(201).json({user,success:true});
            }else{
                res.status(400).json({success:false,message:"Failed to add user"})
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'An error occured while adding new User'
            });
        }
    }

    public loadHome=async (req:Request,res:Response):Promise<void>=>{
        try {
            const users=await this.userService.getAllUser();
            if(users){
                res.render("users",{users})
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Failed to fetch users'
                });
            }
           
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'An error occured while load Users'
            });
        }
    }

    public updateUser=async (req:Request,res:Response):Promise<void> => {
        const {id}=req.params;
        const {first_name,last_name,email,phone}=req.body;
        try {
            const updatedUser= await this.userService.updateUser(id,{first_name,last_name,email,phone});
            if(updatedUser) {
                res.status(200).json({
                    updatedUser,
                    success: true,
                });
            }else {
                res.status(400).json({
                    success: false,
                    messages: 'Failed to update user'
                });
            }
            
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'An error occured while load Users'
            });
        }
    }
    
    public deleteUser = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
    
        try {
            const deletedUser = await this.userService.deleteUser(id);
            if(deletedUser) {
                res.status(200).json({
                    deletedUser,
                    success: true
                });
            }else {
                res.status(400).json({
                    success: false,
                    message: 'Failed to delete user'
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'An errore occured while deleting the user'
            });
        }
    }
    public userDetail = async (req: Request, res: Response): Promise<void> => {

        const { id } = req.params;

        try {
            const user = await this.userService.userDetails(id)
    
            if(user) {
                res.status(200).json({
                    user,
                    success: true
                })
            }else {
                res.status(400).json({
                    success: false,
                    message: 'Failed to fetch user'
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'An error occured while fetching the user'
            });
        }
    }
    
}