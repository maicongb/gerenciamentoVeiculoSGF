export class TipoVeiculo {
    id?:number;
    nome:string;
    ativo:number;
    
    public constructor(init?: Partial<TipoVeiculo>){
      Object.assign(this, init);
    } 

}

