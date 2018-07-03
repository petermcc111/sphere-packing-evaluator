/**
Finalizing script
  1. Calculate the percentage error
  2. Sorting the resultant array(dictionary)
  3. console.log the Final value
  4. (optional)return the Final value
*/

var Final = function(param){
    this.param = param
    this.combine()
}

Final.prototype.welcome = function(){
    console.log("Finalizing results -")
    console.log()
}

Final.prototype.sort = function(key){
    //input parameter(resultant values)
    var copy = this.param
    for (var j=0;j<copy.length-1;j++){
        for (var i=0;i<copy.length-1-j;i++){
            if (copy[i+1][key] > copy[i][key]){
                var temp = copy[i]
                copy[i] = copy[i+1]
                copy[i+1] = temp
            }
        }
    }
}

Final.prototype.err_ratio = function(){
    //            Theoretical - Simulation(model)
    // % error = --------------------------------- * 100%
    //                    Theoretical
    var a = this.param
    for (var i=0;i<a.length;i++){
        var theory = a[i]["theory"]
        var model = a[i]["model"]
        var err = (theory - model)/ theory
        a[i]["error"]=err
        var err_per = (err * 100).toFixed(2)
        console.log("Calculation method: "+a[i]["method"])
        console.log("    Theoretical value: "+theory)
        console.log("    Simulation value : "+model)
        console.log("    Percentage error : "+err_per+"%")
        console.log()
    }
}

Final.prototype.combine = function(){
    // calculate % error
    this.err_ratio()
    
    // sorting the result dictionary; this.param[0]["model"] is 
    // the resultant value
    this.sort("model")
    var code = this.param[0]["method"], label
    switch (code){
        case "scp":
        label = "Simple cubic packing"
        break
        case "bcp":
        label = "Body-centered cubic packing"
        break
        case "hcp":
        label = "Hexagonal cubic packing"
        break
        case "fcp":
        label = "Face-centered cubic packing"
    }
    console.log("By simulation calculation, "+label+" structure results in "+
        "maximum capacity of the container.")
    console.log("The maximum capacity of the container is "+
        this.param[0]["model"]+" sphere(s).")
    console.log()
    return this.param[0]["model"]
}

Final.prototype.getResult = function(){
    return this.param
}