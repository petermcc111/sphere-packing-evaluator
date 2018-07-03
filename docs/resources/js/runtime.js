/**
Runtime for container capacity estimation

 This runtime module aims at integrating various calculation methods, 
 checking the space availability for the spheres, and executing the 
 finalizing scripts.

 Input parameters:
 {
    "radius":
    "length":
    "width":
    "height":
 }
 Output: None

*/

var Runtime = function(param){
	this.param = param
	this.unitAdjust()
	this.runtime()
}

Runtime.prototype.welcome = function(){
	console.log("Entering estimation runtime -")
	console.log()
}

Runtime.prototype.unitAdjust = function(){
	this.param.radius=this.valueAdjustEach(this.param.radius,this.param.radius_unit)

	this.param.length= this.valueAdjustEach(this.param.length,this.param.length_unit)
	this.param.width= this.valueAdjustEach(this.param.width,this.param.width_unit) 
	this.param.height= this.valueAdjustEach(this.param.height,this.param.height_unit)
}

Runtime.prototype.valueAdjustEach = function(value,unit){
	switch(unit){
		case "cm": return value*0.01;break
		case "m" : return value;break
		case "inch": return value*0.0254;break
	}
}

Runtime.prototype.value2AdjustEach = function(value,unit){
	switch(unit){
		case "cm": return value*0.01;break
		case "m" : return value;break
		case "inch": return value*0.0254;break
	}
}

Runtime.prototype.avail = function(){
	var obj = this.param
	if (obj["radius"]==0){
		this.error = 0
		return false
	}
	if (obj["length"]>=2*obj["radius"]){
		if (obj["width"]>=2*obj["radius"]){
			if (obj["height"]>=2*obj["radius"]){
				return true
			} else {
				this.error=1
				return false
			}
		} else {
			this.error=1
			return false
		}
	} else {
		this.error=1
		return false
	}
}

Runtime.prototype.noball = function(){
	this.getFinal = "No spheres can be stored because of limited space."
	console.log(this.getFinal)
}

Runtime.prototype.runtime = function(){
	this.welcome()

	if (this.avail()){
		var scpMethod = new SCP(this.param)
		var scp_theory = scpMethod.eval_theory()
		var scp_model = scpMethod.eval_model()

		var hcpMethod = new HCP(this.param)
		var hcp_theory = hcpMethod.eval_theory()
		var hcp_model = hcpMethod.eval_model()

		var fcpMethod = new FCP(this.param)
		var fcp_theory = fcpMethod.eval_theory()
		var fcp_model = fcpMethod.eval_model()

		var res = [
			{method:"scp",name:"simple cubic packing",theory:scp_theory,model:scp_model},
			{method:"hcp",name:"hexagonal cubic packing",theory:hcp_theory,model:hcp_model},
			{method:"fcp",name:"face-centered cubic packing",theory:fcp_theory,model:fcp_model}
		]

		this.getFinal = new Final(res)
	} else {
		this.noball()
	}
}

Runtime.prototype.getResult = function(){
	try{return this.getFinal.getResult()}
	catch(e){return {"warning":this.error}}
}
