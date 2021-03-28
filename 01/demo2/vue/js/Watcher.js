function Watcher(vm, expAndFn, cb) {
    this.vm = vm
    this.expAndFn = expAndFn
    this.cb = cb
    // 收集依赖
    this.value = this.get()
}



Watcher.prototype.update = function () {
    this.run()
}

Watcher.prototype.run = function () {
    let newValue = this.get()
    this.cb(newValue)
}


Watcher.prototype.get = function () {
    Dep.target = this
    // 获取 收集依赖
    let value = this.vm[this.expAndFn]
    Dep.target = null
    return value
}