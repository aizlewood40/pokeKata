type User = {
    id: string,
    name: string,
};

(global as any).user = {
    id: "1",
    name: "Matt Aizlewood"
} as User;

export const getUser = async (userId: string) => {
    return global.user as User;
}

export const updateUser = async (userId: string, name: string) => {
    (global.user as User).name = name;
}