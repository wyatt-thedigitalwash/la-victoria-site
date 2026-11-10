/**
 * The restaurant's listings to-do list, shown at the unlisted /lv-tasks-7k2m.
 * One task per directory, with plain-language steps and the page to open.
 * Ticks live in the visitor's browser only (see components/tasks/ListingTasks.tsx).
 */
export type Task = { id: string; title: string; steps: string[]; note?: string; links?: [string, string][] };

/** Printed at the top of the page: the details every listing must match. */
export const DETAILS: [string, string][] = [
  ["Name", "La Victoria"],
  ["Address", "105 W Tyler Street, Tampa, FL 33602"],
  ["Phone", "The number on the Google listing, everywhere"],
  ["Website", "lavictoriatampa.com"],
  ["Reservations", "opentable.com/r/la-victoria-reservations-tampa"],
  ["Category", "Mexican restaurant (then Cocktail bar, Seafood restaurant)"],
];

const KIT = "Brand Kit → 06 Directories";
const OT = "https://www.opentable.com/r/la-victoria-reservations-tampa";

export const LISTING_TASKS: Task[] = [
  {
    id: "google",
    title: "Google Business Profile: check every detail and add the logo and cover",
    steps: [
      "Open the button below and sign in with the Google account that owns the listing.",
      "Click Edit profile. Make sure name, address, phone and website match the box at the top of this page.",
      "Under Hours, enter dinner hours. Add holiday hours as they come up.",
      "Under Categories, set Mexican restaurant first, then add Cocktail bar and Seafood restaurant.",
      "Add lavictoriatampa.com/menus as the menu link, and the OpenTable link under Reservations.",
      `Click Photos. Upload the Profile and Cover files from ${KIT} → Google Business Profile, then at least 10 photos of dishes, drinks and the room.`,
    ],
    links: [["Google Business Profile", "https://business.google.com/"]],
  },
  {
    id: "google-reviews",
    title: "Google: reply to all 24 reviews",
    steps: [
      "Search \"La Victoria Tampa\" on Google while signed in. In the panel for your business, click Read reviews.",
      "Click Reply under each review.",
      "Thank them by first name, mention one thing they wrote, sign with your first name. Two or three sentences is plenty.",
      "For a bad review: apologize once, stay calm, and invite them to email operations@lavictoriatampa.com. Never argue.",
      "From now on, reply to every new review within 48 hours.",
    ],
    links: [["Find your listing", "https://www.google.com/search?q=La+Victoria+Tampa+reviews"]],
  },
  {
    id: "apple",
    title: "Apple Business Connect: claim the listing",
    steps: [
      "Open the button below and sign in with an Apple ID. If the restaurant has none, create one with the operations email.",
      "Click Add location, search \"La Victoria 105 W Tyler St Tampa\", and claim it.",
      "Verify ownership. Apple will call the business phone or ask for a document like a utility bill.",
      "Fill in the details from the box at the top, the hours, and add the menu and OpenTable links under Actions.",
      `Upload the Profile file as the logo and the Cover file from ${KIT} → Apple Business Connect.`,
    ],
    note: "Apple prefers a real photo of the restaurant as the cover. Swap the branded one out once you have a good photo.",
    links: [["Apple Business Connect", "https://businessconnect.apple.com/"]],
  },
  {
    id: "yelp",
    title: "Yelp for Business: claim the page",
    steps: [
      "Open Claim on Yelp and search for La Victoria in Tampa. If it is not there, choose Add your business.",
      "Verify by the phone call or email Yelp sends.",
      "Fill in hours, website, the OpenTable link, and a short paragraph about the restaurant.",
      `Under Photos, upload the Profile and Photo files from ${KIT} → Yelp, then dish photos. Under Menu, add the menu link.`,
      "Say no to every ad offer; the free page is all you need.",
    ],
    note: "Do not ask guests for Yelp reviews. Yelp hides reviews it thinks were asked for.",
    links: [["Claim on Yelp", "https://biz.yelp.com/claim"], ["Find the page", "https://www.yelp.com/search?find_desc=La+Victoria&find_loc=Tampa%2C+FL"]],
  },
  {
    id: "tripadvisor",
    title: "Tripadvisor: claim the listing",
    steps: [
      "Open the button below and search \"La Victoria Tampa\". Claim the listing, or choose List your business if it is not there.",
      "Verify with the card check or phone call Tripadvisor asks for. Nothing is charged.",
      "In the Management Center, set hours, phone, website, price range and cuisine (Mexican, Seafood, Bar).",
      `Upload the Primary Photo file from ${KIT} → Tripadvisor, then 10 more photos.`,
    ],
    links: [["Tripadvisor Owners", "https://www.tripadvisor.com/Owners"]],
  },
  {
    id: "bing",
    title: "Bing Places: import the Google listing",
    steps: [
      "Open the button below and sign in with a Microsoft account (any Outlook or Hotmail login works).",
      "Choose Import from Google Business Profile and sign in to the same Google account as the listing. Everything copies over.",
      `Check the imported details, then add the Photo file from ${KIT} → Bing Places if photos did not carry over.`,
    ],
    links: [["Bing Places", "https://www.bingplaces.com/"]],
  },
  {
    id: "opentable",
    title: "OpenTable: make the profile match",
    steps: [
      "Sign in to OpenTable for Restaurants and open Restaurant profile.",
      "Confirm address, phone, hours and website match the box at the top of this page.",
      `Replace the profile photo with the Profile Photo file from ${KIT} → OpenTable, then add dish photos.`,
    ],
    note: "The reservation link is already live; this is just a check.",
    links: [["OpenTable page", OT]],
  },
  {
    id: "facebook",
    title: "Facebook Page: create or claim the page",
    steps: [
      "Search Facebook for \"La Victoria Tampa\". If a page already exists that you did not make, open it and use Is this your business? to claim it. Otherwise open Create a Page.",
      "Name: La Victoria. Category: Mexican Restaurant. Add the address, phone, website and hours.",
      `Upload the Profile and Cover files from ${KIT} → Facebook.`,
      "Add an action button, choose Reserve, and paste the OpenTable link.",
      "In Settings → Linked accounts, connect the @lavictoriatampa Instagram account so posts can go to both.",
    ],
    links: [["Create a Page", "https://www.facebook.com/pages/create"], ["Find an existing page", "https://www.facebook.com/search/pages/?q=La%20Victoria%20Tampa"]],
  },
  {
    id: "nextdoor",
    title: "Nextdoor Business: claim the free page",
    steps: [
      "Open the button below and choose Claim your free business page.",
      "Search by name and address. Claim the page if it exists, or create it.",
      "Verify by the phone call or email Nextdoor sends.",
      `Fill in hours, website and a short description, then upload the Profile and Cover files from ${KIT} → Nextdoor.`,
    ],
    links: [["Nextdoor Business", "https://business.nextdoor.com/"]],
  },
  {
    id: "foursquare",
    title: "Foursquare: claim the listing",
    steps: [
      "Open the button below and choose Claim your business.",
      "Search \"La Victoria Tampa\". Claim it, or add it if it is missing.",
      "Verify by phone or email.",
      `Fill in the details, then upload the Profile and Photo files from ${KIT} → Foursquare.`,
    ],
    note: "Foursquare feeds Uber, Snapchat and other apps, so this one listing fixes many.",
    links: [["Foursquare for Business", "https://business.foursquare.com/"]],
  },
  {
    id: "yellowpages",
    title: "Yellow Pages: claim or add the free listing",
    steps: [
      "Open Find the listing. If La Victoria shows up, open it and click Claim this business. If not, go to yellowpages.com and use Add your business.",
      "Answer the automated phone call to the business number to verify.",
      `Fill in hours and website, upload the Profile and Photo files from ${KIT} → Yellow Pages.`,
      "Decline the paid upgrades they will offer by phone afterwards.",
    ],
    links: [["Find the listing", "https://www.yellowpages.com/search?search_terms=La+Victoria&geo_location_terms=Tampa%2C+FL"], ["Yellow Pages", "https://www.yellowpages.com/"]],
  },
  {
    id: "mapquest",
    title: "MapQuest: claim the listing",
    steps: [
      "Open Find the listing. If La Victoria appears, open it and look for Own this business? → Claim it.",
      "If it does not appear, open MapQuest for Business and add the free listing.",
      `Fill in the details and upload the Profile and Photo files from ${KIT} → MapQuest.`,
    ],
    links: [["MapQuest for Business", "https://business.mapquest.com/"], ["Find the listing", "https://www.mapquest.com/search/results?query=La%20Victoria%20105%20W%20Tyler%20St%20Tampa%20FL"]],
  },
  {
    id: "bbb",
    title: "BBB: add the free business profile",
    steps: [
      "Open the button below and enter the business details from the box at the top.",
      "BBB confirms by email or phone, and the profile appears within a few days.",
      `Sign in and upload the Profile file from ${KIT} → BBB as the logo.`,
      "A salesperson will call about paid accreditation. Say no; the free profile is enough.",
    ],
    links: [["Get listed", "https://www.bbb.org/get-listed"]],
  },
  {
    id: "tampalocal",
    title: "Tampa Local Listings: claim the free listing",
    steps: [
      "Open the button below and choose Add or Claim a listing.",
      "Enter the details from the box at the top, the website and the OpenTable link.",
      `Upload the Profile and Cover files from ${KIT} → Tampa Local Listings, then confirm by email.`,
    ],
    links: [["Tampa Local Listings", "https://tampalocallistings.com/"]],
  },
];
