$(function () {
  $('#exit').on('click', function () {
    layer.confirm('确认退出登录', { icon: 3, title: '提示' }, function (index) {
      localStorage.removeItem('token');
      location.href = './login/login.html'
      layer.close(index);
    });
  })
  getAvatar()
})
function getAvatar() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) {
        return layui.msg('获取头像失败')
      }
      if (res.data.user_pic === null) {
        $('.layui-nav-img').hide()
      } else {
        $('.layui-nav-img').prop('src', res.data.user_pic)
        $('.defAvatar').hide()
      }
      var name = res.data.nickname || res.data.username
      $('.defAvatar').html(name[0].toUpperCase())
      $('.welcome').html('欢迎 &nbsp;' + name)
    }
  })
}
