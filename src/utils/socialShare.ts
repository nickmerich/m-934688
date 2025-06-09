
export interface ShareData {
  title: string;
  text: string;
  url?: string;
  hashtags?: string[];
}

export const shareOnTwitter = (data: ShareData) => {
  const text = encodeURIComponent(data.text);
  const hashtags = data.hashtags ? encodeURIComponent(data.hashtags.join(',')) : '';
  const url = data.url ? encodeURIComponent(data.url) : '';
  
  let twitterUrl = `https://twitter.com/intent/tweet?text=${text}`;
  if (hashtags) twitterUrl += `&hashtags=${hashtags}`;
  if (url) twitterUrl += `&url=${url}`;
  
  window.open(twitterUrl, '_blank', 'width=550,height=420');
};

export const shareOnLinkedIn = (data: ShareData) => {
  const url = data.url ? encodeURIComponent(data.url) : '';
  const title = encodeURIComponent(data.title);
  const summary = encodeURIComponent(data.text);
  
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`;
  window.open(linkedinUrl, '_blank', 'width=550,height=420');
};

export const shareOnFacebook = (data: ShareData) => {
  const url = data.url ? encodeURIComponent(data.url) : '';
  const quote = encodeURIComponent(data.text);
  
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`;
  window.open(facebookUrl, '_blank', 'width=550,height=420');
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
};

export const generateShareText = (streak: number, habitName?: string) => {
  const milestones = [
    { days: 3, message: "Just hit my first 3-day streak! 🔥" },
    { days: 7, message: "One week strong! 💪" },
    { days: 14, message: "Two weeks of consistency! 🚀" },
    { days: 21, message: "21 days - they say habits are formed! ✨" },
    { days: 30, message: "30 days of dedication! 🏆" },
    { days: 60, message: "2 months of unstoppable momentum! ⚡" },
    { days: 90, message: "90 days transformed! 🌟" },
    { days: 100, message: "Century club! 100 days strong! 🎯" }
  ];

  const milestone = milestones
    .filter(m => streak >= m.days)
    .pop() || milestones[0];

  const habitText = habitName ? ` with ${habitName}` : '';
  return `${milestone.message}${habitText} Building better habits one day at a time with The Gryt! #HabitTracker #Consistency #PersonalGrowth`;
};
