
export interface DrugInfo {
  drugClass: string;
  genericName: string;
  brandNames: string[];
  mechanismOfAction: string;
  uses: string[];
  sideEffects: string[];
  adverseReactions: string[];
  error?: string; 
}
   