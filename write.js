const { writeDb } = require("./dbFunctions")

const dataObj = {
    Radu: 'hello',
    id: 1,
    price: 700
}

writeDb(dataObj)