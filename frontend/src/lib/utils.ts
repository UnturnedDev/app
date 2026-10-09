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
