/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // POINT CLASS ++++++++++++++++++++++++++++++++++++++++++
    //Author’s name:        Vishal Guleria (300813391) & Vinay Bhardwaj (300825097)
    //Date last Modified    March 18,2016
    //Program description   Assignment 3 - Battle Truck : Saving abandoned soldiers.
    //Revision History      v2
    var Point = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Point(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        return Point;
    }());
    objects.Point = Point;
})(objects || (objects = {}));

//# sourceMappingURL=point.js.map
