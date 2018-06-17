const Model = require('./main')

class Board extends Model {
    constructor(form={}) {
        super(form)
        this.title = form.title || ''
    }

    static update(form={}) {
        const id = Number(form.id)
        const m = this.get(id)
        const keys = this.frozenKeys()
        Object.keys(form).forEach((k) => {
            if (!keys.includes(k)) {
                m[k] = form[k]
            }
        })
        m.updated_time = Date.now()
        m.save()
        return m
    }

    static frozenKeys() {
        const l = [
            'id',
            'created_time',
        ]
        return l
    }
}

module.exports = Board
