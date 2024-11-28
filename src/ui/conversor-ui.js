// @ts-check

import { Conversor } from "../app/conversor.js";
import { Amount } from "../app/entities/amount.js";
import { Currency } from "../app/entities/currency.js";
import { IO } from "./io.js";

export class ConversorUI {

    #conversor;
    #io;

    /**
     * @param {Conversor} conversor
     * @param {IO} io
     */
    constructor(conversor, io) {
        this.#conversor = conversor;
        this.#io = io;
    }

    async loopPrincipal() {
        this.#io.write("----CONVERSOR DE MOEDAS-----");
        while (true) {
            const moedaOrigem = this.#lerMoedaOrigemOuFinalizaPrograma();
            const moedaDestino = this.#lerMoedaDestino();
            const valor = this.#lerValor();

            try {

                const resultado = await this.#conversor.converter(moedaOrigem, moedaDestino, valor);
                this.#io.write("");
                this.#io.write(`${moedaOrigem} ${valor} => ${moedaDestino} ${resultado.valor}`);
                this.#io.write(`Taxa: ${resultado.taxa}`);
            }
            catch (error) {
                this.#io.write(`Erro: ${error.message}`);
            }

            this.#io.write("");
            this.#io.pause();
        }
    }

    #lerMoedaOrigemOuFinalizaPrograma() {
        while (true) {
            const moedaOrigem = this.#io.readString("Moeda origem: ");
            if (moedaOrigem === "") {
                process.exit(0);
            }

            try {
                const moeda = new Currency(moedaOrigem);
                return moeda
            } catch (error) {
                this.#io.write(`Erro: ${error.message}`);
            }
        }
    }

    #lerMoedaDestino() {
        while (true) {
            const moedaOrigem = this.#io.readString("Moeda destino: ");

            try {
                const moeda = new Currency(moedaOrigem);
                return moeda
            } catch (error) {
                this.#io.write(`Erro: ${error.message}`);
            }
        }
    }

    #lerValor() {
        const pattern = /^[0-9]+,[0-9]{2}$/
        while (true) {
            const valor = this.#io.readString("Valor (ex: 1234,00): ");
            if (!pattern.test(valor)) {
                this.#io.write("ERRO: Formato de valor inválido");
                continue;
            }
            const valorNumber = Number(valor.replace(",", "."));
            try {
                const amount = new Amount(valorNumber);
                return amount;
            }
            catch (error) {
                this.#io.write(`Erro: ${error.message}`);
            }
        }
    }
}