import { eventModel } from "@/models/event-models";
import { userModel } from "@/models/user-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";
import mongoose from "mongoose";


// get all events
async function getAllEvents() {
    const allEvents = await eventModel.find().lean();

    // return allEvents;
    return replaceMongoIdInArray(allEvents);
}


// get events by id
async function getEventById(eventId) {
    const event = await eventModel.findById(eventId).lean();

    return replaceMongoIdInObject(event);
}


// create user functions
async function createUser(user) {
    return await userModel.create(user);
}


// find user by credentials
async function findUserByCredentials(credentials) {
    const user = await userModel.findOne(credentials).lean();

    if (user) {
        return replaceMongoIdInObject(user);
    }

    return null;
}



// update interested ids
async function updateInterest(eventId, authId) {
    const event = await eventModel.findById(eventId);

    if (event) {
        const foundUsers = event.interested_ids.find(id => id.toString() === authId.toString());

        if (foundUsers) {
            event.interested_ids.pull(new mongoose.Types.ObjectId(authId));
        } else {
            event.interested_ids.push(new mongoose.Types.ObjectId(authId));
        }

        event.save();
    }

}


// update going ids
async function updateGoing(eventId, authId) {
    const event = await eventModel.findById(eventId);

    if (event) {
        event.going_ids.push(new mongoose.Types.ObjectId(authId));
        event.save();
    }
}



export { getAllEvents, getEventById, createUser, findUserByCredentials, updateInterest, updateGoing };