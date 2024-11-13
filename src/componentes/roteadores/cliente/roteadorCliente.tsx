import { useState } from "react";
import "./roteadorCliente.css"
import BarraNavegacao from "../../barraNavegacao";
import FormularioCadastroCliente from "../../cliente/forms/formularioCadastroCliente";
import Cliente from "../../../modelo/cliente";
import ListaCliente from "../../cliente/lista/listaClientes";

type props = {
    clientes: Cliente[]
}

export default function RoteadorCliente(props: props) {
    const [tela, setTela] = useState<string>("Cadastro")

    const selecionarView = (novaTela: string, evento: Event) => {
        evento.preventDefault()
        console.log(novaTela);
        setTela(novaTela)
    }
    let barraNavegacao = <BarraNavegacao
        seletorView={selecionarView}
        botoes={['Lista', 'Cadastro']}
        titulo="Cliente"
    />
    if (tela === 'Lista') {
        return (
            <div className="paginaListaCliente">
                {barraNavegacao}
                <ListaCliente clientes={props.clientes} />
            </div>
        )
    } else if (tela === 'Cadastro') {
        return (
            <div className="paginaCadastroCliente">
                {barraNavegacao}
                <FormularioCadastroCliente clientes={props.clientes} />
            </div>
        )
    } else {
        return (
            <div>
                <p>ERRO!</p>
            </div>
        )
    }

}