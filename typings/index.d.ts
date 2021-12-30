export as namespace addcnWebImSdk;

export interface IConfig {
    wssUrl?: string;
    url: string;
}

export type EventType = "ready" | "error" | "message";

export interface sendMessageOptions {
    conversationID: string;
    type:string;
    content:any;
    push?:number
}

export interface getMessageOptions {
    conversationID: string;
    nextReqMessageID?: string;
    count?: number;
}

export interface getConversationsOptions {
    count?: number;
    page?: number;
}

export interface setReadOptions {
    conversationID: string;
}

export interface IConnectOptions {
    token: string;
    client?: "pc" | "mobile" | "ios" | "android";
    device_id?: string;
}

export interface IMType {
    connect(options: IConnectOptions): void;
    on(event: EventType, callback: (data?: any) => void): void;
    sendMessage(params: sendMessageOptions): Promise<any>;
    getConversationList(options?: getConversationsOptions): Promise<any>;
    getMessageList(options: getMessageOptions): any;
    getUnreadCount(): Promise<any>;
    setMessageRead(options: setReadOptions): Promise<any>;
    uploadImage(data: Blob): Promise<any>;
    getProfile(options: setReadOptions): Promise<any>;
    deleteConversation(options: setReadOptions): Promise<any>;
}

export class IM implements IMType {
    constructor(config: IConfig);
    connect(options: IConnectOptions): Promise<WebSocket>;
    on(event: EventType, callback: (data?: any) => void): void;
    sendMessage(params: sendMessageOptions): Promise<any>;
    getConversationList(options?: getConversationsOptions): Promise<any>;
    getMessageList(options: getMessageOptions): any;
    getUnreadCount(): Promise<any>;
    setMessageRead(options: setReadOptions): Promise<any>;
    uploadImage(data: Blob): Promise<any>;
    getProfile(options: setReadOptions): Promise<any>;
    deleteConversation(options: setReadOptions): Promise<any>;
}
