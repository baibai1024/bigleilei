const form = layui.form
form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samePwd: (val) =>{
        if (val === $('[name=oldPwd]').val()) return "新旧密码不能相同！"
 
    },
    repwd: (val) => {
        if (val !== $("[name=newPwd]").val()) return "两次密码不一致！";
    },
})
$(".layui-form").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/my/updatepwd",
        data: $(".layui-form").serialize(),
        success: (res) => {
            if (res.status !== 0) return layer.msg("更新密码失败！");
            localStorage.removeItem('token')
            window.parent.location.href = '/login.html';


            // layer.msg("更新密码成功！");
            // 重置表单
            // $(".layui-form")[0].reset();
        },
    });
});