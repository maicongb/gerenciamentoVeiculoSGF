import { MotivoTransferenciaViatura } from './../../motivo-transferencia-viatura/models/motivo-transferencia-viatura.model';
import { ViaturaResumo } from './../../viatura/models/viatura-resumo.model';
import { UpmId } from '../../upm/models/upm-id.model';


export class ViaturasUpm {

    id?: number;
    viatura: ViaturaResumo;
    upm?: UpmId;
    dataEntrada: Date;
    dataSaida?: Date;
    dataMovimentacao?: Date;
    numeroSei?: string;
    observacao?: string;
    motivoTransferenciaViatura?: MotivoTransferenciaViatura;

      
    public constructor(init?: Partial<ViaturasUpm>){
      Object.assign(this, init);
    } 
    
}
