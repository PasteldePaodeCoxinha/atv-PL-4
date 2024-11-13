/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from "react";
import "./listaProdutos.css"
import Produto from "../../../modelo/produto";
import AlterarProduto from "../alterar/alterarProduto";
import Cliente from "../../../modelo/cliente";

type props = {
    produtos: Produto[]
    clientes: Cliente[]
}

export default function ListaProdutos(props: props) {
    const [produtos, setProdutos] = useState<Produto[]>(props.produtos)
    const [produto, setProduto] = useState<Produto | undefined>(undefined)
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

    const pegarUmProduto = useCallback((nome: string) => {
        const produto = props.produtos.find(c => c.nome === nome)
        setProduto(produto)
    }, [props.produtos])

    const excluirProduto = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, nome: string) => {
        setProdutos(produtos.filter(p => p.nome !== nome))
        e.stopPropagation()
    }, [produtos])

    const gerarListaProduto = useCallback(() => {
        if (produtos.length <= 0) {
            return <></>
        } else {
            let produtosTemp = produtos

            if (ordemLista === 0) {
                produtosTemp = produtos
            } else if (ordemLista === 1) {
                produtosTemp = produtos.toSorted((a, b) => b.getCompraram - a.getCompraram)
            } else if (ordemLista === 2) {
                const sortTipo = (a: Produto, b: Produto): number => {
                    return ((b.getRacasCompraram.filter(r => r[0].toLocaleLowerCase() === tipoEscolhida.toLocaleLowerCase()).length)
                        -
                        (a.getRacasCompraram.filter(r => r[0].toLocaleLowerCase() === tipoEscolhida.toLocaleLowerCase()).length))
                }
                produtosTemp = produtos.toSorted(sortTipo)

                if (racaEscolhida !== "") {
                    const sortRaca = (a: Produto, b: Produto): number => {
                        return ((b.getRacasCompraram.filter(r => r[1].toLocaleLowerCase() === racaEscolhida.toLocaleLowerCase()).length)
                            -
                            (a.getRacasCompraram.filter(r => r[1].toLocaleLowerCase() === racaEscolhida.toLocaleLowerCase()).length))
                    }
                    produtosTemp = produtos.toSorted(sortRaca)
                }
            }

            let listaProduto = produtosTemp.map((p, i) =>
                <tr className="linhaTabelaProdutos" key={i} onClick={() => pegarUmProduto(p.nome)
                }>
                    <td>{p.nome}</td>
                    <td>R$ {((p.preco * 100) * 0.01).toFixed(2).replace(".", ",")}</td>
                    <td><button className="botaExcluirProduto" onClick={(e) => excluirProduto(e, p.nome)}>Excluir</button></td>
                </tr>
            )
            return listaProduto
        }
    }, [produtos, ordemLista, racaEscolhida, tipoEscolhida, excluirProduto, pegarUmProduto])

    useEffect(() => {
        gerarListaProduto()
    }, [gerarListaProduto])

    return (
        <div className="containerListaProduto">
            {produto === undefined ? (
                <div className="produtosCadastrados">

                    <select className="seletorOrdemListaProduto"
                        onChange={e => setOrdemLista(Number(e.target.value).valueOf())}
                    >
                        <option value={0}>Ordenar por ordem cadastrado</option>
                        <option value={1}>Ordenar mais vendidos</option>
                        <option value={2}>Ordenar por mais consumidos por tipo e raça</option>
                    </select>

                    {ordemLista === 2 ? (
                        <div className="seletoresDeTipoRacaProduto">
                            <select className="seletorOrdemListaProduto"
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

                            <select className="seletorOrdemListaProduto"
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

                    <table className="tabelaProdutos">
                        <thead>
                            <tr className="headerTabelaProdutos">
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gerarListaProduto()}
                        </tbody>
                    </table>
                </div>

            ) : (

                <>
                    <button className="botaVoltarListagemProduto" onClick={() => setProduto(undefined)}>
                        Voltar
                    </button>
                    <AlterarProduto produto={produto} listaTipos={listaTipos} listaRacas={listaRacas} />
                </>

            )}
        </div>
    )
}