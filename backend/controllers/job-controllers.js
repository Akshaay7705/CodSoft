import { nanoid } from 'nanoid';
import  Jwt  from 'jsonwebtoken';
import Jobs from '../Schema/Jobs.js';
import bcrypt from 'bcryptjs';
import Users from '../Schema/Users.js';


export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
 
    if (!token) {
        return res.status(401).json({ "error": "No access token provided" });
    }
 
    const secretKey = process.env.SECRET_KEY; // Retrieve secret key from environment variables
 
    if (!secretKey) {
        return res.status(500).json({ "error": "Internal server error: secret key is not configured" });
    }
 
    Jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ "error": "Access token is invalid" });
        }
        
        req.user = user.id; // Set the user ID in the request object
        next();
    });
 };

 
 export const addJobs = async(req, res) => {
    let ownerId = req.user;

    
    let { title, job_time, skills, place, description, responsibilty, qualification } = req.body;

    // Validation checks for title, description, tasks, startdate, enddate, etc.

    let jobId = title.replace(/[^a-zA-z0-9]/g, ' ').replace(/\s+/g, '-').trim() + nanoid();

    let job = new Jobs({
        job_id: jobId,
        title,
        job_time: job_time,
        skills,
        place,
        description,
        responsibilty,
        qualification,
        company_id: ownerId,
    });


    
    let user = await Users.findOne({ '_id': ownerId });
    let isEmployer = user.IsEmployer;
    

    if (isEmployer) {
        job.save()
            .then((job) => {
                // Update user with the new job ID
                Users.findByIdAndUpdate(ownerId, { $push: { "jobs": job._id } })
                    .then(user => {
                        return res.status(200).json({ "msg": "Job added successfully" });
                    })
                    .catch(err => {
                        return res.status(500).json({ "error": "Failed to update user's projects" });
                    });
            })
            .catch(err => {
                return res.status(500).json({ "error": err.message });
            });
    } else {
        return res.status(400).json({ "error": "Please turn on hiring mode to add job" });
    }
};
    


export const getJobs = (req, res) => {
     Jobs.find()
     .populate("company_id", "profile_details.fullname profile_details.email profile_details.username -_id")
     .select("job_id title job_time skills place description responsibility qualification -_id")
     .then((job) => {
        return res.status(200).json({ "msg": job });
     })
     .catch((err) => {
        console.log(err);
     })
}


export const getUserData = (req, res) => {
    let { username } = req.body
    Users.findOne({'profile_details.username' : username})
    .select("profile_details.fullname profile_details.email profile_details.username profile_details.phone profile_details.country profile_details.city IsEmployer  -_id")
    .then((user) => {
        return res.status(200).json({ "msg": user });
    })
    .catch((error) => {
        return res.status(400).json({ "error": "User details could not be loaded" });
    })
}

export const updateUserData = async (req, res) =>{
    let {username, type, data} = req.body
    if (type == 'employer-details') {
        let user_data = await Users.findOne({'profile_details.username' : username})
        let employer = user_data.IsEmployer
        
        Users.findOneAndUpdate({'profile_details.username' : username}, {IsEmployer : !employer })
        .then((user) => {
            return res.status(200).json({ "msg": "Employer details updated successfully" });
        })
        .catch((err) => {
            return res.status(400).json({ "error": "Employer details could not be updated" });
        })
    }

    if (type == 'name-locations') {
        
        Users.findOneAndUpdate(
            { 'profile_details.username': username }, 
            { 
              $set: {
                "profile_details.fullname": data.name,
                "profile_details.country": data.country,
                "profile_details.city": data.city 
              } 
            },
            { new: true } 
          )
          .then((user) => {
            return res.status(200).json({ "msg": "Profile details updated successfully" });
          })
          .catch((err) => {
            return res.status(400).json({ "error": "Profile details could not be updated" });
          });
    }

    if (type === 'change-password') {
        
    
        // Hash the new password
        bcrypt.hash(data, 10, (err, hash_password) => {
            if (err) {
                return res.status(500).json({ "error": "Error in hashing password" });
            }
    
            // Update the user's password in the database
            Users.findOneAndUpdate(
                { 'profile_details.username': username }, 
                { 
                  $set: {
                    "profile_details.password": hash_password,
                  } 
                },
                { new: true } 
            )
            .then((user) => {
                return res.status(200).json({ "msg": "Password has been updated successfully" });
            })
            .catch((err) => {
                return res.status(400).json({ "error": "Password could not be updated" });
            });
        });
    }
    


        if (type == 'phone-number') {
            
            Users.findOneAndUpdate(
                { 'profile_details.username': username }, 
                { 
                  $set: {
                    "profile_details.phone": data.phone,
                  } 
                },
                { new: true } 
              )
              .then((user) => {
                return res.status(200).json({ "msg": "Phone number has been updated successfully" });
              })
              .catch((err) => {
                return res.status(400).json({ "error": "Phone number has been could not be updated" });
              });
    
            }
            if (type === 'email-address') {
                
                try {
                    // Check if the new email already exists
                    let isEmail = await Users.findOne({"profile_details.email": data.email});
                    if (isEmail) {
                        return res.status(400).json({ "error": "Email already exists" });
                    } else {
                        // Update the user's email address in the database
                        let user = await Users.findOneAndUpdate(
                            { 'profile_details.username': username }, 
                            { $set: { "profile_details.email": data.email } },
                            { new: true } 
                        );
                        return res.status(200).json({ "msg": "Email has been updated successfully" });
                    }
                } catch (err) {
                    return res.status(400).json({ "error": "Email could not be updated" });
                }
            }
        
}
