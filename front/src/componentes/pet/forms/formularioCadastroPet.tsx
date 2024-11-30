/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import Cliente from "../../../modelo/cliente";
import "./formularioCadastroPet.css"
import Pet from "../../../modelo/pet";

type props = {
    clientes: Cliente[]
}


export default function FormularioCadastroPet(props: props) {
    const [nome, setNome] = useState<string>("")
    const [tipo, setTipo] = useState<string>("")
    const [raca, setRaca] = useState<string>("")
    const [genero, setGenero] = useState<string>("")
    const [tamanho, setTamanho] = useState<string>("")
    const [dono, setDono] = useState<string>("")

    const mudarValorNome = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNome(e.target.value)
    }

    const mudarValorTipo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTipo(e.target.value)
    }

    const mudarValorRaca = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRaca(e.target.value)
    }

    const mudarValorGenero = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGenero(e.target.value)
    }

    const mudarValorTamanho = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTamanho(e.target.value)
    }

    const mudarValorDono = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDono(e.target.value)
    }

    const adicionarPetCliente = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        let cachorroTemDono = false

        props.clientes.forEach(c => {
            if ((c.getPets.filter(p => p.getNome === nome)).length > 0) {
                alert("Esse pet já tem um dono")
                cachorroTemDono = true
            }
        })

        if (cachorroTemDono) {
            return
        }

        const cliente = props.clientes.find(c => c.nome === dono)

        if (!cliente) {
            alert("Esse dono não existe")
            return
        }

        const pet = new Pet(nome, tipo, raca, genero, tamanho)

        cliente.getPets.push(pet)

        setNome("")
        setTipo("")
        setRaca("")
        setGenero("")
        setTamanho("")
        setDono("")
    }

    return (
        <div className="containerFormularioPet">
            <form className="formularioPet" onSubmit={adicionarPetCliente}>

                <div className="linhaFormularioCadastroPet">

                    <select className="selectPetForms"
                        onChange={mudarValorDono}
                        value={dono}>
                        <option value="" disabled>Dono</option>
                        {props.clientes.map((c, i) => {
                            return (
                                <option
                                    value={c.nome}
                                    key={i}>
                                    {c.nome}
                                </option>
                            )
                        })}
                    </select>

                </div>

                <div className="linhaFormularioCadastroPet">

                    <input type="text"
                        className="inputPetForms"
                        placeholder="Nome"
                        value={nome}
                        onChange={mudarValorNome}
                        required
                    />

                    <select className="selectPetForms"
                        onChange={mudarValorGenero}
                        value={genero}>
                        <option value="" disabled>Genêro</option>
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                    </select>

                </div>


                <div className="linhaFormularioCadastroPet">

                    <input type="text"
                        className="inputPetForms"
                        placeholder="Tipo"
                        value={tipo}
                        onChange={mudarValorTipo}
                        required
                    />

                    <input type="text"
                        className="inputPetForms"
                        placeholder="Raça"
                        value={raca}
                        onChange={mudarValorRaca}
                        required
                    />

                    <select className="selectPetForms"
                        onChange={mudarValorTamanho}
                        value={tamanho}>
                        <option value="" disabled>Tamanho</option>
                        <option value="Grande">Grande</option>
                        <option value="Médio">Médio</option>
                        <option value="Pequeno">Pequeno</option>
                    </select>

                </div>

                <div className="containerBotaoCadastrarPet">
                    <button className="botaoCadastrarPet">CADASTRAR</button>
                </div>
            </form>

        </div>
    )

}