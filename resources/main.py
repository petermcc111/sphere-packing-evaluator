"""
 This script is used to calculate the maximum no. of certain balls/spheres that
 can be stored into a cuboid-shaped container. No balls/spheres are chopped, or
 partially left outside the container.

 The cubic system used here is hexagonal cubic structure(h.c.c.).
 Along with face-centered cubic structure(f.c.c.), both provide identical and
 the higghest packing efficiencies (~74%).

"""

import runtime

# user input
class Input():
    def __init__(self):
        self.welcome()

        self.radius = input("1. Radius of spheres :")
        while self.num(self.radius) is not True:
            print("Please enter a valid radius value!")
            self.radius = input("1. Radius of spheres :")

        self.length = input("2. Container length  :")
        while self.num(self.length) is not True:
            print("Please enter a valid length value!")
            self.length = input("2. Container length  :")

        self.width  = input("3. Container width   :")
        while self.num(self.width) is not True:
            print("Please enter a valid width value!")
            self.width  = input("3. Container width   :")

        self.height = input("4. Container height  :")
        while self.num(self.height) is not True:
            print("Please enter a valid height value!")
            self.height = input("4. Container height  :")

        l = float(self.length)
        w = float(self.width)
        h = float(self.height)
        r = float(self.radius)
        self.param = {"length":l,"width":w,"height":h,"radius":r}

        self.execute()

        #self.select = input("Set:")
    def welcome(self):
        print("Capacity estimation for spherical objects")
        print("Developed by Peter Chau")
        print("Last updated: 9 Jun 2018")
        print()
        print("---------------------------------------------------------------------------")
        print("Please enter the following parameters:")

    def num(self,i):
        try:
            o = float(i)
            return True
        except ValueError:
            return False

    def execute(self):
        print("The system is now transferring the input - ")
        print()
        print("---------------------------------------------------------------------------")
        
        getRuntime = runtime.runtime(self.param)

getNew = Input()


    
