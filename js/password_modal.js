

(function() {
    var modalHtml = 
        '<div id="pw-modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:10000; font-family:sans-serif;">' +
        '  <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); background:white; padding:20px; border-radius:5px; box-shadow:0 2px 10px rgba(0,0,0,0.3); width:300px; text-align:center;">' +
        '    <div id="pw-modal-msg" style="margin-bottom:15px; font-weight:bold; color:#333;">Enter PIN:</div>' +
        '    <input type="password" id="pw-modal-input" style="width:100%; padding:10px; box-sizing:border-box; border:1px solid #ccc; font-size:1.2rem; text-align:center; margin-bottom:15px;">' +
        '    <div style="display:flex; gap:10px;">' +
        '      <button id="pw-modal-ok" style="flex:1; padding:10px; background:#1565c0; color:white; border:none; cursor:pointer;">OK</button>' +
        '      <button id="pw-modal-cancel" style="flex:1; padding:10px; background:#ddd; color:#333; border:none; cursor:pointer;">Cancel</button>' +
        '    </div>' +
        '  </div>' +
        '</div>';

    
    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div);

    var overlay = document.getElementById('pw-modal-overlay');
    var input = document.getElementById('pw-modal-input');
    var okBtn = document.getElementById('pw-modal-ok');
    var cancelBtn = document.getElementById('pw-modal-cancel');
    var msgDiv = document.getElementById('pw-modal-msg');
    var currentCallback = null;

    window.showPasswordPrompt = function(message, callback) {
        msgDiv.innerText = message || "Enter Password:";
        input.value = "";
        overlay.style.display = 'block';
        input.focus();
        currentCallback = callback;
    };

    window.promptPassword = function(message, callback) {
        if (typeof callback === 'function') {
            window.showPasswordPrompt(message, callback);
        } else {
            
            
            return prompt(message);
        }
    };

    function handleOk() {
        var val = input.value;
        overlay.style.display = 'none';
        if (currentCallback) currentCallback(val);
    }

    function handleCancel() {
        overlay.style.display = 'none';
        if (currentCallback) currentCallback(null);
    }

    okBtn.onclick = handleOk;
    cancelBtn.onclick = handleCancel;
    input.onkeydown = function(e) {
        if (e.keyCode === 13) handleOk();
        if (e.keyCode === 27) handleCancel();
    };
})();
