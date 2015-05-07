angular.module( 'game', []).factory( 'TFactory', function(){
    return function(){
        /** game layout **/
        var board = [{player : ''}, { player : ''}, { player : ''},
                    { player : ''}, { player : ''}, { player : ''},
                    { player : ''}, { player : ''}, { player : ''}];

        /** winning sets **/
        var win_board = [[{position : 2, player : ''}, {position : 5, player : ''}, {position : 8, player : ''}],
                        [{position : 0, player : ''}, {position : 3, player : ''}, {position : 6, player : ''}],
                        [{position : 3, player : ''}, {position : 4, player : ''}, {position : 5, player : ''}],
                        [{position : 1, player : ''}, {position : 4, player : ''}, {position : 7, player : ''}],
                        [{position : 6, player : ''}, {position : 7, player : ''}, {position : 8, player : ''}],
                        [{position : 0, player : ''}, {position : 1, player : ''}, {position : 2, player : ''}],
                        [{position : 0, player : ''}, {position : 4, player : ''}, {position : 8, player : ''}],
                        [{position : 6, player : ''}, {position : 4, player : ''}, {position : 2, player : ''}]];


        /** completed/valid set **/
        var completed = [];
        var valid = [];

        /** variables **/
        var winner = "";
        var player  = '';
        var action = '';

        /** X/O win count **/
        var X_win = 0;
        var O_win = 0;

        /** timer **/
        var begin = 0;
        var end = 0;


        var x_check = true;


        function simulation(callBack){
            set_XO(function(){ 
                gen_board(function(){
                    end = end + ((new Date().getTime()) - begin);
                    draw(function(){
                        callBack()
                    });
                });
            });
        };

        function win_check(){
            if(X_win == 0 && O_win == 0){
                $("button").prop("disabled", true);
                if((".time").length){
                    $(".time").fadeOut('slow', function(){
                        $(".time").remove();
                        if((".position").length){   
                            $(".position").fadeOut('slow', function(){
                                $(".position").remove(); 
                            });
                        }
                    });
                }
            }
            if(X_win == 1 || O_win == 1){
                $("button").prop("disabled", false);
                time_stamp();
            }
            else{   
                begin = new Date().getTime();
                simulation(function(){
                    win_check();
                });
            }
        }
        
        function winningMove(callBack){
            var winnables = [];
            for( var i = 0; i < win_board.length; i++){
                var winnable = [];
                var playerFilled = 0;
                for( var j = 0; j < win_board[i].length; j++){
                    if( win_board[i][j].player == player || win_board[i][j].player == ''){
                        if( win_board[i][j].player == player)               playerFilled++; 
                        winnable.push( win_board[i][j].position);    
                    }
                } 
                if(playerFilled == 2 && winnable.length == 3)               winnables.push( winnable);     
            }
            if(winnables.length){
                var randomWinnable = winnables[Math.floor(Math.random() * winnables.length)]
                for(var i = 0; i < randomWinnable.length; i++){
                    if(valid.indexOf(randomWinnable[i]) >= 0)
                        callBack( randomWinnable[i] + 1);
                } 
            }
            else{
                callBack(0); 
            }
        };
        


        function time_stamp(){
            $("<div class=\"time btn-align\">" + "<h2>Time " + end + " secs." + "</div>").hide().appendTo( ".ftr").fadeIn( 'slow');
        }

        
        function set_random(index, callBack){
            for(var i = 0; i < win_board.length; i++){
                for(var j = 0; j < win_board[i].length; j++){
                    if(win_board[i][j].position == (index == -1? valid[0]: valid[index]))
                        win_board[i][j].player = player;
                } 
            }
            callBack();
        };

        function set_prog(callBack){
            var fillables = [];
            for(var i = 0; i < win_board.length; i++){
                var fillable = [];
                var playerFilled = 0;

                for(var j = 0; j < win_board[ i].length; j++){
                    if(win_board[i][j].player == player || win_board[i][j].player == ''){
                        if(win_board[i][j].player == player)              playerFilled++;
                        fillable.push(win_board[i][j].position);    
                    }
                } 
                if(playerFilled == 1 && fillable.length == 3)
                    fillables.push(fillable);     
            }
            if( fillables.length){
                var randomFillable = fillables[Math.floor(Math.random() * fillables.length)]
                for(var i = 0; i < randomFillable.length; i++){
                    if(valid.indexOf(randomFillable[i]) >= 0)
                        callBack(randomFillable[i]+1);
                } 
            }
            else
                callBack(0); 
        };
        
        function draw(callBack){
            $("<div class=\"phase\">" + 
                    "<table>" +
                        "<tr>" +
                            "<td class=\"largetable\">" + board[ 0].player + "</td>" +
                            "<td class=\"largetable\">" + board[ 1].player + "</td>" +
                            "<td class=\"largetable\">" + board[ 2].player + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td class=\"largetable\">" + board[ 3].player + "</td>" +
                            "<td class=\"largetable\">" + board[ 4].player + "</td>" +
                            "<td class=\"largetable\">" + board[ 5].player + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td class=\"largetable\">" + board[ 6].player + "</td>" +
                            "<td class=\"largetable\">" + board[ 7].player + "</td>" +
                            "<td class=\"largetable\">" + board[ 8].player + "</td>" +
                        "</tr>" +
                    "</table>" +
                "</div>"
            ).hide().appendTo(".large-tablet").fadeIn('slow', function(){
                $(".phase").fadeOut('slow', function(){
                    $( "<div class=\"position\">" +
                            "<table>" +
                                "<tr>" +
                                    "<td class=\"smalltable\">" + board[ 0].player + "</td>" +
                                    "<td class=\"smalltable\">" + board[ 1].player + "</td>" +
                                    "<td class=\"smalltable\">" + board[ 2].player + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td class=\"smalltable\">" + board[ 3].player + "</td>" +
                                    "<td class=\"smalltable\">" + board[ 4].player + "</td>" +
                                    "<td class=\"smalltable\">" + board[ 5].player + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td class=\"smalltable\">" + board[ 6].player + "</td>" +
                                    "<td class=\"smalltable\">" + board[ 7].player + "</td>" +
                                    "<td class=\"smalltable\">" + board[ 8].player + "</td>" +
                                "</tr>" +
                            "</table>" +
                            "<h4>" + winner + "</h4>" +
                        "</div>"
                    ).hide().appendTo(".small-tablet").fadeIn('fast', function(){
                        $(".phase").remove();
                        callBack();
                    });
                });
            });
        }; 


        function set_XO(callBack){
            x_check = Math.floor((Math.random() * 2))? true: false;
            winner = "DRAW";   
           
            board = [{player : ''}, { player : ''}, { player : ''},
                    {player : ''}, { player : ''}, { player : ''},
                    {player : ''}, { player : ''}, { player : ''}];

            win_board = [[{position : 0, player : ''}, { position : 3, player : ''}, { position : 6, player : ''}],
                        [{position : 1, player : ''}, { position : 4, player : ''}, { position : 7, player : ''}],
                        [{position : 2, player : ''}, { position : 5, player : ''}, { position : 8, player : ''}],
                        [{position : 0, player : ''}, { position : 1, player : ''}, { position : 2, player : ''}],
                        [{position : 3, player : ''}, { position : 4, player : ''}, { position : 5, player : ''}],
                        [{position : 6, player : ''}, { position : 7, player : ''}, { position : 8, player : ''}],
                        [{position : 0, player : ''}, { position : 4, player : ''}, { position : 8, player : ''}],
                        [{position : 6, player : ''}, { position : 4, player : ''}, { position : 2, player : ''}]];
            completed = [];
            valid = [];  
            gen_moves(function(){
                callBack();
            });
        }


        function gen_moves(callBack){
            var array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            var randomArray = Math.floor((Math.random() * 72));
            var shift = randomArray % 8;
            for(var i = 0; i < (Math.ceil(randomArray / 8) - 1); i++){
                array.push(array[0]);
                array.shift();
            }
            
            if(shift){
                array.splice(shift + 1, 0, array[0]);
                array.shift();
            }
            else{
                array.push(array[0]);
                array.shift();
            }
            valid = array;
            callBack();
        };

        function gen_board(callBack){
            playerMove(false, function(){
                callBack();
            });
        };

        function playerMove(finished, callBack){
            if(!finished){
                player = completed.length % 2? 'O': 'X';
                action = (completed.length % 2 && x_check) || (!completed.length % 2 && !x_check)? 'BAD': 'GOOD';
            }

            if(finished == true){
                if(completed.length != 9){
                    if(player == 'X')                  X_win++;
                    else                                O_win++;
                }
                callBack();
            }
            else if(action == 'BAD' && ( Math.floor( Math.random() * 2))){
                enemey_win(function(blck){
                    if(blck){
                        board[blck-1].player = player;
                        completed.push(blck - 1);
                        set_random(valid.indexOf(blck - 1), function(){
                            valid.splice( valid.indexOf(blck - 1), 1);
                            if(valid.length)
                                playerMove(false, callBack);
                            else
                                playerMove(true, callBack);
                        });
                    }
                    else{
                        board[valid[0]].player = player;
                        completed.push(valid[0]);
                        set_random(-1, function(){
                            valid.shift();
                            if(valid.length)
                                playerMove(false, callBack);
                            else
                                playerMove(true, callBack);
                        });
                    }
                });
            }
            else{
                winningMove(function(win){   
                    if(win){
                        board[win - 1].player = player;
                        winner = player + " WINS";
                        valid = [];
                        playerMove(true, callBack);
                    }
                    else{
                        enemey_win(function(blck){
                            if(blck){
                                board[blck - 1].player = player;
                                completed.push(blck - 1);
                                set_random(valid.indexOf(blck - 1), function(){
                                    valid.splice(valid.indexOf(blck - 1), 1);
                                    if(valid.length)                     playerMove(false, callBack);
                                    else                                 playerMove(true, callBack);
                                });
                            }
                            else{
                                set_prog(function(space){
                                    if(space){
                                        board[space - 1].player = player;
                                        completed.push(space - 1);
                                        set_random(valid.indexOf(space - 1), function()
                                        {
                                            valid.splice(valid.indexOf(space - 1), 1);
                                            if(valid.length)                playerMove(false, callBack);
                                            else                            playerMove(true, callBack);
                                        });
                                    }
                                    else{
                                        board[valid[0]].player = player;
                                        completed.push(valid[0]);
                                        set_random(-1, function(){
                                            valid.shift();
                                            if(valid.length)                playerMove(false, callBack);
                                            else                            playerMove(true, callBack);
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        };

     
        
        function enemey_win(callBack){
            var winnables = [];
            var opponent = '';
            if(player == 'X')           opponent = 'O';
            else                        opponent = 'X';
            for(var i = 0; i < win_board.length; i++){
                var winnable = [];
                var opponentFilled = 0;
                for(var j = 0; j < win_board[ i].length; j++){
                    if(win_board[i][j].player == opponent || win_board[i][j].player == ''){
                        if(win_board[i][j].player == opponent)              opponentFilled++; 

                        winnable.push(win_board[i][j].position);    
                    }
                } 
                if(opponentFilled == 2 && winnable.length == 3)
                    winnables.push(winnable);     
            }
            if(winnables.length){ 
                var randomWinnable = winnables[Math.floor(Math.random() * winnables.length)]
                for(var i = 0; i < randomWinnable.length; i++){
                    if(valid.indexOf( randomWinnable[i]) >= 0)
                        callBack(randomWinnable[i] + 1);
                } 
            }
            else
                callBack(0); 
        };
        
        
        
        win_check();
    }
});
