export class MotivoExclusaoViaturaFilter {
    nome: string;
    ativo: number;

    public constructor(init?: Partial<MotivoExclusaoViaturaFilter>){
        Object.assign(this, init);
    }

}