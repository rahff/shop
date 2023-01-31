export interface RegistrationUserBody {
    name: string,
    firstname: string,
    email: string,
    password: string,
    title: UserTitle,
    birthday: string,
    subscribeNews: boolean
}

enum UserTitle {
    MR = "Mr",
    MS = "Ms"
}