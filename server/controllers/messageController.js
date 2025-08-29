import Message from "../models/Message.js";
import User from "../models/User.model.js";


// Get all users except the logged in user



export const getUsersForSidebar = async (req, res)=>{
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password");

        // count number of messages not seen

        const unseenMessages = {}
        const promises = filteredUsers.map(async (user)=>{
            const messages = await Message.find({
                senderId: user._id, receiverId: userId,
                seen: false
            })
            if(messages.length > 0){
                unseenMessages[user._id] = messages.length;
            }
        })
        await Promise.all(promises);
        res.json({success: true, users: filteredUsers, unseenMessages})
        
    } catch (error) {
        console.log(error.Message);
        res.json({success: false, message: error.Message})
        
        
    }
}