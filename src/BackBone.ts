import * as io from 'socket.io-client';
import { Observable, Subject ,race} from 'rxjs';
import { BBConnection, BBChannel } from './BBConnection';
import { RequestTranslator } from './RequestTranslator';
import { switchMap, map, merge, concat, tap, expand, share } from 'rxjs/operators';

export interface bbInitConfig{
  hostname:string,
  port:number,
  namespace:string,
  AuthToken?:string
}

export class BackBone{
  private config:bbInitConfig;
  socket: SocketIOClient.Socket;
  token:string;
  conn:Observable<BBConnection>;
  constructor(){}
  connect(config:bbInitConfig):Observable<BBConnection>{
    this.config=config;
    let ob=new Observable<BBConnection>((observer)=>{
      this.socket=io(this.config.hostname+":"+this.config.port+"/"+this.config.namespace);
      this.socket.on('connect',()=>{
        console.log("connection established!!")
        this.socket.emit('init',{token:this.config.AuthToken},(err,result)=>{
          if(err){
            this.socket.disconnect();
            observer.error(err);
            observer.complete();
            console.log(err);
            return;
          }else{
            observer.next(new BBConnection(this.socket,this.token));
            return
          }
        });
      })
    }).pipe(share());
    return ob;
  }
  setToken(token){
    this.token=token;
    if(this.conn){
      this.conn.subscribe(conn=>{
        conn.setToken(this.token);
      })
    }
  }
  createRequest():RequestTranslator{
    return new RequestTranslator();
  }

}
