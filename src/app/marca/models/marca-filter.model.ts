export class MarcaFilter {
    nome: string;
    ativo: number;

    public constructor(init?: Partial<MarcaFilter>){
        Object.assign(this, init);
    }

}