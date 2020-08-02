function submit() {
    let post_data = {
        title: meta_title.val(),
        big_cover: meta_big_cover.val(),
        small_cover: meta_small_cover.val(),
        description: meta_description.val(),
        article: markdown_source_editor.val(),
        visible: visible(),
        tags: meta_tags.val().split(","),
        type: is_big_blog() ? 1 : 0
    }

    $.ajax({
        method: "POST",
        url: "/api/newBlog",
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
