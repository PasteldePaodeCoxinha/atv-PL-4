import { useCallback, useEffect, useState } from "react";
import Cliente from "../../../modelo/cliente";
import "./alterarCliente.css"
import Telefone from "../../../modelo/telefone";

type props = {
    cliente: Cliente
}

export default function AlterarCliente(props: props) {
    const [menuTel, setMenuTel] = useState<Boolean>(false)
    const [novoDdd, setNovoDdd] = useState<string>("")
    const [novoTel, setNovoTel] = useState<string>("")
    const [numeroEscolhido, setNumeroEscolhido] = useState<string>("")
    const [nome, setNome] = useState<string>(props.cliente.nome)
    const [nomeSocial, setNomeSocial] = useState<string>(props.cliente.nomeSocial)
    const [email, setEmail] = useState<string>(props.cliente.email)
    const [numero, setNumero] = useState<string>(props.cliente.endereco.numero)
    const [rua, setRua] = useState<string>(props.cliente.endereco.rua)
    const [bairro, setBairro] = useState<string>(props.cliente.endereco.bairro)
    const [cidade, setCidade] = useState<string>(props.cliente.endereco.cidade)
    const [estado, setEstado] = useState<string>(props.cliente.endereco.estado)
    const [cep, setCep] = useState<string>(props.cliente.endereco.codigoPostal)
    const [infoAdi, setInfoAdi] = useState<string>(props.cliente.endereco.informacoesAdicionais ? props.cliente.endereco.informacoesAdicionais : "")

    const adicionarTelefone = () => {
        props.cliente.telefones.push({ ddd: novoDdd, numero: novoTel } as Telefone)
        setMenuTel(false)
    }

    const deletarTelefone = useCallback(() => {
        props.cliente.telefones = props.cliente.telefones.filter(t => t.numero !== numeroEscolhido)
        setNumeroEscolhido("")
    }, [props.cliente, numeroEscolhido])

    const mudarValorNome = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNome(e.target.value)
        props.cliente.nome = e.target.value
    }

    const mudarValorNomeSocial = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNomeSocial(e.target.value)
        props.cliente.nomeSocial = e.target.value
    }

    const mudarValorEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        props.cliente.email = e.target.value
    }

    const mudarValorNumero = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumero(e.target.value)
        props.cliente.endereco.numero = e.target.value
    }

    const mudarValorRua = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRua(e.target.value)
        props.cliente.endereco.rua = e.target.value
    }

    const mudarValorBairro = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBairro(e.target.value)
        props.cliente.endereco.bairro = e.target.value
    }

    const mudarValorCidade = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCidade(e.target.value)
        props.cliente.endereco.cidade = e.target.value
    }

    const mudarValorEstado = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEstado(e.target.value)
        props.cliente.endereco.estado = e.target.value
    }

    const mudarValorCep = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCep(e.target.value)
        props.cliente.endereco.codigoPostal = e.target.value
    }

    const mudarValorInfoAdi = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfoAdi(e.target.value)
        props.cliente.endereco.informacoesAdicionais = e.target.value
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

    // const formatarData = (data: Date): string => {
    //     const dataPartes = (data.toISOString().split("T")[0]).split("-")
    //     const dataCerta = dataPartes[2] + "/" + dataPartes[1] + "/" + dataPartes[0]
    //     return dataCerta
    // }

    const alterarCliente = async () => {
        console.log(props.cliente);

        try {
            const response = await fetch("http://localhost:32831/cliente/atualizar", {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(props.cliente)
            })

            if (response.ok) {
                alert("Cliente alterado com sucesso")
            } else {
                console.log(await response.json());
                alert("Erro ao alterar cliente")
            }
        } catch (error) {
            console.log(error);
            alert((error as Error).message)
        }
    }

    useEffect(() => {
        deletarTelefone()
    }, [deletarTelefone])

    return (
        <div className="containerInformacoesCliente">
            <button className="botaoConfirmarAlterarCliente"
                onClick={() => alterarCliente()}>
                CONFIRMAR ALTERAÇÕES
            </button>

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

            <div className="campoClienteEditavel">
                <label>Número:</label>
                <input type="text" value={numero} onChange={mudarValorNumero} />
            </div>

            <div className="campoClienteEditavel">
                <label>Rua:</label>
                <input type="text" value={rua} onChange={mudarValorRua} />
            </div>

            <div className="campoClienteEditavel">
                <label>Bairro:</label>
                <input type="text" value={bairro} onChange={mudarValorBairro} />
            </div>

            <div className="campoClienteEditavel">
                <label>Cidade:</label>
                <input type="text" value={cidade} onChange={mudarValorCidade} />
            </div>

            <div className="campoClienteEditavel">
                <label>Estado:</label>
                <input type="text" value={estado} onChange={mudarValorEstado} />
            </div>

            <div className="campoClienteEditavel">
                <label>Código Postal:</label>
                <input type="text" value={cep} onChange={mudarValorCep} />
            </div>

            <div className="campoClienteEditavel">
                <label>Informações adicionais:</label>
                <input type="text" value={infoAdi} onChange={mudarValorInfoAdi} />
            </div>

            {/* <div className="campoClienteFixo">
                <label>CPF:</label>
                <p>{cliente.getCpf.getValor} | {formatarData(cliente.getCpf.getDataEmissao)}</p>
            </div>

            <div className="campoClienteFixo">
                <label>RG:</label>
                <p>{cliente.getRgs[0].getValor} | {formatarData(cliente.getRgs[0].getDataEmissao)}</p>
            </div> */}

            {/* <div className="campoClienteFixo">
                <label>Qtd Produtos Consumidos:</label>
                <p>{props.cliente.getProdutosConsumidos.length}</p>
            </div>

            <div className="campoClienteFixo">
                <label>Qtd Serviços consumidos:</label>
                <p>{props.cliente.getServicosConsumidos.length}</p>
            </div>

            <div className="campoClienteFixo">
                <label>Total gasto:</label>
                <p>R$ {((props.cliente.getValorGasto * 100) * 0.01).toFixed(2).replace(".", ",")}</p>
            </div> */}

            <div className="campoClienteFixo">
                <label>Telefone 1:</label>
                <p>+{props.cliente.telefones[0].ddd} {props.cliente.telefones[0].numero}</p>
                {props.cliente.telefones[1] ?
                    (
                        <button onClick={() => setNumeroEscolhido(props.cliente.telefones[0].numero)}
                            className="botaoDeletarTelCliente">
                            Deletar Telefone
                        </button>
                    )
                    :
                    (<></>)
                }
            </div>

            {props.cliente.telefones[1] ?
                (
                    <div className="campoClienteFixo">
                        <label>Telefone 2:</label>
                        <p>+{props.cliente.telefones[1].ddd} {props.cliente.telefones[1].numero}</p>
                        <button onClick={() => setNumeroEscolhido(props.cliente.telefones[0].numero)}
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