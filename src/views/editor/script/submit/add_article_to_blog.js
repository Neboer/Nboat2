function submit() {
    let post_data = {
        article: markdown_source_editor.val()
    }

    $.ajax({
        method: "POST",
        url: "/api" + blog_id + "/newArticle",
        contentType: "application/json",
        data: JSON.stringify(post_data),
        success: (data => {
            alert("提交成功");
            window.location.href = "/blog/" + data.id;
        }),
        error: ((jqXHR, textStatus, errorThrown) => {
            alert(textStatus + errorThrown)
        })
    })
}
