// Initialize EmailJS
(function(){
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Countdown Timer
var countDownDate = new Date("Dec 31, 2024 23:59:59").getTime();

var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = days + "d " + hours + "h " 
    + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }
}, 1000);

// Create ICS File for Calendar Event
function createICSFile() {
    const icsContent = 
    `BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:-//Your Company//NONSGML v1.0//EN
    BEGIN:VEVENT
    UID:1234567890@yourcompany.com
    DTSTAMP:20240828T170000Z
    DTSTART:20240901T170000Z
    DTEND:20240901T180000Z
    SUMMARY:Your Event Title
    DESCRIPTION:Details about the event.
    LOCATION:Your Event Location
    END:VEVENT
    END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'event.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Handle form submission
document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const content = document.getElementById('content').value;

    // Validate file size
    const fileInput = document.getElementById('file');
    const fileSize = fileInput.files[0].size / 1024 / 1024; // Convert to MB
    if (fileSize > 2) { // Limit to 2MB
        document.getElementById('message').innerHTML = 'File size should be less than 2MB.';
        fileInput.value = ''; // Clear the file input
        return;
    }

    // Send the form using EmailJS
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function(response) {
            document.getElementById('message').innerHTML = 'Email sent successfully!';
            document.getElementById('emailForm').reset(); // Reset the form

            // Create and download the ICS file for the calendar invite
            createICSFile();
        }, function(error) {
            document.getElementById('message').innerHTML = 'Failed to send email. Try again.';
        });
});


