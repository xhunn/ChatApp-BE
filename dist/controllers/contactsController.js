"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContact = exports.getAllContacts = exports.updateContact = exports.postContact = void 0;
const contact_1 = __importDefault(require("../models/contact"));
const postContact = (data) => {
    return contact_1.default.findOne({ participants: data.participants }).then((contact) => {
        if (!contact)
            return new contact_1.default({
                name: data.name,
                participants: data.participants,
            }).save().catch(err => {
                return {
                    message: `Something went wrong:\n${err}`,
                    status: 500,
                };
            });
        else
            return {
                message: "Contact already exists",
                status: 409,
                contactId: contact._id,
            };
    }).catch(err => {
        return {
            message: `Something went wrong\n${err}`,
            status: 500,
        };
    });
};
exports.postContact = postContact;
const updateContact = (data) => {
    return contact_1.default.findById(data.id).then((contact) => {
        if (contact) {
            if (data.name)
                contact.name = data.name;
            if (data.messages)
                contact.messages = data.messages;
            return contact_1.default.findByIdAndUpdate(data.id, contact).then(() => {
                return {
                    message: "Contact updated successfully",
                    status: 200,
                };
            }).catch(err => new Error(err));
        }
        else
            return {
                message: "Contact not found",
                status: 404,
            };
    }).catch(err => {
        return {
            message: `Something went wrong\n${err}`,
            status: 500,
        };
    });
};
exports.updateContact = updateContact;
const getContact = (contactId) => {
    return contact_1.default.findById(contactId).then((contact) => {
        if (contact)
            return {
                message: "Contact found",
                status: 200,
                contact,
            };
        else
            return {
                message: "Contact not found",
                status: 404,
            };
    }).catch(err => {
        return {
            message: `Something went wrong\n${err}`,
            status: 500,
        };
    });
};
exports.getContact = getContact;
const getAllContacts = (userId) => {
    return contact_1.default.find({ participants: userId }).then((contacts) => {
        if (contacts)
            return {
                message: "Contacts found",
                status: 200,
                contacts,
            };
        else
            return {
                message: "No contacts found",
                status: 404,
            };
    }).catch(err => {
        return {
            message: `Something went wrong\n${err}`,
            status: 500,
        };
    });
};
exports.getAllContacts = getAllContacts;
//# sourceMappingURL=contactsController.js.map