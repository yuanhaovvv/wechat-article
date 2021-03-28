function Observer(vm) {
    this.vm = vm
    this.initData(vm.data)
}

Observer.prototype.initData = function (data) {
    for (var key in data) {
        this.defineReactive(data, key, data[key])
    }
}

Observer.prototype.defineReactive = function (obj, key, value) {

    let dep = new Dep()

    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get: function () {
            dep.depend()
            return value
        },
        set: function (newValue) {
            if (value === newValue) {
                return
            }
            value = newValue
            dep.notify()

        }
    })
}



