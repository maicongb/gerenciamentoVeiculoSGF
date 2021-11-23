export class TipoViatura {
    id?:number;
    nome:string;
    ativo:number;
    
    public constructor(init?: Partial<TipoViatura>){
      Object.assign(this, init);
    } 

}

