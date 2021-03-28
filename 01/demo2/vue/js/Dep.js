function Dep() {
    // 依赖收集
    this.subs = []
}

Dep.target = null

Dep.prototype.addSubs = function (target) {
    this.subs.push(target)
}

Dep.prototype.depend = function () {
    if (Dep.target) {
        this.addSubs(Dep.target)
    }
}

Dep.prototype.notify = function () {
    this.subs.forEach(target => target.update())
}

