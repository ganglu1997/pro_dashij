$.ajaxPrefilter(function (Option) {
  Option.url = 'http://api-breakingnews-web.itheima.net' + Option.url

  if (Option.url.includes('/my/')) {
    Option.headers = { Authorization: localStorage.getItem('token') }
  }
  Option.complete = function (res) {
    if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
      localStorage.removeItem('token')
      location.href = './login/login.html'
    }
  }
})