let canvas = document.getElementById('canvas');
let currentText;
let currentShape;
let currentAnimObj;
let appliedAnimObjs = [];


function applyAnim(operation){
	let type = document.getElementById("selectAnimType").value;
	if(type == 'fade'){
		currentAnimObj.style.animation = 'none';
		currentAnimObj.style.animation = 'fadeIn 3s 1';
	}else if(type == 'rotate'){
		currentAnimObj.style.animation = 'none';
		currentAnimObj.style.animation = 'spin 3s 1';
	}else if(type == 'zoom'){
		currentAnimObj.style.animation = 'none';
		currentAnimObj.style.animation = 'zoom 3s 1';
	}else if(type == 'beat'){
		currentAnimObj.style.animation = 'none';
		currentAnimObj.style.animation = 'beat 3s 1';
	}
	if(operation=='delete'){
		currentAnimObj.style.animation = 'none';
	}
	for(let i=0; i < appliedAnimObjs.length; i++){
		if(appliedAnimObjs[i]===currentAnimObj){
			if(operation=='delete'){
				appliedAnimObjs = appliedAnimObjs.splice(1, i)
				console.log(appliedAnimObjs);
			}
			return;
		}
	}
	appliedAnimObjs.push(currentAnimObj);
	console.log(appliedAnimObjs);
}
function playAnim(){
	for(let i = 0; i < appliedAnimObjs.length; i++){
		let hold = appliedAnimObjs[i].style.animation;
		appliedAnimObjs[i].style.animation = 'none';
		appliedAnimObjs[i].offsetWidth;
		appliedAnimObjs[i].style.animation = hold;
		appliedAnimObjs[i].style.animationPlayState = 'running';
	}
}
function stopAnim(){
	for(let i = 0; i < appliedAnimObjs.length; i++){
		appliedAnimObjs[i].style.animationPlayState = 'paused';
	}
}
function setDuration(obj){
	currentAnimObj.style.animationDuration = obj.value + 's';
	console.log("dur");
}
function setRepeats(obj){
	if(obj.value < 0){
		currentAnimObj.style.animationIterationCount = 'infinite';
		return;
	}
	currentAnimObj.style.animationIterationCount = obj.value;
}

function changeBar(nextBar){
	let textBar = document.getElementById("textBar");
	let shapeBar = document.getElementById("shapeBar");
	let backgroundBar = document.getElementById("backgroundBar");
	let mainBar = document.getElementById("mainBar");
	let animBar = document.getElementById("animBar");

	if(nextBar == "main"){
		textBar.setAttribute("style", "display:none");
		backgroundBar.setAttribute("style", "display:none");
		shapeBar.setAttribute("style", "display:none");
		mainBar.setAttribute("style", "display:block");
		animBar.setAttribute("style", "display:none")
	}
	else if(nextBar == 'Text'){
		textBar.setAttribute("style", "display:block");
		mainBar.setAttribute("style", "display:none");
	}
	else if(nextBar == 'Background'){
		backgroundBar.setAttribute("style", "display:block");
		mainBar.setAttribute("style", "display:none");
	}
	else if(nextBar == 'Shapes'){
		shapeBar.setAttribute("style", "display:block");
		mainBar.setAttribute("style", "display:none");
	}else if(nextBar == 'anim'){
		animBar.setAttribute("style", "display:block")
		mainBar.setAttribute("style", "display:none");
	}
}



function setBackground(obj){
		console.log(obj.value);
		let hold = obj.value;
		canvas.setAttribute("style", "background-color:" + hold);
}



let gradientColors = ['white', 'white'];
function setGradientBackground(index, obj){
	gradientColors[index] = obj.value;
	console.log(gradientColors[index]);
	canvas.style.backgroundImage = "linear-gradient(" + gradientColors[0] + "," + gradientColors[1] + ")";
}
function setFile(obj){
	console.log(obj.value);
	canvas.style.backgroundImage = "url(" + obj.value + ")";
}
function setBackgroundSize(type){
	console.log(type);
	canvas.setAttribute("style", "background-size:" + type)
	setFile(document.getElementById("urlInput"));

}

