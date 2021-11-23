export class MotivoExclusaoViatura {
    id?:number;
    nome:string;
    ativo:number;
    
    public constructor(init?: Partial<MotivoExclusaoViatura>){
      Object.assign(this, init);
    } 

}

