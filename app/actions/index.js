'use server'; // this is a server action

import EmailTemplate from "@/components/payments/EmailTemplate";
import { createUser, findUserByCredentials, getEventById, updateGoing, updateInterest } from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { render } from "@react-email/render";
import { Resend } from "resend";

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


// actions for update interest
async function addInterestedEvent(eventId, authId) {
    try {
        await updateInterest(eventId, authId);

    } catch (error) {
        throw error;
    }

    revalidatePath('/');
}



// actions for update going
// async function addGoingEvent(eventId, user) {
//     try {
//         await updateGoing(eventId, user?.id);
//     } catch (error) {
//         throw error;
//     }

//     revalidatePath('/');
//     redirect('/');
// }

// actions for update going
async function addGoingEvent(eventId, user) {
    if (!user?.id) {
        throw new Error("You must be signed in to complete registration.");
    }
    await updateGoing(eventId, user.id);
    try {
        await sendEmail(eventId, user);
    } catch (emailError) {
        console.error("Registration email failed:", emailError);
    }

    revalidatePath('/');
    redirect('/');
}


// actions for resend email verification
async function sendEmail(eventId, user) {

    try {
        console.log(eventId, user, process.env.RESEND_API_KEY);

        if (!user?.email) {
            return;
        }

        const event = await getEventById(eventId);
        if (!event?.name) {
            return;
        }

        if (!process.env.RESEND_API_KEY) {
            console.warn("RESEND_API_KEY is not set; skipping confirmation email.");
            return;
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        const displayName = user.name ?? "Guest";
        const message = `Dear ${displayName}, You have been successfully registered for the event, ${event.name}. Please carry this email as your ticket for the event.`;

        const html = await render(EmailTemplate({ message }));

        const sent = await resend.emails.send({
            from: "Eventry <onboarding@reyad.com>",
            to: user.email,
            subject: "Successfully registered for the event",
            html,
        });
        console.log(sent);
        // return sent;
    } catch (error) {
        throw error;
    }

}



// actions for resend email verification
// async function sendEmail(eventId, user) {

//     try {
//         console.log(eventId, user, process.env.RESEND_API_KEY);
//         const event = await getEventById(eventId);
//         const resend = new Resend(process.env.RESEND_API_KEY);

//         const message = `Dear ${user.name}, You have been successfully registered for the event, ${event.name}. Please carry this email as your ticket for the event.`;

//         const sent = {
//             from: "Eventry <onboarding@reyad.com>",
//             to: user?.email,
//             subject: "Successfully registered for the event",
//             react: EmailTemplate({ message })
//         };
//     } catch (error) {
//         throw error;
//     }

// }



export { registerUser, performLogin, addInterestedEvent, addGoingEvent, sendEmail };