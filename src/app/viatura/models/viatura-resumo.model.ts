export class ViaturaResumo {

    id?: string;
    placa: string;
  
    public constructor(init?: Partial<ViaturaResumo>){
      Object.assign(this, init);
    } 

}

