import { useState } from "react";
import "./roteadorProduto.css"
import BarraNavegacao from "../../barraNavegacao";
import Produto from "../../../modelo/produto";
import FormularioCadastroProduto from "../../produto/forms/formularioCadastroProduto";
import ListaProdutos from "../../produto/lista/listaProdutos";
import RegistroCompraProduto from "../../produto/registro/registroCompraProduto";
import Cliente from "../../../modelo/cliente";

type props = {
    clientes: Cliente[],
    produtos: Produto[]
}

export default function RoteadorProduto(props: props) {
    const [tela, setTela] = useState<string>("Cadastro")

    const selecionarView = (novaTela: string, evento: Event) => {
        evento.preventDefault()
        console.log(novaTela);
        setTela(novaTela)
    }


    let barraNavegacao = <BarraNavegacao
        seletorView={selecionarView}
        botoes={['Lista', 'Cadastro', 'Registrar Compra']}
        titulo="Produto"
    />
    if (tela === 'Lista') {
        return (
            <div className="paginaListaProduto">
                {barraNavegacao}
                <ListaProdutos produtos={props.produtos} clientes={props.clientes} />
            </div>
        )
    } else if (tela === 'Cadastro') {
        return (
            <div className="paginaCadastroProduto">
                {barraNavegacao}
                <FormularioCadastroProduto produtos={props.produtos} />
            </div>
        )
    } else if (tela === 'Registrar Compra') {
        return (
            <div className="paginaRegistroCompra">
                {barraNavegacao}
                <RegistroCompraProduto clientes={props.clientes} produtos={props.produtos} />
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