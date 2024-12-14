import {Router} from "express";
import {AdminController} from "./controllers/adminController"
import { UserServices } from "./taskManager";


const router: Router = Router();
const userService=new UserServices()
const adminController =new AdminController(userService);

router.get('/',adminController.loadHome);
router.get('/users/:id', adminController.userDetail)
router.post('/users', adminController.addUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser)

export default router;