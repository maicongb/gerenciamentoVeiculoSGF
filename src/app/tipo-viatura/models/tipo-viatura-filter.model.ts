export class TipoViaturaFilter {
    nome: string;
    ativo: number;

    public constructor(init?: Partial<TipoViaturaFilter>){
        Object.assign(this, init);
    }

}