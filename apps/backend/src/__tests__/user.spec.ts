import IUserService from "../Interfaces/IUserService.interface";
import { User } from "../Entities/User";
import UserService from "../Services/user.service";


describe('Users', () => {
    let user: User;
    let userService: IUserService;

    beforeEach(async () => {
        user = new User();
        userService = new UserService();

        // const module: TestingModule = await Test.createTestingModule({
        //     providers: [ShoppingCartService]
        // }).compile();

        // module.get<IShoppingCartService, ShoppingCartService>
    });

    it('should get all users', () => {
        let newUsers: User[] = [
            {
                id: 1,
                username: 'Jane',
                isActive: false,
                passwordHash: ''
            },
            {
                id: 2,
                username: 'Henry',
                isActive: false,
                passwordHash: ''
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

        // let customerCart : ShoppingCart = {

        // }

        let newUsers: User =
        {
            id: 1,
            username: 'Jane',
            isActive: false,
            passwordHash: ''
        };

        //act
        userService.AddUser(newUsers);

        let result = userService.GetUserById(newUsers.id);

        //assert
        expect(result.username).toEqual('Jane')
    });

    it('should get user by id', () => {
        //arrange

        // let customerCart : ShoppingCart = {

        // }

        let newUsers: User =
        {
            id: 1,
            username: 'Jane',
            isActive: false,
            passwordHash: ''
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
            isActive: false,
            passwordHash: ''
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
            isActive: false,
            passwordHash: ''
        };

        //act
        userService.AddUser(newUsers);
        userService.ActivateUser(newUsers.id);

        let result = userService.GetUserById(newUsers.id);

        //assert
        expect(result.isActive).toEqual(true);
    });

})