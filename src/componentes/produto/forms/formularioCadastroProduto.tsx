/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import "./formularioCadastroProduto.css"
import Produto from "../../../modelo/produto";

type props = {
    produtos: Produto[]
}

export default function FormularioCadastroProduto(props: props) {
    const [nome, setNome] = useState<string>("")
    const [preco, setPreco] = useState<number>(0)

    const mudarValorNome = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNome(e.target.value)
    }

    const mudarValorPreco = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreco(Number(e.target.value).valueOf())
    }


    const adicionarProduto = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (props.produtos.find(p => p.nome === nome)) {
            alert("Esse produto já está registrado")
            return
        }

        const produto = new Produto(nome, preco)

        props.produtos.push(produto)

        setNome("")
        setPreco(0)
    }

    return (
        <div className="containerFormularioProduto">
            <form className="formularioProduto" onSubmit={adicionarProduto}>

                <div className="linhaFormularioCadastroProduto">

                    <input type="text"
                        className="inputProdutoForms"
                        placeholder="Nome"
                        value={nome}
                        onChange={mudarValorNome}
                        required
                    />

                    <input type="number"
                        className="inputProdutoForms"
                        placeholder="Porduto"
                        value={preco}
                        onChange={mudarValorPreco}
                        required

                    />

                </div>

                <div className="containerBotaoCadastrarProduto">
                    <button className="botaoCadastrarProduto">CADASTRAR</button>
                </div>
            </form>

        </div>
    )

}