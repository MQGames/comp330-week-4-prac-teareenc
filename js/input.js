"use strict";

/**
 * Input manager.
 * 
 * This class listens for keydown and keyup events to keep track of whether the arrow keys are currently pressed.
 * 
 * Usage:
 * 
 * if (Input.leftPressed) {
 *     // the left arrow is pressed
 * }
 */

class Input {

    static leftPressed = false;
    static rightPressed = false;
    static upPressed = false;
    static downPressed = false;

    static onKeyDown(event) {
        switch (event.key) {
            case "ArrowLeft": 
                Input.leftPressed = true;
                break;

            case "ArrowRight": 
                Input.rightPressed = true;
                break;

            case "ArrowDown":
                Input.downPressed = true;
                break;

            case "ArrowUp":
                Input.upPressed = true;
                break;
        }
    }

    static onKeyUp(event) {
        switch (event.key) {
            case "ArrowLeft": 
                Input.leftPressed = false;
                break;

            case "ArrowRight": 
                Input.rightPressed = false;
                break;

            case "ArrowDown":
                Input.downPressed = false;
                break;

            case "ArrowUp":
                Input.upPressed = false;
                break;
        }
    }
}

// listen for keydown and keyup events

document.addEventListener("keydown", Input.onKeyDown);
document.addEventListener("keyup", Input.onKeyUp);
