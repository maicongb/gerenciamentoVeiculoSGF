export class CategoriaVeiculoFilter {
    nome: string;
    ativo: number

    public constructor(init?: Partial<CategoriaVeiculoFilter>){
        Object.assign(this, init);
    }
}