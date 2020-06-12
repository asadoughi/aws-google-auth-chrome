// Saves options to chrome.storage
function save_options() {
  var durationSeconds = document.getElementById('durationSeconds').value;
  var principalArn = document.getElementById('principalArn').value;
  chrome.storage.local.set({
      durationSeconds: durationSeconds,
      principalArn: principalArn
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.local.get({
      durationSeconds: 3600,
      principalArn: ""
  }, function(items) {
    document.getElementById('durationSeconds').value = items.durationSeconds;
    document.getElementById('principalArn').value = items.principalArn;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
