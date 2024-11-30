import Cliente from "./cliente"
import Produto from "./produto"
import Servico from "./servico"

export default class Empresa {
    private clientes: Cliente[]
    private produtos: Produto[]
    private servicos: Servico[]
    constructor() {
        this.clientes = []
        this.produtos = []
        this.servicos = []
    }

    public get getClientes() {
        return this.clientes
    }
    public set setClientes(clientes: Cliente[]) {
        this.clientes = clientes
    }

    public get getProdutos() {
        return this.produtos
    }
    public set setProdutos(produtos: Produto[]) {
        this.produtos = produtos
    }

    public get getServicos() {
        return this.servicos
    }
    public set setServicos(servicos: Servico[]) {
        this.servicos = servicos
    }

}