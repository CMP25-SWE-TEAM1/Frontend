const fs = require("fs")
const path = require("path")
const componentFolder = "./src/components/Widgets/"
const componentJsonPath = "./docs/Widgets.json"
const componentDataArray = []
import("react-docgen").then((reactDocs) => {
  function pushComponent(component) {
    componentDataArray.push(component)
  }
  function createComponentFile() {
    const componentJsonArray = JSON.stringify(componentDataArray, null, 2)
    fs.writeFile(componentJsonPath, componentJsonArray, "utf8", (err, data) => {
      if (err) {
        throw err
      }
      console.log("Created component file")
    })
  }
  /**
   * Use React-Docgen to parse the loaded component
   * into JS object of props, comments
   *
   * @param {File} component
   * @param {String} filename
   */
  function parseComponent(component, filename) {
    const componentInfo = reactDocs.parse(component)
    const splitIndex = filename.indexOf("/src/")
    const shortname = filename.substring(splitIndex + 4)
    componentInfo.filename = shortname
    pushComponent(componentInfo)
  }
  /**
   * Loads a component file, then runs parsing callback
   * @param {String} file
   * @param {Promise} resolve
   */
  function loadComponent(file, resolve) {
    fs.readFile(file, (err, data) => {
      if (err) {
        throw err
      }
      // Parse the component into JS object
      resolve(parseComponent(data, file))
    })
  }
  function filewalker(dir, done) {
    let results = []
    fs.readdir(dir, async (err, list) => {
      if (err) return done(err)
      let pending = list.length
      if (!pending) return done(null, results)
      list.forEach((file) => {
        file = path.resolve(dir, file)
        fs.stat(file, async (err, stat) => {
          // If directory, execute a recursive call
          if (stat && stat.isDirectory()) {
            filewalker(file, (err, res) => {
              results = results.concat(res)
              if (!--pending) done(null, results)
            })
          } else {
            // Check if is a Javascript file
            // And not a story or test
            if (file.endsWith(".jsx") && !file.endsWith(".story.js") && !file.endsWith(".test.js") && !file.endsWith(".js")) {
              await new Promise((resolve) => {
                loadComponent(file, resolve)
              })
              await results.push(file)
            }
            if (!--pending) done(null, results)
          }
        })
      })
    })
  }
  filewalker(componentFolder, (err, data) => {
    if (err) {
      throw err
    }
    createComponentFile()
  })
})
