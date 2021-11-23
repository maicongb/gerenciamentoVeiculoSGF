export class UfPlaca {
  id:number;
  sigla: string;
  nome: string;
  
  public constructor(init?: Partial<UfPlaca>){
    Object.assign(this, init);
  } 

}
