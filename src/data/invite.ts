export interface WeddingEvent {
  id: string;
  header?: string;
  bismillah?: string;
  invitedLine: string | string[];
  title: string[];
  tagline?: string[];
  date: string;
  time: string;
  place: string[];
  note?: string[];
}

export const invite = {
  couple: "Dr. Kamil & Aatika",
  bismillah: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",

  weddingCelebration: {
    bismillah: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    title: ["A Wedding", "Celebration"],
    names: "Dr. Kamil & Aatika",
    line: "Together with our families, we invite you to celebrate our wedding",
  },

  cover: {
    bismillah: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    line1: "Two Hearts. One Beautiful Journey.",
    blessing:
      "With the blessings of Allah and our families, we joyfully invite you to share in the beginning of our new journey.",
    names: "Dr. Kamil & Aatika",
  },

  events: [
    {
      id: "haldi",
      header: "Dr. Kamil & Aatika",
      invitedLine: "You are cordially invited to join us for",
      title: ["The", "Haldi", "Celebration"],
      tagline: ["A little Haldi,", "a lot of happiness!"],
      date: "28/11/2026",
      time: "4:00 pm",
      place: ["Patel Home,", "Padapole, Kadi"],
      note: [
        "Join us for a vibrant celebration",
        "filled with laughter,",
        "colours and blessings.",
      ],
    },
    {
      id: "mameru",
      header: "Dr. Kamil & Aatika",
      invitedLine: "You are cordially invited to",
      title: ["The", "Mameru", "Celebration"],
      tagline: [
        "Let’s come together",
        "for a cherished tradition",
        "of love and blessings.",
      ],
      date: "28/11/2026",
      time: "8:00 pm onwards",
      place: ["Patel Home,", "Padapole, Kadi"],
    },
    {
      id: "barat",
      header: "Dr. Kamil & Aatika",
      invitedLine: "You are cordially invited to",
      title: ["The", "Barat"],
      tagline: [
        "Let’s celebrate the beginning",
        "of our new journey together.",
      ],
      date: "29/11/2026",
      time: "2:30 pm onwards",
      place: ["Kadi to Nandasan"],
    },
    {
      id: "nikah",
      header: "The Nikah Ceremony",
      bismillah: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      invitedLine: [
        "With the blessings of Allah,",
        "surrounded by love and duas,",
        "we invite you to witness our",
      ],
      title: ["The", "Nikah Ceremony"],
      date: "29/11/2026",
      time: "Baad namaz ae Asar",
      place: [
        "Mannat Farm,",
        "Behind Dr. Nakadar",
        "School, Kadi Road,",
        "Nandasan",
      ],
    },
    {
      id: "walima",
      header: "Dr. Kamil & Aatika",
      invitedLine: "You are cordially invited to",
      title: ["Dawat-e-", "Walima"],
      tagline: [
        "Let’s come together to",
        "celebrate the union of love",
        "and new beginnings.",
      ],
      date: "30/11/2026",
      time: "7:00 pm onwards",
      place: ["Mithawala Farm,", "Opposite Jannat Society,", "Kadi"],
      note: ["Your presence will make", "our celebration more special."],
    },
  ] satisfies WeddingEvent[],

  thankYou: {
    title: "Thank You",
    line1: ["For being a part of our", "special journey."],
    line2: [
      "Your presence, love and blessings",
      "have made our celebration",
      "even more meaningful.",
    ],
    signoff: "With warm regards,",
    signature: "Dr. Kamil & Aatika",
  },
};
