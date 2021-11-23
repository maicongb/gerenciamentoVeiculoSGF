import { TipoVeiculo } from './../../tipo-veiculo/models/tipo-veiculo.model';

export class MarcaVeiculo {
    id?:number;
    nome:string;
    abreviacao: string;
    ativo:number;
    tipoVeiculo: TipoVeiculo;
   
    
    public constructor(init?: Partial<MarcaVeiculo>){
      Object.assign(this, init);
    } 

}

