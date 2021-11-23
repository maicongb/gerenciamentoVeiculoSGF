export class TipoVistoria {
    id?:number;
    nome:string;
    ativo:number;
    
    public constructor(init?: Partial<TipoVistoria>){
      Object.assign(this, init);
    } 

}

