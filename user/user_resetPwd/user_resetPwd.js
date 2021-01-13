$(function () {

  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    updataPassword()
  })
  // 校验规则
  layui.form.verify({
    newPwd: function (val) {
      if (val === $('[name="oldPwd"]').val()) {
        return '新密码和旧密码不能一致'
      }
    },
    confirmPwd: function (val) {
      if (val !== $('#confirmPwd').val()) {
        return '两次密码输入不一致，请重新输入'
      }
    },
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ]
  });
})

function updataPassword() {
  $.ajax({
    method: 'post',
    url: '/my/updatepwd',
    data: $('.layui-form').serialize(),
    success: function (res) {
      if (res.status === 1) {
        return layui.layer.msg(res.message);
      }
      layui.layer.msg(res.message);
      $('.layui-form')[0].reset()
    }

  })
}