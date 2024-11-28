// @ts-check

import { Amount } from "./amount";
import { Currency } from "./currency";
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
     * @returns {Promise<{valor: number, taxa: number}>} Resultado da conversão
     */
    async converter(from, to, amount) {
        const response = await this.#exchangeRateApi.pairConvertion(from, to, amount);

        if (response.result === 'success') {
            return {
                valor: response.conversion_rate * amount.value,
                taxa: response.conversion_rate
            }
        }

        throw new Error(response["error-type"]);
    }
}