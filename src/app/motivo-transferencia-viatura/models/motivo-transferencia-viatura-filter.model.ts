export class MotivoTransferenciaViaturaFilter {
    nome: string;
    ativo: number;

    public constructor(init?: Partial<MotivoTransferenciaViaturaFilter>){
        Object.assign(this, init);
    }

}