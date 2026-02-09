import { Step } from "@/types";
import { create } from "zustand";

interface StepsStore {
  steps: Step[];
  updateStep: (id: number) => void;
}

const useSteps = create<StepsStore>((set) => ({
  steps: [
    { num: 1, label: "Cart", active: false, complete: true },
    { num: 2, label: "Checkout", active: true, complete: false },
    { num: 3, label: "Confirmation", active: false, complete: false },
  ],
  updateStep: (id: number) => {
    set((state) => ({
      steps : state.steps.map((step,i) => {
        if(step.num === id){
            return {...step,active : false,complete : true};
        }

        if(step.num === id + 1){
            return {...step,active : true}
        }
        return step;
      })
    }));
  },
}));

export default useSteps;
