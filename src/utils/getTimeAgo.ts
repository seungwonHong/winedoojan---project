export function getTimeAgo(updatedAt: string): string {
  const now = new Date();
  const updateTime = new Date(updatedAt);
  const diff = now.getTime() - updateTime.getTime();
  const diffMinutes = Math.floor(diff / 1000 / 60);
  const diffHours = Math.floor(diff / 1000 / 60 / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) {
    return "방금 전";
  } else if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else if (diffDays < 7) {
    return `${diffDays}일 전`;
  } else if (diffDays < 14) {
    return "1주 전";
  } else if (diffDays <= 31) {
    return "한 달 전";
  } else {
    return updateTime.toISOString().split("T")[0].replace(/-/g, ".");
  }
}
