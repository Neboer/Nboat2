let converter = new showdown.Converter()
let preview_area = $('#preview_area')
let edit_area = $('#edit_area')
let preview_item = $('#preview_item')
let preview_article = $('#preview_article')

preview_area.hide()

$('#preview').click(() => {
    if (typeof markdown_source_editor !== "undefined") {
        let markdown = md_textarea.val()
        let html_content = converter.makeHtml(markdown)
        preview_article.html(html_content)
    }
    if (typeof meta_title !== "undefined") {
        if (typeof big_card !== "undefined") {
            render_big_card(meta_title, meta_description, meta_small_cover)
        }
        if (typeof small_card !== "undefined") {
            render_small_card(meta_title, meta_description, meta_small_cover)
        }
        if (typeof is_big_blog !== "undefined") {
            if (is_big_blog || is_small_blog) {
                if (is_big_blog) small_card.hide();
                else big_card.hide();
            }
        }
    }
    preview_area.show()
    edit_area.hide()
})

$('#edit').click(() => {
    preview.hide()
    editor.show()
})
