import axios, { AxiosInstance } from "axios";
import { sendMessageOptions, getMessageOptions, getConversationsOptions, setReadOptions } from '../typings/index'

export interface IService {
    sendMessage(params: sendMessageOptions): Promise<any>
    fetchConversations(params?: getConversationsOptions): Promise<any>
    fetchMesesge(params: getMessageOptions): Promise<any>
    setRead(params: setReadOptions): Promise<any>
    fetchUnread(): Promise<any>
    fetchProfile(params: setReadOptions): Promise<any>
    upload(data: Blob): Promise<any>
    deleteConversation(params: setReadOptions): Promise<any>
}

class Service implements IService {
    private axios: AxiosInstance;
    constructor(config: {
        url: string,
        token: string
    }) {
        const { url, token } = config
        this.axios = axios.create({
            baseURL: url,
        });
        this.axios.defaults.params = { token }
    }
    private async get(url: string, params?: { [key: string]: any }) {
        return this.axios
            .get(url, {
                params
            })
            .then((res) => {
                if (!res || !res.data) {
                    throw new Error("API 連接異常");
                }
                const { data } = res;
                if (data.code === 200) {
                    return data;
                } else {
                    console.error({
                        code: data.code,
                        message: data.message,
                    });
                    throw new Error();
                }
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    private async post(url: string, data?: { [key: string]: any } | FormData) {
        return this.axios
            .post(url, data)
            .then((res) => {
                if (!res || !res.data) {
                    throw new Error("API 連接異常");
                }
                const { data } = res;
                if (data.code === 200) {
                    return data;
                } else {
                    console.error({
                        code: data.code,
                        message: data.message,
                    });
                    throw new Error();
                }
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    async sendMessage(params:sendMessageOptions) {
        const { conversationID, type, content,push} = params;
        return this.get('/messages/send', {
            target_uid: conversationID,
            type:type,
            content:content,
            push:push
        });
    }

    async fetchConversations(params: getConversationsOptions = {}) {
        const { count, page } = params
        return this.get('/chat/users', {
            limit: count,
            page
        });
    }

    async fetchMesesge(params: getMessageOptions) {
        const { conversationID, count, nextReqMessageID } = params
        return this.get('/messages/getHistoricalMessage', {
            link_user: conversationID,
            node_marker: nextReqMessageID,
            limit: count
        })
    }

    async setRead(params: setReadOptions) {
        const { conversationID } = params
        return this.post('/chat/readMsg', {
            target_uid: conversationID
        })
    }

    async fetchUnread() {
        return this.get('/chat/getAllNewMessage') 
    }

    async fetchProfile(params: setReadOptions) {
        const { conversationID } = params
        return this.get('/chat/getConversationInfo', {
            target_uid: conversationID
        })
    }

    async upload(data: Blob) {
        const formData = new FormData()
        formData.append('picture', data)
        return this.post('/messages/pictureUpload', formData)
    }

    async deleteConversation(params: setReadOptions) {
        const { conversationID } = params
        return this.post('/messages/delLiaisonPerson', {
            target_uid: conversationID
        })
    }
}

export { Service }
