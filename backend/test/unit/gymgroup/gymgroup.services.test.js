import { expect } from "chai";
import sinon from "sinon";
import GymGroupService from "../../../src/service/GymGroup.services.js";
import GymGroup from "../../../src/models/GymGroup.model.js";
import User from "../../../src/models/user.model.js";

describe("GymGroup Service Tests", () => {
    let userFindOneStub, gymGroupSaveStub, addMemberSpy, gymGroupService, findOneGymGroupStub, gymGroupFindStub, userFindByIdStub;


    beforeEach(() => {
        gymGroupService = new GymGroupService();
        userFindOneStub = sinon.stub(User, 'findOne');
        findOneGymGroupStub = sinon.stub(GymGroup, 'findOne');
        gymGroupSaveStub = sinon.stub(GymGroup.prototype, 'save');
        gymGroupFindStub = sinon.stub(GymGroup, 'find');
        userFindByIdStub = sinon.stub(User, 'findById');
        addMemberSpy = sinon.spy(gymGroupService, 'addMember');
    });

    afterEach(() => {
        sinon.restore(); 
    });


    describe("Create Group Service Tests", () => {

        it('should create a group when user is found', async () => {
            const mockUser = { _id: 'userId', email: 'test@example.com' };
            const newGroup = { name: 'Test Group' };
            userFindOneStub.resolves(mockUser);
            gymGroupSaveStub.resolves(newGroup);

            const result = await gymGroupService.createGroup({ user: { email: 'test@example.com' }, newGroup });

            expect(userFindOneStub.calledOnceWith({ email: 'test@example.com' })).to.be.true;
            expect(addMemberSpy.calledOnceWith(newGroup.name, 'test@example.com')).to.be.true;
            expect(gymGroupSaveStub.calledOnce).to.be.true;
            expect(result).to.deep.equal(newGroup);
        });

        it('should throw an error when user is not found', async () => {
            userFindOneStub.resolves(null);

            try {
                await gymGroupService.createGroup({ user: { email: 'test@example.com' }, newGroup: { name: 'Test Group' } });
                expect.fail('Expected error was not thrown');
            } catch (e) {
                expect(e.message).to.equal('User not found');
            }
        });
    });

    describe("Add Member Service Tests", () => {

        it('should add a user to the gym group if both exist and user is not already a member', async () => {
            const gymGroup = { name: 'Fitness Group', members: [], save: gymGroupSaveStub };
            const user = { email: 'user@example.com' };

            findOneGymGroupStub.resolves(gymGroup);
            userFindOneStub.resolves(user);

            const result = await gymGroupService.addMember({ userEmail: 'user@example.com', gymGroupName: 'Fitness Group' });

            expect(findOneGymGroupStub.calledWith({ name: 'Fitness Group' })).to.be.true;
            expect(userFindOneStub.calledWith({ email: 'user@example.com' })).to.be.true;
            expect(gymGroup.members.includes(user)).to.be.true;
            expect(gymGroupSaveStub.calledOnce).to.be.true;
            expect(result).to.deep.equal(gymGroup);
        });
        
        it('should throw an error if the gym group does not exist', async () => {
            findOneGymGroupStub.resolves(null);

            let error;
            try {
                await gymGroupService.addMember({ userEmail: 'user@example.com', gymGroupName: 'Nonexistent Group' });
            } catch (e) {
                error = e;
            }

            expect(error).to.be.an('error');
            expect(error.message).to.equal("GymGroup not found");
        });

        it('should throw an error if the user is not found', async () => {
            const gymGroup = { name: 'Fitness Group', members: [], save: gymGroupSaveStub };

            findOneGymGroupStub.resolves(gymGroup);
            userFindOneStub.resolves(null);

            try {
                await gymGroupService.addMember({ userEmail: 'nonexistent@example.com', gymGroupName: 'Fitness Group' });
                throw new Error('Expected method to reject.');
            } catch (e) {
                expect(e.message).to.equal('User not found');
            }
        });
    });

    describe("Get Groups Service Tests", () => {
        it('should throw an error if the user is not found', async () => {
            userFindOneStub.resolves(null);

            try {
                await gymGroupService.getGroups('nonexistent@example.com');
                throw new Error('Expected method to reject.');
            } catch (e) {
                expect(e.message).to.equal('User not found');
            }
        });

        it('should return an empty array if the user is not a member of any gym group', async () => {
            userFindOneStub.resolves({ _id: 'userId', email: 'user@example.com' });
            gymGroupFindStub.resolves([]);

            const groups = await gymGroupService.getGroups('user@example.com');
            expect(groups).to.be.an('array').that.is.empty;
        });

        it('should return an array of gym groups the user is a member of', async () => {
            const user = { _id: 'userId', email: 'user@example.com' };
            const gymGroups = [
                { name: 'Fitness Group 1', members: ['userId'] },
                { name: 'Fitness Group 2', members: [] },
                { name: 'Fitness Group 3', members: ['userId'] }
            ];

            userFindOneStub.resolves(user);
            gymGroupFindStub.resolves(gymGroups);

            const groups = await gymGroupService.getGroups('user@example.com');
            expect(groups).to.be.an('array').of.length(2);
            expect(groups[0].name).to.equal('Fitness Group 1');
            expect(groups[1].name).to.equal('Fitness Group 3');
        });
    });

    describe("Get Members Service Tests", () => {
        it('should throw an error if no gym group with the given name exists', async () => {
            findOneGymGroupStub.resolves(null);

            try {
                await gymGroupService.getMembers('Nonexistent Gym Group');
                throw new Error('Expected method to reject.');
            } catch (e) {
                expect(e.message).to.equal('No GymGroup with that name');
            }
        });

        it('should return an array of member details for a gym group with members', async () => {
            const gymGroupMembers = [
                { _id: 'memberId1' },
                { _id: 'memberId2' }
            ];
            findOneGymGroupStub.resolves({ name: 'Gym Group With Members', members: gymGroupMembers });

            userFindByIdStub.onFirstCall().resolves({ email: 'member1@example.com', workouts: ['Workout1', 'Workout2'] });
            userFindByIdStub.onSecondCall().resolves({ email: 'member2@example.com', workouts: ['Workout3'] });

            const membersDetails = await gymGroupService.getMembers('Gym Group With Members');
            expect(membersDetails).to.be.an('array').of.length(2);
            expect(membersDetails[0].email).to.equal('member1@example.com');
            expect(membersDetails[0].workouts).to.include.members(['Workout1', 'Workout2']);
            expect(membersDetails[1].email).to.equal('member2@example.com');
            expect(membersDetails[1].workouts).to.include.members(['Workout3']);
        });
    });

});