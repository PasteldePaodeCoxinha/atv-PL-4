import { useState } from "react";
import "./alterarProduto.css"
import Produto from "../../../modelo/produto";

type props = {
    produto: Produto,
    listaTipos: string[],
    listaRacas: Array<Array<string>>
}

export default function AlterarProduto(props: props) {
    const [nome, setNome] = useState<string>(props.produto.nome)
    const [preco, setPreco] = useState<number>(props.produto.preco)

    const mudarValorNome = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.produto.nome = e.target.value
        setNome(e.target.value)
    }

    const mudarValorPreco = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.produto.preco = Number(e.target.value).valueOf()
        setPreco(Number(e.target.value).valueOf())
    }

    return (
        <div className="containerInformacoesProduto">
            <div className="campoProdutoEditavel">
                <label>Nome:</label>
                <input type="text" value={nome} onChange={mudarValorNome} />
            </div>

            <div className="campoProdutoEditavel">
                <label>Preço:</label>
                <input type="number" value={preco} onChange={mudarValorPreco} />
            </div>

            <div className="campoProdutoFixo">
                <label>Quantidade vendido:</label>
                <p>{props.produto.getCompraram}</p>
            </div>

            {props.listaTipos.map(t => {
                return (<>
                    <div className="campoProdutoFixo">
                        <label>{t} compraram:</label>
                        <p>{(props.produto.getRacasCompraram.filter(r => r[0] === t)).length}</p>
                    </div>
                    {props.listaRacas.filter(r => r[0] === t).map(ra => {
                        return (
                            <div className="subCampoProdutoFixo">
                                <label>{ra[1]} compraram:</label>
                                <p>{(props.produto.getRacasCompraram.filter(r => r[1] === ra[1])).length}</p>
                            </div>
                        )
                    })

                    }
                </>)
            })

            }

        </div>
    )

}