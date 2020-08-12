/*
Observer pattern, ref : https://en.wikipedia.org/wiki/Observer_pattern

Observer has two class, Subject, Notification.
Subject will management Notification, and trigger notify.
Notification has handler function, when notify is trigger, it will execute handler function.

author: jacky.chen
*/

import Subject from "./subject";
import Notification from "./notification";

export default class Observer {
    static get Subject() {
        return Subject;
    }

    static get Notification() {
        return Notification;
    }
}
