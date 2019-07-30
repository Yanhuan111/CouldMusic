
let Toast = {}
// install  字段名key值
Toast.install = function (Vue, options) {
    let opt = {
        defaultType: 'center', //默认显示的位置
        duration: '1500' //持续的时间
    }
    // 循环对象
    for (let property in options) {
        // 使用options的配置 把options对象里的每一项复制到opt中
        opt[property] = options[property]
    }
    Vue.prototype.$toast = (tips, type) => {
        if (type) {
            // 第二个参数type: 位置
            opt.defaultType = type
        }
        if (document.getElementsByClassName('vue-toast').length) {
            return // 如果toast此时在页面是出现状态，则不再执行
        }
        // vue扩展
        let toastTpl = Vue.extend({
            template: '<div class="vue-toast toast-' + opt.defaultType + '">' + tips + '</div>'
        })
        let tpl = new toastTpl.$mount().$el
        document.body.appendChild(tpl)
        setTimeout(() => {
        document.body.removeChild(tpl)
        },opt.duration)
    }
    ['bottom', 'center', 'top'].forEach(type =>{
        Vue.prototype.$toast[type] = (tips) =>{
            return Vue.prototype.$toast(tips, type)
        }
    })
}


let Loading = {}
Loading.install = function (Vue) {
    let tpl
    Vue.prototype.$showLoading = () => {
        if(document.getElementsByClassName('vue-loading').length){
            return
        }
        let loadingTpl = Vue.extend({
            // 创建构造器 定义好提示信息
            template: '<div class="vue-loading"></div>'
        })
        tpl = new loadingTpl.$mount.$el
        document.body.appendChild(tpl)
    }
    Vue.prototype.$hideLoading = () => {
        if(document.getElementsByClassName('vue-loading').length){
            document.body.removeChild(tpl)
        }
    }
}

export {
    Toast,
    Loading
}