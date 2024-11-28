// @ts-check

import { Amount } from "./amount";

export class ConversionRate {

    #value;

    get value() {
        return this.#value;
    }

    /**
     * @param {number} rate
     */
    constructor(rate) {
        if (typeof rate !== 'number') {
            throw new Error('O valor da taxa precisa ser um number');
        }

        if (rate < 0) {
            throw new Error('O valor da taxa precisa ser maior que 0');
        }

        this.#value = rate;
    }

    /**
     * @param {Amount} amount
     * @returns {Amount}
     */
    convert(amount) {
        const newValue = amount.value * this.#value;
        const newValueNormalized = Number(newValue.toFixed(4));
        return new Amount(newValueNormalized);
    }

    toString() {
        return this.#value.toFixed(4);
    }

}