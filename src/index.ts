import { Emitter, IEmitter } from './eventEmitter'
import { IMType, IConfig, EventType, getMessageOptions, sendMessageOptions,getConversationsOptions, setReadOptions, IConnectOptions } from '../typings/index'
import { Service, IService } from './service'
import qs from 'qs'

class IM implements IMType {
    private socket: WebSocket | undefined;
    private url: string;
    private wssUrl: string;
    private token: string | undefined;
    private event: IEmitter
    private service!: IService;
    private timer: number;

    constructor(config: IConfig) {
        const { url, wssUrl } = config;
        this.url = url;
        this.wssUrl = wssUrl || url;
        this.event = new Emitter()
        this.timer = 0
    }

    private attachEvent() {
        if (!this.socket || !this.token) {
            return
        }
        this.service = new Service({
            url: this.url,
            token: this.token
        })
        this.socket.addEventListener('open', (event) => {
            this.startheartBeat()
            this.event.emit('ready', event)
        })
        this.socket.addEventListener('message', (event) => {
            try {
                this.startheartBeat()
                const content = JSON.parse(event.data)
                if (!content || content.code === 4006) {
                    this.event.emit('error', event)
                }
                if (content.type) {
                    this.event.emit('message', content)
                }
            } catch (e) {

            }
        })
        this.socket.addEventListener('error', (event) => {
            this.stopHeartBeat()
            this.event.emit('error', event)
        })
        this.socket.addEventListener('close', (event) => {
            this.stopHeartBeat()
            this.event.emit('error', event)
        })
    }

    private startheartBeat() {
        clearInterval(this.timer)
        this.timer = window.setInterval(() => {
            if (this.socket) {
                this.socket.send('HeartBeat')
            }
        }, 30000)
    }

    private stopHeartBeat() {
        clearInterval(this.timer)
    }

    on(event: EventType, callback: () => void) {
        this.event.on(event, callback)
    }

    async sendMessage(options: sendMessageOptions) {
        if (this.service) {
            return this.service.sendMessage(options)
        } else {
            return Promise.reject('請先初始化')
        }
    }

    async getConversationList(options?: getConversationsOptions) {
        if (this.service) {
            return this.service.fetchConversations(options)
        } else {
            return Promise.reject('請先初始化')
        }
    }

    async *getMessageList(options: getMessageOptions) {
        let total = 0
        let data: any[] = []
        try {
            while (true) {
                const res = await this.service.fetchMesesge({
                    ...options,
                    nextReqMessageID: data[data.length - 1]?.id
                })
                const messageList: any[] = res.data.data
                data = [...data, ...messageList]
                total = res.data.total
                if (total <= data.length) {
                    return messageList.reverse()
                }
                yield messageList.reverse()
            }
        } catch(e) {
            return []
        }
    }

    async setMessageRead(options: setReadOptions) {
        if (this.service) {
            return this.service.setRead(options)
        } else {
            return Promise.reject('請先初始化')
        }
    }
    
    async getUnreadCount() {
        if (this.service) {
            return this.service.fetchUnread()
        } else {
            return Promise.reject('請先初始化')
        }
    }

    async getProfile(options: setReadOptions) {
        if (this.service) {
            return this.service.fetchProfile(options)
        } else {
            return Promise.reject('請先初始化')
        }
    }

    async uploadImage(data: Blob) {
        if (this.service) {
            return this.service.upload(data)
        } else {
            return Promise.reject('請先初始化')
        }
    }

    async deleteConversation(options: setReadOptions) {
        if (this.service) {
            return this.service.deleteConversation(options)
        } else {
            return Promise.reject('請先初始化')
        }
    }

    connect(options: IConnectOptions) {
        return new Promise<WebSocket>((resolve, reject) => {
            try {
                if (this.socket) {
                    this.socket.close()
                    this.socket = undefined
                }
                this.token = options.token
                this.socket = new WebSocket(
                    `${this.wssUrl}/wss?${qs.stringify(options)}`
                );
                this.attachEvent();
                resolve(this.socket)
            } catch (e) {
                reject(e)
            }
        })
    }

    close() {
        this.socket && this.socket.close()
    }
}

export default { IM }
