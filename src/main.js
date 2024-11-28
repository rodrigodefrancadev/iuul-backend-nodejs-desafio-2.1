// @ts-check


import { Conversor } from "./conversor.js";
import { ConversorUI } from "./conversor-ui.js";
import env from "./env.js";
import { ExchangeRateApi } from "./exchage-rate-api.js";
import { IO } from "./helpers/io.js";

const apiKey = env.EXCHANGE_RATE_API_KEY;
const exchangeRateApi = new ExchangeRateApi(apiKey);

const conversor = new Conversor(exchangeRateApi);

const io = new IO();

const conversorUI = new ConversorUI(conversor, io);

conversorUI.loopPrincipal();


export { }