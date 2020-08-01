function submit() {
    let post_data = {
        title: meta_title.val(),
        big_cover: meta_big_cover.val(),
        small_cover: meta_small_cover.val(),
        description: meta_description.val(),
        tags: meta_tags.val().split(','),
    }

    $.ajax({
        method: "PUT",
        url: "/api/" + blog_id + "/meta",
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
