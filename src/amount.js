// @ts-check

export class Amount {

    #value;

    get value() {
        return this.#value;
    }

    /**
     * @param {number} value - O valor
     * @throws {Error} - Se o valor não for um number.
     * @throws {Error} - Se o valor for menor ou igual a 0.
     * @throws {Error} - Se o valor tiver mais de 4 casas decimais.
     */
    constructor(value) {
        if (typeof value !== 'number') {
            throw new Error('Valor precisa ser um number');
        }

        if (value < 0) {
            throw new Error('Valor precisa ser maior que 0');
        }

        if (value % 1 !== 0 && value.toString().split('.')[1].length > 4) {
            throw new Error('Valor precisa ter até 4 casas decimais');
        }

        this.#value = value;
    }

    toString() {
        return this.#value.toFixed(4);
    }
}