export class CategoriaVeiculo {
    id?: number;
    nome: string;
    ativo: number;
    
    public constructor(init?: Partial<CategoriaVeiculo>){
      Object.assign(this, init);
    } 
}