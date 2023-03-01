import { transpile } from "../src/logging-espree.js";
import assert from 'assert';
import * as fs from "fs/promises";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
import Tst from './test-description.mjs';

const Test = Tst.map(t => ({
  input: __dirname + '/data/' + t.input,
  output: __dirname + '/data/' + t.output,
  correctLogged: __dirname + '/data/' + t.correctLogged,
  correctOut: __dirname + '/data/' + t.correctOut,
})
)

function removeSpaces(s) {
  return s.replace(/\s/g, '');
}

describe(`Probando la el console.log en funciones incluyendo las de flecha gorda con su nombre, parámetros y número de línea`, () => {
  for (let i = 0; i < Test.length; i++) {
    it(`Test(${Tst[i].input}, ${Tst[i].output})`, async () => {
    });
  }
});

