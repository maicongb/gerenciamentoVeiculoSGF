export class UnidadeFederativa {
    id:number;
    nome:string;
    sigla:string;
    
    
    public constructor(init?: Partial<UnidadeFederativa>){
      Object.assign(this, init);
    } 

}
