Source codes for sphere packing evaluator
===========================================

<h3>Python 3.6 is required for executing the source scripts.</h3>

<b>"main.py" is the main program</b>

 The files in this directory are used for calculating the maximum no. of certain balls/spheres that
 can be stored into a cuboid-shaped container. No balls/spheres are chopped, or
 partially left outside the container.

 The cubic system used here is hexagonal cubic structure(h.c.c.).
 Along with face-centered cubic structure(f.c.c.), both provide identical and
 the higghest packing efficiencies (~74%).

**********************************************************************

<h3>"scp.py" is Simple cubic packing (scp) simulator</h3>
 
  scp is the simplest packing structure. Each sphere is
  coordinated by max. 6 neighbouring spheres.

    Volume of a unit cell = 2 * (radius ^ 3)
    No. of spheres in one unit cell = 1

**********************************************************************

<h3>"hcp.py" is Hexagonal cubic packing (hcp) simulator</h3>

  hcp is one of close-packing structures with ~74% theoretical efficiency, 
  same with face-centered cubic packing (fcp) structure.

    Volume of a unit cell = 24 * sqrt(2) * (radius ^ 3)
    No. of spheres in one unit cell = 6 

**********************************************************************

<h3>"fcp.py" is Face-centered cubic packing (fcp) simulator</h3>

  fcp is one of close-packing structures with ~74% theoretical efficiency, 
  same with hexagonal cubic packing (hcp) structure.

    Volume of a unit cell = 16 * sqrt(2) * (radius ^ 3)
    No. of spheres in one unit cell = 4



