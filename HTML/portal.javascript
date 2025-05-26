<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Community Event Portal</title>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    font-family: 'Roboto', Arial, sans-serif;
    background:#f9f9f9 url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80') no-repeat center/cover fixed;
    margin:1rem; color:#333;
  }
  nav { margin-bottom:2rem; }
  nav a {
    margin-right:1rem; color:#333; text-decoration:none; padding:0.3rem 0.5rem; border-radius:4px;
  }
  nav a:hover, nav a:focus {
    text-decoration:underline; background:rgba(76,175,80,0.1); outline:none;
  }
  nav a:visited { color:#4caf50; }

  section {
    background:rgba(255,255,255,0.95); padding:1rem 1.5rem 1.5rem; border-radius:6px;
    margin-bottom:2rem; max-width:800px; box-shadow:0 2px 8px rgba(0,0,0,0.1);
  }

  h1,h2,h3,h4 { margin-bottom:1rem; }
  h2#registrationHeading { color:red; }
  h2 {
    font-weight:700;
    background: linear-gradient(90deg, #4caf50 0%, #81c784 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    margin-top:0;
  }

  img.event-img {
    max-width:100%; height:auto; border-radius:8px; margin-top:0.5rem;
    box-shadow:0 3px 6px rgba(0,0,0,0.15);
  }

  video {
    max-width: 100%; border-radius: 8px; margin-top: 0.5rem;
    box-shadow: 0 3px 6px rgba(0,0,0,0.15);
  }

  form {
    margin-top:1rem;
  }
  input, select, textarea {
    width:100%; padding:0.5rem; margin-bottom:1rem; border:1px solid #ccc; border-radius:4px;
    font-family:inherit; font-size:1rem; transition:border-color 0.3s ease;
  }
  input:focus, select:focus, textarea:focus {
    border-color:#4caf50; outline:none;
  }
  input:focus-visible, select:focus-visible, textarea:focus-visible {
    outline:3px solid #81c784;
  }
  #eventFee {
    font-weight:bold; margin-bottom:1rem; color:#388e3c;
  }
  #charCounter {
    font-size:0.9rem; color:#666; text-align:right; margin-top:-1rem; margin-bottom:1rem; font-style:italic;
  }
  #output {
    background:#e0ffe0; border:2px solid #4caf50; padding:1rem; margin-top:1rem; display:none;
    border-radius:6px; font-size:1rem;
  }
  button {
    background:#4caf50; color:#fff; border:none; padding:0.7rem 1.2rem; border-radius:4px;
    cursor:pointer; margin-right:0.5rem; font-size:1rem; transition:background-color 0.3s ease;
  }
  button:hover, button:focus {
    background:#45a045; outline:none;
  }

  .eventCard {
    margin-bottom:2rem; padding-bottom:1rem; border-bottom:1px solid #ddd;
  }
  h3, p { margin-bottom:0.75rem; }
  ul {
    list-style-position: inside; padding-left:1rem; margin-bottom:1rem;
  }
  ul li { margin-bottom:0.5rem; }

  a:link { color:#4caf50; }
  a:visited { color:#388e3c; }
  a:hover, a:focus {
    color:#2e7d32; text-decoration:underline;
  }
  a:active { color:#1b5e20; }

  table {
    border-collapse: collapse; width: 100%; margin-bottom:1rem;
  }
  th, td {
    border: 1px solid #ccc; padding: 0.5rem; text-align:center;
  }
  th {
    background: #4caf50; color: white;
  }
  tr:nth-child(even) {
    background:#f2f2f2;
  }

  #newsArticle {
    column-count: 2; column-gap: 30px; column-rule: 1px solid gray;
    padding: 1rem; background: rgba(255,255,255,0.95); border-radius:6px;
  }

  @media (max-width:768px) {
    nav { display:flex; flex-direction:column; }
    nav a { margin-bottom:0.5rem; margin-right:0; }
    img.event-img { max-width:100%; height:auto; }
    body { margin:0.5rem; font-size:90%; }
    section { margin:1rem auto; padding:1rem; }
    #newsArticle { column-count: 1; }
  }
</style>
</head>
<body>
<nav>
  <a href="#registration">Register</a>
  <a href="#events">Events</a>
  <a href="#location">Nearby Events</a>
</nav>

<section id="registration">
  <h2 id="registrationHeading">Event Registration</h2>
  <form id="registrationForm" novalidate>
    <label for="name">Full Name:</label>
    <input type="text" id="name" name="name" required aria-required="true" />

    <label for="phone">Phone Number:</label>
    <input type="text" id="phone" name="phone" placeholder="(555) 123-4567" required aria-required="true" onblur="FormHandler.validatePhone(this)" />

    <label for="eventType">Select Event:</label>
    <select id="eventType" name="eventType" onchange="Preferences.displayFee(this)" required aria-required="true">
      <option value="">-- Choose an Event --</option>
      <option value="festival" data-fee="20">Community Festival</option>
      <option value="run" data-fee="15">5K Fun Run</option>
      <option value="workshop" data-fee="25">Art Workshop</option>
    </select>

    <div id="eventFee" aria-live="polite" aria-atomic="true"></div>

    <label for="message">Additional Message:</label>
    <textarea id="message" name="message" rows="4" oninput="FormHandler.countChars(this, 'charCounter', 500)" maxlength="500" aria-describedby="charCounter"></textarea>
    <div id="charCounter" aria-live="polite" aria-atomic="true">0 / 500 characters</div>

    <button type="submit">Submit Registration</button>
    <button type="button" onclick="Preferences.clear()">Clear Preferences</button>
  </form>

  <div id="output" role="alert" aria-live="assertive"></div>
</section>

<section id="events">
  <h2>Community Festival</h2>
  <div class="eventCard">
    <img class="event-img" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Community Festival" />
    <p>Join us for a day full of fun, food, music, and local vendors celebrating our community spirit.</p>
    <video controls preload="metadata" poster="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" aria-label="Community Festival video">
      <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />
      <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>

  <h2>5K Fun Run</h2>
  <div class="eventCard">
    <img class="event-img" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" alt="5K Fun Run" />
    <p>Get moving and join the 5K Fun Run — a great way to stay healthy and enjoy the outdoors with friends and family.</p>
  </div>

  <h2>Art Workshop</h2>
  <div class="eventCard">
    <img class="event-img" src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80" alt="Art Workshop" />
    <p>Discover your creativity in our hands-on art workshop. Materials and guidance provided for all skill levels.</p>
  </div>
</section>

<section id="location">
  <h2>Find Nearby Events</h2>
  <button onclick="GeoLocation.findNearbyEvents()">Find Events Near Me</button>
  <div id="locationResult" role="region" aria-live="polite" aria-atomic="true"></div>
</section>

<script>
  // Preferences Module
  const Preferences = (() => {
    const eventTypeSelect = document.getElementById('eventType');
   
