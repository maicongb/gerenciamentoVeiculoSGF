export class ViaturaPesquisa {

    id?: number;
    prefixo: string;
    placa: string;
    placaVinculada?: string;
    tombamento?: string;
    tipoVeiculo: string;
    marcaVeiculo: string;
    modeloVeiculo: string;
    odometro: number;
    odometroFinal: number;
    dtProximaRevisao: Date;

    odometroProximaRevisao: number;
    ativo: number;
    statusVistoriaViatura: string;
    statusViatura: string;
    upm: string;
    motivoBaixa: string;
    codigo: string;
    
  
    public constructor(init?: Partial<ViaturaPesquisa>){
      Object.assign(this, init);
    } 

}