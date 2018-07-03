"""
Simple cubic packing(scp) simulator
 
  scp is the simplest packing structure. Each sphere is
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
"""
import math

class scp:
    def __init__(self,param):
        self.l=param['length']
        self.w=param['width']
        self.h=param['height']
        self.r=param['radius']
        self.welcome()

    def welcome(self):
        print("Entering scp estimation -")
        print()
        print("Radius    :",self.r)
        print("Length    :",self.l)
        print("Width     :",self.w)
        print("Height    :",self.h)
        print()

    def eval_theory(self):
        print("Theoretical scp calculation :")

        volume_container = self.l * self.w * self.h
        volume_unitcell = 8 * math.pow(self.r,3)
        print("    Volume of container:",volume_container)
        print("    Volume of single unit cell:",volume_unitcell)
        print("    No. of spheres in one unit cell is 1.")
        count = int(volume_container / volume_unitcell) *1
        print("    No. of spheres in the container is ",count,"by SCP theory.")
        print()
        return count
        
    def eval_model(self):
        print("Building scp models:")

        # Constant: each row/layer are separated by 2 * radius
        sep = 2 * self.r
        print("    Separation between layers:",sep)

        # For height n, max. no. of layers = height/separation
        # max_layers should be an integer
        max_layers = int(self.h/sep)
        lastword = "layer" if max_layers ==1 else "layers"
        print("    This container can store a max of",max_layers,
            lastword+".")

        print("    Separation between rows of spheres within a layer:", sep)

        
        # Accumulate the total numbers of spheres
        count = 0
    
        for i in range(0, max_layers):

            max_rows = int(self.w/sep)

            # Accumulate the total numbers of spheres in a layer
            layer_count = 0
            for j in range(0, max_rows):

                num = int(self.l/(2* self.r))
                layer_count = layer_count + num
            
            lastword = "sphere" if layer_count ==1 else "spheres"
            print("        Layer",i+1,"has",max_rows,"rows and a total of ",
                layer_count, lastword+".")
            count = count + layer_count

        print("    No. of sphere in the container is ",count,"by SCP model.")
        print()
        print("---------------------------------------------------------------------------")
        return count
