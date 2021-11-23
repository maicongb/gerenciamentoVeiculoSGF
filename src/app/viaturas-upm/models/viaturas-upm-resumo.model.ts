import { UpmId } from '../../upm/models/upm-id.model';

export class ViaturasUpmResumo {
  
    upm?: UpmId;
      
    public constructor(init?: Partial<ViaturasUpmResumo>){
      Object.assign(this, init);
    } 
    
}
