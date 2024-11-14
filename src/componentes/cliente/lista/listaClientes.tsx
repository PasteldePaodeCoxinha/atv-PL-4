import { useCallback, useEffect, useState } from "react";
import "./listaClientes.css"
import Cliente from "../../../modelo/cliente";
import AlterarCliente from "../alterar/alterarCliente";

export default function ListaCliente() {
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [cliente, setCliente] = useState<Cliente | undefined>(undefined)
    const [ordemLista, setOrdemLista] = useState<number>(0)

    const pegarUmCliente = useCallback((nomeEscolhido: string) => {
        const cliente = clientes.find(c => c.nome === nomeEscolhido)
        setCliente(cliente)
    }, [clientes])

    const excluirCliente = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, nome: string) => {
        setClientes(clientes.filter(c => c.nome !== nome))
        e.stopPropagation()
    }, [clientes])

    const gerarListaCliente = useCallback(() => {
        if (clientes.length <= 0) {
            return <></>
        } else {
            let clientesTemp = clientes

            if (ordemLista === 0) {
                clientesTemp = clientes
            } else if (ordemLista === 1) {
                clientesTemp = clientes.toSorted((a, b) => b.getProdutosConsumidos.length - a.getProdutosConsumidos.length)
            } else if (ordemLista === 2) {
                clientesTemp = clientes.toSorted((a, b) => b.getServicosConsumidos.length - a.getServicosConsumidos.length)
            } else if (ordemLista === 3) {
                clientesTemp = clientes.toSorted((a, b) => b.getValorGasto - a.getValorGasto)
            }

            let listaCliente = clientesTemp.map((c, i) =>
                <tr className="linhaTabelaClientes" key={i} onClick={() => pegarUmCliente(c.nome)
                }>
                    <td>{c.nome}</td>
                    <td>{c.nomeSocial}</td>
                    <td><button className="botaExcluirCliente" onClick={(e) => excluirCliente(e, c.nome)}>Excluir</button></td>
                </tr>
            )
            return listaCliente
        }
    }, [ordemLista, clientes, excluirCliente, pegarUmCliente])

    const getClientes = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:32831/cliente/clientes", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })

            const data = await response.json()

            if (response.status === 302) {
                setClientes(data)
            } else {
                alert(data)
            }

        } catch (error) {
            alert((error as Error).message)
        }
    }, [])

    useEffect(() => {
        gerarListaCliente()
    }, [gerarListaCliente])

    useEffect(() => {
        getClientes()
    }, [getClientes])

    return (
        <div className="containerListaCliente">
            {cliente === undefined ? (
                <div className="clientesCadastrados">
                    <select className="seletorOrdemListaCliente"
                        onChange={e => setOrdemLista(Number(e.target.value).valueOf())}
                    >
                        <option value={0}>Ordenar por ordem cadastrado</option>
                        <option value={1}>Ordenar por qtd produtos consumidos</option>
                        <option value={2}>Ordenar por qtd serviços consumidos</option>
                        <option value={3}>Ordenar por valor gasto</option>
                    </select>

                    <table className="tabelaClientes">
                        <thead>
                            <tr className="headerTabelaClientes">
                                <th>Nome</th>
                                <th>Nome Social</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gerarListaCliente()}
                        </tbody>
                    </table>
                </div>

            ) : (

                <>
                    <button className="botaVoltarListagemCliente" onClick={() => { setCliente(undefined) }}>
                        Voltar
                    </button>
                    <AlterarCliente cliente={cliente} />
                </>

            )}
        </div>
    )

}