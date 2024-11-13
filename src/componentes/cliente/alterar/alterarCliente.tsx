import { useCallback, useEffect, useState } from "react";
import Cliente from "../../../modelo/cliente";
import "./alterarCliente.css"
import Telefone from "../../../modelo/telefone";

type props = {
    cliente: Cliente
}

export default function AlterarCliente(props: props) {
    const cliente = props.cliente
    const [menuTel, setMenuTel] = useState<Boolean>(false)
    const [novoDdd, setNovoDdd] = useState<string>("")
    const [novoTel, setNovoTel] = useState<string>("")
    const [numeroEscolhido, setNumeroEscolhido] = useState<string>("")
    const [nome, setNome] = useState<string>(cliente.nome)
    const [nomeSocial, setNomeSocial] = useState<string>(cliente.nomeSocial)
    const [email, setEmail] = useState<string>(cliente.getEmail)

    const adicionarTelefone = () => {
        cliente.getTelefones.push(new Telefone(novoDdd, novoTel))
        setMenuTel(false)
    }

    const deletarTelefone = useCallback(() => {
        cliente.setTelefones = cliente.getTelefones.filter(t => t.getNumero !== numeroEscolhido)
        setNumeroEscolhido("")
    }, [cliente, numeroEscolhido])

    const mudarValorNome = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNome(e.target.value)
        cliente.nome = e.target.value
    }

    const mudarValorNomeSocial = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNomeSocial(e.target.value)
        cliente.nomeSocial = e.target.value
    }

    const mudarValorEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        cliente.setEmail = e.target.value
    }

    const menuAdicionarTelefone = () => {
        return (
            <div className="menuAddTel">
                <input type="text" placeholder="DDD" className="inputAddNovoTelDDD" onChange={e => setNovoDdd(e.target.value)} />
                <input type="text" placeholder="Telefone" className="inputAddNovoTelNum" onChange={e => setNovoTel(e.target.value)} />
                <button className="botaoConfirmarTel" onClick={adicionarTelefone}>Confirmar</button>
            </div>
        )
    }

    const formatarData = (data: Date): string => {
        const dataPartes = (data.toISOString().split("T")[0]).split("-")
        const dataCerta = dataPartes[2] + "/" + dataPartes[1] + "/" + dataPartes[0]
        return dataCerta
    }

    useEffect(() => {
        deletarTelefone()
    }, [deletarTelefone])

    return (
        <div className="containerInformacoesCliente">
            <div className="campoClienteEditavel">
                <label>Nome:</label>
                <input type="text" value={nome} onChange={mudarValorNome} />
            </div>

            <div className="campoClienteEditavel">
                <label>Nome Social:</label>
                <input type="text" value={nomeSocial} onChange={mudarValorNomeSocial} />
            </div>

            <div className="campoClienteEditavel">
                <label>Email:</label>
                <input type="email" value={email} onChange={mudarValorEmail} />
            </div>

            <div className="campoClienteFixo">
                <label>CPF:</label>
                <p>{cliente.getCpf.getValor} | {formatarData(cliente.getCpf.getDataEmissao)}</p>
            </div>

            <div className="campoClienteFixo">
                <label>RG:</label>
                <p>{cliente.getRgs[0].getValor} | {formatarData(cliente.getRgs[0].getDataEmissao)}</p>
            </div>

            <div className="campoClienteFixo">
                <label>Qtd Produtos Consumidos:</label>
                <p>{cliente.getProdutosConsumidos.length}</p>
            </div>

            <div className="campoClienteFixo">
                <label>Qtd Serviços consumidos:</label>
                <p>{cliente.getServicosConsumidos.length}</p>
            </div>

            <div className="campoClienteFixo">
                <label>Total gasto:</label>
                <p>R$ {((cliente.getValorGasto * 100) * 0.01).toFixed(2).replace(".", ",")}</p>
            </div>

            <div className="campoClienteFixo">
                <label>Telefone 1:</label>
                <p>+{cliente.getTelefones[0].getDdd} {cliente.getTelefones[0].getNumero}</p>
                {cliente.getTelefones[1] ?
                    (
                        <button onClick={() => setNumeroEscolhido(cliente.getTelefones[0].getNumero)}
                            className="botaoDeletarTelCliente">
                            Deletar Telefone
                        </button>
                    )
                    :
                    (<></>)
                }
            </div>

            {cliente.getTelefones[1] ?
                (
                    <div className="campoClienteFixo">
                        <label>Telefone 2:</label>
                        <p>+{cliente.getTelefones[1].getDdd} {cliente.getTelefones[1].getNumero}</p>
                        <button onClick={() => setNumeroEscolhido(cliente.getTelefones[0].getNumero)}
                            className="botaoDeletarTelCliente">
                            Deletar Telefone
                        </button>
                    </div>
                )
                :
                menuTel ? (
                    menuAdicionarTelefone()
                ) : (
                    <button onClick={() => setMenuTel(true)}
                        className="botaoAddTelCliente">Adicionar Telefone
                    </button>
                )
            }
        </div>)

}