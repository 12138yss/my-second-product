//进行表单检验
//用户名不能为空，字符集长度在2-6之间
//密码不能为空，字符集长度在6-12之间
$(function () {
    $("#form").bootstrapValidator({

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',   // 校验成功
            invalid: 'glyphicon glyphicon-remove',   // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
        },

        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 2,
                        max: 4,
                        message: "用户名长度必须在2-6位之间"
                    },
                    callback:{
                        message:"用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须在6-12位之间"
                    },
                    callback:{
                        message:"密码不正确"
                    }
                }
            }
        }
    })

    $("#form").on("success.form.bv",function (e){
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$("#form").serialize(),
            dataType:"json",
            success:function (info){
                if(info.success){
                    location.href = "index.html"
                }
                if(info.error ===1000){
                    $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
                }
                if(info.error === 1001){
                    $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
                }
            }
        })
    })
    $('[type="reset"]').click(function (){
        $("#form").data("bootstrapValidator").resetForm(true);
    })
})