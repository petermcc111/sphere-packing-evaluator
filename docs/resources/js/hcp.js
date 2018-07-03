/**
Hexagonal cubic packing (hcp) simulator

  hcp is one of close-packing structures with ~74% theoretical efficiency, 
  same with face-centered cubic packing (fcp) structure.

    Volume of a unit cell = 24 * sqrt(2) * (radius ^ 3)
    No. of spheres in one unit cell = 6 

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

        Layer structure: ABABAB... 
        Layer A: start from corner(0,0), 1st row is not indented
        Layer B: start from (radius, sqrt(1/3)*radius) based
                 on the starting point of layer A, 1st row is INDENTED

*/

var HCP = function(param){
    this.l=param['length']
    this.w=param['width']
    this.h=param['height']
    this.r=param['radius']
    this.welcome()
}

HCP.prototype.welcome = function(){
    console.log("Entering hcp estimation -")
    console.log()
    console.log("Radius    : "+this.r)
    console.log("Length    : "+this.l)
    console.log("Width     : "+this.w)
    console.log("Height    : "+this.h)
    console.log()
}

HCP.prototype.count = function(i,j){
    // Counting the no. of spheres in certain rows 
    if ((i%2===0 && j%2===0) || (i%2===1 && j%2===1)){
        return parseInt(this.l/(2*this.r))
    } else {
        return parseInt((this.l - this.r)/(2*this.r))
    }
}

HCP.prototype.eval_theory = function(){
	console.log("Theoretical hcp estimation :")

	var volume_container = this.l * this.w * this.h
	var volume_unitcell = 24 * Math.sqrt(2) * Math.pow(this.r,3)
	console.log("    Volume of container: "+volume_container)
	console.log("    Volume of single unit cell: "+volume_unitcell)
	console.log("    No. of spheres in one unit cell is 6.")
	var count = parseInt(volume_container / volume_unitcell) *6
	console.log("    No. of spheres in the container is "+count+" by HCP theory.")
	console.log()
	return count
}

HCP.prototype.eval_model = function(){
	console.log("Building hcp models:")

	// Constant: each layer are separated by sqrt(8/3) * radius
	var layer_sep = Math.sqrt(8/3) * this.r
	console.log("    Separation between layers: "+layer_sep)

	// For height n, max. no. of layers ranges from 1(h = 2r) to
	// n(h = 2r + (n-1)separation)
	// max_layers should be an integer
	var max_layers = parseInt((this.h - (2*this.r))/layer_sep) + 1

	var lastword = max_layers===1 ? "layer" : "layers"
	console.log("    This container can store a max of "+max_layers+" "+lastword+".")

	// Constant: each row are separated by sqrt(3) * radius
	var row_sep = Math.sqrt(3) * this.r
	console.log("    Separation between rows of spheres within a layer: "+row_sep)

	// Accumulate the total numbers of spheres
	var count = 0

	for (var i=0;i<max_layers;i++){

		// case of different layers:
		if (i%2===0){
			max_rows = parseInt((this.w - (2*this.r))/row_sep) + 1
		} else {
			max_rows = parseInt((this.w - Math.sqrt(1/3)*this.r - (2*this.r))/row_sep) + 1
		}

		// Accumulate the total numbers of spheres in a layer
		var layer_count = 0

		for(var j=0;j<max_rows;j++){
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
