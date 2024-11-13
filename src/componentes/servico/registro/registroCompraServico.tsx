import { useState } from "react";
import Cliente from "../../../modelo/cliente";
import Servico from "../../../modelo/servico";
import "./registroCompraServico.css"
import Pet from "../../../modelo/pet";

type props = {
    clientes: Cliente[],
    servicos: Servico[]
}

export default function RegistroCompraServico(props: props) {
    const [cliente, setCliente] = useState<Cliente | undefined>(undefined)
    const [servico, setServico] = useState<Servico | undefined>(undefined)
    const [pet, setPet] = useState<Pet | undefined>(undefined)
    const [textoAviso, setTextoAviso] = useState<string>("Selecione um servico!")
    const [nomeServico, setNomeServico] = useState<string>("")
    const [nomePet, setNomePet] = useState<string>("")
    const [qtdServicos, setQtdServicos] = useState<number>(0)

    const selecionarCliente = (n: string) => {
        const cliente = props.clientes.find(c => c.nome === n)
        if (cliente) {
            setCliente(cliente)
        }
    }

    const registrarCompra = () => {
        if (cliente && servico && pet) {
            for (let i = 0; i < qtdServicos; i++) {
                const clienteTemp = cliente
                const servicoTemp = servico
                const petTemp = pet

                clienteTemp.getServicosConsumidos.push(servicoTemp)
                clienteTemp.setValorGasto = clienteTemp.getValorGasto + Number(((servicoTemp.preco * 100) * 0.01).toFixed(2)).valueOf()
                servicoTemp.compraramMaisUm()
                servicoTemp.getRacasCompraram.push([petTemp.getTipo, petTemp.getRaca])

                setCliente(clienteTemp)
                setServico(servicoTemp)
                setPet(petTemp)
            }
        } else {
            setTextoAviso("Preencha todos os campos!")
            return
        }

        setTextoAviso("Compra registrada!")
        setServico(undefined)
        setQtdServicos(0)
        setNomeServico("")
        setNomePet("")

        setTimeout(() => {
            setTextoAviso("Selecione um servico!")
        }, 1500)
    }

    return (
        <div className="containerRegistroServico">

            <div className="containerTabelaResgistroServico">
                {!cliente ? (
                    <table className="tabelaRegistroServicoClientes">
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
                    <div className="menuRegistroCompraServico">
                        <button className="botaVoltarRegistroServico" onClick={() => setCliente(undefined)}>
                            Voltar
                        </button>

                        <p className="textoAvisoRegistroServico">{textoAviso}</p>

                        <p className="textoAvisoRegistroServico">{cliente.nome}</p>

                        <div className="containerSeletorServico">
                            <select className="seletorServico"
                                onChange={e => {
                                    setServico(props.servicos.find(p => p.nome === e.target.value))
                                    setNomeServico(e.target.value)
                                }}
                                value={nomeServico}
                            >
                                <option value="" disabled>Selecione o servico</option>
                                {props.servicos.map((p, i) => {
                                    return (
                                        <option
                                            value={p.nome}
                                            key={i}>
                                            {p.nome}
                                        </option>
                                    )
                                })}
                            </select>

                            <select className="seletorServico"
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
                                className="qtdServicosEscolher"
                                value={qtdServicos}
                                onChange={e => {
                                    setQtdServicos(Number(e.target.value).valueOf())
                                }}
                            />
                        </div>

                        <button className="botaResgitrarCompraServico"
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