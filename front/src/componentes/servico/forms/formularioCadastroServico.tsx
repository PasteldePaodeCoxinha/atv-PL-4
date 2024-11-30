/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import "./formularioCadastroServico.css"
import Servico from "../../../modelo/servico";

type props = {
    servicos: Servico[]
}

export default function FormularioCadastroServico(props: props) {
    const [nome, setNome] = useState<string>("")
    const [preco, setPreco] = useState<number>(0)

    const mudarValorNome = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNome(e.target.value)
    }

    const mudarValorPreco = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreco(Number(e.target.value).valueOf())
    }


    const adicionarServico = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (props.servicos.find(p => p.nome === nome)) {
            alert("Esse servico já está registrado")
            return
        }

        const servico = new Servico(nome, preco)

        props.servicos.push(servico)

        setNome("")
        setPreco(0)
    }

    return (
        <div className="containerFormularioServico">
            <form className="formularioServico" onSubmit={adicionarServico}>

                <div className="linhaFormularioCadastroServico">

                    <input type="text"
                        className="inputServicoForms"
                        placeholder="Nome"
                        value={nome}
                        onChange={mudarValorNome}
                        required
                    />

                    <input type="number"
                        className="inputServicoForms"
                        placeholder="Porduto"
                        value={preco}
                        onChange={mudarValorPreco}
                        required

                    />

                </div>

                <div className="containerBotaoCadastrarServico">
                    <button className="botaoCadastrarServico">CADASTRAR</button>
                </div>
            </form>

        </div>
    )

}