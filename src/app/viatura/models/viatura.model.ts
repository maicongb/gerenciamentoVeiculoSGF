import { UfPlaca } from './../../uf-placa/models/uf-placa';
import { TipoViatura } from './../../tipo-viatura/models/tipo-viatura.model';
import { ModeloVeiculo } from './../../modelo/models/modelo.model';
import { TipoCombustivel } from './../../tipo-combustivel/models/tipo-combustivel.model';

export class Viatura {

    id?: string;
    prefixo: string;
    anoFabricacao: number;
    anoModelo: number;
    placa: string;
    ufPlaca: UfPlaca;
    chassi: string;
    renavam: string;
    numeroMotor: string;
    tipoCombustivel: TipoCombustivel;
    cor: string;
    odometro: number;
    modeloVeiculo: ModeloVeiculo;
    dtProximaRevisao: Date;
    odometroProximaRevisao: number;
    tipoViatura: TipoViatura;
    statusViatura: string;
    motivoExclusao: string;
    dtAquisicao: Date;
    dtInclusao: Date;
    dtExclusao?: Date;
    numeroSei: string;
    tombamento: string;
    observacaoExclusao?: string;
    siglaUpm?: string;
    ativo: number;

   
    public constructor(init?: Partial<Viatura>){
      Object.assign(this, init);
    } 

}


