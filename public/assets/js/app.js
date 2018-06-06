window.onload = function () {
  $(document).on("click", ".addC",function() {
    let id = $(this).data("id");
    console.log(id);
    // $(`#${id}`).css("transition", "max-height 0.75s ease-out");
    $(`#${id}`).css("max-height", "200px");
  });

  $(document).on("click", ".cancelC",function() {
    let id = $(this).data("id");
    console.log(id);
    // $(`#${id}`).css("transition", "max-height 0.75s ease-in");
    $(`#${id}`).css("max-height", "0px");
  });

  $(document).on("click", ".submit", function (e) {
    e.preventDefault();
    var author = $(this).siblings("#author").val().trim();
    var comment = $(this).siblings("#txtarea").val().trim();
    var articleId = $(this).data("id");
    var commentObject = {
      author: author,
      comment: comment,
      id: articleId
    }
  
    $.post("/newcomment", commentObject)
      .then(function (data) {
      });
  });
}