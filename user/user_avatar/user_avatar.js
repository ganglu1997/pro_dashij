$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }
  // // 1.3 创建裁剪区域
  $image.cropper(options);

  $('#shangchuan').on('click', function () {
    $('#files').click()
    $('#files').on('change', function (e) {
      if (e.target.files.length === 0) {
        return layui.layer.msg('请选择图片')
      }
      var file = e.target.files[0]
      var imgURL = URL.createObjectURL(file)

      // 3. 重新初始化裁剪区域
      $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', imgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
    })
  })

  $('#queding').on('click', function () {
    // 调用cropper 中的toDataURL 把画布中图片转换为base64格式的
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 100 * 100 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')
    // 然后发起请求,服务器接收图片格式是base64格式的
    replaceAvatar(dataURL)
  })
})

function replaceAvatar(dataURL) {
  $.ajax({
    method: 'POST',
    url: '/my/update/avatar',
    data: { avatar: dataURL },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('更换头像失败')
      }
      layui.layer.msg('更换头像成功')
      // 调用方法更新头像
      window.parent.getAvatar()
    }
  })
}