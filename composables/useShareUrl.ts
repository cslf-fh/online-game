const useShareUrl = () => {
  const facebookBaseUrl = 'https://www.facebook.com/sharer/sharer.php';
  const twitterBaseUrl = 'https://twitter.com/intent/tweet';
  const lineBaseUrl = 'https://social-plugins.line.me/lineit/share';

  const shareFacebook = (url: string) => {
    const shareUrl = `${facebookBaseUrl}?u=${url}`;
    window.open(shareUrl);
  };

  const shareTwitter = (
    url: string,
    text?: string,
    hashtags?: string | string[]
  ) => {
    const shareText = ref('');
    const shareHashtags = ref('');
    const textBreak = ref('');

    if (text) shareText.value = `&text=${text}%0a%0a`;
    if (hashtags) {
      textBreak.value = '%0a';
      if (typeof hashtags === 'string') {
        shareHashtags.value = `&hashtags=${hashtags}`;
      } else {
        const tags = hashtags.join(',');
        shareHashtags.value = `&hashtags=${tags}`;
      }
    }

    const shareUrl = `${twitterBaseUrl}?url=${url}${textBreak.value}${shareText.value}${shareHashtags.value}`;
    window.open(shareUrl);
  };

  const shareLine = (url: string) => {
    const shareUrl = `${lineBaseUrl}?url=${url}`;
    window.open(shareUrl);
  };

  return { facebook: shareFacebook, twitter: shareTwitter, line: shareLine };
};

export default useShareUrl;
