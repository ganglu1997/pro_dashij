$(function () {
  getUserInfo()
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    setUserInfo()
    window.parent.getAvatar()
  })
  // 验证规则
  layui.form.verify({
    nickname: [
      /^[\S]{3,6}$/
      , '用户名必须3到6位，且不能出现空格'
    ]
  });
  $('#reset').on('click', function (e) {
    e.preventDefault()
    getUserInfo()
  })
})

function getUserInfo() {
  $.ajax({
    method: 'get',
    url: '/my/userinfo',
    success: function (res) {
      // 快速为表单赋值
      layui.form.val('userInfo', res.data)
    }
  })
}
function setUserInfo() {
  $.ajax({
    method: 'post',
    url: '/my/userinfo',
    data: $('.layui-form').serialize(),
    success: function (res) {
      if (res.status !== 0) return layui.layer.msg('修改用户信息失败')
      layui.layer.msg('修改用户信息成功')
    }
  })
}