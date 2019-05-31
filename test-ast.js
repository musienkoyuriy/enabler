const fs = require('fs')
const esprima = require('esprima');

fs.readFile('./jsx.jsx', (err, data) => {
  if (err) {
    throw new Error('something went wrong')
    return
  }
  const content = data.toString();
  const ast = esprima.parseScript(content, { jsx: true })
  console.log(JSON.stringify(ast))
})
