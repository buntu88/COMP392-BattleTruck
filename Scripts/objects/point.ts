/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // POINT CLASS ++++++++++++++++++++++++++++++++++++++++++
    //Author’s name:        Vishal Guleria (300813391) & Vinay Bhardwaj (300825097)
    //Date last Modified    March 18,2016
    //Program description   Assignment 3 - Battle Truck : Saving abandoned soldiers.
    //Revision History      v2
    export class Point {
        public x: number;
        public y: number;
        public z: number;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(x: number, y: number, z: number) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }
}
