declare interface EventEmitter {
    on(route: string, cb: (data) => void): EventEmitter;
    off(route: string, cb?: (data) => void): EventEmitter;
    once(route: string, cb: (data) => void): EventEmitter;
}

declare interface NanoClientParams {
    host: string;
    port: number;
    reconnect?: boolean;
    path?: string;
    encode?: (reqId, route, msg) => any;
    decode?: (data) => any;
    encrypt?: boolean;
    maxReconnectAttempts?: number;
    handshakeCallback?: (serializerName: string) => void;
    user?: Object; //自定义其他握手信息
    platform?: "";
    clientBuildNumber?: "";
    clientVersion?: "";
}

declare interface NanoClient extends EventEmitter {
    init(params: NanoClientParams, cb: () => void): void;
    request(route: string, msg, cb: (response) => void);
    disconnect(): void;
    notify(route: string, msg);
}

declare var nano: NanoClient;
