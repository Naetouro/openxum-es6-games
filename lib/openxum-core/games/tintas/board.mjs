"use strict";

import Color from './color.mjs';
import {convert_to_hexa,is_color} from './color.mjs';
import Coordinates from './coordinates.mjs';
import Cell from './cell.mjs';

import Move from './move.mjs';

function is_valid(cell){ // final version
    return cell<49 && cell>=0;
}

function get_random_int(min, max) { // final version
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const tr_mat=[[-1,-1,0],[0,-1,-1],[1,0,-1],[1,1,0],[0,1,1],[-1,0,1]];

class Board {
    constructor() {
        this._board = new Array(); //an array of cells
        this._id_pawn = 49;
        this._flag =[];
        this._init_flag();

    }


/////////////////////
// private methods //
/////////////////////

    _random_board(){ //final version
        let number_color=new Array(0,0,0,0,0,0,0); // array with the number of iteration of each color
        for(let i=0;i<49;i+=1){ // for each cell of the board
            let num;
            let bool=false;
            do {
                num =get_random_int(0, 6);
                if(number_color[num]<7){ // add 1 to the color iteration number
                    number_color[num]+=1;
                    bool=true;
                }
            }while(!bool);// while the color isnt already 7 times presents
            this._board.push(new Cell( new Coordinates(i),num,i)); //change the color of the cell based on the number generated
        }
    }

    _board_ok(){ // TO DO
        for(let i=0;i<49;i+=1){
            if(!this._flag[i]) {
                let flag = this._flag_count();
                this._too_much_friend(i);
                let new_count_flag= this._flag_count();
                if(new_count_flag-flag>6){
                    this._init_flag();
                    return false;
                }
                this.marque(this.get_cell_by_id(i).get_color(),i);
            }
        }
        this._id_pawn = 49;
        return true;
    }

    marque(color,j){
        for(let i=j+1;i<49;i+=1){
            if(!this._flag[i]) {
                if (this.get_cell_by_id(i).get_color() === color) {
                    this._flag[i] = 1;
                }
            }
        }
    }

    _too_much_friend(i){
        if(this._flag[i]){
            return;
        }
        this._flag[i]=1;
        let color=this._board[i].get_color();
        for(let r=0;r<6;r+=1) {
            this._id_pawn=i;
            let id=this._get_one_move(color, tr_mat[r]);
            if(is_valid(id) && !this._flag[id]){
                this._too_much_friend(id);
            }

        }

    }

    _init_flag(){
        for(let g=0;g<49;g+=1){
            this._flag[g]=0;
        }
    }
    _flag_count(){
        let new_count_flag;
        for(let v = 0; v < 49; v += 1){
            if (this._flag[v]) {
                new_count_flag += 1;
            }
        }
        return new_count_flag;
    }
// public methods

    clone(){
        let a=new Board();
        for(let i=0;i<49;i+=1){
            a._board[i]=this._board[i].clone();
        }
        a._id_pawn=this._id_pawn;
        return a;
    }

    get_cell_by_id(id){ //final version
        return this._board[id];
    }

    //final version
    init_board() { //initialize the board
        do {
            this._random_board();
        }while(!this._board_ok());
    }



    //final version
    get_id_at_coord(c){ // compare the coordinates with coordinates of each cells and return the id of the cell, -1 if not found
        for(let id=0;id<49;id+=1) {
            let comp=this._board[id].get_coordinates();
            //console.log("identifiant teste : ",id);
            //console.log(comp,c);
            if(comp.get_pos_x()===c.get_pos_x() && comp.get_pos_y()===c.get_pos_y() && comp.get_pos_z()===c.get_pos_z()){
                return id;
            }
        }
        return -1;
    }

    // final version
    get_cell_by_coord(c){ // compare the coordinates with coordinates of each cells and return the id of the cell, -1 if not found
        console.log("c : "+c);
        let coord_cell = this.get_id_at_coord(c);
        console.log("coord_cell : "+coord_cell);
        if(c.is_valid()) {
            return this._board[coord_cell];
        }
        return -1;
    }

    // final version
    _get_one_move(color,matrice){ // final version
        let coordinates;
        coordinates=new Coordinates(this._id_pawn); //get the coordinates of _idpawn
        let id=this._id_pawn;
        do{
            coordinates.matrix(matrice);//move to the the next cell
            id = this.get_id_at_coord(coordinates);// get the id of the cell
            if(!is_valid(id)){
                return -1;
            }
            if(is_color(this._board[id]. get_color())) { // if the cell isn't empty and have a valid color
                if(is_color(color) && !Object.is(color,this._board[id].get_color())){
                    return -1;
                }else{
                    return id;
                }
            }
        }while(is_valid(id));// if the cell isn't valid (we are out of the board)
        return -1;
    }


    //if we can't play in any direction
    _get_move_spe(){ //ok
        let i;
        let tab_move=[];
        for(i=0;i<49;i+=1){
            if(is_color(this._board[i].get_color())){
                tab_move.push(new Move(this._id_pawn,i)); // the pawn can move to all the cells which are playable
            }
        }
        return tab_move;
    }





    // final version
    get_move(color){ //if color is not defined that means this is the first coup of the player,

        if(this._id_pawn===49){
            return this._get_move_spe(); //ok
        }
        let tab_move=[];
        let id=-1;
        for (let j=0;j<tr_mat.length;j=j+1){
            id = this._get_one_move(color, tr_mat[j]);
            if(is_valid(id)){
                tab_move.push(new Move(this._id_pawn,id));
            }
        }

        if(tab_move.length>0){ // if we can play
            if(is_color(color)){
                tab_move.push(new Move(this._id_pawn,50));
            }
            return tab_move;
        }

        else if(is_color(color)){ // player already played one move
            tab_move.push(new Move(-1,-1));
            return tab_move;
        }
        else{
            return this._get_move_spe();
        }
    }

    //final version
    apply_move(move){ // Apply the move to the board
        if(!is_valid(move.get_to())){
            return 7;
        }
        let color=this._board[move.get_to()].get_color();
        if(is_valid(this._id_pawn)) {
            this._board[this._id_pawn].set_color(7);
        }
        this._board[move.get_to()].set_color(8);
        this._id_pawn=move.get_to();
        return color;
    }

    undo_move(color,move){
        if(is_valid(this._id_pawn)) {
            this._board[this._id_pawn].set_color(7);
        }
        this._board[move.get_to()].set_color(8);
    }

    get_id_pawn(){
        return this._id_pawn;
    }


    ///////////////////
    // TEST FUNCTION //
    ///////////////////


    init_board_test1(){ // final version
        this._random_board();
        this._id_pawn=16;
        this._board[2].set_color(7);
        this._board[6].set_color(7);
        this._board[8].set_color(7);
        this._board[9].set_color(7);
        this._board[11].set_color(4);
        this._board[12].set_color(7);
        this._board[16].set_color(8);
        this._board[19].set_color(1);
        this._board[20].set_color(7);
        this._board[24].set_color(7);
        this._board[25].set_color(7);
        this._board[30].set_color(2);
        this._board[32].set_color(7);
        this._board[40].set_color(7);
        this._board[46].set_color(7);
    }
/*
    get_one_move_test(color,matrice){ // final version
        let coordinates;
        console.log("on parcours une direction possible");
        coordinates=new Coordinates(this._id_pawn); //get the coordinates of _idpawn
        console.log("coordonnee du pion",coordinates);
        let id=this._id_pawn;
        do{
            console.log("COORDONNEES DU POINTS COURANT AVANT TRANSITION");
            console.log(coordinates);
            coordinates.matrix(matrice);//move to the the next cell
            console.log("COORDONNEES DU POINTS COURANT APRES TRANSITION");
            console.log(coordinates);
            id = this.get_id_at_coord(coordinates);// get the id of the cell
            if(!is_valid(id)){
                return -1;
            }
            console.log("ok",id);
            console.log(this._board[id]. get_color());
            if(is_color(this._board[id]. get_color())) { // if the cell isn't empty and have a valid color
                console.log("Identifiant de la celulle visite :",id, " couleur de la cellule visite :",this._board[id].get_color());
                console.log("couleur du coup précédent :",color);
                if(is_color(color) && !Object.is(color,this._board[id].get_color())){
                    return -1;
                }else{
                    return id;
                }
            }
            console.log("Identifiant de la celulle visite :",id, " couleur de la cellule visite :",this._board[id].get_color());
        }while(is_valid(id));// if the cell isn't valid (we are out of the board)
        return -1;
    }

    get_move_test(color){ // final version
        console.log("couleur du coup précédent :",color);
        console.log(this._id_pawn);
        const tr_mat=[[-1,-1,0],[0,-1,-1],[1,0,-1],[1,1,0],[0,1,1],[-1,0,1]];
        let tab_move=[];
        if(is_valid(this._id_pawn)) { // Check if the pawn is already placed
            console.log("le pion est sur le plateau on cherche les coups possibles",this._id_pawn);
            let id=-1;
            for (let j=0;j<tr_mat.length;j=j+1){
                console.log("appel a la fonction de recuperation d'un coup possible dans une direction");
                id = this.get_one_move_test(color, tr_mat[j]);
                console.log("un des coups possibles :",id);
                if(is_valid(id)){
                    tab_move.push(new Move(this._id_pawn,id));
                }
            }
            if(tab_move.length>0){ // if we can play
                if(is_color(color)){
                    tab_move.push(new Move(this._id_pawn,50));
                }
                console.log(tab_move);
                return tab_move;
            }
            else if(is_color(color)){
                console.log(tab_move);
                return tab_move;
            }
            else{ // if there is no move available in each direction
                for(let i=0;i<49;i+=1){
                    if(is_color(this._board[i].get_color())){
                        tab_move.push(new Move(this._id_pawn,i)); // the pawn can move to all the cells which are playable
                    }
                }
                console.log(tab_move);
                return tab_move;
            }
        }
        else { //if the pawn isn't placed
            let i;
            for(i=0;i<49;i+=1){
                tab_move.push(new Move(this._id_pawn,i)); // the pawn can move to all the cells
            }
            console.log(tab_move);
            return tab_move;
        }
    }

    apply_move_test(Move){ // Apply the move to the board
        if(is_valid(this._id_pawn)) {
            this._board[this._id_pawn].set_color(7);
        }
        this._board[Move.get_to()].set_color(8);
        console.log(this._board);
    }

    test_move_1(){
        this.apply_move_test(new Move(this._id_pawn,11));
        console.log("cellule de depart ",this._board[this._id_pawn],"cellule d'arrive ",this._board[11]);
    }

    test1(){
        this.init_board_test1();
        this.test_move_1();
    }

    test2(){
        this.init_board_test2();
    }

    test3(){
        this.init_board_test3();
    }

    test4(){
        this.init_board_test4();
    }

    test5(){
        this.init_board_test5();
    }

    init_board_test2(){ // test 2
        this.init_board();

        this._id_pawn=29;

        this._board[12].set_color(7);
        this._board[15].set_color(7);
        this._board[19].set_color(7);
        this._board[20].set_color(7);
        this._board[24].set_color(7);
        this._board[25].set_color(7);
        this._board[32].set_color(7);
        this._board[33].set_color(7);
        this._board[38].set_color(7);

        this._board[5].set_color(0);
        this._board[10].set_color(2);
        this._board[21].set_color(3);
        this._board[37].set_color(3);
        this._board[36].set_color(6);

        this._board[29].set_color(8);

        let tab1=this.get_move(7); // 10 36 37 21 05
        let tab2=this.get_move(3); // 37 21 50
        let tab3=this.get_move(5); // vide

        console.log("tab 1 attendu : 10 36 37 21 05")
        console.log(tab1);
        console.log("tab 2 attendu : 37 21 50")
        console.log(tab2);
        console.log("tab 3 attendu : vide")
        console.log(tab3);

    }

    init_board_test3(){ // test 2
        this.init_board();
        this._id_pawn=45;

        this._board[39].set_color(7);
        this._board[40].set_color(7);
        this._board[43].set_color(7);

        this._board[37].set_color(1);
        this._board[42].set_color(2);
        this._board[31].set_color(3);

        this._board[45].set_color(8);

        let tab1=this.get_move(7); // 42 37 31
        let tab2=this.get_move(2); // 42 50
        let tab3=this.get_move(4); // vide


        console.log("tab 1 attendu : 42 37 31")
        console.log(tab1);
        console.log("tab 2 attendu : 42 50")
        console.log(tab2);
        console.log("tab 3 attendu : vide")
        console.log(tab3);
    }

    init_board_test4(){ // test 4
        this.init_board();
        this._id_pawn = 23;

        this._board[7].set_color(7);
        this._board[15].set_color(7);
        this._board[31].set_color(7);
        this._board[39].set_color(7);
        this._board[18].set_color(7);
        this._board[28].set_color(7);
        this._board[32].set_color(7);
        this._board[37].set_color(7);
        this._board[19].set_color(7);
        this._board[16].set_color(7);
        this._board[12].set_color(7);
        this._board[9].set_color(7);

        this._board[1].set_color(1);
        this._board[6].set_color(2);
        this._board[27].set_color(3);
        this._board[45].set_color(1);
        this._board[41].set_color(2);
        this._board[14].set_color(3);

        this._board[23].set_color(8);

        let tab1=this.get_move(7); // 14 27 45 41 06 01
        let tab2=this.get_move(3); // 14 27 50
        let tab3=this.get_move(6); // vide


        console.log("tab 1 attendu : 14 27 45 41 06 01")
        console.log(tab1);
        console.log("tab 2 attendu : 14 27 50")
        console.log(tab2);
        console.log("tab 3 attendu : vide")
        console.log(tab3);
    }

    init_board_test5(){ // test 5
        this.init_board();
        this._id_pawn = 23;

        this._board[1].set_color(7);
        this._board[3].set_color(7);
        this._board[6].set_color(7);
        this._board[7].set_color(7);
        this._board[8].set_color(7);
        this._board[9].set_color(7);
        this._board[12].set_color(7);
        this._board[14].set_color(7);
        this._board[15].set_color(7);
        this._board[16].set_color(7);
        this._board[18].set_color(7);
        this._board[19].set_color(7);
        this._board[20].set_color(7);
        this._board[21].set_color(7);
        this._board[27].set_color(7);
        this._board[28].set_color(7);
        this._board[29].set_color(7);
        this._board[30].set_color(7);
        this._board[31].set_color(7);
        this._board[32].set_color(7);
        this._board[37].set_color(7);
        this._board[39].set_color(7);
        this._board[40].set_color(7);
        this._board[41].set_color(7);
        this._board[45].set_color(7);
        this._board[46].set_color(7);
        this._board[47].set_color(7);

        this._board[23].set_color(8);

        let tab1=this.get_move(7); // 00 02 04 05 10 11 13 17 22 24 25 26 33 34 35 36 38 42 43 44 48
        let tab2=this.get_move(5); // vide

        console.log("tab 1 attendu : 00 02 04 05 10 11 13 17 22 24 25 26 33 34 35 36 38 42 43 44 48")
        console.log(tab1);
        console.log("tab 2 attendu : vide")
        console.log(tab2);
    }
    */
}

export default Board;