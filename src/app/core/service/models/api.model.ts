import { Endpoint } from './endpoint.model';

export interface Api {
    apiVersion: string;
    _links: {
      orcamentos: Endpoint;
      orcamentosAnuaisSearch: Endpoint;
      orcamentosAnuaisByAno: Endpoint;
      horaVoluntaria: Endpoint;
      horaVoluntariaSearch: Endpoint;
      tipoVeiculo: Endpoint; 
      tipoVeiculoSearch: Endpoint;

    };
}
