import { CategoriaVeiculo } from './../../categoria-veiculo/models/categoria-veiculo.model';
import { MarcaVeiculo } from './../../marca/models/marca.model';

export class ModeloVeiculoIdInput {
    id:number;
  
    public constructor(init?: Partial<ModeloVeiculoIdInput>){
      Object.assign(this, init);
    } 

}


