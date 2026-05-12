import { eventModel } from "@/models/event-models";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";


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

export { getAllEvents, getEventById };