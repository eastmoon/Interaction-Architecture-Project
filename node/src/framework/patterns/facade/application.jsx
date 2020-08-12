/*
    Application, main application system, using singleton-facade pattern.
    use it to retrieve Views, Models, Controllers.

    author: jacky.chen
*/
import Singleton from "framework/patterns/singleton";
import Views from "framework/patterns/facade/views";
import Controllers from "framework/patterns/facade/controllers";
import Models from "framework/patterns/facade/models";

// Singleton class
export default class Application extends Singleton {
    // Static attribute, Class static name.
    static get appName() {
        return "Framework.Facade.Application";
    }

    initial() {
        //console.log("MVC initial");
        super.initial();
        // If re-new class, constructor will duplicate call.
        // This issue have two solution.
        // 1. never use new class to retrieve instance
        // 2. re-new class, and when first time call canstructor, will use install function.
        // declared member variable
        this._views = new Views();
        this._controllers = new Controllers();
        this._models = new Models();
    }

    // Static attribute, retrieve Views object.
    static get views() {
        return Application.instance._views;
    }
    // Static attribute, retrieve controllers object.
    static get controllers() {
        return Application.instance._controllers;
    }
    // Static attribute, retrieve models object.
    static get models() {
        return Application.instance._models;
    }
}
