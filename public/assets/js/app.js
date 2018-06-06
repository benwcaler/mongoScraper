window.onload = function () {
  $(document).on("click", ".addC", function () {
    let id = $(this).data("id");
    let shown = false;
    if (shown) {
      shown = true;
      $(".comments").css("max-height", "0px");
    } else {
      shown = false;
      $(`#${id}`).css("max-height", "200px");
    }
  });

  $(document).on("click", ".cancelC", function () {
    let id = $(this).data("id");
    $(`#${id}`).css("max-height", "0px");
  });

  $(document).on("click", ".submit", function (e) {
    // e.preventDefault();
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

  $(document).on("click", ".del", function () {
    let commentid = $(this).data("id");
    let articleid = $(this).closest("div.comments").attr("id");

    var del = {
      commentid: commentid,
      articleid: articleid
    }

    $.ajax({
      url: "/del",
      type: 'DELETE',
      data: del,
      statuscode: {
        500: function () {
          console.log("Script exhausted");
        }
      }
    });
  });

}