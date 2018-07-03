/**
Face-centered cubic packing (FCP) simulator

  FCP is one of close-packing structures with ~74% theoretical efficiency, 
  same with hexagonal cubic packing (hcp) structure.

    Volume of a unit cell = 16 * sqrt(2) * (radius ^ 3)
    No. of spheres in one unit cell = 4

  This script/module calculates maximum no. of spheres added to a cuboid with 
  FCP structures. 

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

        Layer structure: ABCABC... 
        Layer A: start from corner(0,0), 1st row is not indented
        Layer B: start from (radius, sqrt(1/3)*radius) based
                 on the starting point of layer A, 1st row is INDENTED
        Layer C: start from (radius, 2 * sqrt(1/3)*radius)
                 based on the starting point of layer A, 
                 1st row is not indented

*/

var FCP = function(param){
	this.l=param['length']
	this.w=param['width']
	this.h=param['height']
	this.r=param['radius']
	this.welcome()
}

FCP.prototype.welcome = function(){
	console.log("Entering FCP estimation -")
	console.log()
	console.log("Radius    : "+this.r)
	console.log("Length    : "+this.l)
	console.log("Width     : "+this.w)
	console.log("Height    : "+this.h)
	console.log()
}

FCP.prototype.count = function(i,j){
	// Counting the no. of spheres in certain rows 
	if ((i%3===0 && j%2===0)||(i%3===1 && j%2===1)||(i%3===2 && j%2===0)){
		return parseInt(this.l/(2* this.r))
	} else {
		return parseInt((this.l - this.r)/(2* this.r))
	}
}

FCP.prototype.eval_theory = function(){
	console.log("Theoretical FCP estimation :")

	var volume_container = this.l*this.w*this.h
	var volume_unitcell = 16 * Math.sqrt(2) * Math.pow(this.r,3)
	console.log("    Volume of container: "+volume_container)
	console.log("    Volume of single unit cell: "+volume_unitcell)
	console.log("    No. of spheres in one unit cell is 4.")

	var count = parseInt(volume_container / volume_unitcell) *4
	console.log("    No. of spheres in the container is "+count+" by FCP theory.")
	console.log()
	return count
}

FCP.prototype.eval_model = function(){
	console.log("Building FCP models:")

	// Constant: each layer is separated by sqrt(8/3) * radius
	var layer_sep = Math.sqrt(8/3) * this.r
	console.log("    Separation between layers: "+layer_sep)

	// For height n, max. no. of layers ranges from 1(h = 2r) to
	// n(h = 2r + (n-1)separation)
	// max_layers should be an integer
	var max_layers = parseInt((this.h - (2*this.r))/layer_sep) + 1

	var lastword = max_layers===1 ? "layer" : "layers"
	console.log("    This container can store a max of "+max_layers+" "+lastword+".")

	// Constant: each row in the same layer is separated by sqrt(3)*radius
	var row_sep = Math.sqrt(3) * this.r
	console.log("    Separation between rows of spheres within a layer: "+row_sep)

	// Accumulate the total numbers of spheres
	var count = 0

	// Adjust the allowed length for different layers
	for (var i=0;i<max_layers;i++){

		// case of different layers:
		if (i%3===0){
			max_rows = parseInt((this.w - (2*this.r))/row_sep) + 1
		} else if (i%3===1){
			max_rows = parseInt((this.w - Math.sqrt(1/3)*this.r - (2*this.r))/row_sep) + 1
		} else {
			max_rows = parseInt((this.w - 2*Math.sqrt(1/3)*this.r - (2*this.r))/row_sep) + 1
		}

		// Accumulate the total numbers of spheres in a layer
		var layer_count = 0

		for (var j=0;j<max_rows;j++){
			layer_count += this.count(i,j)
		}

		var lastword = layer_count===1 ? "sphere" : "spheres"
		console.log("        Layer "+(i+1)+" has "+max_rows+" rows and a total of "+layer_count+" "+lastword+".")
		count += layer_count
	}

	console.log("    No. of sphere in the container is "+count+" by HCP model.")
	console.log()
	console.log("---------------------------------------------------------------------------")
	return count
}
