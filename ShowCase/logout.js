var APIConnectionString = "https://localhost:7227/";
var sessionToken = getCookie("SessionToken");
const logoutButton = document.querySelector(".uitloggen_knop");


logoutButton.addEventListener("click", async (event) => {
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();

    let response = await fetch(`${APIConnectionString}LogoutUser` , {
        method: 'POST',
        headers: {'token': `${getCookie("SessionToken")}`}
    });

    let data = await response.json();
    console.log(data);
    document.cookie = "SessionToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"

    //document.cookie = `SessionToken=jo`;
    window.location.href = "http://localhost:63342/ShowCase/login.html";
});

//get token from cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}