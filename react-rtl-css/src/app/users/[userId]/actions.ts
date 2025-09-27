"use server";

import { updateUser } from "@/app/data-access/user";
import { revalidatePath } from "next/cache";

export const updateName = async (userId: string, formData: FormData) => {
    // delay for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newName = formData.get("name") as string;
    await updateUser(userId, newName);
    revalidatePath(`/users/${userId}`, "page");
    return {
        userId: userId,
        name: "",
        message: "200",
    }
}