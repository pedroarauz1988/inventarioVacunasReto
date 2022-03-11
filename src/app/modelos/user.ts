export interface User {
    userName: string;
    password: string;
    identification: string;
    roles: Rol[];
}

export interface Rol {
    name: string;
}
