export function truncateText(text: string): string {
    const truncatedText = text.slice(0, 100);
    return truncatedText;
  };
  
export function formatDate(timestamp: { seconds: number; nanoseconds: number }): string {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  