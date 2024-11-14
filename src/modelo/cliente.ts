// import CPF from "./cpf"
import Endereco from "./endereco"
import Pet from "./pet"
import Produto from "./produto"
// import RG from "./rg"
import Servico from "./servico"
import Telefone from "./telefone"

export default class Cliente {
    public id?: number
    public nome: string
    public nomeSocial: string
    private email: string
    private endereco: Endereco
    // private cpf: CPF
    // private rgs: Array<RG>
    // private dataCadastro: Date
    private telefones: Array<Telefone>
    private produtosConsumidos: Produto[]
    private servicosConsumidos: Servico[]
    private valorGasto: number
    private pets: Pet[]
    constructor(nome: string, nomeSocial: string, email: string, endereco: Endereco, telefones: Array<Telefone>) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.email = email
        // this.cpf = cpf
        // this.rgs = rgs
        // this.dataCadastro = new Date()
        this.endereco = endereco
        this.telefones = telefones
        this.produtosConsumidos = []
        this.servicosConsumidos = []
        this.valorGasto = 0
        this.pets = []
    }
    public get getEmail(): string {
        return this.email
    }

    public set setEmail(email: string) {
        this.email = email
    }

    // public get getCpf(): CPF {
    //     return this.cpf
    // }
    // public get getRgs(): Array<RG> {
    //     return this.rgs
    // }
    // public get getDataCadastro(): Date {
    //     return this.dataCadastro
    // }

    public get getEndereco(): Endereco {
        return this.endereco
    }

    public get getTelefones(): Array<Telefone> {
        return this.telefones
    }
    public set setTelefones(telefones: Array<Telefone>) {
        this.telefones = telefones
    }

    public get getProdutosConsumidos(): Produto[] {
        return this.produtosConsumidos
    }
    public get getServicosConsumidos(): Servico[] {
        return this.servicosConsumidos
    }

    public get getPets(): Pet[] {
        return this.pets
    }
    public set setPets(pets: Pet[]) {
        this.pets = pets
    }

    public get getValorGasto(): number {
        return this.valorGasto
    }
    public set setValorGasto(ValorGasto: number) {
        this.valorGasto = Math.floor(ValorGasto * 100) * 0.01
    }
}