/**
Simple cubic packing(SCP) simulator
 
  SCP is the simplest packing structure. Each sphere is
  coordinated by max. 6 neighbouring spheres.

    Volume of a unit cell = 2 * (radius ^ 3)
    No. of spheres in one unit cell = 1

  This script/module calculates maximum no. of spheres added to a cuboid with 
  hcp structures. 

  Input parameters:
  {
    "radius":
    "length":
    "width":
    "height":
  }

  Output: 
    1. eval(theory): theoretical value of capacity
          Volume of container
        ----------------------- * no. of spheres in single unit cell
          Volume of unit cell

        Theoretical calculation suits for fast and large-scale 
        estimation, though there are no consideration on whether the spheres
        are actually inside the container.

    2. eval(model): simulation value of capacity
        Lines of Spheres are added to a virtual container accordingly.
        Each line/row has a certain no. of spheres depending on the length of
        container and the packing structure. These lines of spheres fill the 
        entire layer, and subsequently fill another layer until the max. no.
        of layers availability is reached.

*/

var SCP = function(param){
	this.l=param['length']
	this.w=param['width']
	this.h=param['height']
	this.r=param['radius']
	this.welcome()
}

SCP.prototype.welcome = function(){
	console.log("Entering SCP estimation -")
	console.log()
	console.log("Radius    : "+this.r)
	console.log("Length    : "+this.l)
	console.log("Width     : "+this.w)
	console.log("Height    : "+this.h)
	console.log()
}

SCP.prototype.eval_theory = function(){
	console.log("Theoretical SCP calculation :")

	var volume_container = this.l * this.w * this.h
	var volume_unitcell = 8 * Math.pow(this.r,3)
	console.log("    Volume of container: "+volume_container)
	console.log("    Volume of single unit cell: "+volume_unitcell)
	console.log("    No. of spheres in one unit cell is 1.")
	var count = parseInt(volume_container / volume_unitcell) *1
	console.log("    No. of spheres in the container is "+count+" by SCP theory.")
	console.log()
	return count
}

SCP.prototype.eval_model = function(){
	console.log("Building SCP models:")

	// Constant: each row/layer are separated by 2 * radius
	var sep = 2 * this.r
	console.log("    Separation between layers: "+sep)

	// For height n, max. no. of layers = height/separation
	// max_layers should be an integer
	var max_layers = parseInt(this.h/sep)
	var lastword = max_layers===1 ? "layer" : "layers"
	console.log("    This container can store a max of "+max_layers+" "+lastword+".")
	console.log("    Separation between rows of spheres within a layer: "+sep)


	// Accumulate the total numbers of spheres
	var count = 0

	for (var i=0;i<max_layers;i++){
		var max_rows = parseInt(this.w/sep)

		// Accumulate the total numbers of spheres in a layer
		var layer_count = 0
		for (var j=0;j<max_rows;j++){
			var num = parseInt(this.l/(2* this.r))
			layer_count += num
		}

		var lastword = layer_count===1 ? "sphere" : "spheres"
		console.log("        Layer "+(i+1)+" has "+max_rows+" rows and a total of "+layer_count+" "+ lastword+".")
		count += layer_count
	}
	console.log("    No. of sphere in the container is "+count+" by SCP model.")
	console.log()
	console.log("---------------------------------------------------------------------------")
	return count
}