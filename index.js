window.addEventListener("load", function() {
  var portsEl = document.getElementById("ports");
  var connectEl = document.getElementById("connect");

  chrome.experimental.serial.getPorts(function(ports) {
    for(var p in ports) {
      var option = document.createElement("option");
      option.value = ports[p];
      option.innerText = ports[p];
      portsEl.appendChild(option);
    }
  });

  connectEl.addEventListener("click", function() {
    var modem = new GSM(portsEl.value);
  }, false);
}, false);
