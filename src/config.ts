export function loadJsonConfig<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest()
    xhttp.overrideMimeType('application/json')
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const jsonResponse = this.responseText
        const response = JSON.parse(jsonResponse)
        resolve(response)
      } else {
        reject('Could not load ' + url + ' file')
      }
    }
    xhttp.open('GET', url, true)
    xhttp.send()
  })
}
