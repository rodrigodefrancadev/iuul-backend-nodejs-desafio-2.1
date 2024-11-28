export class Currency {

    #code;

    get code() {
        return this.#code;
    }

    /**
     * @param {string} code - Código da moeda.
     * @throws {Error} - Se o cóigo não for uma string.
     * @throws {Error} - Se o código não tiver 3 caracteres.
     * @throws {Error} - Se o código não tiver apenas letras maiúsculas.
     */
    constructor(code) {
        if (typeof code !== 'string') {
            throw new Error('Código de moeda precisa ser string');
        }

        if (code.length !== 3) {
            throw new Error('Código de moeda precisa ter 3 caracteres');
        }

        if (!/^[A-Z]{3}$/.test(code)) {
            throw new Error('Código de moeda precisa ter apenas letras maiúsculas');
        }

        this.#code = code;
    }

    toString() {
        return this.#code;
    }

    /**
     * @param {Currency} other
     */
    equals(other) {
        return this.#code === other.#code;
    }
}