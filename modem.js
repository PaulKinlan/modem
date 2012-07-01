(function() {
   
 
})();

var Modem = function() {
  this.device;
  this.state;
  this.commandBuffer = [];
};

Modem.prototype.open = function(device, callback, errorCallback) {
  callback = callback || function() {};
  errorCallback = errorCallback || function() {};
  this.device = device;
  this.connectionId = 0;
  this.state = "CONNECTING";
  chrome.experiemental.serial.open(this.device, function(e) {
    this.connectionId = e.connectionId;
    if(this.connectionId == -1) {
      this.state = "ERROR";
      errorCallback();
    }
    else {
      this.state = "OPEN"
      callback();
    }
  });
};

Modem.prototype.sendATCommand = function(command, callback) {
  callback = callback || function() {};

  var commandFunction = function() {
    var readBuffer = [];
    var readFunction = function(data) {
      if(!!data == false) ; // first loop around
      if(data.bytesRead) {
        readBuffer.append(data.data);
        if(readBuffer.indexOf("\n"))  {
          // end of line means end of command
          this.commandBuffer.shift()
          callback(readBuffer);
        }
      }
      chrome.experiemental.serial.read(this.connectionId, readFunction);
    };

    chrome.experiemental.serial.write(this.connectionId, command, function(e) {
      // The command ha
      if(e.length > 0) {
        // We have successfully written the data;
        readFunction();
      }
    }); 
    chrome.experiemental.serial.flush(); 
  };

  this.commandBuffer.push(commandFunction);
  if(this.commandBuffer.length == 1) this.commandBuffer[0]();
};

Modem.prototype.close = function(callback) {
  callback = callback || function() {};
};

var GSM = function(device) {
  this.open(device); 
};

GSM.prototype = Modem.prototype;

GSM.prototype.network = function() {

};

GSM.prototype.getCurrentBill = function() {

};

GSM.prototype.sendSMS = function(to, message, callback) {
  callback = callback || function() {};
};

GSM.prototype.setAPN = function(apn, callback) { 

};

