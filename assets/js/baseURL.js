$.ajaxPrefilter(function (Option) {
  Option.url = 'http://api-breakingnews-web.itheima.net' + Option.url

  if (Option.url.includes('/my/')) {
    Option.headers= { Authorization: localStorage.getItem('token') }
  }
})