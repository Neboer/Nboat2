function submit() {
    let post_data = {
        article: markdown_source_editor.val()
    }

    $.ajax({
        method: "PUT",
        url: "/api/" + blog_id + "/article",
        contentType: "application/json",
        data: JSON.stringify(post_data),
        success: (() => {
            alert("提交成功");
            window.location.href = "/blog/" + blog_id;
        }),
        error: ((jqXHR, textStatus, errorThrown) => {
            alert(textStatus + errorThrown)
        })
    })
}
