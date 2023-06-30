export function getTopics (setOutline) {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    process("http://localhost:3030/topics", requestOptions, setOutline)
  };

  export function addTopic (data, setResult) {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        dataType: 'json',
      },
    };
    process("http://localhost:3030/topics", requestOptions, setResult)
  };

  export function updateTopic (id, data, setResult) {
    var requestOptions = {
      method: "PUT",
      redirect: "follow",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    process("http://localhost:3030/topics/"+id, requestOptions, setResult)
  };

  export function process(url, requestOptions, setResult){
    fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => setResult(result))
        .catch((error) => console.log("error", error));
  }

