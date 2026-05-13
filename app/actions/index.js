'use server'; // this is a server action

import { createUser, findUserByCredentials } from "@/db/queries";
import { redirect } from "next/navigation";

// actions for register user
async function registerUser(formData) {
    const user = Object.fromEntries(formData);
    const created = await createUser(user);

    redirect('/login');
}


// actions for login user by credentials
async function performLogin(formData) {
    try {
        const credential = {};
        credential.email = formData.get('email');
        credential.password = formData.get('password');

        const found = await findUserByCredentials(credential);

        return found;
    } catch (error) {
        // throw new Error(`${error.message}`);
        throw error;
    }
}


export { registerUser, performLogin };