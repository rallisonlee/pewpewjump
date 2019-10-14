$(document).ready(function() {

	let hardMode = false;
	let enemyNo = 0;

	$('#start')[0].addEventListener("click", function() {

		  // $("#gameModal").modal('show');
		gameStart();
		$('#startScreen')[0].remove();
	})

	$("#playAgain")[0].addEventListener("click", function() {
		gameStart();
	})




function gameStart() {

	let controller, player, loop, endOfGame = false;
	let score = 0;
	let height = $('#pewpew').height();
	let width = $('#pewpew').width();

		let noOfEnemies = 6;
		let enemyCtr = 0;
		let monsterNo = 1;

		$(".monsters").each(function(){
			$(this).remove();
			})
		$(".enemies").each(function(){
			$(this).remove();
			})
		$("#bullet").remove();


	
	
		player = {
			height:13,
		  	jumping:true,
		  	width:11	,
		  	x:40, // center of the canvas in percent
		  	x_speed:0,
		  	y:82,
		  	y_speed:0,
		  	firing: false,
		  	facing : 'R'
		}
	
		let bullet = {
			obj: null, /*this will point to div#bullet*/
			x : 0,
			y : 0, 
			width: null,
			height: null
		}

		$('audio#pewpewjump-theme')[0].currentTime = 0;
		$('audio#pewpewjump-theme')[0].play();
		$("#score").css('display', 'inline-block');
		$('#playerSprite').css('display', "inline-block");
	
		controller = {
			left:false,
		  	right:false,
		  	up:false,
	
	
			keyListener : function(whatEvent){
	
	
					let keyPressed = (whatEvent.type == "keydown") ? true : false;
	
					switch(whatEvent.keyCode) {
						case 37: // this is left key
							controller.left = keyPressed;
							break;
						case 38: // up key
							controller.up = keyPressed;
							break;
						case 39: // right key
							controller.right = keyPressed;
							break;
						case 32: // space key
							controller.fire = keyPressed;
					}
	
			}
		};
	
		let $playerSprite = $('#playerSprite');
		
	
		// draws enemies

		function drawEnemies() {
			noOfEnemies = 6;
				let enemyXPos = 2;
		
		
					while (noOfEnemies > 0) {
						enemyNo++;
						enemyCtr++;
						noOfEnemies--;
						$('<div class="enemies" id="enemy' + enemyNo  + '"></div>').insertAfter('#stars');
						$enemy = $('#enemy' + enemyNo);
						$enemy.data("x", enemyXPos);
						$enemy.data("y", 0);
						$enemy.css('left', enemyXPos + '%');
						enemyXPos += 15;
					}
				}

		// call once to DRAW ENEMIES THE FIRST TIME

		drawEnemies();
	
	
	
		function animateEnemies($enemies) {
			// sets x for each enemy. $('.enemy') is passed onto $enemies param.
			$enemies.each(function(){
	
				StartXPosition = $(this).data("x");
				StartYPosition = $(this).data("y");
				$enemy = $(this);
	
				if ($enemy.data("Xdirection") == "R" || $enemy.data("Xdirection") == null) { 
					StartXPosition+=0.5;
					$(this).data("x", StartXPosition);
					};
		             if ($enemy.data("Xdirection") == "L") { StartXPosition-=0.5;
		             	$(this).data("x", StartXPosition);
		             };
		        
		        // draws enemy
				$enemy.css('left', StartXPosition + '%');
				$enemy.css('top', StartYPosition + '%');
	
				// change direction when off window
	
				if (StartXPosition >= 84){
					$enemy.data("Xdirection", "L");
					$enemy.data("y", StartYPosition + 8);
					$enemy.css('transform', "scaleX(-1");
	
				}
	
				else if (StartXPosition < 0) {
					$enemy.data("Xdirection", "R");
					$enemy.data("y", StartYPosition + 8);
					$enemy.css('transform', "none");
				}
	
				if (StartYPosition > 95) {
					endOfGame = true;
					$("#gameOverModal").modal('show');
				}
	
	
	
	
	
	
			}) /* end of enemies.each function */
	
		}
	
	
		function animateMonsters($monsters) {
			// sets x for each enemy. $('.enemy') is passed onto $enemies param.
			$monsters.each(function(){
	
				StartXPosition = $(this).data("x");
				StartYPosition = $(this).data("y");
				$monster = $(this);
	
				// if ($enemy.data("Xdirection") == "R" || $enemy.data("Xdirection") == null) { 
				// 	StartXPosition+=0.5;
				// 	$(this).data("x", StartXPosition);
				// 	};
	
		        StartXPosition-=0.4;
		        $(this).data("x", StartXPosition);
	
		        
		        // draws enemy
				$monster.css('left', StartXPosition + '%');
				$monster.css('top', StartYPosition + '%');
	
				// change direction when off window
	
				// if (StartXPosition >= 84){
				// 	$enemy.data("Xdirection", "L");
				// 	$enemy.data("y", StartYPosition + 8);
	
				// }
	
				// remove if hitting left wall
				if (StartXPosition < 0) {
					$monster.remove();
					monsterNo--;
				}
	
				// if (StartYPosition > 95) {
				// 	endOfGame = true;
				// 	alert("END OF GAME");
				// }
	
	
	
	
	
	
			}) /* end of enemies.each function */
	
		}
	
	
	
	
	
	
		function collisionCheck(rect1, rect2, collisionDetected) {
		    if (rect1.x + 6 < rect2.data("x") + rect2.data("width") &&
		      rect1.x - 1 + rect1.width > rect2.data("x") &&
		      rect1.y + 3 < rect2.data("y") + rect2.data("height") &&
		      rect1.height + rect1.y > rect2.data("y")) {
		        collisionDetected();
		    }
		  } 
	
	
		function randomEnemy(passRandom) {
	
				if (passRandom%500 == 0){
					let monsterXPos = 90;

					$('<div class="monsters" id="monster' + monsterNo  + '"></div>').insertAfter('#stars');
					$monster = $('#monster' + monsterNo);
					$monster.data("x", monsterXPos);
					$monster.data("y", 92);
					$monster.css('left', monsterXPos + '%');
					console.log("new enemy monster")
					monsterNo++;
				}

				else if (passRandom%1000 == 0) {
					drawEnemies();
				}
				else if (passRandom === "one") {
					drawEnemies();
				}
				else { return;}
	
		}
	
	
	
	
	
	
	
		loop = () => {
	
	
			if (controller.up && player.jumping == false) {
				$('audio#jump')[0].play();
	
				$playerSprite.css('background-image', "url('assets/images/jump-black.gif')");
	
				player.y_speed -= 4;
				player.jumping = true;
			}
	
			if (controller.left) {
				if (player.facing == 'R') {
					$playerSprite.css('transform', "scaleX(-1");
					player.facing = "L";
				}
				if (player.x_speed >= -5) {
					player.x_speed -= 0.06;
					}
	
	
			}
	
			if (controller.right) {
				if (player.facing == 'L') {
					$playerSprite.css('transform', "none");
					player.facing = "R";
				}
				if (player.x_speed <= 5) {
					player.x_speed += 0.06;
					}
			}
	
			if (controller.fire && player.firing == false) {
				player.firing = true;
				$('audio#laser')[0].play();
				$('<div id="bullet"></div>').insertAfter('#stars');
		      	bullet.obj = $('#bullet');
		      	bullet.x = player.x + 4.5;
		      	bullet.y = player.y - 5;
		      	console.log(player.y)
		      	console.log("fire");
		      	
	
			}
	
			// this acts as gravity
			player.y_speed += 0.2;
	
			// MAKES PLAYER GO LEFT OR RIGHT
			player.x += player.x_speed;
	
	
	
			// SUPPOSED TO MAKE PLAYER JUMP
			player.y += player.y_speed;
	

			player.x_speed *= 0.95 // slowdown ala friction
			player.y_speed *= 0.95 // slowdown ala friction
	
			// to keep player from falling off canvass
			if (player.y > 84 ) /*check html*/ {
				$playerSprite.css('background-image', "url('assets/images/idle-black.gif')");
				player.jumping = false;
				player.y = 84;
				player.y_speed = 0;
			}
	
			// to keep player within x screen
			if (player.x < 0) {
				player.x = 0; /*this just checks for location*/
				player.x_speed = 0;
				
	
			}
			// too far right
			else if (player.x > 88) {
				player.x = 88 /**/
				player.x_speed =0;
			}
	
	
	
	
	
				// PRINTS PLAYERMOVEMENT
				$playerSprite.css('top', player.y + "%");
				$playerSprite.css('left', player.x + "%");
	
			// prints bullet if firing
			if (player.firing){

				bullet.y -= 2.2;
				// if bullet reaches top,
				if (bullet.y < 0.4) {
				    console.log(parseInt(bullet.obj.css('top')));
	
				    // removes bullet element
				    bullet.obj.remove();
				    player.firing = false;
				}
	
					bullet.obj.css('left', bullet.x + 2 + '%');
				    bullet.obj.css('top', bullet.y + '%');
				    
	
	
	
				// check for bullet-enemy collision . was here, i removed
				bullet.width = ($("#bullet").width()/600)*100 + 1; /*clean this up*/
				bullet.height = ($("#bullet").height()/600)*100 + 1;
	
				// console.log(bullet.width);
				// console.log(bullet.height);
	
			} /*player.firing end*/
	
				// this just keeps enemies moving
			animateEnemies($(".enemies"));
			
			// if hardMode on, generate side scrolling mons
			if (hardMode){
				randomEnemy(Math.floor(Math.random() * 4000));

			// infinite enemies
				

			}


			
	
			if (monsterNo > 1) {
				animateMonsters($(".monsters"));
			}
	
	
	
			// check for collison with enemies...
	
			// check for bullet-enemy collision MOVED here
			$(".enemies").each(function() {
					$enemy = $(this);
	
					/*this should not be declared here. put somewhere else*/
					$enemy.data("width", ($enemy.width()/600)*100 ); 
					$enemy.data("height", ($enemy.height()/600)*100 ); 
		      		/*^^^^ should not be declared here. put somewhere else*/
	
		      		collisionCheck(bullet, $enemy, function(){
		      			// code block to be run if collision detected
		      			score += 100;
		      			$("#score")[0].innerHTML = "Score: " + score;
		      			$("#bullet").remove();
		      			$('audio#explosion')[0].play();
		      			$enemy.remove();
		      			enemyCtr--;
		      			console.log("enemy no "+enemyCtr)
	
		      		})
	
		      		// player - enemy collision check because wala lang
		      		collisionCheck(player, $enemy, function(){
		      			// code block to be run if collision detected
		      			$enemy.remove();
		      			$("#gameOverModal").modal('show');
		      			endOfGame = true;
	
		      		})
	
	
				})
	
			$(".monsters").each(function() {
					$monster = $(this);
	
					/*this should not be declared here. put somewhere else*/
					$monster.data("width", ($enemy.width()/600)*100 ); 
					$monster.data("height", ($enemy.height()/600)*100 ); 
		      		/*^^^^ should not be declared here. put somewhere else*/
	
	
		      		// player - monster collision check because wala lang
		      		collisionCheck(player, $monster, function(){
		      			// code block to be run if collision detected
		      			$monster.remove();
		      			endOfGame = true;
		      			$("#gameOverModal").modal('show');
		      			
	
		      		})
	
	
				})
	
	
	
	
	
	
	
			
	
	
	
			
	
	
		
	
		// checksif enemies = 0
		if (enemyCtr == 0) {

			if (!hardMode){
				$("#gameModal").modal('show');
				return;
			}
			else if (hardMode) {

			console.log("enemyCtr was 0");
			randomEnemy("one");
			
			}
		}
		
	
	
	
	
	
	
	
	
		// updates the canvas when browser is ready agin also checks if game over
			if (!endOfGame) {
				window.requestAnimationFrame(loop); 
			}
			else {
				$('audio#pewpewjump-theme')[0].pause();
				$('audio#gameover-sound')[0].play();
			}

	
	
		}
	
		$("#hardMode")[0].addEventListener("click", function() {
			hardMode = true;
			gameStart();
		})
		window.addEventListener("keydown", controller.keyListener);
		window.addEventListener("keyup", controller.keyListener)
		window.requestAnimationFrame(loop);}

}) /*end of document.ready function*/