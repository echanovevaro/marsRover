function CustomError(message) {
	this.message = message;
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.name = "CustomError";

var grid = [
	["rover1","obstacle",null,null,null,null,null,null,null,null],
	[null,"rover2",null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null]
];

var rover1={
	direction:"N",
	column:0,
	row:0,
	travelLog : [{row: 0, column : 0}]
};

var rover2={
	direction:"N",
	column:1,
	row:1,
	travelLog : [{row: 1, column : 1}]
};

var longitudMax = 9;
var longitudMin = 0;
var latitudMax = 9;
var latitudMin = 0;

function turnLeft(rover){
	switch(rover.direction){
		case "N":
			rover.direction ="W";
			break;
		case "S":
			rover.direction = "E";
			break;
		case "W":
			rover.direction = "S";
			break;
		case "E":
			rover.direction = "N";
			break;
		default:
			throw new CustomError ("wrong direction" );
	}
}

function turnRight(rover){
	switch(rover.direction){
		case "N":
			rover.direction = "E";
			break;
		case "S":
			rover.direction = "W";
			break;
		case "W":
			rover.direction = "N";
			break;
		case "E":
			rover.direction = "S";
			break;
		default:
			throw new CustomError ("wrong direction" );
	}
}

function actualizarGrid(rover){
	var actualPosition = {row : rover.row, column: rover.column};
	var previousPosition = rover.travelLog[rover.travelLog.length-1];

	if(rover.row < latitudMin || rover.row > latitudMax || rover.column < longitudMin || rover.column > longitudMax){
		rover.column = previousPosition.column;
		rover.row = previousPosition.row;
		throw new CustomError ("out of range at position " + JSON.stringify(actualPosition));
	}else if(grid[rover.row][rover.column]){
		rover.column = previousPosition.column;
		rover.row = previousPosition.row;
		throw new CustomError (grid[actualPosition.row][actualPosition.column] +" found at position "  + JSON.stringify(actualPosition)) ;
	} else {
		grid[rover.row][rover.column] = grid[previousPosition.row][previousPosition.column];
		grid[previousPosition.row][previousPosition.column]=null;
	}
}

function moveForward(rover){
	if(rover.direction == "N"){
		rover.row--;
	}else if(rover.direction == "S"){
		rover.row++;
	}else if(rover.direction == "W"){
		rover.column--;
	}else if(rover.direction == "E"){
		rover.column++;
	} else {
		throw new CustomError ("wrong direction" );
	}
}

function moveBackwards(rover){
	if(rover.direction == "N"){
			rover.row++;
	}else if(rover.direction == "S"){
			rover.row--;
	}else if(rover.direction == "W"){
			rover.column++;
	}else if(rover.direction == "E"){
			rover.column--;
	} else {
		throw new CustomError ("wrong direction" );
	}
}

function moverRover(rover, movimiento){
	switch (movimiento.toLowerCase()) {
		case "r":
			turnRight(rover);
			break;
		case "l":
			turnLeft(rover);
			break;
		case "f":
			moveForward(rover);
			actualizarGrid(rover);
			rover.travelLog.push({row: rover.row, column: rover.column});
			break;
		case "b":
			moveBackwards(rover);
			actualizarGrid(rover);
			rover.travelLog.push({row: rover.row, column: rover.column});
			break;
		default :
			throw CustomError("bad input :" + movimiento);
		}
}

var recorrido1 = prompt("insert rover1 movements \n (f)orward, (r)ight, (l)eft or (b)ackwards.");
var recorrido2 = prompt("insert rover2 movements \n (f)orward, (r)ight, (l)eft or (b)ackwards.");

var errorRover1 = false;
var errorRover2 = false;

for(i=0 ; i<recorrido1.length && !errorRover1 || i<recorrido2.length && !errorRover2 ; i++){
	if(i<recorrido1.length && !errorRover1){
		try{
			moverRover(rover1, recorrido1[i]);
		}catch(error1){
			console.log("Error at position " + (i+1) +" of rover1's input ''" +recorrido1 + "'': " + error1.message);
			errorRover1=true;
		}
	}
	if(i<recorrido2.length && !errorRover2){
		try{
			moverRover(rover2, recorrido2[i]);
		}catch(error2){
			console.log("Error at position " + (i+1) +" of rover2's input ''" +recorrido2 + "'': " + error2.message);
			errorRover2=true;
		}
	}
}

console.log("Rover1 log: " + JSON.stringify(rover1.travelLog));
console.log("Rover2 log: " + JSON.stringify(rover2.travelLog));
