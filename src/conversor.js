// @ts-check

import { Amount } from "./entities/amount";
import { ConversionRate } from "./entities/conversion-rate";
import { Currency } from "./entities/currency";
import { ExchangeRateApi } from "./exchage-rate-api";


export class Conversor {

    #exchangeRateApi

    /**
     * @param {ExchangeRateApi} exchangeRateApi
     */
    constructor(exchangeRateApi) {
        this.#exchangeRateApi = exchangeRateApi;
    }

    /**
     * @param {Currency} from Moeda a ser convertida
     * @param {Currency} to Moeda de destino
     * @param {Amount} amount Valor a ser convertido    
     * @returns {Promise<ResultadoDeConversao>} Resultado da conversão
     */
    async converter(from, to, amount) {
        const taxa = await this.#getConversionRate(from, to);
        const novoValor = taxa.convert(amount);
        const resultado = new ResultadoDeConversao(novoValor, taxa);
        return resultado
    }

    /**
     * @param {Currency} from Moeda a ser convertida
     * @param {Currency} to Moeda de destino
     * @returns {Promise<ConversionRate>} Taxa de conversão
     */
    async #getConversionRate(from, to) {
        const apiResponse = await this.#exchangeRateApi.pairConvertion(from, to);

        if (apiResponse.result === 'success') {
            const conversionRateValue = apiResponse.conversion_rate;
            const conversionRate = new ConversionRate(conversionRateValue);
            return conversionRate

        }
        const errorMessage = apiResponse["error-type"];
        throw new Error(errorMessage);
    }
}

export class ResultadoDeConversao {

    #valor;
    #taxa;

    get valor() {
        return this.#valor;
    }

    get taxa() {
        return this.#taxa;
    }

    /**
     * 
     * @param {Amount} valor 
     * @param {ConversionRate} taxa 
     */
    constructor(valor, taxa) {
        this.#valor = valor;
        this.#taxa = taxa;
    }
}