🛡️ ResQify — Personal Safety App

A mobile-first personal safety application built to provide real-time protection, trusted contacts, and intelligent emergency response, especially for women and minors.
ResQify focuses on clarity, reliability, and instant action — not just UI visuals.

🌟 Core Highlights
Feature	Description
📱 Mobile-First	Designed strictly for mobile devices
🎨 Aura UI	Subtle character-based light aura background on all screens
🚨 SOS Ready	One-tap emergency actions
🗺️ Live Maps	Real-time location with filters
🔐 Permission Control	Smart activation only when needed
👩‍👧 Minor Protection	Locked safety rules for minors
🎨 Global UI Rules
Rule	Behavior
Aura Background	Very light aura rays on every page
Theme Based	Aura color changes with selected character
Touch Safe	Background never blocks clicks
Scroll Safe	All pages are fully scrollable
Button Safety	No hidden Continue / Save / Submit buttons

✅ All action buttons are always visible and clickable.

🗺️ Maps & Navigation

Powered by Google Maps API using:

@vis.gl/react-google-maps

🔍 Map Filters (Fully Functional)
Filter	Behavior
🚓 Police	Nearby police stations
🏥 Hospitals	Nearby hospitals
🛟 Safe Zones	User-defined safe places
👥 Best Friends	Live moving friend locations
📍 Marker Interaction

When a marker is tapped:

Info Shown	Actions
Place Name	📞 Call
Type	🧭 Navigate
Distance	—
👥 Best Friend Mode (Critical Feature)
State	Behavior
🔴 OFF	Permissions inactive
🟢 ON	All permissions enabled
📍 Live Tracking	Continuous live location
🧭 Map	Moving friend icon visible

Only one toggle controls everything.

🔐 Permissions System
Permission	Default	Activated When
🔔 Notification	OFF	SOS / Best Friend Mode
📞 Call	OFF	SOS / Best Friend Mode
📍 Location	OFF	SOS / Best Friend Mode
🎤 Audio	OFF	SOS
🎥 Video	OFF	SOS

Permissions activate only when required.

🧒 Minor Safety Rule (STRICT)

If:

isMinor === true
AND relationship === "Mother"


Then:

Rule	Status
Best Friend Mode	🟢 ON
Toggle	🔒 Locked
Permissions	✅ Enabled
Live Location	📍 Always ON
Disable Allowed	❌ Until age ≥ 18

This ensures non-negotiable safety for minors.

⚙️ Settings Page (Clean Architecture)
Feature	Placement
Best Friend Mode	Settings (Main)
Permissions	Settings (Main)
Auto SOS	Separate
Safety Check-ins	Separate

❌ No duplicated toggles
❌ No confusing nested menus

🚨 SOS & Emergency Flow
Action	Behavior
SOS Trigger	Enables permissions
Live Location	Starts instantly
Trusted Contacts	Notified
Audio / Video	Activated (if enabled)
🧱 Tech Stack
Tech	Purpose
⚡ Vite	Fast build tool
⚛️ React + TypeScript	App logic
🎨 Tailwind CSS	Styling
🧩 shadcn-ui	UI components
🗺️ Google Maps API	Location services
🚀 Running Locally
npm install
npm run dev


Runs with hot reload and mobile-friendly preview.

🌐 Deployment
Method	Action
Lovable	Share → Publish
Custom Domain	Project → Settings → Domains
🧠 Design Philosophy

“Safety should never be hidden behind bad UI.”

ResQify prioritizes:

Visibility

Reliability

Real-world logic

Zero UI confusion during emergencies
