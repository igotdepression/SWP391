export class Service {
    constructor(data) {
        this.serviceID = data.serviceID;
        this.serviceName = data.serviceName;
        this.typeOfService = data.typeOfService;
        this.typeSample = data.typeSample;
        this.priceSur = data.priceSur;
        this.status = data.status;
    }
}

export class ServicePrice {
    constructor(data) {
        this.servicePriceID = data.servicePriceID;
        this.serviceID = data.serviceID;
        this.basePrice = data.basePrice;
        this.thirdSamplePrice = data.thirdSamplePrice;
    }
} 