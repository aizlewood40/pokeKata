import { NextPage } from "next"
import { getUser, updateUser } from "../../data-access/user";
import { useFormState } from "react-dom";
import { updateName } from "./actions";
import Form from "./form";

const UsersPage: NextPage = async ({params}: {params: {userId: string}}) => {

    const {userId} = await params;

    const user = await getUser(userId);

    return (
        <main>
            <div>
                Users {user.name}
                <Form userId={user.id} />
            </div>
        </main>
    )

};

export default UsersPage;