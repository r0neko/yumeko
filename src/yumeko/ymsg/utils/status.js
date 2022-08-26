const StatusType = require("../consts/status_types")

function YMSGStatusToYumekoStatus(ymsg) {
    switch(parseInt(ymsg)) {
        case 0:
        default:
            return StatusType.AVAILABLE;
        case 1:
            return StatusType.BE_RIGHT_BACK;
        case 2:
            return StatusType.BUSY;
        case 4:
            return StatusType.NOT_AT_DESK;
        case 6:
            return StatusType.ON_THE_PHONE;
        case 9:
            return StatusType.STEPPED_OUT;
        case 12:
            return StatusType.INVISIBLE;
        case 99:
            return StatusType.CUSTOM;    
    }
}

function YumekoStatusToYMSGStatus(yumeko) {
    switch(parseInt(yumeko)) {
        case StatusType.AVAILABLE:
        default:
            return 0;
        case StatusType.BE_RIGHT_BACK:
            return 1;
        case StatusType.BUSY:
            return 2;
        case StatusType.NOT_AT_DESK:
            return 4;
        case StatusType.ON_THE_PHONE:
            return 6;
        case StatusType.STEPPED_OUT:
            return 9;
        case StatusType.INVISIBLE:
            return 12;
        case StatusType.IDLE:
            return 999;
        case StatusType.OFFLINE:
            return 0x5a55aa56;
        case StatusType.CUSTOM:
            return 99;    
    }
}

module.exports = {
    YMSGStatusToYumekoStatus,
    YumekoStatusToYMSGStatus
}