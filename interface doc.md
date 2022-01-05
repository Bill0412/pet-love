## 事件相关接口文档


### 1、定义
```
public type Request = {
        requestId : Text;       //ID
        sender : Principal;     //发送者
        receiver : Principal;   //接收者
        event : EventType;      //事件类型 {#buy, #sell, #abandon}
        state : EventState;     //事件状态 {#waiting, #success, #failed}
        tokenId : TokenId;      //事件对应的宠物
};
```

### 2、说明
purchase，sell，abandon均会产生事件，事件发送者是msg.caller，接收者是mate



### 3、待接入接口

接收者点击同意时回复

reponseACK(requestId : Text) : async (Bool)


接收者点击不同意时回复

reponseNAK(requestId : Text) : async (Bool)


接收者获取事件列表

getAllRequests() : async ([Request])