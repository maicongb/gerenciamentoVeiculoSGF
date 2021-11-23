export class MotivoTransferenciaViatura {
    id?:number;
    nome:string;
    ativo:number;
    
    public constructor(init?: Partial<MotivoTransferenciaViatura>){
      Object.assign(this, init);
    } 

}

