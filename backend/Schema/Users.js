import mongoose, { Schema } from "mongoose";

const profile_imgs_collections_list = [
    "bottts", 
    // Add more collections as needed
];

// Additional seed names
const profile_imgs_name_list = [
    "Mittens",
    "Spooky",
    "Snowball",
    "Pumpkin",
    "Precious",
    "Nala",
    "Harley",
    "Cuddles",
    "Trouble",
    "Socks"
    
    // Add more names as needed
];
let num = Math.floor(Math.random() * profile_imgs_collections_list.length)

const userschema = mongoose.Schema({
     profile_details : {
        fullname : {
            type: String,
            lowercase: true,
            required: true,
            minlength: [3, 'fullname must be 3 letters long'],
        },
        email : {
            type: String,
            required: true,
            lowercase:true,
            unique:true,
        }, 
        phone : {
            type: String,
            default : ''
        },
        password: {
            type: String, 
            required: true,
        },
        username :{
            type: String,
            minlength: [3, 'Username must be 3 letters long'],
            unique:true,
        },
        country :{
            type : String,
            default:"",
        },
        city : {
            type : String,
            default:"",
        },
        profile_img : {
            type: String,
            default: () => {
                return `https://api.dicebear.com/6.x/${profile_imgs_collections_list[0]}/svg?seed=${profile_imgs_name_list[num]}`
            } 
        },
     },
     social_media : {
        youtube: {
            type: String,
            default: "",
        },
        instagram: {
            type: String,
            default: "",
        },
        facebook: {
            type: String,
            default: "",
        },
        twitter: {
            type: String,
            default: "",
        },
        github: {
            type: String,
            default: "",
        },
     },
     IsEmployer : {
        type: Boolean,
        default: false,
     },
    },
    {

        timestamps: {
            createdAt: 'joinedAt'
        } 
     
})

export default mongoose.model('users', userschema);