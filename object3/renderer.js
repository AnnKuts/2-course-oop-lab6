"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auto_1 = __importDefault(require("chart.js/auto"));
window.api.onData((points) => {
    console.log("POINTS:", points);
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const labels = points.map((p) => p.x);
    const values = points.map((p) => p.y);
    new auto_1.default(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                    label: "y=f(x)",
                    data: values,
                    borderWidth: 2
                }]
        }
    });
});
