const fs = require("fs");

const readFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(file, "utf8", function (err, data) {
        if (err) {
          console.log("json read error", err);
          return reject(err);
        }
        return resolve(JSON.parse(data));
      });
    } catch (e) {
      console.log("readFromJSON error", e);
      return reject(e);
    }
  });
};

const writeToJSON = (data, file) => {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(file, JSON.stringify(data, null, 2));
      return resolve("success");
    } catch (e) {
      console.log("writeToJSON error", e);
      return reject(e);
    }
  });
};

const updateJSON = (data, file) => {
  return new Promise(async (resolve, reject) => {
    try {
      let currentData = await readFromJSON(file);
      console.log({ currentData });

      if (Array.isArray(currentData)) {
        currentData = currentData.concat(data);
      } else {
        Object.entries(data).forEach((el) => {
          let key = el[0];
          let value = el[1];
          currentData[key] = value;
        });
      }
      return resolve(await writeToJSON(currentData, file));
    } catch (e) {
      console.log("updateJSON error", e);
      return reject(e);
    }
  });
};

const formatJSON = (jsonList) => {
  let returnList = [];
  for (let jsonObject of jsonList) {
    let json = {};
    for (let myKey of Object.keys(jsonObject)) {
      let originalKey = myKey;
      myKey = myKey
        .trim()
        .toLowerCase()
        .replace(/\./g, "")
        .replace(/\s+/g, " ")
        .replace(/\s/g, "_")
        .replace(/\//g, "_");
      if (String(jsonObject[originalKey]).trim()) {
        json[myKey] = String(jsonObject[originalKey]).trim();
      }
    }
    returnList.push(json);
  }
  return returnList;
};

module.exports = {
  readFromJSON,
  writeToJSON,
  updateJSON,
  formatJSON,
};
