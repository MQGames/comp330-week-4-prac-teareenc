"use strict";

class Input {
    constructor() {
        this.leftPressed = false;
        this.rightPressed = false;
        this.upPressed = false;
        this.downPress = false;

        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    onKeyDown(event) {
        switch (event.key) {
            case "ArrowLeft": 
                this.leftPressed = true;
                break;

            case "ArrowRight": 
                this.rightPressed = true;
                break;

            case "ArrowDown":
                this.downPressed = true;
                break;

            case "ArrowUp":
                this.upPressed = true;
                break;
        }
    }

    onKeyUp(event) {
        switch (event.key) {
            case "ArrowLeft": 
                this.leftPressed = false;
                break;

            case "ArrowRight": 
                this.rightPressed = false;
                break;

            case "ArrowDown":
                this.downPressed = false;
                break;

            case "ArrowUp":
                this.upPressed = false;
                break;
        }
    }
}

// global inputManager variable

const inputManager = new Input();