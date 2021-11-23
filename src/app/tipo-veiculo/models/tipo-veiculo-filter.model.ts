export class TipoVeiculoFilter {
    nome: string;
    ativo: number;

    public constructor(init?: Partial<TipoVeiculoFilter>){
        Object.assign(this, init);
    }

}