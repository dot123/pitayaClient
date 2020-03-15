/*
 * @Author: conjurer
 * @Github: https://github.com/dot123
 * @Date: 2020-01-09 11:43:55
 * @LastEditors: conjurer
 * @LastEditTime: 2020-03-14 19:16:49
 * @Description:
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
    @property(cc.EditBox)
    private editboxRoute: cc.EditBox = null;

    @property(cc.EditBox)
    private editboxMsg: cc.EditBox = null;

    @property(cc.EditBox)
    private editboxHost: cc.EditBox = null;

    @property(cc.EditBox)
    private editboxPort: cc.EditBox = null;

    @property(cc.Label)
    private msgLabel: cc.Label = null;

    public start() {
        this.Connect();
    }

    public Notify() {
        let msg = null;
        try {
            msg = eval("(" + (this.editboxMsg.string || "{}") + ")");
        } catch (error) {
            console.error(error);
            msg = null;
        }

        if (msg) {
            console.log("[Send](%s):", this.editboxRoute.string, msg);
            nano.notify(this.editboxRoute.string.toLowerCase(), msg);
        }
    }

    public Request() {
        let msg = null;
        try {
            msg = eval("(" + (this.editboxMsg.string || "{}") + ")");
        } catch (error) {
            console.error(error);
            msg = null;
        }

        if (msg) {
            console.log("[Send](%s):", this.editboxRoute.string, msg);
            nano.request(this.editboxRoute.string.toLowerCase(), msg, data => {});
        }
    }

    public Connect() {
        this.Disconnect();

        let host = cc.sys.localStorage.getItem("host");
        if (!host) {
            host = "127.0.0.1";
        }

        let port = cc.sys.localStorage.getItem("port");
        if (!port) {
            port = "3250";
        }

        host = this.editboxHost.string || host;
        port = this.editboxPort.string || port;

        this.editboxHost.string = host;
        this.editboxPort.string = port;

        cc.sys.localStorage.setItem("host", host);
        cc.sys.localStorage.setItem("port", port);

        nano.init(
            {
                host: host,
                port: port,
                path: "/",
                handshakeCallback: serializerName => {
                    console.log(serializerName);
                },
            },
            () => {
                console.log("connectSuccess");
                this.msgLabel.string = "connectSuccess";
            }
        );

        nano.on("onReceive", (param: string) => {
            console.log("[Recv](%s):", param["route"], param["response"]);
            this.msgLabel.string = JSON.stringify(param["response"]);
        });
    }

    public Disconnect() {
        nano.disconnect();
        nano.off("onReceive");
    }
}
