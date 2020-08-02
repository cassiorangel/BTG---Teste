export class Cliente{
    id: string;
    nome: string;
    cpf: number;
    cep: number;
    logradouro: string;
    bairro: string;
    estado: {
      uf: string
    };
    cidade: {
        localidade: string;
    };   
}