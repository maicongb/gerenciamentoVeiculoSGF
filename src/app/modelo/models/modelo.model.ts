import { CategoriaVeiculo } from './../../categoria-veiculo/models/categoria-veiculo.model';
import { MarcaVeiculo } from './../../marca/models/marca.model';

export class ModeloVeiculo {
    id?:number;
    nome:string;
    potencia: string;
    tanque: number;
    importado: string
    ativo:number;
    marcaVeiculo: MarcaVeiculo;
    categoriaVeiculo: CategoriaVeiculo;
   
    
    public constructor(init?: Partial<ModeloVeiculo>){
      Object.assign(this, init);
    } 

}


