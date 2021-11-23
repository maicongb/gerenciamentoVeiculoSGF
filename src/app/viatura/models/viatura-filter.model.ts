export class ViaturaFilter {
    
    prefixo: string;

    public constructor(init?: Partial<ViaturaFilter>){
        Object.assign(this, init);
    }

}