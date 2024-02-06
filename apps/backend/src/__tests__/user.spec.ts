import IUserService from "../Interfaces/IUserService.interface";
import { User } from "../Entities/User";
import UserService from "../Services/user.service";


describe('Users', () => {
    let user: User;
    let userService: IUserService;

    beforeEach(async () => {
        user = new User();
        userService = new UserService();

    });

    it('should get all users', () => {
        let newUsers: User[] = [
            {
                id: 1,
                username: 'Jane',
                isActive: false,
                email: 'Jane@email.com',
                password: ''
            },
            {
                id: 2,
                username: 'Henry',
                isActive: false,
                email: 'Henry@email.com',
                password: ''
            }
        ]

        //act
        userService.AddUser(newUsers[0]);
        userService.AddUser(newUsers[1]);

        let result = userService.GetUsers();

        //assert
        expect(result.length).toEqual(2);
    });

    it('should add a new user', () => {
        //arrange

        let newUsers: User =
        {
            id: 1,
            username: 'Jane',
            email: 'Jane@email.com',
            isActive: false,
            password: ''
        };

        //act
        userService.AddUser(newUsers);

        let result = userService.GetUserById(newUsers.id);

        //assert
        expect(result.username).toEqual('Jane')
    });

    it('should get user by id', () => {
        //arrange

        let newUsers: User =
        {
            id: 1,
            username: 'Jane',
            email: 'Jane@email.com',
            isActive: false,
            password: ''
        };

        //act
        userService.AddUser(newUsers);

        let result = userService.GetUserById(newUsers.id);

        //assert
        expect(result.username).toEqual('Jane')
    });

    it('should make user inActive', () => {
        //arrange
        let newUsers: User =
        {
            id: 1,
            username: 'Jane',
            email: 'Jane@email.com',
            isActive: false,
            password: ''
        };

        //act
        userService.AddUser(newUsers);
        userService.DeactivateUser(newUsers.id);

        let result = userService.GetUserById(newUsers.id);

        //assert
        expect(result.isActive).toEqual(false);
    });

    it('should make user active', () => {
        //arrange
        let newUsers: User =
        {
            id: 1,
            username: 'Jane',
            email: 'Jane@email.com',
            isActive: false,
            password: ''
        };

        //act
        userService.AddUser(newUsers);
        userService.ActivateUser(newUsers.id);

        let result = userService.GetUserById(newUsers.id);

        //assert
        expect(result.isActive).toEqual(true);
    });

    it('should get all addresses for a specific user', () => {
        expect.assertions(1);
    });

    it('should get all payment methods for a specific user', () => {
        expect.assertions(1);
    });


})