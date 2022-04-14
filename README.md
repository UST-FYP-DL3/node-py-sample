# SAMPLE CODE: 1️⃣ node.js - python (.py) connection & 2️⃣ read/write csv file in node.js

sample code for node.js - python file connection & load/write csv file in node.js

📂 **Main file: `/server/index.js`**

---

## 1️⃣. node.js - python (.py) connection

📌 python must use print(), go thru stdio, to node.js

📌support text, array, json (so df also ok, pandas: df.to_json)

### Use cases:
1. Text (call `text_plus_one.py`)
    - http://localhost:3001/pythontext?num=123
    - http://localhost:3001/pythontext

2. Json (call `josn_plus_one.py`)
    - http://localhost:3001/pythonjson

3. Array (call `array_plus_one.py`)
    - http://localhost:3001/pythonarray

### Ref:
> - https://medium.com/@HolmesLaurence/integrating-node-and-python-6b8454bfc272 (Version 2)
>    - need install: `npm install python-shell`
>- another way: https://www.geeksforgeeks.org/run-python-script-node-js-using-child-process-spawn-method/

---

## 2️⃣. read/write csv file in node.js

📌 read/write a csv file as an array of json objects

### Ref:
> - https://stackabuse.com/reading-and-writing-csv-files-in-nodejs-with-node-csv/
>   -  need install: `npm install csv-parse` and `npm install csv-stringify`
