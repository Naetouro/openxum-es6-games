"use strict";

import * from './color.mjs';
import Cell from './cell.mjs';
import Coordinates from './coordinates.mjs';

function isValid(cell){
    return cell<49 && cell>=0;
}


class Board {
    constructor() {
        this._board=new Array(); //an array of cells
        this._idPawn;
    }

// private methods

    _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
    }

    _createBoard(){ //create the board with position, id and default color -1 (empty)
        let i;
        for(i=0;i<47;i+=1) {
            _board.push(new Cell( new Coordinates(i),-1,i))
        }
    }

    _randomBoard(){ //initialize the board with random color
        let numberColor=new Array(0,0,0,0,0,0,0); // array with the number of iteration of each color
        let i;
        for(i=0;i<47;i+=1){ // for each cell of the board
            let num;
            do {
                num = this._getRandomInt(0, 6);
            }while(numberColor[num]<7) // while the color isnt already 7 times presents
            numberColor[num]+=1;// add 1 to the color iteration number
            _board[i].setColor(num); //change the color of the cell based on the number generated
        }
    }

    _boardOk(){ // check if the board is playable
        return true;
    }

    Moves()

// public methods

    clone(){


    }

    initBoard() { //initialize the board
        do {
            this._createBoard();
            this._randomBoard();
        }while(!this._boardOk());
    }

    getIdAtCoord(c){ // compare the coordinates with coordinates of each cells and return the id of the cell, -1 if not found
        for each (cell in _board) {
            if(Object.is(cell.getCoordinates(),c)){
                return cell.getId();
            }
        }
        return -1;
    }

    getOneMove(color,matrice){
        let coordinates;
        coordinates=new Coordinates(_idPawn.getCoordinates()); //get the coordinates of _idpawn
        let id;
        do{
            coordinates.matrix(matrice);//move to the the next cell
            id = this.getIdAtCoord(c);// get the id of the cell
            if(isColor(_board[id].getColor())) { // if the cell isn't empty and have a valid color
                if(isColor(color) && !Object.is(color,_board[id].getColor())){
                    return -1;
                }else{
                    return id;
                }
            }
        }while(!isValid(idA));// if the cell isn't valid (we are out of the board)
        return -1;
    }

    getMove(color){ //if color is not defined that mean this is the first coup of the player,
        let trMat=((-1,-1,0),(0,-1,-1),(-1,0,-1),(1,1,0),(0,1,1),(1,0,1));
        let tabMove=new Array();
        let coordinate;
        if(isValid(_idPawn)) { // Check if the pawn is already placed
            let idA=-1;
            for each (mat in trMat){
                idA = getOneMove(color, mat);
                if(isValid(idA)){
                    tabMove.push(new Move(_idPawn,idA));
                }
            }
            if(tabMove.length>0){
                return tabMove;
            }
            else{
                let i;
                for(i=0;i<49;i+=1){
                    if(isColor(_board[i])){
                        tabMove.push(new Move(_idPawn,_board[i]); // the pawn can move to all the cells which are playable
                    }
                }
                return tabMove;
            }
        }

        else { //if the pawn isn't placed
            let i;
            for(i=0;i<49;i+=1){
                tabMove.push(new Move(_idPawn,_board[i]); // the pawn can move to all the cells
            }
            return tabMove;
        }
    }



    color() {
        return this._color;
    }

    clone() {
        return new Piece(this._color);
    }

    dvonn() {
        return this._dvonn;
    }
}


export default isValid(cell);
export default Board;