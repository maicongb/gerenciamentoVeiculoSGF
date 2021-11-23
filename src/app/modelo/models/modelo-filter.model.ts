export class ModeloFilter {
    nome: string;
    ativo: number;

    public constructor(init?: Partial<ModeloFilter>){
        Object.assign(this, init);
    }

}