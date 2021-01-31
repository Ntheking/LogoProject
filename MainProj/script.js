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
let gradientImgColors = ['#FFFFFF', '#FFFFFF'];
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
function parseHtmlColorString(rgbString){
	if(rgbString == ''){
		//console.log('black');
		return '#000000';
	}
	let truCol = rgbString.substring(4, rgbString.length);
	//truCol = truCol.slice(0, -1);
	console.log(truCol);
	let vals = '#';
	let curStr = '';
	for(let i = 0; i < truCol.length; i++){
		if(truCol[i] == ',' || truCol[i]==')'){
			let hold = parseInt(curStr);
			hold = hold.toString(16);
			if(hold.length == 1){
				hold = '0' + hold;
			}
			vals +=hold;
			curStr = '';
			continue;
		}
		curStr += truCol[i];
	}
	//console.log(vals);
	return vals;
}
function finishGradientParse(truCol){
	let vals = '#';
	let curStr = '';
	for(let i = 0; i < truCol.length; i++){
		if(truCol[i] == ',' || truCol[i]==')'){
			let hold = parseInt(curStr);
			hold = hold.toString(16);
			if(hold.length == 1){
				hold = '0' + hold;
			}
			vals +=hold;
			curStr = '';
			continue;
		}
		curStr += truCol[i];
	}
	return vals;
}
function fixDefault(def, val){
	if(val == ''){
		return def;
	}
	return val;
}
function removePx(def, val){
	if(val == ''){
		val = def;
	}
	val = val.substring(0, val.length-2);
	console.log(val);
	return val;
}



function setCurrent(obj){
	currentText=obj;
	currentAnimObj = obj;
	document.getElementById("textInput").value = currentText.innerHTML;
	document.getElementById("fontColor").value = parseHtmlColorString(currentText.style.color);
	document.getElementById("fonts").value = fixDefault('arial', currentText.style.fontFamily);
	document.getElementById('fontsize').value = removePx('30px', currentText.style.fontSize);
	document.getElementById('posTexty').value = removePx('0px', currentText.style.top);
	document.getElementById('posTextx').value = removePx('0px', currentText.style.left);
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
	gradientImgColors[index] = obj.value;
	console.log(gradientImgColors[index]);
	currentShape.style.backgroundImage = "linear-gradient(" + gradientImgColors[0] + "," + gradientImgColors[1] + ")";
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
function removeOuterChars(str, start, end, def){
	if(str == ''){
		console.log('def');
		return def;
	}
	console.log(str);
	return str.substring(start, str.length-(end));
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
 	document.getElementById('shapeWidth').value = removePx('100px',currentShape.style.width);
 	document.getElementById('shapeHeight').value = removePx('100px',currentShape.style.height);
 	document.getElementById('shapePosy').value = removePx('100px',currentShape.style.top);
 	document.getElementById('shapePosx').value = removePx('100px',currentShape.style.left);
 	document.getElementById('shapeRot').value = removeOuterChars(currentShape.style.transform, 7, 4, '0');
 	document.getElementById('shapeBackgroundCol').value = parseHtmlColorString(currentShape.style.backgroundColor);
 	document.getElementById('borderW').value = removePx('0px', currentShape.style.borderWidth);
 	document.getElementById('borderC').value = parseHtmlColorString(currentShape.style.borderColor);
 	if(currentShape.style.backgroundImage[0] == 'u'){
 		document.getElementById('urlInputImg').value = removeOuterChars(currentShape.style.backgroundImage, 4, 1, '');
 	}else{
 		let temp = removeOuterChars(currentShape.style.backgroundImage, 16, 1, '');
 		let breakPoint = temp.indexOf('),');
 		console.log(temp.substring(4, breakPoint+1));
 		console.log(temp.substring(breakPoint+7, temp.length));
 		document.getElementById('shapeGrad1').value = finishGradientParse(temp.substring(4, breakPoint+1));
 		document.getElementById('shapeGrad2').value = finishGradientParse(temp.substring(breakPoint+7, temp.length));
 	}
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
