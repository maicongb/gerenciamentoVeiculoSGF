export class TipoCombustivelFilter {
    nome: string;
    ativo: number;

    public constructor(init?: Partial<TipoCombustivelFilter>){
        Object.assign(this, init);
    }

}