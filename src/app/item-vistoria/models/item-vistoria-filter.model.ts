export class ItemVistoriaFilter {
    nome: string;
    ativo: number;

    public constructor(init?: Partial<ItemVistoriaFilter>){
        Object.assign(this, init);
    }

}