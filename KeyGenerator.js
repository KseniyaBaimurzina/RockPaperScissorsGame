import crypto from "crypto";

const KeyGenerator = class {
    constructor() {
        this.key = this.GenerateKey();
    }

    GenerateKey() {
        var key = crypto.randomBytes(32).toString('hex');
        return key;
    }

    MakeHMAC(compMove) {
        var hmac = crypto.createHmac('sha256', this.key);
        var code = hmac.update(compMove).digest('hex');
        return code;
    }
}

export default KeyGenerator;