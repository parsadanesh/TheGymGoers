import GymGroup from "../models/GymGroup.model.js";
import User from "../models/user.model.js";

export default class GymGroupService {



    // creates a group and stores it in the database
    async createGroup({ user, newGroup }) {
        let email = user;
        let gymGroup;
        try {
            const adminUser = await User.findOne({ email });
            if (!adminUser) {
                throw new Error("User not found");
            }
            newGroup = {
                name: newGroup.name,
                admin: adminUser._id
            }
            gymGroup = new GymGroup(newGroup);

            await gymGroup.save();

            let groupName = gymGroup.name;

            this.addMember({userEmail: email, gymGroupName: groupName } );
        } catch (e) {
            throw e;
        }
        return await gymGroup.save();
    }

    // adds a new member to the gym group then saves to the database
    async addMember({userEmail, gymGroupName}) {
        try {
            
            const gymGroup = await GymGroup.findOne({ name: gymGroupName });
            
            if (!gymGroup) {
                throw new Error("GymGroup not found");
            }
    
            const user = await User.findOne({ email: userEmail });

            if (!user) {
                throw new Error("User not found");
            }

            if (!gymGroup.members.includes(user)) {
                gymGroup.members.push(user);
            }

            await gymGroup.save();
            return gymGroup;

        } catch (e) {
            throw e;
        }
    };

    // returns all the groups a user is a member of
    async getGroups(userEmail) {
        try {
            const user = await User.findOne({ email: userEmail });
            if (!user) {
                throw new Error("User not found");
            }

            const allGymGroups = await GymGroup.find();
            let groups = [];

            allGymGroups.forEach(gymGroup => {
                if (gymGroup.members.includes(user._id)) {
                    groups.push(gymGroup);
                }
            });
            return groups;

        } catch (e) {
            throw (e);
        }
    };

    // returns all the members of a specific group
    async getMembers(gymGroupName) {
        let membersDetails = [];
        try {
            const gymGroup = await GymGroup.findOne({ name: gymGroupName });
            
            if (!gymGroup) {
                throw new Error("No GymGroup with that name");
            }

            const gymGroupMembers = gymGroup.members;

            const memberEmailsPromises = gymGroupMembers.map(async member => {
                let user = await User.findById(member._id);
                let workouts = user.workouts;
                return {
                    email: user.email,
                    workouts: workouts
                };
            });
            
            membersDetails = await Promise.all(memberEmailsPromises);

            if (membersDetails.length > 0) {
                return membersDetails;
            };
            
        } catch (e) {
            throw e;
        }
    };
}