
export class Situacao {
  id?: number;
  descricao?: string;

  public constructor(init?: Partial<Situacao>){
    Object.assign(this, init);
  }
}
