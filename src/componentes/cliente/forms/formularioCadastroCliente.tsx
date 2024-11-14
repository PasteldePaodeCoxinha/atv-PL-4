/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import Cliente from "../../../modelo/cliente";
// import CPF from "../../../modelo/cpf";
// import RG from "../../../modelo/rg";
import Telefone from "../../../modelo/telefone";
import "./formularioCadastroCliente.css"
import Endereco from "../../../modelo/endereco";

type props = {
    clientes: Cliente[]
}

export default function FormularioCadastroCliente(props: props) {
    const [nome, setNome] = useState<string>("")
    const [nomeSocial, setNomeSocial] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [numero, setNumero] = useState<string>("")
    const [rua, setRua] = useState<string>("")
    const [bairro, setBairro] = useState<string>("")
    const [cidade, setCidade] = useState<string>("")
    const [estado, setEstado] = useState<string>("")
    const [cep, setCep] = useState<string>("")
    const [infoAdi, setInfoAdi] = useState<string>("")
    // const [valorCpf, setValorCpf] = useState<string>("")
    // const [dataCpf, setDataCpf] = useState<string>("")
    // const [valorRg, setValorRg] = useState<string>("")
    // const [dataRg, setDataRg] = useState<string>("")
    const [telefone1, setTelefone1] = useState<string>("")
    const [telefone2, setTelefone2] = useState<string>("")


    const mudarValorNome = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNome(e.target.value)
    }

    const mudarValorNomeSocial = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNomeSocial(e.target.value)
    }

    const mudarValorEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const mudarValorNumero = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(Number(e.target.value).valueOf())) {
            setNumero(e.target.value)
        } else {
            setNumero(numero)
        }
    }

    const mudarValorRua = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRua(e.target.value)
    }

    const mudarValorBairro = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBairro(e.target.value)
    }

    const mudarValorCidade = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCidade(e.target.value)
    }

    const mudarValorEstado = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEstado(e.target.value)
    }

    const mudarValorCep = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCep(e.target.value)
    }

    const mudarValorInfoAdi = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfoAdi(e.target.value)
    }

    // const mudarValorCpf = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (!isNaN(Number(e.target.value).valueOf())) {
    //         setValorCpf(e.target.value)
    //     } else {
    //         setValorCpf(valorCpf)
    //     }

    // }

    // const mudarValorDataCpf = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setDataCpf(e.target.value)
    // }

    // const mudarValorRg = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (!isNaN(Number(e.target.value).valueOf())) {
    //         setValorRg(e.target.value)
    //     } else {
    //         setValorRg(valorCpf)
    //     }
    // }

    // const mudarValorDataRg = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setDataRg(e.target.value)
    // }

    const mudarValorTelefone1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTelefone1(e.target.value)
    }

    const mudarValorTelefone2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTelefone2(e.target.value)
    }

    const clienteCriarAdicionar = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        const listaTel = [new Telefone(telefone1.substring(0, 2), telefone1.substring(2))]

        if (telefone2 !== "" && telefone2 !== undefined) {
            listaTel.push(new Telefone(telefone2.substring(0, 2), telefone2.substring(2)))
        }

        const endereco = new Endereco(estado, cidade, bairro, rua, numero, cep, (infoAdi !== "" ? infoAdi : undefined))

        // let datasCpf = dataCpf.split("")
        // let datasRg = dataRg.split("-")

        const cliente = new Cliente(nome, nomeSocial, email, endereco, listaTel)

        try {
            const response = await fetch("http://localhost:32831/cliente/cadastrar", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            })
            if (response.ok) {
                alert("Cliente cadastrado")
                setNome("")
                setNomeSocial("")
                setEmail("")
                setNumero("")
                setRua("")
                setBairro("")
                setCidade("")
                setEstado("")
                setCep("")
                setInfoAdi("")
                // setValorCpf("")
                // setDataCpf("")
                // setValorRg("")
                // setDataRg("")
                setTelefone1("")
                setTelefone2("")
            } else {
                console.log("Erro ao cadastrar");
            }

        } catch (error) {
            alert((error as Error).message)
            console.log((error as Error).message);
            return
        }

    }


    return (
        <div className="containerFormularioCliente">

            <form className="formularioCliente" onSubmit={clienteCriarAdicionar}>

                <div className="linhaFormularioCadastroCliente">

                    <input type="text"
                        className="inputClienteForms"
                        placeholder="Nome"
                        value={nome}
                        onChange={mudarValorNome}
                        required />

                    <input type="text"
                        className="inputClienteForms"
                        placeholder="Nome social"
                        value={nomeSocial}
                        onChange={mudarValorNomeSocial} />

                </div>

                <div className="linhaFormularioCadastroCliente">

                    <input type="email"
                        className="inputClienteForms"
                        placeholder="E-mail"
                        value={email}
                        onChange={mudarValorEmail}
                        required />

                </div>

                {/*<div className="linhaFormularioCadastroCliente">
                    <div className="inputsComDataFormsCliente">

                        <input type="text"
                            className="inputClienteForms"
                            placeholder="CPF"
                            value={valorCpf}
                            onChange={mudarValorCpf}
                            required />

                        <input type="date"
                            className="inputClienteForms"
                            placeholder="Data CPF"
                            datatype=""
                            value={dataCpf}
                            onChange={mudarValorDataCpf}
                            required />

                    </div>
                </div>*/}

                {/* <div className="linhaFormularioCadastroCliente">
                    <div className="inputsComDataFormsCliente">

                        <input type="text"
                            className="inputClienteForms"
                            placeholder="RG"
                            value={valorRg}
                            onChange={mudarValorRg}
                            required />

                        <input type="date"
                            placeholder="Data RG"
                            className="inputClienteForms"
                            value={dataRg}
                            onChange={mudarValorDataRg}
                            required />

                    </div>
                </div> */}

                <div className="linhaFormularioCadastroCliente">

                    <input type="text"
                        className="inputClienteForms"
                        placeholder="Número"
                        value={numero}
                        onChange={mudarValorNumero}
                        required />

                    <input type="text"
                        className="inputClienteForms"
                        placeholder="Rua"
                        value={rua}
                        onChange={mudarValorRua}
                        required />

                    <input type="text"
                        className="inputClienteForms"
                        placeholder="Bairro"
                        value={bairro}
                        onChange={mudarValorBairro}
                        required />

                </div>

                <div className="linhaFormularioCadastroCliente">

                    <input type="text"
                        className="inputClienteForms"
                        placeholder="Cidade"
                        value={cidade}
                        onChange={mudarValorCidade}
                        required />

                    <select className="selectClienteForms"
                        value={estado}
                        onChange={mudarValorEstado}
                        required>
                        <option value="">Selecione um estado</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                        <option value="EX">Estrangeiro</option>
                    </select>

                </div>

                <div className="linhaFormularioCadastroCliente">

                    <input type="text"
                        className="inputClienteForms"
                        placeholder="CEP"
                        value={cep}
                        onChange={mudarValorCep}
                        required />

                    <input type="text"
                        className="inputClienteForms"
                        placeholder="Complemento"
                        value={infoAdi}
                        onChange={mudarValorInfoAdi} />

                </div>

                <div className="linhaFormularioCadastroCliente">

                    <input type="text"
                        className="inputClienteForms"
                        placeholder="Telefone 1"
                        value={telefone1}
                        onChange={mudarValorTelefone1}
                        required />

                    <input type="text"
                        className="inputClienteForms"
                        placeholder="Telefone 2"
                        value={telefone2}
                        onChange={mudarValorTelefone2} />

                </div>

                <div className="containerBotaoCadastrarCliente">
                    <button className="botaoCadastrarCliente">CADASTRAR</button>
                </div>
            </form>

        </div>
    )

}