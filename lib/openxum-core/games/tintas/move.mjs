"use strict";

import Coordinates from './coordinates.mjs';

class Move {
    constructor(idA, idB) {
        this._from= idA; //an array of cells
        this._to = idB;
    }

    clone(){
        console.log("get de move")
        return new Move(this._from,this._to);
    }

    get_to(){
        return this._to;
    }

    get_from(){
        return this._from;
    }

    get(){
        console.log("get de move")
        return this.clone();
    }

}
export default Move;