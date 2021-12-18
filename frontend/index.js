$(document).ready(function () {
    //////////////////                                scroll fonksiyonu 
    $(window).scroll(function () {
        var s = $(document).scrollTop()
        var d = (100 * s) / ($("body").css("height").slice(0, -2) - 660)
        $("#progress00").css("width", d + "%");
        // $("#navbarLeft").css("display", "none");
        // $("#textRight").css("margin-left", "0px");
    })

    //////////////////                                navbarLeft
    $("#navbarLeftButton").click(function () {
        $("#navbarLeft").toggle()
        if ($("#navbarLeft").css("display") == "none") {
            $("#textRight").css("margin-left", "2%")
        } else {
            $("#textRight").css("margin-left", "15%")

        }

    })

    $("#bas").click(function () { // jquery ajax get
        var x = $.get("/components.json", function (data) {
            // data.forEach(element => {
            //     console.log(element)
            // });
            console.log(JSON.stringify(data));

            $("#sil1").text(JSON.stringify(data))


        })
    })

    $.get("/components.json", function (data, status) {
        data.forEach(element => {
            var shortName = element.shortName;
            var head = element.head;
            var detail = element.detail;
            var code = element.code;
            var id = element.id;
            AddText(shortName, head, detail, code, id);
            AddTitle(shortName, id, head)
        })
    })

})



function AddText(shortName, head, detail, code, id) {
    var x = ` <div class=""  id = "${head}1" >
        <div class="card" id="${id}">
            <h5 class="card-header"></h5>
            <div  class = "card-body" >
                <h5 id="${head}1" class="card-title" style="color:red">${head}</h5>
                <p class="card-text">${detail}</p>
                <hr style="border: 1px solid green">
                <textarea id="code" oninput="auto_grow(this)" spellcheck="false" class="js-auto-size" rows="5">${code}</textarea><br>
                <hr style="border: 1px solid green">
                <a href="#" class="btn btn-primary" >TRY IT</a>
                 <button id="aa" type="button" onclick="copy(this)" class="btn btn-primary" style="background-color:blue">COPY</button>
                 <button   id="${id}" type="button" onclick="del(${id})" class="btn btn-danger" >DELETE</button>
            </div>
        </div>
    </div>
    <br>
`
    $("#textRight").append(x)
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}

function copy(event) {

    /* Get the text field */
    var copyText = $(event)[0]
    /* Alert the copied text */
    $(copyText).text("COPİED")
    $(copyText).css("background-color", "green")

    setTimeout(function () {
        $(copyText).css("background-color", "blue")
        $(copyText).text("COPY")
    }, 2000)


    copyText1 = $(copyText).parent().children("#code")

    /* Select the text field */
    copyText1.select();

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText1.val());

}

function AddTitle(shortName, id, head) {
    var title = `<button id=${head} class = "list-group-item list-group-item-action" ><a href="#${head}1">${shortName}</a></button>    `
    $("#navbarLeft").append(title)
}

function del(id) {
    var password = prompt("Are you sure you want to delete!")
    if (password === "0000") {
        const response = fetch("/delete", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: `{
   "Id": ${id}
  }`,
        }).then(response => response).catch(err => err)
        alert("Component was deleted successfully");
    } else {
        alert("Wrong password!")
    }



}