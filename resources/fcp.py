"""
Face-centered cubic packing (fcp) simulator

  fcp is one of close-packing structures with ~74% theoretical efficiency, 
  same with hexagonal cubic packing (hcp) structure.

    Volume of a unit cell = 16 * sqrt(2) * (radius ^ 3)
    No. of spheres in one unit cell = 4

  This script/module calculates maximum no. of spheres added to a cuboid with 
  fcp structures. 

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

"""
import math

class fcp:
    def __init__(self,param):
        self.l=param['length']
        self.w=param['width']
        self.h=param['height']
        self.r=param['radius']
        self.welcome()
        
    def welcome(self):
        print("Entering fcp estimation -")
        print()
        print("Radius    :",self.r)
        print("Length    :",self.l)
        print("Width     :",self.w)
        print("Height    :",self.h)
        print()
        
    def count(self,i,j):
        # Counting the no. of spheres in certain rows 
        if (i%3==0 and j%2==0) or (i%3==1 and j%2==1) or (i%3==2 and j%2==0):
            return int(self.l/(2* self.r))
        else:
            return int((self.l - self.r)/(2* self.r))

    def eval_theory(self):
        print("Theoretical fcp estimation :")

        volume_container = self.l*self.w*self.h
        volume_unitcell = 16 * math.sqrt(2) * math.pow(self.r,3)
        print("    Volume of container:",volume_container)
        print("    Volume of single unit cell:",volume_unitcell)
        print("    No. of spheres in one unit cell is 4.")
        
        count = int(volume_container / volume_unitcell) *4
        print("    No. of spheres in the container is ",count,"by FCP theory.")
        print()
        return count

    def eval_model(self):
        print("Building fcp models:")

        # Constant: each layer is separated by sqrt(8/3) * radius
        layer_sep = math.sqrt(8/3) * self.r
        print("    Separation between layers:",layer_sep)
        
        # For height n, max. no. of layers ranges from 1(h = 2r) to
        # n(h = 2r + (n-1)separation)
        # max_layers should be an integer
        max_layers = int((self.h - (2*self.r))/layer_sep) + 1

        lastword = "layer" if max_layers == 1 else "layers"
        print("    This container can store a max of",max_layers,
            lastword+".")

        # Constant: each row in the same layer is separated by sqrt(3)*radius
        row_sep = math.sqrt(3) * self.r
        print("    Separation between rows of spheres within a layer:",
            row_sep)

        # Accumulate the total numbers of spheres
        count = 0

        # Adjust the allowed length for different layers
        for i in range(0, max_layers):

            # case of different layers:
            if i%3 == 0:
                max_rows = int((self.w - (2*self.r))/row_sep) + 1
            elif i%3 == 1:
                max_rows = int((self.w - math.sqrt(1/3)*self.r - 
                    (2*self.r))/row_sep) + 1
            else:
                max_rows = int((self.w - 2*math.sqrt(1/3)*self.r - 
                    (2*self.r))/row_sep) + 1

            # Accumulate the total numbers of spheres in a layer
            layer_count = 0

            for j in range(0, max_rows):
                layer_count = layer_count + self.count(i,j)

            lastword = "sphere" if layer_count ==1 else "spheres"
            print("        Layer",i+1,"has",max_rows,"rows and a total of ",
                layer_count, lastword+".")
            count = count + layer_count

        print("    No. of sphere in the container is ",count,"by HCP model.")
        print()
        print("---------------------------------------------------------------------------")
        return count
