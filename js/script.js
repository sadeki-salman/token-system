// Define UI Elements--------------------------------
let form = document.getElementById("token_form");
let tokenInput = document.getElementById("new_token");
let search = document.getElementById("filter_token");
let tokenList = document.getElementById("token_list");
let clear = document.getElementById("clear_btn");

// Define Event Listeners----------------------------
document.addEventListener("DOMContentLoaded", getToken);
form.addEventListener("submit", addToken);
tokenList.addEventListener("click", removeToken);
search.addEventListener("keyup", filterToken);
clear.addEventListener("click", clearToken);
// tokenInput.addEventListener("keyup", filterToken);




// Define Functions----------------------------------

//Get Tokens on First Load***
function getToken() {
    let tokens;
    if (localStorage.getItem("tokens") === null) {
        tokens = [];
    } else {
        tokens = JSON.parse(localStorage.getItem("tokens"));
    }

    tokens.forEach(token => {
        //create li element
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(token + " "));

        //create cross button
        let cross = document.createElement("a");
        cross.setAttribute("href", "#");
        cross.innerHTML = "x";
        li.appendChild(cross);
        tokenList.appendChild(li);
    });

}
// Add Token ***
function addToken(e) {
    let count = 0;
    if (tokenInput.value === "") {
        alert("Add a Value!");
    } else {
        let tokens;
        if (localStorage.getItem("tokens") === null) {
            tokens = [];
        } else {
            tokens = JSON.parse(localStorage.getItem("tokens"));
        }

        tokens.forEach(token => {
            if (token.toLowerCase() == tokenInput.value.toLowerCase()) {
                count = 1;
            }
        });

        if (count == 1) {
            alert("Already Available!");
            count = 0;
        } else {
            // create li element
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(tokenInput.value + " "));

            //create cross button
            let cross = document.createElement("a");
            cross.setAttribute("href", "#");
            cross.innerHTML = "x";

            li.appendChild(cross);
            tokenList.appendChild(li);

            //Store Token in Local Storage
            storeTokenInLS(tokenInput.value);
            tokenInput.value = "";
        }
    }
    e.preventDefault();
}

//Remove Token***
function removeToken(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are You Sure?")) {
            let ele = e.target.parentElement;
            ele.remove();

            //Remove Token from Local Storage
            removeFromLS(ele);
        }
    }
}

//Store Token in Local Storage-------------------------
function storeTokenInLS(token) {
    let tokens;
    if (localStorage.getItem("tokens") === null) {
        tokens = [];
    } else {
        tokens = JSON.parse(localStorage.getItem("tokens"));
    }
    tokens.push(token);
    localStorage.setItem("tokens", JSON.stringify(tokens));
}


//Remove Token from Local Storage***
function removeFromLS(ele) {
    let tokens;
    if (localStorage.getItem("tokens") === null) {
        tokens = [];
    } else {
        tokens = JSON.parse(localStorage.getItem("tokens"));
    }

    ele.removeChild(ele.lastChild);

    tokens.forEach((token, index) => {
        if (ele.textContent.trim() === token) {
            tokens.splice(index, 1);
        }
    });

    localStorage.setItem("tokens", JSON.stringify(tokens));
}

//Filter Token from List 
function filterToken(e) {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll("li").forEach(token => {
        let item = token.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            token.style.display = "block";
        } else {
            token.style.display = "none";
        }
    });
    if(text == ''){
        tokenList.innerHTML = "";
        getToken();
    }
}

//Clear Token List
function clearToken() {
    if (confirm("Are You Sure?")) {
        tokenList.innerHTML = "";
        localStorage.clear();
    }
}