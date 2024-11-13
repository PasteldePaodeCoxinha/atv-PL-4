import React, { useCallback, useEffect, useState } from "react";
import "./listaPets.css"
import Cliente from "../../../modelo/cliente";
import Pet from "../../../modelo/pet";
import AlterarPet from "../alterar/alterarPet";


type props = {
    clientes: Cliente[]
}

export default function ListaPet(props: props) {
    const [pets, setPets] = useState<Pet[]>([])
    const [cliente, setCliente] = useState<Cliente | undefined>(undefined)
    const [pet, setPet] = useState<Pet | undefined>(undefined)
    const [nomeCliente, setNomeCliente] = useState<string>("")

    const pegarUmPet = useCallback((nome: string) => {
        if (cliente) {
            const pet = cliente.getPets.find(p => p.getNome === nome)
            setPet(pet)
        }
    }, [cliente])

    const procurarCliente = () => {
        const cliente = props.clientes.find(c => c.nome === nomeCliente)
        if (cliente) {
            setCliente(cliente)
            setPets(cliente.getPets)
        }
    }

    const excluirPet = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, nome: string) => {
        if (cliente) {
            cliente.setPets = pets.filter(p => p.getNome !== nome)
            setPets(pets.filter(p => p.getNome !== nome))
            e.stopPropagation()
        }
    }, [pets, cliente])

    const gerarListaPet = useCallback(() => {
        if (pets.length <= 0) {
            return <></>
        } else {
            let listaPet = pets.map((p, i) =>
                <tr className="linhaTabelaPets" key={i} onClick={() => pegarUmPet(p.getNome)}>
                    <td>{p.getNome}</td>
                    <td>{p.getTipo}</td>
                    <td>{p.getGenero}</td>
                    <td><button className="botaExcluirPet" onClick={(e) => excluirPet(e, p.getNome)}>Excluir</button></td>
                </tr>
            )
            return listaPet
        }
    }, [pets, excluirPet, pegarUmPet])

    useEffect(() => {
        gerarListaPet()
    }, [gerarListaPet])

    return (
        <div className="containerListaPet">
            {pet === undefined ? (
                <>
                    <div className="procurarCliente">
                        <select className="seletorClienteListaPet"
                            onChange={e => setNomeCliente(e.target.value)}
                            value={nomeCliente}>
                            <option value="" disabled>Selecione o dono</option>
                            {props.clientes.map((c, i) => {
                                return (
                                    <option
                                        value={c.nome}
                                        key={i}>
                                        {c.nome}
                                    </option>
                                )
                            })}
                        </select>

                        <button className="botaoProcurarCliente" onClick={procurarCliente}>
                            Procurar
                        </button>
                    </div>

                    {cliente !== undefined ? (
                        <div className="petsCadastrados">
                            <table className="tabelaPets">
                                <thead>
                                    <tr className="headerTabelaPets">
                                        <th>Nome</th>
                                        <th>Tipo</th>
                                        <th>Genêro</th>
                                        <th>Excluir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gerarListaPet()}
                                </tbody>
                            </table>
                        </div>

                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <>
                    <button className="botaVoltarListagemCliente" onClick={() => setPet(undefined)}>
                        Voltar
                    </button>

                    <AlterarPet pet={pet} />
                </>
            )

            }
        </div>
    )

}