/// <reference types="socket.io-client" />
import { Observable } from 'rxjs';
import { BBConnection } from './BBConnection';
import { RequestTranslator } from './RequestTranslator';
export interface bbInitConfig {
    hostname: string;
    port: number;
    namespace: string;
    AuthToken?: string;
}
export declare class BackBone {
    private config;
    socket: SocketIOClient.Socket;
    token: string;
    conn: Observable<BBConnection>;
    constructor();
    connect(config: bbInitConfig): Observable<BBConnection>;
    setToken(token: any): void;
    createRequest(): RequestTranslator;
}
