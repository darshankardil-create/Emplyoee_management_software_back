import express from "express";
import { create,updatebypush,updatebypull,findteamleadfillarr ,decodetoken,findbyid, alluser,deleteac,findbyidandupdate,updatebypullforlead,sendemail} from "../src/controllers.js";


    
const route = express.Router();

route.post("/create", create);
route.put("/updatebypush/:id/:posi", updatebypush);
route.put("/updatebypull/:id", updatebypull);
route.get("/decodetoken",decodetoken)
route.get("/findbyid/:id",findbyid)
route.get("/alluser",alluser) 
route.delete("/deleteac/:id",deleteac)
route.put("/findbyidandupdate/:id/:posi",findbyidandupdate)
route.put("/updatebypullforlead/:id", updatebypullforlead);
route.get("/findteamleadfillarr",findteamleadfillarr)
route.post("/sendemail",sendemail)



export default route;

