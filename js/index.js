window.onload = function() {
    // alert($('#postid').offset().left)
    // $(".queryContext").css("left", $('#postid').offset().left - $('.queryContext').offset().left + "px");
    var selectid = document.querySelector("#selectid");
    var selectbtn = document.querySelector("#select-btn");
    var data = [];
    $('.ser-txt').focus(function() {
        var email_txt = $(this).val();
        if (email_txt == this.defaultValue) {
            $(this).val("");
        }

    });
    $('.ser-txt').blur(function() {
        var email_txt = $(this).val();
        if (email_txt == "") {
            $(this).val(this.defaultValue);
        }

    });

    // $("#select-btn").click(function() {
    //     $("#company").css("display", "block");
    // });
    selectbtn.onclick = function(e) {
        $("#company").toggle();
        e.stopPropagation();
    };
    document.onclick = function(e) {
        $("#company").hide();
        // e.stopPropagation();
    };
    // 获取快递公司部分开始
    $.ajax({
        type: "get",
        url: "https://route.showapi.com/64-20?maxSize=100000&showapi_appid=31610&showapi_sign=794da37ef6d548bdb3faf07de393bc6d",

        dataType: "json",
        success: function(json) {
            for (var i = 0; i < json.showapi_res_body.expressList.length; i++) {
                company.loadMore(json.showapi_res_body.expressList[i]);
            }

            console.log(json.showapi_res_body.expressList);
        },
        error: function(e) {
            console.log(e);
        }
    });

    var company = new Vue({
        el: '#company',
        data: {
            items: [],
        },
        methods: {
            loadMore: function(moreData) {

                this.items.push(moreData);
            },
            toggle: function(index) {
                // console.info(index);
                selectid.value = this.items[index].expName;
                data[0] = this.items[index].simpleName;
                // data[3] = this.items[index].expName;
            }
        }
    });

    // 获取快递公司部分结束
    // 获取查询结果部分开始
    var app;
    $(".search .btn-search").click(function() {
        // alert($("#postid").val())
        $.ajax({
            type: "get",
            url: "https://route.showapi.com/64-19?com=" + data[0] + "&nu=" + $("#postid").val() + "&showapi_appid=31610&showapi_sign=794da37ef6d548bdb3faf07de393bc6d",
            dataType: "json",
            success: function(json) {
                for (var i = 0; i < json.showapi_res_body.data.length; i++) {
                    app.loadMore(json.showapi_res_body.data[i]);
                }

                console.log(json.showapi_res_body.data);
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
    // 获取查询结果部分结束
}