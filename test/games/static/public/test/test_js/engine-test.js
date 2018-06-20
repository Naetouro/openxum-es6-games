QUnit.test( "clone", function( assert ) {
    let engine = new window.OpenXum.Tintas.Engine();
    let e = engine.clone();
    assert.deepEqual( engine, e, "Cloned" );
});

QUnit.test( "get_possible_move_list", function( assert ) {
    let engine = new window.OpenXum.Tintas.Engine();
    let e = engine.get_possible_move_list();
    assert.ok( e, "Passed!" );
});

QUnit.test( "is_finished", function( assert ) {
    let engine = new window.OpenXum.Tintas.Engine();
    assert.notOk( engine.is_finished(), "Not finished" );
    engine._player_1[0]=7;
    assert.ok( engine.is_finished(), "finished" );
});

QUnit.test( "change_player", function( assert ) {
    let engine = new window.OpenXum.Tintas.Engine();
    engine.change_player();
    assert.notEqual( engine._current, window.OpenXum.Tintas.Player.PLAYER_1, "Not player 1" );
    assert.deepEqual( engine._current, window.OpenXum.Tintas.Player.PLAYER_2, "Player 2" );
});

/* TO DO
QUnit.test( "parse", function( assert ) {
    let engine = new window.OpenXum.Tintas.Engine();
    engine._board._random_board();
    let str = [0];
    console.log(str);
    assert.equal( engine.parse(str[0]), window.OpenXum.Tintas.Color.YELLOW, "Player 2" );
});
*/

QUnit.test( "add_points", function( assert ) {
    let engine = new window.OpenXum.Tintas.Engine();
    engine.add_points(window.OpenXum.Tintas.Color.YELLOW);
    assert.deepEqual( engine._player_1[0], 1, "Added" );
});

QUnit.test( "add_points", function( assert ) {
    let engine = new window.OpenXum.Tintas.Engine();
    let engine2 = new window.OpenXum.Tintas.Engine();
    engine._player_1[0]=1;
    engine._player_1[1]=1;
    engine._player_1[2]=1;
    engine._player_1[3]=1;
    engine._player_1[4]=1;
    engine._player_1[5]=1;
    engine._player_1[6]=1;

    engine2._player_1[0]=0;
    engine2._player_1[1]=0;
    engine2._player_1[2]=0;
    engine2._player_1[3]=0;
    engine2._player_1[4]=0;
    engine2._player_1[5]=0;
    engine2._player_1[6]=0;
    console.log(engine.have_empty_stack(window.OpenXum.Tintas.Player.PLAYER_1));

    console.log(engine2.have_empty_stack(window.OpenXum.Tintas.Player.PLAYER_1));

    assert.notOk( engine.have_empty_stack(window.OpenXum.Tintas.Player.PLAYER_1), "Not empty" );
    assert.ok( engine2.have_empty_stack(window.OpenXum.Tintas.Player.PLAYER_1), "Added" );
    assert.ok( 1===1, "Added" );
});

QUnit.test( "player_stack_win", function( assert ) {
    let engine = new window.OpenXum.Tintas.Engine();
    let engine2 = new window.OpenXum.Tintas.Engine();
    let engine3 = new window.OpenXum.Tintas.Engine();
    engine._player_1[0]=4;
    engine._player_1[1]=4;
    engine._player_1[2]=4;
    engine._player_1[3]=4;
    engine._player_1[4]=1;
    engine._player_1[5]=1;
    engine._player_1[6]=1;
    engine._player_1[7]=1;
    engine2._player_2[0]=4;
    engine2._player_2[1]=4;
    engine2._player_2[2]=4;
    engine2._player_2[3]=4;
    engine2._player_2[4]=1;
    engine2._player_2[5]=1;
    engine2._player_2[6]=1;
    engine2._player_2[7]=1;
    engine3._player_2[0]=4;
    engine3._player_2[1]=4;
    engine3._player_2[2]=4;
    engine3._player_2[3]=4;

    assert.ok( engine.player_stack_win(), "Player 1 win" );
    assert.ok( engine2.player_stack_win(), "Player 2 win" );
    assert.notOk( engine3.player_stack_win(), "Nobody win" );
});

QUnit.test( "get_player_stack_win", function( assert ) {
    let engine = new window.OpenXum.Tintas.Engine();
    let engine2 = new window.OpenXum.Tintas.Engine();
    engine._player_1[0]=4;
    engine._player_1[1]=4;
    engine._player_1[2]=4;
    engine._player_1[3]=4;
    engine2._player_2[0]=4;
    engine2._player_2[1]=4;
    engine2._player_2[2]=4;
    engine2._player_2[3]=4;

    assert.deepEqual( engine.get_player_stack_win(), window.OpenXum.Tintas.Player.PLAYER_1, "Player 1 win" );
    assert.deepEqual( engine2.get_player_stack_win(), window.OpenXum.Tintas.Player.PLAYER_2, "Player 2 win" );
});

QUnit.test( "player_full_win", function( assert ) {
    let engine = new window.OpenXum.Tintas.Engine();
    let engine2 = new window.OpenXum.Tintas.Engine();
    let engine3 = new window.OpenXum.Tintas.Engine();
    engine._player_1[0]=7;
    engine2._player_2[0]=7;
    engine3._player_2[0]=6;

    assert.ok( engine.player_full_win(), "Player 1 win" );
    assert.ok( engine2.player_full_win(), "Player 2 win" );
    assert.notOk( engine3.player_full_win(), "Nobody win" );
});

QUnit.test( "get_player_full_win", function( assert ) {
    let engine = new window.OpenXum.Tintas.Engine();
    let engine2 = new window.OpenXum.Tintas.Engine();
    engine._player_1[0]=7;
    engine2._player_2[0]=7;

    assert.deepEqual( engine.get_player_full_win(), window.OpenXum.Tintas.Player.PLAYER_1, "Player 1 win" );
    assert.deepEqual( engine2.get_player_full_win(), window.OpenXum.Tintas.Player.PLAYER_2, "Player 2 win" );
});

QUnit.test( "winner_is", function( assert ) {
    let engine = new window.OpenXum.Tintas.Engine();
    let engine2 = new window.OpenXum.Tintas.Engine();
    engine._player_1[0]=7;
    engine2._player_2[0]=4;
    engine2._player_2[1]=4;
    engine2._player_2[2]=4;
    engine2._player_2[3]=4;

    assert.equal( engine.winner_is(), window.OpenXum.Tintas.Player.PLAYER_1, "Player 1 and 7 pieces of one color" );
    assert.equal( engine2.winner_is(), window.OpenXum.Tintas.Player.PLAYER_2, "Player 2 and 4 pieces of 4 colors" );
});
