/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import Cliente from "../../../modelo/cliente";
import CPF from "../../../modelo/cpf";
import RG from "../../../modelo/rg";
import Telefone from "../../../modelo/telefone";
import "./formularioCadastroCliente.css"

type props = {
    clientes: Cliente[]
}

export default function FormularioCadastroCliente(props: props) {
    const [nome, setNome] = useState<string>("")
    const [nomeSocial, setNomeSocial] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [valorCpf, setValorCpf] = useState<string>("")
    const [dataCpf, setDataCpf] = useState<string>("")
    const [valorRg, setValorRg] = useState<string>("")
    const [dataRg, setDataRg] = useState<string>("")
    const [telefone1, setTelefone1] = useState<string>("")
    const [telefone2, setTelefone2] = useState<string | undefined>(undefined)


    const mudarValorNome = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNome(e.target.value)
    }

    const mudarValorNomeSocial = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNomeSocial(e.target.value)
    }

    const mudarValorEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const mudarValorCpf = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(Number(e.target.value).valueOf())) {
            setValorCpf(e.target.value)
        } else {
            setValorCpf(valorCpf)
        }

    }

    const mudarValorDataCpf = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataCpf(e.target.value)
    }

    const mudarValorRg = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(Number(e.target.value).valueOf())) {
            setValorRg(e.target.value)
        } else {
            setValorRg(valorCpf)
        }
    }

    const mudarValorDataRg = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataRg(e.target.value)
    }

    const mudarValorTelefone1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTelefone1(e.target.value)
    }

    const mudarValorTelefone2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTelefone2(e.target.value)
    }

    const clienteCriarAdicionar = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        let listaTel = [new Telefone(telefone1.substring(0, 2), telefone1.substring(2))]

        if (telefone2 !== "" && telefone2 !== undefined) {
            listaTel.push(new Telefone(telefone2.substring(0, 2), telefone2.substring(2)))
        }

        // let datasCpf = dataCpf.split("")
        // let datasRg = dataRg.split("-")

        props.clientes.push(new Cliente(
            nome,
            nomeSocial,
            email,
            new CPF(valorCpf, new Date(dataCpf)),
            [new RG(valorRg,
                new Date(dataRg))],
            listaTel))

        setNome("")
        setNomeSocial("")
        setEmail("")
        setValorCpf("")
        setDataCpf("")
        setValorRg("")
        setDataRg("")
        setTelefone1("")
        setTelefone2("")
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

                <div className="linhaFormularioCadastroCliente">
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
                </div>

                <div className="linhaFormularioCadastroCliente">
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