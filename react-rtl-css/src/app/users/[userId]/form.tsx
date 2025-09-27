'use client'

import { updateName } from "./actions";
import { useActionState, useRef } from "react";
import SubmitButton from "@/app/components/SubmitButton";

const Form = ({ userId }: {userId: string}) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, action] = useActionState(updateName, {
        userId,
        name: "",
        message: "",
    }); 

    if(state.message === "200") {
        formRef.current?.reset();
    }

    return (
        <form action={action} ref={formRef}>
            <input type="text" name="name" />
            <SubmitButton />
        </form>
    );

};

export default Form;