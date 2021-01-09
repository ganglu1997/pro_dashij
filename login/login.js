$(function () {
  // 登录注册切换
  $('#goReg').on('click', function (e) {
    $('#loginForm').hide()
    $('#regForm').show()
  })
  $('#goLogin').on('click', function (e) {
    $('#loginForm').show()
    $('#regForm').hide()
  })
  //校验规则
  layui.form.verify({
    regPwd: function (val) {
      if ($('.regPwd').val() !== val) {
        return '两次密码输入不一致，请重新输入'
      }
    },
    pwd: [/^\S{6,12}/, '密码必须是6~12位,且不能出现空格']
  })

  // 注册
  $('#regForm').on('submit', function (e) {
    e.preventDefault()
    var data = $(this).serialize()
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: data,
      success: function (res) {
        if (res.status !== 0) {
          layui.layer.msg('注册失败，请稍后重试')
        }
        layui.layer.msg(res.message)
      }
    })
  })

  // 登录
  $('#loginForm').on('submit', function (e) {
    e.preventDefault()
    var data = $(this).serialize()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: data,
      success: function (res) {
        if (res.status !== 0) return layui.layer.msg('登录失败')
        localStorage.setItem('token', res.token)
        location.href = '../index.html'
      }
    })
  })
})



