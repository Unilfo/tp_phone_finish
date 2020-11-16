async function fetchToDbGet(path) {
  let response = await fetch(`http://192.168.3.134:5000/${path}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      Authorization: "Bearer ",
    },
  })
  return response
}

async function fetchToDbPost(path, method, body = '') {
  let response = await fetch(`http://192.168.3.134:5000/${path}`, {
    method: method,
    mode: 'cors',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      Accept: 'application/json',
      Authorization: 'Bearer ',
    },
  })
  return response
}

async function fetchToDbDelete(path, method){
  let response = await fetch(`http://192.168.3.134:5000/${path}`, {
    method: method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      Accept: 'application/json',
      Authorization: 'Bearer ',
    },
  })
  return response
}

export {fetchToDbGet, fetchToDbPost, fetchToDbDelete}
