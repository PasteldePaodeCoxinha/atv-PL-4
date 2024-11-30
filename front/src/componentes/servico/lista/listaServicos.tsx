/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from "react";
import "./listaServicos.css"
import Servico from "../../../modelo/servico";
import AlterarServico from "../alterar/alterarServico";
import Cliente from "../../../modelo/cliente";

type props = {
    servicos: Servico[]
    clientes: Cliente[]
}

export default function ListaServicos(props: props) {
    const [servicos, setServicos] = useState<Servico[]>(props.servicos)
    const [servico, setServico] = useState<Servico | undefined>(undefined)
    const [ordemLista, setOrdemLista] = useState<number>(0)
    const [listaTipos, setListaTipos] = useState<string[]>([])
    const [listaRacas, setListaRacas] = useState<Array<Array<string>>>([])
    const [racaEscolhida, setRacaEscolhida] = useState<string>("")
    const [tipoEscolhida, setTipoEscolhida] = useState<string>("")

    useEffect(() => {
        props.clientes.forEach(c => {
            c.getPets.forEach(p => {
                if (!listaTipos.find(t => t === p.getTipo)) {
                    setListaTipos([...listaTipos, p.getTipo])
                }
                if (!listaRacas.find(r => r[1] === p.getRaca)) {
                    setListaRacas([...listaRacas, [p.getTipo, p.getRaca]])
                }
            })
        })
    }, [props.clientes, listaRacas, listaTipos])

    const pegarUmServico = useCallback((nome: string) => {
        const servico = props.servicos.find(c => c.nome === nome)
        setServico(servico)
    }, [props.servicos])

    const excluirServico = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, nome: string) => {
        setServicos(servicos.filter(p => p.nome !== nome))
        e.stopPropagation()
    }, [servicos])

    const gerarListaServico = useCallback(() => {
        if (servicos.length <= 0) {
            return <></>
        } else {
            let servicosTemp = servicos

            if (ordemLista === 0) {
                servicosTemp = servicos
            } else if (ordemLista === 1) {
                servicosTemp = servicos.toSorted((a, b) => b.getCompraram - a.getCompraram)
            } else if (ordemLista === 2) {
                const sortTipo = (a: Servico, b: Servico): number => {
                    return ((b.getRacasCompraram.filter(r => r[0].toLocaleLowerCase() === tipoEscolhida.toLocaleLowerCase()).length)
                        -
                        (a.getRacasCompraram.filter(r => r[0].toLocaleLowerCase() === tipoEscolhida.toLocaleLowerCase()).length))
                }
                servicosTemp = servicos.toSorted(sortTipo)

                if (racaEscolhida !== "") {
                    const sortRaca = (a: Servico, b: Servico): number => {
                        return ((b.getRacasCompraram.filter(r => r[1].toLocaleLowerCase() === racaEscolhida.toLocaleLowerCase()).length)
                            -
                            (a.getRacasCompraram.filter(r => r[1].toLocaleLowerCase() === racaEscolhida.toLocaleLowerCase()).length))
                    }
                    servicosTemp = servicos.toSorted(sortRaca)
                }
            }

            let listaServico = servicosTemp.map((p, i) =>
                <tr className="linhaTabelaServicos" key={i} onClick={() => pegarUmServico(p.nome)
                }>
                    <td>{p.nome}</td>
                    <td>R$ {((p.preco * 100) * 0.01).toFixed(2).replace(".", ",")}</td>
                    <td><button className="botaExcluirServico" onClick={(e) => excluirServico(e, p.nome)}>Excluir</button></td>
                </tr>
            )
            return listaServico
        }
    }, [servicos, ordemLista, racaEscolhida, tipoEscolhida, excluirServico, pegarUmServico])

    useEffect(() => {
        gerarListaServico()
    }, [gerarListaServico])

    return (
        <div className="containerListaServico">
            {servico === undefined ? (
                <div className="servicosCadastrados">

                    <select className="seletorOrdemListaServico"
                        onChange={e => setOrdemLista(Number(e.target.value).valueOf())}
                    >
                        <option value={0}>Ordenar por ordem cadastrado</option>
                        <option value={1}>Ordenar mais vendidos</option>
                        <option value={2}>Ordenar por mais consumidos por tipo e raça</option>
                    </select>

                    {ordemLista === 2 ? (
                        <div className="seletoresDeTipoRacaServico">
                            <select className="seletorOrdemListaServico"
                                onChange={e => setTipoEscolhida(e.target.value)}
                                value={tipoEscolhida}
                            >
                                <option value="" disabled>Selecione o tipo do pet</option>
                                {listaTipos.map(t => {
                                    return (
                                        <option value={t}>{t}</option>
                                    )
                                })
                                }
                            </select>

                            <select className="seletorOrdemListaServico"
                                onChange={e => setRacaEscolhida(e.target.value)}
                                value={racaEscolhida}
                            >
                                <option value="" disabled>Selecione a raça do pet</option>
                                {listaRacas.filter(r => r[0] === tipoEscolhida).map(t => {
                                    return (
                                        <option value={t[1]}>{t[1]}</option>
                                    )
                                })

                                }
                            </select>
                        </div>
                    ) : (
                        <></>
                    )

                    }

                    <table className="tabelaServicos">
                        <thead>
                            <tr className="headerTabelaServicos">
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gerarListaServico()}
                        </tbody>
                    </table>
                </div>

            ) : (

                <>
                    <button className="botaVoltarListagemServico" onClick={() => setServico(undefined)}>
                        Voltar
                    </button>
                    <AlterarServico servico={servico} listaTipos={listaTipos} listaRacas={listaRacas} />
                </>

            )}
        </div>
    )
}