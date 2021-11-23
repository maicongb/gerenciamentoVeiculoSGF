
export class Policial {
  id?: number;
  login?: string;
  nomeCompletoCpf?: string;

  public constructor(init?: Partial<Policial>){
    Object.assign(this, init);
  }
}
