
function Compiler(options) {
    this.vm = options
    this.$data = options.data
    this.options = options
    this.$el = typeof options.el === 'string' ? getElm(options.el) : options.el
    this.init()
    document.body.appendChild(this.fragment)
}

Compiler.prototype.init = function () {
    this.createFragment()
    this.compiler(this.fragment)
}

Compiler.prototype.createFragment = function () {
    this.fragment = createFragment()
    let child;
    while (child = this.$el.firstChild) {
        this.fragment.appendChild(child)
    }
}

Compiler.prototype.compiler = function (el) {
    let nodes = [].slice.call(el.childNodes)
    if (nodes.length > 0) {
        for (var i = 0; i < nodes.length; i++) {
            let node = nodes[i],
                nodeType = node.nodeType;
            // 文字节点
            if (nodeType === 3) {
                this.handerText(node)
            }

            // 元素节点
            if (nodeType === 1) {
                this.handleAttrs(node)
            }

            if (node.childNodes.length > 0) {
                this.compiler(node)
            }

        }
    }
}


Compiler.prototype.compilerText = function (node, property) {
    directive.text(this.vm, node, property)
}

Compiler.prototype.handerText = function (node) {
    let reg = /\{\{(\w+)\}\}/,
        text = getTextContent(node)
    if (reg.test(text)) {
        // 差值
        this.compilerText(node, RegExp.$1.trim())
    }
}

Compiler.prototype.handleAttrs = function (node) {
    // 查找指令
    let attrs = [].slice.call(node.attributes);
    for (var i = 0; i < attrs.length; i++) {
        let attr = attrs[i],
            name = attr.name;
        if (isDirective(name)) {
            // 事件单独处理
            if (isEvent(name)) {
                let eventName = name.split(':')[1]
                if (name.includes('@')) {
                    eventName = name.split('@')[1]
                }
                directive.handlerEvent(this.options, node, attr.value, eventName)
            } else {
                let pre = name.split('-')[1]
                directive[pre](this.vm, node, attr.value)
            }

        }
    }
}

const directive = {
    html: function (vm, node, key) {
        this.update(vm, node, key, 'html')
    },
    text: function (vm, node, key) {
        this.update(vm, node, key, 'text')
    },
    model: function (vm, node, key) {
        this.update(vm, node, key, 'model')
        node.addEventListener('input', (e) => {
            let target = e.target,
                val = target.value;
            vm[key] = val;
        })
    },
    handlerEvent: function (vm, node, key, eventName) {
        node.addEventListener(eventName, vm.methods[key].bind(vm))
    },
    update: function (vm, node, key, pre) {
        let updateText = update[pre];
        let watcher = new Watcher(vm, key, function (value) {
            updateText(node, value)
        })
        updateText(node, watcher.value)
    }
}


const update = {
    text: function (node, value) {
        node.textContent = value
    },
    html: function (node, value) {
        node.innerHTML = value
    },
    model: function (node, value) {
        node.value = value
    }
}


