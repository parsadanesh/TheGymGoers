import GymGroupService from "../service/GymGroup.services.js";


export default class GymGroupController {
    #service;

    constructor(service = new GymGroupService()) {
        this.#service = service;
    }

    // takes a request of user email and group name to create a new group
    createGroup = async (req, res) => {
        const InvalidError = new Error("Invalid Details");
        try {
            if (!req.body ) throw InvalidError;
            const newGroup = await this.#service.createGroup(req.body.params);
            if (!newGroup._id) {
                throw new Error("unable to create the GymGroup");
            }
            res.status(201).json(newGroup);
        } catch (e) {
            if (e.message == InvalidError.message) {
                return res.status(400).json({ message: e.message });
            }
            return res.status(500).json({ message: e.message });
        }
    }

    // takes a request of user email and group name to add a user to an existing group
    addMember = async (req, res) => {
        const InvalidError = new Error("Invalid Details");
        try {
            if (!req.body) throw InvalidError;
            const updatedGroup = await this.#service.addMember(req.body.params);
            if (!updatedGroup) {
                throw Error("Could not add the new member");
            }
            res.status(201).json(updatedGroup);
        } catch (e) {
            if (e.message === InvalidError.message) {
                return res.status(400).json({ message: e.message });
            }
            res.status(500).json({
                message: `Unable to add new user to the GymGroup`
            });
        }
    }

    // takes a request of user email returns all the groups for that user
    getGroups = async (req, res) => {
        try {
            const userEmail = req.query.email;
            const gymGroups = await this.#service.getGroups(userEmail);
            res.status(200).json(gymGroups);
        } catch (e) {
            res.status(500).json({message: e.message })
        }
    }

    // takes a request of a group name and returns the details of all members in  the group
    getMembers = async (req, res) => {
    const InvalidError = new Error("Invalid Details");
    try {
        const gymGroupName = req.query.groupName;
        if (!gymGroupName) throw InvalidError; 
        const groupMembers = await this.#service.getMembers(gymGroupName);
        if (!groupMembers) {
            throw Error("Could not find members");
        }
        res.status(200).json(groupMembers);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
}