
let databaseItem = function() {
	this.infoList = [];
}

databaseItem.prototype.getArraySize = function() {
	return this.infoList.length;
}

//add or modify.  Complete getAllObjects function.
databaseItem.prototype.getAllObjects = function() {
	return(this.infoList);
	}


databaseItem.prototype.getAllNames = function() {
	let names = [];
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i]) {
			names.push(this.infoList[i].name);
		}
	}
	return(names);
}

databaseItem.prototype.getObjectAtIndex = function(index) {
	if (index < 0 || index >= this.infoList.length)
		return (null);
	else {
		if (!this.infoList[index]) {
			return(null);
		} else {
			return(this.infoList[index]);
		}
	}
}

databaseItem.prototype.addObjectAtIndex = function(obj,index) {
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


databaseItem.prototype.addObject = function(obj) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && obj.name == this.infoList[i].name)
			return (null);
	}
	this.infoList.push(obj);
	return ({redirect:"/"});
}




databaseItem.prototype.changeObjectAtIndex = function(obj,index) {
	if (index < 0 || index >= this.infoList.length)
	if (!this.infoList[index])
		return (null);
	this.infoList[index] = obj;
	return (obj);
}

//add or modify.  Complete changeObject function.
databaseItem.prototype.changeObject = function(obj) {
	for(var i=0;i<this.infoList.length;i++){
		if(obj.ident == this.infoList[i].ident){
			this.infoList[i].name = obj.name;
			return(obj);
		}
	}
	return (null);
}

databaseItem.prototype.deleteObjectAtIndex = function(index) {
	if (index < 0 || index >= this.infoList.length) {
		return(null);
	} else {
		if (!this.infoList[index]) {
			return(null);
		} else {
			let obj = this.infoList[index];
			this.infoList[index] = undefined;
			return(obj);
		}
	}
}


//add or modify.  Complete deleteObjectWithID function.
databaseItem.prototype.deleteObjectWithID = function(ident) {
	for(var i=0;i<this.infoList.length;i++){
	if(this.infoList[i].ident == ident){
		this.infoList[i].ident = undefined;
		this.infoList[i].name = undefined;
		return(ident);
	}
}
	return (null);
}


module.exports = databaseItem;
