document.addEventListener('DOMContentLoaded', function() {
  
  const banner = document.getElementById('custom-cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept-btn');
  const denyBtn = document.getElementById('cookie-deny-btn');

  // Check if user has already made a choice
  if (getCookie('my_consent_choice')) {
    banner.style.display = 'none';
  }

  // Handle "Accept" click
  acceptBtn.addEventListener('click', function() {
    // 1. Send the "granted" signal to Google
    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'analytics_storage': 'granted'
    });
    
    // 2. Set a cookie to remember this choice
    setCookie('my_consent_choice', 'granted', 365);
    
    // 3. Hide the banner
    banner.style.display = 'none';
  });

  // Handle "Deny" click
  denyBtn.addEventListener('click', function() {
    // 1. Send the "denied" signal to Google
    gtag('consent', 'update', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied'
    });
    
    // 2. Set a cookie to remember this choice
    setCookie('my_consent_choice', 'denied', 365);
    
    // 3. Hide the banner
    banner.style.display = 'none';
  });

  // --- Cookie Helper Functions ---
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
  
});