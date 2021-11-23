export class TipoCombustivel {
    id?:number;
    nome:string;
    ativo:number;
    
    public constructor(init?: Partial<TipoCombustivel>){
      Object.assign(this, init);
    } 

}

