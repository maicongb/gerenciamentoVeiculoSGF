export class MotivoBaixaViaturaFilter {
    nome: string;
    ativo: number;

    public constructor(init?: Partial<MotivoBaixaViaturaFilter>){
        Object.assign(this, init);
    }

}