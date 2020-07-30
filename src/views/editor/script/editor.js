// - 无论是修改博文还是创建新博文，这个文件总能用得上，但是还是要进行细致的拆分。
let converter = new showdown.Converter()
preview = $('#HTML_preview')
editor = $('#full_edit')
md_textarea = $('#MD_source')
$('#preview').click(() => {
    preview.show()
    editor.hide()
    let markdown = md_textarea.val()
    let html_content = converter.makeHtml(markdown)
    preview.html(html_content)
})

$('#edit').click(() => {
    preview.hide()
    editor.show()
})

$('#download_md').click(() => {
    let link = document.createElement('a');
    let title = $('#article_title').val();
    let file_content = $('#MD_source').val();
    if (title !== '') {
        link.download = title + '.md';
    } else {
        link.download = 'Untitled.md';
    }
    let blob = new Blob([file_content], {type: 'text/plain'});
    link.href = window.URL.createObjectURL(blob);
    link.click();
})

let copy_all_btn = $('#copy_all');

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
