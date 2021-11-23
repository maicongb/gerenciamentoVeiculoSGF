export class MotivoBaixaViatura {
    id?:number;
    nome:string;
    ativo:number;
    
    public constructor(init?: Partial<MotivoBaixaViatura>){
      Object.assign(this, init);
    } 

}

