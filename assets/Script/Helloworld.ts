/*
 * @Author: conjurer
 * @Github: https://github.com/dot123
 * @Date: 2020-01-09 11:43:55
 * @LastEditors: conjurer
 * @LastEditTime: 2020-03-10 23:09:50
 * @Description:
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
    @property(cc.EditBox)
    private editboxRoute: cc.EditBox = null;

    @property(cc.EditBox)
    private editboxMsg: cc.EditBox = null;

    @property(cc.Label)
    private msgLabel: cc.Label = null;

    public start() {
        nano.init({ host: "127.0.0.1", port: 3250, path: "/" }, () => {
            console.log("connectSuccess");
            this.msgLabel.string = "connectSuccess";
        });

        nano.on("onReceive", (param: string) => {
            console.log("[Recv](%s):", param["route"], param["response"]);
            this.msgLabel.string = JSON.stringify(param["response"]);
        });
    }

    public Notify() {
        let msg = null;
        try {
            msg = JSON.parse(this.editboxMsg.string || "{}");
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
            msg = JSON.parse(this.editboxMsg.string || "{}");
        } catch (error) {
            console.error(error);
            msg = null;
        }

        if (msg) {
            console.log("[Send](%s):", this.editboxRoute.string, msg);
            nano.request(this.editboxRoute.string.toLowerCase(), msg, data => {});
        }
    }
}
