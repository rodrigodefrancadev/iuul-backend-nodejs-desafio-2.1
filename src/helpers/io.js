// @ts-check

import PromptSync from 'prompt-sync';
export class IO {

    /** @type {PromptSync.Prompt} */ #input;

    constructor() {
        this.#input = PromptSync();
    }

    /**
     * @param {string} prompt
     * @returns {string}
     */
    readString(prompt) {
        const text = this.#input(prompt);
        return text;
    }

    /**
     * @param {string} prompt
     * @returns {number}
     */
    readNumber(prompt) {
        while (true) {
            const text = this.readString(prompt)
            const num = Number(text)
            if (isNaN(num)) {
                this.write(`ERRO: o valor informado "${text}" não é um número válido. Tente novamente.`);
                continue;
            }
            return num;
        }
    }


    /**
     * @param {string} msg
     */
    write(msg) {
        console.log(msg)
    }

    pause() {
        this.#input('Aperte ENTER para continuar ...')
    }
}