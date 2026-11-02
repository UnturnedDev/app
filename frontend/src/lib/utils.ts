export { cn } from 'cn';

export function getSafeRedirect(url: string | null) {
    if (
        url &&
        url.startsWith('/') &&
        !url.startsWith('//') &&
        !url.startsWith('/\\')
    ) {
        return url;
    }
    return '/';
}

export function slugify(value: string) {
    return value
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '') // strip accents
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 40);
}
