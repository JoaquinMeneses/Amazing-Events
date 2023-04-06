console.log([document])
let urlParams = location.search
console.log(urlParams)
let params = new URLSearchParams(urlParams)
console.log(new URLSearchParams)
let id = params.get("id")
console.log(id)