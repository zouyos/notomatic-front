export function formatDate(
  date?: string | Date | null,
  includeTime = false,
): string {
  if (!date) return '';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return '';

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...(includeTime && {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }),
  }).format(parsedDate);
}