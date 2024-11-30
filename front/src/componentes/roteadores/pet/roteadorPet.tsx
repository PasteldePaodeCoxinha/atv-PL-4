import { useState } from "react";
import "./roteadorPet.css"
import BarraNavegacao from "../../barraNavegacao";
import Cliente from "../../../modelo/cliente";
import FormularioCadastroPet from "../../pet/forms/formularioCadastroPet";
import ListaPet from "../../pet/lista/listaPets";

type props = {
    clientes: Cliente[]
}

export default function RoteadorPet(props: props) {
    const [tela, setTela] = useState<string>("Cadastro")

    const selecionarView = (novaTela: string, evento: Event) => {
        evento.preventDefault()
        console.log(novaTela);
        setTela(novaTela)
    }


    let barraNavegacao = <BarraNavegacao
        seletorView={selecionarView}
        botoes={['Lista', 'Cadastro']}
        titulo="Pet"
    />
    if (tela === 'Lista') {
        return (
            <div className="paginaListaPet">
                {barraNavegacao}
                <ListaPet clientes={props.clientes} />
            </div>
        )
    } else if (tela === 'Cadastro') {
        return (
            <div className="paginaCadastroPet">
                {barraNavegacao}
                <FormularioCadastroPet clientes={props.clientes} />
            </div>
        )
    } else {
        return(
            <div>
                <p>ERRO!</p>
            </div>
        )
    }

}