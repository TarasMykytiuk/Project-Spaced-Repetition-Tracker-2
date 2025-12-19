import { Controller } from "./controller.js";
import { View } from "./view.js";
import { Model } from "./model.js";
import { DateService } from "./dateService.js";

document.addEventListener("DOMContentLoaded", () => {
    const controller = new Controller(new View(), new Model(), new DateService());
    controller.init();
});