import { useState } from "react";
import Cliente from "../../../modelo/cliente";
import Produto from "../../../modelo/produto";
import "./registroCompraProduto.css"
import Pet from "../../../modelo/pet";

type props = {
    clientes: Cliente[],
    produtos: Produto[]
}

export default function RegistroCompraProduto(props: props) {
    const [cliente, setCliente] = useState<Cliente | undefined>(undefined)
    const [produto, setProduto] = useState<Produto | undefined>(undefined)
    const [pet, setPet] = useState<Pet | undefined>(undefined)
    const [textoAviso, setTextoAviso] = useState<string>("Selecione um produto!")
    const [nomeProduto, setNomeProduto] = useState<string>("")
    const [nomePet, setNomePet] = useState<string>("")
    const [qtdProdutos, setQtdProdutos] = useState<number>(0)

    const selecionarCliente = (n: string) => {
        const cliente = props.clientes.find(c => c.nome === n)
        if (cliente) {
            setCliente(cliente)
        }
    }

    const registrarCompra = () => {
        if (cliente && produto && pet) {
            for (let i = 0; i < qtdProdutos; i++) {
                const clienteTemp = cliente
                const produtoTemp = produto
                const petTemp = pet

                clienteTemp.getProdutosConsumidos.push(produtoTemp)
                clienteTemp.setValorGasto = clienteTemp.getValorGasto + Number(((produtoTemp.preco * 100) * 0.01).toFixed(2)).valueOf()
                produtoTemp.compraramMaisUm()
                produtoTemp.getRacasCompraram.push([petTemp.getTipo, petTemp.getRaca])

                setCliente(clienteTemp)
                setProduto(produtoTemp)
                setPet(petTemp)
            }
        } else {
            setTextoAviso("Preencha todos os campos!")
            return
        }

        setTextoAviso("Compra registrada!")
        setProduto(undefined)
        setQtdProdutos(0)
        setNomeProduto("")
        setNomePet("")

        setTimeout(() => {
            setTextoAviso("Selecione um produto!")
        }, 1500)
    }

    return (
        <div className="containerRegistroProduto">

            <div className="containerTabelaResgistroProduto">
                {!cliente ? (
                    <table className="tabelaRegistroProdutoClientes">
                        <thead>
                            <tr>
                                <th>Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.clientes.map((c, i) => {
                                return (
                                    <tr key={i}
                                        onClick={() => selecionarCliente(c.nome)}>
                                        <td>{c.nome}</td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div className="menuRegistroCompraProduto">
                        <button className="botaVoltarRegistroProduto" onClick={() => setCliente(undefined)}>
                            Voltar
                        </button>

                        <p className="textoAvisoRegistroProduto">{textoAviso}</p>

                        <p className="textoAvisoRegistroProduto">{cliente.nome}</p>

                        <div className="containerSeletorProduto">
                            <select className="seletorProduto"
                                onChange={e => {
                                    setProduto(props.produtos.find(p => p.nome === e.target.value))
                                    setNomeProduto(e.target.value)
                                }}
                                value={nomeProduto}
                            >
                                <option value="" disabled>Selecione o produto</option>
                                {props.produtos.map((p, i) => {
                                    return (
                                        <option
                                            value={p.nome}
                                            key={i}>
                                            {p.nome}
                                        </option>
                                    )
                                })}
                            </select>

                            <select className="seletorProduto"
                                onChange={e => {
                                    setPet(cliente?.getPets.find(p => p.getNome === e.target.value))
                                    setNomePet(e.target.value)
                                }}
                                value={nomePet}
                            >
                                <option value="" disabled>Selecione o Pet</option>
                                {cliente.getPets.map((p, i) => {
                                    return (
                                        <option
                                            value={p.getNome}
                                            key={i}>
                                            {p.getNome}
                                        </option>
                                    )
                                })}
                            </select>

                            <input type="number"
                                className="qtdProdutosEscolher"
                                value={qtdProdutos}
                                onChange={e => {
                                    setQtdProdutos(Number(e.target.value).valueOf())
                                }}
                            />
                        </div>

                        <button className="botaResgitrarCompraProduto"
                            onClick={() => registrarCompra()}
                        >
                            <p>
                                Registrar
                            </p>
                        </button>
                    </div>
                )}
            </div>

        </div>
    )

}