import EventEmitter from 'events'

export interface IEmitter {
    on(type: string, callback: () => void): void,
    emit(type: string, value: any): void
}

class Emitter implements IEmitter {
    private emitter: EventEmitter
    constructor() {
        this.emitter = new EventEmitter()
    }

    on(type: string, callback: () => void) {
        this.emitter.on(type, callback)
    }

    emit(type: string, value: any) {
        this.emitter.emit(type, value)
    }
}

export { Emitter }