// @ts-check

import axios from 'axios';
import { Currency } from './entities/currency';

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
     * @returns {Promise<PairConvertionResponse>} The conversion rate
     */
    async pairConvertion(from, to) {
        /** @type {axios.AxiosResponse<PairConvertionResponse, any>} */
        const response = await this.#api.get(`/pair/${from}/${to}`);
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
*  "error-type": string
* }} PairConvertionErrorResponse
*/
