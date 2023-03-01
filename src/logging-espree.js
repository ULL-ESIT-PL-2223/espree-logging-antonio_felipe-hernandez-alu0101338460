import * as escodegen from "escodegen";
import * as espree from "espree";
import * as estraverse from "estraverse";
import * as fs from "fs/promises";


export async function transpile(inputFile, outputFile) {
  let input = await fs.readFile(inputFile, 'utf-8')
  let output = addLogging(input);
  if (outputFile === undefined) {
      console.log(output);
      return;
  }
  await fs.writeFile(outputFile, output)
}

/**
 * @desc Añade el codigo de logging a la función, este caso añade un __console.log__ antes de la función
 *       con el nombre de la misma, sus parametros y el nº de línea
 * @param {*} code código con funciones
 */
export function addLogging(code) {
  const ast = espree.parse(code, { ecmaVersion: 12, loc: true }); // loc para que nos de la linea y ecmaversion para las arrow functions
  estraverse.traverse(ast, {
      enter: function(node, parent) {
          if (node.type === 'FunctionDeclaration' ||
              node.type === 'ArrowFunctionExpression' ||
              node.type === 'FunctionExpression') {
              addBeforeCode(node);
          }
      }
  });
  return escodegen.generate(ast);
}

function addBeforeCode(node) {
  const name = node.id ? node.id.name : '<anonymous function>';
  let parmNames = "";
  if (node.params.length) {
      parmNames = "${" + node.params.map(param => param.name).join("}, ${") + "}";
  }
  const lineN = node.loc.start.line;
  const beforeCode = "console.log(" + "`" + "Entering " + name + "(" + parmNames + ")" + " at line " + lineN + "`" + ");";
  const beforeNodes = espree.parse(beforeCode, {ecmaVersion: espree.latestEcmaVersion}).body;
  node.body.body = beforeNodes.concat(node.body.body);
}



