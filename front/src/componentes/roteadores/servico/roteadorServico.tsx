import { useState } from "react";
import "./roteadorServico.css"
import BarraNavegacao from "../../barraNavegacao";
import Servico from "../../../modelo/servico";
import ListaServicos from "../../servico/lista/listaServicos";
import FormularioCadastroServico from "../../servico/forms/formularioCadastroServico";
import RegistroCompraServico from "../../servico/registro/registroCompraServico";
import Cliente from "../../../modelo/cliente";

type props = {
    clientes: Cliente[],
    servicos: Servico[]
}

export default function RoteadorServico(props: props) {
    const [tela, setTela] = useState<string>("Cadastro")

    const selecionarView = (novaTela: string, evento: Event) => {
        evento.preventDefault()
        console.log(novaTela);
        setTela(novaTela)
    }

    let barraNavegacao = <BarraNavegacao
        seletorView={selecionarView}
        botoes={['Lista', 'Cadastro', 'Registrar Compra']}
        titulo="Serviço"
    />
    if (tela === 'Lista') {
        return (
            <div className="paginaListaServico">
                {barraNavegacao}
                <ListaServicos servicos={props.servicos} clientes={props.clientes} />
            </div>
        )
    } else if (tela === 'Cadastro') {
        return (
            <div className="paginaCadastroServico">
                {barraNavegacao}
                <FormularioCadastroServico servicos={props.servicos} />
            </div>
        )
    } else if (tela === 'Registrar Compra') {
        return (
            <div className="paginaRegistroCompra">
                {barraNavegacao}
                <RegistroCompraServico clientes={props.clientes} servicos={props.servicos} />
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