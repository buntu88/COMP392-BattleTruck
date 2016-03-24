module objects {
    // KeyboardControls Class +++++++++++++++
    //Author’s name:        Vishal Guleria (300813391) & Vinay Bhardwaj (300825097)
    //Date last Modified    March 24,2016
    //Program description   Assignment 3 - Battle Truck : Saving abandoned soldiers.
    //Revision History      v3
    export class KeyboardControls {
        // PUBLIC INSTANCE VARIABLES ++++++++++++
        public moveForward: boolean;
        public moveBackward: boolean;
        public moveLeft: boolean;
        public moveRight: boolean;
        public jump: boolean;
        public enabled: boolean;
        // CONSTRUCTOR ++++++++++++++++++++++++++    
        constructor() {
            this.enabled = false;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        }

        // PUBLIC METHODS

        public onKeyDown(event: KeyboardEvent): void {
            switch (event.keyCode) {
                case 38: /*up arrow*/
                case 87: /* W Key */
                    this.moveForward = true;
                    break;
                case 37: /*left arrow*/
                case 65: /* A Key */
                    this.moveLeft = true;
                    break;
                case 40: /*down arrow*/
                case 83: /* S Key */
                    this.moveBackward = true;
                    break;
                case 39: /*right arrow*/
                case 68: /* D Key */
                    this.moveRight = true;
                    break;
                case 32: /* Spacebar */
                    this.jump = true;
                    break;
            }
        }

        public onKeyUp(event: KeyboardEvent): void {
            switch (event.keyCode) {
                case 38: /*up arrow*/
                case 87: /* W Key */
                    this.moveForward = false;
                    break;
                case 37: /*left arrow*/
                case 65: /* A Key */
                    this.moveLeft = false;
                    break;
                case 40: /*down arrow*/
                case 83: /* S Key */
                    this.moveBackward = false;
                    break;
                case 39: /*right arrow*/
                case 68: /* D Key */
                    this.moveRight = false;
                    break;
                case 32: /* Spacebar */
                    this.jump = false;
                    break;
            }
        }
    }
}