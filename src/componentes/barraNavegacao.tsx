/* eslint-disable jsx-a11y/anchor-is-valid */
import "./barraNavegacao.css"

type props = {
    botoes: string[],
    titulo: string,
    seletorView: Function
}

export default function BarraNavegacao(props: props) {

    const gerarListaBotoes = () => {
        if (props.botoes.length <= 0) {
            return <></>
        } else {
            let lista = props.botoes.map(valor =>
                <li key={valor} className="botoesDaBarraDeNavegacao">
                    <a className="linkDaBarraDeNavegacao" href="#" onClick={(e) => props.seletorView(valor, e)}>{valor}</a>
                </li>
            )
            return lista
        }
    }

    return (
        <>
            <nav className="barraDeNavegacao">
                <ul className="containerDaBarraDeNavegacao">
                    {gerarListaBotoes()}
                </ul>
                <p className="tituloBarraNavegacao">{props.titulo}</p>
            </nav>
        </>
    )

}