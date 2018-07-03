"""
Finalizing script
  1. Calculate the percentage error
  2. Sorting the resultant array(dictionary)
  3. Print the final value
  4. (optional)return the final value
"""
class final:
    def __init__(self,param):
        self.param = param
        self.combine()

    def welcome(self):
        print("Finalizing results -")
        print()

    def sort(self,key):
        #input parameter(resultant values)
        copy = self.param

        for j in range(0,len(copy)-1):
            for i in range(0,len(copy)-1-j):
                if copy[i+1][key] > copy[i][key]:
                    temp = copy[i]
                    copy[i] = copy[i+1]
                    copy[i+1] = temp

    def err_ratio(self):
        #            Theoretical - Simulation(model)
        # % error = --------------------------------- * 100%
        #                    Theoretical
        a = self.param
        for i in range(0,len(a)):
            theory = a[i]["theory"]
            model = a[i]["model"]
            err = (theory-model)/theory
            a[i]["error"]=err
            err_per = err*100
            print("Calculation method:",a[i]["method"])
            print("    Theoretical value:",theory)
            print("    Simulation value :",model)
            print("    Percentage error :",str(round(err_per,2))+"%")
            print()

    def combine(self):
        # calculate % error
        self.err_ratio()
        
        # sorting the result dictionary; self.param[0]["model"] is 
        # the resultant value
        self.sort("model")
        code = self.param[0]["method"]
        if code == "scp":
            label = "Simple cubic packing"
        elif code == "bcp":
            label = "Body-centered cubic packing"
        elif code == "hcp":
            label = "Hexagonal cubic packing"
        elif code == "fcp":
            label = "Face-centered cubic packing"
        print("By simulation calculation,",label,"structure results in",
            "maximum capacity of the container.")
        print("The maximum capacity of the container is",
            self.param[0]["model"],"sphere(s).")
        print()
        return self.param[0]["model"]

