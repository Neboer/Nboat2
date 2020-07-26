$('#submit').click(() => {
    $.ajax({
        type: "POST",
        url: "/api/newblog",
        data: $('#MD_source').val(),
        contentType: 'text/plain'
    })
})