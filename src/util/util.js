import Storage from 'good-storage'

export function getRedireactPath({type, avatar}) {
  // 根据用户信息 返回跳转地址
  // type  boss | genius
  // avatar /bossinfo | geniusinfo
  let url = type === 'boss' ? '/boss' : '/genius'
  if (!avatar) {
    url += 'info'
  }
  console.log(url)
  return url
}

export function checkLogin() {
  const token = Storage.get('token')
  return new Promise((resolve, reject) => {
    if (token) {
      resolve(token)
    } else {
      reject('未登录')
    }
  })
}
