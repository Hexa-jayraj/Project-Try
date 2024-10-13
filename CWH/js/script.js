console.log("This is a javascript");


// let result = {
//     "tag": "",
//     "free": false,
//     "role": false,
//     "user": "gihrgbola",
//     "email": "voayvbyopqgyp@viafv.com",
//     "score": 0.65,
//     "state": "undeliverable",
//     "domain": "vyogav.com",
//     "reason": "invalid_mailbox",
//     "mx_found": true,
//     "catch_all": null,
//     "disposable": false,
//     "smtp_check": false,
//     "did_you_mean": "",
//     "format_valid": true
// }

submitBtn.addEventListener("click", async () => {
    console.log("Button clicked");
    let key = "rdjtflkuip77frodzmktu76ed7koriij98tyk6jstduygol"
    let email = document.getElementById("username").value
    let url = `https://api.emailvalidation.io/info?apikey=${key}&email=${email}`
    let res = await fetch(url)
    let result = await res.json()
    let str = ``
    for (key of Object.keys(result)) {
        if (result[key] !== "" && result[key] == " "){
            str = str + `<div>${key}:${result[key]}</div>`
        }
    }

    resultCont.innerHTML = str
})

