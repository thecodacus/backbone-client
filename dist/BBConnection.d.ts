/// <reference types="socket.io-client" />
import { Subject, Observable } from "rxjs";
import { operation } from "./RequestTranslator";
export interface BBChannel {
    cursor: Subject<any>;
    id: string;
}
export declare class BBConnection {
    private socket;
    private conn;
    private auth;
    private closed;
    private token;
    constructor(socket: SocketIOClient.Socket, token?: string);
    runRequest(request: Array<operation>, connetable?: boolean): Observable<BBChannel>;
    _setupChannel(channelId: string): BBChannel;
    createChangeFeed(source: BBChannel, change: BBChannel): BBChannel;
    close(): void;
    setToken(token: any): void;
    isAuthenticated(): Observable<any>;
}
