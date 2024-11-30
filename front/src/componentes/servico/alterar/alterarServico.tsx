import { useState } from "react";
import "./alterarServico.css"
import Servico from "../../../modelo/servico";

type props = {
    servico: Servico,
    listaTipos: string[],
    listaRacas: Array<Array<string>>
}

export default function AlterarServico(props: props) {
    const [nome, setNome] = useState<string>(props.servico.nome)
    const [preco, setPreco] = useState<number>(props.servico.preco)

    const mudarValorNome = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.servico.nome = e.target.value
        setNome(e.target.value)
    }

    const mudarValorPreco = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.servico.preco = Number(e.target.value).valueOf()
        setPreco(Number(e.target.value).valueOf())
    }

    return (
        <div className="containerInformacoesServico">
            <div className="campoServicoEditavel">
                <label>Nome:</label>
                <input type="text" value={nome} onChange={mudarValorNome} />
            </div>

            <div className="campoServicoEditavel">
                <label>Preço:</label>
                <input type="number" value={preco} onChange={mudarValorPreco} />
            </div>

            <div className="campoServicoFixo">
                <label>Quantidade vendido:</label>
                <p>{props.servico.getCompraram}</p>
            </div>

            {props.listaTipos.map(t => {
                return (<>
                    <div className="campoServicoFixo">
                        <label>{t} compraram:</label>
                        <p>{(props.servico.getRacasCompraram.filter(r => r[0] === t)).length}</p>
                    </div>
                    {props.listaRacas.filter(r => r[0] === t).map(ra => {
                        return (
                            <div className="subCampoServicoFixo">
                                <label>{ra[1]} compraram:</label>
                                <p>{(props.servico.getRacasCompraram.filter(r => r[1] === ra[1])).length}</p>
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