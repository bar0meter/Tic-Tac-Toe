var board = [0,1,2,3,4,5,6,7,8];
	var hPlayer="H",aPlayer="A",hColor="white",aColor="black",score,round=0;
	$(document).ready(function() {
		$("td").on("click",function() {
			move(this);
			console.log("Humar Player Moved");
		})
	});

	function move(element){
		if(board[element.id] !="H" && board[element.id] != "A"){
			console.log(element.id);
			board[element.id] = hPlayer;
			console.log(board);
			$(element).css("background",hColor);
			round++;
	
			if(winning(board,hPlayer)) {
				setTimeout(function(){
					alert("YOU WIN");
				},500);
				return;
			} else if(round > 8){
				setTimeout(function(){
					alert("TIE");
				},500);
			} else {
				console.log(minimax(board,aPlayer));
				var index = minimax(board,aPlayer).index;
				console.log(minimax(board,aPlayer));
				var selector = "#" + index;
				$(selector).css("background",aColor);
				board[index] = aPlayer;
				console.log(board);
				round++;
				if(winning(board,aPlayer)) {
					setTimeout(function(){
						alert("YOU LOSE");
					},500);
					return;
				}
			}
		}
	}

	function minimax(newboard,player){
		let array = avail(newboard);
		if(winning(newboard,hPlayer)){
			return {
				score:-10
			};
		} else if (winning(newboard,aPlayer)){
			return {
				score:10
			};
		} else if(array.length == 0) {
			return {
				score:0
			};
		}

		var moves = [];
		for(var i=0;i<array.length;i++){
			var move = {};
			move.index = newboard[array[i]];
			newboard[array[i]] = player;

			if(player === hPlayer){
				var x = minimax(newboard,aPlayer);
				move.score = x.score;
			} else {
				var x = minimax(newboard,hPlayer);
				move.score = x.score;
			}
			newboard[array[i]] = move.index;
			moves.push(move);
		}
		// console.log(moves);
		// break;
		var bestMove;
		if(player === hPlayer){
			var bestScore = 100000;
			for(var i=0;i<moves.length;i++){
				if(moves[i].score < bestScore){
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		} else {
			var bestScore = -100000;
			for(var i=0;i<moves.length;i++){
				if(moves[i].score > bestScore){
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		}
		return moves[bestMove];
	}

	function avail(board) {
		return board.filter(s => s != "H" && s != "A");
	}

	function winning(board, player) {
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) {
    return true;
  } else {
    return false;
  }
}
