"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventHandler_1 = require("modloader64_api/EventHandler");
const CoreInjection_1 = require("modloader64_api/CoreInjection");
const Color3_1 = require("./Color3");
const GAUNTADDR = 0xf7ae4;
let colorTargets = [
    new Color3_1.Color3(255, 0, 255),
    new Color3_1.Color3(255, 0, 0),
    new Color3_1.Color3(255, 255, 0),
    new Color3_1.Color3(0, 255, 0),
    new Color3_1.Color3(0, 255, 255),
    new Color3_1.Color3(0, 0, 255),
    new Color3_1.Color3(255, 0, 255)
];
let currentTarget = 0;
let currentColor = new Color3_1.Color3();
let velocity = 15;
class RainbowGauntlets {
    constructor() {
        this.ModLoader = {};
        this.name = 'RainbowGauntlets';
    }
    preinit() { }
    init() { }
    postinit() { }
    onTick() {
        let SilverOffset = GAUNTADDR + (0 * 3);
        let GoldOffset = GAUNTADDR + (1 * 3);
        var rScalar = colorTargets[currentTarget].r == 255 ? 1 : -1;
        var gScalar = colorTargets[currentTarget].g == 255 ? 1 : -1;
        var bScalar = colorTargets[currentTarget].b == 255 ? 1 : -1;
        currentColor.r = currentColor.r + (velocity * rScalar);
        currentColor.g = currentColor.g + (velocity * gScalar);
        currentColor.b = currentColor.b + (velocity * bScalar);
        currentColor = currentColor.clamped();
        if (currentColor.r == colorTargets[currentTarget].r
            && currentColor.g == colorTargets[currentTarget].g
            && currentColor.b == colorTargets[currentTarget].b)
            currentTarget = (currentTarget + 1) % (colorTargets.length - 1);
        this.ModLoader.emulator.rdramWriteBuffer(SilverOffset, Buffer.from([currentColor.r, currentColor.g, currentColor.b]));
        this.ModLoader.emulator.rdramWriteBuffer(GoldOffset, Buffer.from([currentColor.r, currentColor.g, currentColor.b]));
    }
    onClient_InjectFinished(evt) { }
}
__decorate([
    CoreInjection_1.InjectCore()
], RainbowGauntlets.prototype, "core", void 0);
__decorate([
    EventHandler_1.EventHandler(EventHandler_1.EventsClient.ON_INJECT_FINISHED)
], RainbowGauntlets.prototype, "onClient_InjectFinished", null);
exports.RainbowGauntlets = RainbowGauntlets;
//# sourceMappingURL=Main.js.map