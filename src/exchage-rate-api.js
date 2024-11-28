// @ts-check

import axios from 'axios';
import { Currency } from './currency';
import { Amount } from './amount';

export class ExchangeRateApi {

    #api;

    /**
     * @param {string} apiKey the key to use with the exchange rate API
     */
    constructor(apiKey) {
        this.#api = axios.create({
            baseURL: `https://v6.exchangerate-api.com/v6/${apiKey}`,
        })
    }

    /**
     * @param {Currency} from Moeda a ser convertida
     * @param {Currency} to Moeda de destino
     * @param {Amount} amount Valor a ser convertido    
     * @returns {Promise<PairConvertionResponse>} The conversion rate
     */
    async pairConvertion(from, to, amount) {
        /** @type {axios.AxiosResponse<PairConvertionResponse, any>} */
        const response = await this.#api.get(`/pair/${from}/${to}/${amount}`);
        return response.data;
    }
}

/**
 * @typedef {PairConvertionSuccessResponse | PairConvertionErrorResponse} PairConvertionResponse
 */

/**
 * @typedef {{
*  result: "success",
*	documentation: string,
*	terms_of_use: string,
*	time_last_update_unix: number,
*	time_last_update_utc: string,
*	time_next_update_unix: number,
*	time_next_update_utc: string,
*	base_code: string,
*	target_code: string,
*	conversion_rate: number
* }} PairConvertionSuccessResponse
*/


/**
* @typedef {{
*  result: "error",
* "error-type": string
* }} PairConvertionErrorResponse
*/
