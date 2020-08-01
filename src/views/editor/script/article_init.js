let markdown_source_editor = $('#MD_source')
let copy_all_btn = $('#copy_all');
let converter = new showdown.Converter()
let preview_article = $('#preview_article')

$('#download_md').click(() => {
    let link = document.createElement('a');

    let title = $('#article_title').val();
    let file_content = markdown_source_editor.val();
    if (title !== '') {
        link.download = title + '.md';
    } else {
        link.download = 'Untitled.md';
    }
    let blob = new Blob([file_content], {type: 'text/plain'});
    link.href = window.URL.createObjectURL(blob);
    link.click();
})


copy_all_btn.click(() => {
    md_textarea.select();
    document.execCommand('copy');
    copy_all_btn.addClass('btn-success')
    setTimeout(() => {
        copy_all_btn.removeClass('btn-success')
    }, 1000)
})

$('#upload_md').click(() => {
    let inputer = document.createElement("INPUT");
    inputer.setAttribute("type", "file");
    inputer.click()
    let fr = new FileReader();
    fr.onload = function () {
        md_textarea.val(fr.result)
    }
    inputer.addEventListener('change', () => {
        fr.readAsText(inputer.files[0]);
    })
})

function render_article_preview() {
    let markdown = markdown_source_editor.val()
    let html_content = converter.makeHtml(markdown)
    preview_article.html(html_content)
}