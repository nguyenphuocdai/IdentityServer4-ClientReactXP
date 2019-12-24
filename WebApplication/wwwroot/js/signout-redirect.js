window.addEventListener("load", function () {
    var a = document.querySelector("a.PostLogoutRedirectUri");
    var b = document.querySelector("a.PostLogoutRedirectUris");
    
    if (a) {
        window.location = a.href;
    }
    if (b) {
        window.location = a.href;
    }
    console.log(a);
    console.log(b);
});
