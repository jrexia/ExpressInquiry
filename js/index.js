window.onload = function() {
    // alert($('#postid').offset().left)
    // $(".queryContext").css("left", $('#postid').offset().left - $('.queryContext').offset().left + "px");
    $('#postid').focus(function() {
        var email_txt = $(this).val();
        if (email_txt == this.defaultValue) {
            $(this).val("");
        }

    });
    $('#postid').blur(function() {
        var email_txt = $(this).val();
        if (email_txt == "") {
            $(this).val(this.defaultValue);
        }

    });

    var app;
    $(".search .btn-search").click(function() {
        // alert($("#postid").val())
        $.ajax({
            type: "get",
            url: "https://route.showapi.com/880-1?nu=" + $("#postid").val() + " &showapi_appid=31976&showapi_sign=07286aedccaf4f5d9cd3c9e92e6fe036",

            dataType: "json",
            success: function(json) {
                for (var i = 0; i < json.showapi_res_body.data.length; i++) {
                    app.loadMore(json.showapi_res_body.data[i]);
                }

                console.log(json.showapi_res_body.data[0].time);
            },
            error: function(e) {
                console.log(e);
            }
        });
    });

    app = new Vue({
        el: '#app',
        data: {
            items: [],
        },
        methods: {
            loadMore: function(moreData) {

                this.items.push(moreData);
            }
        }
    });
}