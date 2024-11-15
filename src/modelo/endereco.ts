// export default class Endereco {
//     public estado: string;
//     private cidade: string;
//     private bairro: string;
//     private rua: string;
//     private numero: string;
//     private codigoPostal: string;
//     private informacoesAdicionais?: string

//     constructor(estado: string, cidade: string, bairro: string, rua: string, numero: string, codigoPostal: string, informacoesAdicionais?: string) {
//         this.estado = estado
//         this.cidade = cidade
//         this.bairro = bairro
//         this.rua = rua
//         this.numero = numero
//         this.codigoPostal = codigoPostal
//         this.informacoesAdicionais = informacoesAdicionais
//     }

//     public get getCidade(): string {
//         return this.cidade
//     }
//     public set setCidade(cidade: string) {
//         this.cidade = cidade;
//     }

//     public get getBairro(): string {
//         return this.bairro
//     }
//     public set setBairro(bairro: string) {
//         this.bairro = bairro;
//     }

//     public get getRua(): string {
//         return this.rua
//     }
//     public set setRua(rua: string) {
//         this.rua = rua;
//     }

//     public get getNumero(): string {
//         return this.numero
//     }
//     public set setNumero(numero: string) {
//         this.numero = numero;
//     }

//     public get getCodigoPostal(): string {
//         return this.codigoPostal
//     }
//     public set setCodigoPostal(codigoPostal: string) {
//         this.codigoPostal = codigoPostal;
//     }

//     public get getInformacoesAdicionais(): string | undefined {
//         return this.informacoesAdicionais
//     }
//     public set setInformacoesAdicionais(informacoesAdicionais: string) {
//         this.informacoesAdicionais = informacoesAdicionais;
//     }
// }

export default interface Endereco {
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    codigoPostal: string;
    informacoesAdicionais?: string
}