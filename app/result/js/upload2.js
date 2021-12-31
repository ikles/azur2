function bytesToSize(bytes) {
 const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
 if (!bytes) {
  return '0 Byte';
}
const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

const element = (tag, classes = [], content) => {
  const node = document.createElement(tag)

  if (classes.length) {
    node.classList.add(...classes)
  }

  if (content) {
    node.textContent = content    
  }
  return node
}

const noop = function () {}

function upload(selector, options = {}) {
  let files = []
  const onUpload = options.onUpload ?? noop
  const input = document.querySelector(selector)
    //const preview = document.createElement('div')
    const preview = element('div', ['preview']);

    preview.classList.add('preview')

    /*const open = document.createElement('button')
    open.classList.add('btn')
    open.textContent = 'Откыть'*/
    const open = element('button', ['btn'], 'Открыть')
    const upload = element('button', ['btn', 'btn-primary'], 'Загрузить')
    upload.style.display = 'none'

    if (options.multi) {
      input.setAttribute('multiple', true)
    }

    if (options.accept && Array.isArray(options.accept)) {
      input.setAttribute('accept', options.accept.join(','))
    }

    input.insertAdjacentElement('afterend', preview)
    //input.insertAdjacentElement('afterend', upload)
    input.insertAdjacentElement('afterend', open)

    const triggerInput = () => input.click()

    const changeHandler = event => {
      if(!event.target.files.length) {
        return
      }

    //приводим к массиву
    files = Array.from(event.target.files)

    //чтобы при каждой загрузке исчезали фото которые загружены ранее
    //preview.innerHTML = ''
    upload.style = 'display-inline'

    files.forEach(file => {
      if (!file.type.match('image')) {
        return
      }
      
      const reader = new FileReader()
      
      reader.onload = ev => {
        //console.log(ev.target.result)
        //input.insertAdjacentHTML('afterend', `<img src="${ev.target.result}"/>`)
        const src = ev.target.result
        preview.insertAdjacentHTML('afterbegin', `
          <div class="preview-image">
          <div class="preview-remove" data-name="${file.name}">&times</div>
          <img src="${src}" alt="${file.name}" />
          <div class="preview-info">
          <span>${file.name}</span>
          ${bytesToSize(file.size)}
          </div>
          </div>
          `)
      }

      reader.readAsDataURL(file)
    })
  }

  const removeHandler = event => {
    //console.log('event', event.target.dataset)
    //если нет дата атрибута name то этот клик не нужно обрабатывать
    if(!event.target.dataset.name) {
      return
    }

    //const name = event.target.dataset.name
    //es6
    const {name} = event.target.dataset
    //console.log(files)
    files = files.filter(file => file.name !== name)

    if (!files.length) {
      upload.style.display = 'none'
    }

    const block = preview
    .querySelector(`[data-name="${name}"]`)
    .closest('.preview-image')
    block.remove();
  }

  const clearPreview = el => {
    el.style.bottom = '4px'
    el.innerHTML = '<div class="preview-info-progress"></div>'
  }

  const uploadHandler = () => {
    preview.querySelectorAll('.preview-remove').forEach(e => e.remove());
    const previewInfo = preview.querySelectorAll('.preview-info')
    previewInfo.forEach(clearPreview) 
    onUpload(files)
  }

  open.addEventListener('click', triggerInput)
  input.addEventListener('change', changeHandler)
  preview.addEventListener('click', removeHandler)
  upload.addEventListener('click', uploadHandler)

}//upload function end

upload('#file', {
  multi: true,
  accept: ['.png', '.jpeg', '.jpg', '.gif'],
  onUpload(files) {
    console.log('files', files)
  }
})