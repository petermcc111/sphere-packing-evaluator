/**
 This script is intended to calculate the maximum no. of certain balls/spheres that
 can be stored into a cuboid-shaped container. No balls/spheres are chopped, or
 partially left outside the container.

 The cubic systems used here are - 
       Name (Abbreviation) : theoretical efficiencies
    1. Simple cubic packing (scp) : 52%
    2. Hexagonal cubic packing (hcp): 74%
    3. Face-centered cubic packing (fcp): 74%

*/

var Input = function(param){
	this.param = param
	this.execute()
}

Input.prototype.welcome = function(){
	console.log("Capacity estimation for spherical objects")
	console.log("Developed by Peter Chau")
	console.log("Last updated: 9 Jun 2018")
	console.log()
	console.log("---------------------------------------------------------------------------")
	console.log("Please enter the following parameters:")
}

Input.prototype.num = function(i){
	try {
		var o = parseFloat(i)
		return true
	} catch(ValueError){
		return false
	}	
}

Input.prototype.execute = function(){
	console.log("The system is now transferring the input - ")
	console.log()
	console.log("---------------------------------------------------------------------------")

	this.getRuntime = new Runtime(this.param)
}

Input.prototype.getResult = function(){
	return this.getRuntime.getResult()
}