function createTextBox(){
	let hold = document.createElement('p');
	hold.innerHTML = "New Text";
	hold.setAttribute("style", "position:absolute; top: 45%; left: 50%; white-space: pre-wrap;");
	hold.setAttribute("onclick", "setCurrent(this)");
	canvas.appendChild(hold);
	currentText=hold;
}


function setCurrent(obj){
	currentText=obj;
	currentAnimObj = obj;
	document.getElementById("textInput").value = currentText.innerHTML;
}
function setText(input){
	currentText.innerHTML = input.value;
}
function setTextColor(input){
	currentText.style.color = input.value;
}
function changeTextFont(input){
	currentText.style.fontFamily = input.value;
}
function changeFontSize(input){
	currentText.style.fontSize = input.value + "px";
}
function setPositionText(index, input){
	if(input.value < 0){
		input.value = 0;
	}
	if(index == 'x'){
		currentText.style.left = input.value + "px";
	}
	if(index == 'y'){
		currentText.style.top = input.value + "px";
	}
}
function setTextAlign(loc){
	currentText.style.textAlign = loc;
}
function deleteText(){
	currentText.remove();
}
function setImgBackground(obj){
		let hold = obj.value;
		currentShape.style.backgroundColor = hold;
		currentShape.style.backgroundImage = 'none';
}
function setImgGradientBackground(index, obj){
	gradientColors[index] = obj.value;
	console.log(gradientColors[index]);
	currentShape.style.backgroundImage = "linear-gradient(" + gradientColors[0] + "," + gradientColors[1] + ")";
}
function setImgFile(obj){
	console.log(obj.value);
	currentShape.style.backgroundImage = "url(" + obj.value + ")";
}
function setImgBackgroundSize(type){
	console.log(type);
	currentShape.style.backgroundSize = type;
}
function setBorder(obj){
	let colObj = document.getElementById("borderC");
	let wObj = document.getElementById("borderW");
	currentShape.style.border = wObj.value + "px solid" + colObj.value;
}

function deleteShape(){
	currentShape.remove();
}

//go back button to landing page

function createNewShape(){
 	let type = document.getElementById("selectShapeType").value;
 	let shape = document.createElement('div');
 	shape.setAttribute("style", "width: 100px; height: 100px; position: absolute; top: 50%; left: 50%; background-color: black; background-repeat: no-repeat");
 	shape.setAttribute("onclick", 'setCurrentShape(this)');

 	canvas.appendChild(shape);
 	if(type == 'circle'){
 		shape.style.borderRadius = '50%';
 	}
 	if(type  == 'parallelogram'){
 		shape.style.width = '100px';
 		shape.style.height = '50px';
 		shape.style.transform = "skew(20deg)";
 		shape.style.backgroundColor = "black";
 	}
 	currentShape=shape;
 	currentAnimObj=shape;
 }
function setCurrentShape(obj){
 	currentShape = obj;
 	currentAnimObj = obj;
 }
function changeDimensionsLoc(type, obj){
 	if(type == 'r'){
 		currentShape.style.transform = "rotate(" + obj.value + "deg)";
 		return;
 	}
 	if(obj.value < 0){
 		obj.value = 0;
 	}
 	if(type == 'x'){
 		currentShape.style.left = obj.value + 'px';
 		return;
 	}else if(type == 'y'){
 		currentShape.style.top = obj.value + 'px';
 		return;
 	}
 	if(obj.value < 1){
 		obj.value = 1;
 	}
 	if(type == 'w'){
 		currentShape.style.width = obj.value + 'px';
 	}else if(type == 'h'){
 		currentShape.style.height = obj.value + 'px';
 	}
 }
