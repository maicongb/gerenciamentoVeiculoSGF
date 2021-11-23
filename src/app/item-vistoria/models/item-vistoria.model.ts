import { TipoVistoria } from './../../tipo-vistoria/models/tipo-vistoria.model';

export class ItemVistoria {
    id?:number;
    nome:string;
    ativo:number;
    tipoVistoria: TipoVistoria;
   
    
    public constructor(init?: Partial<ItemVistoria>){
      Object.assign(this, init);
    } 

}

