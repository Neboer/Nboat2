let converter = new showdown.Converter()
let preview_article = $('#preview_article')

$('#preview').click(() => {
    render_article_preview()
    preview_area.show()
    edit_area.hide()
})
