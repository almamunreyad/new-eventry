'use server'; // this is a server action

import { createUser } from "@/db/queries";
import { redirect } from "next/navigation";

// actions for register user
async function registerUser(formData) {
    const user = Object.fromEntries(formData);
    const created = await createUser(user);

    redirect('/login');
}

export { registerUser };