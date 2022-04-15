const PORT = process.env.PORT || 3001;

// 1. node-py connection test
var express = require('express');
const app = express();
let {PythonShell} = require('python-shell')

const some_number = 123
const some_json = {"num1": 123, "num2": 456, "num3": 999} // method 3
const some_array = [123, 456, -999] // method 4

app.get('/pythontext', call_text_plus_one);
function call_text_plus_one(req, res) {
    var options = {
        mode: 'text',
        args:
        [
        //   req.query.num // method 1: http://localhost:3001/pythontext?num=123
        some_number // method 2: http://localhost:3001/pythontext
        ]
      }

      PythonShell.run('./text_plus_one.py', options, function (err, data) {
        if (err) res.send(err);
        res.send(data.toString()) // method 1, 2
        // res.json({ message: data.toString() });
      });
}

app.get('/pythonjson', call_json_plus_one);
function call_json_plus_one(req, res) {
    var options = {
        mode: 'json', // method 3
        args:
        [
        JSON.stringify(some_json) // method 3
        ]
      }

      PythonShell.run('./json_plus_one.py', options, function (err, data) {
        if (err) res.send(err);
        res.send(data[0]) // method 3
        // res.send(data[0]['num1'].toString()) // method 3 (specfic value)
      });
}

app.get('/pythonarray', call_array_plus_one);
function call_array_plus_one(req, res) {
    var options = {
        mode: 'text', // method 4
        args:
        [
        some_array // method 4
        ]
      }

      PythonShell.run('./array_plus_one.py', options, function (err, data) {
        if (err) res.send(err);
        // res.send(data.toString()) // method 4
        let return_array = data[0].slice(1, -1).split(",") // method 4 (specfic value)
        res.send(return_array[0].toString() + '\n' + return_array[1].toString() + '\n' + return_array[2].toString())
      });
}

// 2. read/write csv file
var fs = require('fs').promises;
const { parse } = require('csv-parse/sync');
const {stringify} = require('csv-stringify');

app.get('/csv', call_load_write_csv);
function call_load_write_csv(req, res) { 
  (async function () {
      const fileContent = await fs.readFile('./mmm_rating.csv');
      const records = parse(fileContent, {columns: true});
      res.send(records.slice(0, 2)) // load the first row

      // write the first two rows to another file with modification
      var tworows = records.slice(0, 2);
      tworows[0]["ticker"] = "HAHA US EQUITY"
      stringify(tworows, {
        header: true
    }, function (err, output) {
        fs.writeFile('./mmm_rating_modified.csv', output);
    })
  })();
}

// 3. search function

app.get('/search', call_search);
function call_search(req, res) {
    var options = {
        mode: 'text',
        args:
        [
          req.query.input // method 1: http://localhost:3001/search?input=abc
        ]
      }

      PythonShell.run('./search.py', options, function (err, data) {
        if (err) res.send(err);
        // res.send(data.toString())
        if (data[0] == '[]') {
          res.send('Your search - ' + req.query.input + ' - did not match any stock tickers/names.')
        }
        else {
          let return_array = data[0].slice(1, -1).split(",") // method 4 (specfic value)
          let output_str = ''
          for (let i = 0; i < return_array.length; i++) {
            output_str += ((i + 1) + ' ')
            output_str += (return_array[i].toString() + ' ')
        }
        res.send(output_str)
        }
      });
}

// other stuff

// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});