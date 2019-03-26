$('.submit-comment').on('click', (event) => {
    const articleId = event.target.dataset.id;
    const user = $('.form-' + articleId + ' #name').val();
    const comment = $('.form-' + articleId + ' #comment').val();
    $('.form-' + articleId + ' #name').val('');
    $('.form-' + articleId + ' #comment').val('');
    $.post("/api/comments/add", {user, comment, articleId}).then(function(data) {
        console.log('sent');
    });
    
});