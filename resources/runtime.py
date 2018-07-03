"""
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
"""
import fcp
import hcp
import scp
import final

class runtime:
    def __init__(self,param):
        self.param = param
        self.runtime()

    def welcome(self):
        print("Entering estimation runtime -")
        print()

    def avail(self):
        obj = self.param
        if obj["length"] >= 2 * obj["radius"]:
            if obj["width"] >= 2 * obj["radius"]:
                if obj["height"] >= 2 * obj["radius"]:
                    return True
                else:
                    return False
            else:
                return False
        else:
            return False

    def noball():
        print("No spheres can be stored because of limited space.")

    def runtime(self):
        self.welcome()

        if self.avail():
            # More methods can be added into this section
            scpMethod = scp.scp(self.param)
            scp_theory = scpMethod.eval_theory()
            scp_model = scpMethod.eval_model()

            hcpMethod = hcp.hcp(self.param)
            hcp_theory = hcpMethod.eval_theory()
            hcp_model = hcpMethod.eval_model()

            fcpMethod = fcp.fcp(self.param)
            fcp_theory = fcpMethod.eval_theory()
            fcp_model = fcpMethod.eval_model()

            res = [
                {"method":"scp","theory":scp_theory,"model":scp_model},
                {"method":"hcp","theory":hcp_theory,"model":hcp_model},
                {"method":"fcp","theory":fcp_theory,"model":fcp_model}
            ]

            getFinal = final.final(res)
        else:
            self.noball()
