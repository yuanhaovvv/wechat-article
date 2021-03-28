

function Mvvm(options) {
    if (isUndef(options.el)) {
        throw new Error('你他哥的没传根元素')
        return
    }
    this.$options = options
    this.$data = options.data
    this._init(options)
}

Mvvm.prototype._init = function (options) {
    this.initState(options)
    new Compiler(options)
}

Mvvm.prototype.initState = function (options) {
    if (isDef(options.data)) {
        this.bindProperty()
        new Observer(options)
    }
}

/**
 * @description 解决 this.message  this.data.message
 * @param {Objct} data 值
 */
Mvvm.prototype.bindProperty = function () {
    let data = this.$data
    for (let key in data) {
        Object.defineProperty(this.$options, key, {
            enumerable: true,
            configurable: false,
            get: function () {
                return data[key]
            },
            set: function (newVal) {
                if (data[key] === newVal) {
                    return
                }
                data[key] = newVal
            }
        })
    }
}


