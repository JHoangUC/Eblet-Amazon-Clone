
let databasecart = function() {
	this.infoList = [];
}

databasecart.prototype.getArraySize = function() {
	return this.infoList.length;
}

//add or modify.  Complete getAllObjects function.
databasecart.prototype.getAllObjects = function() {

	return(this.infoList);
	}
	databasecart.prototype.getAllObjectsName = function(username) {
		console.log("inside func");
		var temp = []
			for (let i=0;i<this.infoList.length;i++) {
				if(this.infoList[i].username == username){
						console.log(JSON.stringify(this.infoList[i]) + " getAllObjectsName");
						temp.push(this.infoList[i])

				}
				console.log("not");
			}
			console.log(JSON.stringify(temp) + " temp");
		return (temp);
		}

databasecart.prototype.getAllNames = function() {
	let names = [];
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i]) {
			names.push(this.infoList[i].name);
		}
	}
	return(names);
}

databasecart.prototype.getObjectAtIndex = function(index) {
	if (index < 0 || index >= this.infoList.length)
		return (null);
	else {
		if (!this.infoList[index]) {
			return(null);
		} else {
			return(this.infoList[index].name);
		}
	}
}

databasecart.prototype.addObjectAtIndex = function(obj,index) {
	if (index < 0)
		return (null);
	if (index < this.infoList.length)
	{
		if (!this.infoList[index]) {
			this.infoList[index] = obj;
			return (obj);
		}
		else {
			return (null);
		}
	}
	else
		this.infoList[index] = obj;
	return (obj);
}


databasecart.prototype.addObject = function(obj) {
	for (let i=0;i<this.infoList.length;i++) {
 if(obj.username == this.infoList[i].username && obj.index ==  this.infoList[i].index){
		console.log("undefined addobject");
		return("fail")
	}
}
	this.infoList.push(obj);
	console.log(JSON.stringify(this.infoList) + " we good");
		return ({redirect:"/"});

}





databasecart.prototype.changeObjectAtIndex = function(obj,index) {
	if (index < 0 || index >= this.infoList.length)
	if (!this.infoList[index])
		return (null);
	this.infoList[index] = obj;
	return (obj);
}

//add or modify.  Complete changeObject function.
databasecart.prototype.changeObject = function(obj) {
	for(var i=0;i<this.infoList.length;i++){
		if(obj.ident == this.infoList[i].ident){
			this.infoList[i].name = obj.name;
			return(obj);
		}
	}
	return (null);
}

databasecart.prototype.deleteObjectAtIndex = function(index) {
	if (index < 0) {
		console.log("nulling");
		return(null);
	} else {
		if (!this.infoList[index]) {
			console.log("nulling undefined");
			return(null);
		} else {
			let obj = this.infoList[index];
			this.infoList[index] = undefined;
			console.log("deletedment");
			return(obj);
		}
	}
}


//add or modify.  Complete deleteObjectWithID function.
databasecart.prototype.deleteObjectWithID = function(ident) {
	for(var i=0;i<this.infoList.length;i++){
	if(this.infoList[i].index == ident){
		let temp = this.infoList[i]
		this.infoList.splice(i, 1);
		console.log(JSON.stringify(this.infoList) + " current infoList after splice");
		console.log(JSON.stringify(temp) + " logging the temp");
		return(temp);
	}
}
	return (null);
}


module.exports = databasecart;
