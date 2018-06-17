// const e = sel => document.querySelector(sel)
//
// const upload = function(formData) {
//     const request = {
//         url: '/user/upload/avatar',
//         method: 'post',
//         data: formData,
//         contentType: false,
//         processData: false,
//         success: function(r) {
//             console.log('上传成功', r)
//             // 这里写你的回调
//             console.log('上传成功', r.data)
//             const img = e('.avatar1')
//             img.src = '/user/avatar/' + r.data
//         },
//         error: function(e) {
//             console.log('debug e', e)
//         }
//     }
//
//     $.ajax(request)
// }
//
// const postImg = () => {
//     const btn = e('.upload')
//     const file = e('#upload-file')
//     btn.addEventListener('click', () => {
//         const f = file.files[0]
//         const form = new FormData()
//         form.append('avatar', f)
//         upload(form)
//     })
// }
//
// const __main = () => {
//     postImg()
// }
//
// __main()


