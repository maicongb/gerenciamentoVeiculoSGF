export class Upm {
  
    id?:number;
    sigla?:string;
    nome?: string;
      
    public constructor(init?: Partial<Upm>){
      Object.assign(this, init);
    } 
    
}


