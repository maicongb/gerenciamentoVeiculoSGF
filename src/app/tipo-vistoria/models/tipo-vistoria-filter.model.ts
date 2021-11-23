export class TipoVistoriaFilter {
    nome: string;
    ativo: number;

    public constructor(init?: Partial<TipoVistoriaFilter>){
        Object.assign(this, init);
    }

}